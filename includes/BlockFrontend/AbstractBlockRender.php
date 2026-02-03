<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

abstract class AbstractBlockRender
{
  /**
   * Renders the Block's Frontend.
   *
   * @param array<string, mixed> $attributes A clean associative array of block attributes.
   * @param string $innerBlocks All the inner block semantics.
   */
  abstract public function render(array $attributes, string $innerBlocks, ?\WP_Block $block = null): string;
}


