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
    }
}
