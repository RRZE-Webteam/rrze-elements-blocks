<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

use RRZE\ElementsBlocks\BlockFrontend\Timeline as TimelineRender;
use RRZE\ElementsBlocks\BlockFrontend\TimelineItem as TimelineItemRender;
use RRZE\ElementsBlocks\FrontendAssets;

defined('ABSPATH') || exit;

/** Adapts the nested timeline shortcodes to the shared vertical block design. */
class Timeline implements ShortcodeAdapter
{
    private ContextStack $contexts;

    /** @var array<string, bool> */
    private array $usedAnchors = [];

    /** Initializes request-local parent context tracking. */
    public function __construct()
    {
        $this->contexts = new ContextStack();
    }

    /**
     * Returns both callbacks so the registrar replaces the family atomically.
     *
     * @return array<string, callable>
     */
    public function getShortcodes(): array
    {
        return [
            'timeline' => [$this, 'shortcodeTimeline'],
            'timeline-item' => [$this, 'shortcodeTimelineItem'],
        ];
    }

    /** Requests shared styles early; animations are requested only when rendered. */
    public function enqueueAssets(): void
    {
        wp_enqueue_style(FrontendAssets::STYLE);
    }

    /**
     * Renders child entries once inside the shared vertical timeline.
     *
     * @param array<string, string>|string $atts Shortcode attributes, or WordPress's empty string.
     * @param string|null $content Enclosed item shortcodes and their content.
     * @param string $tag Registered shortcode name.
     * @return string Rendered timeline, or preserved content when there are no items.
     */
    public function shortcodeTimeline(array|string $atts = [], ?string $content = '', string $tag = ''): string
    {
        // Slider settings intentionally have no effect on the vertical block design.
        $args = shortcode_atts(['hstart' => '3'], is_array($atts) ? $atts : [], $tag);
        $headingLevel = (int)$args['hstart'];
        if ($headingLevel < 1 || $headingLevel > 6) {
            $headingLevel = 3;
        }
        $context = new TimelineContext($headingLevel);
        $this->contexts->push($context);
        try {
            $body = $this->normalizeItemSeparators(shortcode_unautop(trim($content ?? '')));
            $innerContent = do_shortcode($body);
        } finally {
            $this->contexts->pop();
        }

        if (!$context->hasItems()) {
            return $innerContent;
        }

        FrontendAssets::enqueueTimeline();
        return (new TimelineRender())->render(['className' => 'rrze-elements-legacy-timeline'], $innerContent);
    }

    /**
     * Renders one entry using its active parent's heading level.
     *
     * @param array<string, string>|string $atts Item attributes; name supplies its label.
     * @param string|null $content HTML and nested shortcodes belonging to the entry.
     * @param string $tag Registered shortcode name.
     * @return string Rendered list item, or content alone outside a timeline.
     */
    public function shortcodeTimelineItem(array|string $atts = [], ?string $content = '', string $tag = ''): string
    {
        $context = $this->contexts->current();
        if (!$context instanceof TimelineContext) {
            return do_shortcode(shortcode_unautop($content ?? ''));
        }

        $args = shortcode_atts(['name' => ''], is_array($atts) ? $atts : [], $tag);
        $title = sanitize_text_field($args['name']);
        $anchor = $this->uniqueAnchor($title);
        $context->addItem();
        $innerContent = do_shortcode(shortcode_unautop(wpautop(trim($content ?? ''))));

        return (new TimelineItemRender())->render([
            'title' => $title,
            'hstart' => $context->getHeadingLevel(),
            'anchor' => $anchor,
        ], $innerContent);
    }

    /**
     * Preserves name-based deep links while avoiding duplicates across groups.
     *
     * @param string $title Sanitized entry label.
     * @return string Nonempty HTML ID unique within this adapter's request.
     */
    private function uniqueAnchor(string $title): string
    {
        $base = sanitize_title($title);
        if ($base === '') {
            $base = wp_unique_id('legacy-timeline-item-');
        }
        $anchor = $base;
        $suffix = 2;
        while (isset($this->usedAnchors[$anchor])) {
            $anchor = $base . '-' . $suffix++;
        }
        $this->usedAnchors[$anchor] = true;
        return $anchor;
    }

    /**
     * Removes automatic paragraphs and line breaks only between item shortcodes.
     *
     * @param string $content Parent content after shortcode_unautop().
     * @return string Content with item bodies and their formatting preserved.
     */
    private function normalizeItemSeparators(string $content): string
    {
        // Remove wpautop remnants only at item boundaries, preserving paragraphs,
        // explicit line breaks and nested shortcode content inside each item.
        $spacing = '(?:\s|<br\s*/?>|</?p>)+';
        $nextItem = '\[timeline-item(?:\s|/|\])';
        $content = preg_replace('~\A' . $spacing . '(?=' . $nextItem . ')~i', '', $content) ?? $content;

        return preg_replace(
            '~(\[/timeline-item\])' . $spacing . '(?=' . $nextItem . '|\z)~i',
            '$1',
            $content
        ) ?? $content;
    }
}
