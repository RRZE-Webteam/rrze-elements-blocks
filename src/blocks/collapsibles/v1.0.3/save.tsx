import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { BlockSaveProps } from "@wordpress/blocks";
import { AttributesV1 } from "./attributes";
import { __ } from "@wordpress/i18n";

const Save = ({ attributes }: BlockSaveProps<AttributesV1>) => {
  const blockProps = useBlockProps.save();
  const { sameBlockCount, expandAllLink } = attributes;

  return (
    <div {...blockProps}>
      {" "}
      <>
        <div className="accordion" id={`accordion-${sameBlockCount}`}>
          {expandAllLink && (
            <div className="button-container-right">
              <button
                className="expand-all standard-btn primary-btn xsmall-btn"
                data-status="closed"
              >
                {/* Preserve the historical translation domain for saved-block validation. */}
                {/* eslint-disable-next-line @wordpress/i18n-text-domain */}
                {__("Expand All", "rrze-elements-b")}
              </button>
            </div>
          )}
          <InnerBlocks.Content />
        </div>
      </>
    </div>
  );
};

export default Save;