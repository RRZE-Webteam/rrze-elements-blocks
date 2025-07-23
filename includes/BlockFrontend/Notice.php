<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\SpriteGenerator;

class Notice extends AbstractBlockRender
{
    private static array $icon_map = [
      'notice-attention'  => 'fa-solid fa-triangle-exclamation',
      'notice-hinweis'    => 'fa-solid fa-info',
      'notice-baustelle'  => 'fa-solid fa-screwdriver-wrench',
      'notice-question'   => 'fa-solid fa-question',
      'notice-minus'      => 'fa-solid fa-minus',
      'notice-plus'       => 'fa-solid fa-plus',
      'notice-idea'       => 'fa-solid fa-lightbulb',
      'notice-download'   => 'fa-solid fa-download',
      'notice-faubox'     => 'fa-solid fa-cloud-arrow-down',
      'notice-audio'      => 'fa-solid fa-headphones',
      'notice-video'      => 'fa-solid fa-video',
      'notice-thumbs-up'  => 'fa-solid fa-thumbs-up',
      'notice-thumbs-down'=> 'fa-solid fa-thumbs-down',
    ];

    /**
     * @inheritDoc
     */
    public function render($attributes, $innerBlocks, ?\WP_Block $block = null): string
    {
      if ( $block && ! empty( trim($block->inner_html )) ) {
        return $innerBlocks;
      }

      $iconMarkup = '';
      if ( $block && ! empty( trim($block->inner_html )) ) {
        return $innerBlocks;
      }

      $variation   = isset( $attributes['style'] ) ? $attributes['style'] : '';
      $icon_class  = self::$icon_map[ $variation ] ?? '';
      $iconMarkup = SpriteGenerator::svgUse(
        $icon_class,          // z. B. "solid cow"
        'fa fa-' . str_replace(' ', ' fa-', $attributes['icon'])
      );

      $wrapper_class = isset( $attributes['className'] ) ? $attributes['className'] : '';

      $markup  = '<div class="wp-block-rrze-elements-notice ' . esc_attr( trim( $wrapper_class ) ) . '">';
      $markup .= '<div class="notice">';

      $markup .= '<div>';
      $markup .= '<span>' . $iconMarkup . '</span>';
      $markup .= '</div>';

      $markup .= '<div>';
      $markup .= $innerBlocks;
      $markup .= '</div>';

      $markup .= '</div></div>';

      return $markup;
    }
}
