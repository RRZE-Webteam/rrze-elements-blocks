<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

use RRZE\ElementsBlocks\BlockFrontend\Notice as NoticeRender;
use RRZE\ElementsBlocks\FrontendAssets;

defined('ABSPATH') || exit;

/**
 * Adapts legacy notice tags and attributes to the shared Notice block renderer.
 */
class Notices implements ShortcodeAdapter
{
    /** @var array<string, string> Legacy tag => block variation. */
    private const VARIATIONS = [
        'notice-attention' => 'notice-attention',
        'notice-hinweis' => 'notice-hinweis',
        'notice-baustelle' => 'notice-baustelle',
        'notice-question' => 'notice-question',
        'notice-minus' => 'notice-minus',
        'notice-plus' => 'notice-plus',
        'notice-tipp' => 'notice-idea',
        'notice-download' => 'notice-download',
        'notice-faubox' => 'notice-faubox',
        'notice-audio' => 'notice-audio',
        'notice-video' => 'notice-video',
        'notice-thumbs-up' => 'notice-thumbs-up',
        'notice-thumbs-down' => 'notice-thumbs-down',
        'notice-alert' => 'notice-attention',
        'attention' => 'notice-attention',
        'hinweis' => 'notice-hinweis',
        'baustelle' => 'notice-baustelle',
        'question' => 'notice-question',
        'minus' => 'notice-minus',
        'plus' => 'notice-plus',
    ];

    /**
     * @return array<string, callable>
     */
    public function getShortcodes(): array
    {
        $shortcodes = [];
        foreach (array_keys(self::VARIATIONS) as $tag) {
            $shortcodes[$tag] = [$this, 'shortcodeNotice'];
        }

        return $shortcodes;
    }

    public function enqueueAssets(): void
    {
        wp_enqueue_style(FrontendAssets::STYLE);
    }

    /**
     * @param array<string, string>|string $atts WordPress may pass an empty string
     */
    public function shortcodeNotice(array|string $atts = [], ?string $content = '', string $tag = ''): string
    {
        $args = shortcode_atts([
            'title' => '',
            'hstart' => '3',
        ], is_array($atts) ? $atts : [], $tag);

        $title = sanitize_text_field($args['title']);
        $headingLevel = (int)$args['hstart'];
        if ($headingLevel < 1 || $headingLevel > 6) {
            $headingLevel = 3;
        }

        $innerContent = '';
        if ($title !== '') {
            $innerContent = '<h' . $headingLevel . ' class="wp-block-heading">'
                . esc_html($title) . '</h' . $headingLevel . '>';
        }

        // Format before expanding shortcodes so their generated HTML stays intact.
        $body = wpautop(trim($content ?? ''));
        $innerContent .= do_shortcode(shortcode_unautop($body));

        $this->enqueueAssets();

        return (new NoticeRender())->render([
            'style' => self::VARIATIONS[$tag] ?? 'notice-hinweis',
        ], $innerContent);
    }
}
