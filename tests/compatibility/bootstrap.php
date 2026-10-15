<?php

declare(strict_types=1);

// Load WordPress's real shortcode, hook and formatting APIs without wp-load.php,
// a database, a theme or unrelated plugins. Do not include the unit-test bootstrap:
// its do_shortcode() stub cannot reproduce callbacks changing during rendering.
$pluginRoot = dirname(__DIR__, 2);
$wordpressRoot = rtrim(getenv('WP_CORE_DIR') ?: dirname($pluginRoot, 3), '/');
$legacyRoot = rtrim(getenv('RRZE_ELEMENTS_DIR') ?: dirname($pluginRoot) . '/rrze-elements', '/');

foreach ([
    $wordpressRoot . '/wp-includes/shortcodes.php' => 'WP_CORE_DIR must point to a WordPress checkout.',
    $legacyRoot . '/includes/Icon/Icon.php' => 'RRZE_ELEMENTS_DIR must point to the legacy rrze-elements plugin.',
] as $file => $help) {
    if (!is_readable($file)) {
        throw new RuntimeException('Missing compatibility-test dependency: ' . $file . ' ' . $help);
    }
}

define('ABSPATH', $wordpressRoot . '/');
define('WPINC', 'wp-includes');
define('RRZE_ELEMENTS_COMPAT_PLUGIN_FILE', $legacyRoot . '/rrze-elements.php');

require $pluginRoot . '/vendor/autoload.php';
require __DIR__ . '/wordpress-services.php';
require ABSPATH . WPINC . '/compat.php';
require ABSPATH . WPINC . '/plugin.php';
// WordPress 6.9+ moved UTF-8 helpers into a separate file.
if (is_readable(ABSPATH . WPINC . '/utf8.php')) {
    require ABSPATH . WPINC . '/utf8.php';
}
require ABSPATH . WPINC . '/formatting.php';
require ABSPATH . WPINC . '/kses.php';
require ABSPATH . WPINC . '/shortcodes.php';

spl_autoload_register(static function (string $class) use ($legacyRoot): void {
    $prefix = 'RRZE\\Elements\\';
    if (!str_starts_with($class, $prefix)) {
        return;
    }

    $path = $legacyRoot . '/includes/' . str_replace('\\', '/', substr($class, strlen($prefix))) . '.php';
    if (is_readable($path)) {
        require_once $path;
    }
});
