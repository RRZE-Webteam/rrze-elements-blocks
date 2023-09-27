<?php

namespace RRZE\ElementsB;

defined('ABSPATH') || exit;

/**
 * This class helps sanitize TextInput fields from the RRZE Elements blocks. Uses the WordPress RestAPI to sanitize the title attribute.
 */
class Sanitize
{
    public function __construct()
    {
        $this->sanitizeViaRest();
    }

    public function sanitizeViaRest()
    {
        // Get all public custom post types
        $post_types = get_post_types(['_builtin' => false, 'public' => true], 'names');

        $builtin_types = ['post', 'page'];
        $post_types = array_merge($post_types, $builtin_types);

        foreach ($post_types as $post_type) {
            add_filter("rest_prepare_{$post_type}", [$this, 'sanitize_title_attribute'], 10, 3);
        }
    }

    public function sanitize_title_attribute($response, $post, $request)
    {
        // Helper::debug($request->get_params());
        if (isset($response->data['content']['rendered'])) {
            $content = $response->data['content']['rendered'];

            // Use regex to find the block content and sanitize the title
            $content = preg_replace_callback(
                '/<!-- wp:rrze-elements\/collapse .*? "title":"(.*?)".*? -->/',
                function ($matches) {
                    // Sanitize the title value
                    $sanitized_title = sanitize_text_field($matches[1]);

                    // Replace the original title value with the sanitized one in the entire block string
                    return str_replace($matches[1], $sanitized_title, $matches[0]);
                },
                $content
            );

            $response->data['content']['rendered'] = $content;
            return $response;
        }
    }
}
