<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class Tab extends AbstractBlockRender
{

    /**
     * @inheritDoc
     */
    public function render($attributes, $innerBlocks, ?\WP_Block $block = null): string
    {
      $tabs_uid      = isset($attributes['tabsUid']) ? $attributes['tabsUid'] : '';
      $block_id      = isset($attributes['blockId']) ? $attributes['blockId'] : '';
      $uid           = substr($block_id, 0, 10);
      $wrapper_class = isset($attributes['className']) ? $attributes['className'] : '';
      $title         = isset($attributes['title']) ? $attributes['title'] : '';

      $div_id = 'tab-' . $tabs_uid . '_tabpanel_tab-label-' . $uid;

      $html  = '<div id="' . esc_attr($div_id) . '" role="tabpanel" aria-labelledby="' . esc_attr($uid) . '" class="' . esc_attr($wrapper_class) . '">';
      $html .= '<h2 class="print-only">' . esc_html($title) . '</h2>';
      $html .= $innerBlocks;
      $html .= '</div>';

      return $html;
    }
}
