import {
  useBlockProps,
  RichText,
  InnerBlocks,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";
import {
  ToolbarItem,
  ToolbarGroup,
  ToolbarButton,
  Placeholder,
  TextControl,
  Button,
  SVG,
  Modal,
  Path,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";
import { symbol } from "@wordpress/icons";

import { IconPicker, IconMarkComponent } from "./InspectorControls/IconPicker";

import {
  TitleToolbar,
  TitleModal,
  TitlePlaceholder,
} from "./InspectorControls/TitleSettings";

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
    directory?: string;
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
  const blockId = props["data-block"];

  const { title } = attributes;
  // Needed for Icon Selection
  const [isOpen, setOpen] = useState(false);
  const [pluginDir, setPluginDir] = useState("");

  useEffect(() => {
    if (attributes.tabsUid !== context["rrze-elements/tabs-uid"]) {
      setAttributes({ tabsUid: context["rrze-elements/tabs-uid"] });
    }
  }, [attributes.tabsUid, context["rrze-elements/tabs-uid"]]);

  useEffect(() => {
    if (attributes.blockId !== blockId) {
      setAttributes({ blockId: blockId });
    }
  }, [attributes.blockId, blockId]);

  useEffect(() => {
    if (context["rrze-elements/tabs-active"] === "") {
      setAttributes({ active: true });
    } else if (context["rrze-elements/tabs-active"] !== blockId) {
      setAttributes({ active: false });
    } else {
      setAttributes({ active: true });
    }
  }, [attributes.active, context["rrze-elements/tabs-active"]]);

  useEffect(() => {
    setAttributes({ xray: context["rrze-elements/tabs-xray"] });
  }, [attributes.active, context["rrze-elements/tabs-xray"]]);

  /**
   * Fetch the plugin directory path via REST API and store it in the state.
   */
  useEffect(() => {
    // Fetch plugin directory path via REST API – Needed for save.js
    fetch("/wp-json/rrze-elements-blocks/v1/plugin-directory")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPluginDir(data.directory);
        setAttributes({ directory: data.directory });
      })
      .catch((error) => {
        console.error("There was a problem fetching the directory:", error);
      });
  }, []);

  const { color, icon } = attributes;
  let classNameValue = attributes.active || attributes.xray ? "" : "is-hidden";

  // Functions to handle the opening and closing of the icon picker modal.
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  

  return (
    <div {...props}>
      {/* @ts-ignore */}
      <BlockControls>
        <TitleModal
          attributes={{ labelSettings: attributes.labelSettings, title: attributes.title }}
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
                        directory: attributes.directory,
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
              directory: attributes.directory,
              svgString: attributes.svgString,
              icon: attributes.icon
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
                  "rrze-blocks-b"
                ),
              },
            ],
          ]}
        />
      </div>
    </div>
  );
}
