<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\Helper;

class Collapsibles extends AbstractBlockRender
{

    /**
     * @inheritDoc
     */
  public function render( $attributes = [], $innerBlocks = '', ?\WP_Block $block = null) : string {

      if ( $block && ! empty( trim($block->inner_html )) ) {
          return $innerBlocks;
      }

    $expand_all_link = ! empty( $attributes['expandAllLink'] );
    $expand_label    = $attributes['expandLabel'] ?? '';

    $wrapper_class = $attributes['className'] ?? '';

    $markup  = '<div class="wp-block-rrze-elements-collapsibles ' . esc_attr( trim( $wrapper_class ) ) . '">';

    $markup .= '<div class="accordion">';

    if ( $expand_all_link ) {
      $markup .= '<div class="button-container-right">';
      $markup .= '<button class="expand-all standard-btn primary-btn xsmall-btn" data-status="closed">';
      $markup .= esc_html( $expand_label );
      $markup .= '</button></div>';
    }

    $markup .= $innerBlocks;
    $markup .= '</div></div>';

    return $markup;
  }
}
