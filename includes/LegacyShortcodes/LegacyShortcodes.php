<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

/**
 * This function manages the replacement process of old LegacyShortcodes through the new logic
 * The Subclasses are dealing with registering the new Shortcodes.
 */
class LegacyShortcodes
{
    /**
     * Registers a shortcode, removing any existing callback first so we are
     * *guaranteed* to win collisions with other plugins or previous versions.
     *
     * @param string $tag The shortcode tag (e.g. "collapse").
     * @param callable|string $callback The handler callback.
     */
    protected function addShortcodeForce(string $tag, callable|string $callback): void
    {
        if (shortcode_exists($tag)) {
            remove_shortcode($tag);
        }
        add_shortcode($tag, $callback);
    }
}
