<?php

namespace RRZE\ElementsB;

defined('ABSPATH') || exit;

class Patterns {
    public function __construct() {
        add_action('init', [$this, 'register_all_custom_wp_block_patterns']);
    }

    public function register_all_custom_wp_block_patterns() {
        $this->register_block_pattern(
            'example-pattern',
            'my-patterns/example-pattern',
            __('Example Pattern', 'rrze-elementsb'),
            _x('Description for Example Pattern', 'Block pattern description', 'text-domain'),
            array('gallery')
        );

        $this->register_block_pattern(
            'image-with-accordion-h2',
            'my-patterns/image-with-accordion-h2',
            __('Image with Accordion', 'rrze-elementsb'),
            _x('Description for Image with Accordion', 'Block pattern description', 'text-domain'),
            array('gallery')
        );

        // Add more patterns here
    }

    private function register_block_pattern($file_name, $pattern_name, $title, $description, $categories) {
        $pattern_path = plugin_dir_path(__FILE__) . 'patterns/' . $file_name . '.php';
        $pattern_content = file_get_contents($pattern_path);

        register_block_pattern(
            $pattern_name,
            array(
                'title'       => $title,
                'description' => $description,
                'content'     => $pattern_content,
                'categories'  => $categories,
            )
        );
    }
}
