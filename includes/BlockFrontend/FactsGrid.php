<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class FactsGrid extends AbstractBlockRender
{
  /**
   * @inheritDoc
   */
  public function render($attributes = [], $innerBlocks = '', ?\WP_Block $block = null): string
  {
    if ($block && !empty(trim($block->inner_html))) {
      return $innerBlocks;
    }

    $wrapper_class = isset($attributes['className']) ? esc_attr($attributes['className']) : '';
    $heading = isset($attributes['title'])
      ? sanitize_text_field($attributes['title'])
      : __('Facts About Our Research', 'rrze-elements-blocks');
    $heading_id = !empty($attributes['anchor'])
      ? esc_attr($attributes['anchor'])
      : 'facts-heading';

    /* --------------------------------------------------------------
     * 3. Mark-up zurückgeben
     * ------------------------------------------------------------ */
    return sprintf(
      '<section aria-labelledby="%1$s" class="facts %2$s">
            <h2 id="%1$s" class="visually-hidden">%3$s</h2>
            <ul class="facts__list" role="list">
                %4$s
            </ul>
        </section>',
      $heading_id,
      $wrapper_class,
      esc_html($heading),
      $innerBlocks
    );
  }
}
