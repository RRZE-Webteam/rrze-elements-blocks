<?php
declare(strict_types=1);

namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\SpriteGenerator;

class Collapse extends AbstractBlockRender
{

  /**
   * Renders an accordion item and optional Question/Answer microdata.
   *
   * WordPress blocks inherit FAQ mode from their nearest Collapsibles parent.
   * Direct PHP callers can supply faqSchema explicitly for each item instead.
   *
   * @param array<string, mixed> $attributes Item settings and optional PHP-only faqSchema flag.
   * @param string $innerBlocks Already rendered answer HTML, never rendered a second time.
   * @param \WP_Block|null $block Block instance carrying inherited FAQ context.
   * @return string The complete accordion item HTML.
   */
  public function render(array $attributes, string $innerBlocks, ?\WP_Block $block = null): string
  {
    if ($block && !empty(trim($block->inner_html))) {
      return $innerBlocks;
    }

    $color = isset($attributes['color']) ? sanitize_html_class($attributes['color']) : '';
    $title = isset($attributes['title'])
      ? wp_kses((string)$attributes['title'], ['br' => []])
      : '';
    $faq_schema = ($block !== null
      ? ($block->context['rrze-elements/faq-schema'] ?? false)
      : ($attributes['faqSchema'] ?? false)) === true;
    $faq_schema = $faq_schema && $this->hasText($title) && $this->hasText($innerBlocks);
    $suffix = isset($attributes['suffix']) ? sanitize_text_field((string)$attributes['suffix']) : '';
    $jump_name = isset($attributes['jumpName']) ? (string)$attributes['jumpName'] : '';
    $load_open = !empty($attributes['loadOpen']);
    $hstart = isset($attributes['hstart']) ? (int)$attributes['hstart'] : 1;
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

    $wrapper_class = isset($attributes['className']) ? $attributes['className'] : '';

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

    $heading_level = max(1, min(6, $hstart));
    $body_state_class = array_key_exists('bodyStateClass', $attributes)
      ? sanitize_html_class((string)$attributes['bodyStateClass'])
      : ($load_open ? 'open' : '');
    $active_on_page_load = array_key_exists('activeOnLoad', $attributes)
      ? (!empty($attributes['activeOnLoad']) ? 'active' : '')
      : ($load_open ? 'active' : '');
    $button_classes = trim('accordion-toggle ' . $active_on_page_load);

    $button_id = isset($attributes['buttonId']) ? (string)$attributes['buttonId'] : $jump_name;
    $region_id = isset($attributes['panelId']) ? (string)$attributes['panelId'] : $jump_name . '-section';
    $target_id = isset($attributes['targetId']) ? (string)$attributes['targetId'] : $jump_name;
    $data_name = array_key_exists('dataName', $attributes)
      ? (string)$attributes['dataName']
      : $jump_name;
    $data_name_attribute = $data_name !== '' ? ' data-name="' . esc_attr($data_name) . '"' : '';

    $markup = '<div class="wp-block-rrze-elements-collapse ' . esc_attr(trim($wrapper_class)) . '">';
    $markup .= sprintf(
      '<div class="accordion-group %1$s"%2$s>',
      esc_attr($color),
      $faq_schema ? ' itemscope itemprop="mainEntity" itemtype="https://schema.org/Question"' : ''
    );

    // Heading with toggle button
    $markup .= sprintf('<h%d class="accordion-heading">', $heading_level);

    $markup .= sprintf(
      '<button class="%1$s" data-toggle="collapse"%2$s data-href="#%3$s" type="button" aria-expanded="%4$s" aria-controls="%5$s" id="%6$s" data-media-accordion-image-id="%7$d" data-media-accordion-image-url="%8$s" data-media-accordion-image-alt="%9$s" data-media-accordion-image-caption="%10$s">',
      esc_attr($button_classes),
      $data_name_attribute,
      esc_attr($target_id),
      $load_open ? 'true' : 'false',
      esc_attr($region_id),
      esc_attr($button_id),
      $media_image_id,
      esc_url($media_image_url),
      esc_attr($media_image_alt),
      esc_attr($media_image_caption)
    );

    if ($iconMarkup) {
      $markup .= $iconMarkup;
    }

    $markup .= $faq_schema ? '<span itemprop="name">' . $title . '</span>' : ($title !== '' ? $title : '…');
    if ($suffix !== '') {
      $markup .= '<span class="accordion-suffix">' . esc_html($suffix) . '</span>';
    }
    $markup .= '</button>';
    $markup .= '</h' . $heading_level . '>';

    $markup .= sprintf(
      '<div id="%1$s" class="%2$s" aria-labelledby="%3$s" role="region"%4$s%5$s>',
      esc_attr($region_id),
      esc_attr(trim('accordion-body ' . $body_state_class)),
      esc_attr($button_id),
      $data_name !== '' ? ' name="' . esc_attr($data_name) . '"' : '',
      $faq_schema ? ' itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer"' : ''
    );

    $markup .= '<div class="accordion-inner clearfix"' . ($faq_schema ? ' itemprop="text"' : '') . '>';
    $markup .= $innerBlocks;
    $markup .= '</div></div></div></div>';

    return $markup;
  }

  /**
   * Checks for textual content after removing tags and decoding whitespace entities.
   *
   * @param string $html Rendered title or answer HTML.
   * @return bool Whether the content contains more than whitespace or empty markup.
   */
  private function hasText(string $html): bool
  {
    $text = html_entity_decode(wp_strip_all_tags($html), ENT_QUOTES | ENT_HTML5, 'UTF-8');

    return preg_match('/[^\s\p{Z}\x{200B}\x{FEFF}]/u', $text) === 1;
  }

  /**
   * Retrieves the sanitized caption for an optional media accordion image.
   *
   * @param int $imageId Attachment ID.
   * @return string Caption HTML, or an empty string when unavailable.
   */
  private function getMediaImageCaption(int $imageId): string
  {
    if ($imageId <= 0 || !function_exists('wp_get_attachment_caption')) {
      return '';
    }

    $caption = wp_get_attachment_caption($imageId);

    return is_string($caption) ? trim(wp_kses_post($caption)) : '';
  }
}
