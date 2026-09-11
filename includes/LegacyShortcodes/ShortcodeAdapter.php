<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

defined('ABSPATH') || exit;

interface ShortcodeAdapter
{
    /**
     * Returns the legacy shortcode tags handled by this adapter.
     *
     * @return array<string, callable>
     */
    public function getShortcodes(): array;

    /**
     * Enqueues the frontend assets required by this shortcode family.
     */
    public function enqueueAssets(): void;
}
