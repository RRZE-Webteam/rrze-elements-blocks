<?php

declare(strict_types=1);

/**
 * Exercises real block registration, context propagation and frontend filtering.
 * Run with wp eval-file tests/wordpress/accordion-faq.php --url=<test-site>.
 * No posts, options or other persistent WordPress data are changed.
 */

/**
 * Asserts schema counts after rendering a serialized accordion through WordPress.
 *
 * @param string $source Serialized block markup.
 * @param int $pages Expected FAQPage count.
 * @param int $questions Expected Question count.
 * @param string $label Scenario description for failures.
 * @return void
 * @throws RuntimeException When the rendered output violates the expected contract.
 */
function rrze_faq_assert_schema(string $source, int $pages, int $questions, string $label): void
{
    $output = apply_filters('the_content', $source);
    $actualPages = substr_count($output, 'itemtype="https://schema.org/FAQPage"');
    $actualQuestions = substr_count($output, 'itemtype="https://schema.org/Question"');
    $actualAnswers = substr_count($output, 'itemtype="https://schema.org/Answer"');
    if ([$actualPages, $actualQuestions, $actualAnswers] !== [$pages, $questions, $questions]) {
        throw new RuntimeException($label . ': unexpected FAQPage/Question/Answer counts: '
            . wp_json_encode([$actualPages, $actualQuestions, $actualAnswers]));
    }
    WP_CLI::log('PASS ' . $label);
}

/**
 * Wraps already serialized items without supplying a default FAQ attribute.
 *
 * @param string $items Serialized accordion items.
 * @param bool|null $faq Whether to enable FAQ, or null to exercise the metadata default.
 * @return string Serialized parent block.
 */
function rrze_faq_group(string $items, ?bool $faq = null): string
{
    $attributes = $faq === null ? '' : ' ' . wp_json_encode(['faqSchema' => $faq]);
    return '<!-- wp:rrze-elements/collapsibles' . $attributes . ' -->'
        . $items . '<!-- /wp:rrze-elements/collapsibles -->';
}

/**
 * Builds an item whose content is rendered by WordPress exactly once.
 *
 * @param string $answer Serialized answer blocks.
 * @param string $title Question text.
 * @return string Serialized item block.
 */
function rrze_faq_item(string $answer, string $title = 'Question?'): string
{
    return '<!-- wp:rrze-elements/collapse ' . wp_json_encode(['title' => $title, 'jumpName' => wp_unique_id('faq-')]) . ' -->'
        . $answer . '<!-- /wp:rrze-elements/collapse -->';
}

$type = WP_Block_Type_Registry::get_instance()->get_registered('rrze-elements/collapsibles');
if (!$type || ($type->attributes['faqSchema']['default'] ?? null) !== false) {
    throw new RuntimeException('Build and activate Elements Blocks on the selected test site first.');
}

$answer = '<!-- wp:paragraph --><p>Answer with a <a href="https://example.com">link</a>.</p><!-- /wp:paragraph -->';
$item = rrze_faq_item($answer);
rrze_faq_assert_schema(rrze_faq_group($item), 0, 0, 'default false');
rrze_faq_assert_schema(rrze_faq_group($item, false), 0, 0, 'explicit false');
rrze_faq_assert_schema(rrze_faq_group($item . rrze_faq_item($answer), true), 1, 2, 'all complete items');
rrze_faq_assert_schema(rrze_faq_group($item, true) . rrze_faq_group(rrze_faq_item($answer)), 1, 1, 'independent siblings');
rrze_faq_assert_schema(rrze_faq_group(rrze_faq_item(rrze_faq_group($item)), true), 1, 1, 'nested default resets context');
rrze_faq_assert_schema(rrze_faq_group(rrze_faq_item(rrze_faq_group($item, true))), 1, 1, 'inner opt-in stays independent');
rrze_faq_assert_schema(rrze_faq_group(rrze_faq_item(rrze_faq_group($item, true)), true), 2, 2, 'nested opt-in keeps separate scopes');
rrze_faq_assert_schema(rrze_faq_group($item . rrze_faq_item('<p>&nbsp;<br></p>') . rrze_faq_item($answer, ''), true), 1, 1, 'incomplete items are skipped');

$calls = 0;
register_block_type('rrze-faq-test/answer', [
    /** @return string A dynamic answer used to detect duplicate rendering. */
    'render_callback' => static function () use (&$calls): string {
        $calls++;
        return '<p>Dynamic answer.</p>';
    },
]);
try {
    rrze_faq_assert_schema(rrze_faq_group(rrze_faq_item('<!-- wp:rrze-faq-test/answer /-->'), true), 1, 1, 'dynamic answers');
    if ($calls !== 1) {
        throw new RuntimeException('Dynamic answer rendered more than once.');
    }
} finally {
    unregister_block_type('rrze-faq-test/answer');
}

WP_CLI::success('FAQ integration checks passed without changing stored content.');
