<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\Helper;
use RRZE\ElementsBlocks\SpriteGenerator;

class Notice extends AbstractBlockRender
{
    private static array $icon_map = [
      'notice-attention'  => 'symbols warning',
      'notice-hinweis'    => 'symbols notifications',
      'notice-baustelle'  => 'symbols construction',
      'notice-question'   => 'symbols question_mark',
      'notice-minus'      => 'symbols block',
      'notice-plus'       => 'symbols add',
      'notice-idea'       => 'symbols lightbulb',
      'notice-download'   => 'symbols cognition',
      'notice-faubox'     => 'symbols download',
      'notice-audio'      => 'symbols headphones',
      'notice-video'      => 'symbols video_library',
      'notice-thumbs-up'  => 'symbols thumb_up',
      'notice-thumbs-down'=> 'symbols thumb_down',
    ];

    /**
     * @inheritDoc
     */
    public function render($attributes, $innerBlocks, ?\WP_Block $block = null): string
    {
      if ( $block && ! empty( trim($block->inner_html )) ) {
        return $innerBlocks;
      }

      $variation   = $attributes['style'] ?? '';
      $icon_class  = self::$icon_map[ $variation ] ?? '';
      $material_symbol = !empty($attributes['materialSymbol']) ? 'symbols ' . sanitize_html_class($attributes['materialSymbol']) : '';

      if (!empty($material_symbol)) {
        $iconMarkup = SpriteGenerator::svgUse(
          $material_symbol
        );
      } else {
        $iconMarkup = SpriteGenerator::svgUse(
          $icon_class
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
