<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\Helper;
use RRZE\ElementsBlocks\SpriteGenerator;

class Notice extends AbstractBlockRender
{
    private static array $icon_map = [
        'notice-attention'  => 'symbols warning',
        'notice-hinweis'    => 'symbols notifications',
        'notice-baustelle'  => 'symbols construction',
        'notice-question'   => 'symbols question_mark',
        'notice-minus'      => 'symbols block',
        'notice-plus'       => 'symbols add',
        'notice-idea'       => 'symbols lightbulb',
        'notice-download'   => 'symbols cognition',
        'notice-faubox'     => 'symbols download',
        'notice-audio'      => 'symbols headphones',
        'notice-video'      => 'symbols video_library',
        'notice-thumbs-up'  => 'symbols thumb_up',
        'notice-thumbs-down'=> 'symbols thumb_down',
    ];

    /**
     * @inheritDoc
     */
    public function render($attributes, $innerBlocks, ?\WP_Block $block = null): string
    {
        // Avoid deprecation on trim(null)
        if ($block && !empty(trim((string)$block->inner_html))) {
            return (string)$innerBlocks;
        }

        // Style / variation may be absent → coalesce + sanitize
        $variation = (string)($attributes['style'] ?? '');
        $variation_class = $variation !== '' ? sanitize_html_class($variation) : '';

        $icon_class = self::$icon_map[$variation] ?? '';

        // Optional override via materialSymbol
        $material_symbol = !empty($attributes['materialSymbol'])
            ? 'symbols ' . sanitize_html_class((string)$attributes['materialSymbol'])
            : '';

        $iconMarkup = SpriteGenerator::svgUse(
            $material_symbol !== '' ? $material_symbol : $icon_class
        );

        $wrapper_class = (string)($attributes['className'] ?? '');

        $markup = '<div class="wp-block-rrze-elements-notice ' . esc_attr(trim($wrapper_class)) . '">';
        $markup .= '<div class="notice ' . esc_attr($variation_class) . '">';

        $markup .= '<div class="icon-box">';
        $markup .= $iconMarkup;
        $markup .= '</div>';

        $markup .= '<div>';
        $markup .= (string)$innerBlocks;
        $markup .= '</div>';

        $markup .= '</div></div>';

        return $markup;
    }
}
