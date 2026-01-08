<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\Patterns;

final class PatternsTest extends TestCase
{
    public function test_custom_category_is_added_and_sorted(): void
    {
        $patterns = new Patterns();
        $categories = [
            ['slug' => 'design', 'title' => 'Design'],
            ['slug' => 'misc', 'title' => 'Misc'],
        ];

        $result = $patterns->my_custom_block_category($categories, new WP_Post());

        $this->assertSame('design', $result[0]['slug']);
        $this->assertSame('rrze_elements', $result[1]['slug']);
    }

    public function test_replace_random_numbers_generates_pairs(): void
    {
        $patterns = new Patterns();
        $invoker = \Closure::bind(function (Patterns $instance, string $content): string {
            return $instance->replace_random_numbers($content);
        }, null, Patterns::class);

        $content = '{random_number}-{random_number}';
        $result = $invoker($patterns, $content);

        $this->assertMatchesRegularExpression('/^\d{3}-\d{3}$/', $result);
        $parts = explode('-', $result);
        $this->assertSame($parts[0], $parts[1]);
    }
}
