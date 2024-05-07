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
    colorSlug?: string;
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
    ...(border ? { border: `1px solid ${borderColor}` } : {})
  };

  let colorClass = attributes.colorSlug || "colorless";
  if(colorClass === "undefined" || colorClass === "colorless") {
    colorClass = "";
  }
  
  return (
    <>
      <div {...blockProps} className={`${blockProps.className} ${colorClass}`} style={style}>
        <InnerBlocks.Content />
      </div>
    </>
  );
}
