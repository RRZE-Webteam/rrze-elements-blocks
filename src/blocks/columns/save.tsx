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
  const { numberOfColumns, borderColor, width, rule, border } = attributes;
  
  const blockProps = useBlockProps.save({
    className: 'elements-textcolumns',
  });

  const style = {
    columnCount: numberOfColumns,
    columnWidth: width,
    ...(rule ? { columnRule: `1px solid ${borderColor}` } : {}),
    ...(border ? { border: `1px solid ${borderColor}` } : {})
  };

  return (
    <div {...blockProps}>
      <div className={`rrze-elements-blocks-text-column bg-${attributes.colorSlug}`} style={style}>
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
