<?php

namespace RRZE\ElementsB;

defined('ABSPATH') || exit;

use RRZE\ElementsB\ThemeSniffer;

class Patterns
{
    public function __construct()
    {
        add_action('init', [$this, 'elementsBlocks_pattern_categories']);
        add_filter('block_categories_all', [$this, 'my_custom_block_category'], 10, 2);
        add_action('init', [$this, 'register_fau_custom_wp_block_patterns']);
        add_action('init', [$this, 'register_dev_patterns']);
    }

    /**
     * Register pattern categories.
     */
    public function elementsBlocks_pattern_categories()
    {
        register_block_pattern_category(
            'page',
            array(
                'label'       => _x('Pages', 'Block pattern category'),
                'description' => __('A collection of full page layouts.'),
            )
        );
    }

    /**
     * Adds custom block category for grouping RRZE elements in the block editor underneath RRZE Elements.
     *
     * @param array $categories Existing block categories.
     * @param WP_Post $post Current post object.
     * @return array Modified block categories.
     */
    public function my_custom_block_category($categories, $post)
    {
        $custom_category = array(
            array(
                'slug'  => 'rrze_elements',
                'title' => __('RRZE Elements', 'rrze-elements-b'),
                'icon'  => 'layout',
            ),
        );

        // Use array_unshift to prepend the custom category to the categories array
        array_unshift($categories, $custom_category[0]);

        return $categories;
    }

    public function register_dev_patterns()
    {
        if (ThemeSniffer::getThemeGroup('fauthemes')) {
            $this->elements_register_block_pattern(
                'dev-counter-row',
                'rrze-elements-blocks/dev-counter-iconbox',
                __('DEV: Counter and Iconbox', 'rrze-elementsb'),
                _x('A testing template for Counter and Iconbox.', 'DEV Template', 'rrze-elements-b'),
                array('page'),
                array('page', 'wp_template'),
                true,
                array('starter'),
                array('core/post-content')
            );
        }
    }

    public function register_fau_custom_wp_block_patterns()
    {
        if (ThemeSniffer::getThemeGroup('fauthemes')) {
            $this->elements_register_block_pattern(
                'example-pattern',
                'rrze-elements-blocks/example-pattern',
                __('Example Pattern', 'rrze-elementsb'),
                _x('Description for Example Pattern', 'Block pattern description', 'rrze-elements-b'),
                array('portfolio', 'about')
            );

            $this->elements_register_block_pattern(
                'image-with-accordion-h2',
                'rrze-elements-blocks/image-w-accordion-h2',
                __('Image with Accordion', 'rrze-elementsb'),
                _x('Description for Image with Accordion', 'Block pattern description', 'rrze-elements-b'),
                array('portfolio', 'about')
            );

            $this->elements_register_block_pattern(
                'custom-news-h2',
                'rrze-elements-blocks/custom-news-h2',
                __('Custom News section 3-Column Layout', 'rrze-elementsb'),
                _x('A 3 Column Layout for custom News on Landing pages', 'Block pattern description', 'rrze-elements-b'),
                array('posts')
            );

            $this->elements_register_block_pattern(
                'cta-1',
                'rrze-elements-blocks/cta',
                __('Call to Action', 'rrze-elementsb'),
                _x('Call to Action section', 'Block pattern description', 'rrze-elements-b'),
                array('call-to-action')
            );

            $this->elements_register_block_pattern(
                'image-with-text',
                'rrze-elements-blocks/image-w-text',
                __('Image with Text', 'rrze-elementsb'),
                _x('Two column layout: Image left, text right column.', 'Block pattern description', 'rrze-elements-b'),
                array('portfolio', 'about')
            );

            $this->elements_register_block_pattern(
                'imagefilm',
                'rrze-elements-blocks/imagefilm',
                __('Imagefilm', 'rrze-elementsb'),
                _x('FAU Imagefilm.', 'Block pattern description', 'rrze-elements-b'),
                array('portfolio', 'about'),
            );

            $this->elements_register_block_pattern(
                'page-home-fau',
                'rrze-elements-blocks/page-home-fau',
                __('Landing page template 1', 'rrze-elementsb'),
                _x('A landingpage template for FAU.', 'Block pattern description', 'rrze-elements-b'),
                array('page'),
                array('page', 'wp_template'),
                true,
                array('starter'),
                array('core/post-content')
            );
            // Add more patterns here
        }
    }

    public function elements_register_block_pattern($file_name, $pattern_name, $title, $description, $categories, $postTypes = ['page', 'single'], $inserter = true, $keywords = array(), $blockTypes = array())
    {
        $pattern_path = plugin_dir_path(__FILE__) . 'patterns/' . $file_name . '.php';
        $pattern_content = file_get_contents($pattern_path);
        if (function_exists('register_block_pattern')) {
            register_block_pattern(
                $pattern_name,
                array(
                    'title'       => $title,
                    'description' => $description,
                    'content'     => $pattern_content,
                    'categories'  => $categories,
                    'postTypes'   => $postTypes,
                    'inserter'    => $inserter,
                    'keywords'    => $keywords,
                    'blockTypes'  => $blockTypes
                )
            );
        }
    }
}
