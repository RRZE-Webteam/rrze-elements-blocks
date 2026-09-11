<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class Accordions extends AbstractBlockRender
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
        $accordion_id = $attributes['accordionId'] ?? '';
        $accordion_id_attribute = $accordion_id !== ''
            ? ' id="' . esc_attr((string)$accordion_id) . '"'
            : '';
        $expand_all_link = !empty($attributes['expandAllLink']);
        $expand_label = isset($attributes['expandLabel'])
            ? (string)$attributes['expandLabel']
            : '';

        $markup = '<div class="' . esc_attr(trim($wrapper_class)) . '">';
        $markup .= '<div class="accordion"' . $accordion_id_attribute . '>';
        if ($expand_all_link) {
            $markup .= '<div class="button-container-right">';
            $markup .= '<button class="expand-all standard-btn primary-btn xsmall-btn" data-status="closed">';
            $markup .= esc_html($expand_label);
            $markup .= '</button></div>';
        }
        $markup .= $innerBlocks;
        $markup .= '</div></div>';

        return $markup;
    }
}
