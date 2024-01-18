<?php

namespace RRZE\ElementsB;

defined('ABSPATH') || exit;

class Patterns
{
    public function __construct()
    {
        add_action('init', [$this, 'my_custom_wp_block_patterns'] );
    }

    public function my_custom_wp_block_patterns()
    {
        $plugin_relative_path = str_replace(trailingslashit(plugin_basename(dirname(__FILE__))), '', plugin_dir_url(__FILE__)) . 'assets/img/placeholder.jpg';
        $placeholder_image_url = $plugin_relative_path;
        Helper::debug($placeholder_image_url);
        register_block_pattern(
            'my-patterns/my-custom-pattern',
            array(
                'title'       => __('Transparent Cover', 'transparent-cover'),
                'description' => _x('Includes a cover block, two columns with headings and text, a separator and a single-column text block.', 'Block pattern description', 'page-intro-block'),
                'content'     => '<!-- wp:heading -->
            <h2 class="wp-block-heading">Forschung an der FAU</h2>
            <!-- /wp:heading -->
            
            <!-- wp:columns -->
            <div class="wp-block-columns"><!-- wp:column -->
            <div class="wp-block-column"><!-- wp:image {"id":1687,"sizeSlug":"large","linkDestination":"none"} -->
            <figure class=\"wp-block-image size-large\"><img src=\"{$placeholder_image_url}\" alt=\"Placeholder\" class=\"wp-image-1687\"/></figure>
            <!-- /wp:image --></div>
            <!-- /wp:column -->
            
            <!-- wp:column -->
            <div class="wp-block-column"><!-- wp:heading {"level":3} -->
            <h3 class="wp-block-heading">Schwerpunktthema 1</h3>
            <!-- /wp:heading -->
            
            <!-- wp:paragraph -->
            <p>Etwas Text um das Thema zu beschreiben</p>
            <!-- /wp:paragraph -->
            
            <!-- wp:rrze-elements/collapsibles {"hstart":4,"childrenCount":3} -->
            <div class="wp-block-rrze-elements-collapsibles"> <div class="accordion" id="accordion-0"><!-- wp:rrze-elements/collapse {"hstart":4,"title":"Forschung 1","color":"heller"} -->
            <div class="wp-block-rrze-elements-collapse"> <div class="accordion-group heller"><h4 class="accordion-heading"><span class="read-mode-only">Test </span><button class="accordion-toggle " data-toggle="collapse" data-name="collapse_0" href="#collapse_0"><span class=""></span>Forschung 1</button></h4><div id="collapse_0" class="accordion-body " name="collapse_0" style="display:none"><div class="accordion-inner clearfix"><!-- wp:paragraph -->
            <p>Etwas Blindtext, den Sie ersetzen sollten.</p>
            <!-- /wp:paragraph --></div></div></div></div>
            <!-- /wp:rrze-elements/collapse -->
            
            <!-- wp:rrze-elements/collapse {"hstart":4,"sameBlockCount":1,"title":"Forschung 2","color":"heller"} -->
            <div class="wp-block-rrze-elements-collapse"> <div class="accordion-group heller"><h4 class="accordion-heading"><span class="read-mode-only">Test </span><button class="accordion-toggle " data-toggle="collapse" data-name="collapse_1" href="#collapse_1"><span class=""></span>Forschung 2</button></h4><div id="collapse_1" class="accordion-body " name="collapse_1" style="display:none"><div class="accordion-inner clearfix"><!-- wp:paragraph -->
            <p>Etwas Blindtext, den Sie ersetzen sollten.</p>
            <!-- /wp:paragraph --></div></div></div></div>
            <!-- /wp:rrze-elements/collapse -->
            
            <!-- wp:rrze-elements/collapse {"hstart":4,"sameBlockCount":2,"title":"Forschung 3","color":"heller"} -->
            <div class="wp-block-rrze-elements-collapse"> <div class="accordion-group heller"><h4 class="accordion-heading"><span class="read-mode-only">Test </span><button class="accordion-toggle " data-toggle="collapse" data-name="collapse_2" href="#collapse_2"><span class=""></span>Forschung 3</button></h4><div id="collapse_2" class="accordion-body " name="collapse_2" style="display:none"><div class="accordion-inner clearfix"><!-- wp:paragraph -->
            <p>Etwas Blindtext, den Sie ersetzen sollten.</p>
            <!-- /wp:paragraph --></div></div></div></div>
            <!-- /wp:rrze-elements/collapse --></div></div>
            <!-- /wp:rrze-elements/collapsibles --></div>
            <!-- /wp:column --></div>
            <!-- /wp:columns -->',
                'categories'  => array('gallery'),
            )
        );
    }
}
