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
      $title  = isset($attributes['title']) ? esc_attr($attributes['title']) : '';

      if(!empty($title)){
        $style = 'example';
        $title = str_replace('"', '&quot;', $title);
      }

      return sprintf(
        '<div class="alert clearfix clear alert-%s" title="%s">%s</div>',
        $style,
        $title,
        $innerBlocks
      );
    }
}
