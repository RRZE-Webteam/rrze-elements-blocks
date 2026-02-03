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

        $title = $attributes['title'] ?? '';
        $hstart = max(1, min(6, $attributes['hstart'] ?? 2));

        $html = '<li class="wp-block-rrze-elements-timeline-item ' . esc_attr(trim($wrapper_class)) . '">';
        $html .= '<div class="tooltip">';
        $html .= '<div class="tooltip-arrow"></div>';
        $html .= '<h' . $hstart . ' class="timeline-label">' . sanitize_text_field($title) . '</h' . $hstart . '>';
        $html .= $innerBlocks;
        $html .= '</div></li>';

        return $html;
    }
}
