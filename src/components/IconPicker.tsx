import { __ } from "@wordpress/i18n";
import { ComboboxControl, Button } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import fontawesomeIconNames from "./fontawesomeIconNames.json";
import { memo, cloneElement } from "react";

interface BlockAttributes {
  directory: string;
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
  if (type && iconName) {
    const filePath = `assets/svg/${type}/${iconName}.svg`;
    fetch(attributes.directory + filePath)
      .then((response) => response.text())
      .then((svgString) => {
        svgString = svgString.replace(
          "<svg",
          `<svg height="1em" width="1em" class="rrze-elements-icon" style="font-size: 1em; fill: currentcolor;" aria-hidden="true"`
        );
        setAttributes({ svgString: svgString + " " });
      })
      .catch((err) => {
        console.error(`Failed to load SVG: ${err}`);
      });
  }
};

/**
 * Dynamically import the SVG icon based on the provided type and iconName.
 *
 * @param {string} type - The type of the FontAwesome icon (e.g., solid, regular, brands).
 * @param {string} iconName - The name of the icon.
 * @param {BlockAttributes} attributes - The current block attributes.
 * @param {SetAttributesFunction} setAttributes - Function to set new attributes for the block.
 * @returns {JSX.Element | null} The loaded SVG icon or null.
 */
const useDynamicSvgIcon = (
  type: string,
  iconName: string,
  attributes: BlockAttributes,
  setAttributes: SetAttributesFunction
): JSX.Element | null => {
  const [Icon, setIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (type && iconName) {
      const filePath = `../svg/${type}/${iconName}.svg`;

      import(
        /* webpackChunkName: "svg-icons" */ `./svg/${type}/${iconName}.svg?url`
      )
        .then((module) => {
          const SvgIconComponent: React.FC = module.default;
          setIcon(<SvgIconComponent />);
        })
        .catch((err) => {
          console.error(`Failed to load SVG: ${err}`);
        });
    }
  }, [type, iconName]);

  useEffect(() => {
    fetchSvgIcon(type, iconName, attributes, setAttributes);
  }, [type, iconName, attributes, setAttributes]);

  return Icon;
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

    const Icon = useDynamicSvgIcon(type, iconName, attributes, setAttributes);

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

    return (
      <>
        <ComboboxControl
          label={__("Select an icon", "rrze-elements-b")}
          onChange={(newIcon) => setAttributes({ icon: newIcon })}
          value={attributes.icon}
          options={allIconsOptions}
          allowReset={false}
        />
        {attributes.icon !== "" && [
          Icon
            ? cloneElement(Icon, {
                key: "icon",
                className: "elements-blocks-icon-selector-display",
              })
            : null,
          <Button
            key="removeButton"
            variant="secondary"
            onClick={() => setAttributes({ icon: "", svgString: "" })}
          >
            Remove Icon
          </Button>,
        ]}
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
}) => {
  const Icon = useDynamicSvgIcon(type, iconName, attributes, setAttributes);
  return Icon
    ? cloneElement(Icon, { className: defaultClass })
    : null;
};

export { IconPicker, useDynamicSvgIcon, IconMarkComponent };
