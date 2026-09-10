<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

defined('ABSPATH') || exit;

/**
 * Registers legacy shortcode adapters after all plugins have loaded.
 *
 * Families are disabled by default while their compatibility behavior is
 * being verified. Enable individual families with the
 * rrze_elements_blocks_legacy_shortcode_families filter.
 */
class Registrar
{
    private const LEGACY_NAMESPACE = 'RRZE\\Elements\\';
    private const COMPATIBILITY_NAMESPACE = 'RRZE\\ElementsBlocks\\LegacyShortcodes\\';

    private string $pluginFile;

    /** @var array<string, string> */
    private array $conflicts = [];

    public function __construct(string $pluginFile)
    {
        $this->pluginFile = $pluginFile;

        add_action('init', [$this, 'register'], 20);
    }

    /**
     * Registers all explicitly enabled shortcode families.
     */
    public function register(): void
    {
        $this->conflicts = [];
        $adapters = $this->getAdapters();

        /**
         * Filters the legacy shortcode families enabled for this request.
         *
         * Families remain disabled by default until their adapters have
         * passed compatibility testing.
         *
         * @param string[] $enabledFamilies Enabled family names.
         * @param string[] $availableFamilies All available family names.
         */
        /** @var mixed $enabledFamilies */
        $enabledFamilies = apply_filters(
            'rrze_elements_blocks_legacy_shortcode_families',
            [],
            array_keys($adapters)
        );

        if (!is_array($enabledFamilies)) {
            return;
        }

        foreach (array_unique($enabledFamilies) as $family) {
            if (!is_string($family) || !isset($adapters[$family])) {
                continue;
            }

            foreach ($adapters[$family]->getShortcodes() as $tag => $callback) {
                if ($tag === '') {
                    continue;
                }

                if (!$this->canOwnShortcode($tag)) {
                    $this->conflicts[$tag] = $this->getShortcodeOwner($tag);

                    /**
                     * Fires when an enabled legacy tag is owned by an
                     * unrelated plugin or theme and is therefore preserved.
                     *
                     * @param string $tag Shortcode tag.
                     * @param string $owner Existing callback owner.
                     * @param string $family Compatibility family.
                     */
                    do_action(
                        'rrze_elements_blocks_legacy_shortcode_conflict',
                        $tag,
                        $this->conflicts[$tag],
                        $family
                    );
                    continue;
                }

                add_shortcode($tag, $callback);
            }
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
            'accordion' => new Accordion($this->pluginFile),
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
