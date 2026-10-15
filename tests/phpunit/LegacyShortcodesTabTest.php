<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\LegacyShortcodes\Tab as LegacyTab;

final class LegacyShortcodesTabTest extends TestCase
{
    private LegacyTab $adapter;

    protected function setUp(): void
    {
        $this->adapter = new LegacyTab();
        $GLOBALS['wp_test_do_shortcode'] = null;
        $GLOBALS['wp_test_enqueued_styles'] = [];
        $GLOBALS['wp_test_enqueued_scripts'] = [];
    }

    protected function tearDown(): void
    {
        $GLOBALS['wp_test_do_shortcode'] = null;
    }

    public function test_registers_both_callbacks_on_the_same_adapter(): void
    {
        $this->assertSame([
            'tabs' => [$this->adapter, 'shortcodeTabs'],
            'tab' => [$this->adapter, 'shortcodeTab'],
        ], $this->adapter->getShortcodes());
        foreach ($this->adapter->getShortcodes() as $callback) {
            $this->assertIsCallable($callback);
        }
    }

    public function test_navigation_and_panels_keep_their_order_and_accessible_links(): void
    {
        $output = $this->renderTabs([], [
            [['title' => 'First'], '<p>First body</p>'],
            [['title' => 'Second'], '<p>Second body</p>'],
        ]);
        $xpath = $this->createXPath($output);
        $this->assertTabLinks($xpath, 2);
        $this->assertSame(1, $xpath->query('//div[contains(@class, "wp-block-rrze-elements-tabs")]')->length);
        $this->assertSame(1, $xpath->query('//*[@role="tablist" and contains(@class, "manual")]')->length);
        $buttons = $xpath->query('//button[@role="tab"]');
        $this->assertSame('First', trim($buttons->item(0)->textContent));
        $this->assertSame('Second', trim($buttons->item(1)->textContent));
        $this->assertSame('true', $buttons->item(0)->getAttribute('aria-selected'));
        $this->assertSame('false', $buttons->item(1)->getAttribute('aria-selected'));
        $panels = $xpath->query('//*[@role="tabpanel"]');
        $this->assertStringContainsString('First body', $panels->item(0)->textContent);
        $this->assertStringContainsString('Second body', $panels->item(1)->textContent);
    }

    /** @dataProvider colorProvider */
    public function test_wrapper_colors_preserve_legacy_aliases(array $attributes, string $expected): void
    {
        $xpath = $this->createXPath($this->renderTabs($attributes));
        $groups = $xpath->query('//div[contains(concat(" ", normalize-space(@class), " "), " rrze-elements-tabs ")]');

        $this->assertSame(1, $groups->length);
        $classes = preg_split('/\s+/', trim($groups->item(0)->getAttribute('class')));
        $this->assertContains($expected, $classes);
        $this->assertNotContains('fau', $classes);
        $this->assertNotContains('zuv', $classes);
        $this->assertNotContains('not-a-color', $classes);
    }

    public function colorProvider(): array
    {
        return [
            'default' => [[], 'primary'],
            'primary' => [['color' => 'primary'], 'primary'],
            'fau alias' => [['color' => 'fau'], 'zentral'],
            'zuv alias' => [['color' => 'zuv'], 'zentral'],
            'phil' => [['color' => 'phil'], 'phil'],
            'nat' => [['color' => 'nat'], 'nat'],
            'med' => [['color' => 'med'], 'med'],
            'rw' => [['color' => 'rw'], 'rw'],
            'tf' => [['color' => 'tf'], 'tf'],
            'unknown uses block default' => [['color' => 'not-a-color'], 'primary'],
        ];
    }

    /** @dataProvider headingProvider */
    public function test_hstart_controls_the_print_heading(array $attributes, string $expected): void
    {
        $xpath = $this->createXPath($this->renderTabs($attributes));
        $headings = $xpath->query('//*[@role="tabpanel"]/*[contains(concat(" ", normalize-space(@class), " "), " print-only ")]');

        $this->assertSame(1, $headings->length);
        $this->assertSame($expected, $headings->item(0)->nodeName);
        $this->assertSame('Contact', trim($headings->item(0)->textContent));
    }

    public function headingProvider(): array
    {
        return [
            'default' => [[], 'h2'],
            'first level' => [['hstart' => '1'], 'h1'],
            'custom level' => [['hstart' => '4'], 'h4'],
            'last level' => [['hstart' => '6'], 'h6'],
            'too low' => [['hstart' => '0'], 'h2'],
            'too high' => [['hstart' => '7'], 'h2'],
            'not numeric' => [['hstart' => 'invalid'], 'h2'],
        ];
    }

    public function test_icon_is_mapped_in_navigation_and_print_heading(): void
    {
        $output = $this->renderTabs([], [[['title' => 'Contact', 'icon' => 'envelope'], '<p>Body</p>']]);
        $xpath = $this->createXPath($output);

        $this->assertSame(1, $xpath->query('//button[@role="tab"]//svg/use[@href="#symbols-mail"]')->length);
        $this->assertSame(1, $xpath->query('//*[@role="tabpanel"]/h2//svg/use[@href="#symbols-mail"]')->length);
    }

    public function test_missing_or_unsupported_icon_preserves_the_tab(): void
    {
        $output = $this->renderTabs([], [
            [['title' => 'No icon'], 'First body'],
            [['title' => 'Unsupported', 'icon' => 'brands github'], 'Second body'],
        ]);
        $xpath = $this->createXPath($output);

        $this->assertTabLinks($xpath, 2);
        $this->assertStringContainsString('First body', $output);
        $this->assertStringContainsString('Second body', $output);
        $this->assertSame(0, $xpath->query('//svg')->length);
    }

    public function test_suffix_is_shown_in_navigation_but_not_in_the_print_heading(): void
    {
        $output = $this->renderTabs([], [[['title' => 'Contact', 'suffix' => 'New & updated'], 'Body']]);
        $xpath = $this->createXPath($output);
        $suffixes = $xpath->query('//button[@role="tab"]//span[@class="tab-suffix"]');

        $this->assertSame(1, $suffixes->length);
        $this->assertSame('New & updated', $suffixes->item(0)->textContent);
        $headings = $xpath->query('//*[@role="tabpanel"]/h2');
        $this->assertSame(1, $headings->length);
        $this->assertSame('Contact', trim($headings->item(0)->textContent));
        $this->assertStringContainsString('New &amp; updated', $output);
    }

    public function test_titles_and_suffixes_cannot_inject_html(): void
    {
        $output = $this->renderTabs([], [[[
            'title' => 'Contact</span><img src=x onerror=alert(1)>',
            'suffix' => 'New</span><script>alert(1)</script>',
        ], '<p>Body</p>']]);
        $xpath = $this->createXPath($output);

        $this->assertTabLinks($xpath, 1);
        $this->assertStringContainsString('Contact', $xpath->query('//button[@role="tab"]')->item(0)->textContent);
        $this->assertStringContainsString('New', $xpath->query('//button[@role="tab"]')->item(0)->textContent);
        $this->assertSame(0, $xpath->query('//img | //script | //*[@onerror]')->length);
    }

    public function test_missing_title_has_a_label_and_zero_is_not_treated_as_empty(): void
    {
        $xpath = $this->createXPath($this->renderTabs([], [
            [[], 'First body'],
            [['title' => '0'], 'Second body'],
        ]));
        $this->assertTabLinks($xpath, 2);
        $buttons = $xpath->query('//button[@role="tab"]');
        $headings = $xpath->query('//*[@role="tabpanel"]/h2');

        $this->assertSame(2, $headings->length);
        $this->assertNotSame('', trim($buttons->item(0)->textContent));
        $this->assertSame(trim($buttons->item(0)->textContent), trim($headings->item(0)->textContent));
        $this->assertSame('0', trim($buttons->item(1)->textContent));
        $this->assertSame('0', trim($headings->item(1)->textContent));
    }

    public function test_duplicate_titles_and_successive_groups_have_unique_ids_and_independent_headings(): void
    {
        $first = $this->renderTabs(['hstart' => '5'], [
            [['title' => 'Same title'], 'One'],
            [['title' => 'Same-title'], 'Two'],
            [['title' => 'Same title'], 'Three'],
        ]);
        $second = $this->renderTabs([], [[['title' => 'Same title'], 'Four']]);
        $xpath = $this->createXPath($first . $second);

        $this->assertTabLinks($xpath, 4);
        $this->assertSame(3, $xpath->query('//*[@role="tabpanel"]/h5')->length);
        $this->assertSame(1, $xpath->query('//*[@role="tabpanel"]/h2')->length);
        $this->assertSame(2, $xpath->query('//button[@role="tab" and @aria-selected="true"]')->length);
    }

    public function test_unused_legacy_child_attributes_do_not_override_the_group_settings(): void
    {
        // The old callback reads these four attributes but never emits them.
        $output = $this->renderTabs(['color' => 'phil'], [
            [['title' => 'First'], 'One'],
            [[
                'title' => 'Second', 'color' => 'nat', 'id' => '12345',
                'name' => 'custom-anchor', 'load' => 'open',
            ], 'Two'],
        ]);
        $xpath = $this->createXPath($output);

        $this->assertTabLinks($xpath, 2);
        $this->assertSame('false', $xpath->query('//button[@role="tab"]')->item(1)->getAttribute('aria-selected'));
        $this->assertSame(0, $xpath->query('//*[@id="12345" or @id="custom-anchor" or @name="custom-anchor"]')->length);
        $this->assertSame(0, $xpath->query('//*[contains(concat(" ", normalize-space(@class), " "), " nat ") or contains(concat(" ", normalize-space(@class), " "), " open ")]')->length);
    }

    public function test_assets_are_requested_only_when_needed(): void
    {
        $this->adapter->enqueueAssets();
        $this->assertSame(['rrze-elements-blocks'], $GLOBALS['wp_test_enqueued_styles']);
        $this->assertSame([], $GLOBALS['wp_test_enqueued_scripts']);

        $this->renderTabs();

        $this->assertSame(['rrze-tabs'], array_values(array_unique($GLOBALS['wp_test_enqueued_scripts'])));
        $this->assertNotContains('rrze-elements', $GLOBALS['wp_test_enqueued_styles']);
    }

    public function test_empty_group_and_orphan_tab_preserve_content_without_broken_navigation(): void
    {
        $this->assertSame('', $this->adapter->shortcodeTabs('', null, 'tabs'));
        $this->assertSame('<p>Standalone</p>', $this->adapter->shortcodeTab('', '<p>Standalone</p>', 'tab'));
        $this->assertSame([], $GLOBALS['wp_test_enqueued_scripts']);
    }

    private function renderTabs(array $attributes = [], array $items = [[['title' => 'Contact'], '<p>Body</p>']]): string
    {
        // Exercise the real child callback; actual shortcode syntax is covered by the compatibility suite.
        $previous = $GLOBALS['wp_test_do_shortcode'];
        $GLOBALS['wp_test_do_shortcode'] = function (string $content) use ($items): string {
            if ($content !== 'tab-items') {
                return $content;
            }
            $output = '';
            foreach ($items as [$attributes, $body]) {
                $output .= $this->adapter->shortcodeTab($attributes, $body, 'tab');
            }
            return $output;
        };

        try {
            return $this->adapter->shortcodeTabs($attributes, 'tab-items', 'tabs');
        } finally {
            $GLOBALS['wp_test_do_shortcode'] = $previous;
        }
    }

    private function assertTabLinks(DOMXPath $xpath, int $count): void
    {
        $buttons = $xpath->query('//button[@role="tab"]');
        $this->assertSame($count, $buttons->length);
        $this->assertSame($count, $xpath->query('//*[@role="tabpanel"]')->length);
        $elements = [];
        foreach ($xpath->query('//*[@id]') as $element) {
            $id = $element->getAttribute('id');
            $this->assertNotSame('', $id);
            $this->assertArrayNotHasKey($id, $elements, 'Each HTML id must be unique.');
            $elements[$id] = $element;
        }
        foreach ($buttons as $button) {
            $this->assertSame('button', $button->getAttribute('type'));
            $this->assertNotSame('', $button->getAttribute('id'));
            $target = $button->getAttribute('aria-controls');
            $this->assertArrayHasKey($target, $elements);
            $this->assertSame('tabpanel', $elements[$target]->getAttribute('role'));
            $this->assertSame($button->getAttribute('id'), $elements[$target]->getAttribute('aria-labelledby'));
        }
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
