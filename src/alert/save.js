import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

export default function save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { sameBlockCount, style } = attributes;

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
        <div 
        className={`alert clearfix clear ${attributes.style ? `alert-${attributes.style}` : ''}`}
        style={attributes.style ? {} : {backgroundColor: attributes.color}}
    >
        <InnerBlocks.Content />
      </div>
      </>
    </div>
  );
}
