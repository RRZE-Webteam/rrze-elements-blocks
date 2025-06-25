<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\Helper;

class CounterRow extends AbstractBlockRender
{
  private function strip_legacy_wrapper( string $content ): string {
    if (!str_contains($content, 'wp-block-rrze-elements-counter-row')) {
      return $content;
    }

    $content = preg_replace(
      [
        '~^\s*<div[^>]*\bwp-block-rrze-elements-counter-row\b[^>]*>\s*<section[^>]*>~is',
        '~</section>\s*</div>\s*$~is',
      ],
      '',
      $content
    );

    return $content ?: '';
  }

  /**
   * @inheritDoc
   */
  public function render($attributes, $innerBlocks, ?\WP_Block $block = null): string
  {
    $innerBlocks = $this->strip_legacy_wrapper( $innerBlocks );

    $columns      = isset( $attributes['columns'] ) ? (int) $attributes['columns'] : 1;
    $stagger      = $attributes['stagger']     ?? '';
    $start_value  = $attributes['startValue']  ?? '';
    $extra_class  = $attributes['className']   ?? '';

    $wrapper_class = trim( 'rrze-elements-column-' . $columns . ' ' . $extra_class );

    $html  = '<div class="wp-block-rrze-elements-counter-row ' . esc_attr( $wrapper_class ) . '">';
    $html .= '<section data-startvalue="' . esc_attr( $start_value ) . '" data-stagger="' . esc_attr( $stagger ) . '" class="rrze--counter-element">';
    $html .= $innerBlocks;
    $html .= '</section></div>';

    return $html;
  }
}
