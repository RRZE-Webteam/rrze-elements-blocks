<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

class Carousel
{
    public function render($attributes, $content)
    {
        $title = $attributes['title'] ?? 'Lerne die FAU kennen.';
        $cardHeight = $attributes['cardHeight'] ?? 520;
        $uniqueIDForSectionHeader = uniqid('carousel-header-');
        $anotherUniqueIDForContentSection = uniqid('carousel-content-');

        ob_start();
        ?>
        <section class="rrze-elements-blocks__carousel" style="--card-height: <?php echo esc_attr($cardHeight); ?>px;">
            <div class="rrze-elements-blocks__carousel-section-header">
                <h2 class="rrze-elements-blocks__carousel-section-header-headline" id="<?php echo esc_attr($uniqueIDForSectionHeader); ?>">
                    <?php echo esc_html($title); ?>
                </h2>
            </div>
            <div id="<?php echo esc_attr($anotherUniqueIDForContentSection); ?>" class="rrze-elements-blocks__carousel-container">
                <div class="rrze-elements-blocks__carousel-content">
                    <ul aria-labelledby="<?php echo esc_attr($uniqueIDForSectionHeader); ?>" role="list" class="rrze-elements-blocks__carousel-content-list">
                        <?php echo $content; ?>
                    </ul>
                </div>
                <div class="rrze-elements-blocks__carousel-navigation">
                    <ul class="rrze-elements-blocks__carousel-navigation-container">
                        <li class="rrze-elements-blocks__carousel_navigation-button-container">
                            <button class="rrze-elements-blocks_carousel_navigation_button" aria-label="Zurück im <?php echo esc_attr($title); ?> Karusell" type="button">
                                <svg class="rrze-elements-blocks__carousel_navigation_icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M400-80-320-480l320-400 71 71-329 329 329 329-71 71Z"/></svg>
                            </button>
                        </li>
                        <li class="rrze-elements-blocks__carousel_navigation-button-container">
                            <button class="rrze-elements-blocks_carousel_navigation_button" aria-label="Weiter im <?php echo esc_attr($title); ?> Karusell" type="button">
                                <svg class="rrze-elements-blocks__carousel_navigation_icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <?php
        return ob_get_clean();
    }
}
