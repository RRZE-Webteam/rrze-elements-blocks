<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\Elements\Alert\Alert as OldAlert;
use RRZE\ElementsBlocks\LegacyShortcodes\Alert;
use RRZE\ElementsBlocks\LegacyShortcodes\Registrar;

/** Exercises nested alerts with WordPress's real parser and paragraph formatter. */
final class LegacyShortcodesAlertCompatibilityTest extends TestCase
{
    /** Replaces both old callbacks through the production registration path. */
    protected function setUp(): void
    {
        $GLOBALS['shortcode_tags'] = [];
        $GLOBALS['wp_filter'] = [];
        $GLOBALS['wp_actions'] = [];
        $GLOBALS['wp_filters'] = [];
        $GLOBALS['wp_current_filter'] = [];
        $GLOBALS['compat_enqueued_styles'] = [];
        $GLOBALS['compat_enqueued_scripts'] = [];
        new OldAlert();
        new Registrar();
        do_action('init');
    }

    /**
     * Inner alerts keep separate colors and remain siblings of the outer text.
     *
     * @dataProvider formattingProvider
     * @param bool $formatted Whether the_content already applied wpautop.
     */
    public function test_nested_alerts_preserve_paragraphs_and_independent_colors(bool $formatted): void
    {
        $source = "[alert style=\"warning\"]\n\nBefore\n\n"
            . "[inner_alert color=\"#04316A\" border_color=\"#fff\"]\n\nInside\n\n"
            . "<ul><li>A list item</li></ul>\n\n[/inner_alert]\n\nAfter\n\n[/alert]";
        $output = do_shortcode(shortcode_unautop($formatted ? wpautop($source) : $source));
        $xpath = $this->xpath($output);
        $this->assertSame(1, $xpath->query('//div[contains(@class,"alert-warning")]/div[contains(@class,"font-light")]')->length);
        $this->assertSame(1, $xpath->query('//div[contains(@class,"font-light")]/p[text()="Inside"]')->length);
        $this->assertSame(1, $xpath->query('//div[contains(@class,"alert-warning")]/p[text()="After"]')->length);
        $this->assertSame(1, $xpath->query('//ul/li[text()="A list item"]')->length);
        $this->assertStringContainsString('background-color:#04316a', $output);
        $this->assertDoesNotMatchRegularExpression('/<p>\s*<(?:div|ul|p)\b|<p>\s*<\/p>/', $output);
        $this->assertStringNotContainsString('[inner_alert', $output);
        $this->assertInstanceOf(Alert::class, $GLOBALS['shortcode_tags']['inner_alert'][0]);
        $this->assertNotContains('rrze-elements', $GLOBALS['compat_enqueued_styles']);
    }

    /** @return array<string, array{bool}> The two common WordPress content paths. */
    public function formattingProvider(): array
    {
        return ['shortcode block' => [false], 'classic content' => [true]];
    }

    /** Nested shortcodes run once and escaped examples stay literal. */
    public function test_nested_icons_notices_and_escaped_examples(): void
    {
        $calls = 0;
        /** Counts actual parser invocations, including accidental repeated passes. */
        add_shortcode('alert-probe', static function () use (&$calls): string {
            $calls++;
            return '<span>Once</span>';
        });
        $output = do_shortcode('[alert][inner_alert][alert-probe][icon icon="phone"]'
            . '[notice-tipp]Tip[/notice-tipp][/inner_alert]'
            . '<code>[[inner_alert]Literal[/inner_alert]]</code>[/alert]');
        $this->assertSame(1, $calls);
        $this->assertStringContainsString('#symbols-call', $output);
        $this->assertStringContainsString('notice-idea', $output);
        $this->assertStringContainsString('<code>[inner_alert]Literal[/inner_alert]</code>', $output);
    }

    /** Alerts work inside other migrated containers without replacing callbacks. */
    public function test_alert_inside_an_accordion_and_tabs(): void
    {
        $output = do_shortcode('[collapsibles][collapse title="More"]'
            . '[tabs][tab title="Details"][alert style="example" title="Example"]'
            . '[inner_alert]Body[/inner_alert][/alert][/tab][/tabs][/collapse][/collapsibles]');
        $this->assertStringContainsString('alert-example', $output);
        $this->assertStringContainsString('<p>Body</p>', $output);
        $this->assertStringNotContainsString('[inner_alert', $output);
        $this->assertSame(2, $this->xpath($output)->query('//div[contains(concat(" ",normalize-space(@class)," ")," alert ")]')->length);
    }

    /** Legacy layout columns surround migrated alerts and flowing text columns. */
    public function test_legacy_columns_and_text_columns_keep_the_inner_alert_adapter(): void
    {
        new \RRZE\Elements\Columns\Columns();
        new \RRZE\Elements\TextColumns\TextColumns();
        (new Registrar())->register();
        $callback = $GLOBALS['shortcode_tags']['inner_alert'];
        $output = do_shortcode('[alert color="#fff" border_color="#04316A"]'
            . '[columns number="3"][column span="1"]'
            . '[inner_alert color="#04316A"][divider]Research[/inner_alert][/column]'
            . '[column span="2"][text-columns]<p>First</p><p>Second</p>[/text-columns][/column]'
            . '[/columns][/alert]');
        $this->assertSame($callback, $GLOBALS['shortcode_tags']['inner_alert']);
        $this->assertStringContainsString('elements-textcolumns', $output);
        $this->assertStringContainsString('rrze-elements-blocks-text-column', $output);
        $this->assertSame(1, $this->xpath($output)->query('//div[contains(@class,"colspan-1")]/div[contains(@class,"font-light")]')->length);
        $this->assertStringContainsString('Research', $output);
    }

    /** Parses fragment structure while suppressing libxml's HTML5 diagnostics. */
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
