import { useBlockProps } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    color: string;
    tabsUid: string;
    blockId: string;
    title: string;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  const tabsUid = attributes.tabsUid;
  const uid = attributes.blockId.slice(0, 10);

  return (
      <>
          <div {...blockProps}
          >
            <h2>Hello World!</h2>
          </div>
      </>
  );
}
