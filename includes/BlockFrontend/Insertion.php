<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class Insertion extends AbstractBlockRender
{

    /**
     * @inheritDoc
     */
    public function render($attributes, $innerBlocks): string
    {
      $alignment   = $attributes['alignment'] ?? '';
      $extra_class = $attributes['className'] ?? '';

      $classes = trim('pull-' . $alignment . ' ' . $extra_class);

      return '<aside class="' . esc_attr($classes) . '">' . $innerBlocks . '</aside>';
    }
}
