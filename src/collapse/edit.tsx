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
  RichText,
  store as blockEditorStore,
} from "@wordpress/block-editor";
import { seen, unseen, symbol, color as colorIcon } from "@wordpress/icons";
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import HeadingComponent from "../components/HeadingComponent";

// Imports of custom components and helper functions.
import JumpLinkSelector from "../components/JumpLinkSelector";
import {
  StandardColorSwitcher as ColorSwitcher,
  StandardColorSwitcherToolbar as ColorSwitcherToolbar,
} from "../components/CustomColorSwitcher";
import AdvancedSettings from "./InspectorControls/AdvancedSettings";
import {
  IconPicker,
  IconMarkComponent,
  IconPickerModalInset,
} from "../components/IconPicker";
import { speak } from '@wordpress/a11y';

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
  const { __unstableMarkNextChangeAsNotPersistent } =
    useDispatch(blockEditorStore);

  // Local state and destructuring of attributes.

  const props = useBlockProps();
  const { color, loadOpen, icon } = attributes;
  const title = attributes.title;

  const [isActive, setIsActive] = useState(false);
  const [iconType, iconName] = icon?.split(" ") || [];
  const [isOpen, setOpen] = useState(false);

  /**
   * Function to handle the toggle of color.
   * @param {string} newTag - The new color to be set.
   */
  const handleToggleColor = (newTag: string) => {
    setAttributes({ color: newTag });
  };

  let sameTypeSiblingsBefore = 0;

  useEffect(() => {
    if (attributes.jumpName === "") {
      setAttributes({
        jumpName: `panel_${clientId?.slice(-8)}`,
      });
      console.log("clientId", clientId);
    }
  }, [clientId]);

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
    if (isActive){
      speak(__('reduced. Button.', 'rrze-elements-blocks'))
    } else if (!isActive) {
      speak(__('extended. Button.', 'rrze-elements-blocks'));
    }
  };

  // Function to handle the change of the title attribute.
  const onChangeTitle = (newText: string) => {
    if (newText === "") {
      setAttributes({ title: "" });
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
        <BlockControls>
          <ColorSwitcherToolbar {...{ attributes, setAttributes }} />
          <ToolbarGroup>
            <ToolbarItem>
              {() => (
                <>
                  <ToolbarButton
                    icon={loadOpen ? seen : unseen}
                    label={
                      loadOpen
                        ? __("Collapse on page load", "rrze-elements-blocks")
                        : __("Open on page load", "rrze-elements-blocks")
                    }
                    onClick={loadOpenToggle}
                  />
                  <ToolbarButton
                    icon={symbol}
                    label={
                      icon === ""
                        ? __("Add an icon", "rrze-elements-blocks")
                        : __("Change the icon", "rrze-elements-blocks")
                    }
                    onClick={openModal}
                  />
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

        <InspectorControls>
          <JumpLinkSelector
            attributes={{
              jumpName: attributes.jumpName,
            }}
            setAttributes={setAttributes}
          />
          <ColorSwitcher {...{ attributes, setAttributes }} />
          <AdvancedSettings {...{ attributes, setAttributes }} />
          <PanelBody title={__("Icon Settings", "rrze-elements-blocks")}>
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
              <RichText
                tagName="p"
                value={title}
                onChange={onChangeTitle}
                placeholder={__("Enter your Title…", "rrze-elements-blocks")}
                allowedFormats={[]}
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
                  "rrze-elements/notice",
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
                  "rrze-elements/alert",
                  "rrze/rrze-video",
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
