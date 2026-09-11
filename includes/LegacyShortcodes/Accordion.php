<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

use RRZE\ElementsBlocks\BlockFrontend\Accordion as AccordionRender;
use RRZE\ElementsBlocks\BlockFrontend\Accordions as AccordionsRender;
use RRZE\ElementsBlocks\BlockFrontend\Collapse as CollapseRender;
use RRZE\ElementsBlocks\BlockFrontend\Collapsibles as CollapsiblesRender;
use RRZE\ElementsBlocks\FrontendAssets;
use RRZE\ElementsBlocks\Helper;

defined('ABSPATH') || exit;

/**
 * Adapts the legacy accordion shortcode family to the canonical block renderers.
 */
class Accordion implements ShortcodeAdapter
{
    private ContextStack $contexts;
    private int $nextAccordionId = 0;
    private int $nextPanelId = 0;

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
            'collapsibles' => [$this, 'shortcodeCollapsibles'],
            'accordion' => [$this, 'shortcodeAccordions'],
            'accordionsub' => [$this, 'shortcodeAccordions'],
            'collapse' => [$this, 'shortcodeCollapse'],
            'accordion-item' => [$this, 'shortcodeAccordionItem'],
        ];
    }

    public function enqueueAssets(): void
    {
        FrontendAssets::enqueueAccordion();
    }

    /**
     * @param array<string, string> $atts
     */
    public function shortcodeCollapsibles(array $atts = [], ?string $content = '', string $tag = ''): string
    {
        $args = shortcode_atts([
            'expand-all-link' => 'false',
            'register' => 'false',
            'hstart' => '',
        ], $atts, $tag);

        $headingLevel = $args['hstart'] !== '' ? (int)$args['hstart'] : 2;
        if ($headingLevel < 1 || $headingLevel > 6) {
            $headingLevel = 2;
        }

        $context = new AccordionContext('accordion-' . $this->nextAccordionId++, $headingLevel);
        $this->contexts->push($context);

        $content = $this->stripLeadingParagraphClose($content ?? '');
        try {
            $innerContent = do_shortcode(shortcode_unautop($content));
        } finally {
            $this->contexts->pop();
        }

        $registerMarkup = Helper::shortcode_boolean($args['register'])
            ? $this->renderRegister($context)
            : '';
        $markup = (new CollapsiblesRender())->render([
            'expandAllLink' => Helper::shortcode_boolean($args['expand-all-link']),
            'expandLabel' => $this->getExpandLabel(),
            'accordionId' => $context->getId(),
        ], $registerMarkup . $innerContent);

        $this->enqueueAssets();

        return wpautop($markup, false);
    }

    /**
     * @param array<string, string> $atts
     */
    public function shortcodeCollapse(array $atts = [], ?string $content = '', string $tag = ''): string
    {
        return $this->renderItem($atts, $content, $tag, false);
    }

    /**
     * Renders the wrapper for the nested accordion-item shortcode.
     *
     * @param array<string, string> $atts
     */
    public function shortcodeAccordions(array $atts = [], ?string $content = '', string $tag = ''): string
    {
        $args = shortcode_atts([
            'expand-all-link' => 'false',
            'register' => 'false',
            'hstart' => '',
        ], $atts, $tag);
        $parentContext = $this->getAccordionContext();
        $headingLevel = $parentContext !== null ? $parentContext->getHeadingLevel() : 1;

        if ($args['hstart'] !== '') {
            $requestedHeadingLevel = (int)$args['hstart'];
            if ($requestedHeadingLevel >= 1 && $requestedHeadingLevel <= 6) {
                // AccordionRender adds one level for an inner accordion item.
                $headingLevel = $requestedHeadingLevel - 1;
            }
        }

        $context = new AccordionContext('accordion-' . $this->nextAccordionId++, $headingLevel);
        $this->contexts->push($context);

        $content = $this->stripLeadingParagraphClose($content ?? '');
        try {
            $innerContent = do_shortcode(shortcode_unautop($content));
        } finally {
            $this->contexts->pop();
        }

        if ($parentContext !== null) {
            foreach ($context->getRegisterItems() as $item) {
                $parentContext->addRegisterItem($item['name'], $item['label']);
            }
        }

        $registerMarkup = Helper::shortcode_boolean($args['register'])
            ? $this->renderRegister($context)
            : '';
        $markup = (new AccordionsRender())->render([
            'className' => 'wp-block-rrze-elements-accordions',
            'accordionId' => $context->getId(),
            'expandAllLink' => Helper::shortcode_boolean($args['expand-all-link']),
            'expandLabel' => $this->getExpandLabel(),
        ], $registerMarkup . $innerContent);

        $this->enqueueAssets();

        return wpautop($markup, false);
    }

    /**
     * @param array<string, string> $atts
     */
    public function shortcodeAccordionItem(array $atts = [], ?string $content = '', string $tag = ''): string
    {
        return $this->renderItem($atts, $content, $tag, true);
    }

    /**
     * @param array<string, string> $atts
     */
    private function renderItem(array $atts, ?string $content, string $tag, bool $isInnerItem): string
    {
        $args = shortcode_atts([
            'title' => 'Tab',
            'color' => '',
            'id' => '',
            'load' => '',
            'name' => '',
            'icon' => '',
            'suffix' => '',
        ], $atts, $tag);

        $generatedId = $this->nextPanelId++;
        $requestedId = (int)$args['id'];
        $panelNumber = $requestedId > 0 ? $requestedId : $generatedId;
        $panelId = 'collapse_' . $panelNumber;
        $buttonId = 'collapse_button_' . $panelNumber;
        $dataName = $this->sanitizeLegacyAnchorName($args['name']);
        $loadClass = sanitize_html_class($args['load']);
        $context = $this->getAccordionContext();

        if ($context !== null && $dataName !== '') {
            $context->addRegisterItem($dataName, sanitize_text_field($args['name']));
        }

        $attributes = [
            'title' => wp_kses($args['title'], ['br' => []]),
            'suffix' => $args['suffix'],
            'color' => sanitize_html_class($args['color']),
            'icon' => $args['icon'],
            'materialSymbol' => '',
            'jumpName' => $dataName,
            'buttonId' => $buttonId,
            'panelId' => $panelId,
            'targetId' => $panelId,
            'dataName' => $dataName,
            'loadOpen' => $loadClass !== '',
            'bodyStateClass' => $loadClass,
            'activeOnLoad' => $loadClass === 'open',
            'hstart' => $context !== null
                ? $context->getHeadingLevel()
                : ($isInnerItem ? 1 : 2),
        ];
        $innerContent = do_shortcode(shortcode_unautop($content ?? ''));

        if ($isInnerItem) {
            $attributes['className'] = 'wp-block-rrze-elements-accordion';
            $attributes['outputId'] = $panelId;
            $attributes['panelName'] = $dataName;
            $markup = (new AccordionRender())->render($attributes, $innerContent);
        } else {
            $markup = (new CollapseRender())->render($attributes, $innerContent);
        }

        $this->enqueueAssets();

        return wpautop($markup, false);
    }

    private function getAccordionContext(): ?AccordionContext
    {
        $context = $this->contexts->current();

        return $context instanceof AccordionContext ? $context : null;
    }

    private function stripLeadingParagraphClose(string $content): string
    {
        return str_starts_with($content, '</p>') ? substr($content, 4) : $content;
    }

    private function sanitizeLegacyAnchorName(string $name): string
    {
        return preg_replace('/[^a-zA-Z0-9_-]/', '', sanitize_text_field($name)) ?? '';
    }

    private function renderRegister(AccordionContext $context): string
    {
        $items = $context->getRegisterItems();
        if ($items === []) {
            return '';
        }

        $markup = '<ul class="accordion-register clear clearfix">';
        foreach ($items as $item) {
            $markup .= '<li><a href="#' . esc_attr($item['name']) . '">'
                . esc_html($item['label'])
                . '</a></li>';
        }

        return $markup . '</ul>';
    }

    private function getExpandLabel(): string
    {
        $postId = get_the_ID();
        $language = $postId ? get_post_meta($postId, 'fauval_langcode', true) : '';

        switch ($language) {
            case 'en':
                return 'Expand All';
            case 'de':
                return 'Alle öffnen';
            default:
                return esc_html__('Expand All', 'rrze-elements-blocks');
        }
    }
}
