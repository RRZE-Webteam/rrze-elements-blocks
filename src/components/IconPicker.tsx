import { __ } from "@wordpress/i18n";
import { ComboboxControl, Button } from "@wordpress/components";
import { useState, useEffect, Fragment } from "@wordpress/element";
import fontawesomeIconNames from "./assets/fontawesome/fontawesomeIconNames.json";
import { memo, cloneElement } from "react";

// You probably already include the core styles
// @import "../<components/assets/fontawesome/scss/fontawesome.scss";

import "./assets/fontawesome/scss/fontawesome.scss";
import "./assets/fontawesome/scss/solid.scss";
import "./assets/fontawesome/scss/brands.scss";
import "./assets/fontawesome/scss/regular.scss";

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

    // const Icon = useDynamicSvgIcon(type, iconName, attributes, setAttributes);

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
}) => {
  return <span className={`${attributes.svgString} ${className}`}></span>;
};

export { IconPicker, IconMarkComponent };
