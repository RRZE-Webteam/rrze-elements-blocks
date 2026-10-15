<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class TimelineItem extends AbstractBlockRender
{

    /**
     * @param array<string, mixed> $attributes
     * @param string $innerBlocks
     * @inheritDoc
     */
    public function render(array $attributes, string $innerBlocks, ?\WP_Block $block = null): string
    {
        if ($block && !empty(trim($block->inner_html))) {
            return $innerBlocks;
        }

        $wrapper_class = $attributes['className'] ?? '';

        $title = sanitize_text_field($attributes['title'] ?? '');
        $hstart = max(1, min(6, (int)($attributes['hstart'] ?? 2)));
        $anchor = (string)($attributes['anchor'] ?? '');
        $id = $anchor !== '' ? ' id="' . esc_attr($anchor) . '"' : '';

        $html = '<li class="wp-block-rrze-elements-timeline-item ' . esc_attr(trim($wrapper_class)) . '"' . $id . '>';
        $html .= '<div class="tooltip">';
        $html .= '<div class="tooltip-arrow"></div>';
        if ($title !== '') {
            $html .= '<h' . $hstart . ' class="timeline-label">' . esc_html($title) . '</h' . $hstart . '>';
        }
        $html .= $innerBlocks;
        $html .= '</div></li>';

        return $html;
    }
}
