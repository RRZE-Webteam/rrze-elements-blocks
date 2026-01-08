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

        $markup = '<div class="' . esc_attr(trim($wrapper_class)) . '">';
        $markup .= '<div class="accordion">';
        $markup .= $innerBlocks;
        $markup .= '</div></div>';

        return $markup;
    }
}
