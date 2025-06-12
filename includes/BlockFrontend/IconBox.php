<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class IconBox extends AbstractBlockRender
{

  /**
   * @inheritDoc
   */
  public function render($attributes, $innerBlocks): string
  {
    $title = $attributes['title'] ?? '';
    $description = $attributes['description'] ?? '';
    $svg_string = $attributes['svgString'] ?? '';

    if ($title === '' || $description === '' || $svg_string === '') {
      return '';
    }

    $wrapper_class = $attributes['className'] ?? '';

    $font_size = !empty($attributes['fontSize']) ? sanitize_html_class($attributes['fontSize']) : 'large';
    $duration = $attributes['duration'] ?? '';
    $stagger = $attributes['stagger'] ?? '';

    $button_url = $attributes['buttonUrl'] ?? '';
    $button_text = $attributes['buttonText'] ?? '';

    $html = '<div class="' . esc_attr(trim($wrapper_class)) . '">';
    $html .= '<div class="rrze--iconbox-element-container">';
    $html .= '<div class="rrze-iconbox-icon"><span class="' . esc_attr($svg_string) . '"></span></div>';
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
