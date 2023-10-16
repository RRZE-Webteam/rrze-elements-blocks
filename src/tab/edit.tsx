import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

interface EditProps {
  attributes: {
    style?: string;
    color?: string;
    title?: string;
    sameBlockCount?: number;
    totalChildrenCount?: number;
    icon: string;
    svgString?: string;
    order?: number;
    active?: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
  clientId: string;
  context: { [key: string]: any };
  blockProps: any;
  selectedBlock: any;
  blockParents: any;
}

type WPBlock = {
  innerBlocks: WPBlock[];
  name?: string;
  attributes?: {
    childrenCount?: number;
  };
  clientId?: string;
};

/**
 * Retrieve all blocks, including nested ones.
 *
 * @param {Array} blocks - List of top-level blocks.
 * @returns {Array} - List of all blocks, including nested ones.
 */
const getAllBlocksRecursively = (blocks: WPBlock[]) => {
  let result = [...blocks];

  blocks.forEach((block) => {
    if (block.innerBlocks && block.innerBlocks.length > 0) {
      result = [...result, ...getAllBlocksRecursively(block.innerBlocks)];
    }
  });

  return result;
};

export default function Edit({
  blockProps,
  attributes,
  setAttributes,
  clientId,
  context,
}: EditProps) {
  const props = useBlockProps();
  const { title } = attributes;

  // Use the useSelect hook to gather necessary data from the WordPress block editor.
  const { selectedBlock, blockParents, siblingBlocks, totalChildrenCount } =
    /**
     * Get relevant data from the block editor to assist with the numbering
     * of the collapsibles.
     */
    useSelect(
      (select) => {
        const { getBlock, getBlockParents, getBlocks } = select(
          "core/block-editor"
        ) as {
          getBlock: Function;
          getBlocks: Function;
          getBlockParents: Function;
        };
        const blockParents = getBlockParents(clientId, true);
        const parentClientId = blockParents[0];
        const siblingBlocks = getBlocks(parentClientId);
        const collapsiblesBeforeMe =
          getBlock(parentClientId)?.attributes?.previousBlockIds || [];
        let totalChildrenCount = 0;
        collapsiblesBeforeMe.forEach((blockClientId: string) => {
          const childrenCount =
            getBlock(blockClientId)?.attributes?.childrenCount || 0;
          totalChildrenCount += childrenCount;
        });

        return {
          selectedBlock: getBlock(clientId),
          blockParents,
          siblingBlocks,
          totalChildrenCount,
        };
      },
      [clientId] // only rerun if clientId changes
    );

  // Effects to keep the attributes in sync with the local state and other calculations.
  useEffect(() => {
    if (attributes.totalChildrenCount !== totalChildrenCount) {
      setAttributes({ totalChildrenCount });
    }
  }, [totalChildrenCount, attributes.totalChildrenCount]);

  /**
   * Function to handle the toggle of color.
   * @param {string} newTag - The new color to be set.
   */
  const handleToggleColor = (newTag: string) => {
    setAttributes({ color: newTag });
  };

  let sameTypeSiblingsBefore = 1;

  /**
   * Calculate the number of siblings of the same type before the current block.
   */
  useEffect(() => {
    if (selectedBlock && blockParents.length > 0) {
      for (const block of siblingBlocks) {
        if (block.clientId === selectedBlock.clientId) {
          break;
        }
        if (block.name === selectedBlock.name) {
          block?.innerBlocks?.forEach((innerBlock: WPBlock) => {
            if (innerBlock.name === "rrze-elements/accordions") {
              sameTypeSiblingsBefore += innerBlock?.innerBlocks?.length || 0;
            }
          });
          sameTypeSiblingsBefore++;
        }
      }
      if (sameTypeSiblingsBefore !== attributes.sameBlockCount) {
        setAttributes({ sameBlockCount: sameTypeSiblingsBefore });
      }
    }
  }, [
    selectedBlock,
    blockParents,
    siblingBlocks,
    attributes.sameBlockCount,
    setAttributes,
  ]);

  useEffect(() => {
    try {
      const array = context["rrze-elements/tabs-order"];
      const clientId = props.id.slice(6);

      if (!Array.isArray(array) || !clientId) {
        throw new Error("Invalid array or clientId is missing.");
      }
      const index = array.indexOf(clientId);

      if (index === -1) {
        throw new Error(
          "ClientId not found in the tabs-order array. It may take a moment for the array to be populated."
        );
      }

      if (index !== attributes.order) {
        setAttributes({ order: index });
      }
    } catch (error) {
      console.error("Info in useEffect:", error.message);
    }
  }, [context["rrze-elements/tabs-order"]]);

  useEffect(() => {
    const tabsArray = context["rrze-elements/tabs"];
    const clientId = props.id.slice(6);
    if (tabsArray && Array.isArray(tabsArray)) {
      const tabObject = tabsArray.find((tab) => String(tab.clientId) === String(clientId));
      
      if (tabObject){
        setAttributes({ title: tabObject.title });
      }
    }
  }, [
    context["rrze-elements/tabs"],
    setAttributes,
  ]);
  
  useEffect(() => {
    if (context["rrze-elements/tabs-active"] !== attributes.active) {
      setAttributes({ active: context["rrze-elements/tabs-active"] });
    }
  }, [attributes.active, context["rrze-elements/tabs-active"]]);

  // Function to handle the change of the title attribute.
  const onChangeTitle = (newText: string) => {
    if (newText === "") {
      setAttributes({ title: " " });
    } else {
      setAttributes({ title: newText });
    }
  };

  const { sameBlockCount, color, icon } = attributes;
  const blockId = props.id.slice(6);
  const classNameValue = (attributes.active === blockId) ? "" : "is-hidden";

  return (
    <>
      <div
        id={`tab-${attributes.sameBlockCount}_tabpanel_reiter-${attributes.sameBlockCount}`}
        role="tabpanel"
        aria-labelledby={`tab-${attributes.sameBlockCount}_reiter-${attributes.sameBlockCount}`}
        className={classNameValue}
      >
        <h2 className="print-only">{attributes.title}</h2>
        <InnerBlocks
          template={[
            [
              "core/paragraph",
              { placeholder: __("Add your content here", "rrze-blocksb") },
            ],
          ]}
        />
      </div>
    </>
  );
}