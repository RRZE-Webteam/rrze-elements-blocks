import {
  TextControl,
  ToolbarButton,
  ToolbarGroup,
  ToolbarItem,
  Modal,
  Button,
  PanelBody,
  Icon,
  ToolbarDropdownMenu,
} from "@wordpress/components";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";
import { seen, unseen, symbol, color as colorIcon } from "@wordpress/icons";
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { withSelect, useDispatch, useSelect } from "@wordpress/data";

import JumpLinkSelector from "./InspectorControls/JumpLinkSelector";
import {
  ColorSwitcher,
  ColorSwitcherToolbar,
} from "./InspectorControls/ColorSwitcher";
import AdvancedSettings from "./InspectorControls/AdvancedSettings";
import {
  IconPicker,
  useDynamicSvgIcon,
  IconMarkComponent,
} from "./InspectorControls/IconPicker";

export default function Edit({ attributes, setAttributes, clientId }) {
  const props = useBlockProps();
  const [isActive, setIsActive] = useState(false);
  const { sameBlockCount, title, color, loadOpen, icon } = attributes;
  const [iconType, iconName] = icon?.split(" ") || [];
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const [pluginDir, setPluginDir] = useState("");

  const onChangeTitle = (newText) => {
    if (newText === "") {
      setAttributes({ title: " " });
    } else {
      setAttributes({ title: newText });
    }
  };

  const loadOpenToggle = () => {
    setAttributes({ loadOpen: !loadOpen });
  };

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

  // Move any additional logic or console.logs here, outside of useSelect.

  useEffect(() => {
    if (attributes.totalChildrenCount !== totalChildrenCount) {
      setAttributes({ totalChildrenCount });
    }
  }, [totalChildrenCount, attributes.totalChildrenCount]);

  const handleToggleColor = (newTag) => {
    setAttributes({ color: newTag });
  };

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
    // Fetch plugin directory path via REST API
    fetch("/wp-json/rrze-elements-blocks/v1/plugin-directory")
      .then((response) => response.json())
      .then((data) => {
        setPluginDir(data.directory);
        // Store the fetched directory in block attributes
        setAttributes({ directory: data.directory });
      });
  }, []);

  return (
    <>
      <BlockControls>
        <ColorSwitcherToolbar {...{ attributes, setAttributes }} />
        <ToolbarGroup>
          {/* {isTextInString("Title", attributes.show) && (
            <HeadingSelector attributes={attributes} setAttributes={setAttributes} />
          )} */}
          <ToolbarItem>
            {() => (
              <>
              <ToolbarButton
                icon={loadOpen ? seen : unseen}
                label={
                  loadOpen
                    ? __("Collapse on page load", "rrze-elements-b")
                    : __("Open on page load", "rrze-elements-b")
                }
                onClick={loadOpenToggle}
              />
              <ToolbarButton
                icon={symbol}
                label={
                  icon === ""
                    ? __("Add an icon", "rrze-elements-b")
                    : __("Change the icon", "rrze-elements-b")
                }
                onClick={openModal}
              />
              { isOpen && (
                <Modal title={__("Select an Icon", "rrze-elements-b")} onRequestClose={ closeModal }>
                  
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
        <JumpLinkSelector {...{ attributes, setAttributes }} />
        <ColorSwitcher {...{ attributes, setAttributes }} />
        <AdvancedSettings {...{ attributes, setAttributes }} />
        <PanelBody title={__("Color Settings", "rrze-elements-b")}>
          <IconPicker {...{ attributes, setAttributes }} />
        </PanelBody>
      </InspectorControls>

      <div {...props}>
        <div className={`accordion-group ${color}`}>
          <h2 className="accordion-heading" onClick={toggleActive}>
          <span className="read-mode-only">{title}</span>
          <div className={`accordion-toggle ${isActive || loadOpen ? "active" : ""}`}>
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
          <div
            id={`collapse_${sameTypeSiblingsBefore}`}
            className={`accordion-body ${isActive || loadOpen ? "active" : ""}`}
          >
            <div className="accordion-inner clearfix">
              <InnerBlocks
                allowedBlocks={[
                  "rrze-elements/accordions",
                  "rrze/rrze-video",
                  "core/paragraph",
                  "core/heading",
                  "core/list",
                  "core/image",
                  "core/quote",
                  "core/file",
                  "core/video",
                  "core/audio",
                  "core/cover",
                  "core/table",
                  "core/freeform",
                  "core/html",
                  "core/preformatted",
                  "core/pullquote",
                  "core/verse",
                  "core/code",
                  "core/columns",
                  "core/column",
                  "core/more",
                  "core/nextpage",
                  "core/separator",
                  "core/spacer",
                  "core/shortcode",
                  "core/archives",
                  "core/categories",
                  "core/latest-comments",
                  "core/latest-posts",
                  "core/calendar",
                  "core/rss",
                  "core/search",
                  "core/tag-cloud",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
