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
import { IconPickerModalInset } from "../components/IconPicker";
import { CustomInspectorControls } from "./InspectorControls/CustomInspectorControls";
import {
  TitleModal,
  TitlePlaceholder,
} from "./InspectorControls/TitleSettings";

/**
 * Interface representing the properties for the Edit component.
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

/**
 * Edit component for the Tab block.
 *
 * Provides controls for customizing the Tab-block and renders the block inside the editor.
 *
 * @param props - The properties passed to the component.
 * @returns     - The JSX representation of the component.
 */
export default function Edit({
  attributes,
  setAttributes,
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
                  label={icon === ""
                    ? __("Add an icon", "rrze-elements-blocks")
                    : __("Change the icon", "rrze-elements-blocks")}
                  onClick={openModal} />
                {isOpen && (
                  <Modal
                    title={__("Select an Icon", "rrze-elements-blocks")}
                    onRequestClose={closeModal}
                    size="large"
                  >
                    <IconPickerModalInset
                      attributes={{
                        icon: attributes.icon,
                        svgString: attributes.svgString,
                      }}
                      setAttributes={setAttributes}
                    />
                    <Button variant="primary" onClick={closeModal}>
                      {__("Close", "rrze-elements-blocks")}
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
                  "rrze-elements-blocks"
                ),
              },
            ],
          ]}
        />
      </div>
    </div>
  );
}
