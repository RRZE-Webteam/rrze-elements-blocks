<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

/** Renders native and legacy alerts with isolated colors and an optional label. */
class Alert extends AbstractBlockRender
{
    /**
     * Produces an alert while preserving already saved static block markup.
     *
     * @param array<string, mixed> $attributes Block attributes or mapped legacy attributes.
     * @param string $innerBlocks Already rendered inner content.
     * @param \WP_Block|null $block Optional block instance.
     * @return string Rendered alert markup.
     */
    public function render(array $attributes = [], string $innerBlocks = '', ?\WP_Block $block = null): string
    {
        if ($block && !empty(trim($block->inner_html))) {
            return $innerBlocks;
        }

        $style = sanitize_text_field($attributes['style'] ?? 'default');
        if (!in_array($style, ['', 'default', 'success', 'info', 'warning', 'danger', 'example'], true)) {
            $style = 'default';
        }
        $title = sanitize_text_field($attributes['title'] ?? '');
        if ($title !== '') {
            $style = 'example';
        }

        $background = $this->sanitizeHexColor($attributes['color'] ?? '');
        $border = $this->sanitizeHexColor($attributes['borderColor'] ?? $attributes['border_color'] ?? '');
        $textColor = $this->sanitizeHexColor($attributes['textColor'] ?? '');
        $styles = [];
        $classes = ['alert', 'clearfix', 'clear', 'alert-' . ($style ?: 'default')];

        if ($style === '' || $style === 'default') {
            // The native block supplies its default palette color even without a custom color.
            if ($background !== '' && ($style === '' || $background !== '#e9edf2')) {
                $styles[] = 'background-color:' . $background;
                if ($textColor === '') {
                    $textColor = $this->contrastColor($background);
                }
                $styles[] = 'color:' . $textColor;
                if (in_array($textColor, ['#fff', '#ffffff'], true)) {
                    $classes[] = 'font-light';
                }
            }
            if ($border !== '') {
                $styles[] = 'border:1px solid ' . $border;
            }
        }

        return '<div class="' . esc_attr(implode(' ', $classes)) . '"'
            . ($styles !== [] ? ' style="' . esc_attr(implode(';', $styles)) . '"' : '')
            . ($title !== '' ? ' title="' . esc_attr($title) . '"' : '')
            . '>' . $innerBlocks . '</div>';
    }

    /**
     * Accepts only the three- and six-digit hex colors supported by legacy alerts.
     *
     * @param mixed $value Untrusted block or shortcode attribute.
     * @return string Normalized color, or an empty string for invalid input.
     */
    private function sanitizeHexColor(mixed $value): string
    {
        $color = is_string($value) ? strtolower(trim($value)) : '';
        return preg_match('/^#(?:[a-f0-9]{3}|[a-f0-9]{6})$/', $color) === 1 ? $color : '';
    }

    /**
     * Preserves the legacy luminance calculation for automatic text contrast.
     *
     * @param string $color Validated three- or six-digit hex background.
     * @return string White or black text color.
     */
    private function contrastColor(string $color): string
    {
        $hex = substr($color, 1);
        if (strlen($hex) === 3) {
            $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
        }
        $luminance = 0.2126 * pow(hexdec(substr($hex, 0, 2)) / 255, 2.2)
            + 0.7152 * pow(hexdec(substr($hex, 2, 2)) / 255, 2.2)
            + 0.0722 * pow(hexdec(substr($hex, 4, 2)) / 255, 2.2);

        return 1.05 / ($luminance + 0.05) > 4.5 ? '#ffffff' : '#000000';
    }
}
