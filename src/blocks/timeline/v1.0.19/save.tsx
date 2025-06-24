import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import { AttributesV1_0_19 } from "./attributes";
import type { CSSProperties } from 'react';

const Save = ({ attributes }: BlockSaveProps<AttributesV1_0_19>) => {
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      <>
        <ol className="timeline">
          <InnerBlocks.Content />
        </ol>
      </>
    </div>
  );
}

export default Save;
