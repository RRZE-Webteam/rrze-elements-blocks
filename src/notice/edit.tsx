// import { TextControl } from "@wordpress/components";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";
// import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

import {
  StandardColorSwitcher,
  StandardColorSwitcherToolbar,
  BorderColorPicker,
} from "../components/CustomColorSwitcher";

import { IconMarkComponent, IconPicker} from "../components/IconPicker";

interface EditProps {
  attributes: {
    style?: string;
    color: string;
    textColor?: string;
    borderColor?: string;
    icon?: string;
    svgString?: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
  clientId: string;
  context: { [key: string]: any };
  blockProps: any;
}

export default function Edit({
  blockProps,
  attributes,
  setAttributes,
}: EditProps) {
  const props = useBlockProps();
  const { icon } = attributes;
  const [iconType, iconName] = icon?.split(" ") || [];
  // Data for color options
const colorDataAlert = [
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

  return (
    <div {...props}>
      <InspectorControls>
        <StandardColorSwitcher
          attributes={{ color: attributes.color }}
          setAttributes={setAttributes}
          colorData={colorDataAlert}
          hex={true}
          useStyle={true}
          customColor={true}
          useTextColor={true}
        />

        {attributes.style ? null : (
          <BorderColorPicker
            attributes={{ color: attributes.borderColor }}
            setAttributes={setAttributes}
          />
        )}
        <IconPicker
                      attributes={{
                        icon: attributes.icon,
                        svgString: attributes.svgString,
                      }}
                      setAttributes={setAttributes}
                    />
      </InspectorControls>
      <BlockControls controls>
        <StandardColorSwitcherToolbar
          attributes={{ color: attributes.color, style: attributes.style }}
          setAttributes={setAttributes}
          colorData={colorDataAlert}
          hex={true}
          useStyle={true}
        />
      </BlockControls>
      <div
        className={`notice notice-attention no-title ${
          attributes.style ? `alert-${attributes.style}` : ""
        }`}
        style={
          attributes.style
            ? {}
            : {
                backgroundColor: attributes.color,
                color: attributes.textColor,
                border: `1px solid ${attributes.borderColor}`,
              }
        }
      >
        <div>
        {attributes.icon && (
                <IconMarkComponent
                  className="rrze-elements-icon"
                  type={iconType}
                  iconName={iconName}
                  attributes={{
                    icon: attributes.icon,
                    svgString: attributes.svgString,
                  }}
                  setAttributes={setAttributes}
                />
              )}
        </div>
        <InnerBlocks
          template={[
            ["core/paragraph", { placeholder: __("Add a description…") }],
          ]}
          allowedBlocks={["core/paragraph"]}
          templateLock={false}
        />
      </div>
    </div>
  );
}
