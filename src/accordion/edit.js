import {
  TextControl,
  ToolbarButton,
  ToolbarGroup,
  ToolbarItem,
  Modal,
  Button,
  PanelBody,
} from "@wordpress/components";
import {
  useBlockProps,
  BlockControls,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { seen, unseen, symbol, color as colorIcon } from "@wordpress/icons";
import { useSelect } from "@wordpress/data";
import {
  ColorSwitcher,
  ColorSwitcherToolbar,
} from "./InspectorControls/ColorSwitcher";
import { IconPicker, IconMarkComponent } from "./InspectorControls/IconPicker";

export default function Edit({ attributes, context, setAttributes, clientId }) {
  /////////// Use Selects ///////////
  const { selectedBlock, blockParents, siblingBlocks, totalChildrenCount } =
    useSelect(
      (select) => {
        const { getBlock, getBlockParents, getBlocks } =
          select("core/block-editor");
        const blockParents = getBlockParents(clientId, true);
        const parentClientId = blockParents[0];
        const siblingBlocks = getBlocks(parentClientId);
        const collapsiblesBeforeMe =
          getBlock(parentClientId)?.attributes?.previousBlockIds || [];

        let totalChildrenCount = 0;
        collapsiblesBeforeMe.forEach((blockClientId) => {
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

  const props = useBlockProps();
  const { sameBlockCount, title, color, loadOpen, icon } = attributes;

  const [isActive, setIsActive] = useState(false);
  const [iconType, iconName] = icon?.split(" ") || [];
  const [isOpen, setOpen] = useState(false);
  const [pluginDir, setPluginDir] = useState("");

  //////////////// Use Effects ////////////////
  useEffect(() => {
    setAttributes({
      ancestorCount:
        context["rrze-elements/collapseSBlockCount"] +
        context["rrze-elements/collapseTotalChildrenCount"] +
        1,
    });
  }, [
    context["rrze-elements/collapseSBlockCount"],
    context["rrze-elements/collapseTotalChildrenCount"],
  ]);

  useEffect(() => {
    setAttributes({
      color: context["rrze-elements/collapseColor"],
    })
  }), [context["rrze-elements/collapseColor"]];

  let sameTypeSiblingsBefore = 0;
  useEffect(() => {
    if (selectedBlock && blockParents.length > 0) {
      for (const block of siblingBlocks) {
        if (block.clientId === selectedBlock.clientId) {
          break;
        }
        if (block.name === selectedBlock.name) {
          if (
            block?.innerBlocks?.forEach((innerBlock) => {
              if (innerBlock.name === "rrze-elements/accordions") {
                sameTypeSiblingsBefore =
                  sameTypeSiblingsBefore + innerBlock?.innerBlocks.length;
              }
            })
          );
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

  /////////////////////// Event Handler / OnClick Handler //////////
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const onChangeTitle = (newText) => {
    if (newText === "") {
      setAttributes({ title: " " });
    } else {
      setAttributes({ title: newText });
    }
  };

  return (
    <>
      <BlockControls>
        {/* <ColorSwitcherToolbar
          attributes={attributes}
          setAttributes={setAttributes}
        /> */}
        <ToolbarGroup>
          {/* {isTextInString("Title", attributes.show) && (
            <HeadingSelector attributes={attributes} setAttributes={setAttributes} />
          )} */}
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
                    <IconPicker {...{ attributes, setAttributes }} />
                    <Button isPrimary onClick={closeModal}>
                      {__("Close", "rrze-elements-b")}
                    </Button>
                  </Modal>
                )}
              </>
            )}
          </ToolbarItem>
        </ToolbarGroup>
      </BlockControls>
      <InspectorControls>
        {/* <ColorSwitcher attributes={attributes} setAttributes={setAttributes} /> */}
        <PanelBody title={__("Icon Settings", "rrze-elements-b")}>
          <IconPicker {...{ attributes, setAttributes }} />
        </PanelBody>
      </InspectorControls>

      <div {...props}>
        <div className={`accordion-group ${attributes.color}`}>
          <h2 className="accordion-heading" onClick={toggleActive}>
            <div
              className={`accordion-toggle ${
                isActive || loadOpen ? "active" : ""
              }`}
            >
              {attributes.icon && (
                <IconMarkComponent
                  type={iconType}
                  iconName={iconName}
                  attributes={attributes}
                  setAttributes={setAttributes}
                  className="elements-blocks-icon-insideEditor"
                />
              )}
              <TextControl
                onChange={onChangeTitle}
                value={title}
                placeholder={__("Your Text", "text-box")}
                className="elements-blocks-input-following-icon"
              />
            </div>
          </h2>
          <div className={`accordion-body ${isActive ? "active" : ""}`}>
            <div className="accordion-inner clearfix">
              <InnerBlocks
                allowedBlocks={[
                  "rrze/rrze-video",
                  "core/paragraph",
                  "core/heading",
                  "core/list",
                  "core/image",
                  "core/quote",
                  "core/file",
                  "core/audio",
                  "core/cover",
                  "core/table",
                  "core/freeform",
                  "core/preformatted",
                  "core/pullquote",
                  "core/verse",
                  "core/code",
                  "core/separator",
                  "core/spacer",
                  "core/shortcode",
                  "core/calendar",
                  "core/rss",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}