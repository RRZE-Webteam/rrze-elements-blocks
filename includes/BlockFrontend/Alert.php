<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class Alert extends AbstractBlockRender
{
    /**
     * @inheritDoc
     */
    public function render($attributes = [], $innerBlocks = '', ?\WP_Block $block = null): string
    {
      $style = isset($attributes['style']) ? esc_attr($attributes['style']) : 'default';
      $title = isset($attributes['title']) ? esc_attr($attributes['title']) : '';
      $text_color = isset($attributes['textColor']) ? esc_attr($attributes['textColor']) : '';
      $custom_background_color = isset($attributes['color']) ? esc_attr($attributes['color']) : '';
      $font_light = false;
      $inline_css = '';

      if (!empty($title)) {
        $style = 'example';
        $title = str_replace('"', '&quot;', $title);
      }

      if (!empty($text_color) && !empty($custom_background_color)) {
        $inline_css = 'background-color: ' . $custom_background_color;
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
