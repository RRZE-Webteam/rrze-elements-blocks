import { __ } from "@wordpress/i18n";
import { ComboboxControl, Button } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";
import fontawesomeIconNames from "./fontawesomeIconNames.json";

/**
 * Fetch and set the SVG string attribute based on the provided type and iconName.
 *
 * @param {string} type - Type of the fa-icon (e.g., solid, regular, brands).
 * @param {string} iconName - Name of the icon.
 * @param {Object} attributes - Block attributes.
 * @param {Function} setAttributes - Setter for block attributes.
 */
const fetchSvgIcon = (type, iconName, attributes, setAttributes) => {
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
 * @param {string} type - Type of the fa-icon (e.g., solid, regular, brands).
 * @param {string} iconName - Name of the icon.
 * @param {Object} attributes - Block attributes.
 * @param {Function} setAttributes - Setter for block attributes.
 * @returns
 */
const useDynamicSvgIcon = (type, iconName, attributes, setAttributes) => {
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    if (type && iconName) {
      const filePath = `../svg/${type}/${iconName}.svg`;

      import(
        /* webpackChunkName: "svg-icons" */ `../svg/${type}/${iconName}.svg`
      )
        .then(({ default: importedIcon }) => {
          setIcon(() => importedIcon);
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
 * Handles the Icon selection inside the InspectorControls IconPanel or ToolbarButton with Modal.
 * @param {Object} attributes - Block attributes.
 * @param {Function} setAttributes - Setter for block attributes.
 */
const IconPicker = React.memo(({ attributes, setAttributes }) => {
  const [allIconsOptions, setAllIconsOptions] = useState([]);
  const [type, iconName] = attributes.icon.split(" ");

  const Icon = useDynamicSvgIcon(type, iconName, attributes, setAttributes);

  useEffect(() => {
    const createIconOptions = (icons, label) =>
      icons.map((icon) => ({
        label: `${icon} (${label})`,
        value: `${label} ${icon}`,
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
        onFilterValueChange={(newIcon) => setAttributes({ icon: newIcon })}
      />
      {attributes.icon !== "" && (
        <>
          {Icon && <Icon className="elements-blocks-icon-selector-display" />}
          <Button
            isSecondary
            onClick={() => setAttributes({ icon: "", svgString: "" })}
          >
            Remove Icon
          </Button>
        </>
      )}
    </>
  );
});

/**
 * Handles the Icon Display inside the Editor View.
 * @param {string} type - Type of the fa-icon (e.g., solid, regular, brands).
 * @param {string} iconName - Name of the icon.
 * @param {Object} attributes - Block attributes.
 * @param {Function} setAttributes - Setter for block attributes.
 */
const IconMarkComponent = ({ type, iconName, attributes, setAttributes }) => {
  const Icon = useDynamicSvgIcon(type, iconName, attributes, setAttributes);
  return Icon ? <Icon className="elements-blocks-icon-insideEditor" /> : null;
};

export { IconPicker, useDynamicSvgIcon, IconMarkComponent };
