import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import { AttributesV1_0_19 } from "./attributes";
import type { CSSProperties } from 'react';
import HeadingComponent from "../../../components/HeadingComponent";

const Save = ({ attributes }: BlockSaveProps<AttributesV1_0_19>) => {
  const blockProps = useBlockProps.save();

  return (
    <li {...blockProps}>
      <div className="tooltip">
        <div className="tooltip-arrow"></div>
        <HeadingComponent level={attributes.hstart} className="timeline-label">
          {attributes.title}
        </HeadingComponent>
        <InnerBlocks.Content />
      </div>
    </li>
  );
}

export default Save;
