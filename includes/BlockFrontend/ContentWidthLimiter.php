<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class ContentWidthLimiter extends AbstractBlockRender
{

  /**
   * @inheritDoc
   */
  public function render($attributes, $innerBlocks): string
  {
    $width = isset($attributes['width']) ? (int)$attributes['width'] : 0;
    $character_width = round($width * 0.125);
    $max_width = 'min(' . $character_width . 'ch, 100%)';

    $alignment = $attributes['alignment'] ?? '';
    if ($alignment === 'left') {
      $margin = 'margin-right: auto;';
    } elseif ($alignment === 'right') {
      $margin = 'margin-left: auto;';
    } else {
      $margin = 'margin: 0 auto;';
    }

    $style = 'max-width: ' . $max_width . '; ' . $margin;

    $wrapper_class = trim('limit-width ' . ($attributes['className'] ?? ''));

    $html = '<div class="' . esc_attr($wrapper_class) . '" style="' . esc_attr($style) . '">';
    $html .= $innerBlocks;
    $html .= '</div>';

    return $html;
  }
}
