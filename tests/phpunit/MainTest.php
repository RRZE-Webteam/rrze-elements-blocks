<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\Main;

final class MainTest extends TestCase
{
    public function test_filters_extend_allowed_html_and_styles(): void
    {
        $main = new Main(__FILE__);

        $allowed = $main->extendKsesAllowedHtml([
            'div' => ['class' => true],
        ]);

        $this->assertArrayHasKey('button', $allowed);
        $this->assertArrayHasKey('href', $allowed['button']);

        $styles = $main->extendAllowedCssStyles(['width']);
        $this->assertContains('fill', $styles);
    }

    public function test_get_jump_names_returns_response(): void
    {
        $main = new Main(__FILE__);
        $response = $main->getJumpNames();

        $this->assertInstanceOf(WP_REST_Response::class, $response);
        $this->assertSame(['panel_abc123', 'panel_xyz456'], $response->get_data());
    }
}
