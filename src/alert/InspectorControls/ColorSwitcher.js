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
  "#e9edf2": "",
  "#dff0d8": "success",
  "#d9edf7": "info",
  "#fcf8e3": "warning",
  "#f2dede": "danger",
};

const ColorSwitcher = ({ attributes, setAttributes }) => {
  const { color, style } = attributes;

  const onChangeColor = (newColor) => {
    console.log('color', newColor);
    console.log('slug', colorToSlugMap[newColor]);
    setAttributes({ color: newColor });
    setAttributes({ style: colorToSlugMap[newColor] });
  };

  return (
    <PanelBody title={__("Color Settings", "rrze-elements-b")}>
      <ColorPalette
        colors={[
          {
            name: __("Default", "rrze-elements-b"),
            color: "#e9edf2",
            slug: "",
          },
          {
            name: __(
              "Success",
              "rrze-elements-b"
            ),
            color: "#dff0d8",
          },
          {
            name: __("Info", "rrze-elements-b"),
            color: "#d9edf7",
          },
          {
            name: __("Warning", "rrze-elements-b"),
            color: "#fcf8e3",
          },
          {
            name: __(
              "Danger",
              "rrze-elements-b"
            ),
            color: "#f2dede",
          },
        ]}
        value={attributes.color}
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
