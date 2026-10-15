<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\Elements\TextColumns\TextColumns as OldTextColumns;
use RRZE\ElementsBlocks\LegacyShortcodes\Registrar;
use RRZE\ElementsBlocks\LegacyShortcodes\TextColumns;

/** Exercises the migration with the real WordPress shortcode and formatting APIs. */
final class LegacyShortcodesTextColumnsCompatibilityTest extends TestCase
{
    /** Replaces the old callback through the production registrar. */
    protected function setUp(): void
    {
        $GLOBALS['shortcode_tags'] = [];
        $GLOBALS['wp_filter'] = [];
        $GLOBALS['wp_actions'] = [];
        $GLOBALS['wp_filters'] = [];
        $GLOBALS['wp_current_filter'] = [];
        $GLOBALS['compat_enqueued_styles'] = [];
        $GLOBALS['compat_enqueued_scripts'] = [];
        new OldTextColumns();
        new Registrar();
        do_action('init');
    }

    /**
     * Paragraphs, lists and figures remain inside one flowing container.
     *
     * @dataProvider formattingProvider
     * @param bool $formatted Whether the_content already ran wpautop.
     */
    public function test_document_content_and_nested_shortcodes(bool $formatted): void
    {
        $source = "[text-columns number=\"4\" width=\"180\" rule=\"false\"]\n\nFirst paragraph\n\n"
            . "Second [icon icon=\"phone\"]\n\n<ul><li>Item</li></ul>\n\n"
            . '<figure><img src="example.png" alt="Example"></figure>'
            . "\n\n[notice-tipp]Tip[/notice-tipp]\n\n[/text-columns]";
        $output = do_shortcode(shortcode_unautop($formatted ? wpautop($source) : $source));
        $xpath = $this->xpath($output);
        $container = '//div[contains(@class,"rrze-elements-blocks-text-column")]';
        $this->assertSame(1, $xpath->query($container . '/p[text()="First paragraph"]')->length);
        $this->assertSame(1, $xpath->query($container . '/ul/li')->length);
        $this->assertSame(1, $xpath->query($container . '/figure/img')->length);
        $this->assertStringContainsString('#symbols-call', $output);
        $this->assertStringContainsString('notice-idea', $output);
        $this->assertStringContainsString('columns:180px 4', $output);
        $this->assertStringContainsString('column-rule:none', $output);
        $this->assertDoesNotMatchRegularExpression('/<p>\s*<(?:div|ul|figure|p)\b|<p>\s*<\/p>/', $output);
        $this->assertInstanceOf(TextColumns::class, $GLOBALS['shortcode_tags']['text-columns'][0]);
        $this->assertNotContains('rrze-elements', $GLOBALS['compat_enqueued_styles']);
    }

    /** @return array<string, array{bool}> Shortcode blocks and preformatted classic content. */
    public function formattingProvider(): array
    {
        return ['raw' => [false], 'classic' => [true]];
    }

    /** Existing container adapters and styled columns compose without changing callbacks. */
    public function test_columns_inside_tabs_accordion_and_alert(): void
    {
        $output = do_shortcode('[collapsibles][collapse title="More"][tabs][tab title="Details"]'
            . '[alert][text-columns style="example"][inner_alert]Nested[/inner_alert]'
            . '[/text-columns][/alert][/tab][/tabs][/collapse][/collapsibles]');
        $this->assertStringContainsString('alert-example', $output);
        $this->assertStringContainsString('<p>Nested</p>', $output);
        $this->assertSame(1, $this->xpath($output)->query('//div[contains(@class,"rrze-elements-blocks-text-column")]/div[contains(@class,"alert-default")]')->length);
        $this->assertStringNotContainsString('[text-columns', $output);
        $this->assertInstanceOf(TextColumns::class, $GLOBALS['shortcode_tags']['text-columns'][0]);
    }

    /** Child callbacks run once and escaped documentation examples remain literal. */
    public function test_single_expansion_and_escaped_examples(): void
    {
        $calls = 0;
        /** Records parser invocations without depending on rendered markup. */
        add_shortcode('columns-probe', static function () use (&$calls): string {
            $calls++;
            return '<span>Once</span>';
        });
        $output = do_shortcode('[text-columns][columns-probe]'
            . '<code>[[icon icon="phone"]]</code>[/text-columns]');
        $this->assertSame(1, $calls);
        $this->assertStringContainsString('<code>[icon icon="phone"]</code>', $output);
        $this->assertStringNotContainsString('<svg', $output);
    }

    /** Shortcode-specific filters can still adjust the legacy attributes. */
    public function test_shortcode_attributes_remain_filterable(): void
    {
        /** Simulates a site's existing per-shortcode customization. */
        add_filter('shortcode_atts_text-columns', static function (array $args): array {
            $args['number'] = '3';
            return $args;
        });
        $this->assertStringContainsString('columns:240px 3', do_shortcode('[text-columns]Body[/text-columns]'));
    }

    /** The real Elemental filter must preserve minimum width and the following divider. */
    public function test_elemental_inline_style_filter_preserves_column_layout(): void
    {
        $themeRoot = getenv('FAU_ELEMENTAL_DIR') ?: ABSPATH . 'wp-content/themes/FAU-Elemental';
        $sanitizer = $themeRoot . '/inc/content-sanitization.php';
        if (!is_readable($sanitizer)) {
            $this->markTestSkipped('FAU_ELEMENTAL_DIR is needed for the optional theme integration test.');
        }
        require_once $sanitizer;
        $output = fau_elemental_remove_inline_styles_from_content(do_shortcode(
            '[text-columns number="4" width="180" rule-color="#abc"]Body[/text-columns]'
        ));
        $this->assertStringContainsString('columns:180px 4', $output);
        $this->assertStringContainsString(';column-rule:1px solid #abc', $output);
    }

    /** Parses fragment structure without surfacing libxml HTML5 diagnostics. */
    private function xpath(string $html): DOMXPath
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
