import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

type SaveProps = {
  attributes: {
    sameBlockCount: number;
    expandAllLink: boolean;
  };
}

export default function save({ attributes }: SaveProps) {
  const blockProps = useBlockProps.save();
  const { sameBlockCount, expandAllLink } = attributes;

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className="accordion" id={`accordion-${sameBlockCount}`}>
        {expandAllLink && (
          <div className="button-container-right">
            <button className="expand-all standard-btn primary-btn xsmall-btn" data-status="closed">{__("Expand All", "rrze-elements-b")}</button>
          </div>
          )}
          <InnerBlocks.Content />
        </div>
      </>
    </div>
  );
}
