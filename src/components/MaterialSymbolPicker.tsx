import type { KeyboardEvent } from "react";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  __experimentalDivider as Divider,
  __experimentalGrid as Grid,
  __experimentalHeading as Heading,
  __experimentalSpacer as Spacer,
  Button,
  SearchControl,
  Spinner,
} from "@wordpress/components";
import { speak } from "@wordpress/a11y";

interface MaterialSymbolPickerProps {
  attributes: {
    materialSymbol?: string;
  };
  setAttributes: (attributes: { materialSymbol: string }) => void;
}

type Maps = {
  popularity: string[];
  alphabetical: string[];
  keywords: Record<string, string[]>;
};

const PAGE_SIZE = 120;

/** Memoized grid so large lists don't re-render unnecessarily */
const IconGrid = memo(function IconGrid({
                                          icons,
                                          selected,
                                          onClick,
                                        }: {
  icons: string[];
  selected?: string;
  onClick: (value: string) => void;
}) {
  return (
    <Grid columns={12}>
      {icons.map((icon) => (
        <Button
          key={icon}
          isPressed={icon === selected}
          onClick={() => onClick(icon)}
          size="compact"
          className="elements-blocks-icon-Button"
          label={icon}
          showTooltip
        >
          <span className={`material-symbols-outlined ${icon}`}>{icon}</span>
        </Button>
      ))}
    </Grid>
  );
});

const MaterialSymbolPicker = ({ attributes, setAttributes }: MaterialSymbolPickerProps) => {
  const { materialSymbol } = attributes;

  // Lazy-loaded data
  const [maps, setMaps] = useState<Maps | null>(null);
  const [loadingMaps, setLoadingMaps] = useState(true);

  // UI state
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredIcons, setFilteredIcons] = useState<string[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const onChangeSearch = (value: string) => {
    if (value.trim()) {
      setSearchQuery(value);
    } else {
      setSearchQuery("");
      setFilteredIcons([]);
      setShowSearchResults(false);
    }
  };

  // Load big JSON maps on demand
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoadingMaps(true);
        const [popularity, alphabetical, keywords] = await Promise.all([
          import(
            /* webpackChunkName: "ms-popularity" */ "./../_shared/icons/sprites/material-symbols/mapping/materialSymbolPopularityNames.json"
            ),
          import(
            /* webpackChunkName: "ms-alpha" */ "./../_shared/icons/sprites/material-symbols/mapping/materialSymbolAlphabeticalNames.json"
            ),
          import(
            /* webpackChunkName: "ms-kw" */ "./../_shared/icons/sprites/material-symbols/mapping/keyword-index-outlined-only.json"
            ),
        ]);

        if (!cancelled) {
          setMaps({
            popularity: (popularity as any).default,
            alphabetical: (alphabetical as any).default,
            keywords: (keywords as any).default as Record<string, string[]>,
          });
        }
      } finally {
        if (!cancelled) setLoadingMaps(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const onClickIconButton = useCallback(
    (iconValue: string) => {
      setAttributes({ materialSymbol: iconValue === materialSymbol ? "" : iconValue });
    },
    [materialSymbol, setAttributes]
  );

  // Pure search helper using loaded maps
  const searchIcons = useCallback(
    (raw: string): string[] => {
      if (!maps) return [];
      const q = raw.toLowerCase().trim();
      if (!q) return maps.popularity;

      const resultSet = new Set<string>();

      // 1) keyword index match
      for (const key in maps.keywords) {
        if (key.toLowerCase().includes(q)) {
          maps.keywords[key].forEach((icon) => resultSet.add(icon));
        }
      }

      // 2) fallback: icon name contains query
      if (resultSet.size === 0) {
        for (const icon of maps.alphabetical) {
          if (icon.toLowerCase().includes(q)) resultSet.add(icon);
        }
      }

      // 3) stable order: popularity index
      const idx = (name: string) => maps.popularity.indexOf(name);
      return Array.from(resultSet).sort((a, b) => idx(a) - idx(b));
    },
    [maps]
  );

  // Only trigger search on Enter or button click
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSearch();
      }
    },
    [searchQuery, maps]
  );

  const handleSearch = useCallback(() => {
    if (!maps) return;
    startTransition(() => {
      const results = searchIcons(searchQuery);
      setFilteredIcons(results);
      setShowSearchResults(true);
      setPage(1);
      speak(__("The search results got updated.", "rrze-elements-blocks"));
    });
  }, [maps, searchQuery, searchIcons]);

  // Visible pages (avoid rendering everything at once)
  const visibleSearchIcons = useMemo(
    () => filteredIcons.slice(0, PAGE_SIZE * page),
    [filteredIcons, page]
  );
  const visiblePopularIcons = useMemo(
    () => (maps ? maps.popularity.slice(0, PAGE_SIZE * page) : []),
    [maps, page]
  );

  // Initial load state (maps not yet available)
  if (loadingMaps) {
    return (
      <div style={{ display: "grid", placeItems: "center", minHeight: 160 }}>
        <Spinner />
        <p>{__("Loading icons…", "rrze-elements-blocks")}</p>
      </div>
    );
  }

  return (
    <>
      <p>
        {__("Icons are provided by ", "rrze-elements-blocks")}
        <a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">
          Google Material Design Icons
        </a>
        {__(
          ". You can search for an icon by typing its name or relevant keywords in the search field below.",
          "rrze-elements-blocks"
        )}
      </p>

      <Spacer paddingTop="1rem" paddingBottom="1rem">
        <Spacer paddingTop="1rem" paddingBottom="1rem">
          <Heading>{__("Search for an Icon", "rrze-elements-blocks")}</Heading>
        </Spacer>

        <SearchControl
          label={__("Select an icon", "rrze-elements-blocks")}
          value={searchQuery}
          onChange={onChangeSearch}
          onKeyDown={handleKeyDown}
          ref={searchInputRef}
          __nextHasNoMarginBottom
          help={__("Search for an icon in English.", "rrze-elements-blocks")}
        />
        <Button variant="secondary" onClick={handleSearch}>
          {__("Search for Icons", "rrze-elements-blocks")}
        </Button>

        {isPending && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
            <Spinner />
            <span>{__("Searching…", "rrze-elements-blocks")}</span>
          </div>
        )}

        {showSearchResults ? (
          <Spacer paddingTop="1rem" paddingBottom="1rem">
            <Heading>{__("Search Results", "rrze-elements-blocks")}</Heading>
            <IconGrid
              icons={visibleSearchIcons}
              selected={materialSymbol}
              onClick={onClickIconButton}
            />
            {visibleSearchIcons.length < filteredIcons.length && (
              <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
                <Button onClick={() => setPage((p) => p + 1)}>
                  {__("Load more", "rrze-elements-blocks")}
                </Button>
              </div>
            )}
          </Spacer>
        ) : (
          <>
            <Spacer paddingBottom="1rem" paddingTop="1rem">
              <Divider />
            </Spacer>

            <Fragment>
              <span
                className={`elements-blocks-icon-selector-display material-symbols-outlined ${materialSymbol}`}
              >
                {materialSymbol}
              </span>
              <Button variant="secondary" onClick={() => setAttributes({ materialSymbol: "" })}>
                {__("Remove Icon", "rrze-elements-blocks")}
              </Button>
            </Fragment>

            <Spacer paddingTop="1rem" paddingBottom="1rem">
              <Heading>{__("Material Symbols", "rrze-elements-blocks")}</Heading>
              <IconGrid
                icons={visiblePopularIcons}
                selected={materialSymbol}
                onClick={onClickIconButton}
              />
              {maps && visiblePopularIcons.length < maps.popularity.length && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
                  <Button onClick={() => setPage((p) => p + 1)}>
                    {__("Load more", "rrze-elements-blocks")}
                  </Button>
                </div>
              )}
            </Spacer>
          </>
        )}
      </Spacer>
    </>
  );
};

export { MaterialSymbolPicker };
