<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

use RRZE\ElementsBlocks\BlockFrontend\Tab as TabRender;
use RRZE\ElementsBlocks\BlockFrontend\Tabs as TabsRender;
use RRZE\ElementsBlocks\FrontendAssets;

defined('ABSPATH') || exit;

/**
 * Adapts [tabs] and [tab] to the shared Tabs and Tab block renderers.
 *
 * @see \RRZE\ElementsBlocks\BlockFrontend\Tabs::render()
 * @see \RRZE\ElementsBlocks\BlockFrontend\Tab::render()
 */
class Tab implements ShortcodeAdapter
{
    private ContextStack $contexts;

    /** @var array<string, string> */
    private const COLORS = [
        'primary' => 'primary',
        'fau' => 'zentral',
        'zuv' => 'zentral',
        'phil' => 'phil',
        'nat' => 'nat',
        'med' => 'med',
        'rw' => 'rw',
        'tf' => 'tf',
    ];

    public function __construct()
    {
        $this->contexts = new ContextStack();
    }

    /**
     * @return array<string, callable>
     */
    public function getShortcodes(): array
    {
        return [
            'tabs' => [$this, 'shortcodeTabs'],
            'tab' => [$this, 'shortcodeTab'],
        ];
    }

    public function enqueueAssets(): void
    {
        // Request the script only when a tab group actually renders.
        wp_enqueue_style(FrontendAssets::STYLE);
    }

    /**
     * @param array<string, string>|string $atts WordPress may pass an empty string.
     */
    public function shortcodeTabs(array|string $atts = [], ?string $content = '', string $tag = ''): string
    {
        $args = shortcode_atts([
            'color' => 'primary',
            'hstart' => '2',
        ], is_array($atts) ? $atts : [], $tag);

        $headingLevel = (int)$args['hstart'];
        if ($headingLevel < 1 || $headingLevel > 6) {
            $headingLevel = 2;
        }
        $context = new TabContext(wp_unique_id('legacy-tabs-'), $headingLevel);
        $this->contexts->push($context);
        try {
            // Child callbacks collect navigation while rendering their content exactly once.
            $body = $this->normalizeTabSeparators(shortcode_unautop(trim($content ?? '')));
            $innerContent = do_shortcode($body);
        } finally {
            $this->contexts->pop();
        }

        $tabs = $context->getTabs();
        if ($tabs === []) {
            return $innerContent;
        }

        FrontendAssets::enqueueTabs();

        return (new TabsRender())->render([
            'className' => 'wp-block-rrze-elements-tabs',
            'blockId' => $context->getId(),
            'color' => self::COLORS[$args['color']] ?? 'primary',
            'active' => $tabs[0]['clientId'],
            'innerClientIds' => $tabs,
        ], $innerContent);
    }

    /**
     * @param array<string, string>|string $atts WordPress may pass an empty string.
     */
    public function shortcodeTab(array|string $atts = [], ?string $content = '', string $tag = ''): string
    {
        $context = $this->contexts->current();
        if (!$context instanceof TabContext) {
            return do_shortcode(shortcode_unautop($content ?? ''));
        }

        $args = shortcode_atts([
            'title' => '',
            'icon' => '',
            'suffix' => '',
        ], is_array($atts) ? $atts : [], $tag);
        $title = sanitize_text_field($args['title']);
        if ($title === '') {
            $title = sprintf(__('Tab %d', 'rrze-elements-blocks'), count($context->getTabs()) + 1);
        }
        $id = wp_unique_id('legacy-tab-');
        $materialSymbol = (new Icon())->getMaterialSymbol($args['icon']);
        $context->addTab($id, $title, $materialSymbol, sanitize_text_field($args['suffix']));

        $body = wpautop(trim($content ?? ''));
        $innerContent = do_shortcode(shortcode_unautop($body));

        return (new TabRender())->render([
            'tabsUid' => $context->getId(),
            'tabId' => $id,
            'title' => $title,
            'headingLevel' => $context->getHeadingLevel(),
            'printMaterialSymbol' => $materialSymbol,
        ], $innerContent);
    }

    private function normalizeTabSeparators(string $content): string
    {
        // wpautop runs before shortcode rendering and treats [tab] as plain text.
        // Remove its formatting only before the first tab, between tabs and after
        // the last tab; line breaks and paragraphs inside a tab remain untouched.
        $spacing = '(?:\s|<br\s*/?>|</?p>)+';
        $nextTab = '\[tab(?:\s|/|\])';
        $content = preg_replace('~\A' . $spacing . '(?=' . $nextTab . ')~i', '', $content) ?? $content;

        return preg_replace(
            '~(\[/tab\])' . $spacing . '(?=' . $nextTab . '|\z)~i',
            '$1',
            $content
        ) ?? $content;
    }
}
