<?php
namespace RRZE\ElementsBlocks\BlockFrontend;

use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\SpriteGenerator;

class Fact extends AbstractBlockRender
{
  /**
   * @inheritDoc
   */
  public function render($attributes = [], $innerBlocks = '', ?\WP_Block $block = null): string
  {
    if ($block && !empty(trim($block->inner_html))) {
      return $innerBlocks;
    }

    $description     = isset($attributes['description'])     ? wp_kses_post($attributes['description']) : '';
    $materialSymbol = isset($attributes['materialSymbol']) ? 'symbols ' . sanitize_html_class($attributes['materialSymbol']) : '';
    $buttonText      = isset($attributes['buttonText'])      ? esc_html($attributes['buttonText'])      : __('Mehr', 'rrze-elements-blocks');
    $buttonUrl       = isset($attributes['buttonUrl'])       ? esc_url($attributes['buttonUrl'])        : '#';
    $iconMarkup = '';
    if (!empty($attributes['materialSymbol'])) {
      $iconMarkup = SpriteGenerator::svgUse(
        $materialSymbol
      );
    }

    return sprintf(
      '<li class="facts__item">
            <span class="facts__icon" aria-hidden="true">
                %1$s
            </span>

            <p class="facts__text">%2$s</p>

            <div class="wp-block-button is-style-tertiary"><a class="wp-block-button__link wp-element-button" href="%3$s">
                %4$s
            </a></div>
        </li>',
      $iconMarkup,
      nl2br($description),
      $buttonUrl,
      $buttonText
    );
  }
}
