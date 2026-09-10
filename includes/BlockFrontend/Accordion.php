<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\SpriteGenerator;

class Accordion extends AbstractBlockRender
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

      // Attributes
      $same_block_count     = isset( $attributes['sameBlockCount'] )     ? (int) $attributes['sameBlockCount']     : 0;
      $total_children_count = isset( $attributes['totalChildrenCount'] ) ? (int) $attributes['totalChildrenCount'] : 0;
      $ancestor_count       = isset( $attributes['ancestorCount'] )      ? (int) $attributes['ancestorCount']      : 0;

      $title     = isset( $attributes['title'] )
        ? wp_kses((string)$attributes['title'], ['br' => []])
        : '';
      $plain_title = sanitize_text_field($title);
      $suffix = isset($attributes['suffix']) ? sanitize_text_field((string)$attributes['suffix']) : '';
      $color     = isset( $attributes['color'] ) ? sanitize_html_class( $attributes['color'] ) : '';
      $load_open = !empty($attributes['loadOpen']);

      $hstart   = isset( $attributes['hstart'] ) ? (int) $attributes['hstart'] : 1;
      $jumpname = isset( $attributes['jumpName'] ) ? sanitize_text_field($attributes['jumpName']) : '';
      $media_image_id = isset($attributes['mediaAccordionImageId'])
        ? absint($attributes['mediaAccordionImageId'])
        : 0;
      $media_image_url = isset($attributes['mediaAccordionImageUrl'])
        ? esc_url_raw((string)$attributes['mediaAccordionImageUrl'])
        : '';
      $media_image_alt = isset($attributes['mediaAccordionImageAlt'])
        ? sanitize_text_field((string)$attributes['mediaAccordionImageAlt'])
        : '';
      $media_image_caption = array_key_exists('mediaAccordionImageCaption', $attributes)
        ? trim(wp_kses_post((string)$attributes['mediaAccordionImageCaption']))
        : $this->getMediaImageCaption($media_image_id);

      $material_symbol = isset($attributes['materialSymbol']) ? 'symbols ' . sanitize_html_class($attributes['materialSymbol']) : '';
      $iconMarkup = '';
      if (empty($attributes['materialSymbol']) && !empty($attributes['icon'])) {
        $iconMarkup = SpriteGenerator::svgUse(
          $attributes['icon'],          // z. B. "solid cow"
          'fa fa-' . str_replace(' ', ' fa-', $attributes['icon'])
        );
      }

      if (!empty($attributes['materialSymbol'])) {
        $iconMarkup = SpriteGenerator::svgUse(
          $material_symbol
        );
      }

      // Jumpname ID
      if (!empty($attributes['outputId'])) {
        $output_id = preg_replace('/[^a-zA-Z0-9_-]/', '', (string)$attributes['outputId']) ?? '';
      } elseif ( '' === $jumpname ) {
        $output_id = 'panel_' . ( $same_block_count + $total_children_count + $ancestor_count );
      } else {
        $output_id = sanitize_title_with_dashes( $jumpname );
      }

      // Evaluate Heading Level
      $heading_level = max( 1, min( 6, $hstart + 1 ) );

      // BlockEditor Class
      $wrapper_class = isset( $attributes['className'] ) ? $attributes['className'] : '';
      $body_state_class = array_key_exists('bodyStateClass', $attributes)
        ? sanitize_html_class((string)$attributes['bodyStateClass'])
        : ($load_open ? 'open' : '');
      $active_on_page_load = array_key_exists('activeOnLoad', $attributes)
        ? (!empty($attributes['activeOnLoad']) ? 'active' : '')
        : ($load_open ? 'active' : '');
      $button_classes = trim('accordion-toggle ' . $active_on_page_load);
      $body_classes = trim('accordion-body ' . $body_state_class);
      $target_id = isset($attributes['targetId'])
        ? (string)$attributes['targetId']
        : $output_id;
      $data_name = array_key_exists('dataName', $attributes)
        ? (string)$attributes['dataName']
        : $output_id;
      $data_name_attribute = $data_name !== ''
        ? ' data-name="' . esc_attr($data_name) . '"'
        : '';
      $button_id = isset($attributes['buttonId']) && $attributes['buttonId'] !== ''
        ? (string)$attributes['buttonId']
        : $output_id . '-button';
      $panel_name = isset($attributes['panelName']) ? (string)$attributes['panelName'] : '';
      $panel_name_attribute = $panel_name !== ''
        ? ' name="' . esc_attr($panel_name) . '"'
        : '';

      // HTML Markup
      $markup  = '<div class="' . esc_attr( trim( $wrapper_class ) ) . '">';
      $markup .= sprintf(
        '<div class="accordion-group %1$s">',        // 1 = $color
        esc_attr( $color )
      );

      // Heading with Button
      $markup .= sprintf(
        '<h%1$d class="accordion-heading">',         // 1 = $heading_level
        $heading_level
      );

      $markup .= '<span class="read-mode-only">' . esc_html( $plain_title ) . '</span>';

      $markup .= sprintf(
        '<button class="%1$s" data-toggle="collapse"%2$s data-href="#%3$s" type="button" aria-expanded="%4$s" aria-controls="%5$s" id="%6$s" data-media-accordion-image-id="%7$d" data-media-accordion-image-url="%8$s" data-media-accordion-image-alt="%9$s" data-media-accordion-image-caption="%10$s">',
        esc_attr($button_classes),
        $data_name_attribute,
        esc_attr($target_id),
        $load_open ? 'true' : 'false',
        esc_attr($output_id),
        esc_attr($button_id),
        $media_image_id,
        esc_url($media_image_url),
        esc_attr($media_image_alt),
        esc_attr($media_image_caption)
      );

      if ($iconMarkup) {
        $markup .= $iconMarkup;
      }

      $markup .= $title !== '' ? $title : '…';
      if ($suffix !== '') {
        $markup .= '<span class="accordion-suffix">' . esc_html($suffix) . '</span>';
      }
      $markup .= '</button>';
      $markup .= sprintf( '</h%1$d>', $heading_level );

      // Panel-Body
      $markup .= sprintf(
        '<div id="%1$s" class="%2$s" aria-labelledby="%3$s" role="region"%4$s>',
        esc_attr( $output_id ),
        esc_attr($body_classes),
        esc_attr($button_id),
        $panel_name_attribute
      );

      $markup .= '<div class="accordion-inner clearfix">';
      $markup .= $innerBlocks;
      $markup .= '</div></div></div></div>';

      return $markup;
    }

    private function getMediaImageCaption(int $imageId): string
    {
      if ($imageId <= 0 || !function_exists('wp_get_attachment_caption')) {
        return '';
      }

      $caption = wp_get_attachment_caption($imageId);

      return is_string($caption) ? trim(wp_kses_post($caption)) : '';
    }
}
