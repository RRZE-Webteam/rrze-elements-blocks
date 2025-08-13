<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\SpriteGenerator;

class CallToAction extends AbstractBlockRender
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

    $id = isset($attributes['id']) ? (int)$attributes['id'] : 0;
    $alt = isset($attributes['alt']) ? sanitize_text_field($attributes['alt']) : '';
    $url = $attributes['url'] ?? '';
    $title = isset($attributes['title']) ? sanitize_text_field($attributes['title']) : '';
    $subtitle = isset($attributes['subtitle']) ? sanitize_text_field($attributes['subtitle']) : '';
    $button_text = isset($attributes['buttonText']) ? sanitize_text_field($attributes['buttonText']) : '';
    $button_url = $attributes['buttonUrl'] ?? '';
    $background = $attributes['background'] ?? '';
    $is_search = !empty($attributes['isSearch']);
    $cta_icon = 'solid arrow-right';

    $icon_markup = SpriteGenerator::svgUse(
      $cta_icon,
      'fa fa-' . str_replace(' ', ' fa-', $attributes['icon'])
    );

    $url_class = $url ? 'has-image' : 'no-image';

    $href = $button_url;
    if (stripos($href, 'www.') === 0) {
      $href = 'https://' . $href;
    } elseif (stripos($href, 'http://') === 0) {
      $href = preg_replace('/^http:\/\//i', 'https://', $href);
    }

    $html = '<div class="wp-block-rrze-elements-cta ' . esc_attr(trim($wrapper_class)) . '">';

    if (!$is_search) {
      $html .= '<div class="rrze-elements-cta ' . esc_attr($url_class . ' ' . $background) . '">';
      $html .= '<div class="cta-content">';
      $html .= '<span class="cta-title">' . esc_html($title) . '</span>';
      $html .= '<span class="cta-subtitle">' . esc_html($subtitle) . '</span>';
      $html .= '</div>';

      if ($url) {
        $img_class = $id ? 'wp-image-' . $id : '';
        $html .= '<div class="cta-image"><img src="' . esc_url($url) . '" class="' . esc_attr($img_class) . '" alt="' . esc_attr($alt) . '" decoding="async" /></div>';
      }

      $html .= '<div class="cta-button-container">';
      $html .= '<a href="' . esc_url($href) . '" class="btn cta-button">' . esc_html($button_text) . $icon_markup . '</a>';
      $html .= '</div></div>';
    }

    $html .= '</div>';

    return $html;
  }
}
