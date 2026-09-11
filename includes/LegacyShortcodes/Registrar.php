<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

defined('ABSPATH') || exit;

/**
 * Registers legacy shortcode adapters after all plugins have loaded.
 *
 * Only verified families are enabled by default. Enable or disable individual families with the
 * rrze_elements_blocks_legacy_shortcode_families filter.
 */
class Registrar
{
    private const LEGACY_NAMESPACE = 'RRZE\\Elements\\';
    private const COMPATIBILITY_NAMESPACE = 'RRZE\\ElementsBlocks\\LegacyShortcodes\\';

    /** @var array<string, string> */
    private array $conflicts = [];

    /** @var array<string, ShortcodeAdapter> */
    private array $activeAdapters = [];

    public function __construct()
    {
        add_action('init', [$this, 'register'], 20);
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets'], 10);
    }

    /**
     * Registers all explicitly enabled shortcode families.
     */
    public function register(): void
    {
        $this->conflicts = [];
        $this->activeAdapters = [];
        $adapters = $this->getAdapters();

        /**
         * Filters the legacy shortcode families enabled for this request.
         *
         * The default contains only families that have passed compatibility
         * testing and are ready to replace their RRZE Elements callbacks.
         *
         * @param string[] $enabledFamilies Enabled family names.
         * @param string[] $availableFamilies All available family names.
         */
        /** @var mixed $enabledFamilies */
        $enabledFamilies = apply_filters(
            'rrze_elements_blocks_legacy_shortcode_families',
            ['accordion', 'button'],
            array_keys($adapters)
        );

        if (!is_array($enabledFamilies)) {
            return;
        }

        foreach (array_unique($enabledFamilies) as $family) {
            if (!is_string($family) || !isset($adapters[$family])) {
                continue;
            }

            $shortcodes = array_filter(
                $adapters[$family]->getShortcodes(),
                static fn(string $tag): bool => $tag !== '',
                ARRAY_FILTER_USE_KEY
            );
            $familyConflicts = [];

            foreach (array_keys($shortcodes) as $tag) {
                if (!$this->canOwnShortcode($tag)) {
                    $familyConflicts[$tag] = $this->getShortcodeOwner($tag);
                }
            }

            if ($familyConflicts !== []) {
                foreach ($familyConflicts as $tag => $owner) {
                    $this->conflicts[$tag] = $owner;

                    /**
                     * Fires when an enabled legacy tag is owned by an
                     * unrelated plugin or theme. The complete family is
                     * preserved to avoid mixing incompatible nested parsers.
                     *
                     * @param string $tag Shortcode tag.
                     * @param string $owner Existing callback owner.
                     * @param string $family Compatibility family.
                     */
                    do_action(
                        'rrze_elements_blocks_legacy_shortcode_conflict',
                        $tag,
                        $owner,
                        $family
                    );
                }

                continue;
            }

            foreach ($shortcodes as $tag => $callback) {
                add_shortcode($tag, $callback);
            }

            $this->activeAdapters[$family] = $adapters[$family];
        }
    }

    /**
     * Enqueues assets early enough for styles to be printed in wp_head.
     */
    public function enqueueAssets(): void
    {
        if (is_404() || is_search()) {
            return;
        }

        foreach ($this->activeAdapters as $adapter) {
            $adapter->enqueueAssets();
        }
    }

    /**
     * Returns conflicts found during the most recent registration pass.
     *
     * @return array<string, string>
     */
    public function getConflicts(): array
    {
        return $this->conflicts;
    }

    /**
     * @return array<string, ShortcodeAdapter>
     */
    private function getAdapters(): array
    {
        return [
            'accordion' => new Accordion(),
            'button' => new Button(),
        ];
    }

    private function canOwnShortcode(string $tag): bool
    {
        if (!shortcode_exists($tag)) {
            return true;
        }

        $owner = $this->getShortcodeOwner($tag);

        return str_starts_with($owner, self::LEGACY_NAMESPACE)
            || str_starts_with($owner, self::COMPATIBILITY_NAMESPACE);
    }

    private function getShortcodeOwner(string $tag): string
    {
        $callback = $GLOBALS['shortcode_tags'][$tag] ?? null;

        if (is_array($callback) && isset($callback[0])) {
            return is_object($callback[0])
                ? get_class($callback[0])
                : ltrim((string)$callback[0], '\\');
        }

        if (is_object($callback)) {
            return get_class($callback);
        }

        return is_string($callback) ? ltrim($callback, '\\') : 'unknown';
    }
}
