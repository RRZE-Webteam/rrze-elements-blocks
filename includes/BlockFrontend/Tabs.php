<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class Tabs extends AbstractBlockRender
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
        $color = isset($attributes['color']) ? sanitize_html_class($attributes['color']) : '';
        $active = $attributes['active'] ?? '';
        $uid = $attributes['blockId'] ?? '';
        $inner_ids = is_array($attributes['innerClientIds'] ?? null) ? $attributes['innerClientIds'] : [];

        usort($inner_ids, static fn($a, $b) => ($a['position'] ?? 0) <=> ($b['position'] ?? 0));

        $html = '<div class="' . esc_attr(trim($wrapper_class)) . '">';
        $html .= '<div class="rrze-elements-tabs primary ' . esc_attr($color) . '" id="tabs-' . esc_attr($uid) . '">';
        $html .= '<div role="tablist" class="manual">';

        foreach ($inner_ids as $tab) {
            $client_id = $tab['clientId'] ?? '';
            $inner_uid = substr($client_id, 0, 10);
            $selected = ($client_id === $active || $active === '') ? 'true' : 'false';
            $title = $tab['title'] ?? '';
            $svg_class = $tab['svgString'] ?? '';

            $html .= '<button id="' . esc_attr($inner_uid) . '" type="button" role="tab" aria-selected="' . $selected . '" aria-controls="tab-' . esc_attr($uid) . '_tabpanel_tab-label-' . esc_attr($inner_uid) . '">';
            $html .= '<span class="focus" tabindex="-1"><span class="' . esc_attr($svg_class) . '"></span> ' . esc_html($title) . '</span>';
            $html .= '</button>';
        }

        $html .= '</div>';
        $html .= $innerBlocks;
        $html .= '</div></div>';

        return $html;
    }
}
