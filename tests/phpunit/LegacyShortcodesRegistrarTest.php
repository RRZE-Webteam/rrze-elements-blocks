<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\LegacyShortcodes\Accordion;
use RRZE\ElementsBlocks\LegacyShortcodes\CallToAction;
use RRZE\ElementsBlocks\LegacyShortcodes\Icon;
use RRZE\ElementsBlocks\LegacyShortcodes\Notices;
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

    public function test_default_families_register_only_enabled_adapter_tags(): void
    {
        $registrar = new Registrar();
        $registrar->register();

        $this->assertSame(
            array_merge(
                ['collapsibles', 'accordion', 'accordionsub', 'collapse', 'accordion-item', 'button', 'icon'],
                array_keys((new Notices())->getShortcodes())
            ),
            array_keys($GLOBALS['shortcode_tags'])
        );
        $this->assertInstanceOf(Accordion::class, $GLOBALS['shortcode_tags']['accordion'][0]);
        $this->assertSame('shortcodeAccordions', $GLOBALS['shortcode_tags']['accordion'][1]);
        $this->assertSame('shortcodeAccordionItem', $GLOBALS['shortcode_tags']['accordion-item'][1]);
        $this->assertInstanceOf(Notices::class, $GLOBALS['shortcode_tags']['notice-tipp'][0]);
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

    public function test_existing_legacy_cta_callback_is_preserved_by_default(): void
    {
        $legacyCallback = ['RRZE\\Elements\\Shortcodes', 'shortcodeCTA'];
        $GLOBALS['shortcode_tags']['CTA'] = $legacyCallback;

        $registrar = new Registrar();
        $registrar->register();

        $this->assertSame($legacyCallback, $GLOBALS['shortcode_tags']['CTA']);
        $this->assertSame([], $registrar->getConflicts());
    }

    public function test_cta_family_can_be_enabled_explicitly(): void
    {
        add_filter(
            'rrze_elements_blocks_legacy_shortcode_families',
            static fn(array $families): array => array_merge($families, ['cta'])
        );

        $registrar = new Registrar();
        $registrar->register();

        $this->assertArrayHasKey('accordion', $GLOBALS['shortcode_tags']);
        $this->assertArrayHasKey('button', $GLOBALS['shortcode_tags']);
        $this->assertArrayHasKey('CTA', $GLOBALS['shortcode_tags']);
        $this->assertInstanceOf(CallToAction::class, $GLOBALS['shortcode_tags']['CTA'][0]);
        $this->assertSame('shortcodeCTA', $GLOBALS['shortcode_tags']['CTA'][1]);
        $this->assertSame([], $registrar->getConflicts());
    }

    public function test_unrelated_callback_is_preserved_and_reported(): void
    {
        $thirdPartyCallback = static fn(): string => 'third party';
        $GLOBALS['shortcode_tags']['accordion'] = $thirdPartyCallback;
        $registrar = new Registrar();
        $registrar->register();

        $this->assertSame($thirdPartyCallback, $GLOBALS['shortcode_tags']['accordion']);
        $this->assertSame(
            array_merge(['accordion', 'button', 'icon'], array_keys((new Notices())->getShortcodes())),
            array_keys($GLOBALS['shortcode_tags'])
        );
        $this->assertSame(
            ['accordion' => Closure::class],
            $registrar->getConflicts()
        );
    }

    public function test_registration_enqueues_styles_without_accordion_scripts(): void
    {
        $registrar = new Registrar();
        $registrar->register();

        $registrar->enqueueAssets();

        $this->assertSame(['rrze-elements-blocks'], array_unique($GLOBALS['wp_test_enqueued_styles']));
        $this->assertSame([], $GLOBALS['wp_test_enqueued_scripts']);
    }

    public function test_legacy_notice_and_alias_callbacks_are_replaced_together(): void
    {
        $legacyCallback = ['RRZE\\Elements\\Notice\\Notice', 'shortcodeNotice'];
        $GLOBALS['shortcode_tags']['notice-tipp'] = $legacyCallback;
        $GLOBALS['shortcode_tags']['hinweis'] = $legacyCallback;
        $registrar = new Registrar();
        $registrar->register();

        $this->assertInstanceOf(Notices::class, $GLOBALS['shortcode_tags']['notice-tipp'][0]);
        $this->assertSame($GLOBALS['shortcode_tags']['notice-tipp'], $GLOBALS['shortcode_tags']['hinweis']);
        $this->assertSame([], $registrar->getConflicts());
    }

    public function test_conflicting_notice_alias_preserves_the_whole_family(): void
    {
        add_filter('rrze_elements_blocks_legacy_shortcode_families', static fn(): array => ['notices']);
        $legacyCallback = ['RRZE\\Elements\\Notice\\Notice', 'shortcodeNotice'];
        $thirdPartyCallback = static fn(): string => 'third party';
        $GLOBALS['shortcode_tags']['notice-tipp'] = $legacyCallback;
        $GLOBALS['shortcode_tags']['hinweis'] = $thirdPartyCallback;
        $registrar = new Registrar();

        $registrar->register();
        $registrar->enqueueAssets();

        $this->assertSame([
            'notice-tipp' => $legacyCallback,
            'hinweis' => $thirdPartyCallback,
        ], $GLOBALS['shortcode_tags']);
        $this->assertSame(['hinweis' => Closure::class], $registrar->getConflicts());
        $this->assertSame([], $GLOBALS['wp_test_enqueued_styles']);
    }

    public function test_conflicted_family_does_not_enqueue_its_assets(): void
    {
        add_filter('rrze_elements_blocks_legacy_shortcode_families', static fn(): array => ['accordion', 'button']);
        $GLOBALS['shortcode_tags']['accordion-item'] = static fn(): string => 'third party';
        $registrar = new Registrar();
        $registrar->register();

        $registrar->enqueueAssets();

        $this->assertSame(['accordion-item', 'button'], array_keys($GLOBALS['shortcode_tags']));
        $this->assertSame([], $GLOBALS['wp_test_enqueued_styles']);
        $this->assertSame([], $GLOBALS['wp_test_enqueued_scripts']);
    }

    public function test_legacy_icon_is_replaced_but_list_icons_is_preserved(): void
    {
        $iconCallback = ['RRZE\\Elements\\Icon\\Icon', 'shortcodeIcon'];
        $listCallback = ['RRZE\\Elements\\Icon\\Icon', 'shortcodeListIcons'];
        $GLOBALS['shortcode_tags']['icon'] = $iconCallback;
        $GLOBALS['shortcode_tags']['list-icons'] = $listCallback;

        $registrar = new Registrar();
        $registrar->register();

        $this->assertInstanceOf(Icon::class, $GLOBALS['shortcode_tags']['icon'][0]);
        $this->assertSame('shortcodeIcon', $GLOBALS['shortcode_tags']['icon'][1]);
        $this->assertSame($listCallback, $GLOBALS['shortcode_tags']['list-icons']);
        $this->assertSame([], $registrar->getConflicts());
    }

    public function test_conflicting_icon_callback_is_preserved_without_enqueuing_assets(): void
    {
        add_filter('rrze_elements_blocks_legacy_shortcode_families', static fn(): array => ['icon']);
        $legacyCallback = ['RRZE\\Elements\\Icon\\Icon', 'shortcodeListIcons'];
        $thirdPartyCallback = static fn(): string => 'third party';
        $GLOBALS['shortcode_tags']['icon'] = $thirdPartyCallback;
        $GLOBALS['shortcode_tags']['list-icons'] = $legacyCallback;

        $registrar = new Registrar();
        $registrar->register();
        $registrar->enqueueAssets();

        $this->assertSame($thirdPartyCallback, $GLOBALS['shortcode_tags']['icon']);
        $this->assertSame($legacyCallback, $GLOBALS['shortcode_tags']['list-icons']);
        $this->assertSame(['icon' => Closure::class], $registrar->getConflicts());
        $this->assertSame([], $GLOBALS['wp_test_enqueued_styles']);
    }
}
