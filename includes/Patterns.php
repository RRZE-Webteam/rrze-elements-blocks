<?php

namespace RRZE\ElementsB;

defined('ABSPATH') || exit;

use RRZE\ElementsB\ThemeSniffer;

class Patterns
{
    public function __construct()
    {
        $this->register_hooks();
    }

    /**
     * Register all hooks.
     */
    private function register_hooks()
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
        register_block_pattern_category('page', [
            'label'       => _x('Pages', 'Block pattern category'),
            'description' => __('A collection of full page layouts.'),
        ]);

        if (!$this->is_development_environment() || !ThemeSniffer::getThemeGroup('fauthemes')) {
            return;
        }

        register_block_pattern_category('dev', [
            'label'       => _x('DEVELOPMENT', 'Block pattern category'),
            'description' => __('A collection of DEV layouts for automated testing.'),
        ]);
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
        $custom_category = [
            'slug'  => 'rrze_elements',
            'title' => __('RRZE Elements', 'rrze-elements-blocks'),
            'icon'  => 'layout',
        ];

        array_unshift($categories, $custom_category);

        return $categories;
    }

    /**
     * Register development patterns.
     */
    public function register_dev_patterns()
    {
        if (!$this->is_development_environment() || !ThemeSniffer::getThemeGroup('fauthemes')) {
            return;
        }

        $patterns = [
            [
                'file_name'   => 'dev-counter-row',
                'pattern_name' => 'rrze-elements-blocks/dev-counter-iconbox',
                'title'       => __('DEV: Counter and Iconbox', 'rrze-elementsb'),
                'description' => _x('A testing template for Counter and Iconbox.', 'DEV Template', 'rrze-elements-blocks'),
                'categories'  => ['dev'],
                'postTypes'   => ['page'],
                'inserter'    => true,
                'keywords'    => [],
                'blockTypes'  => [],
                'isPhp'       => true
            ],
            [
                'file_name'   => 'dev-accordion',
                'pattern_name' => 'rrze-elements-blocks/dev-accordion',
                'title'       => __('DEV: Accordion', 'rrze-elementsb'),
                'description' => _x('A testing template for Accordions.', 'DEV Template', 'rrze-elements-blocks'),
                'categories'  => ['dev'],
                'postTypes'   => ['page'],
                'inserter'    => true,
                'keywords'    => [],
                'blockTypes'  => []
            ]
        ];

        foreach ($patterns as $pattern) {
            $this->register_pattern(
                $pattern['file_name'],
                $pattern['pattern_name'],
                $pattern['title'],
                $pattern['description'],
                $pattern['categories'],
                $pattern['postTypes'],
                $pattern['inserter'],
                $pattern['keywords'],
                $pattern['blockTypes'],
                $pattern['isPhp'] ?? false,
                'dev-patterns'
            );
        }
    }

    /**
     * Register custom WP block patterns for FAU themes.
     */
    public function register_fau_custom_wp_block_patterns()
    {
        if (!ThemeSniffer::getThemeGroup('fauthemes')) {
            return;
        }

        $patterns = [
            [
                'file_name'   => 'example-pattern',
                'pattern_name' => 'rrze-elements-blocks/example-pattern',
                'title'       => __('Example Pattern', 'rrze-elementsb'),
                'description' => _x('Description for Example Pattern', 'Block pattern description', 'rrze-elements-blocks'),
                'categories'  => ['portfolio', 'about'],
            ],
            [
                'file_name'   => 'image-with-accordion-h2',
                'pattern_name' => 'rrze-elements-blocks/image-w-accordion-h2',
                'title'       => __('Image with Accordion', 'rrze-elementsb'),
                'description' => _x('Description for Image with Accordion', 'Block pattern description', 'rrze-elements-blocks'),
                'categories'  => ['portfolio', 'about'],

            ],
            [
                'file_name'   => 'custom-news-h2',
                'pattern_name' => 'rrze-elements-blocks/custom-news-h2',
                'title'       => __('Custom News section 3-Column Layout', 'rrze-elementsb'),
                'description' => _x('A 3 Column Layout for custom News on Landing pages', 'Block pattern description', 'rrze-elements-blocks'),
                'categories'  => ['posts'],
            ],
            [
                'file_name'   => 'cta-1',
                'pattern_name' => 'rrze-elements-blocks/cta',
                'title'       => __('Call to Action', 'rrze-elementsb'),
                'description' => _x('Call to Action section', 'Block pattern description', 'rrze-elements-blocks'),
                'categories'  => ['call-to-action'],
            ],
            [
                'file_name'   => 'image-with-text',
                'pattern_name' => 'rrze-elements-blocks/image-w-text',
                'title'       => __('Image with Text', 'rrze-elementsb'),
                'description' => _x('Two column layout: Image left, text right column.', 'Block pattern description', 'rrze-elements-blocks'),
                'categories'  => ['portfolio', 'about'],
            ],
            [
                'file_name'   => 'imagefilm',
                'pattern_name' => 'rrze-elements-blocks/imagefilm',
                'title'       => __('Imagefilm', 'rrze-elementsb'),
                'description' => _x('FAU Imagefilm.', 'Block pattern description', 'rrze-elements-blocks'),
                'categories'  => ['portfolio', 'about'],
            ],
            [
                'file_name'   => 'page-home-fau',
                'pattern_name' => 'rrze-elements-blocks/page-home-fau',
                'title'       => __('Landing page template 1', 'rrze-elementsb'),
                'description' => _x('A landingpage template for FAU.', 'Block pattern description', 'rrze-elements-blocks'),
                'categories'  => ['page'],
                'postTypes'   => ['page'],
            ]
        ];

        foreach ($patterns as $pattern) {
            $this->register_pattern(
                $pattern['file_name'],
                $pattern['pattern_name'],
                $pattern['title'],
                $pattern['description'],
                $pattern['categories'],
                $pattern['postTypes'] ?? ['page', 'single'],
                $pattern['inserter'] ?? true,
                $pattern['keywords'] ?? [],
                $pattern['blockTypes'] ?? [],
                $pattern['isPhp'] ?? false,
                'patterns'
            );
        }
    }

    /**
     * Register a block pattern.
     */
    private function register_pattern($file_name, $pattern_name, $title, $description, $categories, $postTypes = ['page', 'single'], $inserter = true, $keywords = [], $blockTypes = [], $isPhp = false, $directory = 'patterns')
    {

        if ($isPhp) {
            $extension = '.php';
        } else {
            $extension = '.html';
        }

        $pattern_path = plugin_dir_path(__FILE__) . $directory . '/' . $file_name . $extension;

        if (!file_exists($pattern_path)) {
            return;
        }

        $pattern_content = file_get_contents($pattern_path);

        $pattern_content = $this->replace_random_numbers($pattern_content);

        if (function_exists('register_block_pattern')) {
            register_block_pattern($pattern_name, [
                'title'       => $title,
                'description' => $description,
                'content'     => $pattern_content,
                'categories'  => $categories,
                'postTypes'   => $postTypes,
                'inserter'    => $inserter,
                'keywords'    => $keywords,
                'blockTypes'  => $blockTypes,
            ]);
        }
    }

    /**
     * Replace {random_number} placeholders with unique random numbers.
     */
    private function replace_random_numbers($content)
    {
        $random_numbers = [];
        $content = preg_replace_callback('/{random_number}/', function () use (&$random_numbers) {
            static $counter = 0;
            $pair_index = intval($counter / 2);

            if (!isset($random_numbers[$pair_index])) {
                $random_numbers[$pair_index] = rand(100, 1000);
            }

            $counter++;
            return $random_numbers[$pair_index];
        }, $content);

        return $content;
    }

    /**
     * Check if the current environment is development.
     */
    private function is_development_environment()
    {
        return wp_get_environment_type() === 'local';
    }
}
