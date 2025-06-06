<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

abstract class AbstractBlockRender
{
  /**
   * Renders the Block's Frontend.
   *
   * @param array $attributes – A clean associative array of block attributes.
   * @param string $block – All the block settings and attributes.
   */
  abstract public function render($attributes, $innerBlocks): string;
}



