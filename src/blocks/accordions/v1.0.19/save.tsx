import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import {AttributesV1_0_19} from "./attributes";

const Save = ({ attributes }: BlockSaveProps<AttributesV1_0_19>) => {
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className="accordion">
          <InnerBlocks.Content />
        </div>
      </>
    </div>
  );
}

export default Save;
