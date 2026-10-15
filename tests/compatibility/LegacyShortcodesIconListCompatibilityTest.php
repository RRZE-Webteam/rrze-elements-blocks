<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\Elements\Icon\Icon as OldIcon;
use RRZE\ElementsBlocks\LegacyShortcodes\Icon;
use RRZE\ElementsBlocks\LegacyShortcodes\Registrar;
use RRZE\ElementsBlocks\SpriteGenerator;

final class LegacyShortcodesIconListCompatibilityTest extends TestCase
{
    protected function setUp(): void
    {
        $GLOBALS['shortcode_tags'] = [];
        $GLOBALS['wp_filter'] = [];
        $GLOBALS['wp_actions'] = [];
        $GLOBALS['wp_filters'] = [];
        $GLOBALS['wp_current_filter'] = [];
        $GLOBALS['compat_enqueued_styles'] = [];
        $GLOBALS['compat_enqueued_scripts'] = [];

        new OldIcon(RRZE_ELEMENTS_COMPAT_PLUGIN_FILE);
        new Registrar();
        do_action('init');
        $this->assertInstanceOf(Icon::class, $GLOBALS['shortcode_tags']['list-icons'][0]);
        SpriteGenerator::setAssetPath(dirname(__DIR__, 2) . '/src/_shared/icons');
    }

    /** @dataProvider documentedIconsProvider */
    public function test_documented_icons_use_the_mapped_asset_as_list_marker(string $icon, string $symbol): void
    {
        $output = do_shortcode('[list-icons icon="' . $icon . '" color="#04316A"]'
            . '<ul><li>First</li><li>Second</li></ul>[/list-icons]');
        $xpath = $this->createXPath($output);
        $list = $xpath->query('//ul')->item(0);

        $this->assertStringContainsString('rrze-elements-material-icon-list', $list->getAttribute('class'));
        $this->assertSame(2, $xpath->query('//ul/li')->length);
        $this->assertStringContainsString('--rrze-elements-list-icon-color:#04316a', $list->getAttribute('style'));
        $this->assertSame(
            file_get_contents(dirname(__DIR__, 2) . '/src/_shared/icons/symbols/' . $symbol . '.svg'),
            $this->getMaskSvg($list)
        );
        $this->assertContains('rrze-elements-blocks', $GLOBALS['compat_enqueued_styles']);
        $this->assertNotContains('rrze-elements', $GLOBALS['compat_enqueued_styles']);
    }

    public function documentedIconsProvider(): array
    {
        return [
            'plus' => ['solid plus', 'add'],
            'circle' => ['regular circle', 'circle'],
            'check without set' => ['check', 'check'],
            'square check' => ['solid square-check', 'check_box'],
            'circle check' => ['solid circle-check', 'check_circle'],
            'encoded quotes' => ['&quot;check&quot;', 'check'],
        ];
    }

    /** @dataProvider colorProvider */
    public function test_marker_colors_are_scoped_and_validated(string $input, string $expected): void
    {
        $output = do_shortcode('[list-icons icon=check color="' . $input . '"]<ul><li>Text</li></ul>[/list-icons]');
        $style = $this->createXPath($output)->query('//ul')->item(0)->getAttribute('style');

        $this->assertStringContainsString('--rrze-elements-list-icon-color:' . $expected, $style);
        $this->assertStringNotContainsString('display:none', $style);
    }

    public function colorProvider(): array
    {
        return [
            'inherit by default' => ['', 'currentColor'],
            'short hex' => ['#ABC', '#abc'],
            'faculty' => ['nat', 'var(--color-nat-basis, #04316A)'],
            'university alias' => ['zuv', 'var(--color-zentral-basis, #04316A)'],
            'invalid color' => ['#zzzzzz', 'currentColor'],
            'CSS injection' => ['#abc;display:none', 'currentColor'],
        ];
    }

    public function test_html_attributes_nested_lists_and_unrelated_lists_are_preserved(): void
    {
        $output = do_shortcode('<ul id="outside"><li>Normal</li></ul>'
            . '[list-icons icon=check]<ul class="wp-block-list custom" id="inside" style="color: red" data-label="A &amp; B">'
            . '<li><p>A <strong>formatted</strong> <a href="/example">link</a></p>'
            . '<ul class="nested"><li>Nested</li></ul><ol start="3"><li>Numbered</li></ol></li></ul>'
            . '<UL class="second"><LI>Another list</LI></UL>[/list-icons]');
        $xpath = $this->createXPath($output);
        $list = $xpath->query('//ul[@id="inside"]')->item(0);

        $this->assertSame('wp-block-list custom rrze-elements-material-icon-list', $list->getAttribute('class'));
        $this->assertStringStartsWith('color: red;', $list->getAttribute('style'));
        $this->assertSame('A & B', $list->getAttribute('data-label'));
        $this->assertSame(3, $xpath->query('//ul[contains(@class,"rrze-elements-material-icon-list")]')->length);
        $this->assertSame(1, $xpath->query('//ul[@id="inside"]/li/p/strong[text()="formatted"]')->length);
        $this->assertSame(1, $xpath->query('//a[@href="/example"]')->length);
        $this->assertSame(1, $xpath->query('//ol[@start="3" and not(@class) and not(@style)]/li')->length);
        $this->assertSame(1, $xpath->query('//ul[@id="outside" and not(@class) and not(@style)]')->length);
    }

    public function test_multiple_lists_keep_independent_icons_and_colors_after_wp_head(): void
    {
        do_action('wp_head');
        $output = do_shortcode('[list-icons icon=plus color="#f00"]<ul><li>Plus</li></ul>[/list-icons]'
            . '[list-icons icon=check color="#00f"]<ul><li>Check</li></ul>[/list-icons]');
        $lists = $this->createXPath($output)->query('//ul');

        $this->assertSame(2, $lists->length);
        $this->assertStringContainsString('--rrze-elements-list-icon-color:#f00', $lists->item(0)->getAttribute('style'));
        $this->assertStringContainsString('--rrze-elements-list-icon-color:#00f', $lists->item(1)->getAttribute('style'));
        $this->assertNotSame($this->getMaskSvg($lists->item(0)), $this->getMaskSvg($lists->item(1)));
        $this->assertSame(0, $this->createXPath($output)->query('//style')->length);
    }

    /** @dataProvider wrapperProvider */
    public function test_formatted_lists_and_nested_icons_work_inside_other_shortcodes(string $open, string $close): void
    {
        $calls = 0;
        add_shortcode('list-probe', static function () use (&$calls): string {
            ++$calls;
            return '<strong>Rendered once</strong>';
        });
        $source = $open . "\n[list-icons icon=check]\n<ul>\n<li>First line\nSecond line [icon icon=phone] [list-probe]</li>\n"
            . "<li>Next item</li>\n</ul>\n[/list-icons]\n" . $close;
        $output = do_shortcode(shortcode_unautop(wpautop($source)));
        $xpath = $this->createXPath($output);

        $this->assertSame(1, $calls);
        $this->assertSame(2, $xpath->query('//ul[contains(@class,"rrze-elements-material-icon-list")]/li')->length);
        $this->assertSame(1, $xpath->query('//li//use[@href="#symbols-call"]')->length);
        $this->assertSame(1, $xpath->query('//li/br')->length);
        $this->assertDoesNotMatchRegularExpression('/<p>\s*<ul\b/', $output);
        $this->assertStringNotContainsString('[list-icons', $output);
    }

    public function wrapperProvider(): array
    {
        return [
            'standalone' => ['', ''],
            'notice' => ['[notice-tipp]', '[/notice-tipp]'],
            'tab' => ['[tabs][tab title=List]', '[/tab][/tabs]'],
            'accordion' => ['[collapsibles][collapse title=List]', '[/collapse][/collapsibles]'],
        ];
    }

    private function getMaskSvg(DOMElement $list): string
    {
        $this->assertSame(1, preg_match('/--rrze-elements-list-icon:url\("data:image\/svg\+xml,([^"\s]+)"\)/', $list->getAttribute('style'), $matches));
        return rawurldecode($matches[1]);
    }

    private function createXPath(string $html): DOMXPath
    {
        $document = new DOMDocument();
        $previous = libxml_use_internal_errors(true);
        try {
            $this->assertTrue($document->loadHTML('<!DOCTYPE html><html><body>' . $html . '</body></html>'));
        } finally {
            libxml_clear_errors();
            libxml_use_internal_errors($previous);
        }
        return new DOMXPath($document);
    }
}
