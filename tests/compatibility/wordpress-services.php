<?php

declare(strict_types=1);

// Only environment services are substituted. Parsing, shortcode registration,
// hook dispatch, escaping, formatting and the plugin renderers use original code.
function __($text, $domain = null): string
{
    return (string)$text;
}

function esc_html__($text, $domain = null): string
{
    return esc_html(__($text, $domain));
}

function get_option($name, $default = false)
{
    return $name === 'blog_charset' ? 'UTF-8' : $default;
}

function is_utf8_charset($charset = null): bool
{
    return in_array(strtolower((string)($charset ?? get_option('blog_charset'))), ['utf8', 'utf-8'], true);
}

function _canonical_charset($charset): string
{
    return is_utf8_charset($charset) ? 'UTF-8' : (string)$charset;
}

function get_locale(): string
{
    return 'en_US';
}

// PHP 8 removed mbstring.func_overload; no encoding switch is needed here.
function mbstring_binary_safe_encoding($reset = false): void {}
function reset_mbstring_encoding(): void {}

function get_the_ID(): int
{
    return 1;
}

function get_post_meta($postId, $key = '', $single = false)
{
    return $single ? '' : [];
}

function wp_enqueue_style($handle, $src = '', $deps = [], $ver = false, $media = 'all'): void
{
    $GLOBALS['compat_enqueued_styles'][] = $handle;
}

function wp_enqueue_script($handle, $src = '', $deps = [], $ver = false, $in_footer = false): void
{
    $GLOBALS['compat_enqueued_scripts'][] = $handle;
}

function wp_allowed_protocols(): array
{
    return ['http', 'https', 'mailto', 'tel'];
}

function attachment_url_to_postid($url): int
{
    return 0;
}

function absint($value): int
{
    return abs((int)$value);
}

function wp_unique_id($prefix = ''): string
{
    static $id = 0;
    return $prefix . ++$id;
}
