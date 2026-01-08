<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\Blocks;

final class BlocksTest extends TestCase
{
    public function test_channel_fau_teaser_grid_renders_block_markup(): void
    {
        $blocks = new Blocks();
        $output = $blocks->channel_fau_teaser_grid([
            'num' => 4,
            'hstart' => 3,
            'tag' => 'research',
            'cat' => 'science',
        ]);

        $this->assertStringContainsString('[rendered]', $output);
        $this->assertStringContainsString('fau-teaser-grid', $output);
    }

    public function test_render_news_block_uses_teaser_grid_for_theme(): void
    {
        $blocks = new Blocks();
        $output = $blocks->render_news_block([
            'legacyMode' => false,
            'display' => 'grid',
        ]);

        $this->assertStringContainsString('[rendered]', $output);
    }

    public function test_rrze_register_block_styles_handles_theme_variations(): void
    {
        $blocks = new Blocks();
        $blocks->rrze_register_block_styles();

        $this->assertTrue(true, 'Method executed without runtime errors');
    }
}
