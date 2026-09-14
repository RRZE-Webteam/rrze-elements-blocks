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
    }

    public function test_registers_the_case_sensitive_legacy_tag(): void
    {
        $shortcodes = (new LegacyCallToAction())->getShortcodes();

        $this->assertSame(['CTA'], array_keys($shortcodes));
    }

    public function test_standard_cta_maps_to_the_dynamic_cta_block(): void
    {
        $sourceImage = 'https://example.com/uploads/source.jpg';
        $GLOBALS['wp_test_attachment_ids'][$sourceImage] = 42;
        $GLOBALS['wp_test_attachment_urls'][42] = 'https://example.com/uploads/source-large.jpg';
        $GLOBALS['wp_test_attachment_alt'][42] = 'Alternative image text';

        $output = (new LegacyCallToAction())->shortcodeCTA([
            'title' => 'CTA title',
            'subtitle' => 'CTA subtitle',
            'button' => 'Learn more',
            'url' => 'https://example.com/destination',
            'icon' => 'arrow-right',
            'image' => $sourceImage,
            'style' => 'small',
            'background' => 'rrze',
            'color' => 'nat2',
        ], '', 'CTA');

        $attributes = $this->getBlockAttributes($output);

        $this->assertStringStartsWith('[rendered]<!-- wp:rrze-elements/cta ', $output);
        $this->assertSame('CTA title', $attributes['title']);
        $this->assertSame('CTA subtitle', $attributes['subtitle']);
        $this->assertSame('Learn more', $attributes['buttonText']);
        $this->assertSame('https://example.com/destination', $attributes['buttonUrl']);
        $this->assertSame('style-small bg-rrze', $attributes['background']);
        $this->assertArrayNotHasKey('className', $attributes);
        $this->assertFalse($attributes['isSearch']);
        $this->assertSame('solid arrow-right', $attributes['icon']);
        $this->assertSame(42, $attributes['id']);
        $this->assertSame('https://example.com/uploads/source-large.jpg', $attributes['url']);
        $this->assertSame('Alternative image text', $attributes['alt']);
    }

    public function test_search_cta_preserves_search_and_additional_link_attributes(): void
    {
        $output = (new LegacyCallToAction())->shortcodeCTA([
            'title' => 'Search',
            'search' => 'person-query',
            'placeholder' => 'Find a person',
            'additional_link' => 'https://example.com/advanced',
            'additional_link_text' => 'Advanced search',
        ], '', 'CTA');

        $attributes = $this->getBlockAttributes($output);

        $this->assertTrue($attributes['isSearch']);
        $this->assertSame('person-query', $attributes['searchParameter']);
        $this->assertSame('Find a person', $attributes['placeholder']);
        $this->assertSame('https://example.com/advanced', $attributes['additionalLink']);
        $this->assertSame('Advanced search', $attributes['additionalLinkText']);
        $this->assertSame('has-additional-link', $attributes['background']);
        $this->assertArrayNotHasKey('className', $attributes);
        $this->assertSame('solid magnifying-glass', $attributes['icon']);
    }

    public function test_button_cta_uses_the_native_arrow_when_legacy_icon_is_omitted(): void
    {
        $attributes = $this->getBlockAttributes(
            (new LegacyCallToAction())->shortcodeCTA([
                'button' => 'Learn more',
                'url' => 'https://example.com',
            ], '', 'CTA')
        );

        $this->assertSame('solid arrow-right', $attributes['icon']);
    }

    public function test_title_only_cta_does_not_gain_a_phantom_icon(): void
    {
        $attributes = $this->getBlockAttributes(
            (new LegacyCallToAction())->shortcodeCTA([
                'title' => 'Information',
                'url' => 'https://example.com',
            ], '', 'CTA')
        );

        $this->assertSame('', $attributes['icon']);
    }

    /**
     * @dataProvider truthySearchProvider
     */
    public function test_legacy_truthy_search_values_use_the_wordpress_search_parameter(string $value): void
    {
        $attributes = $this->getBlockAttributes(
            (new LegacyCallToAction())->shortcodeCTA(['search' => $value], '', 'CTA')
        );

        $this->assertSame('s', $attributes['searchParameter']);
    }

    /**
     * @return array<string, array{string}>
     */
    public function truthySearchProvider(): array
    {
        return [
            'true' => ['true'],
            'one' => ['1'],
            'yes' => ['yes'],
            'german yes' => ['ja'],
            'on' => ['on'],
        ];
    }

    public function test_remote_image_is_preserved_without_an_attachment_id(): void
    {
        $attributes = $this->getBlockAttributes(
            (new LegacyCallToAction())->shortcodeCTA([
                'url' => 'https://example.com',
                'image' => 'https://external.example/image.jpg',
            ], '', 'CTA')
        );

        $this->assertArrayNotHasKey('id', $attributes);
        $this->assertSame('https://external.example/image.jpg', $attributes['url']);
    }

    public function test_generated_image_size_url_resolves_via_the_original_attachment(): void
    {
        $thumbnail = 'https://example.com/uploads/photo-300x214.jpg';
        $original = 'https://example.com/uploads/photo.jpg';
        $GLOBALS['wp_test_attachment_ids'][$original] = 84;
        $GLOBALS['wp_test_attachment_urls'][84] = 'https://example.com/uploads/photo-1024x731.jpg';

        $attributes = $this->getBlockAttributes(
            (new LegacyCallToAction())->shortcodeCTA([
                'url' => 'https://example.com',
                'image' => $thumbnail,
            ], '', 'CTA')
        );

        $this->assertSame(84, $attributes['id']);
        $this->assertSame('https://example.com/uploads/photo-1024x731.jpg', $attributes['url']);
    }

    public function test_missing_url_uses_the_alert_block(): void
    {
        $output = (new LegacyCallToAction())->shortcodeCTA([], '', 'CTA');

        $this->assertStringStartsWith(
            '[rendered]<!-- wp:rrze-elements/alert {"style":"danger"} -->',
            $output
        );
        $this->assertStringContainsString('<strong>URL missing.</strong>', $output);
        $this->assertStringContainsString('<code>url</code>', $output);
    }

    /**
     * @return array<string, mixed>
     */
    private function getBlockAttributes(string $output): array
    {
        $matched = preg_match('/<!-- wp:rrze-elements\/cta (.+) \/-->/', $output, $matches);
        $this->assertSame(1, $matched);

        $attributes = json_decode($matches[1], true, 512, JSON_THROW_ON_ERROR);
        $this->assertIsArray($attributes);

        return $attributes;
    }
}
