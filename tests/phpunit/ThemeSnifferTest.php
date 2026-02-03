<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\ThemeSniffer;

final class ThemeSnifferTest extends TestCase
{
    public function test_detects_theme_group(): void
    {
        $this->assertSame('fauthemes', ThemeSniffer::getThemeGroup());
        $this->assertTrue(ThemeSniffer::getThemeGroup('fauelemental'));
        $this->assertFalse(ThemeSniffer::getThemeGroup('rrzethemes'));
    }
}
