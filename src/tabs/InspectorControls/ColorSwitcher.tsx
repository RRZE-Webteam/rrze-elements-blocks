// Import WordPress dependencies
import { __ } from "@wordpress/i18n";
import {
  ColorPalette,
  PanelBody,
  ToolbarDropdownMenu,
  ToolbarItem,
  ToolbarGroup,
} from "@wordpress/components";
import { color as colorIcon } from "@wordpress/icons";

// Define TypeScript interface for component props
type ColorSwitcherProps = {
  attributes: {
    color: string;
  };
  setAttributes: (newAttributes: { color: string }) => void;
};

// Data for color options
const colorData = [
  {
    color: "#04316A",
    slug: "fau",
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

/**
 * ColorSwitcher component - Provides UI to switch color in block editor.
 *
 * @param {ColorSwitcherProps} props - React props.
 * @returns {JSX.Element} The rendered ColorSwitcher component.
 */
const ColorSwitcher = ({ attributes, setAttributes }: ColorSwitcherProps) => {
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
      setAttributes({ color: colorEntry.slug });
    }
  };

  // Render ColorSwitcher component
  return (
    <PanelBody title={__("Color Settings", "rrze-elements-b")}>
      <ColorPalette
        colors={colorData}
        value={colorData.find((entry) => entry.slug === color)?.color}
        onChange={onChangeColor}
        disableCustomColors={true}
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
const ColorSwitcherToolbar = ({
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
      setAttributes({ color: colorEntry.slug });
    }
  };

  // Render ColorSwitcherToolbar component
  return (
    <ToolbarGroup>
      <ToolbarItem>
        {() => (
          <ToolbarDropdownMenu
            icon={colorIcon}
            className={`rrzeElementsBFakColorSelector ${attributes.color}`}
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

export { ColorSwitcher, ColorSwitcherToolbar };
