<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\SpriteGenerator;

class Tab extends AbstractBlockRender
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

        $tabs_uid = isset($attributes['tabsUid']) ? $attributes['tabsUid'] : '';
        $block_id = isset($attributes['blockId']) ? $attributes['blockId'] : '';
        $uid = isset($attributes['tabId']) ? sanitize_html_class((string)$attributes['tabId']) : substr($block_id, 0, 10);
        $wrapper_class = isset($attributes['className']) ? sanitize_text_field($attributes['className']) : '';
        $title = isset($attributes['title']) ? sanitize_text_field($attributes['title']) : '';

        $headingLevel = (int)($attributes['headingLevel'] ?? 2);
        if ($headingLevel < 1 || $headingLevel > 6) {
            $headingLevel = 2;
        }
        // Opt-in print icon: existing blocks retain their plain print heading.
        $iconMarkup = !empty($attributes['printMaterialSymbol'])
            ? SpriteGenerator::svgUse('symbols ' . sanitize_html_class($attributes['printMaterialSymbol']))
            : '';

        $div_id = 'tab-' . $tabs_uid . '_tabpanel_tab-label-' . $uid;

        $html = '<div id="' . esc_attr($div_id) . '" role="tabpanel" aria-labelledby="' . esc_attr($uid) . '" class="' . esc_attr($wrapper_class) . '">';
        $html .= '<h' . $headingLevel . ' class="print-only">' . $iconMarkup . esc_html($title) . '</h' . $headingLevel . '>';
        $html .= $innerBlocks;
        $html .= '</div>';

        return $html;
    }
}
