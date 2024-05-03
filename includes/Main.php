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
        $this->pluginFile = $pluginFile;
        add_action('wp_enqueue_scripts', [$this, 'enqueueScripts']);
        add_filter('wp_kses_allowed_html', [$this, 'extendKsesAllowedHtml'], 10, 1);
        add_filter('safe_style_css', [$this, 'extendAllowedCssStyles'], 10, 1);
    }

    function __destruct()
    {
        //add_filter('the_content', 'wpautop');
    }

    /**
     * Extends allowed HTML tags and attributes based on plugin needs.
     *
     * @param array $allowedtags Existing allowed tags configuration.
     * @return array Modified allowed tags configuration.
     */
    public function extendKsesAllowedHtml($allowedtags)
    {
        // Custom tags and attributes
        $custom_tags = [
            'div' => [
                'class' => true,
                'id' => true,
                'name' => true,
            ],
            'span' => [
                'class' => true,
                'tabindex' => true,
            ],
            'a' => [
                'href' => true,
                'title' => true,
                'class' => true,
            ],
            'button' => [
                'type' => true,
                'class' => true,
                'aria-controls' => true,
                'aria-expanded' => true,
                'aria-selected' => true,
                'tabindex' => true,
                'href' => true,
                'data-name' => true,
            ],
            // 'svg' => [
            //     'xmlns' => true,
            //     'fill' => true,
            //     'viewbox' => true,
            //     'role' => true,
            //     'aria-hidden' => true,
            //     'focusable' => true,
            //     'preserveaspectratio' => true,
            //     'style' => true,
            //     'class' => true,
            //     'alt' => true,
            //     'width' => true,
            //     'height' => true,
            //     'font-size' => true,
            // ],
            // 'path' => [
            //     'd' => true,
            //     'fill' => true,
            //     'fill-rule' => true,
            //     'clip-rule' => true,
            // ],
        ];

        // Merge with existing tags
        foreach ($custom_tags as $tag => $attributes) {
            $allowedtags[$tag] = $allowedtags[$tag] ?? [];
            foreach ($attributes as $attr => $value) {
                if (!isset($allowedtags[$tag][$attr])) {
                    $allowedtags[$tag][$attr] = $value;
                }
            }
        }

        return $allowedtags;
    }

    public function extendAllowedCssStyles($styles)
    {
        $custom_styles = ['display', 'fill', 'margin', 'padding', 'color', 'background-color', 'font-size'];
        return array_merge($styles, $custom_styles);
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
            plugins_url('assets/js/accordion/rrze-accordion-min.js', plugin_basename($this->pluginFile)),
            ['jquery', 'wp-i18n'],
            RRZE_ELEMENTSB_VERSION
        );
        wp_register_script(
            'rrze-tabs',
            plugins_url('assets/js/tabs/rrze-tabs-min.js', plugin_basename($this->pluginFile)),
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
