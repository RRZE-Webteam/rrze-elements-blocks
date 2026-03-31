<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

class InfoCard
{
    public function render($attributes, $content)
    {
        $defaults = [
            'backgroundColor' => '#04316a',
            'title' => '',
            'subtitle' => '',
            'desktopImageUrl' => '',
            'tabletImageUrl' => '',
            'mobileImageUrl' => '',
            'imageObjectFit' => 'cover',
            'textShadowEnabled' => true,
            'alt' => '',
            'url' => '',
            'desktopTextColor' => '#fff',
            'tabletTextColor' => '',
            'mobileTextColor' => '',
            'desktopCustomTextColor' => '',
            'tabletCustomTextColor' => '',
            'mobileCustomTextColor' => '',
            'scientificText' => '',
            'desktopFocusPoint' => ['x' => 0.5, 'y' => 0.5],
            'tabletFocusPoint' => ['x' => 0.5, 'y' => 0.5],
            'mobileFocusPoint' => ['x' => 0.5, 'y' => 0.5],
        ];

        $attributes = wp_parse_args($attributes, $defaults);

        $title = isset($attributes['title']) ? wp_strip_all_tags($attributes['title']) : '';
        $subtitle = isset($attributes['subtitle']) ? wp_strip_all_tags($attributes['subtitle']) : '';
        $desktopImageUrl = $attributes['desktopImageUrl'];
        $tabletImageUrl = $attributes['tabletImageUrl'];
        $mobileImageUrl = $attributes['mobileImageUrl'];
        $alt = $attributes['alt'];
        $url = $attributes['url'];
        $backgroundColor = $attributes['backgroundColor'];
        $desktopTextColor = $attributes['desktopTextColor'];
        $tabletTextColor = $attributes['tabletTextColor'];
        $mobileTextColor = $attributes['mobileTextColor'];
        $desktopCustomTextColor = $attributes['desktopCustomTextColor'];
        $tabletCustomTextColor = $attributes['tabletCustomTextColor'];
        $mobileCustomTextColor = $attributes['mobileCustomTextColor'];
        $imageObjectFit = $attributes['imageObjectFit'] === 'contain' ? 'contain' : 'cover';
        $textShadowEnabled = isset($attributes['textShadowEnabled']) ? (bool) $attributes['textShadowEnabled'] : true;
        $scientificText = $attributes['scientificText'];
        $hasScientificText = '' !== trim(wp_strip_all_tags($scientificText));
        $modalId = uniqid('rrze-elements-modal-');

        $style = "--background-color: {$backgroundColor};";
        $style .= "--desktop-text-color: {$desktopTextColor};";
        $style .= "--tablet-text-color: " . ($tabletTextColor ?: $desktopTextColor) . ";";
        $style .= "--mobile-text-color: " . ($mobileTextColor ?: $tabletTextColor ?: $desktopTextColor) . ";";
        if ($desktopCustomTextColor) {
            $style .= "--desktop-custom-text-color: {$desktopCustomTextColor};";
        }
        if ($tabletCustomTextColor) {
            $style .= "--tablet-custom-text-color: {$tabletCustomTextColor};";
        }
        if ($mobileCustomTextColor) {
            $style .= "--mobile-custom-text-color: {$mobileCustomTextColor};";
        }
        $style .= "--image-object-fit: {$imageObjectFit};";

        $desktopFinalColor = $desktopCustomTextColor ?: $desktopTextColor;
        $tabletFinalColor = ($tabletCustomTextColor ?: $tabletTextColor) ?: $desktopFinalColor;
        $mobileFinalColor = ($mobileCustomTextColor ?: $mobileTextColor) ?: $tabletFinalColor;

        $hasBackgroundImage = !empty($desktopImageUrl) || !empty($tabletImageUrl) || !empty($mobileImageUrl);
        if (!$textShadowEnabled) {
            $style .= "--card-text-shadow: none;";
        } elseif ($hasBackgroundImage) {
            $shadowColor = $this->shouldUseLightShadow([$desktopFinalColor, $tabletFinalColor, $mobileFinalColor]) ? '#ddd' : '#222';
            $style .= "--card-text-shadow: 1px 1px 2px {$shadowColor};";
        } else {
            $style .= "--card-text-shadow: none;";
        }
        $style .= "--desktop-object-position: " . $this->focusPointToObjectPosition($attributes['desktopFocusPoint']) . ";";
        $style .= "--tablet-object-position: " . $this->focusPointToObjectPosition($attributes['tabletFocusPoint']) . ";";
        $style .= "--mobile-object-position: " . $this->focusPointToObjectPosition($attributes['mobileFocusPoint']) . ";";

        $hasInnerBlocks = trim($content) !== '';
        $isLinkCard = !empty($url);
        $showLinkIcon = $isLinkCard;
        $shouldShowActionIcon = $showLinkIcon || $hasInnerBlocks;

        ob_start();
        ?>
        <li class="rrze-elements-blocks__carousel-content-list-item" role="listitem" tabIndex="-1" style="<?php echo esc_attr($style); ?>">
            <div class="rrze-elements-blocks__carousel_feature-card-bg">
                <div class="rrze-elements-blocks__carousel_feature_card-content">
                    <h3 class="rrze-elements-blocks__carousel_feature_card_subtitle">
                        <?php echo esc_html($subtitle); ?>
                    </h3>
                    <p class="rrze-elements-blocks__carousel_feature_card_text"><?php echo esc_html($title); ?></p>
                    <div class="rrze-elements-blocks__carousel_feature_card_bg">
                        <figure class="rrze-elements-blocks__carousel_feature_card_bg_figure">
                            <picture class="rrze-elements-blocks__carousel_feature_card_bg_figure_picture">
                                <?php if ($mobileImageUrl) : ?>
                                    <source srcset="<?php echo esc_url($mobileImageUrl); ?>" media="(max-width: 734px)" />
                                <?php endif; ?>
                                <?php if ($tabletImageUrl) : ?>
                                    <source srcset="<?php echo esc_url($tabletImageUrl); ?>" media="(max-width: 1024px)" />
                                <?php endif; ?>
                                <?php if ($desktopImageUrl) : ?>
                                    <img src="<?php echo esc_url($desktopImageUrl); ?>" alt="<?php echo esc_attr($alt); ?>" />
                                <?php endif; ?>
                            </picture>
                        </figure>
                    </div>
                    <?php if ($shouldShowActionIcon) : ?>
                        <?php if ($showLinkIcon) : ?>
                            <a href="<?php echo esc_url($url); ?>" class="rrze-elements-blocks__carousel_feature_card_link" aria-label="<?php esc_attr_e('Open card link', 'rrze-elements-blocks'); ?>">
                                <div class="rrze-elements-blocks__carousel_feature_card_link_control_container">
                                    <span class="rrze-elements-blocks__carousel_feature_card_link_control_icon-container">
                                        <svg class="rrze-elements-blocks__carousel_feature_card_link_control_icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                                    </span>
                                </div>
                            </a>
                        <?php else : ?>
                            <a href="#" class="rrze-elements-blocks__carousel_feature_card_link" role="button" aria-haspopup="dialog" aria-controls="<?php echo esc_attr($modalId); ?>" data-modal-id="<?php echo esc_attr($modalId); ?>" aria-label="<?php esc_attr_e('Show more information', 'rrze-elements-blocks'); ?>">
                                <div class="rrze-elements-blocks__carousel_feature_card_link_control_container">
                                    <span class="rrze-elements-blocks__carousel_feature_card_link_control_icon-container">
                                        <svg class="rrze-elements-blocks__carousel_feature_card_link_control_icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z"/></svg>
                                    </span>
                                </div>
                            </a>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>
            <?php if ($hasScientificText) : ?>
                <div class="rrze-elements-blocks__carousel_feature_card_scientific-text">
                    <?php echo wp_kses_post($scientificText); ?>
                </div>
            <?php endif; ?>
            <?php if (!$showLinkIcon && $hasInnerBlocks) : ?>
                <dialog id="<?php echo esc_attr($modalId); ?>" class="rrze-elements-blocks-fullscreen-modal">
                    <div class="rrze-elements-blocks-modal-overlay" data-modal-overlay>
                        <div class="rrze-elements-blocks-modal-content" tabindex="-1">
                            <button class="rrze-elements-blocks-close-modal rrze-elements-blocks-close-modal--icon" aria-label="<?php esc_attr_e('Schließen', 'rrze-elements-blocks'); ?>">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                            </button>
                            <?php echo $content; ?>
                            <button class="rrze-elements-blocks-close-modal"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg> Schließen</button>
                        </div>
                    </div>
                </dialog>
            <?php endif; ?>
        </li>
        <?php
        return ob_get_clean();
    }

    private function focusPointToObjectPosition($focusPoint)
    {
        $x = 0.5;
        $y = 0.5;

        if (is_array($focusPoint)) {
            if (isset($focusPoint['x'])) {
                $x = (float) $focusPoint['x'];
            }
            if (isset($focusPoint['y'])) {
                $y = (float) $focusPoint['y'];
            }
        }

        $x = $this->formatPercentage($x);
        $y = $this->formatPercentage($y);

        return sprintf('%s %s', $x, $y);
    }

    private function shouldUseLightShadow(array $colors)
    {
        foreach ($colors as $color) {
            if ($this->isColorWhite($color)) {
                return true;
            }
        }
        return false;
    }

    private function isColorWhite($color)
    {
        if (empty($color)) {
            return false;
        }

        $normalized = preg_replace('/\s+/', '', strtolower(trim($color)));
        $whiteValues = ['#fff', '#ffffff', 'fff', 'ffffff', 'rgb(255,255,255)', 'rgba(255,255,255,1)', 'white'];

        return in_array($normalized, $whiteValues, true);
    }

    private function formatPercentage($value)
    {
        $value = max(0, min(1, (float) $value));
        $percentage = round($value * 100, 2);
        $percentage = rtrim(rtrim(sprintf('%.2f', $percentage), '0'), '.');

        return $percentage . '%';
    }
}
