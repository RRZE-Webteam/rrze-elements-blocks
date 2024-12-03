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
  return (
      <>
          <div {...blockProps}
          >
            <h2>Hello World! {attributes.title}</h2>
          </div>
      </>
  );
}
