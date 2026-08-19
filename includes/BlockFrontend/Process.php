<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

class Process extends AbstractBlockRender
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

        $html = '<div class="wp-block-rrze-elements-process ' . esc_attr(trim((string)$wrapper_class)) . '">';
        $html .= '<ol class="process">';
        $html .= $innerBlocks;
        $html .= '</ol></div>';

        return $html;
    }
}
