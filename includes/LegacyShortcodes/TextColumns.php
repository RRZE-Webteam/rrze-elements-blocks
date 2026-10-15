<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

use RRZE\ElementsBlocks\BlockFrontend\Columns;
use RRZE\ElementsBlocks\FrontendAssets;
use RRZE\ElementsBlocks\Helper;

defined('ABSPATH') || exit;

/** Adapts the legacy flowing-text shortcode to the shared Columns renderer. */
class TextColumns implements ShortcodeAdapter
{
    /** @return array<string, callable> The flowing-text tag, separate from columns/column. */
    public function getShortcodes(): array
    {
        return ['text-columns' => [$this, 'shortcodeTextColumns']];
    }

    /** Requests the shared frontend styles without the old plugin's assets. */
    public function enqueueAssets(): void
    {
        wp_enqueue_style(FrontendAssets::STYLE);
    }

    /**
     * Maps legacy attributes and formats source text before expanding child shortcodes.
     *
     * @param array<string, string>|string $atts Legacy attributes or WordPress's empty string.
     * @param string|null $content Enclosed text and nested shortcodes.
     * @param string $tag Registered tag for shortcode_atts filters.
     * @return string Flowing columns in the current block design.
     */
    public function shortcodeTextColumns(array|string $atts = [], ?string $content = '', string $tag = 'text-columns'): string
    {
        $args = shortcode_atts([
            'number' => '2',
            'width' => '240',
            'rule' => 'true',
            'rule-color' => 'var(--color-ContentBorders, #C3C3CB)',
            'background-color' => '',
            'border-color' => '',
            'style' => '',
        ], is_array($atts) ? $atts : [], $tag);

        $this->enqueueAssets();

        return (new Columns())->render([
            'className' => 'rrze-elements-legacy-textcolumns',
            'numberOfColumns' => abs((int)$args['number']) ?: 2,
            'width' => abs((int)$args['width']) ?: 240,
            'rule' => Helper::shortcode_boolean($args['rule']),
            'ruleColor' => $args['rule-color'],
            'border' => $args['border-color'] !== '',
            'borderColor' => $args['border-color'],
            'color' => $args['background-color'],
            'style' => $args['style'],
        ], do_shortcode(shortcode_unautop(wpautop(trim($content ?? '')))));
    }
}
