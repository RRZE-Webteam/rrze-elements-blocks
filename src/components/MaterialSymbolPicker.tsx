import materialSymbolNames from "./assets/fontawesome/materialSymbolNames.json";
import {Fragment, memo, useRef, useState} from '@wordpress/element';
import {__} from "@wordpress/i18n";
import {
  __experimentalDivider as Divider,
  __experimentalHeading as Heading,
  __experimentalSpacer as Spacer,
  Button,
  SearchControl
} from "@wordpress/components";
import {speak} from "@wordpress/a11y";
import type {KeyboardEvent} from "react";

interface MaterialSymbolPickerProps {
  attributes: {
    materialSymbol: string;
  };
  setAttributes: {
    (attributes: { materialSymbol: string }): void;
  };
}

const MaterialSymbolPicker = ({attributes, setAttributes}: MaterialSymbolPickerProps) => {
  const {materialSymbol} = attributes;
  const materialSymbolNamesArray = Object.keys(materialSymbolNames);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [allIcons, setAllIcons] = useState([]);
  const [filteredIcons, setFilteredIcons] = useState([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  console.log(materialSymbolNamesArray);

  const handleSearchChange = (searchQuery: string) => {
    return "";
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filteredIcons = allIcons.filter(({value}) => {
      const [type, iconName] = value.split(" ");
      return type.includes(query) || iconName.includes(query);
    });
    setFilteredIcons(filteredIcons);
    setShowSearchResults(true);
    speak(__("The search results got updated.", "rrze-elements-blocks"));
  };

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
          "rrze-elements-blocks",
        )}
      </p>
      <Spacer paddingTop="1rem" paddingBottom="1rem">
        <Spacer paddingTop="1rem" paddingBottom="1rem">
          <Heading>
            {__("Search for an Icon", "rrze-elements-blocks")}
          </Heading>
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
        {attributes.materialSymbol !== "" && (
          <>
            <Spacer paddingBottom="1rem" paddingTop="1rem">
              <Divider/>
            </Spacer>
            <Fragment key="iconFragment">
								<span
                  key={attributes.materialSymbol}
                  className={`elements-blocks-icon-selector-display ${attributes.materialSymbol}`}
                ></span>
              <Button
                key="removeButton"
                variant="secondary"
                onClick={() => setAttributes({materialSymbol: ""})}
              >
                {__("Remove Icon", "rrze-elements-blocks")}
              </Button>
            </Fragment>
          </>
        )}
      </Spacer>
    </>
  )
}
export { MaterialSymbolPicker };
