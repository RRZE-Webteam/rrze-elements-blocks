// import { TextControl } from "@wordpress/components";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";
// import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";

import {
  CustomColorSwitcher,
  CustomColorSwitcherToolbar,
  CustomColorPicker,
} from "./InspectorControls/ColorSwitcher";

interface EditProps {
  attributes: {
    style?: string;
    color: string;
    textColor?: string;
    borderColor?: string;
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

  return (
    <div {...props}>
      <InspectorControls>
        <CustomColorSwitcher
          attributes={{ color: attributes.color, style: attributes.style }}
          setAttributes={setAttributes}
        />
        {attributes.style ? null : (
          <CustomColorPicker
            attributes={{ color: attributes.color, style: attributes.style }}
            setAttributes={setAttributes}
          />
        )}
      </InspectorControls>
      <BlockControls controls>
        <CustomColorSwitcherToolbar
          attributes={{ color: attributes.color, style: attributes.style }}
          setAttributes={setAttributes}
        />
      </BlockControls>
      <div
        className={`alert clearfix clear ${
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
