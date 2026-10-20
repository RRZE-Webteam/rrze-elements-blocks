<?php

namespace RRZE\ElementsBlocks\BlockFrontend;

/** Renders the slider shell around independently rendered info cards. */
class ContentSlider
{
    /**
     * Keeps all original cards readable before JavaScript enhances navigation.
     *
     * @param array<string, mixed> $attributes Saved Gutenberg attributes.
     * @param string $content Already rendered child blocks.
     * @return string Slider markup, or an empty string without children.
     */
    public function render(array $attributes = [], string $content = ''): string
    {
        if (trim($content) === '') {
            return '';
        }
        $title = trim(wp_strip_all_tags((string)($attributes['title'] ?? '')));
        $level = (int)($attributes['headingLevel'] ?? 2);
        $level = $level >= 2 && $level <= 6 ? $level : 2;
        $id = uniqid('content-slider-');
        $label = $title !== '' ? $title : __('Inhalts-Slider', 'rrze-elements-blocks');
        $wrapper = get_block_wrapper_attributes(['class' => 'rrze-elements-blocks__content-slider']);

        ob_start();
        ?>
        <section <?php echo $wrapper; ?>
                 aria-label="<?php echo esc_attr($label); ?>"
                 aria-roledescription="<?php esc_attr_e('Karussell', 'rrze-elements-blocks'); ?>">
            <?php if ($title !== '') : ?>
                <h<?php echo $level; ?> class="rrze-elements-blocks__content-slider-heading"><?php echo esc_html($title); ?></h<?php echo $level; ?>>
            <?php endif; ?>
            <div class="rrze-elements-blocks__content-slider-viewport"
                 id="<?php echo esc_attr($id); ?>" tabindex="0"
                 role="group" aria-label="<?php echo esc_attr($label); ?>">
                <div class="rrze-elements-blocks__content-slider-track">
                    <?php echo $content; ?>
                </div>
            </div>
            <div class="rrze-elements-blocks__content-slider-navigation">
                <button type="button" data-slider-direction="-1"
                        aria-controls="<?php echo esc_attr($id); ?>"
                        aria-label="<?php esc_attr_e('Vorherige Karte', 'rrze-elements-blocks'); ?>">
                    <span aria-hidden="true">←</span>
                </button>
                <span class="rrze-elements-blocks__content-slider-position" aria-live="polite" aria-atomic="true"></span>
                <button type="button" data-slider-direction="1"
                        aria-controls="<?php echo esc_attr($id); ?>"
                        aria-label="<?php esc_attr_e('Nächste Karte', 'rrze-elements-blocks'); ?>">
                    <span aria-hidden="true">→</span>
                </button>
            </div>
        </section>
        <?php
        return (string)ob_get_clean();
    }
}
