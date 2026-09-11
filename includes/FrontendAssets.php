<?php

namespace RRZE\ElementsBlocks;

defined('ABSPATH') || exit;

/**
 * Central frontend asset requests shared by blocks and compatibility code.
 */
class FrontendAssets
{
    public const STYLE = 'rrze-elements-blocks';
    public const ACCORDION_SCRIPT = 'rrze-accordions';

    public static function enqueueAccordion(): void
    {
        wp_enqueue_style(self::STYLE);
        wp_enqueue_script(self::ACCORDION_SCRIPT);
    }
}
