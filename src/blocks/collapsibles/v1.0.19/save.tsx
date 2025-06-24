import {BlockSaveProps} from "@wordpress/blocks";
import {useBlockProps, InnerBlocks} from "@wordpress/block-editor";
import {AttributesV1_0_19} from "./attributes";

const Save = ({attributes}: BlockSaveProps<AttributesV1_0_19>) => {
  const blockProps = useBlockProps.save();
  const {expandAllLink, expandLabel} = attributes;

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
          <InnerBlocks.Content/>
        </div>
      </>
    </div>
  );
};

export default Save;
