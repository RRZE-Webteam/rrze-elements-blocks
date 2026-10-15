<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

use RRZE\ElementsBlocks\BlockFrontend\Alert as AlertRender;
use RRZE\ElementsBlocks\BlockFrontend\CallToAction as CallToActionRender;
use RRZE\ElementsBlocks\FrontendAssets;

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
        wp_enqueue_style(FrontendAssets::STYLE);
    }

    /**
     * @param array<string, string>|string $atts WordPress may pass an empty string.
     */
    public function shortcodeCTA(array|string $atts = [], ?string $content = '', string $tag = ''): string
    {
        $this->enqueueAssets();
        $args = shortcode_atts([
            'title' => '',
            'subtitle' => '',
            'button' => '',
            'url' => '',
            'icon' => '',
            'image' => '',
            'search' => '',
            'style' => '',
            'placeholder' => __('Search for...', 'rrze-elements-blocks'),
            'additional_link' => '',
            'additional_link_text' => '',
            'color' => 'fau',
        ], is_array($atts) ? $atts : [], $tag);

        $searchParameter = $this->getSearchParameter($args['search']);
        $isSearch = $searchParameter !== '';
        $buttonUrl = esc_url_raw($args['url']);
        if (!$isSearch && $buttonUrl === '') {
            return $this->renderMissingUrlNotice();
        }
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

        $color = strtolower(trim($args['color']));
        $colors = ['fau', 'fau2', 'phil', 'phil2', 'med', 'med2', 'nat', 'nat2', 'rw', 'rw2', 'tf', 'tf2'];
        $innerClasses[] = 'color-' . (in_array($color, $colors, true) ? $color : 'fau');

        $additionalLink = esc_url_raw($args['additional_link']);
        if ($additionalLink !== '') {
            $innerClasses[] = 'has-additional-link';
        }

        $icon = trim($args['icon']);
        if ($isSearch && $icon === '') {
            $icon = 'solid magnifying-glass';
        } elseif (!$isSearch && $icon === '' && trim($args['button']) !== '') {
            // The native CTA design treats the arrow as part of the button component.
            $icon = 'solid arrow-right';
        }
        $materialSymbol = (new Icon())->getMaterialSymbol($icon);

        $attributes = [
            'className' => 'rrze-elements-legacy-cta',
            'title' => sanitize_text_field($args['title']),
            'subtitle' => sanitize_text_field($args['subtitle']),
            'buttonText' => sanitize_text_field($args['button']),
            'buttonUrl' => $buttonUrl,
            'background' => implode(' ', $innerClasses),
            'isSearch' => $isSearch,
            'icon' => $materialSymbol !== '' ? 'symbols ' . $materialSymbol : '',
            'showButton' => trim($args['button']) !== '',
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

        return (new CallToActionRender())->render($attributes, '');
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

        return sanitize_text_field($search);
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

        return (new AlertRender())->render(['style' => 'danger'], '<p>' . $message . '</p>');
    }
}
