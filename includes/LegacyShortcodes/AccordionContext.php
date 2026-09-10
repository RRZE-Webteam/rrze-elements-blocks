<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

defined('ABSPATH') || exit;

/**
 * State belonging to one active legacy accordion wrapper.
 */
class AccordionContext
{
    private string $id;
    private int $headingLevel;

    /** @var list<array{name: string, label: string}> */
    private array $registerItems = [];

    public function __construct(string $id, int $headingLevel)
    {
        $this->id = $id;
        $this->headingLevel = $headingLevel;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getHeadingLevel(): int
    {
        return $this->headingLevel;
    }

    public function addRegisterItem(string $name, string $label): void
    {
        if ($name === '') {
            return;
        }

        $this->registerItems[] = [
            'name' => $name,
            'label' => $label !== '' ? $label : $name,
        ];
    }

    /**
     * @return list<array{name: string, label: string}>
     */
    public function getRegisterItems(): array
    {
        return $this->registerItems;
    }
}
