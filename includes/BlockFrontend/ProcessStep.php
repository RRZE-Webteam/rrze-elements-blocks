<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

class ProcessStep extends AbstractBlockRender
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
        $step_label = $attributes['stepLabel'] ?? '';
        $hstart = max(2, min(6, (int)($attributes['hstart'] ?? 3)));

        $html = '<li class="wp-block-rrze-elements-process-step ' . esc_attr(trim((string)$wrapper_class)) . '">';
        $html .= '<div class="tooltip">';
        $html .= '<div class="step-label">';
        $html .= '<p class="rrze-elements-blocks-process-step-label">' . esc_html(sanitize_text_field((string)$step_label)) . '</p>';
        $html .= '</div>';
        $html .= '<div class="step-icon"></div>';
        $html .= '<div class="step-content">';
        $html .= '<h' . $hstart . ' class="process-step-label">' . esc_html(sanitize_text_field((string)$title)) . '</h' . $hstart . '>';
        $html .= $innerBlocks;
        $html .= '</div></div></li>';

        return $html;
    }
}
