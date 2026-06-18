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

            $renderedImages = $this->renderImages($imageItems);
            $initialKey = $this->getImageItemKey($initialItem);

            if (isset($renderedImages[$initialKey])) {
                $markup .= $renderedImages[$initialKey]['markup'];
            }

            foreach ($renderedImages as $renderedImage) {
                $markup .= $this->renderImageTemplate(
                    $renderedImage['item'],
                    $renderedImage['markup']
                );
            }
        }

        $markup .= '</div></div>';

        return $markup;
    }

    /**
     * @param array<int, array<string, mixed>> $blocks
     * @return array<int, array{id: int, url: string, alt: string, caption: ?string, loadOpen: bool}>
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
                    'caption' => array_key_exists('mediaAccordionImageCaption', $attributes)
                        ? trim(wp_kses_post((string)$attributes['mediaAccordionImageCaption']))
                        : null,
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
     * @param non-empty-list<array{id: int, url: string, alt: string, caption: ?string, loadOpen: bool}> $items
     * @return array{id: int, url: string, alt: string, caption: ?string, loadOpen: bool}
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
     * @param non-empty-list<array{id: int, url: string, alt: string, caption: ?string, loadOpen: bool}> $items
     * @return array<string, array{item: array{id: int, url: string, alt: string, caption: ?string, loadOpen: bool}, markup: string}>
     */
    private function renderImages(array $items): array
    {
        $renderedImages = [];

        foreach ($items as $item) {
            $key = $this->getImageItemKey($item);

            if (isset($renderedImages[$key])) {
                continue;
            }

            $renderedImages[$key] = [
                'item' => $item,
                'markup' => $this->renderImage($item),
            ];
        }

        return $renderedImages;
    }

    /**
     * @param array{id: int, url: string, alt: string, caption: ?string, loadOpen: bool} $item
     */
    private function renderImage(array $item): string
    {
        $blockAttributes = [
            'sizeSlug' => 'large',
            'linkDestination' => 'none',
            'className' => 'is-style-large has-overlay media-accordion__media',
        ];

        if ($item['id'] > 0) {
            $blockAttributes = ['id' => $item['id']] + $blockAttributes;
        }

        $encodedAttributes = wp_json_encode($blockAttributes);
        if (!is_string($encodedAttributes)) {
            $encodedAttributes = '{}';
        }

        $innerMarkup = $this->renderImageInnerMarkup($item);
        $blockMarkup = '<!-- wp:image ' . $encodedAttributes . ' -->'
            . $innerMarkup
            . '<!-- /wp:image -->';

        return function_exists('do_blocks') ? do_blocks($blockMarkup) : $innerMarkup;
    }

    /**
     * @param array{id: int, url: string, alt: string, caption: ?string, loadOpen: bool} $item
     */
    private function renderImageInnerMarkup(array $item): string
    {
        $imageUrl = $this->getImageUrl($item);
        $caption = $this->getImageCaption($item);
        $imageClass = trim(
            'media-accordion__image' . ($item['id'] > 0 ? ' wp-image-' . $item['id'] : '')
        );
        $captionMarkup = $caption !== ''
            ? '<figcaption class="wp-element-caption">' . wp_kses_post($caption) . '</figcaption>'
            : '';

        return sprintf(
            '<figure class="wp-block-image size-large is-style-large has-overlay media-accordion__media" data-media-accordion-media data-media-accordion-image-id="%1$d" data-media-accordion-image-url="%2$s" data-media-accordion-image-alt="%3$s" data-media-accordion-image-caption="%4$s">' .
            '<img src="%5$s" alt="%3$s" class="%6$s" data-media-accordion-image loading="lazy" decoding="async" />%7$s' .
            '</figure>',
            $item['id'],
            esc_url($item['url']),
            esc_attr($item['alt']),
            esc_attr($caption),
            esc_url($imageUrl),
            esc_attr($imageClass),
            $captionMarkup
        );
    }

    /**
     * @param array{id: int, url: string, alt: string, caption: ?string, loadOpen: bool} $item
     */
    private function renderImageTemplate(array $item, string $imageMarkup): string
    {
        return sprintf(
            '<template data-media-accordion-template data-media-accordion-image-id="%1$d" data-media-accordion-image-url="%2$s" data-media-accordion-image-alt="%3$s" data-media-accordion-image-caption="%4$s">%5$s</template>',
            $item['id'],
            esc_url($item['url']),
            esc_attr($item['alt']),
            esc_attr($this->getImageCaption($item)),
            $imageMarkup
        );
    }

    /**
     * @param array{id: int, url: string, alt: string, caption: ?string, loadOpen: bool} $item
     */
    private function getImageItemKey(array $item): string
    {
        return sha1(
            $item['id']
            . "\n"
            . $item['url']
            . "\n"
            . $item['alt']
            . "\n"
            . $this->getImageCaption($item)
        );
    }

    /**
     * @param array{id: int, url: string, alt: string, caption: ?string, loadOpen: bool} $item
     */
    private function getImageUrl(array $item): string
    {
        if ($item['id'] <= 0 || !function_exists('wp_get_attachment_image_url')) {
            return $item['url'];
        }

        $imageUrl = wp_get_attachment_image_url($item['id'], 'large');

        return is_string($imageUrl) && $imageUrl !== ''
            ? esc_url_raw($imageUrl)
            : $item['url'];
    }

    /**
     * @param array{id: int, url: string, alt: string, caption: ?string, loadOpen: bool} $item
     */
    private function getImageCaption(array $item): string
    {
        if ($item['caption'] !== null) {
            return $item['caption'];
        }

        if ($item['id'] <= 0 || !function_exists('wp_get_attachment_caption')) {
            return '';
        }

        $caption = wp_get_attachment_caption($item['id']);

        return is_string($caption) ? trim(wp_kses_post($caption)) : '';
    }
}
