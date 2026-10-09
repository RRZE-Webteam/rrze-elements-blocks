import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

const Save = () => {
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
