<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\Elements\Icon\Icon as OldIcon;
use RRZE\Elements\Tabs\Tabs as OldTabs;
use RRZE\ElementsBlocks\LegacyShortcodes\Registrar;
use RRZE\ElementsBlocks\LegacyShortcodes\Tab;
use RRZE\ElementsBlocks\SpriteGenerator;

final class LegacyShortcodesTabCompatibilityTest extends TestCase
{
    protected function setUp(): void
    {
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
        new OldTabs(RRZE_ELEMENTS_COMPAT_PLUGIN_FILE);

        // The default registrar must replace the old callbacks for the entire family.
        new Registrar();
        do_action('init');
        $this->assertInstanceOf(Tab::class, $GLOBALS['shortcode_tags']['tabs'][0]);
        $this->assertSame($GLOBALS['shortcode_tags']['tabs'][0], $GLOBALS['shortcode_tags']['tab'][0]);

        SpriteGenerator::setAssetPath(dirname(__DIR__, 2) . '/src/_shared/icons');
        $icons = new ReflectionProperty(SpriteGenerator::class, 'icons');
        if (PHP_VERSION_ID < 80100) {
            $icons->setAccessible(true);
        }
        $icons->setValue(null, []);
    }

    /** @dataProvider attributeSyntaxProvider */
    public function test_wordpress_attribute_syntax_produces_matching_labels(string $attributes, string $title): void
    {
        $output = do_shortcode('[tabs][tab ' . $attributes . ']Body[/tab][/tabs]');
        $xpath = $this->createXPath($output);
        $buttons = $xpath->query('//button[@role="tab"]');
        $headings = $xpath->query('//*[@role="tabpanel"]/h2');

        $this->assertSame(1, $buttons->length);
        $this->assertSame(1, $headings->length);
        $this->assertStringContainsString($title, $buttons->item(0)->textContent);
        $this->assertSame($title, trim($headings->item(0)->textContent));
        $this->assertSame(1, $xpath->query('//button//span[@class="tab-suffix" and text()="New"]')->length);
        $this->assertSame(1, $xpath->query('//button//use[@href="#symbols-mail"]')->length);
        $this->assertStringNotContainsString('[tab', $output);
    }

    public function attributeSyntaxProvider(): array
    {
        return [
            'double quotes' => ['title="Contact team" icon="envelope" suffix="New"', 'Contact team'],
            'single quotes' => ["title='Contact team' icon='envelope' suffix='New'", 'Contact team'],
            'unquoted and reordered' => ['suffix=New icon=envelope title=Contact', 'Contact'],
        ];
    }

    public function test_content_keeps_html_and_executes_nested_shortcodes_once(): void
    {
        $calls = 0;
        add_shortcode('tab-probe', static function () use (&$calls): string {
            ++$calls;
            return '<strong data-probe="once">Rendered once</strong>';
        });
        $output = do_shortcode('[tabs][tab title="Contact"]'
            . '<p>Call <a href="tel:+499111234">our office</a>: [tab-probe]</p>'
            . '<ul><li>First item</li><li>Second item</li></ul>[/tab][/tabs]');
        $xpath = $this->createXPath($output);

        $this->assertSame(1, $calls, 'Collecting navigation must not execute the content a second time.');
        $this->assertSame(1, $xpath->query('//*[@role="tabpanel"]//a[@href="tel:+499111234"]')->length);
        $this->assertSame(1, $xpath->query('//*[@role="tabpanel"]//strong[@data-probe="once"]')->length);
        $this->assertSame(2, $xpath->query('//*[@role="tabpanel"]//ul/li')->length);
        $this->assertSame(1, $xpath->query('//*[@role="tabpanel"]/p')->length);
        $this->assertDoesNotMatchRegularExpression('/<p>\s*<(?:p|div|ul)\b/', $output);
    }

    public function test_tabs_survive_wordpress_paragraph_formatting_before_shortcodes(): void
    {
        $source = "[tabs]\n[tab title=First]\nFirst paragraph.\n\nSecond paragraph.\n[/tab]\n"
            . "[tab title=Second]\nOther content.\n[/tab]\n[/tabs]";
        $output = do_shortcode(shortcode_unautop(wpautop($source)));
        $xpath = $this->createXPath($output);

        $this->assertSame(2, $xpath->query('//button[@role="tab"]')->length);
        $this->assertSame(2, $xpath->query('//*[@role="tabpanel"]')->length);
        $this->assertSame(3, $xpath->query('//*[@role="tabpanel"]/p')->length);
        // wpautop may retain a harmless newline at the start of an existing paragraph.
        foreach (['First paragraph.', 'Second paragraph.', 'Other content.'] as $text) {
            $this->assertSame(1, $xpath->query('//*[@role="tabpanel"]/p[normalize-space()="' . $text . '"]')->length);
        }
        $this->assertDoesNotMatchRegularExpression('/<p>\s*<(?:p|div|ul)\b/', $output);
        $this->assertStringNotContainsString('[tab', $output);
    }

    /** @dataProvider tabSpacingProvider */
    public function test_wordpress_formatting_leaves_no_spacing_between_panels(string $separator): void
    {
        $source = '[tabs]' . $separator
            . '[tab title=First]First line' . "\n" . 'Second line<br>Third line[/tab]' . $separator
            . '[tab title=Second]Second panel[/tab]' . $separator
            . '[tab title=Third]Third panel[/tab]' . $separator . '[/tabs]';
        $output = do_shortcode(shortcode_unautop(wpautop($source)));
        $xpath = $this->createXPath($output);

        $this->assertSame(3, $xpath->query('//*[@role="tabpanel"]')->length);
        $this->assertSame(0, $xpath->query('//*[@role="tablist"]/../*[not(@role="tablist" or @role="tabpanel")]')->length,
            'Formatting between panels must not occupy space when earlier panels are hidden.');
        $this->assertSame(2, $xpath->query('//*[@role="tabpanel"][1]/p/br')->length,
            'Both automatic and explicit line breaks inside a panel must remain.');
        $this->assertSame(3, $xpath->query('//*[@role="tabpanel"]/p')->length);
    }

    public function tabSpacingProvider(): array
    {
        return [
            'adjacent shortcodes' => [''],
            'single line breaks' => ["\n"],
            'blank lines' => ["\n\n"],
        ];
    }

    public function test_header_icons_keep_the_new_icon_callbacks_and_register_both_symbols(): void
    {
        $iconCallback = $GLOBALS['shortcode_tags']['icon'];
        $listCallback = $GLOBALS['shortcode_tags']['list-icons'];
        $phone = static fn(string $position): string => '<span data-phone="' . $position . '">[icon icon="phone"]</span>';
        $output = do_shortcode($phone('before')
            . '[tabs][tab title="Contact" icon="envelope"]' . $phone('inside') . '[/tab][/tabs]'
            . $phone('after'));
        $xpath = $this->createXPath($output);

        $this->assertSame(1, $xpath->query('//button[@role="tab"]//use[@href="#symbols-mail"]')->length);
        $this->assertSame(1, $xpath->query('//*[@role="tabpanel"]/h2//use[@href="#symbols-mail"]')->length);
        foreach (['before', 'inside', 'after'] as $position) {
            $this->assertSame(1, $xpath->query('//span[@data-phone="' . $position . '"]/svg/use[@href="#symbols-call"]')->length);
        }
        $this->assertSame($iconCallback, $GLOBALS['shortcode_tags']['icon']);
        $this->assertSame($listCallback, $GLOBALS['shortcode_tags']['list-icons']);
        $this->assertStringNotContainsString('[icon', $output);

        ob_start();
        try {
            SpriteGenerator::embedSpriteSheet();
            $sprite = (string)ob_get_contents();
        } finally {
            ob_end_clean();
        }
        $this->assertNotSame('', $sprite);
        $document = new DOMDocument();
        $this->assertTrue($document->loadXML($sprite));
        $ids = [];
        foreach ($document->getElementsByTagName('symbol') as $symbol) {
            $ids[] = $symbol->getAttribute('id');
        }
        $this->assertEqualsCanonicalizing(['symbols-call', 'symbols-mail'], $ids);
    }

    public function test_group_context_is_restored_after_a_nested_shortcode_throws(): void
    {
        add_shortcode('tab-error', static function (): string {
            throw new RuntimeException('Expected tab rendering failure');
        });

        $failure = null;
        try {
            do_shortcode('[tabs hstart="5"][tab title="Interrupted"][tab-error][/tab][/tabs]');
        } catch (RuntimeException $exception) {
            $failure = $exception;
        }
        $this->assertNotNull($failure, 'The child shortcode should have been executed.');
        $this->assertSame('Expected tab rendering failure', $failure->getMessage());

        $output = do_shortcode('[tabs][tab title="Recovered"]Body[/tab][/tabs]');
        $xpath = $this->createXPath($output);
        $this->assertSame(1, $xpath->query('//button[@role="tab"]')->length);
        $this->assertSame(1, $xpath->query('//*[@role="tabpanel"]/h2[text()="Recovered"]')->length);
        $this->assertStringNotContainsString('Interrupted', $output);
    }

    private function createXPath(string $html): DOMXPath
    {
        $document = new DOMDocument();
        $previous = libxml_use_internal_errors(true);
        try {
            $this->assertTrue($document->loadHTML('<!DOCTYPE html><html><body>' . $html . '</body></html>'));
        } finally {
            libxml_clear_errors();
            libxml_use_internal_errors($previous);
        }
        return new DOMXPath($document);
    }
}
