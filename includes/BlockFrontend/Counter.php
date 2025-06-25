<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class Counter extends AbstractBlockRender
{

    /**
     * @inheritDoc
     */
    public function render($attributes, $innerBlocks, ?\WP_Block $block = null): string
    {
        if ($block && !empty(trim($block->inner_html))) {
            return $innerBlocks;
        }

        $wrapper_class = $attributes['className'] ?? '';

        $font_size = !empty($attributes['fontSize']) ? sanitize_html_class($attributes['fontSize']) : 'large';
        $span_class = 'fau-counter-data rrze-counter-' . $font_size;

        $duration = $attributes['duration'] ?? '';
        $stagger = $attributes['stagger'] ?? '';

        $title = $attributes['title'] ?? '';
        $description = $attributes['description'] ?? '';

        $button_url = $attributes['buttonUrl'] ?? '';
        $button_text = $attributes['buttonText'] ?? '';

        $html = '<div class="wp-block-rrze-elements-rrze-counter ' . esc_attr(trim($wrapper_class)) . '">';
        $html .= '<div class="rrze--counter-element-container">';
        $html .= '<dl class="rrze-elements-counter">';
        $html .= '<dt><span class="' . esc_attr($span_class) . '" data-duration="' . esc_attr($duration) . '" data-stagger="' . esc_attr($stagger) . '">' . esc_html($title) . '</span></dt>';
        $html .= '<dd>' . wp_kses_post($description) . '<br />';
        if ($button_url) {
            $html .= '<a class="standard-btn ghost-btn" href="' . esc_url($button_url) . '" data-wpel-link="internal">' . esc_html($button_text) . '</a>';
        }
        $html .= '</dd></dl></div></div>';

        return $html;
    }
}
