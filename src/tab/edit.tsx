// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import {
  ToolbarItem,
  ToolbarGroup,
  ToolbarButton,
  Button,
  Modal,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { symbol } from "@wordpress/icons";
import { useDispatch } from "@wordpress/data";

// Custom components for enhancing block controls.
import { IconPicker } from "../components/IconPicker";
import { CustomInspectorControls } from "./InspectorControls/CustomInspectorControls";
import {
  TitleModal,
  TitlePlaceholder,
} from "./InspectorControls/TitleSettings";

/**
 * Interface representing the properties for the Edit component.
 * 
 * @interface EditProps
 * @property {Object} attributes - The block attributes.
 * @property {string} [attributes.style] - The style of the block.
 * @property {string} [attributes.color] - The color of the block.
 * @property {string} [attributes.title] - The title of the block.
 * @property {string} attributes.icon - The icon of the block.
 * @property {string} [attributes.svgString] - SVG string for the icon.
 * @property {boolean} [attributes.active] - Whether the block is active.
 * @property {boolean} [attributes.xray] - Whether x-ray is enabled for the block.
 * @property {boolean} [attributes.labelSettings] - Whether label settings are enabled.
 * @property {string} [attributes.blockId] - The block ID.
 * @property {string} [attributes.tabsUid] - The UID for tabs.
 * @property {Function} setAttributes - Function to set new attributes.
 * @property {string} clientId - Unique client ID of the block.
 * @property {Object} context - Context provided by block context.
 * @property {any} blockProps - Additional block properties.
 */
interface EditProps {
  attributes: {
    style?: string;
    color?: string;
    title?: string;
    icon: string;
    svgString?: string;
    active?: boolean;
    xray?: boolean;
    labelSettings?: boolean;
    blockId?: string;
    tabsUid?: string;
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
 * Edit component for the Tab block.
 *
 * Provides controls for customizing the Tab-block and renders the block inside the editor.
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
  const { __unstableMarkNextChangeAsNotPersistent } =
    useDispatch(blockEditorStore);
  const props = useBlockProps();
  const blockId = props["data-block"];
  const { icon } = attributes;

  // Hide the block in the editor if it is not active or xray is enabled.
  let classNameValue = attributes.active || attributes.xray ? "" : "is-hidden";

  // isOpen state is used to control the opening and closing of the icon picker modal  
  const [isOpen, setOpen] = useState(false);

  // Sync the block's 'tabsUid' attribute with the parent block's context.  
  useEffect(() => {
    if (attributes.tabsUid !== context["rrze-elements/tabs-uid"]) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ tabsUid: context["rrze-elements/tabs-uid"] });
    }
  }, [attributes.tabsUid, context["rrze-elements/tabs-uid"]]);

  /**
   * Sync the block's 'blockId' attribute with the block's ID.
   * This is needed for the tab navigation.
   */
  useEffect(() => {
    if (attributes.blockId !== blockId) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ blockId: blockId });
    }
  }, [attributes.blockId, blockId]);

  /**
   * Sync the block's 'active' attribute with the parent block's context.
   * This is needed for the tab navigation to make active tabs visible.
   */
  useEffect(() => {
    if (context["rrze-elements/tabs-active"] === "") {
      setAttributes({ active: true });
    } else if (context["rrze-elements/tabs-active"] !== blockId) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ active: false });
    } else {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ active: true });
    }
  }, [attributes.active, context["rrze-elements/tabs-active"]]);

  /**
   * Sync the block's 'xray' attribute with the parent block's context.
   * The xray attribute is used to show all tabs in the editor.
   */
  useEffect(() => {
    setAttributes({ xray: context["rrze-elements/tabs-xray"] });
  }, [attributes.active, context["rrze-elements/tabs-xray"]]);

  // Functions to handle the opening and closing of the icon picker modal.
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);


  return (
    <div {...props}>
      <CustomInspectorControls
        attributes={{
          title: attributes.title,
          icon: attributes.icon,
          svgString: attributes.svgString,
        }}
        setAttributes={setAttributes}
      />
      {/* @ts-ignore */}
      <BlockControls>
        <TitleModal
          attributes={{
            labelSettings: attributes.labelSettings,
            title: attributes.title,
          }}
          setAttributes={setAttributes}
        />
        <ToolbarGroup>
          <ToolbarItem>
            {() => (
              <>
                <ToolbarButton
                  icon={symbol}
                  label={
                    icon === ""
                      ? __("Add an icon", "rrze-elements-b")
                      : __("Change the icon", "rrze-elements-b")
                  }
                  onClick={openModal}
                />
                {isOpen && (
                  <Modal
                    title={__("Select an Icon", "rrze-elements-b")}
                    onRequestClose={closeModal}
                  >
                    <IconPicker
                      attributes={{
                        icon: attributes.icon,
                        svgString: attributes.svgString,
                      }}
                      setAttributes={setAttributes}
                    />
                    <Button variant="primary" onClick={closeModal}>
                      {__("Close", "rrze-elements-b")}
                    </Button>
                  </Modal>
                )}
              </>
            )}
          </ToolbarItem>
        </ToolbarGroup>
      </BlockControls>

      <div
        id={blockId}
        role="tabpanel"
        aria-labelledby={blockId}
        className={classNameValue}
      >
        <h2 className="print-only">{attributes.title}</h2>
        {attributes.labelSettings && (
          <TitlePlaceholder
            attributes={{
              title: attributes.title,
              labelSettings: attributes.labelSettings,
              svgString: attributes.svgString,
              icon: attributes.icon,
            }}
            setAttributes={setAttributes}
          />
        )}
        <InnerBlocks
          template={[
            [
              "core/paragraph",
              {
                placeholder: __(
                  "Click here and press / to enter content inside your Tab",
                  "rrze-elements-b"
                ),
              },
            ],
          ]}
        />
      </div>
    </div>
  );
}
