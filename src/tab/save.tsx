import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

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
          <div
            id={`tab-${tabsUid}_tabpanel_tab-label-${uid}`}
            role="tabpanel"
            aria-labelledby={`${uid}`}
            className=""
            {...blockProps}
          >
            <h2 className="print-only">{attributes.title}</h2>
            <InnerBlocks.Content />
          </div>
      </>
  );
}
