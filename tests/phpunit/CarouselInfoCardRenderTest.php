<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\BlockFrontend\Carousel;
use RRZE\ElementsBlocks\BlockFrontend\InfoCard;

/** Protects the existing renderer contract before cards gain additional parents. */
final class CarouselInfoCardRenderTest extends TestCase
{
    /** Keeps card order, named navigation and the list's heading relationship intact. */
    public function test_carousel_composes_cards_and_labels_navigation(): void
    {
        $cards = $this->listCard(['title' => 'Research'])
            . $this->listCard(['title' => 'Teaching']);
        $xpath = $this->xpath((new Carousel())->render([
            'title' => 'Science & <topics>', 'cardHeight' => 420, 'headingLevel' => 3,
        ], $cards));

        $list = $this->element($xpath, '//section//ul[@role="list"]');
        $heading = $this->element($xpath, '//section//h3[@id]');
        $this->assertSame('Science & <topics>', trim($heading->textContent));
        $this->assertSame($heading->getAttribute('id'), $list->getAttribute('aria-labelledby'));
        $this->assertSame(2.0, $xpath->evaluate('count(//ul[@role="list"]/li[@role="listitem"])'));
        $this->assertSame('Research', trim((string)$xpath->evaluate('string(//ul[@role="list"]/li[1]//p)')));
        $this->assertSame('Teaching', trim((string)$xpath->evaluate('string(//ul[@role="list"]/li[2]//p)')));
        $this->assertStringContainsString('--card-height: 420px;', $this->element($xpath, '//section')->getAttribute('style'));
        $buttons = $xpath->query('//section//button');
        $this->assertCount(2, $buttons);
        foreach ($buttons as $button) {
            $this->assertSame('button', $button->getAttribute('type'));
            $this->assertStringContainsString('Science & <topics>', $button->getAttribute('aria-label'));
        }
        $this->assertNotSame($buttons->item(0)->getAttribute('aria-label'), $buttons->item(1)->getAttribute('aria-label'));
    }

    /**
     * Preserves valid heading levels and falls back for invalid saved attributes.
     *
     * @dataProvider headingProvider
     * @param int|null $level Requested level, or no attribute.
     * @param string $expected Expected heading element.
     */
    public function test_carousel_validates_heading_levels(?int $level, string $expected): void
    {
        $attributes = $level === null ? [] : ['headingLevel' => $level];
        $xpath = $this->xpath((new Carousel())->render($attributes));
        $this->assertSame(1.0, $xpath->evaluate('count(//section/div/' . $expected . '[@id])'));
    }

    /** @return array<string, array{int|null, string}> Heading boundaries and default. */
    public function headingProvider(): array
    {
        return ['default' => [null, 'h2'], 'minimum' => [2, 'h2'], 'maximum' => [6, 'h6'], 'too low' => [1, 'h2'], 'too high' => [7, 'h2']];
    }

    /** A saved nesting warning suppresses the entire carousel, including its cards. */
    public function test_disallowed_nesting_suppresses_carousel_output(): void
    {
        $this->assertSame('', (new Carousel())->render(['isNestedWarning' => true], '<li>Hidden card</li>'));
    }

    /** Repeated renders never cross-reference another carousel's heading or dialog. */
    public function test_multiple_carousels_and_dialogs_have_independent_ids(): void
    {
        $output = '';
        $renderer = new Carousel();
        $cardRenderer = new InfoCard();
        foreach (['First', 'Second'] as $title) {
            $cards = $cardRenderer->render(['title' => $title], '<p>Details</p>', $this->listContext())
                . $cardRenderer->render(['title' => $title . ' again'], '<p>Other details</p>', $this->listContext());
            $output .= $renderer->render(['title' => $title], $cards);
        }
        $xpath = $this->xpath($output);
        $ids = [];
        foreach ($xpath->query('//*[@id]') as $element) {
            $id = $element->getAttribute('id');
            $this->assertNotContains($id, $ids);
            $ids[] = $id;
        }
        $this->assertCount(4, $xpath->query('//dialog'));
        foreach ($xpath->query('//button[@aria-haspopup="dialog"]') as $trigger) {
            $id = $trigger->getAttribute('aria-controls');
            $this->assertNotSame('', $id);
            $this->assertSame($id, $trigger->getAttribute('data-modal-id'));
            $this->assertSame(1.0, $xpath->evaluate('count(ancestor::li/dialog[@id="' . $id . '"])', $trigger));
        }
        foreach ($xpath->query('//ul[@role="list"]') as $list) {
            $id = $list->getAttribute('aria-labelledby');
            $this->assertSame(1.0, $xpath->evaluate('count(ancestor::section//h2[@id="' . $id . '"])', $list));
        }
    }

    /**
     * Keeps passive, linked and dialog cards distinct, including the empty editor paragraph.
     *
     * @dataProvider actionProvider
     * @param string $url Optional destination.
     * @param string $content Saved inner blocks.
     * @param string $action Expected interaction: none, link or dialog.
     */
    public function test_card_action_depends_on_link_and_content(string $url, string $content, string $action): void
    {
        $xpath = $this->xpath('<ul>' . $this->listCard(['url' => $url], $content) . '</ul>');
        $card = $this->element($xpath, '//ul/li');
        $this->assertSame($action === 'none' ? 'false' : 'true', $card->getAttribute('data-card-has-action'));
        $this->assertSame($action === 'none' ? 0.0 : 1.0, $xpath->evaluate('count(//li//a | //li//button[@aria-haspopup="dialog"])'));
        $this->assertSame($action === 'dialog' ? 1.0 : 0.0, $xpath->evaluate('count(//dialog)'));
        if ($action === 'link') {
            $link = $this->element($xpath, '//li//a');
            $this->assertSame($url, $link->getAttribute('href'));
            $this->assertSame('Open card link', $link->getAttribute('aria-label'));
            $this->assertFalse($link->hasAttribute('aria-haspopup'));
            $this->assertFalse($link->hasAttribute('data-modal-id'));
            if ($content !== '') {
                $this->assertStringNotContainsString('Hidden details', $card->textContent);
            }
        } elseif ($action === 'dialog') {
            $trigger = $this->element($xpath, '//button[@aria-haspopup="dialog"]');
            $this->assertSame('button', $trigger->getAttribute('type'));
            $this->assertSame('Show more information', $trigger->getAttribute('aria-label'));
            $this->assertSame('Details', (string)$xpath->evaluate('string(//dialog//strong)'));
            $this->assertSame(2.0, $xpath->evaluate('count(//dialog//button)'));
            $this->assertSame('-1', $this->element($xpath, '//dialog//div[@tabindex]')->getAttribute('tabindex'));
        }
    }

    /** @return array<string, array{string, string, string}> Supported card interactions. */
    public function actionProvider(): array
    {
        return [
            'passive card' => ['', '', 'none'],
            'whitespace' => ['', " \n\t ", 'none'],
            'empty editor paragraph' => ['', '<p class="wp-block-paragraph"></p>', 'none'],
            'link' => ['https://example.com/project', '', 'link'],
            'link takes precedence over details' => ['https://example.com/project', '<p>Hidden details</p>', 'link'],
            'dialog with formatted content' => ['', '<p><strong>Details</strong> about the project.</p>', 'dialog'],
        ];
    }

    /** Responsive sources and plain card labels survive rendering without added markup. */
    public function test_card_preserves_responsive_images_and_plain_labels(): void
    {
        $xpath = $this->card([
            'title' => '<b>Science</b> & teaching', 'subtitle' => '<em>Topic</em>',
            'desktopImageUrl' => 'https://example.com/desktop.jpg',
            'tabletImageUrl' => 'https://example.com/tablet.jpg',
            'mobileImageUrl' => 'https://example.com/mobile.jpg',
            'alt' => 'A "quoted" image & description',
        ]);
        $this->assertSame('Science & teaching', trim((string)$xpath->evaluate('string(//li//p)')));
        $this->assertSame('Topic', trim((string)$xpath->evaluate('string(//li//h3)')));
        $this->assertSame(0.0, $xpath->evaluate('count(//li//b | //li//em)'));
        $image = $this->element($xpath, '//picture/img');
        $this->assertSame('https://example.com/desktop.jpg', $image->getAttribute('src'));
        $this->assertSame('A "quoted" image & description', $image->getAttribute('alt'));
        $sources = $xpath->query('//picture/source');
        $this->assertCount(2, $sources);
        $this->assertSame('(max-width: 734px)', $sources->item(0)->getAttribute('media'));
        $this->assertSame('https://example.com/mobile.jpg', $sources->item(0)->getAttribute('srcset'));
        $this->assertSame('(max-width: 1024px)', $sources->item(1)->getAttribute('media'));
        $this->assertSame('https://example.com/tablet.jpg', $sources->item(1)->getAttribute('srcset'));
    }

    /** Desktop-only and image-free cards need no empty responsive image sources. */
    public function test_optional_images_and_scientific_caption(): void
    {
        $plain = $this->card([]);
        $this->assertSame(0.0, $plain->evaluate('count(//img | //source)'));
        $this->assertSame(0.0, $plain->evaluate('count(//div[contains(@class, "scientific-text")])'));
        $withImage = $this->card([
            'desktopImageUrl' => 'https://example.com/image.jpg',
            'scientificText' => 'H<sub>2</sub>O and <strong>research</strong>',
        ]);
        $this->assertSame(1.0, $withImage->evaluate('count(//img)'));
        $this->assertSame(0.0, $withImage->evaluate('count(//source)'));
        $this->assertSame('2', (string)$withImage->evaluate('string(//div[contains(@class, "scientific-text")]/sub)'));
        $this->assertSame('research', (string)$withImage->evaluate('string(//div[contains(@class, "scientific-text")]/strong)'));
        $this->assertSame(0.0, $withImage->evaluate('count(//dialog)'));
    }

    /**
     * Checks public styling attributes through their output, without calling private helpers.
     *
     * @dataProvider styleProvider
     * @param array<string, mixed> $attributes Saved card attributes.
     * @param array<string, string> $expected Expected CSS custom properties.
     */
    public function test_card_style_options(array $attributes, array $expected): void
    {
        $style = $this->element($this->card($attributes), '//ul/li')->getAttribute('style');
        foreach ($expected as $property => $value) {
            $this->assertStringContainsString($property . ': ' . $value . ';', $style);
        }
    }

    /** @return array<string, array{array<string, mixed>, array<string, string>}> Representative style boundaries. */
    public function styleProvider(): array
    {
        return [
            'defaults' => [[], ['--image-object-fit' => 'cover', '--rrze-card-size' => '320px', '--desktop-object-position' => '50% 50%', '--card-text-shadow' => 'none']],
            'focus points and width clamp' => [[
                'desktopFocusPoint' => ['x' => -1, 'y' => 2], 'tabletFocusPoint' => ['x' => .125, 'y' => .75], 'desktopContentWidth' => 900,
            ], ['--desktop-object-position' => '0% 100%', '--tablet-object-position' => '12.5% 75%', '--rrze-card-size' => '520px']],
            'minimum width and invalid fit' => [['desktopContentWidth' => 100, 'imageObjectFit' => 'invalid'], ['--rrze-card-size' => '320px', '--image-object-fit' => 'cover']],
            'contain' => [['imageObjectFit' => 'contain'], ['--image-object-fit' => 'contain']],
            'color fallback' => [['desktopTextColor' => '#123456', 'tabletTextColor' => '#654321'], ['--desktop-text-color' => '#123456', '--tablet-text-color' => '#654321', '--mobile-text-color' => '#654321']],
            'white text on image' => [['desktopImageUrl' => 'https://example.com/a.jpg'], ['--card-text-shadow' => '1px 1px 2px #ddd']],
            'dark text on image' => [['desktopImageUrl' => 'https://example.com/a.jpg', 'desktopTextColor' => '#000'], ['--card-text-shadow' => '1px 1px 2px #222']],
            'shadow disabled' => [['desktopImageUrl' => 'https://example.com/a.jpg', 'textShadowEnabled' => false], ['--card-text-shadow' => 'none']],
        ];
    }

    /** Custom colors, overlay and alignment keep their instance-specific settings. */
    public function test_card_custom_appearance_is_scoped_to_its_instance(): void
    {
        $gradient = 'linear-gradient(180deg, #000, transparent)';
        $xpath = $this->card([
            'backgroundColor' => '#04316a', 'desktopCustomTextColor' => '#abcdef',
            'tabletCustomTextColor' => '#fedcba', 'mobileCustomTextColor' => '#aabbcc',
            'backgroundOverlayEnabled' => true, 'backgroundOverlayGradient' => $gradient,
            'cardTextAlignment' => 'bottom right',
        ]);
        $style = $this->element($xpath, '//ul/li')->getAttribute('style');
        foreach (['--desktop-custom-text-color: #abcdef;', '--tablet-custom-text-color: #fedcba;', '--mobile-custom-text-color: #aabbcc;'] as $declaration) {
            $this->assertStringContainsString($declaration, $style);
        }
        $overlay = $this->element($xpath, '//*[@data-background-overlay="true"]');
        $this->assertStringContainsString($gradient, $overlay->getAttribute('style'));
        $alignment = $this->element($xpath, '//div[contains(@style, "--marketing-content-justify")]')->getAttribute('style');
        $this->assertStringContainsString('--marketing-content-justify: flex-end;', $alignment);
        $this->assertStringContainsString('--marketing-content-align: flex-end;', $alignment);
        $this->assertStringContainsString('--marketing-content-text-align: right;', $alignment);
        $next = $this->card([]);
        $this->assertSame(0.0, $next->evaluate('count(//*[@data-background-overlay])'));
        $this->assertStringNotContainsString('--desktop-custom-text-color', $this->element($next, '//ul/li')->getAttribute('style'));
    }

    /** Standalone cards have their own valid wrapper, style and height. */
    public function test_standalone_card_has_independent_layout(): void
    {
        $xpath = $this->xpath((new InfoCard())->render([
            'title' => 'Independent card', 'cardHeight' => 480, 'className' => 'is-style-scientific custom-card',
        ], '<p>Details</p>'));
        $card = $this->element($xpath, '//div[@data-card-layout="standalone"]');
        $this->assertSame('scientific', $card->getAttribute('data-card-appearance'));
        $this->assertStringContainsString('custom-card', $card->getAttribute('class'));
        $this->assertStringContainsString('--card-height: 480px;', $card->getAttribute('style'));
        $this->assertSame(0.0, $xpath->evaluate('count(//li)'));
        $this->assertSame(1.0, $xpath->evaluate('count(//dialog)'));
        $next = $this->xpath((new InfoCard())->render());
        $this->assertSame('marketing', $this->element($next, '//*[@data-card-appearance]')->getAttribute('data-card-appearance'));
    }

    /** Any parent may provide layout defaults without its block name being known. */
    public function test_generic_container_context_controls_layout_without_overwriting_card_settings(): void
    {
        $block = $this->listContext();
        $block->context['rrze-elements/card-height'] = 560;
        $block->context['rrze-elements/card-container-style'] = 'is-style-marketing';
        $attributes = ['cardHeight' => 380, 'className' => 'is-style-scientific'];
        $xpath = $this->xpath('<ul>' . (new InfoCard())->render($attributes, '', $block) . '</ul>');
        $card = $this->element($xpath, '//li');
        $this->assertSame('marketing', $card->getAttribute('data-card-appearance'));
        $this->assertStringContainsString('--card-height: 560px;', $card->getAttribute('style'));
        $standalone = $this->xpath((new InfoCard())->render($attributes));
        $this->assertStringContainsString('--card-height: 380px;', $this->element($standalone, '//*[@data-card-layout]')->getAttribute('style'));
    }

    /** @return WP_Block Neutral layout context used by a list-based container. */
    private function listContext(): WP_Block
    {
        $block = new WP_Block(['blockName' => 'rrze-elements/info-card', 'attrs' => []]);
        $block->context = ['rrze-elements/card-list-layout' => true];
        return $block;
    }

    /**
     * Renders a card with the list context normally provided by WordPress.
     *
     * @param array<string, mixed> $attributes Card settings.
     * @param string $content Optional dialog content.
     * @return string List item markup.
     */
    private function listCard(array $attributes = [], string $content = ''): string
    {
        return (new InfoCard())->render($attributes, $content, $this->listContext());
    }

    /**
     * Renders a card inside a valid list container.
     *
     * @param array<string, mixed> $attributes Card settings.
     * @return DOMXPath Query interface for the rendered card.
     */
    private function card(array $attributes): DOMXPath
    {
        return $this->xpath('<ul>' . $this->listCard($attributes) . '</ul>');
    }

    /**
     * Parses fragments while restoring libxml's global error setting.
     *
     * @param string $html Rendered HTML.
     * @return DOMXPath Query interface; HTML5 element warnings are ignored by libxml's HTML4 parser.
     */
    private function xpath(string $html): DOMXPath
    {
        $document = new DOMDocument();
        $previous = libxml_use_internal_errors(true);
        try {
            $document->loadHTML('<?xml encoding="UTF-8">' . $html);
        } finally {
            libxml_clear_errors();
            libxml_use_internal_errors($previous);
        }
        return new DOMXPath($document);
    }

    /**
     * Requires exactly one element so a missing DOM contract fails descriptively.
     *
     * @param DOMXPath $xpath Document to query.
     * @param string $query XPath expression.
     * @return DOMElement Matching element.
     */
    private function element(DOMXPath $xpath, string $query): DOMElement
    {
        $nodes = $xpath->query($query);
        $this->assertCount(1, $nodes, $query);
        $element = $nodes->item(0);
        $this->assertInstanceOf(DOMElement::class, $element);
        return $element;
    }
}
