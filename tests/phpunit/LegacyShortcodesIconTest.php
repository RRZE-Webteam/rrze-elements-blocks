<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\LegacyShortcodes\Icon;

final class LegacyShortcodesIconTest extends TestCase
{
    protected function setUp(): void
    {
        $GLOBALS['wp_test_enqueued_styles'] = [];
    }

    /**
     * @dataProvider mappedIconProvider
     */
    public function test_legacy_names_render_the_mapped_material_svg(string $legacy, string $material): void
    {
        $output = (new Icon())->shortcodeIcon(['icon' => $legacy]);
        $svg = new DOMDocument();
        $this->assertTrue($svg->loadXML($output));
        $expected = new DOMDocument();
        $expected->load(dirname(__DIR__, 2) . '/src/_shared/icons/symbols/' . $material . '.svg');

        $this->assertSame(
            $expected->getElementsByTagName('path')->item(0)->getAttribute('d'),
            $svg->getElementsByTagName('path')->item(0)->getAttribute('d')
        );
        $this->assertSame('1em', $svg->documentElement->getAttribute('height'));
        $this->assertSame('1em', $svg->documentElement->getAttribute('width'));
        $this->assertSame('true', $svg->documentElement->getAttribute('aria-hidden'));
        $this->assertSame('false', $svg->documentElement->getAttribute('focusable'));
        $this->assertStringNotContainsString('Font Awesome', $output);
        $this->assertSame(['rrze-elements-blocks'], $GLOBALS['wp_test_enqueued_styles']);
    }

    public function mappedIconProvider(): array
    {
        return [
            'bare legacy name' => ['pencil', 'edit'],
            'solid prefix' => ['solid arrow-right', 'arrow_forward'],
            'regular prefix' => ['regular circle-user', 'account_circle'],
            'old alias' => ['user-circle', 'account_circle'],
            'mapped brand' => ['brands android', 'android'],
            'numeric name' => ['0', 'counter_0'],
            'whitespace' => ['  regular   circle-user  ', 'account_circle'],
        ];
    }

    /**
     * @dataProvider unsupportedIconProvider
     */
    public function test_unsupported_icons_never_fall_back_to_font_awesome(string $name): void
    {
        $output = (new Icon())->shortcodeIcon(['icon' => $name]);

        $this->assertSame('<span class="rrze-elements-icon-error">Icon not found.</span>', $output);
        $this->assertStringNotContainsString('<svg', $output);
    }

    public function unsupportedIconProvider(): array
    {
        return [
            'unknown' => ['not-a-real-icon'],
            'existing FA brand without mapping' => ['brands github'],
            'mapped symbol absent from assets' => ['fill-drip'],
            'path traversal' => ['../solid/house'],
            'absolute path' => ['/tmp/icon'],
            'extra tokens' => ['solid home extra'],
        ];
    }

    public function test_missing_icon_is_empty_and_missing_list_icon_preserves_content(): void
    {
        $adapter = new Icon();
        $this->assertSame('', $adapter->shortcodeIcon(''));
        $this->assertSame('', $adapter->shortcodeIcon([]));
        $this->assertSame('<ul><li>Text</li></ul>', $adapter->shortcodeListIcons('', '<ul><li>Text</li></ul>'));
        $this->assertSame([], $GLOBALS['wp_test_enqueued_styles']);
    }

    public function test_unsupported_list_icon_preserves_the_list(): void
    {
        $content = '<ul class="existing"><li>Keep this text</li></ul>';
        $output = (new Icon())->shortcodeListIcons(['icon' => 'brands github'], $content);

        $this->assertStringContainsString('Icon not found.', $output);
        $this->assertStringEndsWith($content, $output);
    }

    public function test_alt_text_is_an_escaped_accessible_name(): void
    {
        $label = 'Edit "title" & description';
        $output = (new Icon())->shortcodeIcon(['icon' => 'pencil', 'alt' => $label]);
        $svg = new DOMDocument();
        $this->assertTrue($svg->loadXML($output));

        $this->assertSame('img', $svg->documentElement->getAttribute('role'));
        $this->assertSame($label, $svg->documentElement->getAttribute('aria-label'));
        $this->assertFalse($svg->documentElement->hasAttribute('aria-hidden'));
        $this->assertFalse($svg->documentElement->hasAttribute('alt'));
    }

    public function test_legacy_size_border_and_float_styles_are_preserved(): void
    {
        $output = (new Icon())->shortcodeIcon([
            'icon' => 'check',
            'style' => 'pull-left, 2x, border, 5x',
            'color' => '#abcdef',
        ]);

        $this->assertStringContainsString('font-size:5em', $output);
        $this->assertStringContainsString('float:left;margin-right:.3em', $output);
        $this->assertStringContainsString('border:solid .08em #eee', $output);
        $this->assertStringContainsString('color:#abcdef', $output);
        $right = (new Icon())->shortcodeIcon(['icon' => 'check', 'style' => 'pull-right']);
        $this->assertStringContainsString('float:right;margin-left:.3em', $right);
    }

    /**
     * @dataProvider colorProvider
     */
    public function test_color_values_are_normalized_and_restricted(string $input, string $expected): void
    {
        $output = (new Icon())->shortcodeIcon(['icon' => 'check', 'color' => $input]);
        $this->assertStringContainsString('color:' . $expected, $output);
    }

    public function colorProvider(): array
    {
        return [
            ['fau', 'var(--color-zentral-basis, #04316A)'],
            ['zuv', 'var(--color-zentral-basis, #04316A)'],
            ['nat', 'var(--color-nat-basis, #04316A)'],
            ['#ABC', '#abc'],
            ['#04316A', '#04316a'],
            ['', 'currentColor'],
            ['red;display:none', 'currentColor'],
            ['#12345z', 'currentColor'],
        ];
    }

    public function test_arbitrary_css_is_not_copied_into_the_svg(): void
    {
        $output = (new Icon())->shortcodeIcon([
            'icon' => 'check',
            'style' => '2x, background:url(https://example.com/tracker), position:fixed',
        ]);
        $this->assertStringContainsString('font-size:2em', $output);
        $this->assertStringNotContainsString('url(', $output);
        $this->assertStringNotContainsString('position:fixed', $output);
    }
}
