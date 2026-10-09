<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

use RRZE\ElementsBlocks\FrontendAssets;

defined('ABSPATH') || exit;

/**
 * Renders legacy icon shortcodes exclusively with mapped Material Symbols.
 */
class Icon implements ShortcodeAdapter
{
    /** @var array<string|int, string>|null */
    private static ?array $mapping = null;

    /**
     * @return array<string, callable>
     */
    public function getShortcodes(): array
    {
        return [
            'icon' => [$this, 'shortcodeIcon'],
            'list-icons' => [$this, 'shortcodeListIcons'],
        ];
    }

    public function enqueueAssets(): void
    {
        wp_enqueue_style(FrontendAssets::STYLE);
    }

    /**
     * @param array<string, string>|string $atts WordPress may pass an empty string.
     */
    public function shortcodeIcon(array|string $atts = [], ?string $content = '', string $tag = ''): string
    {
        $args = $this->sanitizeAtts($atts, $tag);
        if ($args['icon'] === '') {
            return '';
        }

        $icon = $this->getIcon($args['icon']);
        if ($icon === null) {
            return $this->notFound();
        }

        // The SVG comes from the bundled Material assets, never from shortcode input.
        if (preg_match('#<svg\b[^>]*viewBox="([^"]+)"[^>]*>(.*?)</svg>#s', $icon['svg'], $matches) !== 1) {
            return $this->notFound();
        }

        $accessibility = $args['alt'] === ''
            ? ' aria-hidden="true"'
            : ' role="img" aria-label="' . esc_attr($args['alt']) . '"';

        $this->enqueueAssets();

        return '<svg xmlns="http://www.w3.org/2000/svg" class="rrze-elements-icon icon-symbols-'
            . esc_attr($icon['name']) . '" width="1em" height="1em" viewBox="'
            . esc_attr($matches[1]) . '" fill="currentColor" focusable="false"'
            . $accessibility . ' style="' . esc_attr($this->getStyles($args)) . '">'
            . $matches[2] . '</svg>';
    }

    /**
     * @param array<string, string>|string $atts
     */
    public function shortcodeListIcons(array|string $atts = [], ?string $content = '', string $tag = ''): string
    {
        $args = $this->sanitizeAtts($atts, $tag);
        $content = $content ?? '';
        if ($args['icon'] === '') {
            return $content;
        }

        $icon = $this->getIcon($args['icon']);
        if ($icon === null) {
            return $this->notFound() . $content;
        }

        // Store the mask on each list so rendering after wp_head needs no late stylesheet.
        $mask = 'url("data:image/svg+xml,' . rawurlencode($icon['svg']) . '")';
        $processor = new \WP_HTML_Tag_Processor($content);
        while ($processor->next_tag(['tag_name' => 'UL'])) {
            $processor->add_class('rrze-elements-material-icon-list');
            $style = $processor->get_attribute('style');
            $style = is_string($style) ? rtrim($style, "; \t\n\r\0\x0B") . ';' : '';
            $processor->set_attribute(
                'style',
                $style . '--rrze-elements-list-icon:' . $mask . ';'
                    . '--rrze-elements-list-icon-color:' . $this->getColor($args['color'])
            );
        }

        $this->enqueueAssets();

        return $processor->get_updated_html();
    }

    /**
     * @param array<string, string>|string $atts
     * @return array<string, string>
     */
    private function sanitizeAtts(array|string $atts, string $tag): array
    {
        $args = shortcode_atts([
            'icon' => '',
            'style' => '',
            'color' => '',
            'alt' => '',
        ], is_array($atts) ? $atts : [], $tag);

        return array_map('sanitize_text_field', $args);
    }

    /**
     * No Font Awesome file lookup or guessed aliases: the mapping is the allowlist.
     *
     * @return array{name: string, svg: string}|null
     */
    private function getIcon(string $raw): ?array
    {
        $parts = preg_split('/\s+/', strtolower(trim($raw))) ?: [];
        if (count($parts) === 2 && in_array($parts[0], ['solid', 'regular', 'brands'], true)) {
            array_shift($parts);
        }
        if (count($parts) !== 1 || preg_match('/^[a-z0-9-]+$/D', $parts[0]) !== 1) {
            return null;
        }

        $basePath = dirname(__DIR__, 2) . '/src/_shared/icons/';
        if (self::$mapping === null) {
            self::$mapping = [];
            $mappingFile = $basePath . 'sprites/material-symbols/mapping/fontAwesome6ToMaterialSymbols.json';
            $json = is_readable($mappingFile) ? file_get_contents($mappingFile) : false;
            $mapping = $json !== false ? json_decode($json, true) : null;
            if (is_array($mapping)) {
                foreach ($mapping as $name => $symbol) {
                    if (is_string($symbol) && preg_match('/^[a-z0-9_]+$/D', $symbol) === 1) {
                        self::$mapping[$name] = $symbol;
                    }
                }
            }
        }

        $name = self::$mapping[$parts[0]] ?? '';
        $file = $basePath . 'symbols/' . $name . '.svg';
        if ($name === '' || !is_readable($file)) {
            return null;
        }

        $svg = file_get_contents($file);

        return $svg !== false ? ['name' => $name, 'svg' => $svg] : null;
    }

    /**
     * @param array<string, string> $args
     */
    private function getStyles(array $args): string
    {
        $styles = array_map('trim', explode(',', $args['style']));
        sort($styles);
        $scale = 1;
        $css = [];
        foreach ($styles as $style) {
            switch ($style) {
                case '2x':
                case '3x':
                case '4x':
                case '5x':
                    $scale = (int)$style;
                    break;
                case 'border':
                    $css[] = 'padding:.2em .25em .15em;border:solid .08em #eee;border-radius:.1em';
                    break;
                case 'pull-left':
                    $css[] = 'float:left;margin-right:.3em';
                    break;
                case 'pull-right':
                    $css[] = 'float:right;margin-left:.3em';
                    break;
            }
        }
        $css[] = 'font-size:' . $scale . 'em';
        $css[] = 'color:' . $this->getColor($args['color']);

        return implode(';', $css);
    }

    private function getColor(string $color): string
    {
        $color = strtolower(trim($color));
        if (in_array($color, ['fau', 'zuv', 'phil', 'nat', 'med', 'rw', 'tf'], true)) {
            $faculty = in_array($color, ['fau', 'zuv'], true) ? 'zentral' : $color;

            return 'var(--color-' . $faculty . '-basis, #04316A)';
        }
        if (preg_match('/^#(?:[a-f0-9]{3}|[a-f0-9]{6})$/D', $color) === 1) {
            return $color;
        }

        return 'currentColor';
    }

    private function notFound(): string
    {
        return '<span class="rrze-elements-icon-error">'
            . esc_html__('Icon not found.', 'rrze-elements-blocks') . '</span>';
    }
}
