<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\Plugin;

final class PluginTest extends TestCase
{
    public function test_loaded_sets_metadata(): void
    {
        $plugin = new Plugin(__FILE__);
        $plugin->loaded();

        $this->assertSame(__FILE__, $plugin->getFile());
        $this->assertNotSame('', $plugin->getBasename());
        $this->assertNotSame('', $plugin->getDirectory());
        $this->assertNotSame('', $plugin->getUrl());
        $this->assertNotSame('', $plugin->getVersion());
        $this->assertNotSame('', $plugin->getSlug());
    }
}
