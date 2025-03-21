import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";

type SaveProps = {
  attributes: {
    sameBlockCount: number;
    expandAllLink: boolean;
    expandLabel: string;
  };
};

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  const { expandAllLink, expandLabel } = attributes;

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className="accordion">
          {expandAllLink && (
            <div className="button-container-right">
              <button
                className="expand-all standard-btn primary-btn xsmall-btn"
                data-status="closed"
              >
                {expandLabel}
              </button>
            </div>
          )}
          <InnerBlocks.Content />
        </div>
      </>
    </div>
  );
}
