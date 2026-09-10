<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

defined('ABSPATH') || exit;

/**
 * Request-scoped stack for nested parent/child shortcode adapters.
 */
class ContextStack
{
    /** @var list<object> */
    private array $contexts = [];

    public function push(object $context): void
    {
        $this->contexts[] = $context;
    }

    public function pop(): ?object
    {
        return array_pop($this->contexts);
    }

    public function current(): ?object
    {
        if ($this->contexts === []) {
            return null;
        }

        return $this->contexts[array_key_last($this->contexts)];
    }
}
