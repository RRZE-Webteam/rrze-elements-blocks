import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import { AttributesV1_0_19 } from "./attributes";
import type { CSSProperties } from 'react';
// @ts-ignore
import variations from "../variations";

interface SaveProps {
  attributes: {
    style?: string;
    color?: string;
    title?: string;
    textColor?: string;
    borderColor?: string;
  };
}

const Save = ({ attributes }: BlockSaveProps<AttributesV1_0_19>) => {
  const blockProps = useBlockProps.save();

  const matchedVariation = variations.find(
    (variation: { name: string; }) => variation.name === attributes.style
  );

  return (
    <div {...blockProps}>
      <div className="notice">
        <>
          {/* <div
          className={`notice ${attributes.style ? `${attributes.style}` : ""}`}
          style={
            attributes.style
              ? {}
              : {
                  backgroundColor: attributes.color,
                  color: attributes.textColor,
                  border: `1px solid ${attributes.borderColor}`,
                }
          }
        > */}
          <div>
            {/* Render the icon if a matching variation is found */}
            <span
              className={`${matchedVariation?.iconClass} rrze-elements-icon`}
            ></span>
          </div>
          <div>
            <InnerBlocks.Content />
          </div>
        </>
      </div>
    </div>
  );
}

export default Save;
