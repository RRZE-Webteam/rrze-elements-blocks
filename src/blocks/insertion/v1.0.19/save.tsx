import {InnerBlocks, useBlockProps} from "@wordpress/block-editor";
import {BlockSaveProps} from "@wordpress/blocks";
import {AttributesV1_0_19} from "./attributes";

const Save = ({attributes}: BlockSaveProps<AttributesV1_0_19>) => {
  const blockProps = useBlockProps.save();
  const alignment = attributes.alignment;

  return (
    <>
      <aside className={`pull-${alignment} ${blockProps?.className}`}>
        <InnerBlocks.Content />
      </aside>
    </>
  );
}

export default Save;
