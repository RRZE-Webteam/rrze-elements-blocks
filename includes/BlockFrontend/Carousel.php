<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

class Carousel
{
    /**
     * Prints the carousel markup.
     *
     * @param array<string, mixed> $attributes Block attributes coming from Gutenberg.
     * @param string $content Inner block content.
     * @return string Rendered HTML for the carousel block.
     */
    public function render(array $attributes = [], string $content = ''): string
    {
        $title = $attributes['title'] ?? 'Lerne die FAU kennen.';
        $cardHeight = $attributes['cardHeight'] ?? 520;
        $overlayHoverTarget = 0.5;
        $uniqueIDForSectionHeader = sprintf('carousel-header-%s', uniqid());
        $anotherUniqueIDForContentSection = sprintf('carousel-content-%s', uniqid());
        $headingLevelValue = isset($attributes['headingLevel']) ? (int)$attributes['headingLevel'] : 2;
        if ($headingLevelValue < 2 || $headingLevelValue > 6) {
            $headingLevelValue = 2;
        }
        $headingLevel = 'h' . $headingLevelValue;
        $isNestedWarning = !empty($attributes['isNestedWarning']);

        if ($isNestedWarning) {
            return '';
        }

        ob_start();
        ?>
        <?php

        $wrapper_attributes = get_block_wrapper_attributes([
            'class' => 'rrze-elements-blocks__carousel',
            'style' => sprintf('--card-height: %dpx;', (int)$cardHeight),
        ]);
        ?>
        <section <?php echo $wrapper_attributes; ?>
            data-hover-overlay-target="<?php echo esc_attr((string)$overlayHoverTarget); ?>">
            <div class="rrze-elements-blocks__carousel-section-header">
                <<?php echo esc_attr($headingLevel); ?> class="rrze-elements-blocks__carousel-section-header-headline"
                id="<?php echo esc_attr($uniqueIDForSectionHeader); ?>">
                <?php echo esc_html($title); ?>
            </<?php echo esc_attr($headingLevel); ?>>
            </div>
            <div id="<?php echo esc_attr($anotherUniqueIDForContentSection); ?>"
                 class="rrze-elements-blocks__carousel-container">
                <div class="rrze-elements-blocks__carousel-content">
                    <ul aria-labelledby="<?php echo esc_attr($uniqueIDForSectionHeader); ?>" role="list"
                        class="rrze-elements-blocks__carousel-content-list">
                        <?php echo $content; ?>
                    </ul>
                </div>
                <div class="rrze-elements-blocks__carousel-navigation">
                    <ul class="rrze-elements-blocks__carousel-navigation-container">
                        <li class="rrze-elements-blocks__carousel_navigation-button-container">
                            <button class="rrze-elements-blocks_carousel_navigation_button"
                                    aria-label="Zurück im <?php echo esc_attr($title); ?> Karusell" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                     width="24px" fill="currentColor">
                                    <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                                </svg>
                            </button>
                        </li>
                        <li class="rrze-elements-blocks__carousel_navigation-button-container">
                            <button class="rrze-elements-blocks_carousel_navigation_button"
                                    aria-label="Weiter im <?php echo esc_attr($title); ?> Karusell" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                     width="24px" fill="currentColor">
                                    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <?php
        return (string)ob_get_clean();
    }
}
