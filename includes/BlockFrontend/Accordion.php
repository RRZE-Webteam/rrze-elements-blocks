<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\SpriteGenerator;

class Accordion extends AbstractBlockRender
{

    /**
     * @inheritDoc
     */
    public function render($attributes, $innerBlocks, ?\WP_Block $block = null): string
    {
        if ($block && !empty(trim($block->inner_html))) {
            return $innerBlocks;
        }

      // Attributes
      $same_block_count     = isset( $attributes['sameBlockCount'] )     ? (int) $attributes['sameBlockCount']     : 0;
      $total_children_count = isset( $attributes['totalChildrenCount'] ) ? (int) $attributes['totalChildrenCount'] : 0;
      $ancestor_count       = isset( $attributes['ancestorCount'] )      ? (int) $attributes['ancestorCount']      : 0;

      $title     = isset( $attributes['title'] ) ? wp_kses_post( $attributes['title'] ) : '';
      $color     = isset( $attributes['color'] ) ? sanitize_html_class( $attributes['color'] ) : '';

      $hstart   = isset( $attributes['hstart'] ) ? (int) $attributes['hstart'] : 1;
      $jumpname = isset( $attributes['jumpName'] ) ? $attributes['jumpName'] : '';

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

      // Jumpname ID
      if ( '' === $jumpname ) {
        $output_id = 'panel_' . ( $same_block_count + $total_children_count + $ancestor_count );
      } else {
        $output_id = sanitize_title_with_dashes( $jumpname );
      }

      // Evaluate Heading Level
      $heading_level = max( 1, min( 6, $hstart + 1 ) );

      // BlockEditor Class
      $wrapper_class = isset( $attributes['className'] ) ? $attributes['className'] : '';

      // HTML Markup
      $markup  = '<div class="' . esc_attr( trim( $wrapper_class ) ) . '">';
      $markup .= sprintf(
        '<div class="accordion-group %1$s">',        // 1 = $color
        esc_attr( $color )
      );

      // Heading with Button
      $markup .= sprintf(
        '<h%1$d class="accordion-heading">',         // 1 = $heading_level
        $heading_level
      );

      $markup .= '<span class="read-mode-only">' . esc_html( $title ) . '</span>';

      $markup .= sprintf(
        '<button class="accordion-toggle" data-toggle="collapse" data-name="%1$s" data-href="#%1$s" type="button" aria-expanded="false" aria-controls="%1$s">',
        esc_attr( $output_id )
      );

      if ($iconMarkup) {
        $markup .= $iconMarkup;
      }

      $markup .= esc_html( $title ?: '…' );
      $markup .= '</button>';
      $markup .= sprintf( '</h%1$d>', $heading_level );

      // Panel-Body
      $markup .= sprintf(
        '<div id="%1$s" class="accordion-body" aria-labelledby="%2$s" role="region">',
        esc_attr( $output_id ),
        esc_attr( $jumpname )
      );

      $markup .= '<div class="accordion-inner clearfix">';
      $markup .= $innerBlocks;
      $markup .= '</div></div></div></div>';

      return $markup;
    }
}
