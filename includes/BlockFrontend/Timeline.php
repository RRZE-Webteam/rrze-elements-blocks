<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class Timeline extends AbstractBlockRender
{

    /**
     * @inheritDoc
     */
    public function render($attributes, $innerBlocks, ?\WP_Block $block = null): string
    {
        if ( $block && ! empty( trim($block->inner_html )) ) {
            return $innerBlocks;
        }

      $wrapper_class = isset($attributes['className']) ? $attributes['className'] : '';

      $html  = '<div class="wp-block-rrze-elements-timeline ' . esc_attr(trim($wrapper_class)) . '">';
      $html .= '<ol class="timeline">';
      $html .= $innerBlocks;
      $html .= '</ol></div>';

      return $html;
    }
}
