import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    style?: string;
    color?: string;
    textColor?: string;
    borderColor?: string;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();

  // Function to create style object
  const createStyleObject = () => {
    if (attributes.style) {
      return {};
    }

    const styleObj: React.CSSProperties = {
      backgroundColor: attributes.color,
      color: attributes.textColor,
    };

    if (attributes.borderColor) {
      styleObj.border = `1px solid ${attributes.borderColor}`;
    }

    return styleObj;
  };

  return (
    <div {...blockProps}>
      <div 
        className={`alert clearfix clear ${attributes.style ? `alert-${attributes.style}` : ''}`}
        style={createStyleObject()}
      >
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
