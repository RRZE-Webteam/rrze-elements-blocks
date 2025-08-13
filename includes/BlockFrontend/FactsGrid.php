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
    $headingLevel = isset($attributes['headingLevel']) ? absint($attributes['headingLevel']) : 3;
    $hide_heading = $attributes['hideHeading'] ?? false;

    $heading_markup = '';
    if (!$hide_heading) {
      $heading_markup = sprintf(
        '<h%1$d class="wp-block-fau-elemental-fau-meta-headline">%2$s</h%1$d>',
        $headingLevel,
        esc_html($heading)
      );
    }

    return sprintf(
      '<section aria-labelledby="%1$s" class="facts %2$s">
        %3$s
        <ul class="facts__list" role="list">
            %4$s
        </ul>
    </section>',
      $heading_id,
      $wrapper_class,
      $heading_markup,
      $innerBlocks
    );
  }
}
