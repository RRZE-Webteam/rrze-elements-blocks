import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import { AttributesV1_0_19 } from "./attributes";
import type { CSSProperties } from 'react';

const Save = ({ attributes }: BlockSaveProps<AttributesV1_0_19>) => {
  const blockProps = useBlockProps.save();
  const tabsUid = attributes.tabsUid;
  const uid = attributes.blockId.slice(0, 10);

  return (
    <>
      <div
        id={`tab-${tabsUid}_tabpanel_tab-label-${uid}`}
        role="tabpanel"
        aria-labelledby={`${uid}`}
        className=""
        {...blockProps}
      >
        <h2 className="print-only">{attributes.title}</h2>
        <InnerBlocks.Content />
      </div>
    </>
  );
}

export default Save;
