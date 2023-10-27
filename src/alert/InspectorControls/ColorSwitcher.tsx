// Import WordPress dependencies
import { __ } from "@wordpress/i18n";
import {
  ColorPalette,
  ColorPicker,
  PanelBody,
  ToolbarDropdownMenu,
  ToolbarItem,
  ToolbarGroup,
} from "@wordpress/components";
import { color as colorIcon } from "@wordpress/icons";
import Color from "color";

// Define TypeScript interface for component props
type ColorSwitcherProps = {
  attributes: {
    textColor?: string;
    color: string;
    style?: string;
    borderColor?: string;
  };
  setAttributes: (newAttributes: { color?: string; style?: string; textColor?: string; borderColor?: string; }) => void;
};

interface CustomColor extends Color {
  luminance(): number;
}


// Update attributes based on color contrast
const updateColorAttributes = (
  bgColor: string,
  setAttributes: (newAttributes: { textColor: string; }) => void
) => {

  const blackLum = "";
  const whiteLum = "#ffffff";

  const isDark = Color(bgColor).isDark();

  const newFontColor = isDark ? whiteLum : blackLum;
  setAttributes({ textColor: newFontColor });
};


// Data for color options
const colorData = [
  {
    color: "#e9edf2",
    slug: "default",
    name: __("Default", "rrze-elements-b"),
  },
  {
    color: "#dff0d8",
    slug: "success",
    name: __("Success", "rrze-elements-b"),
  },
  {
    color: "#d9edf7",
    slug: "info",
    name: __("Info", "rrze-elements-b"),
  },
  {
    color: "#fcf8e3",
    slug: "warning",
    name: __("Warning", "rrze-elements-b"),
  },
  {
    color: "#f2dede",
    slug: "danger",
    name: __(
      "Danger",
      "rrze-elements-b"
    ),
  },
];

/**
 * ColorSwitcher component - Provides UI to switch color in block editor.
 *
 * @param {ColorSwitcherProps} props - React props.
 * @returns {JSX.Element} The rendered ColorSwitcher component.
 */
const CustomColorSwitcher = ({ attributes, setAttributes }: ColorSwitcherProps) => {
  // Extract current color from attributes
  const { color } = attributes;

  /**
   * Handle color change.
   *
   * @param {string} newColor - The new selected color.
   */
  const onChangeColor = (newColor: string) => {
    const colorEntry = colorData.find((entry) => entry.color === newColor);
    if (colorEntry) {
      setAttributes({ color: newColor, style: colorEntry.slug });
      updateColorAttributes(newColor, setAttributes);
    } else {
      setAttributes({ color: newColor, style: '' });
      updateColorAttributes(newColor, setAttributes);
    }
  };  

  // Render ColorSwitcher component
  return (
    <PanelBody title={__("Color Settings", "rrze-elements-b")}>
      <ColorPalette
        colors={colorData}
        value={attributes.color}
        onChange={onChangeColor}
        disableCustomColors={false}
        clearable={false}
      />
    </PanelBody>
  );
};

/**
 * ColorSwitcherToolbar component - Provides a toolbar dropdown menu for color selection.
 *
 * @param {ColorSwitcherProps} props - React props.
 * @returns {JSX.Element} The rendered ColorSwitcherToolbar component.
 */
const CustomColorSwitcherToolbar = ({
  attributes,
  setAttributes,
}: ColorSwitcherProps) => {
  const { color } = attributes;

  /**
   * Set the selected color.
   *
   * @param {string} newColor - The new selected color.
   */
  const setColor = (newColor: string) => {
    const colorEntry = colorData.find((entry) => entry.color === newColor);
    if (colorEntry) {
      setAttributes({ color: newColor, style: colorEntry.slug });
    } else {
      setAttributes({ color: newColor, style: '' });
    }
  };

  // Render ColorSwitcherToolbar component
  return (
    <ToolbarGroup>
      <ToolbarItem>
        {() => (
          <ToolbarDropdownMenu
            icon={colorIcon}
            className={`rrzeElementsBFakColorSelector ${attributes.color.slice(1)}`}
            label={__("Select a Color", "rrze-elements-b")}
            controls={colorData.map((entry) => ({
              key: entry.slug,
              title: entry.name,
              icon: colorIcon,
              onClick: () => setColor(entry.color),
            }))}
          />
        )}
      </ToolbarItem>
    </ToolbarGroup>
  );
};

/**
 * ColorSwitcher component - Provides UI to switch color in block editor.
 *
 * @param {ColorSwitcherProps} props - React props.
 * @returns {JSX.Element} The rendered ColorSwitcher component.
 */
const CustomColorPicker = ({ attributes, setAttributes }: ColorSwitcherProps) => {
  // Extract current color from attributes
  const { borderColor } = attributes;

  /**
   * Handle color change.
   *
   * @param {string} newColor - The new selected color.
   */
  const onChangeColor = (newColor: string) => {
    const colorEntry = colorData.find((entry) => entry.color === newColor);
    if (colorEntry) {
      setAttributes({ borderColor: newColor });
    } else {
      setAttributes({ borderColor: newColor });
    }
  };  

  // Render ColorSwitcher component
  return (
    <PanelBody title={__("Border Settings", "rrze-elements-b")}>
      <ColorPicker
        color={attributes.borderColor}
        onChange={onChangeColor}
      />
    </PanelBody>
  );
};

export { CustomColorSwitcher, CustomColorSwitcherToolbar, CustomColorPicker };
