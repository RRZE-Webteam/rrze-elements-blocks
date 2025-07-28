<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\Helper;
use RRZE\ElementsBlocks\SpriteGenerator;

class Notice extends AbstractBlockRender
{
    private static array $icon_map = [
      'notice-attention'  => 'solid triangle-exclamation',
      'notice-hinweis'    => 'solid info',
      'notice-baustelle'  => 'solid screwdriver-wrench',
      'notice-question'   => 'solid question',
      'notice-minus'      => 'solid minus',
      'notice-plus'       => 'solid plus',
      'notice-idea'       => 'solid lightbulb',
      'notice-download'   => 'solid download',
      'notice-faubox'     => 'solid cloud-arrow-down',
      'notice-audio'      => 'solid headphones',
      'notice-video'      => 'solid video',
      'notice-thumbs-up'  => 'solid thumbs-up',
      'notice-thumbs-down'=> 'solid thumbs-down',
    ];

    /**
     * @inheritDoc
     */
    public function render($attributes, $innerBlocks, ?\WP_Block $block = null): string
    {
      if ( $block && ! empty( trim($block->inner_html )) ) {
        return $innerBlocks;
      }

      Helper::debug($attributes);

      $variation   = $attributes['style'] ?? '';
      $icon_class  = self::$icon_map[ $variation ] ?? '';
      $material_symbol = !empty($attributes['materialSymbol']) ? 'symbols ' . sanitize_html_class($attributes['materialSymbol']) : '';

      if (!empty($material_symbol)) {
        $iconMarkup = SpriteGenerator::svgUse(
          $material_symbol
        );
      } else {
        $iconMarkup = SpriteGenerator::svgUse(
          $icon_class,          // z. B. "solid cow"
          'fa fa-' . str_replace(' ', ' fa-', $icon_class)
        );
      }



      $wrapper_class = isset( $attributes['className'] ) ? $attributes['className'] : '';

      $markup  = '<div class="wp-block-rrze-elements-notice ' . esc_attr( trim( $wrapper_class ) ) . '">';
      $markup .= '<div class="notice ' .  $attributes["style"] . '">';

      $markup .= '<div class="icon-box">';
      $markup .= $iconMarkup;
      $markup .= '</div>';

      $markup .= '<div>';
      $markup .= $innerBlocks;
      $markup .= '</div>';

      $markup .= '</div></div>';

      return $markup;
    }
}
