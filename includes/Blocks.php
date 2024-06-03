<?php

namespace RRZE\ElementsB;

defined('ABSPATH') || exit;

use RRZE\Elements\News\News;
use RRZE\ElementsB\ThemeSniffer;

class Blocks
{
    public function __construct()
    {
        add_action('init', [$this, 'rrze_rrze_elements_block_init']);
    }

    /**
     * Initializes the block registration and sets up localization.
     */
    public function rrze_rrze_elements_block_init()
    {
        if (ThemeSniffer::getThemeGroup('fauthemes')) {
            $this->rrze_register_blocks_and_translations();

            // Additional logic for blocks with custom render callbacks.
            if (class_exists('RRZE\Elements\News\News')) {
                Helper::debug('News block loaded.');
                Helper::debug(plugin_dir_path(__DIR__) . 'build/news');
                register_block_type(plugin_dir_path(__DIR__) . 'build/news', array(
                    'render_callback' => [$this, 'render_news_block'],
                ));
                load_plugin_textdomain('rrze-elements-b', false, plugin_dir_path(__DIR__) . 'languages');

                $script_handle = generate_block_asset_handle('rrze-elements/' . 'news', 'editorScript');
                wp_set_script_translations($script_handle, 'rrze-elements-b', plugin_dir_path(__DIR__) . 'languages');
            }
        }
    }

    /**
     * Registers blocks and localizations.
     */
    private function rrze_register_blocks_and_translations()
    {
        $blocks = [
            'collapsibles', 'collapse', 'accordions', 'accordion', 'alert', 'notice', 'iconbox',
            'tabs', 'tab', 'cta', 'insertion', 'contentwidthlimiter', 'columns', 'counter', 'counter-row'
        ];

        foreach ($blocks as $block) {
            register_block_type(plugin_dir_path(__DIR__) . 'build/' . $block);

            load_plugin_textdomain('rrze-elements-b', false, dirname(plugin_basename(__DIR__)) . 'languages');

            $script_handle = generate_block_asset_handle('rrze-elements/' . $block, 'editorScript');
            wp_set_script_translations($script_handle, 'rrze-elements-b', plugin_dir_path(__DIR__) . 'languages');
        }

        // Register global styles and scripts here.
        wp_enqueue_style('fontawesome');
        wp_enqueue_style('rrze-elements-blocks');
    }

    /**
     * Renders the news block.
     * 
     * @param array $attributes Attributes for the news block.
     * @return string HTML content for the news block.
     */
    public function render_news_block($attributes)
    {
        Helper::debug($attributes);
        if (class_exists('RRZE\Elements\News\News')) {
            $news_instance = new News();
            return $news_instance->shortcodeCustomNews($attributes);
        }

        return '';
    }
}
