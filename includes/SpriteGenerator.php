<?php
declare(strict_types=1);

namespace RRZE\ElementsBlocks;

/**
 * Generates one tiny inline SVG sprite per request that contains
 * only the icons actually used on the page and returns ready-to-embed
 * <svg><use …></svg> snippets for your markup.
 *
 * Typical flow:
 *   SpriteGenerator::setAssetPath( '/absolute/path/to/icons' );
 *   echo SpriteGenerator::svgUse( 'solid cow', 'btn-icon' );
 *   // …
 *   SpriteGenerator::bootSpriteOutput();   // once, e.g. in plugin_loaded
 */
class SpriteGenerator
{
  /** @var array<string,string> [symbolId => iconPath] for the current request */
  private static array $icons = [];

  /** @var string Absolute directory that holds the raw SVG files */
  private static string $assetPath = '';

  /* ───────────────────────────  PUBLIC API  ─────────────────────────── */

  /** Define the icon directory (call once during bootstrap). */
  public static function setAssetPath(string $path): void
  {
    self::$assetPath = rtrim($path, '/');
  }

  /**
   * Register an icon and return a complete <svg><use …></svg> tag.
   *
   * @param string          $iconRaw     e.g. "solid cow" or "solid/cow"
   * @param string|string[] $extraClass  Additional CSS classes
   */
  public static function svgUse(string $iconRaw, array|string $extraClass = ''): string
  {
    $iconPath = self::iconPathFromRaw($iconRaw); // solid/cow
    $symbolId = self::symbolId($iconPath);       // solid-cow

    self::$icons[$symbolId] = $iconPath;         // store once per request
    self::bootSpriteOutput();                    // ensure footer hook

    $extraClass = is_array($extraClass) ? implode(' ', $extraClass) : $extraClass;
    $classAttr  = trim('icon icon-' . $symbolId . ' ' . $extraClass);

    return sprintf(
      '<svg class="%1$s" aria-hidden="true"><use href="#%2$s"></use></svg>',
      esc_attr($classAttr),
      esc_attr($symbolId)
    );
  }

  /** Attach sprite output to wp_footer (only once per request). */
  public static function bootSpriteOutput(): void
  {
    static $booted = false;
    if ($booted) {
      return;
    }
    $booted = true;

    add_action('wp_footer', [self::class, 'embedSpriteSheet'], 5);
  }

  /* ────────────────────────────  HELPERS  ───────────────────────────── */

  /** Convert "solid cow" → "solid/cow", keep existing slashes. */
  public static function iconPathFromRaw(string $raw): string
  {
    $raw = trim(str_replace('\\', '/', $raw));
    return str_contains($raw, '/') ? $raw : preg_replace('/\s+/', '/', $raw);
  }

  /** Convert "solid/cow" → "solid-cow" for use as symbol/id. */
  public static function symbolId(string $iconPath): string
  {
    return str_replace('/', '-', $iconPath);
  }

  /** Transform a raw SVG file into a <symbol> element. */
  private static function prepareSVGSymbol(string $iconPath): string
  {
    if (self::$assetPath === '') {
      return '';
    }

    $file = self::$assetPath . '/' . $iconPath . '.svg';
    if (!is_readable($file)) {
      return '';
    }

    $svg = file_get_contents($file);
    $svg = preg_replace(
      ['#<\?xml.*?\?>#s', '#<!DOCTYPE.*?>#s', '#<!--.*?-->#s'], // strip header & comments
      '',
      $svg
    );

    if (!preg_match('#<svg[^>]*viewBox="([^"]+)"[^>]*>(.*?)</svg>#s', $svg, $m)) {
      return '';
    }

    [$viewBox, $inner] = [$m[1], trim($m[2])];
    $id = self::symbolId($iconPath);

    return sprintf(
      '<symbol id="%1$s" viewBox="%2$s" fill="currentColor">%3$s</symbol>',
      esc_attr($id),
      esc_attr($viewBox),
      $inner
    );
  }

  /** Assemble one sprite string from all registered icons. */
  private static function createSpriteSheet(): string
  {
    if (self::$icons === [] || self::$assetPath === '') {
      return '';
    }

    $symbols = array_filter(array_map(
      fn (string $path) => self::prepareSVGSymbol($path),
      self::$icons
    ));

    if ($symbols === []) {
      return '';
    }

    return '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">'
      . implode('', $symbols)
      . '</svg>';
  }

  /** Echo the final sprite; hooked into wp_footer. */
  public static function embedSpriteSheet(): void
  {
    echo self::createSpriteSheet();
  }
}
