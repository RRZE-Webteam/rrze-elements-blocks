<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

defined('ABSPATH') || exit;

/**
 * Adapts the legacy button shortcode to the WordPress core Buttons blocks.
 */
class Button implements ShortcodeAdapter
{
    /** @var array<string, array{background: string, text: string}> */
    private const SEMANTIC_COLORS = [
        'success' => ['background' => '#115c39', 'text' => '#ffffff'],
        'info' => ['background' => '#0dcaf0', 'text' => '#000000'],
        'warning' => ['background' => '#ffc107', 'text' => '#000000'],
        'danger' => ['background' => '#921925', 'text' => '#ffffff'],
    ];

    /** @var array<string, array{background: string, text: string}> */
    private const NAMED_COLORS = [
        'red' => ['background' => '#921925', 'text' => '#ffffff'],
        'yellow' => ['background' => '#ffc107', 'text' => '#000000'],
        'blue' => ['background' => '#245783', 'text' => '#ffffff'],
        'green' => ['background' => '#115c39', 'text' => '#ffffff'],
        'grey' => ['background' => '#4c5359', 'text' => '#ffffff'],
        'black' => ['background' => '#212529', 'text' => '#ffffff'],
    ];

    /** @var array<string, array{fontSize: string, lineHeight: string, padding: string}> */
    private const SIZES = [
        'xsmall' => ['fontSize' => '0.875rem', 'lineHeight' => '1.5', 'padding' => '5px 10px'],
        'small' => ['fontSize' => '1rem', 'lineHeight' => '1.5', 'padding' => '7px 12px 5px'],
        'medium' => ['fontSize' => '1rem', 'lineHeight' => '1.5', 'padding' => '10px 18px'],
        'large' => ['fontSize' => '1.4375rem', 'lineHeight' => '1.5', 'padding' => '14px 20px 13px'],
        'xlarge' => ['fontSize' => '1.5625rem', 'lineHeight' => '1.5', 'padding' => '18px 30px 17px'],
    ];

    /**
     * @return array<string, callable>
     */
    public function getShortcodes(): array
    {
        return [
            'button' => [$this, 'shortcodeButton'],
        ];
    }

    public function enqueueAssets(): void
    {
        // Core block and theme styles provide the complete presentation.
    }

    /**
     * @param array<string, string> $atts
     */
    public function shortcodeButton(array $atts = [], ?string $content = '', string $tag = ''): string
    {
        $args = shortcode_atts([
            'link' => '#',
            'target' => '',
            'color' => '',
            'border_color' => '',
            'size' => '',
            'width' => '',
            'style' => '',
            'font' => '',
            'title' => '',
            'aria-label' => '',
        ], $atts, $tag);

        $url = esc_url($args['link']);
        $target = $args['target'] === 'blank' ? '_blank' : '';
        $title = sanitize_text_field($args['title']);
        $ariaLabel = sanitize_text_field($args['aria-label']);
        $label = $this->sanitizeLabel(do_shortcode(shortcode_unautop($content ?? '')));

        $visual = $this->getVisualAttributes($args);
        $width = $this->getWidthAttributes($args['width']);
        $blockAttributes = $this->getBlockAttributes($visual, $width);
        $buttonClasses = trim('wp-block-button ' . $visual['className'] . ' ' . $width['className']);
        $linkClasses = 'wp-block-button__link wp-element-button';

        if ($visual['background'] !== '') {
            $linkClasses .= ' has-background';
        }
        if ($visual['text'] !== '') {
            $linkClasses .= ' has-text-color';
        }

        $linkStyles = [];
        if ($visual['background'] !== '') {
            $linkStyles[] = 'background-color:' . $visual['background'];
        }
        if ($visual['text'] !== '') {
            $linkStyles[] = 'color:' . $visual['text'];
        }
        if ($visual['border'] !== '') {
            $linkStyles[] = 'border:1px solid ' . $visual['border'];
        }
        if ($visual['fontSize'] !== '') {
            $linkStyles[] = 'font-size:' . $visual['fontSize'];
            $linkStyles[] = 'line-height:' . $visual['lineHeight'];
            $linkStyles[] = 'padding:' . $visual['padding'];
            $linkStyles[] = 'height:auto';
        }
        $linkAttributes = ' class="' . esc_attr($linkClasses) . '" href="' . esc_url($url) . '"';
        $linkAttributes .= $target !== '' ? ' target="_blank" rel="noopener noreferrer"' : '';
        $linkAttributes .= $title !== '' ? ' title="' . esc_attr($title) . '"' : '';
        $linkAttributes .= $ariaLabel !== '' ? ' aria-label="' . esc_attr($ariaLabel) . '"' : '';
        $linkAttributes .= $linkStyles !== []
            ? ' style="' . esc_attr(implode(';', $linkStyles)) . '"'
            : '';

        $serializedAttributes = $this->serializeAttributes($blockAttributes);

        $blockMarkup = '<!-- wp:buttons -->'
            . '<div class="wp-block-buttons">'
            . '<!-- wp:button' . ($serializedAttributes !== '' ? ' ' . $serializedAttributes : '') . ' -->'
            . '<div class="' . esc_attr($buttonClasses) . '">'
            . '<a' . $linkAttributes . '>' . $label . '</a>'
            . '</div>'
            . '<!-- /wp:button -->'
            . '</div>'
            . '<!-- /wp:buttons -->';

        $markup = do_blocks($blockMarkup);

        return $width['value'] !== '' && $width['value'] !== '100%'
            ? $this->applyFixedWidth($markup, $width['value'])
            : $markup;
    }

    /**
     * @param array<string, string> $args
     * @return array{background: string, text: string, border: string, className: string, fontSize: string, lineHeight: string, padding: string}
     */
    private function getVisualAttributes(array $args): array
    {
        $style = strtolower(trim($args['style']));
        $color = strtolower(trim($args['color']));
        $background = '';
        $text = '';
        $className = '';

        if (isset(self::SEMANTIC_COLORS[$style])) {
            $background = self::SEMANTIC_COLORS[$style]['background'];
            $text = self::SEMANTIC_COLORS[$style]['text'];
        } elseif ($style === 'ghost') {
            // FAU-Elemental uses secondary; classic core themes use outline.
            $className = 'is-style-outline is-style-secondary';
        } elseif ($style !== 'primary') {
            if ($this->isHexColor($color)) {
                $background = $color;
                $text = $this->getContrastColor($color);
            } elseif (isset(self::NAMED_COLORS[$color])) {
                $background = self::NAMED_COLORS[$color]['background'];
                $text = self::NAMED_COLORS[$color]['text'];
            }
        }

        $border = $this->isHexColor($args['border_color'])
            ? strtolower(trim($args['border_color']))
            : '';
        $size = strtolower(trim($args['size']));
        $sizeAttributes = self::SIZES[$size] ?? [
            'fontSize' => '',
            'lineHeight' => '',
            'padding' => '',
        ];

        return [
            'background' => $background,
            'text' => $text,
            'border' => $border,
            'className' => $className,
            'fontSize' => $sizeAttributes['fontSize'],
            'lineHeight' => $sizeAttributes['lineHeight'],
            'padding' => $sizeAttributes['padding'],
        ];
    }

    /**
     * @return array{value: string, className: string, percentage: ?int}
     */
    private function getWidthAttributes(string $width): array
    {
        $width = strtolower(trim($width));
        if ($width === 'full') {
            return [
                'value' => '100%',
                'className' => 'has-custom-width wp-block-button__width-100',
                'percentage' => 100,
            ];
        }

        if (preg_match('/^(\d+(?:\.\d+)?)(?:px)?$/', $width, $matches) === 1) {
            $pixels = (float)$matches[1];
            if ($pixels > 0) {
                return [
                    'value' => (string)$pixels . 'px',
                    'className' => 'has-custom-width wp-block-button__width-100',
                    'percentage' => 100,
                ];
            }
        }

        return ['value' => '', 'className' => '', 'percentage' => null];
    }

    /**
     * @param array{background: string, text: string, border: string, className: string, fontSize: string, lineHeight: string, padding: string} $visual
     * @param array{value: string, className: string, percentage: ?int} $width
     * @return array<string, mixed>
     */
    private function getBlockAttributes(array $visual, array $width): array
    {
        $attributes = [];
        $style = [];

        if ($visual['className'] !== '') {
            $attributes['className'] = $visual['className'];
        }
        if ($width['percentage'] !== null) {
            $attributes['width'] = $width['percentage'];
        } elseif ($width['value'] !== '') {
            $style['dimensions']['width'] = $width['value'];
        }
        if ($visual['background'] !== '') {
            $style['color']['background'] = $visual['background'];
        }
        if ($visual['text'] !== '') {
            $style['color']['text'] = $visual['text'];
        }
        if ($visual['border'] !== '') {
            $style['border'] = [
                'color' => $visual['border'],
                'style' => 'solid',
                'width' => '1px',
            ];
        }
        if ($visual['fontSize'] !== '') {
            $style['typography'] = [
                'fontSize' => $visual['fontSize'],
                'lineHeight' => $visual['lineHeight'],
            ];
        }

        if ($style !== []) {
            $attributes['style'] = $style;
        }

        return $attributes;
    }

    /**
     * @param array<string, mixed> $attributes
     */
    private function serializeAttributes(array $attributes): string
    {
        if ($attributes === []) {
            return '';
        }

        $encoded = wp_json_encode($attributes);
        if (!is_string($encoded)) {
            return '';
        }

        return strtr($encoded, [
            '\\\\' => '\\u005c',
            '--' => '\\u002d\\u002d',
            '<' => '\\u003c',
            '>' => '\\u003e',
            '&' => '\\u0026',
            '\\"' => '\\u0022',
        ]);
    }

    private function sanitizeLabel(string $label): string
    {
        return wp_kses($label, [
            'abbr' => ['title' => true],
            'b' => [],
            'br' => [],
            'code' => [],
            'em' => [],
            'i' => [],
            'small' => [],
            'span' => ['class' => true],
            'strong' => [],
            'sub' => [],
            'sup' => [],
        ]);
    }

    private function applyFixedWidth(string $markup, string $width): string
    {
        $style = esc_attr('inline-size:' . $width . ';max-inline-size:100%');
        $updated = preg_replace(
            '/(<div class="[^"]*\bwp-block-buttons\b[^"]*")>/',
            '$1 style="' . $style . '">',
            $markup,
            1
        );

        return is_string($updated) ? $updated : $markup;
    }

    private function isHexColor(string $color): bool
    {
        return preg_match('/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/', trim($color)) === 1;
    }

    private function getContrastColor(string $color): string
    {
        $hex = ltrim($color, '#');
        if (strlen($hex) === 3) {
            $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
        }

        $red = hexdec(substr($hex, 0, 2));
        $green = hexdec(substr($hex, 2, 2));
        $blue = hexdec(substr($hex, 4, 2));
        $luminance = 0.2126 * pow($red / 255, 2.2)
            + 0.7152 * pow($green / 255, 2.2)
            + 0.0722 * pow($blue / 255, 2.2);
        $contrastWithWhite = 1.05 / ($luminance + 0.05);

        return $contrastWithWhite > 4.5 ? '#ffffff' : '#000000';
    }
}
