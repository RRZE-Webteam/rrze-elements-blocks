<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class CounterRow extends AbstractBlockRender
{

  /**
   * @inheritDoc
   */
  public function render($attributes, $innerBlocks): string
  {
    $columns = isset($attributes['columns']) ? (int)$attributes['columns'] : 1;
    $stagger = $attributes['stagger'] ?? '';
    $start_value = $attributes['startValue'] ?? '';
    $extra_class = $attributes['className'] ?? '';

    $wrapper_class = trim('rrze-elements-column-' . $columns . ' ' . $extra_class);

    $html = '<div class="' . esc_attr($wrapper_class) . '">';
    $html .= '<section data-startvalue="' . esc_attr($start_value) . '" data-stagger="' . esc_attr($stagger) . '" class="rrze--counter-element">';
    $html .= $innerBlocks;
    $html .= '</section></div>';

    return $html;
  }
}
