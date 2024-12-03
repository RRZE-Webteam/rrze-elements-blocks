import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

const Save = () => {
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