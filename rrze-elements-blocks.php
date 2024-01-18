<?php

/*
Plugin Name:     RRZE Elements Blocks
Plugin URI:      https://github.com/RRZE-Webteam/rrze-elements
Description:     Advanced design elements for WordPress BlockEditor.
Version:         0.0.1
Author:          RRZE Webteam
Author URI:      https://blogs.fau.de/webworking/
License:         GNU General Public License v2
License URI:     http://www.gnu.org/licenses/gpl-2.0.html
Domain Path:     /languages
Text Domain:     rrze-elementsB
*/

namespace RRZE\ElementsB;
use RRZE\Elements\News\News;

defined('ABSPATH') || exit;

require_once 'config/config.php';

use RRZE\ElementsB\Main;

const RRZE_PHP_VERSION = '8.0';
const RRZE_WP_VERSION = '6.0';
const RRZE_ELEMENTS_VERSION = '1.0.0';

spl_autoload_register(function ($class) {
    $prefix = __NAMESPACE__;
    $base_dir = __DIR__ . '/includes/';

    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }

    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});

register_activation_hook(__FILE__, __NAMESPACE__ . '\activation');
register_deactivation_hook(__FILE__, __NAMESPACE__ . '\deactivation');
add_action('plugins_loaded', __NAMESPACE__ . '\loaded');

register_activation_hook(__FILE__, 'RRZE\ElementsB\activation');
register_deactivation_hook(__FILE__, 'RRZE\ElementsB\deactivation');

add_action('plugins_loaded', 'RRZE\ElementsB\loaded');

/**
 * [loadTextdomain description]
 * @return void
 */
function loadTextdomain()
{
    load_plugin_textdomain('rrze-elementsB', false, sprintf('%s/languages/', dirname(plugin_basename(__FILE__))));
}

/**
 * [systemRequirements description]
 * @return string [description]
 */
function systemRequirements()
{
    $error = '';
    if (version_compare(PHP_VERSION, RRZE_PHP_VERSION, '<')) {
        $error = sprintf(__('The server is running PHP version %1$s. The Plugin requires at least PHP version %2$s.', 'rrze-elementsB'), PHP_VERSION, RRZE_PHP_VERSION);
    } elseif (version_compare($GLOBALS['wp_version'], RRZE_WP_VERSION, '<')) {
        $error = sprintf(__('The server is running WordPress version %1$s. The Plugin requires at least WordPress version %2$s.', 'rrze-elementsB'), $GLOBALS['wp_version'], RRZE_WP_VERSION);
    }
    return $error;
}

/**
 * [activation description]
 * @return void
 */
function activation()
{
    loadTextdomain();

    if ($error = systemRequirements()) {
        deactivate_plugins(plugin_basename(__FILE__), false, true);
        wp_die($error);
    }
}

/**
 * [deactivation description]
 * @return [type] [description]
 */
function deactivation()
{
}

function render_news_block($attributes) {
    Helper::debug(get_option('home'));
    if (class_exists('RRZE\Elements\News\News')) {
        $news_instance = new News();
        return $news_instance->shortcodeCustomNews($attributes);
    }
    
    return '';
}

/**
 * Register Block
 *
 * @return void
 */
function rrze_rrze_elements_block_init() {
    register_block_type( __DIR__ . '/build/collapsibles');
    register_block_type( __DIR__ . '/build/collapse');
    register_block_type( __DIR__ . '/build/accordions');
    register_block_type( __DIR__ . '/build/accordion');
    register_block_type( __DIR__ . '/build/alert');
    register_block_type( __DIR__ . '/build/notice');
    register_block_type( __DIR__ . '/build/tabs');
    register_block_type( __DIR__ . '/build/tab');
    register_block_type( __DIR__ . '/build/cta');
    register_block_type( __DIR__ . '/build/insertion');
    register_block_type( __DIR__ . '/build/contentwidthlimiter');
    // register_block_type( __DIR__ . '/build/textslider');
    // register_block_type( __DIR__ . '/build/textslideritem');
    register_block_type( __DIR__ . '/build/columns');
    if (class_exists('RRZE\Elements\News\News')) {
        register_block_type( __DIR__ . '/build/news', array(
            'render_callback' => 'RRZE\ElementsB\render_news_block',
        ));
    }

    wp_enqueue_style('fontawesome');
    wp_enqueue_style('rrze-elements-blocks');
}

/**
 * [loaded description]
 * @return void
 */
function loaded()
{
    loadTextdomain();

    if ($error = systemRequirements()) {
        if (!function_exists('get_plugin_data')) {
            require_once(ABSPATH . 'wp-admin/includes/plugin.php');
        }
        $plugin_data = get_plugin_data(__FILE__);
        $plugin_name = $plugin_data['Name'];
        $tag = is_network_admin() ? 'network_admin_notices' : 'admin_notices';
        add_action($tag, function () use ($plugin_name, $error) {
            printf('<div class="notice notice-error"><p>%1$s: %2$s</p></div>', esc_html($plugin_name), esc_html($error));
        });
    } else {
        new Main(__FILE__);
        new Patterns();
        add_action( 'init', 'RRZE\ElementsB\rrze_rrze_elements_block_init' );
        add_action('rest_api_init', function () {
            register_rest_route('rrze-elements-blocks/v1', '/plugin-directory', array(
                'methods' => 'GET',
                'callback' => function () {
                    return array(
                        'directory' => plugin_dir_url(__FILE__)
                    );
                },
                'permission_callback' => '__return_true',
            ));
        });
    }

}