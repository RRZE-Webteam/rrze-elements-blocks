import { __ } from "@wordpress/i18n";
import {
  ComboboxControl,
  Button,
  SearchControl,
  __experimentalGrid as Grid,
  __experimentalHeading as Heading,
  __experimentalSpacer as Spacer,
  __experimentalDivider as Divider,
} from "@wordpress/components";
import {
  useState,
  useEffect,
  useRef,
  memo,
  Fragment,
} from "@wordpress/element";
import fontawesomeIconNames from "./assets/fontawesome/fontawesomeIconNames.json";

// You probably already include the core styles
// @import "../<components/assets/fontawesome/scss/fontawesome.scss";

import "./assets/fontawesome/scss/fontawesome.scss";
import "./assets/fontawesome/scss/solid.scss";
import "./assets/fontawesome/scss/brands.scss";
import "./assets/fontawesome/scss/regular.scss";
import { set } from "lodash";

interface BlockAttributes {
  icon: string;
  svgString: string;
}

type SetAttributesFunction = (attributes: Partial<BlockAttributes>) => void;

/**
 * Fetch and set the SVG string attribute based on the provided type and iconName.
 *
 * @param {string} type - The type of the FontAwesome icon (e.g., solid, regular, brands).
 * @param {string} iconName - The name of the icon.
 * @param {BlockAttributes} attributes - The current block attributes.
 * @param {SetAttributesFunction} setAttributes - Function to set new attributes for the block.
 */
const fetchSvgIcon = (
  type: string,
  iconName: string,
  attributes: BlockAttributes,
  setAttributes: SetAttributesFunction
): void => {
  let svgFaClass = "";
  //check if iconName and type are set
  if (iconName && type) {
    svgFaClass = `fa-${type} fa-${iconName}`;
    setAttributes({ svgString: svgFaClass });
  }
};

/**
 * IconPicker component properties.
 *
 * @interface IconPickerProps
 * @property {BlockAttributes} attributes - Current block attributes.
 * @property {SetAttributesFunction} setAttributes - Function to set new attributes for the block.
 */
interface IconPickerProps {
  attributes: BlockAttributes;
  setAttributes: SetAttributesFunction;
}

/**
 * A component for picking icons.
 *
 * @component
 * @param {IconPickerProps} props - The properties.
 * @returns {JSX.Element} The `IconPicker` component.
 */
const IconPicker: React.ComponentType<IconPickerProps> = memo(
  ({ attributes, setAttributes }) => {
    const [allIconsOptions, setAllIconsOptions] = useState([]);
    const [type, iconName] = attributes.icon.split(" ");

    useEffect(() => {
      const createIconOptions = (icons: string[], label: string) =>
        icons.map((icon) => ({
          value: `${label} ${icon}`,
          label: `${icon} (${label})`,
        }));

      setAllIconsOptions([
        ...createIconOptions(fontawesomeIconNames.solid, "solid"),
        ...createIconOptions(fontawesomeIconNames.regular, "regular"),
        ...createIconOptions(fontawesomeIconNames.brands, "brands"),
      ]);
    }, []);

    useEffect(() => {
      fetchSvgIcon(type, iconName, attributes, setAttributes);
    }, [type, iconName, attributes, setAttributes]);

    return (
      <>
        <ComboboxControl
          label={__("Select an icon", "rrze-elements-b")}
          onChange={(newIcon) => setAttributes({ icon: newIcon })}
          value={attributes.icon}
          options={allIconsOptions}
          allowReset={false}
        />
        {attributes.icon !== "" && (
          <Fragment key="iconFragment">
            <span
              key={attributes.icon}
              className={`elements-blocks-icon-selector-display ${attributes.svgString}`}
            ></span>
            <Button
              key="removeButton"
              variant="secondary"
              onClick={() => setAttributes({ icon: "", svgString: "" })}
            >
              Remove Icon
            </Button>
          </Fragment>
        )}
      </>
    );
  }
);

/**
 * A component for picking icons inside a large modal.
 *
 * @component
 * @param {IconPickerProps} props - The properties.
 * @returns {JSX.Element} The `IconPicker` component.
 */
const IconPickerModalInset: React.ComponentType<IconPickerProps> = memo(
  ({ attributes, setAttributes }) => {
    const [solidIcons, setSolidIcons] = useState([]);
    const [regularIcons, setRegularIcons] = useState([]);
    const [brandIcons, setBrandIcons] = useState([]);
    const [allIcons, setAllIcons] = useState([]);
    const [filteredIcons, setFilteredIcons] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [type, iconName] = attributes.icon.split(" ");

    // const Icon = useDynamicSvgIcon(type, iconName, attributes, setAttributes);

    useEffect(() => {
      const createIconOptions = (icons: string[], label: string) =>
        icons.map((icon) => ({
          value: `${label} ${icon}`,
          label: `${icon} (${label})`,
        }));

      setSolidIcons(createIconOptions(fontawesomeIconNames.solid, "solid"));
      setRegularIcons(
        createIconOptions(fontawesomeIconNames.regular, "regular")
      );
      setBrandIcons(createIconOptions(fontawesomeIconNames.brands, "brands"));
      setFilteredIcons([
        ...createIconOptions(fontawesomeIconNames.solid, "solid"),
        ...createIconOptions(fontawesomeIconNames.regular, "regular"),
        ...createIconOptions(fontawesomeIconNames.brands, "brands"),
      ]);
    }, []);

    useEffect(() => {
      const allIcons = [...solidIcons, ...regularIcons, ...brandIcons];
      setAllIcons(allIcons);
    }, [solidIcons, regularIcons, brandIcons]);

    useEffect(() => {
      fetchSvgIcon(type, iconName, attributes, setAttributes);
    }, [type, iconName, attributes, setAttributes]);

    const onClickIconButton = (iconValue: string) => {
      if (iconValue === attributes.icon) {
        setAttributes({ icon: "" });
      } else {
        setAttributes({ icon: iconValue });
      }
    };

    const handleSearchChange = (searchQuery: string) => {
      setSearchQuery(searchQuery);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        handleSearch();
      }
    };

    const handleSearch = () => {
      const query = searchQuery.toLowerCase();
      const filteredIcons = allIcons.filter(({ value }) => {
        const [type, iconName] = value.split(" ");
        return type.includes(query) || iconName.includes(query);
      });
      setFilteredIcons(filteredIcons);
      setShowSearchResults(true);
    };

    const onSearchChange = (searchQuery: string) => {
      setSearchQuery(searchQuery);
    };

    return (
      <>
        <p>
          {__("Icons are provided by ", "rrze-elements-b")}
          <a
            href="https://fontawesome.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Font Awesome
          </a>
          {__(
            ". You can search for an icon by typing its Font Awesome name in the search field below.",
            "rrze-elements-b"
          )}
        </p>
        <Spacer paddingTop="1rem" paddingBottom="1rem">
          <Spacer paddingTop="1rem" paddingBottom="1rem">
            <Heading>{__("Search for an Icon", "rrze-elements-b")}</Heading>
          </Spacer>
          <SearchControl
            label={__("Select an icon", "rrze-elements-b")}
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            ref={searchInputRef}
          />

          <Button key="searchButton" variant="secondary" onClick={handleSearch}>
            {__("Search for Icons", "rrze-elements-b")}
          </Button>
          {attributes.icon !== "" && (
            <>
              <Spacer paddingBottom="1rem" paddingTop="1rem">
                <Divider />
              </Spacer>
              <Fragment key="iconFragment">
                <span
                  key={attributes.icon}
                  className={`elements-blocks-icon-selector-display ${attributes.svgString}`}
                ></span>
                <Button
                  key="removeButton"
                  variant="secondary"
                  onClick={() => setAttributes({ icon: "", svgString: "" })}
                >
                  Remove Icon
                </Button>
              </Fragment>
            </>
          )}
        </Spacer>
        {showSearchResults && (
          <>
            <Divider />
            <Spacer paddingTop="1rem" paddingBottom="1rem">
              <Heading>{__("Search Results", "rrze-elements-b")}</Heading>
              {filteredIcons.length > 0 ? (
                <Grid columns={12}>
                  {filteredIcons.map((iconOption) => (
                    <Button
                      key={iconOption.value}
                      isPressed={iconOption.value === attributes.icon}
                      onClick={() => onClickIconButton(iconOption.value)}
                      size="compact"
                      className="elements-blocks-icon-Button"
                      label={iconOption.value.split(" ")[1]}
                      showTooltip={true}
                    >
                      <IconMarkComponent
                        type={iconOption.value.split(" ")[0]}
                        iconName={iconOption.value.split(" ")[1]}
                        attributes={attributes}
                        className="elements-blocks-icon-insideEditor elements-blocks-icon-insideEditorModal"
                        iconValue={iconOption.value}
                      />
                    </Button>
                  ))}
                </Grid>
              ) : (
                <p>
                  {__(
                    "No icons found. Please try a different search term.",
                    "rrze-elements-b"
                  )}
                </p>
              )}
            </Spacer>
          </>
        )}
        <Divider />
        <Spacer paddingTop="1rem" paddingBottom="1rem">
          <Heading>{__("Solid Icons", "rrze-elements-b")}</Heading>
          <Grid columns={12}>
            {solidIcons.map((iconOption) => (
              <Button
                key={iconOption.value}
                isPressed={iconOption.value === attributes.icon}
                onClick={() => onClickIconButton(iconOption.value)}
                size="compact"
                className="elements-blocks-icon-Button"
                label={iconOption.value.split(" ")[1]}
                showTooltip={true}
              >
                <IconMarkComponent
                  type={iconOption.value.split(" ")[0]}
                  iconName={iconOption.value.split(" ")[1]}
                  attributes={attributes}
                  className="elements-blocks-icon-insideEditor elements-blocks-icon-insideEditorModal"
                  iconValue={iconOption.value}
                />
              </Button>
            ))}
          </Grid>
        </Spacer>
        <Divider />
        <Spacer paddingTop="1rem" paddingBottom="1rem">
          <Heading>{__("Regular Icons", "rrze-elements-b")}</Heading>
          <Grid columns={12}>
            {regularIcons.map((iconOption) => (
              <Button
                key={iconOption.value}
                isPressed={iconOption.value === attributes.icon}
                onClick={() => onClickIconButton(iconOption.value)}
                size="compact"
                className="elements-blocks-icon-Button"
                label={iconOption.value.split(" ")[1]}
                showTooltip={true}
              >
                <IconMarkComponent
                  type={iconOption.value.split(" ")[0]}
                  iconName={iconOption.value.split(" ")[1]}
                  attributes={attributes}
                  className="elements-blocks-icon-insideEditor elements-blocks-icon-insideEditorModal"
                  iconValue={iconOption.value}
                />
              </Button>
            ))}
          </Grid>
        </Spacer>
        <Divider />
        <Spacer paddingTop="1rem" paddingBottom="1rem">
          <Heading>{__("Brand Icons", "rrze-elements-b")}</Heading>
          <Grid columns={12}>
            {brandIcons.map((iconOption) => (
              <Button
                key={iconOption.value}
                isPressed={iconOption.value === attributes.icon}
                onClick={() => onClickIconButton(iconOption.value)}
                size="compact"
                className="elements-blocks-icon-Button"
                label={iconOption.value.split(" ")[1]}
                showTooltip={true}
              >
                <IconMarkComponent
                  type={iconOption.value.split(" ")[0]}
                  iconName={iconOption.value.split(" ")[1]}
                  attributes={attributes}
                  className="elements-blocks-icon-insideEditor elements-blocks-icon-insideEditorModal"
                  iconValue={iconOption.value}
                />
              </Button>
            ))}
          </Grid>
        </Spacer>
        <Spacer paddingBottom="1rem">
          <Divider />
        </Spacer>
      </>
    );
  }
);

/**
 * IconMarkComponent component properties.
 *
 * @interface IconMarkComponentProps
 * @property {string} type - The type of the FontAwesome icon (e.g., solid, regular, brands).
 * @property {string} iconName - The name of the icon.
 * @property {BlockAttributes} attributes - The current block attributes.
 * @property {string} [defaultClass] - The default class for the icon.
 * @property {SetAttributesFunction} [setAttributes] - Optional function to set new attributes for the block.
 */
interface IconMarkComponentProps {
  type: string;
  iconName: string;
  attributes: BlockAttributes;
  defaultClass?: string;
  setAttributes?: SetAttributesFunction;
  className?: string;
  onClick?: () => void;
  iconValue?: string;
}

/**
 * A component for displaying icons in the editor.
 *
 * @component
 * @param {IconMarkComponentProps} props - The properties.
 * @returns {JSX.Element | null} The loaded SVG icon or null.
 */
const IconMarkComponent: React.ComponentType<IconMarkComponentProps> = ({
  type,
  iconName,
  attributes,
  defaultClass = "elements-blocks-icon-insideEditor",
  setAttributes = () => {},
  className = "",
  onClick,
  iconValue = "",
}) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };

  //turn solid iconname into the right font-awesome class iconValue contains solid iconname
  const faType = iconValue.split(" ")[0] || "";
  const faIconName = iconValue.split(" ")[1] || "";

  if (iconValue === "") {
    return (
      <span
        className={`${attributes.svgString} ${className}`}
        onClick={handleOnClick}
      ></span>
    );
  } else {
    return (
      <span
        className={`fa-${faType} fa-${faIconName} ${className}`}
        onClick={handleOnClick}
      ></span>
    );
  }
};

export { IconPicker, IconMarkComponent, IconPickerModalInset };
