import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    numberOfColumns : number;
    borderColor: string;
    width: number;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();

  const numberOfColumns = attributes.numberOfColumns;
  const borderColor = attributes.borderColor;
  const width = attributes.width;

  return (
      <>
          <div
      {...blockProps}
      style={{
        columnCount: numberOfColumns,
        columnWidth: width,
        columnRule: `1px solid ${borderColor}`,
      }}
    >
            <InnerBlocks.Content />
          </div>
      </>
  );
}
