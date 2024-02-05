import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import variations from "./variations";

export default function save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { sameBlockCount, style } = attributes;

  const matchedVariation = variations.find(
    (variation) => variation.name === attributes.style
  );

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div 
        className={`notice ${attributes.style ? `${attributes.style}` : ''}`}
        style={attributes.style ? {} : {backgroundColor: attributes.color, color: attributes.textColor, border: `1px solid ${attributes.borderColor}`}}
    >
    
          
            {/* Render the icon if a matching variation is found */}
            {matchedVariation?.icon}
          
        <InnerBlocks.Content />
      </div>
      </>
    </div>
  );
}
