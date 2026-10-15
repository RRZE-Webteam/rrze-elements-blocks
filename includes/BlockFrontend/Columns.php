<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use function RRZE\ElementsBlocks\Config\calculateContrastColor;

/** Renders responsive, balanced text columns for blocks and legacy shortcodes. */
class Columns extends AbstractBlockRender
{
    /**
     * Builds the flowing container, optionally inside the shared alert design.
     *
     * @param array<string, mixed> $attributes Native or mapped legacy attributes.
     * @param string $innerBlocks Already rendered content; never parsed again here.
     * @param \WP_Block|null $block Optional saved block instance.
     * @return string Rendered columns, or unchanged saved static markup.
     */
    public function render(array $attributes, string $innerBlocks, ?\WP_Block $block = null): string
    {
        if ($block && !empty(trim($block->inner_html))) {
            return $innerBlocks;
        }

        $wrapper_class = 'elements-textcolumns' . (!empty($attributes['className']) ? ' ' . $attributes['className'] : '');
        $variation = $attributes['style'] ?? '';
        $has_alert = in_array($variation, ['success', 'info', 'warning', 'danger', 'example'], true);
        $border = $this->sanitizeHexColor($attributes['borderColor'] ?? '');
        $has_border = !$has_alert && !empty($attributes['border']) && $border !== '';
        $default_rule = 'var(--color-ContentBorders, #C3C3CB)';
        // Native blocks historically share their border color with the divider.
        $rule_value = $attributes['ruleColor'] ?? $attributes['borderColor'] ?? $default_rule;
        $rule_color = $this->sanitizeHexColor($rule_value) ?: $default_rule;
        $background = $has_alert ? '' : $this->sanitizeHexColor($attributes['color'] ?? '');
        $color_slug = sanitize_html_class($attributes['colorSlug'] ?? '');

        $styles = [
            // Elemental's inline-width sanitizer also matches "column-width".
            // The equivalent shorthand preserves both dimensions through that filter.
            'columns:' . $this->columnWidth($attributes['width'] ?? 240)
                . ' ' . (abs((int)($attributes['numberOfColumns'] ?? 2)) ?: 2),
            'column-rule:' . (($attributes['rule'] ?? true) ? '1px solid ' . $rule_color : 'none'),
        ];
        if ($has_border) {
            $styles[] = 'border:1px solid ' . $border;
        }

        $inner_class = 'rrze-elements-blocks-text-column'
            . (!$has_border ? ' no-border' : '')
            . (!$has_alert && $color_slug !== '' ? ' bg-' . $color_slug : '');

        // Keep native named palettes under stylesheet control, including theme overrides.
        if ($background !== '' && !in_array($color_slug, ['default', 'success', 'info', 'warning', 'danger'], true)) {
            $foreground = calculateContrastColor($background);
            $styles[] = 'background-color:' . $background;
            $styles[] = 'color:' . $foreground;
            $inner_class .= ' has-custom-background' . ($foreground === '#ffffff' ? ' font-light' : '');
        }
        if (!$has_alert && ($background !== '' || $has_border)) {
            $styles[] = 'padding:0.8em';
        }

        $html = '<div class="' . esc_attr($inner_class) . '" style="' . esc_attr(implode(';', $styles)) . '">'
            . $innerBlocks . '</div>';
        if ($has_alert) {
            $html = (new Alert())->render(['style' => $variation], $html);
        }

        return '<div class="' . esc_attr(trim($wrapper_class)) . '">' . $html . '</div>';
    }

    /**
     * Restricts custom colors to the documented three- or six-digit hex notation.
     *
     * @param mixed $value Untrusted color attribute.
     * @return string Normalized hex color or an empty string.
     */
    private function sanitizeHexColor(mixed $value): string
    {
        $color = is_string($value) ? strtolower(trim($value)) : '';
        return preg_match('/^#(?:[a-f0-9]{3}|[a-f0-9]{6})$/', $color) === 1 ? $color : '';
    }

    /**
     * Keeps numeric pixel widths and native CSS lengths without allowing declarations.
     *
     * @param mixed $value Requested minimum width.
     * @return string Valid CSS length, falling back to the legacy 240px default.
     */
    private function columnWidth(mixed $value): string
    {
        if (is_numeric($value) && (float)$value > 0) {
            return (float)$value . 'px';
        }
        if (is_string($value) && preg_match('/^(?:\d+(?:\.\d+)?|\.\d+)(?:px|em|rem|ch|vw|vh|%)$/', $value) === 1) {
            return $value;
        }
        return '240px';
    }
}
