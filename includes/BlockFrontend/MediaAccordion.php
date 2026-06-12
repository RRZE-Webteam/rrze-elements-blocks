<?php

declare(strict_types=1);

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\ImageCopyrightHandler;

class MediaAccordion extends AbstractBlockRender
{
    /**
     * @param array<string, mixed> $attributes
     */
    public function render(array $attributes, string $innerBlocks, ?\WP_Block $block = null): string
    {
        $items = $block ? $this->collectItems($block->parsed_block['innerBlocks'] ?? []) : [];
        $imageItems = array_values(array_filter(
            $items,
            static fn(array $item): bool => $item['url'] !== ''
        ));
        $wrapperClass = trim((string)($attributes['className'] ?? ''));
        $classes = trim('wp-block-rrze-elements-media-accordion ' . $wrapperClass);
        $layoutClass = $imageItems === [] ? 'media-accordion has-no-images' : 'media-accordion has-images';

        $markup = '<div class="' . esc_attr($classes) . '">';
        $markup .= '<div class="' . esc_attr($layoutClass) . '">';
        $markup .= '<div class="media-accordion__accordions">' . $innerBlocks . '</div>';

        if ($imageItems !== []) {
            $initialItem = $this->getInitialItem($imageItems);
            $processedImageIds = [];

            foreach ($imageItems as $item) {
                if (
                    $item['id'] > 0
                    && !in_array($item['id'], $processedImageIds, true)
                    && function_exists('get_post_type')
                ) {
                    ImageCopyrightHandler::process($item['id']);
                    $processedImageIds[] = $item['id'];
                }
            }

            $markup .= $this->renderImage($initialItem);
        }

        $markup .= '</div></div>';

        return $markup;
    }

    /**
     * @param array<int, array<string, mixed>> $blocks
     * @return array<int, array{id: int, url: string, alt: string, loadOpen: bool}>
     */
    private function collectItems(array $blocks): array
    {
        $items = [];

        foreach ($blocks as $block) {
            $blockName = isset($block['blockName']) ? (string)$block['blockName'] : '';
            $attributes = isset($block['attrs']) && is_array($block['attrs']) ? $block['attrs'] : [];

            if (in_array($blockName, ['rrze-elements/accordion', 'rrze-elements/collapse'], true)) {
                $items[] = [
                    'id' => isset($attributes['mediaAccordionImageId'])
                        ? absint($attributes['mediaAccordionImageId'])
                        : 0,
                    'url' => isset($attributes['mediaAccordionImageUrl'])
                        ? esc_url_raw((string)$attributes['mediaAccordionImageUrl'])
                        : '',
                    'alt' => isset($attributes['mediaAccordionImageAlt'])
                        ? sanitize_text_field((string)$attributes['mediaAccordionImageAlt'])
                        : '',
                    'loadOpen' => !empty($attributes['loadOpen']),
                ];
            }

            $innerBlocks = isset($block['innerBlocks']) && is_array($block['innerBlocks'])
                ? $block['innerBlocks']
                : [];
            $items = array_merge($items, $this->collectItems($innerBlocks));
        }

        return $items;
    }

    /**
     * @param non-empty-list<array{id: int, url: string, alt: string, loadOpen: bool}> $items
     * @return array{id: int, url: string, alt: string, loadOpen: bool}
     */
    private function getInitialItem(array $items): array
    {
        foreach ($items as $item) {
            if ($item['loadOpen']) {
                return $item;
            }
        }

        return $items[0];
    }

    /**
     * @param array{id: int, url: string, alt: string, loadOpen: bool} $item
     */
    private function renderImage(array $item): string
    {
        $imageClass = trim(
            'media-accordion__image' . ($item['id'] > 0 ? ' wp-image-' . $item['id'] : '')
        );

        return sprintf(
            '<figure class="media-accordion__media" data-media-accordion-media>' .
            '<img class="%1$s" data-media-accordion-image src="%2$s" alt="%3$s" loading="lazy" decoding="async" />' .
            '</figure>',
            esc_attr($imageClass),
            esc_url($item['url']),
            esc_attr($item['alt'])
        );
    }
}
