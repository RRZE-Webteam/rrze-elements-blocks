import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import { AttributesV1 } from "./attributes";

const Save: React.FC<BlockSaveProps<AttributesV1>> = ({ attributes }) => {
  const blockProps = useBlockProps.save();
  const { sameBlockCount } = attributes;

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className="accordion" id={`accordion-${sameBlockCount}`}>
          <InnerBlocks.Content />
        </div>
      </>
    </div>
  );
}

export default Save;
