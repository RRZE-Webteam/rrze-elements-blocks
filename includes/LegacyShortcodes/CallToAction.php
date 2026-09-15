<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

defined('ABSPATH') || exit;

/**
 * Adapts the legacy CTA shortcode to the dynamic Call to action block.
 */
class CallToAction implements ShortcodeAdapter
{
    /**
     * @return array<string, callable>
     */
    public function getShortcodes(): array
    {
        return [
            'CTA' => [$this, 'shortcodeCTA'],
        ];
    }

    public function enqueueAssets(): void
    {
        // The shared frontend stylesheet is enqueued globally for supported themes.
    }

    /**
     * @param array<string, string> $atts
     */
    public function shortcodeCTA(array $atts = [], ?string $content = '', string $tag = ''): string
    {
        if (trim((string)($atts['search'] ?? '')) === '' && trim((string)($atts['url'] ?? '')) === '') {
            return $this->renderMissingUrlNotice();
        }

        $args = shortcode_atts([
            'title' => '',
            'subtitle' => '',
            'button' => '',
            'url' => '',
            'icon' => '',
            'background' => '',
            'image' => '',
            'search' => '',
            'style' => '',
            'placeholder' => __('Search for...', 'rrze-elements-blocks'),
            'additional_link' => '',
            'additional_link_text' => '',
        ], $atts, $tag);

        $searchParameter = $this->getSearchParameter($args['search']);
        $isSearch = $searchParameter !== '';
        $buttonUrl = esc_url_raw($args['url']);
        $imageUrl = esc_url_raw($args['image']);
        $imageId = $this->resolveImageId($imageUrl);

        if ($imageId > 0) {
            $largeImageUrl = wp_get_attachment_image_url($imageId, 'large');
            if (is_string($largeImageUrl) && $largeImageUrl !== '') {
                $imageUrl = $largeImageUrl;
            }
        }

        $innerClasses = [];
        if (strtolower(trim($args['style'])) === 'small') {
            $innerClasses[] = 'style-small';
        }

        $background = strtolower(trim($args['background']));
        if (in_array($background, ['1', 'rrze'], true)) {
            $innerClasses[] = 'bg-' . $background;
        }

        $additionalLink = esc_url_raw($args['additional_link']);
        if ($additionalLink !== '') {
            $innerClasses[] = 'has-additional-link';
        }

        $icon = $this->normalizeIcon($args['icon']);
        if ($isSearch && $icon === '') {
            $icon = 'solid magnifying-glass';
        } elseif (!$isSearch && $icon === '' && trim($args['button']) !== '') {
            // The native CTA design treats the arrow as part of the button component.
            $icon = 'solid arrow-right';
        }

        $attributes = [
            'title' => sanitize_text_field($args['title']),
            'subtitle' => sanitize_text_field($args['subtitle']),
            'buttonText' => sanitize_text_field($args['button']),
            'buttonUrl' => $buttonUrl,
            'background' => implode(' ', $innerClasses),
            'isSearch' => $isSearch,
            'icon' => $icon,
        ];

        if ($imageUrl !== '') {
            $attributes['url'] = $imageUrl;
            if ($imageId > 0) {
                $attributes['id'] = $imageId;
                $attributes['alt'] = sanitize_text_field(
                    (string)get_post_meta($imageId, '_wp_attachment_image_alt', true)
                );
            }
        }

        if ($isSearch) {
            $attributes['searchParameter'] = $searchParameter;
            $attributes['placeholder'] = sanitize_text_field($args['placeholder']);
            $attributes['additionalLink'] = $additionalLink;
            $attributes['additionalLinkText'] = $args['additional_link_text'] !== ''
                ? sanitize_text_field($args['additional_link_text'])
                : $additionalLink;
        }

        return do_blocks(
            '<!-- wp:rrze-elements/cta ' . wp_json_encode($attributes) . ' /-->'
        );
    }

    private function getSearchParameter(string $search): string
    {
        $search = trim($search);
        if ($search === '') {
            return '';
        }

        if (in_array(strtolower($search), ['true', '1', 'yes', 'ja', 'on'], true)) {
            return 's';
        }

        return sanitize_key($search);
    }

    private function normalizeIcon(string $icon): string
    {
        $icon = sanitize_text_field($icon);
        if ($icon === '') {
            return '';
        }

        $icon = trim(str_replace('\\', '/', $icon));
        if (str_contains($icon, '/') || preg_match('/^(solid|regular|brands|symbols)\s+/', $icon) === 1) {
            return $icon;
        }

        return 'solid ' . $icon;
    }

    private function resolveImageId(string $imageUrl): int
    {
        if ($imageUrl === '') {
            return 0;
        }

        $imageId = attachment_url_to_postid($imageUrl);
        if ($imageId > 0) {
            return $imageId;
        }

        // attachment_url_to_postid() usually expects the original upload URL, while legacy
        // content frequently contains a generated WordPress size such as "-300x214.jpg".
        $originalUrl = (string)preg_replace('/-\d+x\d+(?=\.[a-z0-9]+(?:\?.*)?$)/i', '', $imageUrl);
        if ($originalUrl === $imageUrl) {
            return 0;
        }

        return attachment_url_to_postid($originalUrl);
    }

    private function renderMissingUrlNotice(): string
    {
        $message = sprintf(
            /* translators: 1: opening strong tag, 2: closing strong tag, 3: opening code tag, 4: closing code tag. */
            __('%1$sURL missing.%2$s Please provide the %3$surl%4$s attribute in your CTA shortcode.', 'rrze-elements-blocks'),
            '<strong>',
            '</strong>',
            '<code>',
            '</code>'
        );

        $blockMarkup = '<!-- wp:rrze-elements/alert {"style":"danger"} -->'
            . '<!-- wp:paragraph --><p>' . $message . '</p><!-- /wp:paragraph -->'
            . '<!-- /wp:rrze-elements/alert -->';

        return do_blocks($blockMarkup);
    }
}
