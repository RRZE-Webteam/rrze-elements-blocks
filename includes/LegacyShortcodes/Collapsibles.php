<?php
declare(strict_types=1);

namespace RRZE\ElementsBlocks\LegacyShortcodes;

use RRZE\ElementsBlocks\Helper;
use RRZE\ElementsBlocks\BlockFrontend\Collapsibles as CollapsiblesRender;

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Wrapper-Shortcodes:
 *   [collapsibles], [accordion], [accordionsub]
 */
class Collapsibles extends LegacyShortcodes
{
    public function __construct()
    {
        $this->addShortcodeForce('collapsibles', [$this, 'shortcodeCollapsibles']);
        $this->addShortcodeForce('accordion', [$this, 'shortcodeCollapsibles']);
        $this->addShortcodeForce('accordionsub', [$this, 'shortcodeCollapsibles']);
    }

    /* ---------------------------------------------------------------------
     * Public Shortcode Handler
     * -------------------------------------------------------------------*/
    public function shortcodeCollapsibles($atts, $content = '', $tag = ''): string
    {
        [$expandAll, $register, $hstart, $className] = $this->parseWrapperAtts($atts, $tag);
        $this->setupLegacyGlobals($hstart);

        $innerBlocks = $this->buildInnerHtml($content, $register);

        $attributesNew = $this->mapWrapperAttributes(
            $expandAll,
            $className,
            $this->getExpandLabel('')
        );

        $markup = (new CollapsiblesRender())->render($attributesNew, $innerBlocks);

        // Wie früher: gleiche Script-Handles & wpautop(false)
        wp_enqueue_script('rrze-accordions');
        return wpautop($markup, false);
    }

    /* ---------------------------------------------------------------------
     * Parsing & Mapping
     * -------------------------------------------------------------------*/
    private function parseWrapperAtts($atts, string $tag): array
    {
        $defaults = [
            'expand-all-link' => 'false', // bool (string)
            'register'        => 'false', // bool (string)
            'hstart'          => '',      // int 1-6
            'style'           => '',      // 'light' | ''
        ];
        $args = shortcode_atts($defaults, $atts, $tag);

        $expandAll = Helper::shortcode_boolean($args['expand-all-link']);
        $register  = Helper::shortcode_boolean($args['register']);

        $hstart = ($args['hstart'] !== '') ? (int) $args['hstart'] : 2;
        if ($hstart < 1 || $hstart > 6) {
            $hstart = 2;
        }

        $style = esc_attr($args['style']);
        $className = ($style === 'light') ? 'style_light' : 'style_default';

        return [$expandAll, $register, $hstart, $className];
    }

    private function mapWrapperAttributes(bool $expandAll, string $className, string $expandLabel): array
    {
        return [
            'expandAllLink' => $expandAll,
            'expandLabel'   => $expandLabel,
            'className'     => $className,
        ];
    }

    private function setupLegacyGlobals(int $hstart): void
    {
        if (!isset($GLOBALS['collapsibles_count'])) {
            $GLOBALS['collapsibles_count'] = 0;
        }
        $GLOBALS['collapsibles_id'] = $GLOBALS['collapsibles_count'];
        $GLOBALS['collapsibles_hstart'][$GLOBALS['collapsibles_id']] = $hstart;
        $GLOBALS['collapsibles_count']++;
    }

    /* ---------------------------------------------------------------------
     * Inner HTML (Register + Child Shortcodes)
     * -------------------------------------------------------------------*/
    private function buildInnerHtml(string $content, bool $register): string
    {
        // WP packt Shortcodes auf eigener Zeile gern in </p>... – entfernen
        if (strpos($content, '</p>') === 0) {
            $content = substr($content, 4);
        }

        // Erst die Kinder ausführen, damit der Register-Scan korrekt ist
        $innerContent = do_shortcode(shortcode_unautop($content));

        $registerMarkup = '';
        if ($register) {
            $registerMarkup = $this->buildRegisterListFromChildNames($content);
        }

        return $registerMarkup . $innerContent;
    }

    private function buildRegisterListFromChildNames(string $rawContent): string
    {
        if (!preg_match_all('/name=\"(.*?)\"/', $rawContent, $matches)) {
            return '';
        }

        $names = array_filter($matches[1], static fn($val) => $val !== '');
        if (!$names) {
            return '';
        }

        $html = '<ul aria-hidden="true" class="accordion-register clear clearfix">';
        foreach ($names as $name) {
            $html .= '<li><a href="#' . esc_attr($name) . '">' . esc_html($name) . '</a></li>';
        }
        $html .= '</ul>';

        return $html;
    }

    /* ---------------------------------------------------------------------
     * Labels / i18n
     * -------------------------------------------------------------------*/
    protected function getExpandLabel(string $fallback): string
    {
        if ($fallback !== '') {
            return $fallback;
        }
        $lang = get_post_meta(get_the_ID(), 'fauval_langcode', true);
        switch ($lang) {
            case 'en':
                return 'Expand All';
            case 'de':
                return 'Alle öffnen';
            default:
                return esc_html__('Expand All', 'rrze-elements');
        }
    }
}
