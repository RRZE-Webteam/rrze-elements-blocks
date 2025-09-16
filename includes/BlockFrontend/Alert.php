<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\Helper;

class Alert extends AbstractBlockRender
{
  /**
   * @inheritDoc
   */
  public function render($attributes = [], $innerBlocks = '', ?\WP_Block $block = null): string
  {
    if ($block && !empty(trim($block->inner_html))) {
      return $innerBlocks;
    }

    $style = isset($attributes['style']) ? esc_attr($attributes['style']) : 'default';
    $title = isset($attributes['title']) ? esc_attr($attributes['title']) : '';
    $text_color = isset($attributes['textColor']) ? esc_attr($attributes['textColor']) : '';
    $custom_background_color = isset($attributes['color']) ? esc_attr($attributes['color']) : '';
    $font_light = false;
    $inline_css = '';

    $predefined_colors = [
      '#e9edf2',
      '#dff0d8',
      '#d9edf7',
      '#fcf8e3',
      '#f2dede',
    ];

    if (!empty($title)) {
      $style = 'example';
      $title = str_replace('"', '&quot;', $title);
    }

    if (!empty($text_color) && !empty($custom_background_color)) {
      $hex = strtolower(trim($custom_background_color));
      if (!in_array($hex, $predefined_colors, true)) {
        $inline_css = 'background-color: ' . $hex;
      }
    }

    if (!empty($text_color)) {
      $color = strtolower(trim($text_color));
      if ($color === '#fff' || $color === '#ffffff') {
        $font_light = true;
      }
    }

    $font_light_class = $font_light ? 'font-light' : '';

    return sprintf(
      '<div class="alert clearfix clear alert-%s %s" style="%s" title="%s">%s</div>',
      $style,
      $font_light_class,
      $inline_css,
      $title,
      $innerBlocks
    );
  }
}
