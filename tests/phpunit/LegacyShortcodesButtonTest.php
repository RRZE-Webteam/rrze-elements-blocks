<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\LegacyShortcodes\Button as LegacyButton;

final class LegacyShortcodesButtonTest extends TestCase
{
    protected function setUp(): void
    {
        $GLOBALS['wp_test_do_shortcode'] = null;
    }

    protected function tearDown(): void
    {
        $GLOBALS['wp_test_do_shortcode'] = null;
    }

    public function test_default_shortcode_renders_native_core_button_blocks(): void
    {
        $output = (new LegacyButton())->shortcodeButton([], 'Button text', 'button');

        $this->assertStringStartsWith('[rendered]<!-- wp:buttons -->', $output);
        $this->assertStringContainsString('<!-- wp:button -->', $output);
        $this->assertStringContainsString('<div class="wp-block-buttons">', $output);
        $this->assertStringContainsString('<div class="wp-block-button">', $output);
        $this->assertStringContainsString(
            '<a class="wp-block-button__link wp-element-button" href="#">Button text</a>',
            $output
        );
        $this->assertStringNotContainsString('standard-btn', $output);
        $this->assertStringNotContainsString('rrze-elements', $output);
    }

    public function test_link_accessibility_and_nested_shortcode_content_are_preserved(): void
    {
        $GLOBALS['wp_test_do_shortcode'] = static fn(string $content): string =>
            $content === 'label' ? '<strong>Nested label</strong>' : $content;

        $output = (new LegacyButton())->shortcodeButton([
            'link' => 'https://example.com/path',
            'target' => 'blank',
            'title' => 'More information',
            'aria-label' => 'More information about testing',
        ], 'label', 'button');

        $this->assertStringContainsString('href="https://example.com/path"', $output);
        $this->assertStringContainsString('target="_blank" rel="noopener noreferrer"', $output);
        $this->assertStringContainsString('title="More information"', $output);
        $this->assertStringContainsString('aria-label="More information about testing"', $output);
        $this->assertStringContainsString('<strong>Nested label</strong>', $output);
    }

    public function test_button_label_rejects_block_and_link_markup(): void
    {
        $output = (new LegacyButton())->shortcodeButton(
            [],
            '<h2>Heading</h2><a href="https://example.com">Nested link</a><em>Allowed</em>',
            'button'
        );

        $this->assertStringNotContainsString('<h2>', $output);
        $this->assertStringNotContainsString('<a href="https://example.com">', $output);
        $this->assertStringContainsString('HeadingNested link<em>Allowed</em>', $output);
    }

    /**
     * @dataProvider semanticStyleProvider
     */
    public function test_semantic_styles_map_to_core_block_styles(
        string $style,
        string $background,
        string $text
    ): void {
        $output = (new LegacyButton())->shortcodeButton(['style' => $style], ucfirst($style), 'button');

        $this->assertStringContainsString('background-color:' . $background, $output);
        $this->assertStringContainsString('color:' . $text, $output);
        $this->assertStringContainsString('"color":{"background":"' . $background . '","text":"' . $text . '"}', $output);
    }

    /**
     * @return array<string, array{string, string, string}>
     */
    public function semanticStyleProvider(): array
    {
        return [
            'success' => ['success', '#115c39', '#ffffff'],
            'info' => ['info', '#0dcaf0', '#000000'],
            'warning' => ['warning', '#ffc107', '#000000'],
            'danger' => ['danger', '#921925', '#ffffff'],
        ];
    }

    public function test_primary_and_ghost_use_native_theme_variants(): void
    {
        $primary = (new LegacyButton())->shortcodeButton(['style' => 'primary'], 'Primary', 'button');
        $ghost = (new LegacyButton())->shortcodeButton(['style' => 'ghost'], 'Ghost', 'button');

        $this->assertStringNotContainsString('background-color:', $primary);
        $this->assertStringContainsString(
            'wp-block-button is-style-outline is-style-secondary',
            $ghost
        );
    }

    public function test_custom_colors_preserve_contrast_border_and_style_priority(): void
    {
        $custom = (new LegacyButton())->shortcodeButton([
            'color' => '#1f4c7a',
            'border_color' => '#8fb1ef',
        ], 'Custom', 'button');
        $styled = (new LegacyButton())->shortcodeButton([
            'style' => 'warning',
            'color' => '#1f4c7a',
            'border_color' => '#00ffff',
        ], 'Styled', 'button');

        $this->assertStringContainsString('background-color:#1f4c7a', $custom);
        $this->assertStringContainsString('color:#ffffff', $custom);
        $this->assertStringContainsString('border:1px solid #8fb1ef', $custom);
        $this->assertStringContainsString('background-color:#ffc107', $styled);
        $this->assertStringNotContainsString('background-color:#1f4c7a', $styled);
        $this->assertStringContainsString('border:1px solid #00ffff', $styled);
    }

    public function test_size_and_width_variants_are_normalized(): void
    {
        $large = (new LegacyButton())->shortcodeButton(['size' => 'large'], 'Large', 'button');
        $full = (new LegacyButton())->shortcodeButton(['width' => 'full'], 'Full', 'button');
        $fixed = (new LegacyButton())->shortcodeButton(['width' => '235px'], 'Fixed', 'button');
        $roundHundreds = (new LegacyButton())->shortcodeButton(['width' => '200'], 'Fixed', 'button');
        $invalid = (new LegacyButton())->shortcodeButton(['width' => 'calc(100% + 1px)'], 'Invalid', 'button');

        $this->assertStringContainsString('font-size:1.4375rem', $large);
        $this->assertStringContainsString('padding:14px 20px 13px', $large);
        $this->assertStringContainsString('wp-block-button__width-100', $full);
        $this->assertStringContainsString('"width":100', $full);
        $this->assertStringContainsString(
            '<div class="wp-block-buttons" style="inline-size:235px;max-inline-size:100%">',
            $fixed
        );
        $this->assertStringContainsString('inline-size:200px', $roundHundreds);
        $this->assertStringContainsString('wp-block-button__width-100', $fixed);
        $this->assertStringContainsString('"width":100', $fixed);
        $this->assertStringNotContainsString('calc(100%', $invalid);
    }
}
