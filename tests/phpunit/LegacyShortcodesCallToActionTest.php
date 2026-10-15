<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\LegacyShortcodes\CallToAction as LegacyCallToAction;

final class LegacyShortcodesCallToActionTest extends TestCase
{
    protected function setUp(): void
    {
        $GLOBALS['wp_test_attachment_ids'] = [];
        $GLOBALS['wp_test_attachment_urls'] = [];
        $GLOBALS['wp_test_attachment_alt'] = [];
        $GLOBALS['wp_test_enqueued_styles'] = [];
    }

    public function test_registers_the_case_sensitive_legacy_tag(): void
    {
        $this->assertSame(['CTA'], array_keys((new LegacyCallToAction())->getShortcodes()));
    }

    public function test_standard_cta_uses_shared_markup_and_local_image_metadata(): void
    {
        $source = 'https://example.com/uploads/source.jpg';
        $GLOBALS['wp_test_attachment_ids'][$source] = 42;
        $GLOBALS['wp_test_attachment_urls'][42] = 'https://example.com/uploads/source-large.jpg';
        $GLOBALS['wp_test_attachment_alt'][42] = 'Alternative image text';
        $xpath = $this->render([
            'title' => 'CTA title', 'subtitle' => 'CTA subtitle', 'button' => 'Learn more',
            'url' => 'https://example.com/destination', 'icon' => 'arrow-right',
            'image' => $source, 'style' => 'small', 'background' => 'rrze', 'color' => 'nat2',
        ]);

        $this->assertSame(1, $xpath->query('//div[contains(@class,"wp-block-rrze-elements-cta")]')->length);
        $this->assertSame(1, $xpath->query('//span[@class="cta-title" and text()="CTA title"]')->length);
        $this->assertSame(1, $xpath->query('//span[@class="cta-subtitle" and text()="CTA subtitle"]')->length);
        $this->assertSame(1, $xpath->query('//a[@href="https://example.com/destination" and contains(text(),"Learn more")]')->length);
        $this->assertSame(1, $xpath->query('//use[@href="#symbols-arrow_forward"]')->length);
        $this->assertSame(1, $xpath->query('//div[contains(@class,"style-small") and contains(@class,"color-nat2")]')->length);
        $this->assertSame(0, $xpath->query('//div[contains(@class,"bg-rrze")]')->length);
        $this->assertSame(1, $xpath->query('//img[@class="wp-image-42" and @src="https://example.com/uploads/source-large.jpg" and @alt="Alternative image text"]')->length);
        $this->assertContains('rrze-elements-blocks', $GLOBALS['wp_test_enqueued_styles']);
    }

    /** @dataProvider colorProvider */
    public function test_documented_colors_and_fallback_are_preserved(string $input, string $expected): void
    {
        $xpath = $this->render(['url' => '#', 'color' => $input]);
        $this->assertSame(1, $xpath->query('//div[contains(concat(" ",@class," ")," color-' . $expected . ' ")]')->length);
    }

    public function colorProvider(): array
    {
        $cases = [];
        foreach (['fau', 'fau2', 'phil', 'phil2', 'med', 'med2', 'nat', 'nat2', 'rw', 'rw2', 'tf', 'tf2'] as $color) {
            $cases[$color] = [$color, $color];
        }
        $cases['default'] = ['', 'fau'];
        $cases['invalid'] = ['phil extra-class', 'fau'];
        return $cases;
    }

    public function test_search_parameters_labels_and_additional_link_are_rendered(): void
    {
        $attributes = [
            'title' => 'Search', 'search' => 'person[query]', 'placeholder' => 'Find a person',
            'additional_link' => 'https://example.com/advanced', 'additional_link_text' => 'Advanced search',
        ];
        $xpath = $this->render($attributes);
        $input = $xpath->query('//input')->item(0);

        $this->assertSame('person[query]', $input->getAttribute('name'));
        $this->assertSame('Find a person', $input->getAttribute('placeholder'));
        $this->assertSame($input->getAttribute('id'), $xpath->query('//label')->item(0)->getAttribute('for'));
        $this->assertSame(1, $xpath->query('//form[@method="get" and @action="https://example.com/" and @role="search"]')->length);
        $this->assertSame(1, $xpath->query('//button[@type="submit"]//use[@href="#symbols-search"]')->length);
        $this->assertSame(1, $xpath->query('//a[@href="https://example.com/advanced" and text()="Advanced search"]')->length);
        $second = $this->render($attributes)->query('//input')->item(0);
        $this->assertNotSame($input->getAttribute('id'), $second->getAttribute('id'));
    }

    /** @dataProvider truthySearchProvider */
    public function test_legacy_truthy_search_values_use_the_wordpress_search_parameter(string $value): void
    {
        $xpath = $this->render(['search' => $value]);
        $this->assertSame(1, $xpath->query('//input[@name="s"]')->length);
    }

    public function truthySearchProvider(): array
    {
        return [['true'], ['1'], ['yes'], ['ja'], ['on']];
    }

    /** @dataProvider iconProvider */
    public function test_button_icons_use_the_shared_mapping(string $input, string $expected): void
    {
        $xpath = $this->render(['url' => '#', 'button' => 'More', 'icon' => $input]);
        $this->assertSame(1, $xpath->query('//a[contains(text(),"More")]')->length);
        $uses = $xpath->query('//use');
        if ($expected === '') {
            $this->assertSame(0, $uses->length);
        } else {
            $this->assertSame(1, $uses->length);
            $this->assertSame('#symbols-' . $expected, $uses->item(0)->getAttribute('href'));
        }
    }

    public function iconProvider(): array
    {
        return [
            'native button default' => ['', 'arrow_forward'],
            'legacy prefix' => ['regular envelope', 'mail'],
            'encoded quotes' => ['&quot;phone&quot;', 'call'],
            'unsupported' => ['brands github', ''],
        ];
    }

    public function test_empty_button_omits_the_link_as_documented(): void
    {
        $xpath = $this->render(['title' => 'Information', 'url' => '#', 'button' => '']);
        $this->assertSame(1, $xpath->query('//span[@class="cta-title"]')->length);
        $this->assertSame(0, $xpath->query('//a | //svg')->length);
    }

    public function test_remote_image_is_preserved_without_an_attachment_id(): void
    {
        $xpath = $this->render(['url' => '#', 'image' => 'https://external.example/image.jpg']);
        $this->assertSame(1, $xpath->query('//img[@src="https://external.example/image.jpg" and @alt=""]')->length);
        $this->assertSame(1, $xpath->query('//div[contains(@class,"has-image")]')->length);
    }

    public function test_generated_image_size_resolves_via_the_original_attachment(): void
    {
        $GLOBALS['wp_test_attachment_ids']['https://example.com/uploads/photo.jpg'] = 84;
        $GLOBALS['wp_test_attachment_urls'][84] = 'https://example.com/uploads/photo-1024x731.jpg';
        $xpath = $this->render(['url' => '#', 'image' => 'https://example.com/uploads/photo-300x214.jpg']);
        $this->assertSame(1, $xpath->query('//img[@class="wp-image-84" and @src="https://example.com/uploads/photo-1024x731.jpg"]')->length);
    }

    public function test_missing_url_including_wordpress_empty_attributes_uses_the_alert_renderer(): void
    {
        foreach ([[], ''] as $attributes) {
            $output = (new LegacyCallToAction())->shortcodeCTA($attributes);
            $this->assertStringContainsString('alert-danger', $output);
            $this->assertStringContainsString('<strong>URL missing.</strong>', $output);
            $this->assertStringNotContainsString('<!-- wp:', $output);
        }
    }

    private function render(array $attributes): DOMXPath
    {
        $output = (new LegacyCallToAction())->shortcodeCTA($attributes, '', 'CTA');
        $this->assertStringNotContainsString('<!-- wp:', $output, 'Exercise the shared renderer, not serialized block attributes.');
        $document = new DOMDocument();
        $previous = libxml_use_internal_errors(true);
        try {
            $this->assertTrue($document->loadHTML('<!DOCTYPE html><html><body>' . $output . '</body></html>'));
        } finally {
            libxml_clear_errors();
            libxml_use_internal_errors($previous);
        }
        return new DOMXPath($document);
    }
}
