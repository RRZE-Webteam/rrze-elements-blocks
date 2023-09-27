import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export default function save({ attributes }) {
  const blockProps = useBlockProps.save();
  const { sameBlockCount, expandAllLink } = attributes;

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className="accordion" id={`accordion-${sameBlockCount}`}>
        {expandAllLink && (
          <div class="button-container-right">
            <button class="expand-all standard-btn primary-btn xsmall-btn" data-status="closed">{__("Expand All", "rrze-elements-b")}</button>
          </div>
          )}
          <InnerBlocks.Content />
        </div>
      </>
    </div>
  );
}
