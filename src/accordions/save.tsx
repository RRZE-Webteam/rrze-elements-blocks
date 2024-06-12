import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";

type SaveProps = {
  expandAllLink: boolean;
  sameBlockCount: number;
  previousBlockIds: string[];
  hstart: number;
  childrenCount: number;
  message: string;
  previousBlockClients: string[];
};

const Save: React.FC<BlockSaveProps<SaveProps>> = ({ attributes }) => {
  const blockProps = useBlockProps.save();
  const { sameBlockCount } = attributes;

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