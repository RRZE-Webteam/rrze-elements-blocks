// import { TextControl } from "@wordpress/components";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
// import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";

function Edit({ blockProps, attributes, selectedBlock, setAttributes, blockParents}) {
  const props = useBlockProps();
  const { sameBlockCount } = attributes;

  // let sameTypeSiblingsBefore = 0;
  // if (selectedBlock && blockParents.length > 0) {
  //   for (const block of siblingBlocks) {
  //     if (block.clientId === selectedBlock.clientId) {
  //       break;
  //     }
  //     if (block.name === selectedBlock.name) {
  //       sameTypeSiblingsBefore++;
  //     }
  //   }
  //   if (sameTypeSiblingsBefore !== attributes.sameBlockCount) {
  //     setAttributes({ sameBlockCount: sameTypeSiblingsBefore });
  //   }
  // }

  return (
    <>
      <div {...props}>
        <div className="accordion" id={`accordion-`}>
              <InnerBlocks 
                allowedBlocks={['rrze-elements/accordion']}
                template={[
                    ['rrze-elements/collapse', {}],
                    ['rrze-elements/collapse', {}]
                  ]} />
        </div>
      </div>
    </>
  );
}

export default withSelect((select, ownProps) => {
  const { getBlock, getBlockParents, getBlocks, getBlockIndex } = select("core/block-editor");
  const selectedBlockClientId = ownProps.clientId;
  // console.log(ownProps);
  const blockIndex = getBlockIndex(selectedBlockClientId);
  // console.log(blockIndex);

  return {
    selectedBlock: getBlock(selectedBlockClientId),
    blockIndex: blockIndex,
  };
})(Edit);