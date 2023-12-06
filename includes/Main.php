<?php

namespace RRZE\ElementsB;

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
            RRZE_ELEMENTS_VERSION
        );
    }
}
