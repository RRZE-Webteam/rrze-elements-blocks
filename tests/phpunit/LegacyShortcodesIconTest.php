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
    public function test_legacy_names_reference_the_mapped_material_symbol(string $legacy, string $material): void
    {
        $output = (new Icon())->shortcodeIcon(['icon' => $legacy]);
        $svg = new DOMDocument();
        $this->assertTrue($svg->loadXML($output));
        $this->assertSame('svg', $svg->documentElement->tagName);
        $uses = $svg->getElementsByTagName('use');
        $this->assertSame(1, $uses->length);

        $this->assertSame(
            '#symbols-' . $material,
            $uses->item(0)->getAttribute('href')
        );
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
        $this->assertSame([], $GLOBALS['wp_test_enqueued_styles']);
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

    public function test_quotes_sanitized(): void
    {
        $userInput = '&quot;arrow-down&quot;';

        $output = (new Icon())->shortcodeIcon(['icon' => $userInput]);

        $this->assertStringNotContainsString('Icon not found.', $output);
        $this->assertStringContainsString(
            'href="#symbols-arrow_downward"',
            $output
        );
    }

    public function test_quotes_unsanitized(): void
    {
        $userInput = '"arrow-down"';

        $output = (new Icon())->shortcodeIcon(['icon' => $userInput]);

        $this->assertStringNotContainsString('Icon not found.', $output);
        $this->assertStringContainsString(
            'href="#symbols-arrow_downward"',
            $output
        );
    }

    public function test_german_quotes_unsanitized(): void
    {
        $userInput = '„arrow-down“';

        $output = (new Icon())->shortcodeIcon(['icon' => $userInput]);

        $this->assertStringNotContainsString('Icon not found.', $output);
        $this->assertStringContainsString(
            'href="#symbols-arrow_downward"',
            $output
        );
    }

    public function test_german_quotes_sanitized(): void
    {
        $userInput = '&ldquo;arrow-down&rdquo;';

        $output = (new Icon())->shortcodeIcon(['icon' => $userInput]);

        $this->assertStringNotContainsString('Icon not found.', $output);
        $this->assertStringContainsString(
            'href="#symbols-arrow_downward"',
            $output
        );
    }

    public function test_unsupported_list_icon_preserves_the_list(): void
    {
        $content = '<ul class="existing"><li>Keep this text</li></ul>';
        $output = (new Icon())->shortcodeListIcons(['icon' => 'brands github'], $content);

        $this->assertSame('<span class="rrze-elements-icon-error">Icon not found.</span>' . $content, $output);
        $this->assertSame([], $GLOBALS['wp_test_enqueued_styles']);
    }

    public function test_default_icon_uses_text_size_without_overriding_color(): void
    {
        $svg = $this->renderIcon(['icon' => 'check']);

        $this->assertSame('height: 1em; width: 1em;', $svg->getAttribute('style'));
    }

    /**
     * @dataProvider colorProvider
     */
    public function test_colors_are_validated_before_rendering(string $input, string $expected): void
    {
        $style = $this->renderIcon(['icon' => 'check', 'color' => $input])->getAttribute('style');

        if ($expected === '') {
            $this->assertStringNotContainsString('color:', $style);
        } else {
            $this->assertStringContainsString('color: ' . $expected . ';', $style);
        }
    }

    public function colorProvider(): array
    {
        return [
            'short hex' => ['#ABC', '#abc'],
            'full hex' => ['#04316A', '#04316a'],
            'university' => ['fau', 'var(--color-zentral-basis, #04316A)'],
            'university alias' => ['zuv', 'var(--color-zentral-basis, #04316A)'],
            'faculty' => [' NAT ', 'var(--color-nat-basis, #04316A)'],
            'invalid full hex' => ['#zzzzzz', ''],
            'invalid short hex' => ['#red', ''],
            'extra CSS' => ['#abc;display:none', ''],
        ];
    }

    /**
     * @dataProvider sizeProvider
     */
    public function test_sizes_are_relative_to_the_surrounding_text(string $input, string $expected): void
    {
        $style = $this->renderIcon(['icon' => 'check', 'style' => $input])->getAttribute('style');

        $this->assertStringContainsString('height: ' . $expected . ';', $style);
        $this->assertStringContainsString('width: ' . $expected . ';', $style);
    }

    public function sizeProvider(): array
    {
        return [
            'double' => ['2x', '2em'],
            'triple' => ['3x', '3em'],
            'quadruple' => ['4x', '4em'],
            'quintuple' => ['5x', '5em'],
            'largest size wins' => [' 5x , 2x ', '5em'],
        ];
    }

    public function test_border_combines_with_size_and_uses_the_icon_color(): void
    {
        $style = $this->renderIcon([
            'icon' => 'check',
            'color' => '#ABC',
            'style' => ' 2x , border ',
        ])->getAttribute('style');

        $this->assertStringContainsString('border: 4px solid currentColor;', $style);
        $this->assertStringContainsString('color: #abc;', $style);
        $this->assertStringContainsString('width: 2em;', $style);
    }

    public function test_unknown_style_tokens_do_not_match_supported_options(): void
    {
        $svg = $this->renderIcon([
            'icon' => 'check',
            'style' => '12x, borderless, text2x, background:url(https://example.com/tracker)',
        ]);

        $this->assertSame('height: 1em; width: 1em;', $svg->getAttribute('style'));
    }

    public function test_repeated_icons_have_independent_styles(): void
    {
        $red = $this->renderIcon(['icon' => 'check', 'color' => '#f00', 'style' => '2x']);
        $blue = $this->renderIcon(['icon' => 'check', 'color' => '#00f', 'style' => '5x']);

        foreach ([$red, $blue] as $svg) {
            $this->assertSame('#symbols-check', $svg->getElementsByTagName('use')->item(0)->getAttribute('href'));
        }
        $this->assertSame('color: #f00; height: 2em; width: 2em;', $red->getAttribute('style'));
        $this->assertSame('color: #00f; height: 5em; width: 5em;', $blue->getAttribute('style'));
    }

    private function renderIcon(array $attributes): DOMElement
    {
        $svg = new DOMDocument();
        $this->assertTrue($svg->loadXML((new Icon())->shortcodeIcon($attributes)));
        $this->assertSame('svg', $svg->documentElement->tagName);

        return $svg->documentElement;
    }
}
