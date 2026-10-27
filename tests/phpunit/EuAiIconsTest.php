<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\BlockFrontend\Collapse;
use RRZE\ElementsBlocks\LegacyShortcodes\Icon;
use RRZE\ElementsBlocks\SpriteGenerator;

/** Exercises EU labels from shortcode/block attributes through the emitted SVG sprite. */
final class EuAiIconsTest extends TestCase
{
    /** @var array<string, array{ReflectionProperty, mixed}> Saved per-request sprite state. */
    private array $spriteState = [];

    /** Isolates the sprite registry and points it at the actual bundled assets. */
    protected function setUp(): void
    {
        foreach (['icons' => [], 'assetPath' => dirname(__DIR__, 2) . '/src/_shared/icons'] as $name => $value) {
            $property = new ReflectionProperty(SpriteGenerator::class, $name);
            if (PHP_VERSION_ID < 80100) {
                $property->setAccessible(true);
            }
            $this->spriteState[$name] = [$property, $property->getValue()];
            $property->setValue(null, $value);
        }
    }

    /** Restores sprite state so unrelated rendering tests remain independent. */
    protected function tearDown(): void
    {
        foreach ($this->spriteState as [$property, $value]) {
            $property->setValue(null, $value);
        }
    }

    /**
     * Verifies aliases, accessible labels, natural proportions and shared block/shortcode assets.
     *
     * @dataProvider iconProvider
     * @param string $shortName Short shortcode alias.
     * @param string $viewBox Original EU viewport.
     */
    public function test_shortcodes_and_collapse_share_the_official_sprite(string $shortName, string $viewBox): void
    {
        $canonical = 'eu-' . $shortName;
        $adapter = new Icon();
        $label = 'KI-generiert "mit Hinweis" & Redaktion';
        foreach ([$shortName, $canonical] as $name) {
            $document = new DOMDocument();
            $this->assertTrue($document->loadXML($adapter->shortcodeIcon([
                'icon' => $name, 'style' => '2x', 'alt' => $label,
            ])));
            $svg = $document->documentElement;
            $this->assertSame('img', $svg->getAttribute('role'));
            $this->assertSame($label, $svg->getAttribute('aria-label'));
            $this->assertFalse($svg->hasAttribute('aria-hidden'));
            $this->assertSame($viewBox, $svg->getAttribute('viewBox'));
            $this->assertSame('height: 2em; width: auto;', $svg->getAttribute('style'));
            $this->assertSame('#symbols-' . $canonical, $svg->getElementsByTagName('use')->item(0)->getAttribute('href'));
            $this->assertSame($canonical, $adapter->getMaterialSymbol($name));
        }

        $collapse = (new Collapse())->render([
            'title' => 'AI content', 'materialSymbol' => $canonical, 'jumpName' => 'ai-content',
        ], '<p>Content</p>');
        $this->assertStringContainsString('href="#symbols-' . $canonical . '"', $collapse);
        $this->assertStringContainsString('viewBox="' . $viewBox . '"', $collapse);

        ob_start();
        SpriteGenerator::embedSpriteSheet();
        $sprite = (string) ob_get_clean();
        $document = new DOMDocument();
        $this->assertTrue($document->loadXML($sprite));
        $symbols = $document->getElementsByTagName('symbol');
        $this->assertSame(1, $symbols->length, 'Aliases and blocks must reuse a single symbol.');
        $this->assertSame('symbols-' . $canonical, $symbols->item(0)->getAttribute('id'));
        $this->assertSame($viewBox, $symbols->item(0)->getAttribute('viewBox'));
        $this->assertGreaterThan(2, $document->getElementsByTagName('path')->length);
        $this->assertSame(0, $document->getElementsByTagName('style')->length);
        $this->assertStringContainsString('fill="#000"', $sprite);
        $this->assertStringContainsString('fill="#fff"', $sprite);
        $this->assertStringNotContainsString('class="cls-', $sprite);
    }

    /** @return array<string, array{string, string}> Official icon aliases and viewports. */
    public function iconProvider(): array
    {
        return [
            'basic' => ['ai', '0 0 566.93 566.93'],
            'generated' => ['ai-generated', '0 0 1789.84 566.93'],
            'modified' => ['ai-modified', '0 0 1700.79 566.93'],
        ];
    }

    /** Decorative use stays hidden; unknown names cannot fall through to arbitrary SVG paths. */
    public function test_decorative_and_unknown_icons(): void
    {
        $adapter = new Icon();
        $this->assertStringContainsString('aria-hidden="true"', $adapter->shortcodeIcon(['icon' => 'ai']));
        foreach (['eu-ai-unknown', '../eu-ai', 'eu-ai extra'] as $name) {
            $this->assertStringContainsString('Icon not found.', $adapter->shortcodeIcon(['icon' => $name]));
        }
    }
}
