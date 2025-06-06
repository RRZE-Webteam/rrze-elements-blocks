<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class Alert extends AbstractBlockRender
{

    /**
     * @inheritDoc
     */
    public function render($attributes = [], $innerBlocks = ''): string {
      $style  = isset($attributes['style']) ? esc_attr($attributes['style']) : 'default';
      $title  = !empty($attributes['title'])
        ? '<strong class="alert-title">'.esc_html($attributes['title']).'</strong>'
        : '';

      return sprintf(
        '<div class="alert clear alert-%s">%s%s</div>',
        $style,
        $title,
        $innerBlocks
      );
    }
}
