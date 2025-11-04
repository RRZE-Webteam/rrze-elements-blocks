import {createBlock, BlockInstance} from "@wordpress/blocks";
import {select} from "@wordpress/data";

/**
 * @fileoverview
 * Transform helpers and a Gutenberg block transform that maps attributes from
 * `rrze-elements/news` to `fau-elemental/fau-teaser-grid`.
 */

/**
 * Narrowing helper: checks for a non-empty string.
 * @param v - Unknown input.
 * @returns `true` if `v` is a non-empty string (after trimming).
 */
const isNonEmptyString = (v: unknown): v is string =>
  typeof v === "string" && v.trim().length > 0;

/**
 * Narrowing helper: checks for a finite number.
 * @param v - Unknown input.
 * @returns `true` if `v` is of type number and finite.
 */
const isFiniteNumber = (v: unknown): v is number =>
  typeof v === "number" && Number.isFinite(v);

/**
 * Attempts to coerce a value to an integer if it looks numeric.
 *
 * - Returns the number itself when `v` is already a finite number.
 * - Parses a base-10 integer from a string if possible.
 * - Returns `undefined` when conversion is not possible.
 *
 * @param v - Value to convert.
 * @returns A finite integer or `undefined`.
 */
const toIntIfNumeric = (v: unknown): number | undefined => {
  if (typeof v === "number" && Number.isFinite(v)) return v;
  if (isNonEmptyString(v)) {
    const n = Number.parseInt(v, 10);
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
};

/**
 * Maps a plain column count to a valid `teaserLayout` value.
 *
 * Rationale:
 * - From a numeric count alone, only symmetric layouts can be inferred safely.
 * - Asymmetric variants (e.g., "l2s", "2sl", "2s-left", "2s-right") encode
 *   positional intent we cannot deduce from `columns`, so we skip them.
 *
 * Mappings:
 *   1 -> "1xl"
 *   2 -> "2xl"
 *   3 -> "3m"
 *
 * Any other value returns `undefined` to avoid overriding target defaults.
 *
 * @param columns - Source `columns` attribute.
 * @returns A `teaserLayout` or `undefined` when not mappable.
 */
const mapColumnsToTeaserLayout = (
  columns?: unknown
): FauTeaserGridAttrs["teaserLayout"] | undefined => {
  const n = toIntIfNumeric(columns);
  if (!n) return undefined;

  const mapping: Record<number, FauTeaserGridAttrs["teaserLayout"]> = {
    1: "1xl",
    2: "2xl",
    3: "3m",
  };

  return mapping[n];
};

/**
 * Maps a numeric heading start level (1–6) to a valid HTML heading tag string.
 *
 * @param hstart - Source `hstart` number.
 * @returns One of `"h1"`..`"h6"` or `undefined` if out of range or invalid.
 */
const mapHstartToHeadingLevel = (hstart?: unknown): string | undefined => {
  const n = toIntIfNumeric(hstart);
  if (!n) return undefined;
  if (n >= 1 && n <= 6) return `h${n}`;
  return undefined;
};

/**
 * Attempts to resolve a category ID from the legacy `cat` attribute.
 *
 * Resolution order:
 * 1) If `cat` is numeric (number or numeric string), return it as ID.
 * 2) If `cat` is a non-empty string (slug), try to read from the core data store:
 *    `getEntityRecords('taxonomy','category',{ slug: [slug], per_page: 1 })`
 *    This call is synchronous but may return `undefined` if not yet resolved.
 *    In that case we do not map `selectedCategory` (fail-safe).
 *
 * Note: Transforms are synchronous; avoid async `resolveSelect`/fetch here.
 *
 * @param cat - Legacy `cat` attribute (ID or slug).
 * @returns The numeric term ID, or `undefined` if not available.
 */
const getCategoryIdFromCat = (cat: unknown): number | undefined => {
  // Numeric already?
  const maybeId =
    typeof cat === "number" && Number.isFinite(cat)
      ? cat
      : (typeof cat === "string" && /^\d+$/.test(cat.trim())
        ? Number.parseInt(cat.trim(), 10)
        : undefined);
  if (typeof maybeId === "number") return maybeId;

  // Try slug lookup via core store (synchronously; may be undefined if not resolved yet)
  if (typeof cat === "string" && cat.trim().length > 0) {
    try {
      const records =
        select("core")?.getEntityRecords("taxonomy", "category", {
          slug: [cat.trim()],
          per_page: 1,
        });
      const term = Array.isArray(records) ? records[0] : undefined;
      const termId =
        term && typeof term.id === "number" ? term.id : undefined;
      return termId;
    } catch {
      // Swallow: in transforms we avoid throwing; simply don't map when not available.
      return undefined;
    }
  }

  return undefined;
};

/**
 * Attributes used by the `rrze-elements/news` source block.
 */
interface CustomNewsAttrs {
  title?: string;
  cat?: string;
  tag?: string;
  num?: number;
  divclass?: string;
  hidemeta?: boolean;
  hstart?: number;
  type?: string;
  hideduplicates?: boolean;
  has_thumbnail?: boolean;
  days?: number;
  id?: unknown[];
  display?: string;
  hide?: string;
  imgfloat?: string;
  columns?: number;
  sticky_only?: boolean;
  grid?: boolean;
  legacyMode?: boolean;
  className?: string;
}

/**
 * Subset of attributes accepted by the `fau-elemental/fau-teaser-grid` target block.
 */
type FauTeaserGridAttrs = {
  variant?: string;
  postsPerPage?: number;
  showPagination?: boolean;
  paginationType?: "numbers" | "load-more";
  selectedCategory?: number;
  selectedTags?: Array<string | number>;
  selectedAuthor?: number;
  selectedYear?: number;
  selectedMonth?: number;
  selectedDay?: number;
  currentPage?: number;
  totalPosts?: number;
  orderBy?: string;
  order?: "ASC" | "DESC";
  teaserLayout?: "l2s" | "1xl" | "2xl" | "3m" | "2sl" | "2s-left" | "2s-right";
  teaserSizes?: Array<unknown>;
  selectedPosts?: Array<number>;
  selectionMode?: "auto" | "manual";
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  customBlockId?: string;
  className?: string;
};

type CustomNewsShortcodeAttrs = Partial<CustomNewsAttrs>;

/**
 * Maps a validated subset of `rrze-elements/news` attributes to compatible
 * attributes for `fau-elemental/fau-teaser-grid`.
 *
 * Mapping rules (only when present & valid):
 * - `num` → `postsPerPage` (positive integers)
 * - `cat` (numeric) → `selectedCategory`
 * - `tag` (CSV) → `selectedTags` (array of strings or numbers)
 * - `id` (array) → `selectedPosts` (numeric IDs); also sets `selectionMode: "manual"`
 * - `display` / `grid` → `displayStyle` (`"list"` or `"teaser-grid"`)
 * - `columns` → `teaserLayout` (`"2m" | "3m" | "4m"`)
 * - `hstart` → `headingLevel` (`"h1"`..`"h6"`)
 * - `divclass` → `className`
 *
 * Note:
 * - Attributes without a clear counterpart are deliberately not mapped to avoid
 *   unintended behavior in the target block.
 *
 * @param src - Source attributes from `rrze-elements/news`.
 * @returns A partial attribute object suitable for `fau-elemental/fau-teaser-grid`.
 */
const mapRrzeToFau = (src: CustomNewsAttrs): FauTeaserGridAttrs => {
  const dst: FauTeaserGridAttrs = {};

  // num -> postsPerPage
  if (isFiniteNumber(src.num) && src.num > 0) {
    dst.postsPerPage = src.num;
  }

  // cat(string) -> selectedCategory(number) (only if numeric)
  const catId = toIntIfNumeric(src.cat);
  if (typeof catId === "number") {
    dst.selectedCategory = catId;
  }

  // id(array) -> selectedPosts(array<number>) (numeric values only)
  if (Array.isArray(src.id)) {
    const ids = src.id
      .map((v) => (typeof v === "number" ? v : toIntIfNumeric(v)))
      .filter((v): v is number => typeof v === "number" && Number.isFinite(v));
    if (ids.length > 0) {
      dst.selectedPosts = ids;
      // If explicit posts are provided, "manual" selection is most appropriate.
      dst.selectionMode = "manual";
    }
  }

  // columns -> teaserLayout
  const layout = mapColumnsToTeaserLayout(src.columns);
  if (layout) {
    dst.teaserLayout = layout;
  }

  // hstart -> headingLevel
  const heading = mapHstartToHeadingLevel(src.hstart);
  if (heading) {
    dst.headingLevel = heading as FauTeaserGridAttrs["headingLevel"];
  }

  if (isNonEmptyString(src.cat)) {
    dst.selectedCategory = getCategoryIdFromCat(src.cat);
  }

  return dst;
};

/**
 * Transforms: converts `rrze-elements/news` into
 * `fau-elemental/fau-teaser-grid`, preserving any inner blocks.
 *
 * Implementation details:
 * - Uses `mapRrzeToFau` to derive a safe target attribute subset.
 * - Passes `innerBlocks` as the third argument to `createBlock`, per API.
 */
const transforms = {
  to: [
    {
      type: "block" as const,
      blocks: ["fau-elemental/fau-teaser-grid"],
      transform: (attributes: CustomNewsAttrs, innerBlocks: BlockInstance[]) => {
        const mapped = mapRrzeToFau(attributes);

        return createBlock(
          "fau-elemental/fau-teaser-grid",
          mapped,
          innerBlocks
        );
      },
    },
  ],
  from: [
    {
      type: "shortcode",
      tag: "custom-news",
      transform: ({named = {} as CustomNewsShortcodeAttrs}: { named?: CustomNewsShortcodeAttrs }) => {
        const attrs: CustomNewsAttrs = {
          title: named.title,
          cat: named.cat,
          tag: named.tag,
          num: named.num,
          hstart: named.hstart,
          hidemeta: named.hidemeta,
          type: named.type,
          hideduplicates: named.hideduplicates,
          has_thumbnail: named.has_thumbnail,
          days: named.days,
          id: named.id,
          display: named.display,
          hide: named.hide,
          columns: named.columns,
          sticky_only: named.sticky_only,
          divclass: named.divclass,
        };

        return createBlock('rrze-elements/news', attrs)
      }
    },
    {
      type: "shortcode",
      tag: "blogroll",
      transform: ({ named = {} as CustomNewsShortcodeAttrs }: { named?: CustomNewsShortcodeAttrs }) => {
        const attrs: CustomNewsAttrs = {
          title: named.title,
          cat: named.cat,
          tag: named.tag,
          num: named.num,
          hstart: named.hstart,
          hidemeta: named.hidemeta,
          type: named.type,
          hideduplicates: named.hideduplicates,
          has_thumbnail: named.has_thumbnail,
          days: named.days,
          id: named.id,
          display: named.display,
          hide: named.hide,
          columns: named.columns,
          sticky_only: named.sticky_only,
          divclass: named.divclass,
        };

        return createBlock('rrze-elements/news', attrs)
      }
    }
  ],
} as const;

export default transforms;
