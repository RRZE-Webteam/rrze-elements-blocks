import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import { AttributesV1_0_19 } from "./attributes";
const Save = ({ attributes }: BlockSaveProps<AttributesV1_0_19>) => {
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

export default Save;
