<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\Helper;
use RRZE\ElementsBlocks\SpriteGenerator;

class IconBox extends AbstractBlockRender
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
        $material_symbol = isset($attributes['materialSymbol']) ? 'symbols ' . sanitize_html_class($attributes['materialSymbol']) : '';

        $iconMarkup = '';
        if (empty($attributes['materialSymbol']) && !empty($attributes['icon'])) {
          $iconMarkup = SpriteGenerator::svgUse(
            $attributes['icon'],          // z. B. "solid cow"
            'fa fa-' . str_replace(' ', ' fa-', $attributes['icon'])
          );
        }

        if (!empty($attributes['materialSymbol'])) {
          $iconMarkup = SpriteGenerator::svgUse(
            $material_symbol
          );
        }

        $title = $attributes['title'] ?? '';
        $description = $attributes['description'] ?? '';
        $svg_string = $attributes['svgString'] ?? '';

        if ($title === '' || $description === '' || $iconMarkup === '') {
            return '';
        }

        $font_size = !empty($attributes['fontSize']) ? sanitize_html_class($attributes['fontSize']) : 'large';
        $duration = $attributes['duration'] ?? '';
        $stagger = $attributes['stagger'] ?? '';

        $button_url = $attributes['buttonUrl'] ?? '';
        $button_text = $attributes['buttonText'] ?? '';

        $markup = '<div class="rrze-iconbox-icon"><span>' . $iconMarkup . '</span></div>';


        $html = '<div class="' . esc_attr(trim($wrapper_class)) . '">';
        $html .= '<div class="rrze--iconbox-element-container">';
        $html .= $markup;
        $html .= '<div class="rrze-iconbox-content"><dl class="rrze-elements-iconbox">';
        $html .= '<dt><span class="fau-iconbox-data rrze-iconbox-' . esc_attr($font_size) . '" data-duration="' . esc_attr($duration) . '" data-stagger="' . esc_attr($stagger) . '">' . esc_html($title) . '</span></dt>';
        $html .= '<dd>' . wp_kses_post($description) . '<br />';
        if ($button_url && $button_text && $description) {
            $html .= '<a class="standard-btn ghost-btn" href="' . esc_url($button_url) . '" data-wpel-link="internal">' . esc_html($button_text) . '</a>';
        }
        $html .= '</dd></dl></div></div></div>';

        return $html;
    }
}
