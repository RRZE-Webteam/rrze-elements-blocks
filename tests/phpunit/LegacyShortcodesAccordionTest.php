<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\LegacyShortcodes\Accordion as LegacyAccordion;

final class LegacyShortcodesAccordionTest extends TestCase
{
    public function test_collapsibles_shortcode_generates_markup(): void
    {
        $shortcodes = new LegacyAccordion(__FILE__);
        $output = $shortcodes->shortcodeCollapsibles([
            'expand-all-link' => 'true',
            'register' => 'false',
            'hstart' => '2',
            'style' => 'light',
        ], '<div>Inner</div>', 'collapsibles');

        $this->assertStringContainsString('accordion', $output);
    }

    public function test_collapse_shortcode_generates_markup(): void
    {
        $shortcodes = new LegacyAccordion(__FILE__);
        $output = $shortcodes->shortcodeCollapse([
            'title' => 'Panel',
            'name' => 'panel-one',
            'color' => 'primary',
            'load' => 'true',
        ], '<p>Content</p>', 'collapse');

        $this->assertStringContainsString('accordion-body', $output);
    }
}
