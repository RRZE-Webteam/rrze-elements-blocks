<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\BlockFrontend\ContentSlider;
use RRZE\ElementsBlocks\BlockFrontend\InfoCard;

/** Covers the slider shell and its contract with independently rendered cards. */
final class ContentSliderRenderTest extends TestCase
{
    /** Cards and dialogs are rendered exactly once, with local navigation targets. */
    public function test_original_cards_and_dialogs_keep_their_order_and_identity(): void
    {
        $cards = (new InfoCard())->render(['title' => 'Research'], '<p>Details</p>')
            . (new InfoCard())->render(['title' => 'Teaching', 'url' => 'https://example.com']);
        $xpath = $this->xpath((new ContentSlider())->render(['title' => 'Projects', 'headingLevel' => 3], $cards));
        $this->assertSame('Projects', $xpath->evaluate('string(//h3)'));
        $this->assertSame(2.0, $xpath->evaluate('count(//*[@data-card-layout="standalone"])'));
        $this->assertSame(1.0, $xpath->evaluate('count(//dialog)'));
        $this->assertSame(0.0, $xpath->evaluate('count(//*[@data-slider-clone])'));
        $this->assertSame('Research', trim((string)$xpath->evaluate('string((//*[@data-card-layout])[1]//p)')));
        $this->assertSame('Teaching', trim((string)$xpath->evaluate('string((//*[@data-card-layout])[2]//p)')));
        $viewportId = $xpath->evaluate('string(//*[@tabindex="0"]/@id)');
        foreach ($xpath->query('//button[@data-slider-direction]') as $button) {
            $this->assertSame('button', $button->getAttribute('type'));
            $this->assertSame($viewportId, $button->getAttribute('aria-controls'));
            $this->assertNotSame('', $button->getAttribute('aria-label'));
        }
    }

    /** Optional headings leave the carousel named; invalid levels cannot inject markup. */
    public function test_optional_title_and_heading_validation(): void
    {
        $renderer = new ContentSlider();
        $xpath = $this->xpath($renderer->render([], '<div>Card</div>'));
        $this->assertSame(0.0, $xpath->evaluate('count(//h2)'));
        $this->assertSame('Inhalts-Slider', $xpath->evaluate('string(//section/@aria-label)'));
        $xpath = $this->xpath($renderer->render(['title' => 'Research & <b>teaching</b>', 'headingLevel' => 99], '<div>Card</div>'));
        $this->assertSame('Research & teaching', $xpath->evaluate('string(//h2)'));
        $this->assertSame(0.0, $xpath->evaluate('count(//h2/b)'));
        $this->assertSame('', $renderer->render([], " \n "));
    }

    /** Repeated instances must never control another slider's viewport. */
    public function test_multiple_instances_have_distinct_navigation_ids(): void
    {
        $renderer = new ContentSlider();
        $xpath = $this->xpath($renderer->render([], '<div>First</div>') . $renderer->render([], '<div>Second</div>'));
        $ids = [];
        foreach ($xpath->query('//section') as $section) {
            $id = $xpath->evaluate('string(.//*[@tabindex="0"]/@id)', $section);
            $this->assertNotContains($id, $ids);
            $ids[] = $id;
            $this->assertSame(2.0, $xpath->evaluate('count(.//button[@aria-controls="' . $id . '"])', $section));
        }
        $this->assertCount(2, $ids);
    }

    /**
     * Parses rendered fragments without leaking libxml's error configuration.
     *
     * @param string $html Renderer result.
     * @return DOMXPath Query interface.
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
}
