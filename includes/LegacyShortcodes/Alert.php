<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

use RRZE\ElementsBlocks\BlockFrontend\Alert as AlertRender;
use RRZE\ElementsBlocks\FrontendAssets;

defined('ABSPATH') || exit;

/** Adapts both legacy alert tags to the shared block renderer. */
class Alert implements ShortcodeAdapter
{
    /** @return array<string, callable> Parent and inner aliases share one callback. */
    public function getShortcodes(): array
    {
        return [
            'alert' => [$this, 'shortcodeAlert'],
            'inner_alert' => [$this, 'shortcodeAlert'],
        ];
    }

    /** Requests the shared styles without loading the old plugin's stylesheet. */
    public function enqueueAssets(): void
    {
        wp_enqueue_style(FrontendAssets::STYLE);
    }

    /**
     * Maps legacy attributes and expands nested shortcodes before rendering.
     *
     * @param array<string, string>|string $atts Attributes, or WordPress's empty string.
     * @param string|null $content Enclosed content, including inner alerts.
     * @param string $tag Registered shortcode name for shortcode_atts filters.
     * @return string Alert markup in the current block design.
     */
    public function shortcodeAlert(array|string $atts = [], ?string $content = '', string $tag = ''): string
    {
        $args = shortcode_atts([
            'style' => '',
            'color' => '',
            'border_color' => '',
            'title' => '',
        ], is_array($atts) ? $atts : [], $tag);

        $style = sanitize_text_field($args['style']);
        if (!in_array($style, ['success', 'info', 'warning', 'danger', 'example'], true)) {
            // Retired shadow styles keep their content and optional custom colors.
            $style = '';
        }

        // Format source text first; do not run wpautop over generated child markup.
        $body = do_shortcode(shortcode_unautop(wpautop(trim($content ?? ''))));
        $this->enqueueAssets();

        return (new AlertRender())->render([
            'style' => $style,
            'color' => $args['color'],
            'borderColor' => $args['border_color'],
            // In the legacy API, title only labels the example variation.
            'title' => $style === 'example' ? $args['title'] : '',
        ], $body);
    }
}
