<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\LegacyShortcodes\Accordion as LegacyAccordion;

final class LegacyShortcodesAccordionTest extends TestCase
{
    protected function setUp(): void
    {
        $GLOBALS['wp_test_do_shortcode'] = null;
        $GLOBALS['wp_test_enqueued_styles'] = [];
        $GLOBALS['wp_test_enqueued_scripts'] = [];
    }

    protected function tearDown(): void
    {
        $GLOBALS['wp_test_do_shortcode'] = null;
    }

    public function test_wrapper_and_panel_preserve_legacy_contract(): void
    {
        $adapter = new LegacyAccordion();
        $GLOBALS['wp_test_do_shortcode'] = static function (string $content) use ($adapter): string {
            if ($content !== 'children') {
                return $content;
            }

            return $adapter->shortcodeCollapse([
                'title' => 'First<br>panel',
                'name' => 'First Panel',
                'color' => 'primary',
                'load' => 'open',
                'suffix' => 'New',
            ], '<p>Content</p>', 'collapse');
        };

        $output = $adapter->shortcodeCollapsibles([
            'expand-all-link' => 'true',
            'register' => 'true',
            'hstart' => '3',
            'style' => 'light',
        ], 'children', 'collapsibles');
        $xpath = $this->createXPath($output);

        $this->assertSame(1, $xpath->query('//div[@id="accordion-0"]')->length);
        $this->assertSame(
            1,
            $xpath->query('//div[@id="accordion-0" and contains(@class, "style_light")]')->length
        );
        $this->assertSame(0, $xpath->query('//div[@id="accordion-0" and contains(@class, "rrze-elements")]')->length);
        $this->assertSame(1, $xpath->query('//button[contains(@class, "expand-all")]')->length);
        $this->assertSame(1, $xpath->query('//ul[contains(@class, "accordion-register")]/li/a[@href="#FirstPanel"]')->length);
        $this->assertSame(1, $xpath->query('//h3[contains(@class, "accordion-heading")]')->length);
        $this->assertSame(1, $xpath->query('//button[@id="collapse_button_0" and @data-href="#collapse_0"]')->length);
        $this->assertSame(1, $xpath->query('//button[@data-name="FirstPanel" and @aria-controls="collapse_0"]')->length);
        $this->assertSame(1, $xpath->query('//button[@aria-expanded="true" and contains(@class, "active")]')->length);
        $this->assertSame(1, $xpath->query('//button/br')->length);
        $this->assertSame('New', $xpath->query('//button/span[contains(@class, "accordion-suffix")]')->item(0)->textContent);
        $this->assertSame(1, $xpath->query('//div[@id="collapse_0" and @name="FirstPanel" and @aria-labelledby="collapse_button_0"]')->length);
        $this->assertContains('rrze-elements-blocks', $GLOBALS['wp_test_enqueued_styles']);
        $this->assertContains('rrze-accordions', $GLOBALS['wp_test_enqueued_scripts']);
    }

    public function test_default_wrapper_uses_canonical_block_classes_only(): void
    {
        $adapter = new LegacyAccordion();
        $output = $adapter->shortcodeCollapsibles([], '', 'collapsibles');
        $wrapper = $this->createXPath($output)->query('//div[@id="accordion-0"]')->item(0);

        $this->assertInstanceOf(DOMElement::class, $wrapper);
        $this->assertSame('accordion', $wrapper->getAttribute('class'));
    }

    public function test_four_shortcode_nested_structure_uses_matching_block_renderers(): void
    {
        $adapter = new LegacyAccordion();
        $GLOBALS['wp_test_do_shortcode'] = static function (string $content) use ($adapter): string {
            if ($content === 'nested-child') {
                return $adapter->shortcodeAccordionItem([
                    'title' => 'Nested',
                    'name' => 'nested',
                ], 'Nested body', 'accordion-item');
            }

            if ($content !== 'outer-children') {
                return $content;
            }

            $first = $adapter->shortcodeCollapse([
                'title' => 'Outer first',
                'name' => 'outer-first',
            ], 'First body', 'collapse');
            $nested = $adapter->shortcodeAccordions([
                'register' => 'true',
            ], 'nested-child', 'accordion');
            $last = $adapter->shortcodeCollapse([
                'title' => 'Outer last',
                'name' => 'outer-last',
            ], 'Last body', 'collapse');

            return $first . $nested . $last;
        };

        $output = $adapter->shortcodeCollapsibles([
            'register' => 'true',
            'hstart' => '2',
        ], 'outer-children', 'collapsibles');
        $xpath = $this->createXPath($output);
        $outer = $xpath->query('//div[@id="accordion-0"]')->item(0);
        $nested = $xpath->query('//div[@id="accordion-1"]')->item(0);

        $this->assertSame(3, $xpath->query('./ul/li/a', $outer)->length);
        $this->assertSame(1, $xpath->query('./ul/li/a', $nested)->length);
        $this->assertSame(
            2,
            $xpath->query('./div[contains(@class, "wp-block-rrze-elements-collapse")]/div/h2', $outer)->length
        );
        $this->assertSame(
            1,
            $xpath->query('./div[contains(@class, "wp-block-rrze-elements-accordion")]/div/h3', $nested)->length
        );
        $this->assertSame(1, $xpath->query(
            '//div[contains(concat(" ", normalize-space(@class), " "), " wp-block-rrze-elements-accordions ")]'
        )->length);
        $this->assertSame(1, $xpath->query(
            '//div[contains(concat(" ", normalize-space(@class), " "), " wp-block-rrze-elements-accordion ")]'
        )->length);
        $this->assertSame(1, $xpath->query('//button[@id="collapse_button_1" and @data-href="#collapse_1"]')->length);
        $this->assertSame(1, $xpath->query('//div[@id="collapse_1" and @aria-labelledby="collapse_button_1"]')->length);
    }

    public function test_explicit_id_and_stayopen_state_use_legacy_relationships(): void
    {
        $adapter = new LegacyAccordion();
        $output = $adapter->shortcodeCollapse([
            'id' => '42',
            'name' => 'jump_target',
            'load' => 'stayopen',
            'title' => 'Panel',
        ], 'Content', 'collapse');
        $xpath = $this->createXPath($output);

        $this->assertSame(1, $xpath->query('//button[@id="collapse_button_42" and @data-href="#collapse_42"]')->length);
        $this->assertSame(1, $xpath->query('//button[@aria-expanded="true" and not(contains(@class, "active"))]')->length);
        $this->assertSame(1, $xpath->query('//div[@id="collapse_42" and contains(@class, "stayopen")]')->length);
        $this->assertSame(1, $xpath->query('//h2')->length);
    }

    public function test_inner_item_preserves_legacy_attributes_through_accordion_renderer(): void
    {
        $adapter = new LegacyAccordion();
        $output = $adapter->shortcodeAccordionItem([
            'title' => 'Inner<br>title',
            'suffix' => 'New',
            'color' => 'phil',
            'name' => 'inner_target',
            'load' => 'open',
        ], 'Content', 'accordion-item');
        $xpath = $this->createXPath($output);

        $this->assertSame(1, $xpath->query('//div[contains(@class, "wp-block-rrze-elements-accordion")]')->length);
        $this->assertSame(1, $xpath->query('//div[contains(@class, "accordion-group") and contains(@class, "phil")]')->length);
        $this->assertSame(1, $xpath->query('//h2/button/br')->length);
        $this->assertSame('New', $xpath->query('//button/span[contains(@class, "accordion-suffix")]')->item(0)->textContent);
        $this->assertSame(1, $xpath->query('//button[@id="collapse_button_0" and @data-name="inner_target"]')->length);
        $this->assertSame(1, $xpath->query('//button[@aria-expanded="true" and contains(@class, "active")]')->length);
        $this->assertSame(1, $xpath->query('//div[@id="collapse_0" and @name="inner_target" and contains(@class, "open")]')->length);
    }

    public function test_context_is_restored_when_nested_rendering_throws(): void
    {
        $adapter = new LegacyAccordion();
        $GLOBALS['wp_test_do_shortcode'] = static function (string $content): string {
            if ($content === 'explode') {
                throw new RuntimeException('Expected test exception');
            }

            return $content;
        };

        try {
            $adapter->shortcodeCollapsibles(['hstart' => '5'], 'explode', 'collapsibles');
            $this->fail('The shortcode callback should have thrown.');
        } catch (RuntimeException $exception) {
            $this->assertSame('Expected test exception', $exception->getMessage());
        }

        $GLOBALS['wp_test_do_shortcode'] = null;
        $output = $adapter->shortcodeCollapse(['title' => 'Standalone'], 'Content', 'collapse');

        $this->assertSame(1, $this->createXPath($output)->query('//h2')->length);
    }

    private function createXPath(string $html): DOMXPath
    {
        $document = new DOMDocument();
        $previous = libxml_use_internal_errors(true);
        $document->loadHTML('<!DOCTYPE html><html><body>' . $html . '</body></html>');
        libxml_clear_errors();
        libxml_use_internal_errors($previous);

        return new DOMXPath($document);
    }
}
