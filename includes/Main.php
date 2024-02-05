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
        new Sanitize();
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
            plugins_url('assets/js/accordion/rrze-accordion.min.js', plugin_basename($this->pluginFile)),
            ['jquery', 'wp-i18n'],
            RRZE_ELEMENTSB_VERSION
        );
    
        wp_register_script(
            'rrze-tabs',
            plugins_url('assets/js/tabs/rrze-tabs.min.js', plugin_basename($this->pluginFile)),
            ['jquery'],
            RRZE_ELEMENTSB_VERSION
        );    
    }
}
