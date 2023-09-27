import { __ } from "@wordpress/i18n";
import {
  ColorPalette,
  PanelBody,
  ToolbarDropdownMenu,
  ToolbarItem,
  ToolbarGroup,
} from "@wordpress/components";
import { color as colorIcon } from "@wordpress/icons";

const colorData = [
  { color: "#04316A", slug: "", name: __("Central institution", "rrze-elements-b") },
  { color: "#C50F3C", slug: "rw", name: __("Faculty of Business, Economics, and Law", "rrze-elements-b") },
  { color: "#7bb725", slug: "nat", name: __("Faculty of Sciences", "rrze-elements-b") },
  { color: "#18B4F1", slug: "med", name: __("Faculty of Medicine", "rrze-elements-b") },
  { color: "#FDB735", slug: "phil", name: __("Faculty of Humanities, Social Sciences, and Theology", "rrze-elements-b") },
  { color: "#8C9FB1", slug: "tf", name: __("Faculty of Engineering", "rrze-elements-b") },
];

const ColorSwitcher = ({ attributes, setAttributes }) => {
  const { color } = attributes;
  const onChangeColor = (newColor) => {
    const colorEntry = colorData.find((entry) => entry.color === newColor);
    console.log(colorEntry);
    setAttributes({ color: colorEntry.slug });
  };

  return (
    <PanelBody title={__("Color Settings", "rrze-elements-b")}>
      <ColorPalette
        colors={colorData}
        value={colorData.find((entry) => entry.slug === color).color}
        onChange={onChangeColor}
      />
    </PanelBody>
  );
};

const ColorSwitcherToolbar = ({ attributes, setAttributes }) => {
  const { color } = attributes;
  const setColor = (newColor) => {
    const colorEntry = colorData.find((entry) => entry.color === newColor);
    setAttributes({ color: colorEntry.slug });
  };

  return (
    <ToolbarGroup>
      <ToolbarItem>
        {() => (
          <ToolbarDropdownMenu
            icon={colorIcon}
            className={`rrzeElementsBFakColorSelector ${attributes.color}`}
            label={__("Select a Color", "rrze-elements-b")}
            controls={colorData.map((entry) => ({
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