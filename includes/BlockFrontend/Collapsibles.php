<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

class Collapsibles extends AbstractBlockRender
{

    /**
     * Renders an accordion, optionally as a Schema.org FAQPage.
     *
     * Direct PHP callers must also pass faqSchema to the individual Collapse
     * renderers. Gutenberg supplies that setting to children through context.
     *
     * @param array<string, mixed> $attributes Block settings; faqSchema defaults to false.
     * @param string $innerBlocks Already rendered accordion items.
     * @param \WP_Block|null $block Block instance, if rendered by WordPress.
     * @return string The complete accordion HTML.
     */
    public function render(array $attributes = [], string $innerBlocks = '', ?\WP_Block $block = null): string
    {

        if ($block && !empty(trim($block->inner_html))) {
            return $innerBlocks;
        }

        $expand_all_link = !empty($attributes['expandAllLink']);
        $expand_label = $attributes['expandLabel'] ?? '';

        $wrapper_class = $attributes['className'] ?? '';
        $accordion_class = $attributes['accordionClassName'] ?? '';
        $accordion_id = $attributes['accordionId'] ?? '';
        $accordion_id_attribute = $accordion_id !== ''
            ? ' id="' . esc_attr((string)$accordion_id) . '"'
            : '';

        $schema_attributes = ($attributes['faqSchema'] ?? false) === true
            ? ' itemscope itemtype="https://schema.org/FAQPage"'
            : '';
        $markup = '<div class="wp-block-rrze-elements-collapsibles ' . esc_attr(trim($wrapper_class)) . '"' . $schema_attributes . '>';

        $markup .= '<div class="' . esc_attr(trim('accordion ' . $accordion_class)) . '"' . $accordion_id_attribute . '>';

        if ($expand_all_link) {
            $markup .= '<div class="button-container-right">';
            $markup .= '<button class="expand-all standard-btn primary-btn xsmall-btn" data-status="closed">';
            $markup .= esc_html($expand_label);
            $markup .= '</button></div>';
        }

        $markup .= $innerBlocks;
        $markup .= '</div></div>';

        return $markup;
    }
}
