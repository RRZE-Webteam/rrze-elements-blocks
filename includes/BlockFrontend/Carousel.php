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
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                            </button>
                        </li>
                        <li class="rrze-elements-blocks__carousel_navigation-button-container">
                            <button class="rrze-elements-blocks_carousel_navigation_button" aria-label="Weiter im <?php echo esc_attr($title); ?> Karusell" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
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
