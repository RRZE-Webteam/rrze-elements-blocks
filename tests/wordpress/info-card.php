<?php

declare(strict_types=1);

/**
 * Checks real WordPress context propagation without modifying stored content.
 * Run after building: wp --skip-plugins --skip-themes eval-file tests/wordpress/info-card.php
 */

$root = dirname(__DIR__, 2);
require_once $root . '/vendor/autoload.php';

foreach (['carousel' => 'Carousel', 'info-card' => 'InfoCard'] as $folder => $renderer) {
    if (!WP_Block_Type_Registry::get_instance()->is_registered('rrze-elements/' . $folder)) {
        $class = 'RRZE\\ElementsBlocks\\BlockFrontend\\' . $renderer;
        register_block_type($root . '/build/blocks/' . $folder, [
            /**
             * Invokes the same renderer contract as Blocks::rrze_register_dynamic_blocks().
             *
             * @param array<string, mixed> $attributes Prepared block attributes.
             * @param string $content Rendered children.
             * @param WP_Block $block Current instance with inherited context.
             * @return string Rendered block.
             */
            'render_callback' => static function (array $attributes, string $content, WP_Block $block) use ($class): string {
                return (new $class())->render($attributes, $content, $block);
            },
        ]);
    }
}

/**
 * Renders a saved block and checks its card wrapper, style and height.
 *
 * @param string $source Serialized blocks.
 * @param string $tag Expected wrapper element.
 * @param string $style Expected resolved card style.
 * @param int $height Expected effective height.
 * @return string Rendered HTML, available for a local preview.
 */
function rrze_check_card_context(string $source, string $tag, string $style, int $height): string
{
    $html = do_blocks($source);
    if (function_exists('fau_elemental_remove_inline_styles_from_content')) {
        $html = fau_elemental_remove_inline_styles_from_content($html);
    }
    $document = new DOMDocument();
    $previous = libxml_use_internal_errors(true);
    try {
        $document->loadHTML('<?xml encoding="UTF-8">' . $html);
    } finally {
        libxml_clear_errors();
        libxml_use_internal_errors($previous);
    }
    $xpath = new DOMXPath($document);
    $cards = $xpath->query('//*[@data-card-layout]');
    if ($cards->length !== 1) {
        throw new RuntimeException('Expected one rendered card. Build block metadata first.');
    }
    $card = $cards->item(0);
    if (!$card instanceof DOMElement || $card->tagName !== $tag
        || $card->getAttribute('data-card-appearance') !== $style
        || !str_contains($card->getAttribute('style'), '--card-height: ' . $height . 'px;')) {
        throw new RuntimeException('Unexpected wrapper or inherited card appearance: ' . $html);
    }
    if ($tag === 'li' && $card->parentNode->nodeName !== 'ul') {
        throw new RuntimeException('List cards must remain direct children of the carousel list.');
    }
    WP_CLI::log('PASS ' . $tag . ' / ' . $style . ' / ' . $height);
    return $html;
}

$card = '<!-- wp:rrze-elements/info-card {"title":"Research","subtitle":"Our projects","cardHeight":480} -->'
    . '<!-- wp:paragraph --><p>Details about the <strong>research project</strong>.</p><!-- /wp:paragraph -->'
    . '<!-- /wp:rrze-elements/info-card -->';
$standalone = rrze_check_card_context($card, 'div', 'marketing', 480);
rrze_check_card_context('<!-- wp:group --><div class="wp-block-group">' . $card . '</div><!-- /wp:group -->', 'div', 'marketing', 480);
$carousel = rrze_check_card_context('<!-- wp:rrze-elements/carousel {"title":"Projects","cardHeight":420} -->'
    . $card . '<!-- /wp:rrze-elements/carousel -->', 'li', 'scientific', 420);
rrze_check_card_context('<!-- wp:rrze-elements/carousel {"title":"Projects","className":"is-style-marketing"} -->'
    . $card . '<!-- /wp:rrze-elements/carousel -->', 'li', 'marketing', 350);
rrze_check_card_context($card, 'div', 'marketing', 480);

// Demonstrates that a future container need not be known to the card implementation.
register_block_type('rrze-card-test/container', [
    'attributes' => ['height' => ['type' => 'number', 'default' => 560]],
    'provides_context' => ['rrze-elements/card-height' => 'height'],
]);
try {
    rrze_check_card_context('<!-- wp:rrze-card-test/container -->' . $card . '<!-- /wp:rrze-card-test/container -->', 'div', 'marketing', 560);
} finally {
    unregister_block_type('rrze-card-test/container');
}

$themeFilter = get_theme_root() . '/FAU-Elemental/inc/content-sanitization.php';
if (is_readable($themeFilter)) {
    require_once $themeFilter;
    $filtered = rrze_check_card_context($card, 'div', 'marketing', 480);
    if (!str_contains($filtered, '--rrze-card-size: 320px;') || !str_contains($filtered, '--card-text-shadow: none;')) {
        throw new RuntimeException('Theme filtering corrupted the standalone card settings.');
    }
}

$type = WP_Block_Type_Registry::get_instance()->get_registered('rrze-elements/info-card');
if (!empty($type->ancestor) || !in_array('rrze-info-card', $type->view_script_handles, true)) {
    throw new RuntimeException('Cards must be insertable independently and load their own script.');
}
WP_CLI::success('Card integration checks passed without changing stored content.');
