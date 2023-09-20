import { __ } from "@wordpress/i18n";
import {
  TextControl,
  ColorPalette,
  PanelBody,
  ToolbarDropdownMenu,
  Toolbar,
  ToolbarItem,
  ToolbarGroup,
} from "@wordpress/components";
import {
  useBlockProps,
  BlockControls,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { useState, useEffect } from "@wordpress/element";
import { color as colorIcon } from "@wordpress/icons";

const colorToSlugMap = {
  "#04316A": "",
  "#C50F3C": "rw",
  "#7bb725": "nat",
  "#18B4F1": "med",
  "#FDB735": "phil",
  "#8C9FB1": "tf",
};

const ColorSwitcher = ({ attributes, setAttributes }) => {
  const { sameBlockCount, title, color } = attributes;

  const onChangeColor = (newColor) => {
    setAttributes({ color: colorToSlugMap[newColor] });
  };

  return (
    <PanelBody title={__("Color Settings", "rrze-elements-b")}>
      <ColorPalette
        colors={[
          {
            name: __("Central institution", "rrze-elements-b"),
            color: "#04316A",
            slug: "",
          },
          {
            name: __(
              "Faculty of Business, Economics, and Law",
              "rrze-elements-b"
            ),
            color: "#C50F3C",
          },
          {
            name: __("Faculty of Sciences", "rrze-elements-b"),
            color: "#7bb725",
          },
          {
            name: __("Faculty of Medicine", "rrze-elements-b"),
            color: "#18B4F1",
          },
          {
            name: __(
              "Faculty of Humanities, Social Sciences, and Theology",
              "rrze-elements-b"
            ),
            color: "#FDB735",
          },
          {
            name: __("Faculty of Engineering", "rrze-elements-b"),
            color: "#8C9FB1",
          },
        ]}
        value={Object.keys(colorToSlugMap).find(
          (key) => colorToSlugMap[key] === color
        )}
        onChange={onChangeColor}
      />
    </PanelBody>
  );
};

const ColorSwitcherToolbar = ({ attributes, setAttributes }) => {
  const { color } = attributes;
  const setColor = (newColor) => {
    setAttributes({ color: colorToSlugMap[newColor] });
  };

  return (
  <ToolbarGroup>
    <ToolbarItem>
      {() => (
        <ToolbarDropdownMenu
          icon={colorIcon}
          className={`rrzeElementsBFakColorSelector ${attributes.color}`}
          label={__("Select a Color", "rrze-elements-b")}
          controls={[
            {
              title: __("Central Institution", "rrze-elements-b"),
              icon: colorIcon,
              onClick: () => setColor("#04316A"),
            },
            {
              title: __(
                "Faculty of Business, Economics, and Law",
                "rrze-elements-b"
              ),
              icon: colorIcon,
              onClick: () => setColor("#C50F3C"),
            },
            {
              title: __("Faculty of Sciences", "rrze-elements-b"),
              icon: colorIcon,
              onClick: () => setColor("#7bb725"),
            },
            {
              title: __("Faculty of Medicine", "rrze-elements-b"),
              icon: colorIcon,
              onClick: () => setColor("#18B4F1"),
            },
            {
              title: __(
                "Faculty of Humanities, Social Sciences, and Theology",
                "rrze-elements-b"
              ),
              icon: colorIcon,
              onClick: () => setColor("#FDB735"),
            },
            {
              title: __("Faculty of Engineering", "rrze-elements-b"),
              icon: colorIcon,
              onClick: () => setColor("#8C9FB1"),
            },
          ]}
        />
      )}
    </ToolbarItem>
  </ToolbarGroup>
  );
};

export { ColorSwitcher, ColorSwitcherToolbar };
