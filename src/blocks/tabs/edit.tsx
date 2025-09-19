// WordPress Imports
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import {Button} from "@wordpress/components";
import {__} from "@wordpress/i18n";
import {useEffect, useRef} from "@wordpress/element";
import {useSelect, useDispatch} from "@wordpress/data";
import {createBlock} from "@wordpress/blocks";
import InputWarning from "../../components/InputWarning";

// Other Imports
import {isEqual} from "lodash";

// Custom Components
import {XrayBar} from "../../components/Xray";
import {CustomInspectorControls} from "./InspectorControls/CustomInspectorControls";
import {StandardColorSwitcherToolbar as ColorSwitcherToolbar} from "../../components/CustomColorSwitcher";
import {IconMarkComponent} from "../../components/IconPicker";

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
      materialSymbol: string;
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
    materialSymbol: string;
  };
  clientId?: string;
};

/**
 * Edit component for the Gutenberg block.
 *
 * Provides controls for customizing the block and renders the block inside the editor.
 *
 * @param props - The properties passed to the component.
 * @returns     - The JSX representation of the component.
 */
export default function Edit({
                               attributes,
                               setAttributes,
                               clientId,
                             }: EditProps) {
  // WordPress hooks and other logic here.
  const {__unstableMarkNextChangeAsNotPersistent} = useDispatch(blockEditorStore);
  const props = useBlockProps();
  const blockId = props["data-block"];
  const lastInnerClientIdsRef = useRef<Array<{
    clientId: string;
    title: string;
    position: number;
    icon: string;
    svgString: string;
    materialSymbol: string;
  }>>([]);

  const {insertBlock, selectBlock} = useDispatch("core/block-editor");

  // useEffects for syncing component state and attributes
  const innerClientIds = useSelect(
    (select) => {
      const {getBlocks} = select("core/block-editor") as {
        getBlocks: (id: string) => WPBlock[];
      };
      const innerBlocks = getBlocks(clientId);

      const next = innerBlocks.map((block, idx) => ({
        clientId: block?.clientId ?? "",
        title: block?.attributes?.title ?? "",
        position: idx,
        icon: block?.attributes?.icon ?? "",
        svgString: block?.attributes?.svgString ?? "",
        materialSymbol: block?.attributes?.materialSymbol ?? "",
      }));

      if (isEqual(next, lastInnerClientIdsRef.current)) {
        return lastInnerClientIdsRef.current; // stable ref
      }
      lastInnerClientIdsRef.current = next;
      return next;
    },
    [clientId]
  );

  /**
   * Update the blockId attribute whenever it changes
   */
  useEffect(() => {
    if (attributes.blockId !== blockId) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({blockId: blockId.slice(0, 10)});
    }
  }, [attributes.blockId, blockId]);

  /**
   * Syncs the innerClientIds attribute with the component state
   */
  useEffect(() => {
    if (!innerClientIds.length) return;
    if (!isEqual(attributes.innerClientIds, innerClientIds)) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({innerClientIds});
    }
  }, [innerClientIds, attributes.innerClientIds, setAttributes]);

  /**
   * Handles logic to set the active tab.
   */
  useEffect(() => {
    if (!innerClientIds.length) return;

    const activeExists = innerClientIds.some(
      (item) => item.clientId === attributes.active
    );

    // If no active tab is set, or the current active tab doesn't exist anymore
    if (!attributes.active || !activeExists) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ active: innerClientIds[0].clientId });
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
    setAttributes({active: block.clientId});
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
      setAttributes({active: innerClientIds[index].clientId});
      selectBlock(innerClientIds[index].clientId);
    }
  };

  /**
   * Function to determine if a tab is currently selected.
   * @param index  - The index of the tab.
   * @returns      - Whether the tab is selected.
   */
  const ariaSelected = (index: number): boolean => {
    const item = innerClientIds[index];
    if (!item) return false;
    return item.clientId === attributes.active || attributes.active === "";
  };

  // Main return statement for the Edit function component.
  return (
    <>
      <InputWarning
        warning={__(
          "We recommend using a maximum of 4 tabs for the best User Experience.",
          "rrze-elements-blocks"
        )}
        min={5}
        max={null}
        count={innerClientIds.length}
        status="info"
        className="accordion-notice"
      />
      <div {...props}>
        <CustomInspectorControls
          attributes={{xray: attributes.xray, color: attributes.color}}
          setAttributes={setAttributes}
        />
        <BlockControls>
          <XrayBar
            attributes={{xray: attributes.xray}}
            setAttributes={setAttributes}
          />
          <ColorSwitcherToolbar
            attributes={{color: attributes.color}}
            setAttributes={setAttributes}
          />
        </BlockControls>
        <div
          className={`rrze-elements-tabs primary ${attributes.color}`}
          id="tabs-1"
        >
          <div role="tablist" className="manual">
            {innerClientIds.map((innerClientId, index) => {
              const [iconType, iconName] = innerClientId.icon?.split(" ") || [];
              const showMaterial = !!innerClientId.materialSymbol && !innerClientId.icon;

              return (
                <Button
                  key={innerClientId.clientId || index}
                  onClick={() => onChangeActive(index, innerClientIds)}
                  id={innerClientId.clientId}
                  type="button"
                  role="tab"
                  aria-selected={ariaSelected(index)}
                  aria-controls={innerClientId.clientId}
                >
        <span className="focus" tabIndex={-1}>
         {showMaterial ? (
           <IconMarkComponent
             type={iconType}
             iconName={iconName}
             attributes={{icon: innerClientId.icon, svgString: innerClientId.svgString}}
             materialSymbol={innerClientId.materialSymbol}
           />
         ) : innerClientId.icon ? (
           <IconMarkComponent
             type={iconType}
             iconName={iconName}
             attributes={{icon: innerClientId.icon, svgString: innerClientId.svgString}}
             defaultClass="elements-tabs-label-icon-inside-editor"
           />
         ) : null}
          {innerClientId.title}
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
              <IconMarkComponent
                type="solid"
                iconName="plus"
                defaultClass="elements-tabs-label-icon-inside-editor"
              />
              {/* {__(" Add new tab", "rrze-elements-blocks")} */}
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
