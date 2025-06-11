<?php

namespace RRZE\ElementsBlocks;

defined('ABSPATH') || exit;

use RRZE\Elements\News\News;
use RRZE\ElementsBlocks\BlockFrontend\Accordion;
use RRZE\ElementsBlocks\BlockFrontend\Accordions;
use RRZE\ElementsBlocks\BlockFrontend\Alert;
use RRZE\ElementsBlocks\BlockFrontend\Collapse;
use RRZE\ElementsBlocks\BlockFrontend\Collapsibles;
use RRZE\ElementsBlocks\ThemeSniffer;

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
            $this->rrze_register_dynamic_blocks();

            // Additional logic for blocks with custom render callbacks.
            if (class_exists('RRZE\Elements\News\News')) {
                register_block_type(plugin_dir_path(__DIR__) . 'build/blocks/news', array(
                    'render_callback' => [$this, 'render_news_block'],
                ));
                load_plugin_textdomain('rrze-elements-blocks', false, plugin_dir_path(__DIR__) . 'languages');

                $script_handle = generate_block_asset_handle('rrze-elements/' . 'news', 'editorScript');
                wp_set_script_translations($script_handle, 'rrze-elements-blocks', plugin_dir_path(__DIR__) . 'languages');
            }
        }
    }

    /**
     * Registers blocks and localizations.
     */
    private function rrze_register_blocks_and_translations(): void
    {
        $blocks = [
            'notice', 'iconbox',
            'tabs', 'tab', 'cta', 'insertion', 'contentwidthlimiter', 'columns', 'counter', 'counter-row', 'timeline', 'timeline-item'
        ];

        foreach ($blocks as $block) {
            register_block_type(plugin_dir_path(__DIR__) . 'build/blocks/' . $block);

            load_plugin_textdomain('rrze-elements-blocks', false, dirname(plugin_basename(__DIR__)) . 'languages');

            $script_handle = generate_block_asset_handle('rrze-elements/' . $block, 'editorScript');
            wp_set_script_translations($script_handle, 'rrze-elements-blocks', plugin_dir_path(__DIR__) . 'languages');
        }

        // Register global styles and scripts here.
        wp_enqueue_style('fontawesome');
        wp_enqueue_style('rrze-elements-blocks');
    }

  /**
   * Registers dynamic blocks and their dynamic render functions.
   * @return void
   */
  private function rrze_register_dynamic_blocks(): void
  {
    $dynamic_blocks = [
      [
        'slug'  => 'alert',
        'class' => Alert::class,
      ],
      [
        'slug'  => 'accordion',
        'class' => Accordion::class,
      ],
      [
        'slug'  => 'accordions',
        'class' => Accordions::class,
      ],
      [
        'slug'  => 'collapse',
        'class' => Collapse::class,
      ],
      [
        'slug' => 'collapsibles',
        'class' => Collapsibles::class,
      ]
    ];

    foreach ($dynamic_blocks as $block) {
      register_block_type(
        plugin_dir_path(__DIR__) . 'build/blocks/' . $block['slug'],
        [
          'render_callback' => function ($attributes, $block_info, $content) use ($block) {
            $class = $block['class'];
            $instance = new $class();
            return $instance->render($attributes, $block_info, $content);
          },
        ]
      );

      load_plugin_textdomain('rrze-elements-blocks', false, dirname(plugin_basename(__DIR__)) . 'languages');

      $script_handle = generate_block_asset_handle('rrze-elements/' . $block['slug'], 'editorScript');
      wp_set_script_translations($script_handle, 'rrze-elements-blocks', plugin_dir_path(__DIR__) . 'languages');
    }
  }


  /**
     * Renders the news block.
     *
     * @param array $attributes Attributes for the news block.
     * @return string HTML content for the news block.
     */
    public function render_news_block($attributes)
    {
        if (class_exists('RRZE\Elements\News\News')) {
            $news_instance = new News();
            return $news_instance->shortcodeCustomNews($attributes);
        }

        return '';
    }
}
