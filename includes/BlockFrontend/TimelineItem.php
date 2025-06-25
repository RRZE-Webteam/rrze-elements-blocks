<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class TimelineItem extends AbstractBlockRender
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

        $title = $attributes['title'] ?? '';
        $hstart = max(1, min(6, $attributes['hstart'] ?? 2));

        $html = '<li class="wp-block-rrze-elements-timeline-item ' . esc_attr(trim($wrapper_class)) . '">';
        $html .= '<div class="tooltip">';
        $html .= '<div class="tooltip-arrow"></div>';
        $html .= '<h' . $hstart . ' class="timeline-label">' . esc_html($title) . '</h' . $hstart . '>';
        $html .= $innerBlocks;
        $html .= '</div></li>';

        return $html;
    }
}
