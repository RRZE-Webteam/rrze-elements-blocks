<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\Elements\TimeLine\TimeLine as OldTimeline;
use RRZE\ElementsBlocks\LegacyShortcodes\Registrar;
use RRZE\ElementsBlocks\LegacyShortcodes\Timeline;

final class LegacyShortcodesTimelineCompatibilityTest extends TestCase
{
    /** Registers the old plugin first, then the new default shortcode families. */
    protected function setUp(): void
    {
        $GLOBALS['shortcode_tags'] = [];
        $GLOBALS['wp_filter'] = [];
        $GLOBALS['wp_actions'] = [];
        $GLOBALS['wp_filters'] = [];
        $GLOBALS['wp_current_filter'] = [];
        $GLOBALS['compat_enqueued_styles'] = [];
        $GLOBALS['compat_enqueued_scripts'] = [];
        add_filter('sanitize_title', 'sanitize_title_with_dashes', 10, 3);
        new OldTimeline(RRZE_ELEMENTS_COMPAT_PLUGIN_FILE);
        new Registrar();
        do_action('init');
    }

    /**
     * Exercises WordPress formatting around adjacent legacy entries.
     *
     * @dataProvider separatorProvider
     * @param string $separator Whitespace used between item shortcodes.
     */
    public function test_documentation_items_render_in_order_without_paragraphs_between_them(string $separator): void
    {
        $source = '[timeline]' . $separator
            . '[timeline-item name="1800"]<h2>1800 – Wie alles begann</h2>'
            . 'First paragraph.' . "\n\n" . 'Second paragraph.<br>Still here.[/timeline-item]' . $separator
            . '[timeline-item name="1830"]<img src="https://example.com/history.jpg" alt="History">[/timeline-item]' . $separator
            . '[timeline-item name="1844"]<ul><li>A list item</li></ul>[/timeline-item]' . $separator
            . '[/timeline]';
        $output = $this->renderContent($source);
        $xpath = $this->xpath($output);
        $this->assertInstanceOf(Timeline::class, $GLOBALS['shortcode_tags']['timeline'][0]);
        $this->assertSame($GLOBALS['shortcode_tags']['timeline'][0], $GLOBALS['shortcode_tags']['timeline-item'][0]);
        $this->assertSame(3, $xpath->query('//ol[@class="timeline"]/li')->length);
        $this->assertSame(0, $xpath->query('//ol[@class="timeline"]/*[not(self::li)]')->length);
        $this->assertSame(['1800', '1830', '1844'], array_map(
            static fn(DOMNode $node): string => $node->textContent,
            iterator_to_array($xpath->query('//h3[@class="timeline-label"]'))
        ));
        $this->assertSame(1, $xpath->query('//li[@id="1800"]//h2')->length);
        $this->assertSame(1, $xpath->query('//p[text()="First paragraph."]')->length);
        $this->assertSame(1, $xpath->query('//p[contains(text(),"Second paragraph.")]/br')->length);
        $this->assertSame(1, $xpath->query('//img[@alt="History"]')->length);
        $this->assertSame(1, $xpath->query('//ul/li[text()="A list item"]')->length);
        $this->assertStringNotContainsString('[timeline', $output);
        $this->assertContains('rrze-timeline', $GLOBALS['compat_enqueued_scripts']);
        $this->assertNotContains('rrze-timelinr', $GLOBALS['compat_enqueued_scripts']);
    }

    /** @return array<string, array{string}> Common editor spacing patterns. */
    public function separatorProvider(): array
    {
        return ['adjacent' => [''], 'newline' => ["\n"], 'paragraphs' => ["\n\n"]];
    }

    /** Verifies the agreed migration from slider settings to a vertical list. */
    public function test_slider_attributes_no_longer_hide_or_reorder_content(): void
    {
        $output = $this->renderContent('[timeline orientation="vertical" speed="100" startat="2" autoplay="1" '
            . 'autoplaypause="100" fixedsize="1" datewidth="large" start-end="true"]'
            . '[timeline-item name="First"]One[/timeline-item][timeline-item name="Second"]Two[/timeline-item][/timeline]');
        $xpath = $this->xpath($output);
        $this->assertSame(2, $xpath->query('//ol[@class="timeline"]/li')->length);
        $this->assertSame(0, $xpath->query('//script | //*[@hidden] | //*[contains(@class,"timeline-nav")]')->length);
        $this->assertStringNotContainsString('timelinr', $output);
        $this->assertSame([], $GLOBALS['wp_filter']['wp_footer']->callbacks ?? []);
    }

    /** Exercises embedded adapters and a counter shortcode to detect duplicate work. */
    public function test_nested_shortcodes_execute_once_and_keep_the_new_icon_callback(): void
    {
        $calls = 0;
        add_shortcode('timeline-probe', static function () use (&$calls): string {
            $calls++;
            return '<span data-probe="yes">Once</span>';
        });
        $icon = $GLOBALS['shortcode_tags']['icon'];
        $output = $this->renderContent('[timeline][timeline-item name="Contact"]'
            . '[timeline-probe][icon icon="phone"]'
            . '[notice-tipp]A tip[/notice-tipp]'
            . '[tabs][tab title="Details"]Tab content[/tab][/tabs]'
            . '[collapsibles][collapse title="More"]Accordion content[/collapse][/collapsibles]'
            . '[/timeline-item][/timeline]');
        $xpath = $this->xpath($output);
        $this->assertSame(1, $calls);
        $this->assertSame($icon, $GLOBALS['shortcode_tags']['icon']);
        $this->assertSame(1, $xpath->query('//use[@href="#symbols-call"]')->length);
        $this->assertStringContainsString('A tip', $output);
        $this->assertStringContainsString('Tab content', $output);
        $this->assertStringContainsString('Accordion content', $output);
        $this->assertStringNotContainsString('[timeline-probe]', $output);
    }

    /** Verifies timeline rendering when another migrated shortcode is its parent. */
    public function test_timeline_can_be_nested_in_an_accordion(): void
    {
        $output = $this->renderContent('[collapsibles][collapse title="History"]'
            . '[timeline][timeline-item name="2026"]Content [icon icon="phone"][/timeline-item][/timeline]'
            . '[/collapse][/collapsibles]');
        $xpath = $this->xpath($output);
        $this->assertSame(1, $xpath->query('//ol[@class="timeline"]/li//use[@href="#symbols-call"]')->length);
        $this->assertStringContainsString('History', $output);
    }

    /** Checks safe labels, zero labels and ID collisions within and between groups. */
    public function test_names_are_escaped_and_repeated_names_get_unique_anchors(): void
    {
        $output = $this->renderContent('[timeline]'
            . '[timeline-item name="A & B <img src=x onerror=alert(1)>"]One[/timeline-item]'
            . '[timeline-item name="0"]Zero[/timeline-item]'
            . '[timeline-item name="2026"]Two[/timeline-item]'
            . '[timeline-item name="2026"]Three[/timeline-item][/timeline]'
            . '[timeline][timeline-item name="2026-2"]Four[/timeline-item]'
            . '[timeline-item name="2026"]Five[/timeline-item][/timeline]');
        $xpath = $this->xpath($output);
        $this->assertStringContainsString('A &amp; B', $output);
        $this->assertSame(0, $xpath->query('//img | //*[@onerror]')->length);
        $this->assertSame(1, $xpath->query('//h3[text()="0"]')->length);
        $ids = array_map(static fn(DOMElement $node): string => $node->getAttribute('id'),
            iterator_to_array($xpath->query('//ol[@class="timeline"]/li')));
        $this->assertCount(6, array_unique($ids));
        $this->assertContains('2026', $ids);
        $this->assertNotContains('', $ids);
    }

    /** Preserves orphan content and avoids empty lists or headings. */
    public function test_empty_groups_and_standalone_items_do_not_emit_invalid_lists(): void
    {
        $this->assertSame('', do_shortcode('[timeline][/timeline]'));
        $output = do_shortcode('[timeline-item]Standalone [icon icon="phone"][/timeline-item]');
        $this->assertStringContainsString('Standalone', $output);
        $this->assertStringContainsString('#symbols-call', $output);
        $this->assertStringNotContainsString('<li', $output);
        $output = do_shortcode('[timeline][timeline-item]Unnamed[/timeline-item][/timeline]');
        $xpath = $this->xpath($output);
        $this->assertSame(1, $xpath->query('//ol/li')->length);
        $this->assertSame(0, $xpath->query('//*[contains(@class,"timeline-label")]')->length);
        $this->assertStringContainsString('Unnamed', $output);
    }

    /**
     * Applies the relevant WordPress content filters in their normal order.
     *
     * @param string $source Source containing legacy shortcodes.
     * @return string Rendered HTML.
     */
    private function renderContent(string $source): string
    {
        return do_shortcode(shortcode_unautop(wpautop($source)));
    }

    /**
     * Parses output for semantic assertions while restoring libxml error handling.
     *
     * @param string $html Rendered HTML fragment.
     * @return DOMXPath Query object for the fragment's document.
     */
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
