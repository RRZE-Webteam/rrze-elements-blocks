import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import {
  TextControl
} from "@wordpress/components";
import { isEqual } from "lodash";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

interface Tab {
  title?: string;
  index?: number;
  active?: string;
  clientId?: string;
}

interface EditProps {
  attributes: {
    style?: string;
    color?: string;
    tabs?: Tab[];
    childrenCount?: number;
    previousBlockIds?: string[];
    previousBlockClients?: string[];
    innerClientIds?: string[];
    active?: string;
  };
  setAttributes: (newAttributes: {
    style?: string;
    color?: string;
    tabs?: Tab[];
    childrenCount?: number;
    previousBlockIds?: string[];
    previousBlockClients?: string[];
    innerClientIds?: string[];
    active?: string;
  }) => void;
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
  const { tabs } = attributes;

  const {
    selectedBlock,
    numberChildren,
    blockIndex,
    previousBlockClients,
    innerClientIds,
  } =
    /**
     * Get relevant data from the block editor to assist with the numbering
     * of the collapsibles.
     */
    useSelect(
      (select) => {
        const { getBlock, getBlocks, getBlockIndex } = select(
          "core/block-editor"
        ) as {
          getBlock: Function;
          getBlocks: Function;
          getBlockIndex: Function;
        };
        const selectedBlockClientId = clientId;
        let numberChildren = getBlocks(selectedBlockClientId).length;

        const blockIndex = getBlockIndex(selectedBlockClientId);
        const topLevelBlocks = getBlocks();
        const innerBlocks = getBlocks(selectedBlockClientId);
        const innerClientIds = innerBlocks.map(
          (block: WPBlock) => block.clientId
        );
        const allBlocks = getAllBlocksRecursively(topLevelBlocks);

        const CollapsiblesBlockClientIds = allBlocks
          .filter((block: WPBlock) => block.name === "rrze-elements/tabs")
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
          innerClientIds,
        };
      },
      [clientId]
    );

  useEffect(() => {
    if (attributes.childrenCount !== numberChildren) {
      setAttributes({ childrenCount: numberChildren });
    }
  }, [numberChildren, setAttributes, attributes.childrenCount]);

  useEffect(() => {
    if (!isEqual(attributes.previousBlockIds, previousBlockClients)) {
      setAttributes({ previousBlockIds: previousBlockClients });
    }
  }, [previousBlockClients, setAttributes, attributes.previousBlockIds]);

  useEffect(() => {
    if (innerClientIds.length === 0) {
      return;
    }

    if (!isEqual(attributes.innerClientIds, innerClientIds)) {
      setAttributes({ innerClientIds });
    }
  }, [innerClientIds, setAttributes]);

  const syncTabsWithInnerBlocks = () => {
    console.log("innerClientIds", innerClientIds);
    console.log("tabs", tabs);

    const newTabsOrder = innerClientIds.map((clientId: string) => {
      const existingTab = tabs.find((tab) => tab.clientId === clientId);
      if (existingTab) {
        return existingTab;
      }
      return {
        title: "",
        clientId: clientId,
      };
    });

    // Only update if there's a change
    if (!isEqual(newTabsOrder, tabs)) {
      setAttributes({ tabs: newTabsOrder });
    }
  };

  useEffect(() => {
    if (attributes.tabs.length !== 0) {
      syncTabsWithInnerBlocks();
    }
  }, [innerClientIds, attributes.tabs]);

  // Function to handle the change of the title attribute.
  const onChangeTitle = (newText: string, index: number) => {
    let newTabs = [...tabs];

    if (!newTabs[index]) {
      newTabs[index] = {};
    }

    newTabs[index].title = newText;
    newTabs[index].clientId = innerClientIds[index];
    setAttributes({ tabs: newTabs });

    onChangeActive(index);
  };

  useEffect(() => {
    if (attributes.active === "" && innerClientIds[0] !== undefined) {
      setAttributes({ active: innerClientIds[0] });
    }
  }, [innerClientIds]);

  const onChangeActive = (index: number) => {
    let newTabs = [...tabs];
    if (newTabs[index]) {
      if (innerClientIds[index] !== undefined) {
        setAttributes({ active: innerClientIds[index] });
      }
    }
  };

  const ariaSelected: any = (index: number) => {
    if (
      innerClientIds[index] === attributes.active ||
      attributes.active === ""
    ) {
      return true;
    }
    return false;
  };

  console.log(attributes);
  return (
    <>
      <div className="rrze-elements-tabs primary" id="tabs-1">
        <div role="tablist" className="manual">
          {attributes.innerClientIds.map((innerClientId, index) => {
            return (
              <button
                key={index}
                onClick={() => onChangeActive(index)}
                id={`tab-${index + 1}_reiter-${index + 1}`}
                type="button"
                role="tab"
                aria-selected={ariaSelected(index)}
                aria-controls={`tab-${index + 1}_tabpanel_reiter-${index + 1}`}
              >
                <span className="focus" tabIndex={-1}>
                  {/* <TextControl
                    onChange={(text) => onChangeTitle(text, index)}
                    value={attributes.tabs[index]?.title}
                    placeholder={__("Tab Title", "rrze-elements")}
                    className="elements-blocks-input-following-icon"
                  /> */}
                  InnerProps Title & UID          
                </span>
              </button>
            );
          })}
        </div>
        <InnerBlocks
          allowedBlocks={["rrze-elements/tab"]}
          template={[["rrze-elements/tab"], ["rrze-elements/tab"]]}
        />
      </div>
    </>
  );
}
