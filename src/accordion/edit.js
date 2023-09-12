// Uncomment this:
import { useEffect, useState } from "@wordpress/element";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { isEqual } from 'lodash';


function Edit({ attributes, setAttributes, numberChildren: propNumberChildren, previousBlockClients }) {
  const props = useBlockProps();
  const { sameBlockCount, previouusBlockIds } = attributes;
  const [isNumberChildren, setNumberChildren] = useState(propNumberChildren || 0);

  useEffect(() => {
    if(attributes.childrenCount !== isNumberChildren) {
        setAttributes({ childrenCount: isNumberChildren });
    }
}, [isNumberChildren, setAttributes, attributes.childrenCount]);


useEffect(() => {
  if(!isEqual(attributes.previousBlockIds, previousBlockClients)) {
      setAttributes({ previousBlockIds: previousBlockClients });
  }
}, [previousBlockClients, setAttributes, attributes.previousBlockClients]);

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
  const numberChildren = getBlocks(selectedBlockClientId).length;
  const blockIndex = getBlockIndex(selectedBlockClientId);
  const allBlocks = getBlocks();

  const CollapsiblesBlockClientIds = allBlocks
    .filter(block => block.name === 'rrze-elements/accordion')
    .map(block => block.clientId);

  const currentBlockIndex = CollapsiblesBlockClientIds.indexOf(selectedBlockClientId);
  const previousBlockClients = CollapsiblesBlockClientIds.slice(0, currentBlockIndex);

  return {
    selectedBlock: getBlock(selectedBlockClientId),
    numberChildren: numberChildren,
    blockIndex: blockIndex,
    previousBlockClients: previousBlockClients
  };
})(Edit);

