// WordPress Imports
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
import InputWarning from "../components/InputWarning";

// Other Imports
import { isEqual } from "lodash";

// Custom Components
import { XrayBar } from "../components/Xray";
import { CustomInspectorControls } from "./InspectorControls/CustomInspectorControls";
import { StandardColorSwitcherToolbar as ColorSwitcherToolbar } from "../components/CustomColorSwitcher";
import { IconMarkComponent } from "../components/IconPicker";

// TypeScript interfaces for better type checking
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
    blockId?: string;
    innerClientIds?: {
      clientId: string;
      title: string;
      position: number;
      icon: string;
      svgString: string;
    }[];
    active?: string;
    xray?: boolean;
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
    icon: any;
    svgString: any;
    childrenCount?: number;
    title?: string;
  };
  clientId?: string;
};

/**
 * Edit component for the Gutenberg block.
 *
 * Provides controls for customizing the block and renders the block inside the editor.
 *
 * @param {EditProps} props - The properties passed to the component.
 * @returns {JSX.Element} The JSX representation of the component.
 */
export default function Edit({
  blockProps,
  attributes,
  setAttributes,
  clientId,
  context,
}: EditProps) {
  // WordPress hooks and other logic here.
  const { __unstableMarkNextChangeAsNotPersistent } =
    useDispatch(blockEditorStore);
  const props = useBlockProps();
  const blockId = props["data-block"];
  const { tabs } = attributes;

  const { insertBlock } = useDispatch("core/block-editor");
  const { selectBlock } = useDispatch("core/block-editor");

  // useEffects for syncing component state and attributes
  const { innerClientIds } =
    // retrieve the inner client ids of the current block
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
        const innerBlocks = getBlocks(selectedBlockClientId);
        let counter = 0;
        const innerClientIds = innerBlocks.map((block: WPBlock) => ({
          clientId: block?.clientId,
          title: block.attributes?.title,
          position: counter++,
          icon: block.attributes?.icon,
          svgString: block.attributes?.svgString,
        }));

        return {
          innerClientIds,
        };
      },
      [clientId]
    );

  /**
   * Update the blockId attribute whenever it changes
   */
  useEffect(() => {
    if (attributes.blockId !== blockId) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ blockId: blockId.slice(0, 10) });
    }
  }, [attributes.blockId, blockId]);

  /**
   * Syncs the innerClientIds attribute with the component state
   */
  useEffect(() => {
    if (innerClientIds.length === 0) {
      return;
    }

    if (!isEqual(attributes.innerClientIds, innerClientIds)) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ innerClientIds });
    }
  }, [innerClientIds, setAttributes]);

  /**
   * Handles logic to set the active tab.
   */
  useEffect(() => {
    if (
      attributes.active === "" &&
      innerClientIds &&
      innerClientIds.length > 0
    ) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ active: innerClientIds[0].clientId });
    }

    if (
      !innerClientIds ||
      !innerClientIds.find(
        (innerClientId: WPBlock) =>
          innerClientId["clientId"] === attributes.active
      )
    ) {
      if (innerClientIds && innerClientIds.length > 0) {
        __unstableMarkNextChangeAsNotPersistent();
        setAttributes({ active: innerClientIds[0].clientId });
      }
    }
  }, [innerClientIds, attributes.active]);

  /**
   * Adds a new "rrze-elements/tab" block as a child of this block.
   */
  const addNewTab = () => {
    const block = createBlock("rrze-elements/tab");
    insertBlock(block, undefined, clientId);
    selectBlock(block.clientId);
    __unstableMarkNextChangeAsNotPersistent();
    setAttributes({ active: block.clientId });
  };

  /**
   * Changes the currently active tab.
   *
   * @param index - The index of the tab to activate.
   * @param innerClientIds - List of inner block client IDs.
   */
  const onChangeActive = (
    index: number,
    innerClientIds: { clientId: string; position: number }[]
  ) => {
    if (innerClientIds[index]?.clientId !== undefined) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ active: innerClientIds[index].clientId });
      selectBlock(innerClientIds[index].clientId);
    }
  };

  /**
   * Function to determine if a tab is currently selected.
   * @param {number} index - The index of the tab.
   * @returns {boolean} - Whether the tab is selected.
   */
  const ariaSelected: any = (index: number) => {
    if (innerClientIds[index] === undefined) {
      return true;
    }
    if (
      innerClientIds[index].clientId === attributes.active ||
      attributes.active === ""
    ) {
      return true;
    }
    return false;
  };

  // Main return statement for the Edit function component.
  return (
    <>
      <InputWarning
        warning={__(
          "We recommend using a maximum of 4 tabs for the best User Experience.",
          "rrze-elements-b"
        )}
        min={5}
        max={null}
        count={attributes.innerClientIds?.length || 0}
        status="info"
        className="accordion-notice"
      />
      <div {...props}>
        <CustomInspectorControls
          attributes={{ xray: attributes.xray, color: attributes.color }}
          setAttributes={setAttributes}
        />
        <BlockControls>
          <XrayBar
            attributes={{ xray: attributes.xray }}
            setAttributes={setAttributes}
          />
          <ColorSwitcherToolbar
            attributes={{ color: attributes.color }}
            setAttributes={setAttributes}
          />
        </BlockControls>
        <div
          className={`rrze-elements-tabs primary ${attributes.color}`}
          id="tabs-1"
        >
          <div role="tablist" className="manual">
            {attributes.innerClientIds.map((innerClientId, index) => {
              const [iconType, iconName] =
                innerClientId["icon"]?.split(" ") || [];
              return (
                <Button
                  key={index}
                  onClick={() => onChangeActive(index, innerClientIds)}
                  id={innerClientId["clientId"]}
                  type="button"
                  role="tab"
                  aria-selected={ariaSelected(index)}
                  aria-controls={`${innerClientId["position"]}`}
                >
                  <span className="focus" tabIndex={-1}>
                    {innerClientId["icon"] && (
                      <IconMarkComponent
                        type={iconType}
                        iconName={iconName}
                        attributes={{
                          icon: innerClientId["icon"],
                          svgString: innerClientId["svgString"],
                        }}
                        defaultClass="elements-tabs-label-icon-inside-editor"
                      />
                    )}
                    {innerClientId["title"]}
                  </span>
                </Button>
              );
            })}
            <Button
              onClick={addNewTab}
              className="add-tab-button"
              type="button"
              role="tab"
            >
              <span className={"fa-solid fa-plus"}></span>
              {/* {__(" Add new tab", "rrze-elements-b")} */}
            </Button>
          </div>
          <InnerBlocks
            //@ts-ignore
            allowedBlocks={["rrze-elements/tab"]}
            template={[["rrze-elements/tab"], ["rrze-elements/tab"]]}
          />
        </div>
      </div>
    </>
  );
}
