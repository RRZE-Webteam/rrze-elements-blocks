<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\LegacyShortcodes\Timeline;

final class LegacyShortcodesTimelineTest extends TestCase
{
    private Timeline $adapter;

    /** Creates an adapter with isolated rendering hooks and asset queues. */
    protected function setUp(): void
    {
        $this->adapter = new Timeline();
        $GLOBALS['wp_test_do_shortcode'] = null;
        $GLOBALS['wp_test_enqueued_styles'] = [];
        $GLOBALS['wp_test_enqueued_scripts'] = [];
    }

    /** Restores the shortcode stub after each scenario. */
    protected function tearDown(): void
    {
        $GLOBALS['wp_test_do_shortcode'] = null;
    }

    /**
     * Checks validated headings and independent successive parent contexts.
     *
     * @dataProvider headingProvider
     * @param string $input Legacy hstart value.
     * @param int $expected Expected heading level.
     */
    public function test_heading_level_is_validated_and_does_not_leak_into_the_next_group(string $input, int $expected): void
    {
        $GLOBALS['wp_test_do_shortcode'] = function (string $content): string {
            return $content === 'items'
                ? $this->adapter->shortcodeTimelineItem(['name' => '2026'], '<p>Body</p>')
                : $content;
        };
        $output = $this->adapter->shortcodeTimeline(['hstart' => $input], 'items');
        $this->assertStringContainsString('<h' . $expected . ' class="timeline-label">2026</h' . $expected . '>', $output);
        $next = $this->adapter->shortcodeTimeline([], 'items');
        $this->assertStringContainsString('<h3 class="timeline-label">2026</h3>', $next);
        $this->assertContains('rrze-timeline', $GLOBALS['wp_test_enqueued_scripts']);
    }

    /** @return list<array{string, int}> Valid and invalid heading levels. */
    public function headingProvider(): array
    {
        return [['1', 1], ['4', 4], ['6', 6], ['0', 3], ['7', 3], ['invalid', 3], ['', 3]];
    }

    /** Ensures an exception does not leave the failed parent context active. */
    public function test_context_is_restored_when_a_child_throws(): void
    {
        $GLOBALS['wp_test_do_shortcode'] = static function (): string {
            throw new RuntimeException('Child failed');
        };
        try {
            $this->adapter->shortcodeTimeline(['hstart' => '5'], 'items');
            $this->fail('The child exception must propagate.');
        } catch (RuntimeException $exception) {
            $this->assertSame('Child failed', $exception->getMessage());
        }
        $GLOBALS['wp_test_do_shortcode'] = null;
        $this->assertSame('<p>Standalone</p>', $this->adapter->shortcodeTimelineItem('', '<p>Standalone</p>'));
    }

    /** Checks early styles and avoids loading animation for an empty group. */
    public function test_empty_group_requests_no_animation_script_and_styles_can_be_enqueued_early(): void
    {
        $this->adapter->enqueueAssets();
        $this->assertSame(['rrze-elements-blocks'], $GLOBALS['wp_test_enqueued_styles']);
        $this->assertSame('', $this->adapter->shortcodeTimeline('', null));
        $this->assertSame([], $GLOBALS['wp_test_enqueued_scripts']);
    }
}
