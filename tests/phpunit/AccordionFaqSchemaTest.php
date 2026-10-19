<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\BlockFrontend\Collapse;
use RRZE\ElementsBlocks\BlockFrontend\Collapsibles;

/** Exercises the FAQ renderer contract, including direct PHP integrations. */
final class AccordionFaqSchemaTest extends TestCase
{
    /** Missing flags and explicit false preserve the original accordion HTML. */
    public function test_faq_is_opt_in(): void
    {
        $item = new Collapse();
        $parent = new Collapsibles();
        $attributes = ['title' => 'Question?', 'jumpName' => 'question'];
        $plain = $item->render($attributes, '<p>Answer.</p>');

        $this->assertSame($plain, $item->render($attributes + ['faqSchema' => false], '<p>Answer.</p>'));
        $this->assertSame($parent->render([], $plain), $parent->render(['faqSchema' => false], $plain));
        $this->assertStringNotContainsString('itemprop', $plain);
        $this->assertStringNotContainsString('itemscope', $parent->render([], $plain));
    }

    /** Microdata scopes the title separately from icons, suffixes and answer HTML. */
    public function test_direct_php_rendering_marks_questions_and_preserves_content(): void
    {
        $answer = '<p>Use the <a href="https://example.com">website</a>.</p><ul><li>One</li><li>Two</li></ul>';
        $item = (new Collapse())->render([
            'faqSchema' => true,
            'title' => 'Where<br> next?',
            'jumpName' => 'next',
            'materialSymbol' => 'mail',
            'suffix' => 'New',
        ], $answer);
        $output = (new Collapsibles())->render(['faqSchema' => true, 'expandAllLink' => true], $item);
        $xpath = $this->xpath($output);
        $question = '//*[@itemtype="https://schema.org/FAQPage"]//*[@itemprop="mainEntity"]';

        $this->assertSame(1, $xpath->query($question . '[@itemscope][@itemtype="https://schema.org/Question"]')->length);
        $this->assertSame(1, $xpath->query($question . '//button/span[@itemprop="name"]/br')->length);
        $this->assertSame(0, $xpath->query('//*[@itemprop="name"]//svg | //*[@itemprop="name"]//*[@class="accordion-suffix"]')->length);
        $this->assertSame(1, $xpath->query($question . '//*[@itemprop="acceptedAnswer"][@itemscope][@itemtype="https://schema.org/Answer"]/*[@itemprop="text"]')->length);
        $this->assertStringContainsString($answer, $output);
        $this->assertStringContainsString('aria-expanded="false"', $item);
        $this->assertStringContainsString('aria-controls="next-section"', $item);
        $this->assertStringContainsString('aria-labelledby="next"', $item);
    }

    /** A WordPress item's inherited context takes precedence over PHP-only settings. */
    public function test_wordpress_items_use_their_parent_context(): void
    {
        $block = new WP_Block([]);
        $block->context['rrze-elements/faq-schema'] = true;
        $renderer = new Collapse();
        $attributes = ['title' => 'Question?', 'faqSchema' => false];
        $this->assertStringContainsString('https://schema.org/Question', $renderer->render($attributes, 'Answer', $block));

        $block->context['rrze-elements/faq-schema'] = false;
        $attributes['faqSchema'] = true;
        $this->assertStringNotContainsString('itemscope', $renderer->render($attributes, 'Answer', $block));
    }

    /**
     * Incomplete entries remain visible without claiming to be question/answer pairs.
     *
     * @dataProvider incompleteItems
     * @param string $title Item title.
     * @param string $answer Rendered answer HTML.
     */
    public function test_incomplete_items_are_not_marked(string $title, string $answer): void
    {
        $renderer = new Collapse();
        $this->assertSame(
            $renderer->render(['title' => $title], $answer),
            $renderer->render(['title' => $title, 'faqSchema' => true], $answer)
        );
    }

    /** @return array<string, array{string, string}> Empty editor content patterns. */
    public function incompleteItems(): array
    {
        return [
            'missing title' => ['', '<p>Answer</p>'],
            'blank title' => ['<br> &nbsp; &#8203;', '<p>Answer</p>'],
            'missing answer' => ['Question?', ''],
            'empty paragraph' => ['Question?', '<p><br> &nbsp; &#160; &#8203; &#65279;</p>'],
            'image only' => ['Question?', '<figure><img src="example.jpg" alt="Example"></figure>'],
            'comment only' => ['Question?', '<!-- answer placeholder -->'],
        ];
    }

    /** A zero is content; truthiness checks must not discard it. */
    public function test_zero_is_a_valid_textual_answer(): void
    {
        $output = (new Collapse())->render(['title' => 'How many?', 'faqSchema' => true], '<p>0</p>');
        $this->assertStringContainsString('itemprop="text"><p>0</p>', $output);
    }

    /** Integrations can omit individual entries while marking the surrounding FAQ. */
    public function test_php_integration_can_exclude_an_item(): void
    {
        $renderer = new Collapse();
        $items = $renderer->render(['title' => 'Local?', 'faqSchema' => true], 'Local answer')
            . $renderer->render(['title' => 'Imported?', 'faqSchema' => false], 'Imported answer');
        $output = (new Collapsibles())->render(['faqSchema' => true], $items);

        $this->assertSame(1, $this->xpath($output)->query('//*[@itemprop="mainEntity"]')->length);
        $this->assertStringContainsString('Imported answer', $output);
    }

    /** Stored legacy markup is preserved until the editor migrates and saves it. */
    public function test_legacy_html_is_not_wrapped_again(): void
    {
        $saved = '<div class="accordion"><p>Saved legacy HTML</p></div>';
        $block = new WP_Block(['innerHTML' => $saved]);
        foreach ([new Collapse(), new Collapsibles()] as $renderer) {
            $this->assertSame($saved, $renderer->render([], $saved, $block));
        }
    }

    /**
     * Parses renderer output for structural assertions without changing it.
     *
     * @param string $html Rendered accordion markup.
     * @return DOMXPath Query interface for the HTML document.
     */
    private function xpath(string $html): DOMXPath
    {
        $document = new DOMDocument();
        @$document->loadHTML('<?xml encoding="utf-8" ?>' . $html);

        return new DOMXPath($document);
    }
}
