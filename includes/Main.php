<?php

namespace RRZE\ElementsBlocks;

use const RRZE\ElementsBlocks\RRZE_ELEMENTSB_VERSION;

defined('ABSPATH') || exit;

/**
 * [Main description]
 */
class Main
{
    /**
     * [protected description]
     * @var string
     */
    protected $pluginFile;
    protected bool $is_gutenberg_enabled = false;

    /**
     * [__construct description]
     * @param string $pluginFile [description]
     */
    public function __construct($pluginFile)
    {
        $this->pluginFile = $pluginFile;
        SpriteGenerator::setAssetPath( plugin_dir_path(plugin_dir_path( __DIR__ ) . 'src/_shared/icons/svgs' ) );

        add_action('wp_enqueue_scripts', [$this, 'enqueueScripts'], 5);

        new Blocks();
        new Patterns();
        Filters::register();

        add_action('rest_api_init', function () {
            register_rest_route('rrze-elements-blocks/v1', '/jump-names', [
                'methods' => 'GET',
                'callback' => [$this, 'getJumpNames'],
                'permission_callback' => '__return_true',
            ]);
        });
    }

    public function getJumpNames(): \WP_REST_Response
    {
        return rest_ensure_response(['panel_abc123', 'panel_xyz456']);
    }


    /**
     * [enqueueScripts description]
     * @return void
     */
    public function enqueueScripts()
    {
        if (is_404() || is_search()) {
            return;
        }

        wp_register_style(
            'rrze-elements-blocks',
            plugins_url('assets/css/rrze-elements-blocks.css', plugin_basename($this->pluginFile)),
            [],
            RRZE_ELEMENTSB_VERSION
        );

        wp_register_style(
            'rrze-elements-blocks-fau-elemental-compatibility',
            plugins_url('assets/css/rrze-elements-blocks-elemental-compatibility.css', plugin_basename($this->pluginFile)),
            [],
            RRZE_ELEMENTSB_VERSION
        );

        wp_register_script(
            'rrze-accordions',
            plugins_url('assets/js/accordion/rrze-accordion.min.js', plugin_basename($this->pluginFile)),
            ['jquery', 'wp-i18n'],
            RRZE_ELEMENTSB_VERSION,
            true
        );
        wp_register_script(
            'rrze-media-accordion',
            plugins_url('assets/js/media-accordion/rrze-media-accordion.min.js', plugin_basename($this->pluginFile)),
            ['rrze-accordions'],
            (string)(filemtime(
                plugin_dir_path($this->pluginFile) . 'assets/js/media-accordion/rrze-media-accordion.min.js'
            ) ?: RRZE_ELEMENTSB_VERSION),
            true
        );
        wp_register_script(
            'rrze-tabs',
            plugins_url('assets/js/tabs/rrze-tabs.min.js', plugin_basename($this->pluginFile)),
            ['jquery'],
            RRZE_ELEMENTSB_VERSION,
            true
        );
        wp_register_script(
            'rrze-gsap',
            plugins_url('assets/js/gsap/gsap.min.js', plugin_basename($this->pluginFile)),
            [],
            RRZE_ELEMENTSB_VERSION,
            true
        );
        wp_register_script(
            'rrze-gsap-scrolltrigger',
            plugins_url('assets/js/gsap/ScrollTrigger.min.js', plugin_basename($this->pluginFile)),
            ['rrze-gsap'],
            RRZE_ELEMENTSB_VERSION,
            true
        );
        wp_register_script(
            'rrze-gsap-scrolltoplugin',
            plugins_url('assets/js/gsap/ScrollToPlugin.min.js', plugin_basename($this->pluginFile)),
            ['rrze-gsap'],
            RRZE_ELEMENTSB_VERSION,
            true
        );
        wp_register_script(
            'rrze-counter',
            plugins_url('assets/js/counter/rrze-counter.min.js', plugin_basename($this->pluginFile)),
            ['rrze-gsap-scrolltrigger'],
            RRZE_ELEMENTSB_VERSION,
            true
        );
        wp_register_script(
            'rrze-timeline',
            plugins_url('assets/js/timeline/rrze-timeline.min.js', plugin_basename($this->pluginFile)),
            ['rrze-gsap-scrolltrigger'],
            RRZE_ELEMENTSB_VERSION,
            true
        );
        wp_register_script(
            'rrze-scrollstories',
            plugins_url('assets/js/scrollstories/scrollstories.js', plugin_basename($this->pluginFile)),
            ['rrze-gsap-scrolltrigger'],
            RRZE_ELEMENTSB_VERSION,
            true
        );
        wp_register_script(
            'rrze-carousel',
            plugins_url('assets/js/carousel/rrze-carousel.min.js', plugin_basename($this->pluginFile)),
            ['rrze-gsap-scrolltrigger', 'rrze-gsap-scrolltoplugin'],
            RRZE_ELEMENTSB_VERSION,
            true
        );
        wp_set_script_translations(
            'rrze-accordions',
            'rrze-elements-blocks',
            plugin_dir_path($this->pluginFile) . 'languages'
        );
    }
}
