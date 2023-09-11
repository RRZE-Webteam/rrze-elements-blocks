import { 
  TextControl, 
  ColorPalette, 
  PanelBody,   
  ToolbarDropdownMenu,
  Toolbar,
  ToolbarGroup
} from "@wordpress/components";
import {
  useBlockProps,
  BlockControls,
  InnerBlocks,
  InspectorControls
} from "@wordpress/block-editor";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";

function Edit({
  attributes,
  setAttributes,
  selectedBlock,
  blockParents,
  siblingBlocks,
  // ToolbarButton,
}) {
  const props = useBlockProps();
  const [isActive, setIsActive] = useState(false);
  const { sameBlockCount, title, color } = attributes;

  const colorToSlugMap = {
    "#04316A": "",
    "#C50F3C": "rw",
    "#7bb725": "nat",
    "#18B4F1": "med",
    "#FDB735": "phil",
    "#8C9FB1": "tech",
  };

  const onChangeColor = (newColor) => {
    setAttributes({ color: colorToSlugMap[newColor] });
  };

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const onChangeTitle = (newText) => {
    if (newText === "") {
      setAttributes({ title: " " });
    } else {
      setAttributes({ title: newText });
    }
  };

  let sameTypeSiblingsBefore = 0;
  if (selectedBlock && blockParents.length > 0) {
    for (const block of siblingBlocks) {
      if (block.clientId === selectedBlock.clientId) {
        break;
      }
      if (block.name === selectedBlock.name) {
        sameTypeSiblingsBefore++;
      }
    }
    if (sameTypeSiblingsBefore !== attributes.sameBlockCount) {
      setAttributes({ sameBlockCount: sameTypeSiblingsBefore });
    }
  }

  const handleToggleColor = (newTag) => {
    setAttributes({ color: newTag });
  };

  return (
    <>
      <BlockControls>
        <Toolbar label="Options">
          <ToolbarGroup>
            <ToolbarDropdownMenu
              icon={null}
              label="Select a color"
              value={attributes.color}
              controls={[
                {
                  title: __("FAU Blau", "rrze-elements"),
                  isDisabled: color === "",
                  onClick: () => handleToggleColor(""),
                },
                {
                  title: __("RW Rot", "rrze-elements"),
                  isDisabled: color === "rw",
                  onClick: () => handleToggleColor("rw"),
                },
                {
                  title: __("Phil Gelb", "rrze-elements"),
                  isDisabled: color === "phil",
                  onClick: () => handleToggleColor("phil"),
                },
                {
                  title: __("Nat Grün", "rrze-elements"),
                  isDisabled: color === "nat",
                  onClick: () => handleToggleColor("nat"),
                },
                {
                  title: __("Med Blau", "rrze-elements"),
                  isDisabled: color === "med",
                  onClick: () => handleToggleColor("med"),
                },
                {
                  title: __("TF Grau", "rrze-elements"),
                  isDisabled: color === "tf",
                  onClick: () => handleToggleColor("tf"),
                },
              ]}
            />
          </ToolbarGroup>
        </Toolbar>
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__("Settings", "text-box")}>
          <ColorPalette
            colors={[
              { name: "Zentrale Institution", color: "#04316A", slug: "" },
              {
                name: "Rechts- und Wirtschafts­wissenschaftliche Fakultät",
                color: "#C50F3C",
              },
              { name: "Naturwissenschaftliche Fakultät", color: "#7bb725" },
              { name: "Medizinische Fakultät", color: "#18B4F1" },
              {
                name: "Philosophische Fakultät und Fachbereich Theologie",
                color: "#FDB735",
              },
              { name: "Technische Fakultät", color: "#8C9FB1" },
            ]}
            value={Object.keys(colorToSlugMap).find(
              (key) => colorToSlugMap[key] === color
            )}
            onChange={onChangeColor}
          />
        </PanelBody>
      </InspectorControls>

      <div {...props}>
        <div className={`accordion-group ${color}`}>
          <h2 className="accordion-heading" onClick={toggleActive}>
            <span className="read-mode-only">{title}</span>
            <TextControl
              className={`accordion-toggle ${isActive ? "active" : ""}`}
              onChange={onChangeTitle}
              value={title}
              placeholder={__("Your Text", "text-box")}
            />
          </h2>
          <div
            id={`collapse_${sameTypeSiblingsBefore}`}
            className={`accordion-body ${isActive ? "active" : ""}`}
          >
            <div className="accordion-inner clearfix">
              <InnerBlocks />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default withSelect((select, ownProps) => {
  const { getBlock, getBlockParents, getBlocks } = select("core/block-editor");
  const selectedBlockClientId = ownProps.clientId;
  const blockParents = getBlockParents(selectedBlockClientId, true);
  const parentClientId = blockParents[0];

  return {
    selectedBlock: getBlock(selectedBlockClientId),
    blockParents: blockParents,
    siblingBlocks: getBlocks(parentClientId),
  };
})(Edit);
