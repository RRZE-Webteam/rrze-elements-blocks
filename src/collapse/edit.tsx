// Imports from WordPress core components and hooks.
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
  InnerBlocks,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";
import { seen, unseen, symbol, color as colorIcon } from "@wordpress/icons";
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import HeadingComponent from "../components/HeadingComponent";

// Imports of custom components and helper functions.
import JumpLinkSelector from "../components/JumpLinkSelector";
import {
  StandardColorSwitcher as ColorSwitcher,
  StandardColorSwitcherToolbar as ColorSwitcherToolbar,
} from "../components/CustomColorSwitcher";
import AdvancedSettings from "./InspectorControls/AdvancedSettings";
import { IconPicker, IconMarkComponent } from "../components/IconPicker";

/**
 * Interface for the SaveProps containing the structure of the attributes and other properties
 * passed to the Edit component.
 */
interface SaveProps {
  attributes: {
    totalChildrenCount?: number;
    sameBlockCount?: number;
    title: string;
    color: string;
    loadOpen: boolean;
    icon: string;
    hstart?: number;
    jumpName?: string;
    svgString?: string;
  };
  setAttributes: (attributes: Partial<SaveProps["attributes"]>) => void;
  clientId: string;
  context: { [key: string]: any }; 
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
 * Edit component responsible for the editor side rendering and logic of the custom block.
 *
 * @param {SaveProps} props - The properties and attributes of the block.
 */
const Edit: React.FC<SaveProps> = ({
  attributes,
  setAttributes,
  clientId,
  context,
}) => {
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

  // Local state and destructuring of attributes.

  const props = useBlockProps();
  const { sameBlockCount, title, color, loadOpen, icon } = attributes;

  const [isActive, setIsActive] = useState(false);
  const [iconType, iconName] = icon?.split(" ") || [];
  const [isOpen, setOpen] = useState(false);
  const [pluginDir, setPluginDir] = useState("");

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

  let sameTypeSiblingsBefore = 0;

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

  /**
   * Set the heading level attribute based on the global setting.
   */
  useEffect(() => {
    setAttributes({
      hstart: context["rrze-elements/accordion-hstart"],
    });
  }),
    [context["rrze-elements/hstart"]];

  // Functions to handle the opening and closing of the icon picker modal.
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  // Function to handle the change of the title attribute.
  const onChangeTitle = (newText: string) => {
    if (newText === "") {
      setAttributes({ title: " " });
    } else {
      setAttributes({ title: newText });
    }
  };

  // Function to handle the toggle of the loadOpen attribute.
  const loadOpenToggle = () => {
    setAttributes({ loadOpen: !loadOpen });
  };

  return (
    <>
    <div {...props}>
      <BlockControls controls>
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

      <InspectorControls>
        <JumpLinkSelector
          attributes={{
            jumpName: attributes.jumpName,
          }}
          setAttributes={setAttributes}
        />
        <ColorSwitcher {...{ attributes, setAttributes }} />
        <AdvancedSettings {...{ attributes, setAttributes }} />
        <PanelBody title={__("Icon Settings", "rrze-elements-b")}>
          <IconPicker
            attributes={{
              icon: attributes.icon,
              svgString: attributes.svgString,
            }}
            setAttributes={setAttributes}
          />
        </PanelBody>
      </InspectorControls>


        <div className={`accordion-group ${color}`}>
          <HeadingComponent
            level={attributes.hstart}
            className="accordion-heading"
            onClick={toggleActive}
          >
            <span className="read-mode-only">{title}</span>
            <div
              className={`accordion-toggle ${
                isActive || loadOpen ? "active" : ""
              }`}
            >
              {attributes.icon && (
                <IconMarkComponent
                  type={iconType}
                  iconName={iconName}
                  attributes={{
                    icon: attributes.icon,
                    svgString: attributes.svgString,
                  }}
                  setAttributes={setAttributes}
                />
              )}
              <TextControl
                onChange={onChangeTitle}
                value={title}
                placeholder={__("Your Text", "text-box")}
                className="elements-blocks-input-following-icon"
              />
            </div>
          </HeadingComponent>
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
                  "core/columns",
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
};

export default Edit;
