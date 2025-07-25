import supportedSymbolNames from "./../_shared/icons/sprites/material-symbols/mapping/supported-icons-index.json";
import materialSymbolNamesByAlphabeticalOrder from "./../_shared/icons/sprites/material-symbols/mapping/materialSymbolAlphabeticalNames.json";
import materialSymbolNamesByPopularity from "./../_shared/icons/sprites/material-symbols/mapping/materialSymbolPopularityNames.json";
import keywordIndex from "./../_shared/icons/sprites/material-symbols/mapping/keyword-index-outlined-only.json";
import {Fragment, memo, useRef, useState} from "@wordpress/element";
import {__} from "@wordpress/i18n";
import {
  __experimentalDivider as Divider,
  __experimentalGrid as Grid,
  __experimentalHeading as Heading,
  __experimentalSpacer as Spacer,
  Button,
  SearchControl
} from "@wordpress/components";
import {speak} from "@wordpress/a11y";
import type {KeyboardEvent} from "react";

interface MaterialSymbolPickerProps {
  attributes: {
    materialSymbol?: string;
  };
  setAttributes: (attributes: { materialSymbol: string }) => void;
}

const MaterialSymbolPicker = ({attributes, setAttributes}: MaterialSymbolPickerProps) => {
  const {materialSymbol} = attributes;
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [filteredIcons, setFilteredIcons] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const keywordIndexData: Record<string, string[]> = keywordIndex as Record<string, string[]>;

  const searchIcons = (query: string): string[] => {
    const q = query.toLowerCase().trim();

    if (!q) {
      return materialSymbolNamesByPopularity;
    }

    const resultSet = new Set<string>();

    Object.keys(keywordIndexData).forEach((key) => {
      if (key.toLowerCase().includes(q)) {
        keywordIndexData[key].forEach((icon: string) => resultSet.add(icon));
      }
    });

    if (resultSet.size === 0) {
      materialSymbolNamesByAlphabeticalOrder.forEach((icon: string) => {
        if (icon.toLowerCase().includes(q)) {
          resultSet.add(icon);
        }
      });
    }

    return Array.from(resultSet).sort((a, b) => {
      return (
        materialSymbolNamesByPopularity.indexOf(a) -
        materialSymbolNamesByPopularity.indexOf(b)
      );
    });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const results = searchIcons(searchQuery);
    setFilteredIcons(results);
    setShowSearchResults(true);
    speak(__("The search results got updated.", "rrze-elements-blocks"));
  };

  const onClickIconButton = (iconValue: string) => {
    if (iconValue === materialSymbol) {
      setAttributes({materialSymbol: ""});
    } else {
      setAttributes({materialSymbol: iconValue})
    }
  }

  return (
    <>
      <p>
        {__("Icons are provided by ", "rrze-elements-blocks")}
        <a
          href="https://fonts.google.com/icons"
          target="_blank"
          rel="noopener noreferrer"
        >
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
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          ref={searchInputRef}
        />
        <Button key="searchButton" variant="secondary" onClick={handleSearch}>
          {__("Search for Icons", "rrze-elements-blocks")}
        </Button>
        {showSearchResults && (
          <Spacer paddingTop="1rem" paddingBottom="1rem">
            <Heading>{__("Search Results", "rrze-elements-blocks")}</Heading>
            <Grid columns={12}>
              {filteredIcons.map((iconOption: string) => (
                <Button
                  key={iconOption}
                  isPressed={iconOption === materialSymbol}
                  onClick={() => onClickIconButton(iconOption)}
                  size="compact"
                  className="elements-blocks-icon-Button"
                  label={iconOption}
                  showTooltip={true}
                >
                  <span className={`material-symbols-outlined ${iconOption}`}>
                    {iconOption}
                  </span>
                </Button>
              ))}
            </Grid>
          </Spacer>
        )}
        <>
          <Spacer paddingBottom="1rem" paddingTop="1rem">
            <Divider/>
          </Spacer>
          <Fragment key="iconFragment">
              <span
                key={materialSymbol}
                className={`elements-blocks-icon-selector-display material-symbols-outlined ${materialSymbol}`}
              >{materialSymbol}</span>
            <Button
              key="removeButton"
              variant="secondary"
              onClick={() => setAttributes({materialSymbol: ""})}
            >
              {__("Remove Icon", "rrze-elements-blocks")}
            </Button>
          </Fragment>

          <Spacer paddingTop="1rem" paddingBottom="1rem">
            <Heading>{__("Material Symbols", "rrze-elements-blocks")}</Heading>
            <Grid columns={12}>
              {materialSymbolNamesByPopularity.map((iconOption: string) => (
                <Button
                  key={iconOption}
                  isPressed={iconOption === materialSymbol}
                  onClick={() => onClickIconButton(iconOption)}
                  size="compact"
                  className="elements-blocks-icon-Button"
                  label={iconOption}
                  showTooltip={true}
                >
                    <span className={`material-symbols-outlined ${iconOption}`}>
                      {iconOption}
                    </span>
                </Button>
              ))}
            </Grid>
          </Spacer>
        </>
      </Spacer>
    </>
  );
};

export {MaterialSymbolPicker};
