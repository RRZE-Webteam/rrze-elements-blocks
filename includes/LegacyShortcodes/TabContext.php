<?php

namespace RRZE\ElementsBlocks\LegacyShortcodes;

defined('ABSPATH') || exit;

/**
 * Navigation and settings belonging to one active [tabs] group.
 */
class TabContext
{
    private string $id;
    private int $headingLevel;

    /** @var list<array{clientId: string, tabId: string, title: string, materialSymbol: string, suffix: string, position: int}> */
    private array $tabs = [];

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

    public function addTab(string $id, string $title, string $materialSymbol, string $suffix): void
    {
        $this->tabs[] = [
            'clientId' => $id,
            'tabId' => $id,
            'title' => $title,
            'materialSymbol' => $materialSymbol,
            'suffix' => $suffix,
            'position' => count($this->tabs),
        ];
    }

    /** @return list<array{clientId: string, tabId: string, title: string, materialSymbol: string, suffix: string, position: int}> */
    public function getTabs(): array
    {
        return $this->tabs;
    }
}
