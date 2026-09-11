<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\LegacyShortcodes\Accordion;
use RRZE\ElementsBlocks\LegacyShortcodes\Registrar;

final class LegacyShortcodesRegistrarTest extends TestCase
{
    protected function setUp(): void
    {
        $GLOBALS['shortcode_tags'] = [];
        $GLOBALS['wp_test_filters'] = [];
        $GLOBALS['wp_test_enqueued_styles'] = [];
        $GLOBALS['wp_test_enqueued_scripts'] = [];
    }

    public function test_verified_accordion_family_is_enabled_by_default(): void
    {
        $registrar = new Registrar();

        $registrar->register();

        $this->assertArrayHasKey('accordion', $GLOBALS['shortcode_tags']);
    }

    public function test_family_can_be_disabled(): void
    {
        add_filter(
            'rrze_elements_blocks_legacy_shortcode_families',
            static fn(): array => []
        );

        $registrar = new Registrar();
        $registrar->register();

        $this->assertSame([], $GLOBALS['shortcode_tags']);
    }

    public function test_enabled_family_registers_all_adapter_tags(): void
    {
        $registrar = new Registrar();
        $registrar->register();

        $this->assertSame(
            ['collapsibles', 'accordion', 'accordionsub', 'collapse', 'accordion-item', 'button'],
            array_keys($GLOBALS['shortcode_tags'])
        );
        $this->assertInstanceOf(Accordion::class, $GLOBALS['shortcode_tags']['accordion'][0]);
        $this->assertSame('shortcodeAccordions', $GLOBALS['shortcode_tags']['accordion'][1]);
        $this->assertSame('shortcodeAccordionItem', $GLOBALS['shortcode_tags']['accordion-item'][1]);
    }

    public function test_legacy_callback_is_replaced(): void
    {
        $GLOBALS['shortcode_tags']['accordion'] = [
            'RRZE\\Elements\\Accordion\\Accordion',
            'shortcodeCollapsibles',
        ];
        $registrar = new Registrar();
        $registrar->register();

        $this->assertInstanceOf(Accordion::class, $GLOBALS['shortcode_tags']['accordion'][0]);
        $this->assertSame([], $registrar->getConflicts());
    }

    public function test_unrelated_callback_is_preserved_and_reported(): void
    {
        $thirdPartyCallback = static fn(): string => 'third party';
        $GLOBALS['shortcode_tags']['accordion'] = $thirdPartyCallback;
        $registrar = new Registrar();
        $registrar->register();

        $this->assertSame($thirdPartyCallback, $GLOBALS['shortcode_tags']['accordion']);
        $this->assertSame(['accordion', 'button'], array_keys($GLOBALS['shortcode_tags']));
        $this->assertSame(
            ['accordion' => Closure::class],
            $registrar->getConflicts()
        );
    }

    public function test_family_assets_are_enqueued_early_after_successful_registration(): void
    {
        $registrar = new Registrar();
        $registrar->register();

        $registrar->enqueueAssets();

        $this->assertSame(['rrze-elements-blocks'], $GLOBALS['wp_test_enqueued_styles']);
        $this->assertSame(['rrze-accordions'], $GLOBALS['wp_test_enqueued_scripts']);
    }

    public function test_conflicted_family_does_not_enqueue_its_assets(): void
    {
        $GLOBALS['shortcode_tags']['accordion-item'] = static fn(): string => 'third party';
        $registrar = new Registrar();
        $registrar->register();

        $registrar->enqueueAssets();

        $this->assertSame(['accordion-item', 'button'], array_keys($GLOBALS['shortcode_tags']));
        $this->assertSame([], $GLOBALS['wp_test_enqueued_styles']);
        $this->assertSame([], $GLOBALS['wp_test_enqueued_scripts']);
    }
}
