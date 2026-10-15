<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\Elements\CTA\CTA as OldCTA;
use RRZE\Elements\Icon\Icon as OldIcon;
use RRZE\ElementsBlocks\LegacyShortcodes\CallToAction;
use RRZE\ElementsBlocks\LegacyShortcodes\Registrar;

final class LegacyShortcodesCallToActionCompatibilityTest extends TestCase
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
        new OldIcon(RRZE_ELEMENTS_COMPAT_PLUGIN_FILE);
        new OldCTA(RRZE_ELEMENTS_COMPAT_PLUGIN_FILE);
        new Registrar();
        do_action('init');
        $this->assertInstanceOf(CallToAction::class, $GLOBALS['shortcode_tags']['CTA'][0]);
    }

    /** @dataProvider documentationProvider */
    public function test_documentation_examples_render_with_the_shared_block(string $extra, bool $image, bool $search, string $color): void
    {
        $url = 'https://www.wp.rrze.fau.de/files/2022/07/lance-reis-7dY_rFuvxQ4-unsplash.jpg';
        $source = '[CTA title="Der Titel des CTA!" subtitle="Der Untertitel des CTA" '
            . 'button="FAU Forschung kennenlernen" url="#" ' . $extra
            . ($image ? ' image="' . $url . '"' : '') . ']';
        $output = do_shortcode(shortcode_unautop(wpautop($source)));
        $xpath = $this->createXPath($output);

        $this->assertSame(1, $xpath->query('//div[contains(@class,"wp-block-rrze-elements-cta")]')->length);
        $this->assertSame($image ? 1 : 0, $xpath->query('//img[@src="' . $url . '"]')->length);
        $this->assertSame(1, $xpath->query('//div[contains(@class,"color-' . $color . '")]')->length);
        $this->assertSame(0, $xpath->query('//div[contains(@class,"bg-1") or contains(@class,"bg-rrze")]')->length);
        $this->assertSame($search ? 1 : 0, $xpath->query('//form[@role="search"]')->length);
        $symbol = $search ? 'search' : 'arrow_forward';
        $this->assertSame(1, $xpath->query('//use[@href="#symbols-' . $symbol . '"]')->length);
        $this->assertStringNotContainsString('[CTA', $output);
        $this->assertDoesNotMatchRegularExpression('/<p>\s*<div\b/', $output);
    }

    public function documentationProvider(): array
    {
        return [
            'with image and ignored legacy background' => ['icon="arrow-right" background="1"', true, false, 'fau'],
            'without background attribute' => ['icon="arrow-right"', true, false, 'fau'],
            'without image' => ['icon="arrow-right" background="1"', false, false, 'fau'],
            'search' => ['search="1" background="1"', true, true, 'fau'],
            'faculty' => ['color="phil" icon="arrow-right"', true, false, 'phil'],
        ];
    }

    public function test_unsafe_urls_and_attribute_markup_do_not_reach_the_output(): void
    {
        $output = do_shortcode('[CTA url="javascript:alert(1)" button="Click"]');
        $this->assertStringContainsString('URL missing.', $output);
        $this->assertStringNotContainsString('<a ', $output);

        $output = do_shortcode('[CTA url="https://example.com/?a=1&b=2" button="A & B" title="<img src=x onerror=alert(1)>Title" '
            . 'image="javascript:alert(1)" background="1 extra" color="phil extra" style="small extra"]');
        $xpath = $this->createXPath($output);
        $this->assertSame(0, $xpath->query('//img | //*[@onerror]')->length);
        $this->assertSame(1, $xpath->query('//a[@href="https://example.com/?a=1&b=2"]')->length);
        $this->assertStringContainsString('A &amp; B', $output);
        $this->assertStringNotContainsString('bg-1', $output);
        $this->assertStringNotContainsString('style-small', $output);
        $this->assertStringContainsString('color-fau', $output);
    }

    public function test_search_uses_custom_parameter_local_fallback_and_additional_link(): void
    {
        $output = do_shortcode('[CTA search="PersonQuery" placeholder="A & B" additional_link="/advanced/"]');
        $xpath = $this->createXPath($output);
        $input = $xpath->query('//input[@name="PersonQuery"]')->item(0);
        $this->assertNotNull($input);
        $this->assertSame('A & B', $input->getAttribute('placeholder'));
        $this->assertSame($input->getAttribute('id'), $xpath->query('//label')->item(0)->getAttribute('for'));
        $this->assertSame(1, $xpath->query('//form[@action="https://example.com/" and @method="get"]')->length);
        $this->assertSame(1, $xpath->query('//a[@href="/advanced/" and text()="/advanced/"]')->length);
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
