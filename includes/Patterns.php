<?php

namespace RRZE\ElementsBlocks;

defined('ABSPATH') || exit;

use RRZE\ElementsBlocks\ThemeSniffer;

class Patterns
{
    public function __construct()
    {
        $this->register_hooks();
    }

    /**
     * Register all hooks.
     */
    private function register_hooks(): void
    {
        add_action('init', [$this, 'elementsBlocks_pattern_categories']);
        add_filter('block_categories_all', [$this, 'my_custom_block_category'], 100, 2);
        //add_action('init', [$this, 'register_fau_custom_wp_block_patterns']);
        add_action('init', [$this, 'register_dev_patterns']);
    }

    /**
     * Register pattern categories.
     */
    public function elementsBlocks_pattern_categories(): void
    {
        register_block_pattern_category('page', [
            'label'       => _x('Pages', 'Block pattern category','rrze-elements-blocks'),
            'description' => __('A collection of full page layouts.', 'rrze-elements-blocks'),
        ]);

        if (!$this->is_development_environment() || !ThemeSniffer::getThemeGroup('fauthemes')) {
            return;
        }

        register_block_pattern_category('dev', [
            'label'       => _x('DEVELOPMENT', 'Block pattern category', 'rrze-elements-blocks'),
            'description' => __('A collection of DEV layouts for automated testing.', 'rrze-elements-blocks'),
        ]);
    }

  /**
   * Add custom RRZE category and sort categories so that any slug
   * starting with "fau" or "rrze" appears right after "design".
   * If "design" doesn't exist, those categories appear last.
   *
   * @param array<int, array<string, mixed>> $categories
   * @param \WP_Post|\WP_Block_Editor_Context|null $context
   * @return array<int, array<string, mixed>>
   */
  public function my_custom_block_category(array $categories, $context = null): array {
    $categories = array_values($categories);

    $has_rrze = false;
    foreach ($categories as $c) {
      if (!empty($c['slug']) && strtolower($c['slug']) === 'rrze_elements') {
        $has_rrze = true;
        break;
      }
    }
    if (!$has_rrze) {
      $categories[] = [
        'slug'  => 'rrze_elements',
        'title' => __('RRZE Elements', 'rrze-elements-blocks'),
        'icon'  => 'layout',
      ];
    }

    // Helper: does slug start with fau/rrze?
    $is_rrze_fau = static function($slug) {
      $slug = is_string($slug) ? $slug : '';
      return (bool) preg_match('/^(fau|rrze)/i', $slug);
    };

    // Find the first "design" category (if any)
    $designIndex = null;
    foreach ($categories as $i => $cat) {
      $slug = strtolower($cat['slug'] ?? '');
      if ($slug === 'design') {
        $designIndex = $i;
        break;
      }
    }

    // Partition while preserving original order
    $rrzeFau = [];
    $before  = [];
    $after   = [];
    $designCat = null;

    foreach ($categories as $i => $cat) {
      $slug = $cat['slug'] ?? '';

      if ($is_rrze_fau($slug)) {
        $rrzeFau[] = $cat;
        continue;
      }

      $slugLower = strtolower($slug);
      if ($slugLower === 'design') {
        $designCat = $cat;
        continue;
      }

      if ($designIndex !== null && $i < $designIndex) {
        $before[] = $cat;
      } else {
        $after[] = $cat;
      }
    }

    if ($designCat !== null) {
      // before + design + rrze/fau + after
      // @phpstan-ignore-next-line
      return array_values(array_merge($before, [$designCat], $rrzeFau, $after));
    } else {
      // No design category: put rrze/fau last
      // @phpstan-ignore-next-line
      return array_values(array_merge($before, $after, $rrzeFau));
    }
  }


  /**
     * Register development patterns.
     */
    public function register_dev_patterns(): void
    {
        if (!$this->is_development_environment() || !ThemeSniffer::getThemeGroup('fauthemes')) {
            return;
        }

        $patterns = [
            [
                'file_name'   => 'dev-counter-row',
                'pattern_name' => 'rrze-elements-blocks/dev-counter-iconbox',
                'title'       => __('DEV: Counter and Iconbox', 'rrze-elements-blocks'),
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
                'title'       => __('DEV: Accordion', 'rrze-elements-blocks'),
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
    public function register_fau_custom_wp_block_patterns(): void
    {
        if (!ThemeSniffer::getThemeGroup('fauthemes')) {
            return;
        }

        $patterns = [
            [
                'file_name'   => 'example-pattern',
                'pattern_name' => 'rrze-elements-blocks/example-pattern',
                'title'       => __('Example Pattern', 'rrze-elements-blocks'),
                'description' => _x('Description for Example Pattern', 'Block pattern description', 'rrze-elements-blocks'),
                'categories'  => ['portfolio', 'about'],
            ],
        ];

        foreach ($patterns as $pattern) {
            $pattern = array_merge(
                [
                    'postTypes'  => ['page', 'single'],
                    'inserter'   => true,
                    'keywords'   => [],
                    'blockTypes' => [],
                    'isPhp'      => false,
                ],
                $pattern
            );

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
                $pattern['isPhp'],
                'patterns'
            );
        }
    }

    /**
     * Register a block pattern.
     *
     * @param array<int, string> $categories
     * @param array<int, string> $postTypes
     * @param array<int, string> $keywords
     * @param array<int, string> $blockTypes
     */
    private function register_pattern(
        string $file_name,
        string $pattern_name,
        string $title,
        string $description,
        array $categories,
        array $postTypes = ['page', 'single'],
        bool $inserter = true,
        array $keywords = [],
        array $blockTypes = [],
        bool $isPhp = false,
        string $directory = 'patterns'
    ): void
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

        // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
        $pattern_content = file_get_contents($pattern_path);
        if ($pattern_content === false) {
            return;
        }

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
    private function replace_random_numbers(string $content): string
    {
        $random_numbers = [];
        $content = preg_replace_callback('/{random_number}/', function () use (&$random_numbers) {
            static $counter = 0;
            $pair_index = intval($counter / 2);

            if (!isset($random_numbers[$pair_index])) {
                $random_numbers[$pair_index] = wp_rand(100, 1000);
            }

            $counter++;
            return $random_numbers[$pair_index];
        }, $content);

        return $content ?? '';
    }

    /**
     * Check if the current environment is development.
     */
    private function is_development_environment(): bool
    {
        return wp_get_environment_type() === 'local' || wp_get_environment_type() === 'development';
    }
}
