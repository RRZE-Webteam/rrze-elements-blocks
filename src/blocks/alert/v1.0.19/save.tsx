import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import { AttributesV1_0_19 } from "./attributes";
import type { CSSProperties } from 'react';

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

  const createStyleObject = () => {
    if (attributes.style) {
      return {};
    }

    const styleObj: CSSProperties = {
      backgroundColor: attributes.color,
      color: attributes.textColor,
    };

    if (attributes.borderColor) {
      styleObj.border = `1px solid ${attributes.borderColor}`;
    }

    return styleObj;
  };

  const createTitle = () => {
    if (attributes.title && attributes.style === "example") {
      return attributes.title.replace(/"/g, "&quot;");
    }
    return undefined;
  };

  return (
    <div {...blockProps}>
      <div
        className={`alert clearfix clear ${attributes.style ? `alert-${attributes.style}` : ''}`}
        style={createStyleObject()}
        title={createTitle()}
      >
        <InnerBlocks.Content />
      </div>
    </div>
  );
}

export default Save;
