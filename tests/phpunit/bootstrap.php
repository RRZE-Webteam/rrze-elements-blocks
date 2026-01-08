<?php

declare(strict_types=1);

// Minimal WordPress-style environment for unit tests.
if (!defined('ABSPATH')) {
    define('ABSPATH', dirname(__DIR__, 2) . '/');
}
if (!defined('WP_CONTENT_DIR')) {
    define('WP_CONTENT_DIR', ABSPATH . 'wp-content');
}
if (!defined('WP_PLUGIN_DIR')) {
    define('WP_PLUGIN_DIR', ABSPATH . 'wp-content/plugins');
}

require_once dirname(__DIR__, 2) . '/vendor/autoload.php';

$GLOBALS['wp_theme_data'] = [
    'name' => 'FAU-Elemental',
    'stylesheet' => 'FAU-Elemental',
    'template' => 'FAU-Elemental',
];
$GLOBALS['shortcode_tags'] = [];

function __($text, $domain = null): string
{
    return (string)$text;
}

function _x($text, $context = '', $domain = null): string
{
    return (string)$text;
}

function esc_html__($text, $domain = null): string
{
    return esc_html($text);
}

function esc_attr($text): string
{
    return is_scalar($text) ? (string)$text : '';
}

function esc_html($text): string
{
    return htmlspecialchars(is_scalar($text) ? (string)$text : '', ENT_QUOTES, 'UTF-8');
}

function esc_url($url): string
{
    $url = is_scalar($url) ? (string)$url : '';
    return filter_var($url, FILTER_SANITIZE_URL) ?: '';
}

function esc_url_raw($url): string
{
    return esc_url($url);
}

function sanitize_text_field($text): string
{
    $text = is_scalar($text) ? (string)$text : '';
    $text = strip_tags($text);
    $text = preg_replace('/[\r\n\t]+/', ' ', $text) ?? '';
    return trim($text);
}

function sanitize_textarea_field($text): string
{
    return sanitize_text_field($text);
}

function sanitize_html_class($class, $fallback = ''): string
{
    $class = is_scalar($class) ? (string)$class : '';
    $sanitized = preg_replace('/[^A-Za-z0-9_-]/', '', $class);
    $sanitized = $sanitized ?? '';
    return $sanitized === '' ? $fallback : $sanitized;
}

function sanitize_title_with_dashes($title): string
{
    $title = is_scalar($title) ? strtolower((string)$title) : '';
    $title = preg_replace('/[^a-z0-9_\-]+/', '-', $title);
    return trim((string)($title ?? ''), '-');
}

function sanitize_title($title): string
{
    return sanitize_title_with_dashes($title);
}

function sanitize_key($key): string
{
    return preg_replace('/[^a-z0-9_]/', '', strtolower((string)$key)) ?? '';
}

function sanitize_text_field_deep($value)
{
    return is_array($value) ? array_map('sanitize_text_field_deep', $value) : sanitize_text_field($value);
}

function wp_strip_all_tags($text): string
{
    return strip_tags((string)$text);
}

function absint($value): int
{
    if (is_bool($value)) {
        $value = (int)$value;
    }
    return (int)max(0, (int)$value);
}

function esc_html_x($text, $context = '', $domain = null): string
{
    return esc_html($text);
}

function esc_attr__($text, $domain = null): string
{
    return esc_attr($text);
}

function wp_kses_post($text): string
{
    return is_scalar($text) ? (string)$text : '';
}

function wp_kses($text, array $allowed_tags): string
{
    $allowed = '<' . implode('><', array_keys($allowed_tags)) . '>';
    return strip_tags((string)$text, $allowed);
}

function wp_kses_data($text): string
{
    return wp_kses_post($text);
}

function wp_json_encode($data): string
{
    return json_encode($data, JSON_THROW_ON_ERROR);
}

function wp_generate_uuid4(): string
{
    return '00000000-0000-4000-8000-000000000000';
}

function wp_rand(int $min, int $max): int
{
    return random_int($min, $max);
}

function add_action($hook, $callback, $priority = 10, $accepted_args = 1): void {}
function add_filter($hook, $callback, $priority = 10, $accepted_args = 1): void {}
function wp_enqueue_style($handle, $src = '', $deps = [], $ver = false, $media = 'all'): void {}
function wp_enqueue_script($handle, $src = '', $deps = [], $ver = false, $in_footer = false): void {}
function wp_register_style($handle, $src = '', $deps = [], $ver = false, $media = 'all'): void {}
function wp_register_script($handle, $src = '', $deps = [], $ver = false, $in_footer = false): void {}
function load_plugin_textdomain($domain, $deprecated = false, $plugin_rel_path = ''): void {}
function wp_set_script_translations($handle, $domain, $path = ''): void {}
function register_block_type($path, array $args = []): void {}
function register_block_style($name, array $args): void {}
function register_block_pattern($name, array $args): void {}
function register_block_pattern_category($slug, array $args): void {}
function register_rest_route($namespace, $route, array $args): void {}

class WP_REST_Response
{
    public function __construct(private mixed $data) {}

    public function get_data(): mixed
    {
        return $this->data;
    }
}

function rest_ensure_response($data): WP_REST_Response
{
    return new WP_REST_Response($data);
}

function plugin_dir_path($file): string
{
    return rtrim(dirname((string)$file), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
}

function plugin_dir_url($file): string
{
    return 'https://example.com/plugins/' . basename(dirname((string)$file)) . '/';
}

function plugin_basename($file): string
{
    $file = str_replace('\\', '/', (string)$file);
    $dir = basename(dirname($file));
    $base = basename($file);
    return ($dir !== '' ? $dir . '/' : '') . $base;
}

function plugins_url($path = '', $plugin = ''): string
{
    return 'https://example.com/' . ltrim((string)$path, '/');
}

function generate_block_asset_handle($name, $type): string
{
    return $name . '-' . $type;
}

function is_404(): bool
{
    return false;
}

function is_search(): bool
{
    return false;
}

function is_network_admin(): bool
{
    return false;
}

function is_plugin_active($plugin): bool
{
    return false;
}

function wp_get_environment_type(): string
{
    return 'development';
}

function wp_get_theme()
{
    $data = $GLOBALS['wp_theme_data'];
    return new class($data) {
        public function __construct(private array $data) {}
        public function get($field)
        {
            if ($field === 'Name') {
                return $this->data['name'];
            }
            return '';
        }
        public function get_stylesheet()
        {
            return $this->data['stylesheet'];
        }
        public function get_template()
        {
            return $this->data['template'];
        }
    };
}

class WP_Term
{
    public function __construct(public int $term_id) {}
}

class WP_Post {}

function get_category_by_slug($slug)
{
    return new WP_Term(123);
}

function do_blocks($content): string
{
    return '[rendered]' . $content;
}

function wpautop(string $text, bool $br = true): string
{
    return $text;
}

function wp_json_decode($json, $assoc = false)
{
    return json_decode($json, $assoc, 512, JSON_THROW_ON_ERROR);
}

function wp_generate_password($length = 12, $special_chars = true, $extra_special_chars = false): string
{
    return str_repeat('a', $length);
}

function register_nav_menu($location, $description): void {}

function wp_kses_allowed_html($context = ''): array
{
    return [];
}

function wp_get_current_user()
{
    return (object)['ID' => 1];
}

function get_the_ID(): int
{
    return 123;
}

function get_post_meta($post_id, $key, $single = false)
{
    if ($key === 'fauval_langcode') {
        return 'en';
    }
    return '';
}

function wp_enqueue_media(): void {}

function shortcode_exists($tag): bool
{
    return isset($GLOBALS['shortcode_tags'][$tag]);
}

function add_shortcode($tag, $callback): void
{
    $GLOBALS['shortcode_tags'][$tag] = $callback;
}

function remove_shortcode($tag): void
{
    unset($GLOBALS['shortcode_tags'][$tag]);
}

function shortcode_atts($pairs, $atts, $shortcode = ''): array
{
    $atts = (array)$atts;
    $out = $pairs;
    foreach ($atts as $name => $value) {
        if (array_key_exists($name, $pairs)) {
            $out[$name] = $value;
        }
    }
    return $out;
}

function shortcode_unautop($string): string
{
    return (string)$string;
}

function do_shortcode($content): string
{
    return (string)$content;
}

function wp_enqueue_editor(): void {}

function wp_kses_one_attr($string, $allowed_html): string
{
    return $string;
}

function wp_safe_remote_get($url, $args = [])
{
    return null;
}

function wp_remote_retrieve_body($response)
{
    return '';
}

function get_file_data($file, $headers, $context = ''): array
{
    $data = [];
    foreach ($headers as $field => $value) {
        $data[$field] = '1.0.0';
    }
    return $data;
}

function load_textdomain($domain, $mofile): bool
{
    return true;
}

function rest_url($path = '', $scheme = 'rest'): string
{
    return 'https://example.com/wp-json/' . ltrim($path, '/');
}

function wp_parse_args($args, $defaults = []): array
{
    return array_merge($defaults, (array)$args);
}
