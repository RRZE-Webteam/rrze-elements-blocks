import { useEffect } from "@wordpress/element";
import { useBlockProps, InnerBlocks, store as blockEditorStore } from "@wordpress/block-editor";
import { isEqual } from "lodash";
import { withSelect, useDispatch, useSelect } from "@wordpress/data";

type SaveProps = {
  attributes: {
    expandAllLink: boolean;
    sameBlockCount: number;
    previousBlockIds: string[];
    hstart: number;
    childrenCount: number;
    message: string;
    previousBlockClients: string[];
  };
  setAttributes: (newAttributes: {
    expandAllLink?: boolean;
    sameBlockCount?: number;
    previousBlockIds?: string[];
    hstart?: number;
    childrenCount?: number;
    message?: string;
    previousBlockClients?: string[];
  }) => void;
  clientId?: string;
};

type WPBlock = {
  innerBlocks: WPBlock[];
  name?: string;
  attributes?: {
    childrenCount?: number;
  };
  clientId?: string;
};

export default function Edit({
  attributes,
  setAttributes,
  ...ownProps
}: SaveProps) {
  const props = useBlockProps();
  const { sameBlockCount, previousBlockIds } = attributes;
  const { __unstableMarkNextChangeAsNotPersistent } =
    useDispatch(blockEditorStore);

  const { selectedBlock, numberChildren, blockIndex, previousBlockClients } =
    useSelect(
      (select) => {
        const { getBlock, getBlocks, getBlockIndex } = select(
          "core/block-editor"
        ) as {
          getBlock: Function;
          getBlocks: Function;
          getBlockIndex: Function;
        };
        const selectedBlockClientId = ownProps.clientId;
        const numberChildren = getBlocks(selectedBlockClientId).length;
        const blockIndex = getBlockIndex(selectedBlockClientId);
        const allBlocks = getBlocks();

        const CollapsiblesBlockClientIds = allBlocks
          .filter((block: WPBlock) => block.name === "rrze-elements/accordion")
          .map((block: WPBlock) => block.clientId);

        const currentBlockIndex = CollapsiblesBlockClientIds.indexOf(
          selectedBlockClientId
        );
        const previousBlockClients = CollapsiblesBlockClientIds.slice(
          0,
          currentBlockIndex
        );

        return {
          selectedBlock: getBlock(selectedBlockClientId),
          numberChildren,
          blockIndex,
          previousBlockClients,
        };
      },
      [ownProps.clientId]
    );

  useEffect(() => {
    if (attributes.childrenCount !== numberChildren) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ childrenCount: numberChildren });
    }
  }, [numberChildren, setAttributes, attributes.childrenCount]);

  useEffect(() => {
    if (!isEqual(attributes.previousBlockIds, previousBlockClients)) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ previousBlockIds: previousBlockClients });
    }
  }, [previousBlockClients, setAttributes, attributes.previousBlockClients]);

  return (
    <>
      <div {...props}>
        <div className="accordion" id={`accordion-`}>
          <InnerBlocks
            allowedBlocks={["rrze-elements/accordion"]}
            template={[
              ["rrze-elements/accordion", {}],
              ["rrze-elements/accordion", {}],
            ]}
          />
        </div>
      </div>
    </>
  );
}
