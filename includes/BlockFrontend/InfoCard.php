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
            'alt' => '',
            'url' => '',
            'desktopTextColor' => '#fff',
            'tabletTextColor' => '',
            'mobileTextColor' => '',
            'desktopCustomTextColor' => '',
            'tabletCustomTextColor' => '',
            'mobileCustomTextColor' => '',
        ];

        $attributes = wp_parse_args($attributes, $defaults);

        $title = $attributes['title'];
        $subtitle = $attributes['subtitle'];
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
        $modalId = uniqid('rrze-elements-modal-');

        $style = "--background-color: {$backgroundColor};";
        $style .= "--desktop-text-color: {$desktopTextColor};";
        if ($tabletTextColor) {
            $style .= "--tablet-text-color: {$tabletTextColor};";
        }
        if ($mobileTextColor) {
            $style .= "--mobile-text-color: {$mobileTextColor};";
        }
        if ($desktopCustomTextColor) {
            $style .= "--desktop-custom-text-color: {$desktopCustomTextColor};";
        }
        if ($tabletCustomTextColor) {
            $style .= "--tablet-custom-text-color: {$tabletCustomTextColor};";
        }
        if ($mobileCustomTextColor) {
            $style .= "--mobile-custom-text-color: {$mobileCustomTextColor};";
        }

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
                    <a href="#" class="rrze-elements-blocks__carousel_feature_card_link" role="button" aria-haspopup="dialog" aria-controls="<?php echo esc_attr($modalId); ?>" data-modal-id="<?php echo esc_attr($modalId); ?>">
                        <div class="rrze-elements-blocks__carousel_feature_card_link_control_container">
                            <span class="rrze-elements-blocks__carousel_feature_card_link_control_icon-container">
                                <svg class="rrze-elements-blocks__carousel_feature_card_link_control_icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z"/></svg>
                            </span>
                        </div>
                    </a>
                </div>
            </div>
            <div id="<?php echo esc_attr($modalId); ?>" class="rrze-elements-modal" role="dialog" aria-modal="true" aria-hidden="true" style="display:none;">
                <div class="rrze-elements-modal__backdrop"></div>
                <div class="rrze-elements-modal__content">
                    <button class="rrze-elements-modal__close" aria-label="Close modal">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                    </button>
                    <?php echo $content; ?>
                </div>
            </div>
        </li>
        <?php
        return ob_get_clean();
    }
}
