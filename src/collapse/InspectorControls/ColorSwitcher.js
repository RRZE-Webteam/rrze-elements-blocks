import { __ } from "@wordpress/i18n";
import {
  TextControl,
  ColorPalette,
  PanelBody,
  ToolbarDropdownMenu,
  Toolbar,
  ToolbarGroup,
} from "@wordpress/components";
import {
  useBlockProps,
  BlockControls,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { useState, useEffect } from "@wordpress/element";

const ColorSwitcher = ({ attributes, setAttributes }) => {
  const colorToSlugMap = {
    "#04316A": "",
    "#C50F3C": "rw",
    "#7bb725": "nat",
    "#18B4F1": "med",
    "#FDB735": "phil",
    "#8C9FB1": "tech",
  };

  const { sameBlockCount, title, color } = attributes;

  const onChangeColor = (newColor) => {
    setAttributes({ color: colorToSlugMap[newColor] });
  };

  return (
    <PanelBody title={__("Color Settings", "rrze-elements-b")}>
      <ColorPalette
        colors={[
          { name: __("Central institution", "rrze-elements-b"), color: "#04316A", slug: "" },
          {
            name: __("Faculty of Business, Economics, and Law", "rrze-elements-b"),
            color: "#C50F3C",
          },
          { name: __("Faculty of Sciences", "rrze-elements-b"), color: "#7bb725" },
          { name: __("Faculty of Medicine", "rrze-elements-b"), color: "#18B4F1" },
          {
            name: __("Faculty of Humanities, Social Sciences, and Theology", "rrze-elements-b"),
            color: "#FDB735",
          },
          { name: __("Faculty of Engineering", "rrze-elements-b"), color: "#8C9FB1" },
        ]}
        value={Object.keys(colorToSlugMap).find(
          (key) => colorToSlugMap[key] === color
        )}
        onChange={onChangeColor}
      />
    </PanelBody>
  );
};

export default ColorSwitcher;
