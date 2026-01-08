<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\BlockFrontend\AbstractBlockRender;
use RRZE\ElementsBlocks\BlockFrontend\Accordion;
use RRZE\ElementsBlocks\BlockFrontend\Accordions;
use RRZE\ElementsBlocks\BlockFrontend\Alert;
use RRZE\ElementsBlocks\BlockFrontend\CallToAction;
use RRZE\ElementsBlocks\BlockFrontend\Collapse;
use RRZE\ElementsBlocks\BlockFrontend\Collapsibles;
use RRZE\ElementsBlocks\BlockFrontend\Columns;
use RRZE\ElementsBlocks\BlockFrontend\ContentWidthLimiter;
use RRZE\ElementsBlocks\BlockFrontend\Counter;
use RRZE\ElementsBlocks\BlockFrontend\CounterRow;
use RRZE\ElementsBlocks\BlockFrontend\Fact;
use RRZE\ElementsBlocks\BlockFrontend\FactsGrid;
use RRZE\ElementsBlocks\BlockFrontend\IconBox;
use RRZE\ElementsBlocks\BlockFrontend\Insertion;
use RRZE\ElementsBlocks\BlockFrontend\Notice;
use RRZE\ElementsBlocks\BlockFrontend\Tab;
use RRZE\ElementsBlocks\BlockFrontend\Tabs;
use RRZE\ElementsBlocks\BlockFrontend\Timeline;
use RRZE\ElementsBlocks\BlockFrontend\TimelineItem;

final class BlockFrontendRenderTest extends TestCase
{
    /**
     * @dataProvider blockProvider
     *
     * @param class-string $class
     */
    public function test_render_returns_markup(string $class, array $attributes, string $inner): void
    {
        $instance = new $class();
        $output = $instance->render($attributes, $inner);

        $this->assertIsString($output);
        $this->assertNotSame('', $output, $class . ' returned an empty string');
    }

    /**
     * @return iterable<int, array{class-string, array<string, mixed>, string}>
     */
    public static function blockProvider(): iterable
    {
        yield [
            Accordion::class,
            [
                'sameBlockCount' => 1,
                'totalChildrenCount' => 2,
                'ancestorCount' => 1,
                'title' => 'Accordion Title',
                'color' => 'primary',
                'hstart' => 2,
                'jumpName' => 'accordion',
                'icon' => 'solid cow',
                'className' => 'accordion-class',
            ],
            '<p>Accordion content</p>',
        ];

        yield [
            Accordions::class,
            ['className' => 'accordions'],
            '<p>Accordions</p>',
        ];

        yield [
            Alert::class,
            [
                'style' => 'info',
                'title' => 'Alert Title',
                'textColor' => '#ffffff',
                'color' => '#000000',
                'className' => 'alert-class',
            ],
            '<p>Alert</p>',
        ];

        yield [
            CallToAction::class,
            [
                'className' => 'cta',
                'id' => 10,
                'alt' => 'CTA image',
                'url' => 'https://example.com/image.jpg',
                'title' => 'CTA Title',
                'subtitle' => 'CTA Subtitle',
                'buttonText' => 'Learn more',
                'buttonUrl' => 'www.example.com',
                'background' => 'bg-dark',
                'icon' => 'arrow right',
            ],
            '',
        ];

        yield [
            Collapse::class,
            [
                'color' => 'primary',
                'title' => 'Collapse Title',
                'jumpName' => 'collapse',
                'loadOpen' => true,
                'hstart' => 2,
                'className' => 'collapse-class',
                'icon' => 'solid cow',
            ],
            '<p>Collapse body</p>',
        ];

        yield [
            Collapsibles::class,
            [
                'expandAllLink' => true,
                'expandLabel' => 'Expand All',
                'className' => 'collapsibles-class',
            ],
            '<div>Inner</div>',
        ];

        yield [
            Columns::class,
            [
                'className' => 'columns-class',
                'numberOfColumns' => 2,
                'width' => '',
                'rule' => true,
                'borderColor' => '#eeeeee',
                'border' => true,
                'colorSlug' => 'primary',
            ],
            '<p>Columns</p>',
        ];

        yield [
            ContentWidthLimiter::class,
            [
                'width' => 800,
                'alignment' => 'left',
                'className' => 'limit-width',
            ],
            '<p>Limited</p>',
        ];

        yield [
            Counter::class,
            [
                'className' => 'counter',
                'fontSize' => 'large',
                'duration' => '2000',
                'stagger' => '200',
                'title' => '123',
                'description' => '<p>Description</p>',
                'buttonUrl' => 'https://example.com',
                'buttonText' => 'Read more',
            ],
            '',
        ];

        yield [
            CounterRow::class,
            [
                'columns' => 3,
                'stagger' => '150',
                'startValue' => '10',
                'className' => 'counter-row',
            ],
            '<p>Row</p>',
        ];

        yield [
            Fact::class,
            [
                'description' => 'Some fact description',
                'materialSymbol' => 'idea',
                'buttonText' => 'More',
                'buttonUrl' => 'https://example.com',
            ],
            '',
        ];

        yield [
            FactsGrid::class,
            [
                'className' => 'facts-grid',
                'title' => 'Facts',
                'anchor' => 'facts-anchor',
                'headingLevel' => 3,
                'hideHeading' => false,
            ],
            '<li>Fact</li>',
        ];

        yield [
            IconBox::class,
            [
                'className' => 'icon-box',
                'materialSymbol' => 'star',
                'title' => 'Icon title',
                'description' => 'Description text',
                'buttonUrl' => 'https://example.com',
                'buttonText' => 'More',
                'fontSize' => 'small',
                'duration' => '1000',
                'stagger' => '100',
            ],
            '',
        ];

        yield [
            Insertion::class,
            [
                'alignment' => 'right',
                'className' => 'insertion',
            ],
            '<p>Insertion</p>',
        ];

        yield [
            Notice::class,
            [
                'style' => 'notice-attention',
                'className' => 'notice',
                'materialSymbol' => 'warning',
            ],
            '<p>Notice</p>',
        ];

        yield [
            Tab::class,
            [
                'tabsUid' => 'tabs123',
                'blockId' => 'abc123456789',
                'className' => 'tab',
                'title' => 'Tab Title',
            ],
            '<p>Tab content</p>',
        ];

        yield [
            Tabs::class,
            [
                'className' => 'tabs',
                'color' => 'primary',
                'active' => 'child-1',
                'blockId' => 'tabs-outer',
                'innerClientIds' => [
                    [
                        'clientId' => 'child-1abcdef',
                        'position' => 1,
                        'title' => 'Tab 1',
                        'icon' => 'solid cow',
                    ],
                ],
            ],
            '<div>Panels</div>',
        ];

        yield [
            Timeline::class,
            ['className' => 'timeline'],
            '<li>Item</li>',
        ];

        yield [
            TimelineItem::class,
            [
                'className' => 'timeline-item',
                'title' => 'Event',
                'hstart' => 3,
            ],
            '<p>Event details</p>',
        ];
    }
}
