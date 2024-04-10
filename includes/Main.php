<?php

namespace RRZE\ElementsB;
use const RRZE\ElementsB\RRZE_ELEMENTSB_VERSION;

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

    /**
     * [__construct description]
     * @param string $pluginFile [description]
     */
    public function __construct($pluginFile)
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueueScripts']);

        $this->pluginFile = $pluginFile;
    }

    function __destruct()
    {
        //add_filter('the_content', 'wpautop');
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
    
        wp_register_script(
            'rrze-accordions',
            plugins_url('assets/js/accordion/rrze-accordion.js', plugin_basename($this->pluginFile)),
            ['jquery', 'wp-i18n'],
            RRZE_ELEMENTSB_VERSION
        );
    
        wp_register_script(
            'rrze-tabs',
            plugins_url('assets/js/tabs/rrze-tabs.min.js', plugin_basename($this->pluginFile)),
            ['jquery'],
            RRZE_ELEMENTSB_VERSION
        );    
     
        wp_register_script(
            'rrze-gsap',
            plugins_url('assets/js/gsap/gsap.min.js', plugin_basename($this->pluginFile)),
            [],
            RRZE_ELEMENTSB_VERSION
        );
        wp_register_script(
            'rrze-gsap-scrolltrigger',
            plugins_url('assets/js/gsap/ScrollTrigger.min.js', plugin_basename($this->pluginFile)),
            ['rrze-gsap'],
            RRZE_ELEMENTSB_VERSION,
            true // Assuming you want it in the footer
        );
        wp_register_script(
            'rrze-counter',
            plugins_url('assets/js/counter/rrze-counter.js', plugin_basename($this->pluginFile)),
            ['rrze-gsap-scrolltrigger'],
            RRZE_ELEMENTSB_VERSION
        );
        wp_register_script(
            'rrze-scrollstories',
            plugins_url('assets/js/scrollstories/scrollstories.js', plugin_basename($this->pluginFile)),
            ['rrze-gsap-scrolltrigger'],
            RRZE_ELEMENTSB_VERSION
        );
    }
}
