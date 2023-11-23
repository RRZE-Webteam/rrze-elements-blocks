import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    color: string;
    tabsUid: string;
    blockId: string;
    title: string;
    alignment: string;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  const alignment = attributes.alignment;
  console.log(blockProps);

  return (
      <>
          <aside className={`pull-${alignment} ${blockProps?.className}`}>
            <InnerBlocks.Content />
          </aside>
      </>
  );
}
