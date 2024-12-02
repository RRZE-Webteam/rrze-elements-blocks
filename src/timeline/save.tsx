import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save() {
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
