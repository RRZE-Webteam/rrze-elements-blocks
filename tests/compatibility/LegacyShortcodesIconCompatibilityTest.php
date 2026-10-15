<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\Elements\CTA\CTA;
use RRZE\Elements\Icon\Icon as OldIcon;
use RRZE\Elements\Notice\Notice;
use RRZE\Elements\Tabs\Tabs;
use RRZE\Elements\TimeLine\TimeLine;
use RRZE\ElementsBlocks\BlockFrontend\Collapse;
use RRZE\ElementsBlocks\LegacyShortcodes\Icon;
use RRZE\ElementsBlocks\LegacyShortcodes\Registrar;
use RRZE\ElementsBlocks\SpriteGenerator;

final class LegacyShortcodesIconCompatibilityTest extends TestCase
{
    private array $iconCallback;

    protected function setUp(): void
    {
        // Every data set starts with the same mixed-plugin setup. In particular,
        // a legacy constructor in one test must not affect the next test.
        $GLOBALS['shortcode_tags'] = [];
        $GLOBALS['wp_filter'] = [];
        $GLOBALS['wp_actions'] = [];
        $GLOBALS['wp_filters'] = [];
        $GLOBALS['wp_current_filter'] = [];
        $GLOBALS['compat_enqueued_styles'] = [];
        $GLOBALS['compat_enqueued_scripts'] = [];
        foreach (['tabs_count', 'tabs_id', 'tabs_hstart', 'current_tab'] as $name) {
            unset($GLOBALS[$name]);
        }
        add_filter('sanitize_title', 'sanitize_title_with_dashes', 10, 3);

        new OldIcon(RRZE_ELEMENTS_COMPAT_PLUGIN_FILE);
        new Notice(RRZE_ELEMENTS_COMPAT_PLUGIN_FILE);
        new Tabs(RRZE_ELEMENTS_COMPAT_PLUGIN_FILE);
        new TimeLine(RRZE_ELEMENTS_COMPAT_PLUGIN_FILE);
        new CTA(RRZE_ELEMENTS_COMPAT_PLUGIN_FILE);

        new Registrar();
        do_action('init');
        $this->iconCallback = $GLOBALS['shortcode_tags']['icon'];
        $this->assertInstanceOf(Icon::class, $this->iconCallback[0]);

        SpriteGenerator::setAssetPath(dirname(__DIR__, 2) . '/src/_shared/icons');
        $icons = new ReflectionProperty(SpriteGenerator::class, 'icons');
        if (PHP_VERSION_ID < 80100) {
            $icons->setAccessible(true);
        }
        $icons->setValue(null, []);
    }

    /**
     * @dataProvider combinationProvider
     */
    public function test_icons_before_inside_and_after_other_shortcodes_keep_the_new_renderer(
        string $middle,
        string $tag,
        bool $hasInnerIcon
    ): void {
        $output = do_shortcode(
            $this->phone('before') . $middle . $this->phone('after')
        );

        $this->assertStringNotContainsString('[' . $tag, $output, 'The middle shortcode must actually run.');
        $positions = $hasInnerIcon ? ['before', 'inside', 'after'] : ['before', 'after'];
        $this->assertMaterialPhones($output, $positions);
        $this->assertSame($this->iconCallback, $GLOBALS['shortcode_tags']['icon'], 'Rendering must not replace the icon callback.');
    }

    public function combinationProvider(): array
    {
        $inside = '<span data-test-icon="inside">[icon icon="phone"]</span>';

        return [
            'notice tipp' => ['[notice-tipp]' . $inside . '[/notice-tipp]', 'notice-tipp', true],
            'notice alias' => ['[hinweis]' . $inside . '[/hinweis]', 'hinweis', true],
            'tabs with header icon' => ['[tabs][tab title="Contact" icon="envelope"]' . $inside . '[/tab][/tabs]', 'tabs', true],
            'tabs without header icon' => ['[tabs][tab title="Contact"]' . $inside . '[/tab][/tabs]', 'tabs', true],
            'horizontal timeline' => ['[timeline][timeline-item name="2026"]' . $inside . '[/timeline-item][/timeline]', 'timeline', true],
            'vertical timeline' => ['[timeline orientation="vertical"][timeline-item name="2026"]' . $inside . '[/timeline-item][/timeline]', 'timeline', true],
            'timeline with leading navigation' => ['[timeline autoplay="1" start-end="true"][timeline-item name="2026"]' . $inside . '[/timeline-item][/timeline]', 'timeline', true],
            'CTA with explicit icon' => ['[CTA url="https://example.com/" button="Contact" icon="envelope"]', 'CTA', false],
            'search CTA with implicit icon' => ['[CTA url="https://example.com/" search="true"]', 'CTA', false],
            'CTA without icon' => ['[CTA url="https://example.com/" title="Contact"]', 'CTA', false],
            'migrated accordion with header icon' => ['[collapsibles][collapse title="Contact" icon="solid envelope"]' . $inside . '[/collapse][/collapsibles]', 'collapsibles', true],
        ];
    }

    /**
     * @dataProvider collapsePrefixProvider
     */
    public function test_paragraph_icon_in_rendered_collapse_keeps_the_new_renderer(string $prefix): void
    {
        // Boundary after block rendering, before WordPress's shortcode pass.
        // The isolated Collapse case proves that nesting alone is not the cause.
        $collapse = (new Collapse())->render(
            ['title' => 'Contact', 'hstart' => 3, 'jumpName' => 'contact'],
            '<p>Telephone: ' . $this->phone('inside') . '</p>'
        );
        $output = do_shortcode($this->phone('before') . $prefix . $collapse . $this->phone('after'));

        if ($prefix !== '') {
            // Dropping the notice entirely must not make this regression pass.
            $this->assertStringContainsString('A tip', $output);
            $this->assertStringContainsString('href="#symbols-lightbulb"', $output);
        }
        $this->assertMaterialPhones($output, ['before', 'inside', 'after']);
        $this->assertSame($this->iconCallback, $GLOBALS['shortcode_tags']['icon']);
    }

    public function collapsePrefixProvider(): array
    {
        return [
            'collapse alone' => [''],
            'notice before collapse reproduces test-44' => ['[notice-tipp]A tip[/notice-tipp]'],
        ];
    }

    private function phone(string $position): string
    {
        return '<span data-test-icon="' . $position . '">[icon icon="phone"]</span>';
    }

    private function assertMaterialPhones(string $html, array $positions): void
    {
        $document = new DOMDocument();
        $previous = libxml_use_internal_errors(true);
        try {
            $this->assertTrue($document->loadHTML('<!DOCTYPE html><html><body>' . $html . '</body></html>'));
        } finally {
            libxml_clear_errors();
            libxml_use_internal_errors($previous);
        }
        $xpath = new DOMXPath($document);

        foreach ($positions as $position) {
            $marker = $xpath->query('//span[@data-test-icon="' . $position . '"]');
            $this->assertSame(1, $marker->length, 'Missing icon position: ' . $position);
            $this->assertSame(
                1,
                $xpath->query('./svg/use[@href="#symbols-call"]', $marker->item(0))->length,
                'The icon at "' . $position . '" must use the mapped Material Symbol, even after another shortcode renders.'
            );
        }
        $this->assertStringNotContainsString('[icon', $html);
    }
}
