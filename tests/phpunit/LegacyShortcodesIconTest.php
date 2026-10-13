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

    public function test_unsupported_list_icon_preserves_the_list(): void
    {
        $content = '<ul class="existing"><li>Keep this text</li></ul>';
        $output = (new Icon())->shortcodeListIcons(['icon' => 'brands github'], $content);

        $this->assertSame('<span class="rrze-elements-icon-error">Icon not found.</span>' . $content, $output);
        $this->assertSame([], $GLOBALS['wp_test_enqueued_styles']);
    }
}
