import { useEffect } from "@wordpress/element";
import { useBlockProps, InnerBlocks } from "@wordpress/block-editor";
import { isEqual } from 'lodash';
import { withSelect, useDispatch, useSelect } from "@wordpress/data";


export default function Edit({ attributes, setAttributes, ...ownProps }) {
  const props = useBlockProps();
  const { sameBlockCount, previousBlockIds } = attributes;

  

  const {
    selectedBlock,
    numberChildren,
    blockIndex,
    previousBlockClients
  } = useSelect((select) => {
    const { getBlock, getBlocks, getBlockIndex } = select("core/block-editor");
    const selectedBlockClientId = ownProps.clientId;
    const numberChildren = getBlocks(selectedBlockClientId).length;
    const blockIndex = getBlockIndex(selectedBlockClientId);
    const allBlocks = getBlocks();
  
    const CollapsiblesBlockClientIds = allBlocks
      .filter(block => block.name === 'rrze-elements/collapsibles')
      .map(block => block.clientId);
  
    const currentBlockIndex = CollapsiblesBlockClientIds.indexOf(selectedBlockClientId);
    const previousBlockClients = CollapsiblesBlockClientIds.slice(0, currentBlockIndex);
  
    return {
      selectedBlock: getBlock(selectedBlockClientId),
      numberChildren,
      blockIndex,
      previousBlockClients
    };
  }, [ownProps.clientId]);

  useEffect(() => {
    if(attributes.childrenCount !== numberChildren) {
        setAttributes({ childrenCount: numberChildren });
    }
  }, [numberChildren, setAttributes, attributes.childrenCount]);

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
            allowedBlocks={['rrze-elements/collapse']}
            template={[
              ['rrze-elements/collapse', {}],
              ['rrze-elements/collapse', {}]
            ]} />
        </div>
      </div>
    </>
  );
}
