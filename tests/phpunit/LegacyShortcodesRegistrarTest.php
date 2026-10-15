<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\LegacyShortcodes\Accordion;
use RRZE\ElementsBlocks\LegacyShortcodes\Alert;
use RRZE\ElementsBlocks\LegacyShortcodes\CallToAction;
use RRZE\ElementsBlocks\LegacyShortcodes\Icon;
use RRZE\ElementsBlocks\LegacyShortcodes\Notices;
use RRZE\ElementsBlocks\LegacyShortcodes\Registrar;
use RRZE\ElementsBlocks\LegacyShortcodes\Tab;
use RRZE\ElementsBlocks\LegacyShortcodes\Timeline;

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
                ['collapsibles', 'accordion', 'accordionsub', 'collapse', 'accordion-item', 'button', 'icon', 'list-icons'],
                array_keys((new Notices())->getShortcodes()),
                array_keys((new Tab())->getShortcodes()),
                ['CTA', 'timeline', 'timeline-item', 'alert', 'inner_alert']
            ),
            array_keys($GLOBALS['shortcode_tags'])
        );
        $this->assertInstanceOf(Accordion::class, $GLOBALS['shortcode_tags']['accordion'][0]);
        $this->assertSame('shortcodeAccordions', $GLOBALS['shortcode_tags']['accordion'][1]);
        $this->assertSame('shortcodeAccordionItem', $GLOBALS['shortcode_tags']['accordion-item'][1]);
        $this->assertInstanceOf(Notices::class, $GLOBALS['shortcode_tags']['notice-tipp'][0]);
        $this->assertInstanceOf(Tab::class, $GLOBALS['shortcode_tags']['tabs'][0]);
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

    /** Both alert aliases migrate together and can be disabled as one family. */
    public function test_alert_family_replaces_both_callbacks_and_can_be_disabled(): void
    {
        $legacy = ['RRZE\\Elements\\Alert\\Alert', 'shortcodeAlert'];
        $GLOBALS['shortcode_tags'] = ['alert' => $legacy, 'inner_alert' => $legacy];
        (new Registrar())->register();
        $this->assertInstanceOf(Alert::class, $GLOBALS['shortcode_tags']['alert'][0]);
        $this->assertSame($GLOBALS['shortcode_tags']['alert'], $GLOBALS['shortcode_tags']['inner_alert']);

        $GLOBALS['shortcode_tags'] = ['alert' => $legacy, 'inner_alert' => $legacy];
        add_filter('rrze_elements_blocks_legacy_shortcode_families',
            static fn(array $families): array => array_values(array_diff($families, ['alert'])));
        (new Registrar())->register();
        $this->assertSame($legacy, $GLOBALS['shortcode_tags']['alert']);
        $this->assertSame($legacy, $GLOBALS['shortcode_tags']['inner_alert']);
    }

    /** A third-party inner alert prevents a mixture of parent and child implementations. */
    public function test_conflicting_inner_alert_preserves_the_entire_family(): void
    {
        add_filter('rrze_elements_blocks_legacy_shortcode_families', static fn(): array => ['alert']);
        $callbacks = [
            'alert' => ['RRZE\\Elements\\Alert\\Alert', 'shortcodeAlert'],
            'inner_alert' => static fn(): string => 'Third party',
        ];
        $GLOBALS['shortcode_tags'] = $callbacks;
        $registrar = new Registrar();
        $registrar->register();
        $registrar->enqueueAssets();
        $this->assertSame($callbacks, $GLOBALS['shortcode_tags']);
        $this->assertSame(['inner_alert' => Closure::class], $registrar->getConflicts());
        $this->assertSame([], $GLOBALS['wp_test_enqueued_styles']);
    }

    public function test_existing_legacy_cta_callback_is_replaced_by_default(): void
    {
        $legacyCallback = ['RRZE\\Elements\\CTA\\CTA', 'shortcodeCTA'];
        $GLOBALS['shortcode_tags']['CTA'] = $legacyCallback;

        $registrar = new Registrar();
        $registrar->register();

        $this->assertInstanceOf(CallToAction::class, $GLOBALS['shortcode_tags']['CTA'][0]);
        $this->assertSame('shortcodeCTA', $GLOBALS['shortcode_tags']['CTA'][1]);
        $this->assertSame([], $registrar->getConflicts());
    }

    public function test_tabs_family_can_be_disabled_to_preserve_legacy_callbacks(): void
    {
        add_filter(
            'rrze_elements_blocks_legacy_shortcode_families',
            static fn(array $families): array => array_values(array_diff($families, ['tabs']))
        );
        $callbacks = [
            'tabs' => ['RRZE\\Elements\\Tabs\\Tabs', 'shortcodeTabs'],
            'tab' => ['RRZE\\Elements\\Tabs\\Tabs', 'shortcodeTab'],
        ];
        $GLOBALS['shortcode_tags'] = $callbacks;

        (new Registrar())->register();

        foreach ($callbacks as $tag => $callback) {
            $this->assertSame($callback, $GLOBALS['shortcode_tags'][$tag]);
        }
    }

    /** Verifies default migration and explicit opt-out for both timeline tags. */
    public function test_timeline_family_replaces_both_callbacks_and_can_be_disabled(): void
    {
        $callbacks = [
            'timeline' => ['RRZE\\Elements\\TimeLine\\TimeLine', 'shortcodeTimeline'],
            'timeline-item' => ['RRZE\\Elements\\TimeLine\\TimeLine', 'shortcodeTimelineItem'],
        ];
        $GLOBALS['shortcode_tags'] = $callbacks;
        (new Registrar())->register();
        $this->assertInstanceOf(Timeline::class, $GLOBALS['shortcode_tags']['timeline'][0]);
        $this->assertSame($GLOBALS['shortcode_tags']['timeline'][0], $GLOBALS['shortcode_tags']['timeline-item'][0]);

        $GLOBALS['shortcode_tags'] = $callbacks;
        add_filter('rrze_elements_blocks_legacy_shortcode_families',
            static fn(array $families): array => array_values(array_diff($families, ['timeline'])));
        (new Registrar())->register();
        foreach ($callbacks as $tag => $callback) {
            $this->assertSame($callback, $GLOBALS['shortcode_tags'][$tag]);
        }
    }

    /** Prevents mixing parent and child callbacks from unrelated implementations. */
    public function test_conflicting_timeline_item_preserves_the_entire_family(): void
    {
        add_filter('rrze_elements_blocks_legacy_shortcode_families', static fn(): array => ['timeline']);
        $callbacks = [
            'timeline' => ['RRZE\\Elements\\TimeLine\\TimeLine', 'shortcodeTimeline'],
            'timeline-item' => static fn(): string => 'Third party',
        ];
        $GLOBALS['shortcode_tags'] = $callbacks;
        $registrar = new Registrar();
        $registrar->register();
        $registrar->enqueueAssets();
        $this->assertSame($callbacks, $GLOBALS['shortcode_tags']);
        $this->assertSame(['timeline-item' => Closure::class], $registrar->getConflicts());
        $this->assertSame([], $GLOBALS['wp_test_enqueued_styles']);
        $this->assertSame([], $GLOBALS['wp_test_enqueued_scripts']);
    }

    public function test_tabs_family_can_replace_both_legacy_callbacks_when_enabled(): void
    {
        add_filter('rrze_elements_blocks_legacy_shortcode_families', static fn(): array => ['tabs']);
        $GLOBALS['shortcode_tags']['tabs'] = ['RRZE\\Elements\\Tabs\\Tabs', 'shortcodeTabs'];
        $GLOBALS['shortcode_tags']['tab'] = ['RRZE\\Elements\\Tabs\\Tabs', 'shortcodeTab'];
        $registrar = new Registrar();

        $registrar->register();

        $this->assertSame(['tabs', 'tab'], array_keys($GLOBALS['shortcode_tags']));
        $this->assertInstanceOf(Tab::class, $GLOBALS['shortcode_tags']['tabs'][0]);
        $this->assertSame($GLOBALS['shortcode_tags']['tabs'][0], $GLOBALS['shortcode_tags']['tab'][0]);
        $this->assertSame('shortcodeTabs', $GLOBALS['shortcode_tags']['tabs'][1]);
        $this->assertSame('shortcodeTab', $GLOBALS['shortcode_tags']['tab'][1]);
        $this->assertSame([], $registrar->getConflicts());
    }

    public function test_conflict_on_tab_preserves_the_entire_tabs_family(): void
    {
        add_filter('rrze_elements_blocks_legacy_shortcode_families', static fn(): array => ['tabs']);
        $callbacks = [
            'tabs' => ['RRZE\\Elements\\Tabs\\Tabs', 'shortcodeTabs'],
            'tab' => static fn(): string => 'third party',
        ];
        $GLOBALS['shortcode_tags'] = $callbacks;
        $registrar = new Registrar();

        $registrar->register();
        $registrar->enqueueAssets();

        $this->assertSame($callbacks, $GLOBALS['shortcode_tags']);
        $this->assertSame(['tab' => Closure::class], $registrar->getConflicts());
        $this->assertSame([], $GLOBALS['wp_test_enqueued_styles']);
        $this->assertSame([], $GLOBALS['wp_test_enqueued_scripts']);
    }

    public function test_cta_family_can_be_disabled(): void
    {
        add_filter(
            'rrze_elements_blocks_legacy_shortcode_families',
            static fn(array $families): array => array_values(array_diff($families, ['cta']))
        );

        $registrar = new Registrar();
        $registrar->register();

        $this->assertArrayHasKey('accordion', $GLOBALS['shortcode_tags']);
        $this->assertArrayHasKey('button', $GLOBALS['shortcode_tags']);
        $this->assertArrayNotHasKey('CTA', $GLOBALS['shortcode_tags']);
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
            array_merge(
                ['accordion', 'button', 'icon', 'list-icons'],
                array_keys((new Notices())->getShortcodes()),
                array_keys((new Tab())->getShortcodes()),
                ['CTA', 'timeline', 'timeline-item', 'alert', 'inner_alert']
            ),
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

    public function test_legacy_icon_and_list_icons_are_replaced_together(): void
    {
        $iconCallback = ['RRZE\\Elements\\Icon\\Icon', 'shortcodeIcon'];
        $listCallback = ['RRZE\\Elements\\Icon\\Icon', 'shortcodeListIcons'];
        $GLOBALS['shortcode_tags']['icon'] = $iconCallback;
        $GLOBALS['shortcode_tags']['list-icons'] = $listCallback;

        $registrar = new Registrar();
        $registrar->register();

        $this->assertInstanceOf(Icon::class, $GLOBALS['shortcode_tags']['icon'][0]);
        $this->assertSame('shortcodeIcon', $GLOBALS['shortcode_tags']['icon'][1]);
        $this->assertSame($GLOBALS['shortcode_tags']['icon'][0], $GLOBALS['shortcode_tags']['list-icons'][0]);
        $this->assertSame('shortcodeListIcons', $GLOBALS['shortcode_tags']['list-icons'][1]);
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

    public function test_conflicting_list_callback_preserves_the_entire_icon_family(): void
    {
        add_filter('rrze_elements_blocks_legacy_shortcode_families', static fn(): array => ['icon']);
        $legacyCallback = ['RRZE\\Elements\\Icon\\Icon', 'shortcodeIcon'];
        $thirdPartyCallback = static fn(): string => 'third party list';
        $GLOBALS['shortcode_tags']['icon'] = $legacyCallback;
        $GLOBALS['shortcode_tags']['list-icons'] = $thirdPartyCallback;

        $registrar = new Registrar();
        $registrar->register();
        $registrar->enqueueAssets();

        $this->assertSame($legacyCallback, $GLOBALS['shortcode_tags']['icon']);
        $this->assertSame($thirdPartyCallback, $GLOBALS['shortcode_tags']['list-icons']);
        $this->assertSame(['list-icons' => Closure::class], $registrar->getConflicts());
        $this->assertSame([], $GLOBALS['wp_test_enqueued_styles']);
    }
}
