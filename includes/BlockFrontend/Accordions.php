<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;

class Accordions extends AbstractBlockRender
{

    /**
     * @inheritDoc
     */
    public function render($attributes, $innerBlocks): string
    {
        $wrapper_class = $attributes['className'] ?? '';

        $markup  = '<div class="' . esc_attr( trim( $wrapper_class ) ) . '">';
        $markup .= '<div class="accordion">';
        $markup .= $innerBlocks;
        $markup .= '</div></div>';

        return $markup;
    }
}
