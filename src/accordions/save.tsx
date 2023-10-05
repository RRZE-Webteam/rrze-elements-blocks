import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

type SaveProps = {
  attributes: {
    sameBlockCount: number;
  };
  setAttributes: (newAttributes: {
    sameBlockCount?: number;
  }) => void;
  clientId?: string;
};

export default function save({ attributes }: SaveProps) {
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
