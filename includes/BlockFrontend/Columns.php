<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class Columns extends AbstractBlockRender
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

        $wrapper_class = 'elements-textcolumns' . (!empty($attributes['className']) ? ' ' . $attributes['className'] : '');
        $has_border = !empty($attributes['border']);

        $styles = [];
        if (!empty($attributes['numberOfColumns'])) {
            $styles[] = 'column-count:' . (int)$attributes['numberOfColumns'];
        }
        if ($attributes['width'] !== '') {
            $width = is_numeric($attributes['width']) ? $attributes['width'] . 'px' : $attributes['width'];
            $styles[] = 'column-width:' . $width;
        }
        if (!empty($attributes['rule']) && !empty($attributes['borderColor'])) {
            $styles[] = 'column-rule:1px solid ' . $attributes['borderColor'];
        }
        if ($has_border && !empty($attributes['borderColor'])) {
            $styles[] = 'border:1px solid ' . $attributes['borderColor'];
        }
        $style_attr = $styles ? ' style="' . esc_attr(implode(';', $styles)) . '"' : '';

        $inner_class = 'rrze-elements-blocks-text-column'
            . (!$has_border ? ' no-border' : '')
            . (!empty($attributes['colorSlug']) ? ' bg-' . sanitize_html_class($attributes['colorSlug']) : '');

        $html = '<div class="' . esc_attr(trim($wrapper_class)) . '">';
        $html .= '<div class="' . esc_attr($inner_class) . '"' . $style_attr . '>';
        $html .= $innerBlocks;
        $html .= '</div></div>';

        return $html;
    }
}
