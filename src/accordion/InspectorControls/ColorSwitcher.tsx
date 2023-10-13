import { __ } from "@wordpress/i18n";
import {
  ColorPalette,
  PanelBody,
  ToolbarDropdownMenu,
  ToolbarItem,
  ToolbarGroup,
} from "@wordpress/components";
import { color as colorIcon } from "@wordpress/icons";
import { isUndefined } from "lodash";

type ColorSwitcherProps = {
  attributes: {
    color: string;
  };
  setAttributes: (newAttributes: { color: string }) => void;
};

const colorData: { color: string; slug: string; name: string }[] = [
  {
    color: "#fff",
    slug: "inherit",
    name: __("Inherit color", "rrze-elements-b"),
  },
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

const ColorSwitcher = ({ attributes, setAttributes }: ColorSwitcherProps) => {
  const { color } = attributes;
  const onChangeColor = (newColor: string) => {
    let colorEntry: any = "";
    if (isUndefined(newColor)) {
      colorEntry = "";
    } else {
      colorEntry = colorData.find((entry) => entry.color === newColor);
    }
    setAttributes({ color: colorEntry.slug });
  };

  return (
    <PanelBody title={__("Color Settings", "rrze-elements-b")}>
      <ColorPalette
        colors={colorData}
        // value={colorData.find((entry) => entry.slug === color).color}
        onChange={onChangeColor}
        disableCustomColors={true}
        asButtons={false}
        clearable={false}
      />
    </PanelBody>
  );
};

const ColorSwitcherToolbar = ({
  attributes,
  setAttributes,
}: ColorSwitcherProps) => {
  const { color } = attributes;
  const setColor = (newColor: string) => {
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
