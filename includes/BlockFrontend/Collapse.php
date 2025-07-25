<?php
declare(strict_types=1);

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\Helper;
use RRZE\ElementsBlocks\SpriteGenerator;

class Collapse extends AbstractBlockRender
{

  /**
   * @inheritDoc
   */
  public function render($attributes, $innerBlocks, ?\WP_Block $block = null): string
  {
    if ($block && !empty(trim($block->inner_html))) {
      return $innerBlocks;
    }

    $color = isset($attributes['color']) ? sanitize_html_class($attributes['color']) : '';
    $title = isset($attributes['title']) ? wp_kses_post($attributes['title']) : '';
    $jump_name = isset($attributes['jumpName']) ? $attributes['jumpName'] : '';
    $load_open = !empty($attributes['loadOpen']);
    $hstart = isset($attributes['hstart']) ? (int)$attributes['hstart'] : 1;

    $wrapper_class = isset($attributes['className']) ? $attributes['className'] : '';

    $material_symbol = isset($attributes['materialSymbol']) ? 'symbols ' . sanitize_html_class($attributes['materialSymbol']) : '';
    $iconMarkup = '';
    if (empty($attributes['materialSymbol']) && !empty($attributes['icon'])) {
      $iconMarkup = SpriteGenerator::svgUse(
        $attributes['icon'],          // z. B. "solid cow"
        'fa fa-' . str_replace(' ', ' fa-', $attributes['icon'])
      );
    }

    if (!empty($attributes['materialSymbol'])) {
      $iconMarkup = SpriteGenerator::svgUse(
        $material_symbol
      );
    }

    $heading_level = max(1, min(6, $hstart));
    $load_on_page_load = $load_open ? 'open' : '';
    $active_on_page_load = $load_open ? 'active' : '';
    $button_classes = trim('accordion-toggle ' . $active_on_page_load);

    $jump_attr = esc_attr($jump_name);
    $region_id = $jump_attr . '-section';

    $markup = '<div class="wp-block-rrze-elements-collapse ' . esc_attr(trim($wrapper_class)) . '">';
    $markup .= sprintf(
      '<div class="accordion-group %s">',
      esc_attr($color)
    );

    // Heading with toggle button
    $markup .= sprintf('<h%d class="accordion-heading">', $heading_level);

    $markup .= sprintf(
      '<button class="%1$s" data-toggle="collapse" data-name="%2$s" data-href="#%2$s" type="button" aria-expanded="%3$s" aria-controls="%2$s-section" id="%2$s">',
      esc_attr($button_classes),
      $jump_attr,
      $load_open ? 'true' : 'false'
    );

    if ($iconMarkup) {
      $markup .= $iconMarkup;
    }

    $markup .= esc_html($title ?: '…');
    $markup .= '</button>';
    $markup .= '</h' . $heading_level . '>';

    $markup .= sprintf(
      '<div id="%1$s" class="accordion-body %2$s" aria-labelledby="%3$s" role="region" name="%3$s">',
      esc_attr($region_id),
      esc_attr($load_on_page_load),
      $jump_attr
    );

    $markup .= '<div class="accordion-inner clearfix">';
    $markup .= $innerBlocks;
    $markup .= '</div></div></div></div>';

    return $markup;
  }
}
