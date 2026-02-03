<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use RRZE\ElementsBlocks\Helper;

final class HelperTest extends TestCase
{
    /**
     * @dataProvider truthyShortcodeValues
     */
    public function test_shortcode_boolean_truthy(mixed $value): void
    {
        $this->assertTrue(Helper::shortcode_boolean($value));
    }

    /**
     * @return iterable<int, array{0:mixed}>
     */
    public static function truthyShortcodeValues(): iterable
    {
        yield ['true'];
        yield ['1'];
        yield ['yes'];
        yield ['ja'];
        yield ['on'];
        yield [true];
    }

    /**
     * @dataProvider falsyShortcodeValues
     */
    public function test_shortcode_boolean_falsy(mixed $value): void
    {
        $this->assertFalse(Helper::shortcode_boolean($value));
    }

    /**
     * @return iterable<int, array{0:mixed}>
     */
    public static function falsyShortcodeValues(): iterable
    {
        yield ['false'];
        yield ['0'];
        yield ['off'];
        yield ['no'];
        yield [0];
        yield [null];
    }

    public function test_get_html_var_dump_wraps_strings_and_booleans(): void
    {
        $input = [
            'name' => '<script>alert("x")</script>',
            'options' => [
                'enabled' => true,
            ],
        ];

        $html = Helper::get_html_var_dump($input, true);

        $this->assertStringContainsString('&lt;script&gt;', $html);
        $this->assertStringContainsString('TRUE', $html);
    }

    public function test_get_var_dump_returns_string(): void
    {
        $output = Helper::get_var_dump(['key' => 'value']);
        $this->assertStringContainsString('key', $output);
    }
}
