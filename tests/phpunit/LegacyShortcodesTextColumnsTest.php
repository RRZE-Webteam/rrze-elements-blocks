<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\BlockFrontend\Columns;
use RRZE\ElementsBlocks\LegacyShortcodes\TextColumns;

/** Covers the legacy flowing-text contract and its shared block renderer. */
final class LegacyShortcodesTextColumnsTest extends TestCase
{
    /** Clears the asset and shortcode service stubs for every case. */
    protected function setUp(): void
    {
        $GLOBALS['wp_test_enqueued_styles'] = [];
        $GLOBALS['wp_test_enqueued_scripts'] = [];
        $GLOBALS['wp_test_do_shortcode'] = null;
    }

    /** Defaults match the old implementation and work without attributes or content. */
    public function test_default_callback_and_shared_assets(): void
    {
        $adapter = new TextColumns();
        $this->assertSame(['text-columns'], array_keys($adapter->getShortcodes()));
        $output = $adapter->getShortcodes()['text-columns']('', null, 'text-columns');
        $this->assertStringContainsString('rrze-elements-blocks-text-column', $output);
        $this->assertStringContainsString('columns:240px 2', $output);
        $this->assertStringContainsString('column-rule:1px solid var(--color-ContentBorders, #C3C3CB)', $output);
        $this->assertStringNotContainsString('background-color:', $output);
        $this->assertSame(['rrze-elements-blocks'], $GLOBALS['wp_test_enqueued_styles']);
        $this->assertSame([], $GLOBALS['wp_test_enqueued_scripts']);
    }

    /** The divider and outer border have independent colors. */
    public function test_custom_dimensions_and_independent_lines(): void
    {
        $output = (new TextColumns())->shortcodeTextColumns([
            'number' => '4', 'width' => '180', 'rule-color' => '#ABC', 'border-color' => '#123456',
        ], '<p>Body</p>');
        $this->assertStringContainsString('columns:180px 4', $output);
        $this->assertStringContainsString('column-rule:1px solid #abc', $output);
        $this->assertStringContainsString('border:1px solid #123456', $output);
        $this->assertStringContainsString('<p>Body</p>', $output);
    }

    /**
     * Legacy boolean spellings control only the divider, never the outer frame.
     *
     * @dataProvider ruleProvider
     * @param string $value Shortcode attribute.
     * @param bool $enabled Whether to draw the divider.
     */
    public function test_rule_boolean_values(string $value, bool $enabled): void
    {
        $output = (new TextColumns())->shortcodeTextColumns(['rule' => $value, 'border-color' => '#abc']);
        $this->assertStringContainsString($enabled ? 'column-rule:1px solid' : 'column-rule:none', $output);
        $this->assertStringContainsString('border:1px solid #abc', $output);
    }

    /** @return array<string, array{string, bool}> Accepted legacy booleans and false values. */
    public function ruleProvider(): array
    {
        return ['true' => ['true', true], 'yes' => ['yes', true], 'ja' => ['ja', true],
            'on' => ['on', true], 'one' => ['1', true], 'false' => ['false', false],
            'zero' => ['0', false], 'empty' => ['', false]];
    }

    /** Custom backgrounds retain automatic contrast; the old unused font attribute stays inert. */
    public function test_custom_background_contrast(): void
    {
        foreach (['#000' => '#ffffff', '#04316A' => '#ffffff', '#fff' => '#000000'] as $color => $text) {
            $output = (new TextColumns())->shortcodeTextColumns(['background-color' => $color, 'font' => 'dark']);
            $this->assertStringContainsString('background-color:' . strtolower($color), $output);
            $this->assertStringContainsString('color:' . $text, $output);
            $this->assertStringContainsString('padding:0.8em', $output);
        }
    }

    /** All documented alert variations use the current alert renderer and override custom box colors. */
    public function test_named_styles_use_alert_design_but_keep_the_divider(): void
    {
        foreach (['success', 'info', 'warning', 'danger', 'example'] as $style) {
            $output = (new TextColumns())->shortcodeTextColumns([
                'style' => $style, 'background-color' => '#123456', 'border-color' => '#abcdef',
                'rule-color' => '#333',
            ], 'Body');
            $this->assertStringContainsString('alert-' . $style, $output);
            $this->assertStringContainsString('column-rule:1px solid #333', $output);
            $this->assertStringNotContainsString('#123456', $output);
            $this->assertStringNotContainsString('#abcdef', $output);
        }
    }

    /** Unknown styles keep valid custom colors; invalid CSS cannot inject declarations. */
    public function test_invalid_input_has_safe_fallbacks(): void
    {
        $output = (new TextColumns())->shortcodeTextColumns([
            'number' => '0', 'width' => 'garbage', 'style' => 'shadow', 'background-color' => '#fff',
        ]);
        $this->assertStringContainsString('columns:240px 2', $output);
        $this->assertStringContainsString('background-color:#fff', $output);
        $this->assertStringNotContainsString('alert-shadow', $output);
        foreach (['#ggg', '#12', '#fff;position:fixed', '#fff" onclick="evil()'] as $color) {
            $output = (new TextColumns())->shortcodeTextColumns([
                'background-color' => $color, 'border-color' => $color, 'rule-color' => $color,
            ]);
            $this->assertStringNotContainsString('background-color:', $output);
            $this->assertStringNotContainsString('border:1px', $output);
            $this->assertStringNotContainsString('position:', $output);
            $this->assertStringNotContainsString('onclick', $output);
        }
    }

    /** Native blocks keep their palette, unit widths, class names and shared border/rule color. */
    public function test_native_block_attributes_and_saved_markup_remain_supported(): void
    {
        $renderer = new Columns();
        $output = $renderer->render([
            'numberOfColumns' => 3, 'width' => '15rem', 'rule' => true, 'border' => true,
            'borderColor' => '#123456', 'colorSlug' => 'success', 'className' => 'custom-columns',
        ], '<p>Native block</p>');
        foreach (['columns:15rem 3', 'column-rule:1px solid #123456',
            'border:1px solid #123456', 'bg-success', 'custom-columns', '<p>Native block</p>'] as $part) {
            $this->assertStringContainsString($part, $output);
        }
        $saved = '<div class="saved-columns">Static content</div>';
        $this->assertSame($saved, $renderer->render([], $saved, new WP_Block(['innerHTML' => $saved])));
        $this->assertStringContainsString('columns:240px 2', $renderer->render([], 'Default block'));
    }
}
