<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class CallToAction extends AbstractBlockRender
{

  /**
   * @inheritDoc
   */
  public function render($attributes, $innerBlocks, ?\WP_Block $block = null): string
  {
    $wrapper_class = $attributes['className'] ?? '';

    $id = isset($attributes['id']) ? (int)$attributes['id'] : 0;
    $alt = $attributes['alt'] ?? '';
    $url = $attributes['url'] ?? '';
    $title = $attributes['title'] ?? '';
    $subtitle = $attributes['subtitle'] ?? '';
    $button_text = $attributes['buttonText'] ?? '';
    $button_url = $attributes['buttonUrl'] ?? '';
    $background = $attributes['background'] ?? '';
    $is_search = !empty($attributes['isSearch']);

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
      $html .= '<a href="' . esc_url($href) . '" class="btn cta-button">' . esc_html($button_text) . '<span class="fa-solid fa-arrow-right rrze-elements-cta-icon"></span></a>';
      $html .= '</div></div>';
    }

    $html .= '</div>';

    return $html;
  }
}
