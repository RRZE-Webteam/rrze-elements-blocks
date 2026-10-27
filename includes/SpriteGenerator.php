<?php
declare(strict_types=1);

namespace RRZE\ElementsBlocks;
defined('ABSPATH') || exit;

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
   * @param string          $color       Validated CSS color
   * @param string          $size        CSS Value for height and width
   * @param string          $border      CSS Border Value
   * @param string          $label       Accessible name; empty for decorative icons
   * @return string SVG markup referencing the request's inline sprite.
   */
  public static function svgUse(string $iconRaw, array|string $extraClass = '', string $color = '', string $size = '', string $border = '', string $label = ''): string
  {
    $iconPath = self::iconPathFromRaw($iconRaw); // solid/cow
    $symbolId = self::symbolId($iconPath);       // solid-cow

    self::$icons[$symbolId] = $iconPath;         // store once per request
    self::bootSpriteOutput();                    // ensure footer hook

    $extraClass = is_array($extraClass) ? implode(' ', $extraClass) : $extraClass;
    $classAttr  = trim('icon icon-' . $symbolId . ' ' . $extraClass);

    $propertyMap = [
        'color' => $color,
        'height' => $size,
        'width' => $size,
        'border' => $border
    ];
    $viewBox = self::euAiViewBox($iconPath);
    if ($viewBox !== '') {
        // Text labels are wide: use their intrinsic ratio instead of a square viewport.
        $propertyMap['height'] = $size !== '' ? $size : '1em';
        $propertyMap['width'] = 'auto';
    }
    $inlineStyles = self::weaveInlineStyles($propertyMap);
    $accessibility = $label === ''
        ? 'aria-hidden="true"'
        : 'role="img" aria-label="' . esc_attr($label) . '"';

    return sprintf(
      '<svg class="%1$s" %4$s%5$s%3$s><use href="#%2$s"></use></svg>',
      esc_attr($classAttr),
      esc_attr($symbolId),
      $inlineStyles === '' ? '' : ' ' . $inlineStyles,
      $accessibility,
      $viewBox === '' ? '' : ' viewBox="' . esc_attr($viewBox) . '"'
    );
  }

  /**
   * Reads the original viewport of an EU label so its text keeps its proportions.
   *
   * @param string $iconPath Normalized icon path relative to the asset directory.
   * @return string Original SVG viewBox, or an empty string for other or unavailable icons.
   */
  private static function euAiViewBox(string $iconPath): string
  {
      if (!in_array($iconPath, ['symbols/eu-ai', 'symbols/eu-ai-generated', 'symbols/eu-ai-modified'], true)) {
          return '';
      }

      $file = self::$assetPath . '/' . $iconPath . '.svg';
      $svg = is_readable($file) ? file_get_contents($file) : false;
      return $svg !== false && preg_match('/<svg\b[^>]*viewBox="([^"]+)"/', $svg, $matches) === 1
          ? $matches[1]
          : '';
  }

  /**
   * Build an escaped HTML style attribute from already validated CSS properties.
   *
   * @param array<string, string> $styleProps e.g. ['border' => '1px solid red']
   * @return string Empty string when no properties are set.
   */
  public static function weaveInlineStyles(array $styleProps): string
  {
      $declarations = [];

      foreach ($styleProps as $property => $value) {
          if ($value !== '') {
              $declarations[] = $property . ': ' . $value . ';';
          }
      }

      return $declarations === [] ? '' : 'style="' . esc_attr(implode(' ', $declarations)) . '"';
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
    if (str_contains($raw, '/')) {
      return $raw;
    }
    $converted = preg_replace('/\s+/', '/', $raw);
    return $converted ?? '';
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
    if ($svg === false) {
      return '';
    }
    $svg = preg_replace(
      ['#<\?xml.*?\?>#s', '#<!DOCTYPE.*?>#s', '#<!--.*?-->#s'], // strip header & comments
      '',
      $svg
    );
    if ($svg === null) {
      return '';
    }

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
