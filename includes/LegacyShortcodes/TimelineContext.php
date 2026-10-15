<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

defined('ABSPATH') || exit;

/** Settings and item count belonging to one active timeline. */
class TimelineContext
{
    private int $headingLevel;
    private int $itemCount = 0;

    /**
     * Creates the state for one parent shortcode invocation.
     *
     * @param int $headingLevel Validated heading level between 1 and 6.
     */
    public function __construct(int $headingLevel)
    {
        $this->headingLevel = $headingLevel;
    }

    /** @return int Heading level inherited by the active parent's entries. */
    public function getHeadingLevel(): int
    {
        return $this->headingLevel;
    }

    /** Records an entry rendered under this parent. */
    public function addItem(): void
    {
        $this->itemCount++;
    }

    /** @return bool Whether a timeline wrapper is needed for rendered entries. */
    public function hasItems(): bool
    {
        return $this->itemCount > 0;
    }
}
