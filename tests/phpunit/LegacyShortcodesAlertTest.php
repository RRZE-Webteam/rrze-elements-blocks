<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\BlockFrontend\Alert as AlertRender;
use RRZE\ElementsBlocks\LegacyShortcodes\Alert;

/** Covers legacy attribute mapping and the shared renderer's output boundaries. */
final class LegacyShortcodesAlertTest extends TestCase
{
    /** Resets the WordPress service stubs between tests. */
    protected function setUp(): void
    {
        $GLOBALS['wp_test_do_shortcode'] = null;
        $GLOBALS['wp_test_enqueued_styles'] = [];
        $GLOBALS['wp_test_enqueued_scripts'] = [];
    }

    /** Both names must use the same adapter, including standalone inner alerts. */
    public function test_both_tags_render_with_shared_styles(): void
    {
        $adapter = new Alert();
        $callbacks = $adapter->getShortcodes();
        $this->assertSame(['alert', 'inner_alert'], array_keys($callbacks));
        foreach ($callbacks as $tag => $callback) {
            $output = $callback('', null, $tag);
            $this->assertStringContainsString('alert-default', $output);
        }
        $this->assertSame(['rrze-elements-blocks'], array_values(array_unique($GLOBALS['wp_test_enqueued_styles'])));
        $this->assertSame([], $GLOBALS['wp_test_enqueued_scripts']);
    }

    /**
     * Standard variations override custom colors; unsupported shadows fall back.
     *
     * @dataProvider styleProvider
     * @param string $style Legacy style name.
     * @param string $expected Expected supported variation.
     */
    public function test_style_mapping(string $style, string $expected): void
    {
        $output = (new Alert())->shortcodeAlert(['style' => $style], '<p>Content</p>');
        $this->assertStringContainsString('alert-' . $expected, $output);
        $this->assertStringContainsString('<p>Content</p>', $output);
        $this->assertStringNotContainsString('shadow', $output);
    }

    /** @return array<string, array{string, string}> Supported styles and fallbacks. */
    public function styleProvider(): array
    {
        return [
            'default' => ['', 'default'],
            'success' => ['success', 'success'],
            'info' => ['info', 'info'],
            'warning' => ['warning', 'warning'],
            'danger' => ['danger', 'danger'],
            'example' => ['example', 'example'],
            'shadow' => ['shadow', 'default'],
            'hover shadow' => ['shadow-hover', 'default'],
            'unknown' => ['unknown', 'default'],
        ];
    }

    /** A named variation owns its palette, as it did in the old shortcode. */
    public function test_named_styles_ignore_custom_colors_and_unrelated_titles(): void
    {
        foreach (['success', 'info', 'warning', 'danger', 'example'] as $style) {
            $output = (new Alert())->shortcodeAlert([
                'style' => $style, 'color' => '#123456', 'border_color' => '#abcdef',
            ], 'Content');
            $this->assertStringNotContainsString('#123456', $output);
            $this->assertStringNotContainsString('#abcdef', $output);
        }
        $output = (new Alert())->shortcodeAlert(['style' => 'info', 'title' => 'Unused'], 'Content');
        $this->assertStringContainsString('alert-info', $output);
        $this->assertStringNotContainsString('Unused', $output);
    }

    /**
     * Custom backgrounds retain readable foregrounds for short and long hex values.
     *
     * @dataProvider colorProvider
     * @param string $color Legacy background color.
     * @param string $foreground Expected contrasting text color.
     */
    public function test_custom_colors_and_borders(string $color, string $foreground): void
    {
        $output = (new Alert())->shortcodeAlert([
            'color' => $color, 'border_color' => '#8FB1EF',
        ], '<p>Content</p>');
        $this->assertStringContainsString('background-color:' . strtolower(trim($color)), $output);
        $this->assertStringContainsString('color:' . $foreground, $output);
        $this->assertStringContainsString('border:1px solid #8fb1ef', $output);
        $this->assertSame($foreground === '#ffffff', str_contains($output, 'font-light'));
    }

    /** @return array<string, array{string, string}> Color and contrast fixtures. */
    public function colorProvider(): array
    {
        return [
            'dark blue' => ['#04316A', '#ffffff'],
            'short black' => ['#000', '#ffffff'],
            'short white' => ['#fff', '#000000'],
            'pink' => [' #fdc5f8 ', '#000000'],
            'palette color without a style' => ['#dff0d8', '#000000'],
        ];
    }

    /** Invalid CSS must not become a declaration or an HTML attribute. */
    public function test_invalid_colors_and_attribute_injection_are_rejected(): void
    {
        foreach (['red', '#12', '#gggggg', '#fff;position:fixed', '#fff" onmouseover="evil()'] as $color) {
            $output = (new Alert())->shortcodeAlert(['color' => $color, 'border_color' => $color], 'Body');
            $this->assertStringNotContainsString(' style=', $output);
            $this->assertStringContainsString('alert-default', $output);
        }
        $output = (new AlertRender())->render(['style' => 'info" onclick="evil()'], 'Body');
        $this->assertStringNotContainsString('onclick', $output);
        $this->assertStringContainsString('alert-default', $output);
    }

    /** The example label is escaped once; an empty title keeps the CSS fallback. */
    public function test_example_labels_and_default_label(): void
    {
        $output = (new Alert())->shortcodeAlert([
            'style' => 'example', 'title' => 'A "quoted" & useful example',
        ], 'Body');
        $this->assertStringContainsString('title="A &quot;quoted&quot; &amp; useful example"', $output);
        $this->assertStringContainsString('alert-example', $output);
        $output = (new Alert())->shortcodeAlert(['style' => 'example'], 'Body');
        $this->assertStringNotContainsString('title=""', $output);
    }

    /** Native block colors and borders use the same renderer as the shortcode. */
    public function test_native_block_custom_colors_and_label_remain_supported(): void
    {
        $output = (new AlertRender())->render([
            'style' => '', 'color' => '#123456', 'textColor' => '#fedcba', 'borderColor' => '#abc',
        ], '<p>Body</p>');
        $this->assertStringContainsString('background-color:#123456', $output);
        $this->assertStringContainsString('color:#fedcba', $output);
        $this->assertStringContainsString('border:1px solid #abc', $output);
        $output = (new AlertRender())->render(['title' => 'Block label'], 'Body');
        $this->assertStringContainsString('alert-example', $output);
        $this->assertStringContainsString('title="Block label"', $output);
    }
}
