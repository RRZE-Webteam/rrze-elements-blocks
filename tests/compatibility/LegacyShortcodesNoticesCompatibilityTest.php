<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\LegacyShortcodes\Notices;

final class LegacyShortcodesNoticesCompatibilityTest extends TestCase
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

        foreach ((new Notices())->getShortcodes() as $tag => $callback) {
            add_shortcode($tag, $callback);
        }
    }

    public function test_plain_text_paragraphs_are_formatted_with_wordpress(): void
    {
        // The unit suite's wpautop() stub cannot verify paragraph formatting.
        $output = do_shortcode("[notice-hinweis]First paragraph.\n\nSecond paragraph.[/notice-hinweis]");

        $this->assertStringContainsString('<p>First paragraph.</p>', $output);
        $this->assertStringContainsString('<p>Second paragraph.</p>', $output);
        $this->assertSame(2, $this->createXPath($output)->query('//p')->length);
        $this->assertDoesNotMatchRegularExpression('/<p>\s*<(?:p|div|ul)\b/', $output);
    }

    public function test_existing_paragraphs_links_and_lists_are_preserved_without_extra_paragraphs(): void
    {
        $paragraph = '<p>Call <a href="tel:+499111234">our office</a>.</p>';
        $list = '<ul><li><strong>First</strong> item</li><li>Second item</li></ul>';
        $output = do_shortcode('[notice-hinweis]' . $paragraph . $list . '[/notice-hinweis]');

        $this->assertStringContainsString($paragraph, $output);
        $xpath = $this->createXPath($output);
        $this->assertSame(1, $xpath->query('//p')->length);
        $this->assertSame(2, $xpath->query('//ul/li')->length);
        $this->assertSame(1, $xpath->query('//ul/li/strong')->length);
        $this->assertSame('First', $xpath->query('//ul/li/strong')->item(0)->textContent);
        $this->assertSame('Second item', $xpath->query('//ul/li')->item(1)->textContent);
        $this->assertDoesNotMatchRegularExpression('/<p>\s*<(?:p|div|ul)\b/', $output);
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
