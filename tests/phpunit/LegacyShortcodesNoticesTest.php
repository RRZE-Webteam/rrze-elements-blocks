<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\LegacyShortcodes\Notices;
use RRZE\ElementsBlocks\SpriteGenerator;

final class LegacyShortcodesNoticesTest extends TestCase
{
    private array $spriteState = [];

    protected function setUp(): void
    {
        $GLOBALS['wp_test_do_shortcode'] = null;
        $GLOBALS['wp_test_enqueued_styles'] = [];
        $GLOBALS['wp_test_enqueued_scripts'] = [];

        // Each test must register its own icons, without reusing a previous sprite.
        foreach (['icons' => [], 'assetPath' => dirname(__DIR__, 2) . '/src/_shared/icons'] as $name => $value) {
            $property = new ReflectionProperty(SpriteGenerator::class, $name);
            if (PHP_VERSION_ID < 80100) {
                $property->setAccessible(true);
            }
            $this->spriteState[$name] = [$property, $property->getValue()];
            $property->setValue(null, $value);
        }
    }

    protected function tearDown(): void
    {
        foreach ($this->spriteState as [$property, $value]) {
            $property->setValue(null, $value);
        }
        $GLOBALS['wp_test_do_shortcode'] = null;
    }

    public function test_registers_all_legacy_notice_tags_including_aliases(): void
    {
        $shortcodes = (new Notices())->getShortcodes();

        $this->assertEqualsCanonicalizing(array_keys($this->noticeProvider()), array_keys($shortcodes));
        foreach ($shortcodes as $callback) {
            $this->assertIsCallable($callback);
        }
    }

    /**
     * @dataProvider noticeProvider
     */
    public function test_legacy_variations_render_block_markup_with_a_material_symbol(
        string $tag,
        string $variation,
        string $symbol
    ): void {
        $content = '<p>Contact <a href="tel:+499111234">our office</a>.</p>';
        $output = (new Notices())->shortcodeNotice([], $content, $tag);
        $xpath = $this->createXPath($output);

        $this->assertSame(1, $xpath->query('//div[contains(concat(" ", normalize-space(@class), " "), " wp-block-rrze-elements-notice ")]')->length);
        $this->assertSame(1, $xpath->query('//div[contains(concat(" ", normalize-space(@class), " "), " notice ") and contains(concat(" ", normalize-space(@class), " "), " ' . $variation . ' ")]')->length);
        $this->assertSame(1, $xpath->query('//div[@class="icon-box"]/svg[@aria-hidden="true"]/use[@href="#symbols-' . $symbol . '"]')->length);
        $this->assertStringContainsString($content, $output);

        // A <use> reference alone is insufficient: the actual symbol must be emitted, too.
        $sprite = $this->renderSprite();
        $this->assertNotSame('', $sprite, 'Rendering the notice must register its icon with SpriteGenerator.');
        $document = new DOMDocument();
        $this->assertTrue($document->loadXML($sprite));
        $symbols = $document->getElementsByTagName('symbol');
        $this->assertSame(1, $symbols->length);
        $this->assertSame('symbols-' . $symbol, $symbols->item(0)->getAttribute('id'));
    }

    public function noticeProvider(): array
    {
        return [
            'notice-attention' => ['notice-attention', 'notice-attention', 'warning'],
            'notice-hinweis' => ['notice-hinweis', 'notice-hinweis', 'notifications'],
            'notice-baustelle' => ['notice-baustelle', 'notice-baustelle', 'construction'],
            'notice-question' => ['notice-question', 'notice-question', 'question_mark'],
            'notice-minus' => ['notice-minus', 'notice-minus', 'block'],
            'notice-plus' => ['notice-plus', 'notice-plus', 'add'],
            'notice-tipp' => ['notice-tipp', 'notice-idea', 'lightbulb'],
            'notice-download' => ['notice-download', 'notice-download', 'download'],
            'notice-faubox' => ['notice-faubox', 'notice-faubox', 'cloud_download'],
            'notice-audio' => ['notice-audio', 'notice-audio', 'headphones'],
            'notice-video' => ['notice-video', 'notice-video', 'video_library'],
            'notice-thumbs-up' => ['notice-thumbs-up', 'notice-thumbs-up', 'thumb_up'],
            'notice-thumbs-down' => ['notice-thumbs-down', 'notice-thumbs-down', 'thumb_down'],
            'notice-alert' => ['notice-alert', 'notice-attention', 'warning'],
            'attention' => ['attention', 'notice-attention', 'warning'],
            'hinweis' => ['hinweis', 'notice-hinweis', 'notifications'],
            'baustelle' => ['baustelle', 'notice-baustelle', 'construction'],
            'question' => ['question', 'notice-question', 'question_mark'],
            'minus' => ['minus', 'notice-minus', 'block'],
            'plus' => ['plus', 'notice-plus', 'add'],
        ];
    }

    public function test_title_defaults_to_a_level_three_heading_before_the_body(): void
    {
        $output = (new Notices())->shortcodeNotice(['title' => 'Advice & contact'], '<p>Body</p>', 'notice-tipp');
        $xpath = $this->createXPath($output);
        $heading = $xpath->query('//h3');

        $this->assertSame(1, $heading->length);
        $this->assertSame('Advice & contact', $heading->item(0)->textContent);
        $this->assertSame(1, $xpath->query('following-sibling::p[text()="Body"]', $heading->item(0))->length);
        $this->assertStringContainsString('Advice &amp; contact', $output);
    }

    /**
     * @dataProvider headingProvider
     */
    public function test_hstart_selects_a_valid_heading_or_falls_back_to_three(string $hstart, string $expected): void
    {
        $output = (new Notices())->shortcodeNotice(['title' => 'Title', 'hstart' => $hstart], '', 'notice-hinweis');
        $headings = $this->createXPath($output)->query('//h1 | //h2 | //h3 | //h4 | //h5 | //h6');

        $this->assertSame(1, $headings->length);
        $this->assertSame($expected, $headings->item(0)->nodeName);
        $this->assertSame('Title', $headings->item(0)->textContent);
    }

    public function headingProvider(): array
    {
        return [
            'first level' => ['1', 'h1'],
            'custom level' => ['4', 'h4'],
            'last level' => ['6', 'h6'],
            'too low' => ['0', 'h3'],
            'too high' => ['7', 'h3'],
            'not a number' => ['invalid', 'h3'],
        ];
    }

    public function test_title_cannot_inject_html_elements_or_event_attributes(): void
    {
        $output = (new Notices())->shortcodeNotice([
            'title' => 'Contact</h3><img src=x onerror=alert(1)><script>alert(1)</script>',
        ], '', 'notice-hinweis');
        $xpath = $this->createXPath($output);

        $this->assertSame(1, $xpath->query('//h3')->length);
        $this->assertStringContainsString('Contact', $xpath->query('//h3')->item(0)->textContent);
        $this->assertSame(0, $xpath->query('//img | //script | //*[@onerror]')->length);
    }

    /**
     * @dataProvider untitledProvider
     */
    public function test_missing_or_empty_titles_do_not_create_a_heading(array $attributes): void
    {
        $output = (new Notices())->shortcodeNotice($attributes, '<p>Body</p>', 'notice-hinweis');

        $this->assertStringContainsString('<p>Body</p>', $output);
        $this->assertSame(0, $this->createXPath($output)->query('//h1 | //h2 | //h3 | //h4 | //h5 | //h6')->length);
    }

    public function untitledProvider(): array
    {
        return [
            'missing title' => [[]],
            'empty title' => [['title' => '', 'hstart' => '4']],
        ];
    }

    public function test_wordpress_empty_attributes_and_null_content_are_accepted(): void
    {
        $output = (new Notices())->shortcodeNotice('', null, 'notice-hinweis');

        $this->assertSame(1, $this->createXPath($output)->query('//svg/use[@href="#symbols-notifications"]')->length);
    }

    public function test_enqueues_the_shared_block_styles_without_legacy_assets(): void
    {
        (new Notices())->enqueueAssets();

        $this->assertSame(['rrze-elements-blocks'], $GLOBALS['wp_test_enqueued_styles']);
        $this->assertSame([], $GLOBALS['wp_test_enqueued_scripts']);
    }

    private function renderSprite(): string
    {
        ob_start();
        try {
            SpriteGenerator::embedSpriteSheet();
            return (string)ob_get_contents();
        } finally {
            ob_end_clean();
        }
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
