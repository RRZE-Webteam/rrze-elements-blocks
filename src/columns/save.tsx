import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    numberOfColumns: number;
    borderColor: string;
    width: number;
    rule: boolean;
    border: boolean;
    textColor?: string;
    color?: string;
  };
}

export default function save({ attributes }: SaveProps) {
  const { numberOfColumns, borderColor, width, rule, border, textColor } = attributes;
  
  const blockProps = useBlockProps.save({
    className: 'elements-textcolumns',
  });

  const style = {
    columnCount: numberOfColumns,
    columnWidth: width,
    ...(rule ? { columnRule: `1px solid ${borderColor}` } : {}),
    ...(border ? { border: `1px solid ${borderColor}` } : {}),
    backgroundColor: attributes.color,
    // color: attributes.textColor,
  };

  return (
    <>
      <div {...blockProps} style={style}>
        <InnerBlocks.Content />
      </div>
    </>
  );
}
