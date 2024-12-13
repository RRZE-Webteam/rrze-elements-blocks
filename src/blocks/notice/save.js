//eslint-disable-next-line
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import variations from "./variations";

export default function save({ attributes }) {
  const blockProps = useBlockProps.save();

  const matchedVariation = variations.find(
    (variation) => variation.name === attributes.style
  );

  return (
    <div {...blockProps}>
      <div className="notice">
        <>
          {/* <div
          className={`notice ${attributes.style ? `${attributes.style}` : ""}`}
          style={
            attributes.style
              ? {}
              : {
                  backgroundColor: attributes.color,
                  color: attributes.textColor,
                  border: `1px solid ${attributes.borderColor}`,
                }
          }
        > */}
          <div>
            {/* Render the icon if a matching variation is found */}
            <span
              className={`${matchedVariation?.iconClass} rrze-elements-icon`}
            ></span>
          </div>
          <div>
            <InnerBlocks.Content />
          </div>
        </>
      </div>
    </div>
  );
}
