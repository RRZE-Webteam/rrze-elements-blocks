import { __ } from "@wordpress/i18n";
import {
  TextControl,
  ColorPalette,
  PanelBody,
  ToolbarDropdownMenu,
  Toolbar,
  ToolbarItem,
  ToolbarGroup,
  SearchControl,
  ComboboxControl,
  Button,
  Modal,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from "@wordpress/components";
import {
  useBlockProps,
  BlockControls,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { useState, useEffect, Suspense } from "@wordpress/element";
import {
  color as colorIcon,
  formatUppercase,
  formatLowercase,
} from "@wordpress/icons";
import fontawesomeIconNames from "./fontawesomeIconNames.json";

/**
 * Creates an Icon Component by using FA type and iconName
 * @param {*} type 
 * @param {*} iconName 
 * @returns ReactComponent
 */
const useDynamicSvgIcon = (type, iconName, attributes, setAttributes) => {
  const [Icon, setIcon] = useState(null);

  useEffect(() => {
    if (type && iconName) {
      const filePath = `../svg/${type}/${iconName}.svg`;

      import(`../svg/${type}/${iconName}.svg`)
        .then(({ default: importedIcon }) => {
          setIcon(() => importedIcon);
        })
        .catch((err) => {
          console.error(`Failed to load SVG: ${err}`);
        });
    }
  }, [type, iconName]);

  useEffect(() => {
    if (attributes.icon !== "") {
      const [type, iconName] = attributes.icon.split(" ");
      const filePath = `assets/svg/${type}/${iconName}.svg`;
      
      fetch(attributes.directory + filePath)
        .then(response => response.text())
        .then(svgString => {
          //inject a string after the <svg opening
          svgString = svgString.replace('<svg', `<svg height="1em" width="1em" class="rrze-elements-icon" style="font-size: 1em; fill: currentcolor;" aria-hidden="true"`);          
          setAttributes({ svgString: svgString + ' ' });
        })
        .catch((err) => {
          console.error(`Failed to load SVG: ${err}`);
        });
    }
  }, [attributes.icon]);

  return Icon;
};

const IconPicker = React.memo(({ attributes, setAttributes }) => {
  const [isOpen, setOpen] = useState(false);
  const [allIconsOptions, setAllIconsOptions] = useState([]);
  const [type, iconName] = attributes.icon.split(" ");
  
  // Use the custom hook to get the Icon component.
  const Icon = useDynamicSvgIcon(type, iconName, attributes, setAttributes);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    const solidIconsOptions = fontawesomeIconNames.solid.map((icon) => ({
      label: icon + " (solid)",
      value: "solid " + icon,
    }));

    const regularIconsOptions = fontawesomeIconNames.regular.map((icon) => ({
      label: icon + " (regular)",
      value: "regular " + icon,
    }));

    const brandIconsOptions = fontawesomeIconNames.brands.map((icon) => ({
      label: icon + " (brands)",
      value: "brands " + icon,
    }));

    setAllIconsOptions([
      ...solidIconsOptions,
      ...regularIconsOptions,
      ...brandIconsOptions,
    ]);
  }, []);

  return (
    <PanelBody title={__("Color Settings", "rrze-elements-b")}>
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
          <Button isSecondary onClick={() => setAttributes({ icon: "" })}>
            Remove Icon
          </Button>
        </>
      )}
    </PanelBody>
  );
});

const IconMarkComponent = ({ type, iconName, attributes, setAttributes }) => {
  const Icon = useDynamicSvgIcon(type, iconName, attributes, setAttributes);
  return Icon ? <Icon className="elements-blocks-icon-insideEditor"/> : null;
};

export { IconPicker, useDynamicSvgIcon, IconMarkComponent };
