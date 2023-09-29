import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { sameBlockCount } = attributes;

  return (
    <div {...blockProps}>
      {" "}
      <>
        {/* <div className={`notice notice-download no-title`}>
          <InnerBlocks.Content />
          <div>
          <p>Beispiel</p>
          </div>
        </div> */}
      <div className="alert clearfix clear">
        <InnerBlocks.Content />
      </div>
      </>
    </div>
  );
}
