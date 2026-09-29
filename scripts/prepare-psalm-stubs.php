<?php

declare(strict_types=1);

$root = dirname(__DIR__);
$source = file_get_contents($root . '/vendor/php-stubs/wordpress-stubs/wordpress-stubs.php');
if ($source === false) {
    throw new RuntimeException('Install the locked Composer dependencies before preparing Psalm stubs.');
}

// Psalm 6.19.0 crashes on the two WP_Ability callable annotations below.
// Preserve their optional mixed parameter and return types in Psalm-compatible syntax.
// Generate a separate copy so PHPStan continues to use the unmodified dependency.
$source = str_replace('callable( mixed $input= )', 'callable(mixed=)', $source);

$directory = $root . '/_tmp/psalm';
if (!is_dir($directory) && !mkdir($directory, 0777, true) && !is_dir($directory)) {
    throw new RuntimeException('Could not create the Psalm stubs directory.');
}

if (file_put_contents($directory . '/wordpress-stubs.php', $source) !== strlen($source)) {
    throw new RuntimeException('Could not write the Psalm stubs.');
}
