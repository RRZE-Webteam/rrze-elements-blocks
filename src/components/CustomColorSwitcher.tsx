import { __ } from "@wordpress/i18n";
import {
  ColorPalette,
  PanelBody,
  ToolbarDropdownMenu,
  ToolbarItem,
  ToolbarGroup,
  ColorPicker,
} from "@wordpress/components";
import { color as colorIcon } from "@wordpress/icons";
//@ts-ignore
import { useSetting } from "@wordpress/block-editor";
import Color from "color";

/**
 * Type definition for ColorSwitcherProps.
 * Represents properties for color switcher components.
 *
 * @typedef {Object} ColorSwitcherProps
 * @property {Object} attributes - Contains color-related attributes.
 * @property {Function} setAttributes - Function to update attributes.
 * @property {Array} [colorData] - Optional array of color data.
 * @property {boolean} [hex] - Flag to indicate if hex values are used.
 * @property {boolean} [useStyle] - Flag to apply styles.
 * @property {boolean} [customColor] - Flag for custom color usage.
 * @property {boolean} [useTextColor] - Flag to set textcolor attribute based on selected Color.
 * @property {boolean} [overwriteThemeColors] - Flag to overwrite theme colors.
 * @property {boolean} [clearButton] - Flag to show clear button.
 */
type ColorSwitcherProps = {
  attributes: {
    color: string;
    borderColor?: string;
    style?: string;
  };
  setAttributes: (newAttributes: {
    color?: string;
    style?: string;
    textColor?: string;
    borderColor?: string;
  }) => void;
  colorData?: { color: string; slug: string; name: string }[];
  hex?: boolean;
  useStyle?: boolean;
  customColor?: boolean;
  useTextColor?: boolean;
  overwriteThemeColors?: boolean;
  clearButton ?: boolean;
};

/**
 * Updates color attributes based on color contrast.
 *
 * @param {string} bgColor - Background color.
 * @param {Function} setAttributes - Function to set attributes.
 */
const updateColorAttributes = (
  bgColor: string,
  setAttributes: ColorSwitcherProps["setAttributes"]
): void => {
  try {
    if (bgColor) {
      const parsedColor = Color(bgColor).isDark();

      const whiteColor = "#ffffff";

      // Determine text color based on the luminosity of the background color
      const newFontColor = parsedColor ? whiteColor : "";

      // Update text color attribute
      setAttributes({ textColor: newFontColor });
    }
  } catch (error) {
    console.error(
      "Invalid color string provided to updateColorAttributes:",
      error
    );
  }
};

/**
 * Handles changes in color selection.
 *
 * @param {Array} colorData - Array of color data.
 * @param {string} newColor - New color value.
 * @param {Function} setAttributes - Function to set attributes.
 * @param {boolean} [outputHex=false] - Output hex value if true.
 * @param {boolean} [useStyle=false] - Use style attributes if true.
 * @param {boolean} [useTextColor=false] - Use textcolor based on selected color if true.
 */
const handleColorChange = (
  colorData: { color: string; slug: string; name: string }[],
  newColor: string,
  setAttributes: (newAttributes: { color?: string; style?: string }) => void,
  outputHex: boolean = false,
  useStyle: boolean = false,
  useTextColor: boolean = false
) => {
  const colorEntry = colorData.find((entry) => entry.color === newColor);
  if (colorEntry && outputHex) {
    setAttributes({ color: colorEntry.color });
    updateColorAttributes(newColor, setAttributes);
    if (useStyle) {
      setAttributes({ style: colorEntry.slug });
      updateColorAttributes(newColor, setAttributes);
    }
  } else if (colorEntry) {
    setAttributes({ color: colorEntry.slug });
  } else {
    if (useStyle) {
      setAttributes({ color: newColor, style: "" });
      if (useTextColor) {
        updateColorAttributes(newColor, setAttributes);
      }
    }
  }
};

/**
 * ColorSwitcher component.
 * Provides a UI for color selection in block editor.
 *
 * @param {ColorSwitcherProps} props - Component properties.
 * @returns {JSX.Element} Rendered ColorSwitcher component.
 */
const ColorSwitcher = ({
  attributes,
  setAttributes,
  hex,
  useStyle,
  customColor = false,
  useTextColor = false,
  overwriteThemeColors = false,
  clearButton = false,
}: ColorSwitcherProps) => {

  // if the theme colorPalette is not empty, use it instead of the passed values!
  // Example entry from colorPalette [Log] [{slug: "primary", color: "#005177", name: "Primary"}, {slug: "accent", color: "#f2a900", name: "Accent"}] (2)
  // const colorPalette = useSetting( 'color.palette' );
  // console.log(colorPalette);
  const themeColorPalette = !overwriteThemeColors
  ? useSetting('color.palette') as { color: string; slug: string; name: string }[]
  : null;
  const colorData = themeColorPalette || standardColorData;

  const value = hex
    ? attributes.color
    : colorData.find((entry) => entry.slug === attributes.color)?.color;

  return (
    <PanelBody title={__("Color Settings", "rrze-elements-b")}>
      <ColorPalette
        colors={colorData}
        value={value}
        onChange={(newColor: string) =>
          handleColorChange(
            colorData,
            newColor,
            setAttributes,
            hex,
            useStyle,
            useTextColor
          )
        }
        disableCustomColors={!customColor}
        clearable={clearButton}
      />
    </PanelBody>
  );
};

/**
 * ColorSwitcherToolbar component.
 * Provides a toolbar for color selection.
 *
 * @param {ColorSwitcherProps} props - Component properties.
 * @returns {JSX.Element} Rendered ColorSwitcherToolbar component.
 */
const ColorSwitcherToolbar = ({
  attributes,
  setAttributes,
  colorData = standardColorData,
  useStyle = false,
  hex = false,
  overwriteThemeColors = false,
}: ColorSwitcherProps) => {
  const themeColorPalette = !overwriteThemeColors
    ? useSetting('color.palette') as { color: string; slug: string; name: string }[]
    : null;

  const effectiveColorData = themeColorPalette || colorData;

  const classLabel = hex
    ? `rrzeElementsBFakColorSelector ${attributes.color.slice(1)}`
    : `rrzeElementsBFakColorSelector ${attributes.color}`;
  return (
    <ToolbarGroup>
      <ToolbarItem>
        {() => (
          <ToolbarDropdownMenu
            icon={colorIcon}
            className={classLabel}
            label={__("Select a Color", "rrze-elements-b")}
            controls={effectiveColorData.map((entry) => ({
              key: entry.slug,
              title: entry.name,
              icon: colorIcon,
              onClick: () =>
                setAttributes({
                  color: hex ? entry.color : entry.slug,
                  style: useStyle ? entry.slug : "",
                }),
            }))}
          />
        )}
      </ToolbarItem>
    </ToolbarGroup>
  );
};

/**
 * BorderColorPicker component.
 * Provides a UI for border color selection in block editor.
 *
 * @param {ColorSwitcherProps} props - Component properties.
 * @returns {JSX.Element} Rendered BorderColorPicker component.
 */
const BorderColorPicker = ({
  attributes,
  setAttributes,
}: ColorSwitcherProps) => {
  // Extract current color from attributes
  const { borderColor } = attributes;

  /**
   * Handle color change.
   *
   * @param {string} newColor - The new selected color.
   */
  const onChangeColor = (newColor: string) => {
    setAttributes({ borderColor: newColor });
  };

  // Render ColorSwitcher component
  return (
    <PanelBody title={__("Border Settings", "rrze-elements-b")} initialOpen={false}>
      <ColorPicker color={attributes.borderColor} onChange={onChangeColor} />
    </PanelBody>
  );
};

// Default color data
const standardColorData = [
  {
    color: "#04316A",
    slug: "",
    name: __("Central institution", "rrze-elements-b"),
  },
  {
    color: "#C50F3C",
    slug: "rw",
    name: __("Faculty of Business, Economics, and Law", "rrze-elements-b"),
  },
  {
    color: "#7bb725",
    slug: "nat",
    name: __("Faculty of Sciences", "rrze-elements-b"),
  },
  {
    color: "#18B4F1",
    slug: "med",
    name: __("Faculty of Medicine", "rrze-elements-b"),
  },
  {
    color: "#FDB735",
    slug: "phil",
    name: __(
      "Faculty of Humanities, Social Sciences, and Theology",
      "rrze-elements-b"
    ),
  },
  {
    color: "#8C9FB1",
    slug: "tf",
    name: __("Faculty of Engineering", "rrze-elements-b"),
  },
];

const extendedColorData: { color: string; slug: string; name: string }[] = [
  {
    color: "#fff",
    slug: "inherit",
    name: __("Inherit color", "rrze-elements-b"),
  },
  ...standardColorData,
];

// Export components using different colorData
export const StandardColorSwitcher = (props: ColorSwitcherProps) => (
  <ColorSwitcher {...props} />
);
export const StandardColorSwitcherToolbar = (props: ColorSwitcherProps) => (
  <ColorSwitcherToolbar {...props} />
);

export const ExtendedColorSwitcher = (props: ColorSwitcherProps) => (
  <ColorSwitcher {...props} colorData={extendedColorData} />
);
export const ExtendedColorSwitcherToolbar = (props: ColorSwitcherProps) => (
  <ColorSwitcherToolbar {...props} colorData={extendedColorData} />
);

export { BorderColorPicker };
