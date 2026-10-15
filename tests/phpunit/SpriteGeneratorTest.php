<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\SpriteGenerator;

final class SpriteGeneratorTest extends TestCase
{
    public function test_icon_path_from_raw_replaces_whitespace_with_slash(): void
    {
        $this->assertSame('solid/cow', SpriteGenerator::iconPathFromRaw('solid  cow'));
    }

    public function test_icon_path_from_raw_preserves_existing_slashes(): void
    {
        $this->assertSame('regular/star', SpriteGenerator::iconPathFromRaw('regular/star'));
    }

    public function test_icon_path_from_raw_handles_backslashes(): void
    {
        $this->assertSame('brands/linkedin', SpriteGenerator::iconPathFromRaw('brands\\linkedin'));
    }

    public function test_svg_use_returns_svg_markup(): void
    {
        $markup = SpriteGenerator::svgUse('solid cow', 'icon-test');
        $this->assertStringContainsString('<svg', $markup);
        $this->assertStringContainsString('icon-test', $markup);
        $this->assertStringNotContainsString('style=', $markup);
    }

    public function test_percentage_sizes_are_rendered_without_format_errors(): void
    {
        $svg = new DOMDocument();
        $markup = SpriteGenerator::svgUse('symbols/check', '', '#abc', '50%');
        $this->assertTrue($svg->loadXML($markup));

        $this->assertSame('color: #abc; height: 50%; width: 50%;', $svg->documentElement->getAttribute('style'));
    }

    public function test_style_values_cannot_create_html_attributes(): void
    {
        $value = 'red" data-probe="injected';
        $svg = new DOMDocument();
        $this->assertTrue($svg->loadXML(SpriteGenerator::svgUse('symbols/check', '', $value)));

        $this->assertFalse($svg->documentElement->hasAttribute('data-probe'));
        $this->assertSame('color: ' . $value . ';', $svg->documentElement->getAttribute('style'));
    }

    public function test_inline_styles_keep_zero_values_and_omit_empty_values(): void
    {
        $this->assertSame(
            'style="border: 0; margin: 0;"',
            SpriteGenerator::weaveInlineStyles(['border' => '0', 'color' => '', 'margin' => '0'])
        );
        $this->assertSame('', SpriteGenerator::weaveInlineStyles([]));
        $this->assertSame('', SpriteGenerator::weaveInlineStyles(['color' => '', 'width' => '']));
    }
}
