<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

use RRZE\ElementsBlocks\Helper;
use RRZE\ElementsBlocks\BlockFrontend\Collapsibles as CollapsiblesRender;
use RRZE\ElementsBlocks\BlockFrontend\Collapse as CollapseRender;

if (!defined('ABSPATH')) {
  exit;
}

/**
 * Legacy Accordion/Collapsible shortcode handler.
 *
 * Re‑implements the original shortcode API while internally delegating the
 * markup generation to the new block‑based render classes. All historical
 * shortcode attributes continue to work so that existing content does not
 * have to be migrated.
 *
 * Supported shortcodes:
 *   [collapsibles], [accordion], [accordionsub]  – wrapper
 *   [collapse], [accordion-item]                – single panel
 */
class Accordion
{
  /** @var string Plugin main file path (kept for BC). */
  protected $pluginFile;

  public function __construct(string $pluginFile)
  {
    $this->pluginFile = $pluginFile;

    /*
    * Register / override all legacy shortcode tags.
    *
    * WordPress will happily overwrite existing callbacks when add_shortcode()
    * is called a second time. However, explicitly removing a previous
    * registration makes the intent obvious and helps avoid situations
    * where remove_shortcode() might later be used elsewhere in the stack
    * (e.g. by a compatibility layer) and unexpectedly un‑register OUR
    * shortcode handler again.
    */
    $this->addShortcodeForce('collapsibles', [$this, 'shortcodeCollapsibles']);
    $this->addShortcodeForce('accordion', [$this, 'shortcodeCollapsibles']);
    $this->addShortcodeForce('accordionsub', [$this, 'shortcodeCollapsibles']);
    $this->addShortcodeForce('collapse', [$this, 'shortcodeCollapse']);
    $this->addShortcodeForce('accordion-item', [$this, 'shortcodeCollapse']);
  }

  /* --------------------------------------------------------------------- */
  /*  Shortcode registration helper                                        */
  /* --------------------------------------------------------------------- */

  /**
   * Registers a shortcode, removing any existing callback first so we are
   * *guaranteed* to win collisions with other plugins or previous versions.
   *
   * @param string $tag The shortcode tag (e.g. "collapse").
   * @param callable|string $callback The handler callback.
   */
  protected function addShortcodeForce(string $tag, $callback): void
  {
    if (shortcode_exists($tag)) {
      remove_shortcode($tag);
    }
    add_shortcode($tag, $callback);
  }

  /* --------------------------------------------------------------------- */
  /*  Wrapper shortcode : [collapsibles]                                   */
  /* --------------------------------------------------------------------- */

  /**
   * Handles the wrapper shortcode (multiple collapsible panels).
   * Maps legacy attributes to the Collapsibles block renderer so the new
   * front‑end is used while the legacy API stays intact.
   */
  public function shortcodeCollapsibles($atts, $content = '', $tag = ''): string
  {
    /* --------------------------------------------------
     * 1. Parse legacy attributes
     * --------------------------------------------------*/
    $defaults = [
      'expand-all-link' => 'false', // bool
      'register' => 'false', // bool
      'hstart' => '',      // int (1‑6) – passed down to children
      'style' => '',      // "light" for alternative colour scheme
    ];
    $args = shortcode_atts($defaults, $atts, $tag);
    $expandAll = Helper::shortcode_boolean($args['expand-all-link']);
    $register = Helper::shortcode_boolean($args['register']);

    /* Store heading start level for nested [collapse] shortcodes */
    $hstart = ($args['hstart'] !== '') ? intval($args['hstart']) : 2;
    $hstart = ($hstart < 1 || $hstart > 6) ? 2 : $hstart;

    // Maintain the global the old shortcodes relied on – still needed so
    // that nested [collapse] instances know which heading level to start
    // with. The new render classes do not use the global, but the nested
    // shortcode handler below does.
    if (!isset($GLOBALS['collapsibles_count'])) {
      $GLOBALS['collapsibles_count'] = 0;
    }
    $GLOBALS['collapsibles_id'] = $GLOBALS['collapsibles_count'];
    $GLOBALS['collapsibles_hstart'][$GLOBALS['collapsibles_id']] = $hstart;
    $GLOBALS['collapsibles_count']++;

    /* --------------------------------------------------
     * 2. Build inner HTML (register list + child panels)
     * --------------------------------------------------*/
    // Strip leading autop that WordPress sometimes adds when the shortcode
    // is on its own line.
    if (str_starts_with($content, '</p>')) {
      $content = substr($content, 4);
    }

    // Convert shortcodes inside the wrapper *first* so we can parse names
    // for the optional register list.
    $innerContent = do_shortcode(shortcode_unautop($content));

    $registerMarkup = '';
    if ($register) {
      // Look for name="…" attributes provided in child shortcodes.
      if (preg_match_all('/name=\"(.*?)\"/', $content, $matches)) {
        $names = array_filter($matches[1], static fn($val) => $val !== '');
        if ($names) {
          $registerMarkup .= '<ul aria-hidden="true" class="accordion-register clear clearfix">';
          foreach ($names as $name) {
            $registerMarkup .= '<li><a href="#' . esc_attr($name) . '">' . esc_html($name) . '</a></li>';
          }
          $registerMarkup .= '</ul>';
        }
      }
    }

    $innerBlocks = $registerMarkup . $innerContent;

    /* --------------------------------------------------
     * 3. Map legacy attributes to the new renderer
     * --------------------------------------------------*/
    $style = esc_attr($args['style']);
    $className = $style === 'light' ? 'style_light' : 'style_default';

    $attributesNew = [
      'expandAllLink' => $expandAll,
      'expandLabel' => $this->getExpandLabel(''), // will calculate below
      'className' => $className,
    ];

    // Custom expand‑all label (legacy didn’t allow overriding the label via
    // shortcode, but we keep the option open for filters or future use).
    $attributesNew['expandLabel'] = $this->getExpandLabel($attributesNew['expandLabel']);

    /* --------------------------------------------------
     * 4. Delegate to the new renderer
     * --------------------------------------------------*/
    $renderer = new CollapsiblesRender();
    $markup = $renderer->render($attributesNew, $innerBlocks);

    // Assets – identical to the legacy implementation so no front‑end
    // breakage occurs when scripts/styles were dequeued elsewhere.
    wp_enqueue_script('rrze-accordions');

    // Keep the original behaviour of running through wpautop() (with $br
    // disabled) so existing content keeps its exact markup.
    return wpautop($markup, false);
  }

  /* --------------------------------------------------------------------- */
  /*  Panel shortcode : [collapse] / [accordion-item]                       */
  /* --------------------------------------------------------------------- */

  /**
   * Handles a single collapsible panel.
   */
  public function shortcodeCollapse($atts, $content = '', $tag = ''): string
  {
    /* Maintain legacy globals for unique IDs */
    if (!isset($GLOBALS['current_collapse'])) {
      $GLOBALS['current_collapse'] = 0;
    }
    $id = $GLOBALS['current_collapse']++;

    if (!isset($GLOBALS['collapsibles_count'])) {
      $GLOBALS['collapsibles_count'] = 0;
    }
    if (!isset($GLOBALS['collapsibles_id'])) {
      $GLOBALS['collapsibles_id'] = $GLOBALS['collapsibles_count'];
    }

    /* ----------------------------------------
     * 1. Parse legacy attributes
     * ----------------------------------------*/
    $defaults = [
      'title' => 'Tab',
      'color' => '',
      'id' => '',
      'load' => '',
      'name' => '',
      'icon' => '',
      'suffix' => '',
    ];
    $args = shortcode_atts($defaults, $atts, $tag);

    // Heading start level is inherited from the parent wrapper (set above).
    $hstart = $GLOBALS['collapsibles_hstart'][$GLOBALS['collapsibles_id']] ?? 2;

    /* ----------------------------------------
     * 2. Map legacy attributes → new renderer
     * ----------------------------------------*/
    $panelId = $args['id'] !== '' ? intval($args['id']) : $id;
    $jumpName = $args['name'] !== '' ? sanitize_title_with_dashes($args['name']) : 'collapse_' . $panelId;

    $title = strip_tags($args['title'], ['<br>', '<br />']);
    if ($args['suffix'] !== '') {
      // Preserve legacy suffix: add a span inside the button like it used
      // to be. We’ll append it after rendering.
      $titleForRenderer = $title; // keep plain for renderer
    } else {
      $titleForRenderer = $title;
    }

    $attributesNew = [
      'title' => $titleForRenderer,
      'color' => trim($args['color']),
      'icon' => $args['icon'],
      'materialSymbol' => '',
      'jumpName' => $jumpName,
      'loadOpen' => $args['load'] !== '',
      'hstart' => $hstart,
      'className' => '',
    ];

    /* ----------------------------------------
     * 3. Render inner content first
     * ----------------------------------------*/
    $innerBlocks = do_shortcode(shortcode_unautop($content));

    /* ----------------------------------------
     * 4. Delegate to the new renderer
     * ----------------------------------------*/
    $renderer = new CollapseRender();
    $markup = $renderer->render($attributesNew, $innerBlocks);

    /* ----------------------------------------
     * 5. Inject legacy “suffix” if used
     * ----------------------------------------*/
    if ($args['suffix'] !== '') {
      // We reliably know that the button closes with </button>; inject the
      // suffix span right before it.
      $suffixHTML = '<span class="accordion-suffix">' . esc_html($args['suffix']) . '</span>';
      $markup = str_replace('</button>', $suffixHTML . '</button>', $markup);
    }

    // Assets (same handle names as legacy).
    wp_enqueue_script('rrze-accordions');

    return wpautop($markup, false);
  }

  /* --------------------------------------------------------------------- */
  /*  Helper                                                               */
  /* --------------------------------------------------------------------- */

  /**
   * Returns the correct label for the “Expand all” button based on the
   * current post language, falling back to gettext.
   */
  protected function getExpandLabel(string $fallback): string
  {
    if ($fallback !== '') {
      return $fallback;
    }
    switch (get_post_meta(get_the_ID(), 'fauval_langcode', true)) {
      case 'en':
        return 'Expand All';
      case 'de':
        return 'Alle öffnen';
      default:
        return esc_html__('Expand All', 'rrze-elements');
    }
  }
}
