<?php

namespace RRZE\ElementsBlocks;

defined('ABSPATH') || exit;

use RRZE\Elements\News\News;
use RRZE\ElementsBlocks\BlockFrontend\Accordion;
use RRZE\ElementsBlocks\BlockFrontend\Accordions;
use RRZE\ElementsBlocks\BlockFrontend\Alert;
use RRZE\ElementsBlocks\BlockFrontend\CallToAction;
use RRZE\ElementsBlocks\BlockFrontend\Collapse;
use RRZE\ElementsBlocks\BlockFrontend\Collapsibles;
use RRZE\ElementsBlocks\BlockFrontend\Columns;
use RRZE\ElementsBlocks\BlockFrontend\ContentWidthLimiter;
use RRZE\ElementsBlocks\BlockFrontend\Counter;
use RRZE\ElementsBlocks\BlockFrontend\CounterRow;
use RRZE\ElementsBlocks\BlockFrontend\Fact;
use RRZE\ElementsBlocks\BlockFrontend\FactsGrid;
use RRZE\ElementsBlocks\BlockFrontend\IconBox;
use RRZE\ElementsBlocks\BlockFrontend\Insertion;
use RRZE\ElementsBlocks\BlockFrontend\Notice;
use RRZE\ElementsBlocks\BlockFrontend\Tab;
use RRZE\ElementsBlocks\BlockFrontend\Tabs;
use RRZE\ElementsBlocks\BlockFrontend\Timeline;
use RRZE\ElementsBlocks\BlockFrontend\TimelineItem;
use WP_Term;

class Blocks
{
    public function __construct()
    {
        add_action('init', [$this, 'rrze_rrze_elements_block_init']);
    }

    /**
     * Initializes the block registration and sets up localization.
     */
    public function rrze_rrze_elements_block_init(): void
    {
        if (ThemeSniffer::getThemeGroup('fauthemes')) {
            $this->rrze_register_blocks_and_translations();
            $this->rrze_register_dynamic_blocks();
            $this->rrze_register_block_styles();

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
        $this->rrze_register_custom_styles();
    }

    /**
     * Registers custom Block Styles.
     * @return void
     */
    private function rrze_register_custom_styles(): void
    {
        if (ThemeSniffer::getThemeGroup('fauelemental')) {
            register_block_style('rrze-elements/notice', [
                'name' => __('attention', 'rrze-elements-blocks'),
                'label' => __('Attention', 'rrze-elements-blocks'),
                'is_default' => false,
            ]);
        }
    }

    /**
     * Registers blocks and localizations.
     */
    private function rrze_register_blocks_and_translations(): void
    {
        // Register global styles and scripts here.
        wp_enqueue_style('fontawesome');
        wp_enqueue_style('rrze-elements-blocks');

        if ( ThemeSniffer::getThemeGroup('fauelemental' )){
            wp_enqueue_style('rrze-elements-blocks-fau-elemental-compatibility');
        }
    }

    /**
     * Custom Block Styles
     */
    public function rrze_register_block_styles()
    {
        $theme = wp_get_theme();
        $stylesheet = $theme->get_stylesheet(); // Child-Theme-Slug
        $template = $theme->get_template();   // Parent-Theme-Slug
        $is_fau = in_array('FAU-Elemental', [$stylesheet, $template], true);

        $block_name = 'rrze-elements/cta';

        if ($is_fau) {
            // FAU-Elemental: zwei alternative Styles
            register_block_style($block_name, [
                'name' => 'lightmode',
                'label' => __('Light', 'rrze-elements-blocks'),
            ]);
            register_block_style($block_name, [
                'name' => 'darkmode',
                'label' => __('Dark', 'rrze-elements-blocks'),
                'is_default' => true,
            ]);
        } else {
            register_block_style($block_name, [
                'name' => 'no-background',
                'label' => __('Normal', 'rrze-elements-blocks'),
                'is_default' => true,
            ]);
            register_block_style($block_name, [
                'name' => 'small',
                'label' => __('Small', 'rrze-elements-blocks'),
            ]);
        }
    }

    /**
     * Registers dynamic blocks and their dynamic render functions.
     * @return void
     */
    private function rrze_register_dynamic_blocks(): void
    {
        $dynamic_blocks = [
            [
                'build_folder' => 'alert',
                'class' => Alert::class,
            ],
            [
                'build_folder' => 'accordion',
                'class' => Accordion::class,
            ],
            [
                'build_folder' => 'accordions',
                'class' => Accordions::class,
            ],
            [
                'build_folder' => 'collapse',
                'class' => Collapse::class,
            ],
            [
                'build_folder' => 'collapsibles',
                'class' => Collapsibles::class,
            ],
            [
                'build_folder' => 'notice',
                'class' => Notice::class,
            ],
            [
                'build_folder' => 'columns',
                'class' => Columns::class,
            ],
            [
                'build_folder' => 'counter-row',
                'class' => CounterRow::class,
            ],
            [
                'build_folder' => 'iconbox-row',
                'class' => CounterRow::class,
            ],
            [
                'build_folder' => 'counter',
                'class' => Counter::class,
            ],
            [
                'build_folder' => 'iconbox',
                'class' => IconBox::class,
            ],
            [
                'build_folder' => 'contentwidthlimiter',
                'class' => ContentWidthLimiter::class,
            ],
            [
                'build_folder' => 'cta',
                'class' => CallToAction::class,
            ],
            [
                'build_folder' => 'insertion',
                'class' => Insertion::class,
            ],
            [
                'build_folder' => 'tabs',
                'class' => Tabs::class,
            ],
            [
                'build_folder' => 'tab',
                'class' => Tab::class,
            ],
            [
                'build_folder' => 'timeline',
                'class' => Timeline::class,
            ],
            [
                'build_folder' => 'timeline-item',
                'class' => TimelineItem::class,
            ],
            [
                'build_folder' => 'facts-grid',
                'class' => FactsGrid::class,
            ],
            [
                'build_folder' => 'fact',
                'class' => Fact::class,
            ]
        ];

        foreach ($dynamic_blocks as $block_def) {
            register_block_type(
                plugin_dir_path(__DIR__) . 'build/blocks/' . $block_def['build_folder'],
                [
                    'render_callback' => function ($attributes, $content, $block) use ($block_def) {
                        $class = $block_def['class'];
                        $instance = new $class();

                        return $instance->render($attributes, $content, $block);
                    },
                ]
            );

            load_plugin_textdomain('rrze-elements-blocks', false, dirname(plugin_basename(__DIR__)) . 'languages');

            $script_handle = generate_block_asset_handle('rrze-elements/' . $block_def['build_folder'], 'editorScript');
            wp_set_script_translations($script_handle, 'rrze-elements-blocks', plugin_dir_path(__DIR__) . 'languages');
        }
    }


    /**
     * Renders the news block.
     *
     * @param array $attributes Attributes for the news block.
     * @return string HTML content for the news block.
     */
    public function render_news_block($attributes): string
    {
        $legacyMode = $attributes['legacyMode'] ?? false;
        $listView = $attributes['display'] ?? '';
        $isListView = $listView === 'list';
        if (ThemeSniffer::getThemeGroup('fauelemental') && !$legacyMode && !$isListView) {
            return $this->channel_fau_teaser_grid($attributes);
        } else {
            if (class_exists('RRZE\Elements\News\News')) {
                $news_instance = new News();
                return $news_instance->shortcodeCustomNews($attributes);
            }

            return '';
        }
    }

    public function channel_fau_teaser_grid(array $attributes): string
    {
        $num = isset($attributes['num']) ? absint($attributes['num']) : 6;
        $hstart = isset($attributes['hstart']) ? max(1, min(6, absint($attributes['hstart']))) : 2;
        $tag = isset($attributes['tag']) ? sanitize_text_field($attributes['tag']) : '';
        $cat = isset($attributes['cat']) ? sanitize_title($attributes['cat']) : '';

        $selectedCategoryId = '';
        if ($cat !== '') {
            $term = get_category_by_slug($cat);

            if ($term instanceof WP_Term && !is_wp_error($term)) {
                $selectedCategoryId = (int)$term->term_id;
            }
        }

        $block_default_args = [
            'variant' => 'post',
            'selectionMode' => 'auto',
            'displayStyle' => 'teaser-grid',
            'teaserLayout' => '3m',
            'postsPerPage' => $num,
            'orderBy' => 'date',
            'order' => 'DESC',
            'headingLevel' => $hstart,
            'showPagination' => false,
            'selectedCategory' => $selectedCategoryId,
            'selectedTag' => $tag,
            'customBlockId' => wp_generate_uuid4(),
        ];

        return do_blocks('<!-- wp:fau-elemental/fau-teaser-grid ' . wp_json_encode($block_default_args) . ' /-->');
    }
}
