<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\ImageCopyrightHandler;
use RRZE\ElementsBlocks\SpriteGenerator;

class CallToAction extends AbstractBlockRender
{

    /**
     * @param array<string, mixed> $attributes
     * @param string $innerBlocks
     * @inheritDoc
     */
    public function render(array $attributes, string $innerBlocks, ?\WP_Block $block = null): string
    {
        if ($block && !empty(trim($block->inner_html))) {
            return $innerBlocks;
        }

        $wrapper_class = isset($attributes['className']) ? sanitize_text_field($attributes['className']) : '';
        $id = isset($attributes['id']) ? (int)$attributes['id'] : 0;
        $alt = isset($attributes['alt']) ? sanitize_text_field($attributes['alt']) : '';
        $url = isset($attributes['url']) ? esc_url_raw($attributes['url']) : '';
        $title = isset($attributes['title']) ? sanitize_text_field($attributes['title']) : '';
        $subtitle = isset($attributes['subtitle']) ? sanitize_text_field($attributes['subtitle']) : '';
        $button_text = isset($attributes['buttonText']) ? sanitize_text_field($attributes['buttonText']) : '';
        $button_url = isset($attributes['buttonUrl']) ? esc_url_raw($attributes['buttonUrl']) : '';
        $aria_label = isset($attributes['ariaLabel']) ? sanitize_text_field($attributes['ariaLabel']) : '';
        $aria_label_attr = $aria_label !== '' ? ' aria-label="' . esc_attr($aria_label) . '"' : '';
        $background = isset($attributes['background']) ? sanitize_text_field($attributes['background']) : '';
        $is_search = !empty($attributes['isSearch']);
        // Existing CTA blocks predate the icon attribute and keep their arrow. An explicit empty
        // icon from the legacy adapter means that the old shortcode rendered no icon.
        $icon_value = array_key_exists('icon', $attributes)
            ? sanitize_text_field((string)$attributes['icon'])
            : 'solid arrow-right';
        $icon_markup = $icon_value !== ''
            ? SpriteGenerator::svgUse($icon_value, 'rrze-elements-cta-icon')
            : '';

        $url_class = $url ? 'has-image' : 'no-image';

        $href = $this->normalizeUrl($button_url);
        $opens_in_new_tab = !empty($attributes['buttonOpensInNewTab'])
            || ($attributes['target'] ?? '') === '_blank';
        $target_attributes = $opens_in_new_tab
            ? ' target="_blank" rel="noopener noreferrer"'
            : '';

        if ($id) {
            ImageCopyrightHandler::process($id);
        }

        $html = '<div class="' . esc_attr(trim('wp-block-rrze-elements-cta ' . $wrapper_class)) . '">';

        $html .= '<div class="rrze-elements-cta ' . esc_attr(trim($url_class . ' ' . $background)) . '">';
        $html .= '<div class="cta-content">';
        if ($title !== '') {
            $html .= '<span class="cta-title">' . esc_html($title) . '</span>';
        }
        if ($subtitle !== '') {
            $html .= '<span class="cta-subtitle">' . esc_html($subtitle) . '</span>';
        }
        $html .= '</div>';

        if ($url !== '') {
            $img_class = $id ? 'wp-image-' . $id : '';
            $html .= '<div class="cta-image"><img src="' . esc_url($url) . '" class="' . esc_attr($img_class) . '" alt="' . esc_attr($alt) . '" decoding="async" /></div>';
        }

        if ($is_search) {
            $html .= $this->renderSearch($attributes, $href, $icon_markup);
        } else {
            $html .= '<div class="cta-button-container">';
            $html .= '<a href="' . esc_url($href) . '" class="btn cta-button"' . $aria_label_attr . $target_attributes . '>' . esc_html($button_text) . $icon_markup . '</a>';
            $html .= '</div>';
        }

        $html .= '</div></div>';

        return $html;
    }

    /**
     * @param array<string, mixed> $attributes
     */
    private function renderSearch(array $attributes, string $action, string $icon_markup): string
    {
        if ($action === '') {
            $action = home_url('/');
        }
        $action = trailingslashit($action);

        $search_parameter = isset($attributes['searchParameter'])
            ? sanitize_key($attributes['searchParameter'])
            : 's';
        if ($search_parameter === '') {
            $search_parameter = 's';
        }

        $placeholder = isset($attributes['placeholder'])
            ? sanitize_text_field($attributes['placeholder'])
            : __('Search for...', 'rrze-elements-blocks');
        $additional_link = isset($attributes['additionalLink'])
            ? esc_url_raw($attributes['additionalLink'])
            : '';
        $additional_link_text = isset($attributes['additionalLinkText'])
            ? sanitize_text_field($attributes['additionalLinkText'])
            : '';
        if ($additional_link_text === '') {
            $additional_link_text = $additional_link;
        }

        $input_id = wp_unique_id('cta-search-');
        $search_label = sprintf(
            /* translators: %s: URL of the site being searched. */
            __('Search on %s', 'rrze-elements-blocks'),
            $action
        );
        $input_label = sprintf(
            /* translators: %s: URL of the site being searched. */
            __('Please enter the search term for searching on %s', 'rrze-elements-blocks'),
            $action
        );

        $html = '<div class="cta-search-container">'
            . '<form itemprop="potentialAction" itemscope itemtype="https://schema.org/SearchAction" role="search" aria-label="' . esc_attr($search_label) . '" method="get" class="cta-search searchform" action="' . esc_url($action) . '">'
            . '<label for="' . esc_attr($input_id) . '">' . esc_html($input_label) . ':</label>'
            . '<meta itemprop="target" content="' . esc_attr($action . '?' . $search_parameter . '={' . $search_parameter . '}') . '">'
            . '<input itemprop="query-input" id="' . esc_attr($input_id) . '" type="text" value="" name="' . esc_attr($search_parameter) . '" placeholder="' . esc_attr($placeholder) . '" required>'
            . '<button type="submit" enterkeyhint="search">' . $icon_markup
            . '<span class="sr-only">' . esc_html__('Find', 'rrze-elements-blocks') . '</span></button>'
            . '</form>';

        if ($additional_link !== '') {
            $html .= '<div class="extended-search-link"><a href="' . esc_url($additional_link) . '" class="standard-btn primary-btn xsmall-btn">'
                . esc_html($additional_link_text) . '</a></div>';
        }

        return $html . '</div>';
    }

    private function normalizeUrl(string $url): string
    {
        if (stripos($url, 'www.') === 0) {
            return 'https://' . $url;
        }

        if (stripos($url, 'http://') === 0) {
            return (string)preg_replace('/^http:\/\//i', 'https://', $url);
        }

        return $url;
    }
}
