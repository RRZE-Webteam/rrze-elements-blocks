import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

interface SaveProps {
  attributes: {
    color: string;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();

  return (
    <div {...blockProps}>
      {" "}
      <>
          <div
            id="tab-1_tabpanel_reiter-1"
            role="tabpanel"
            aria-labelledby="tab-1_reiter-1"
            className=""
          >
            <h2 className="print-only">Reiter 1</h2>
            <InnerBlocks.Content />
          </div>
      </>
    </div>
  );
}
