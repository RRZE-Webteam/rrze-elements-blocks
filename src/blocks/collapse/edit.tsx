// Imports from WordPress core components and hooks.
import {
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
} from "@wordpress/block-editor";
import {BlockEditProps} from "@wordpress/blocks";
import {seen, unseen, symbol} from "@wordpress/icons";
import {useState, useEffect} from "@wordpress/element";
import {__} from "@wordpress/i18n";
import HeadingComponent from "../../components/HeadingComponent";
import 'material-symbols/outlined.css'

// Imports of custom components and helper functions.
import JumpLinkSelector from "../../components/JumpLinkSelector";
import {
  StandardColorSwitcher as ColorSwitcher,
  StandardColorSwitcherToolbar as ColorSwitcherToolbar,
} from "../../components/CustomColorSwitcher";
import AdvancedSettings from "./InspectorControls/AdvancedSettings";
import {
  IconPicker,
  IconMarkComponent,
  IconPickerModalInset,
} from "../../components/IconPicker";
import {speak} from "@wordpress/a11y";

import {useJumpNameStore} from "../../hooks/useJumpNameStore";
import {JumpNameEntry} from "../../stores/jumpNameStore";
import {sanitizeTitleToJumpName} from "../../utility/utils";
import {useDispatch} from "@wordpress/data";
import {store as blockEditorStore} from "@wordpress/block-editor";

import {AttributesV2 as BlockAttributes} from "./index";
import {MaterialSymbolPicker} from "../../components/MaterialSymbolPicker";

const Edit = ({
                attributes,
                setAttributes,
                clientId,
                context,
              }: BlockEditProps<BlockAttributes>) => {
  const props = useBlockProps();
  const {color, loadOpen, icon, jumpName, isCustomJumpname} = attributes;
  const title = attributes.title;

  const [isActive, setIsActive] = useState(false);
  const [iconType, iconName] = icon?.split(" ") || [];
  const [isOpen, setOpen] = useState(false);
  const {__unstableMarkNextChangeAsNotPersistent} =
    useDispatch(blockEditorStore);

  let computedDefaultJumpName = jumpName;
  useEffect(() => {
    if (!attributes.jumpName || attributes.jumpName === "") {
      const computedDefaultJumpName = `panel_${clientId?.slice(-8)}`;
      void __unstableMarkNextChangeAsNotPersistent();
      setAttributes({jumpName: computedDefaultJumpName});
    }
    if (jumpName && jumpName.startsWith("panel_")) {
      void __unstableMarkNextChangeAsNotPersistent();
      setAttributes({isCustomJumpname: false});
    }
  }, [attributes.jumpName, clientId, setAttributes]);

  const {jumpNames}: { jumpNames: JumpNameEntry[] } = useJumpNameStore({
    clientId,
    jumpName: computedDefaultJumpName,
    setAttributes: (attrs) => setAttributes(attrs),
  });

  const doesJumpNameExist = (name: string): boolean => {
    return jumpNames.some((entry: JumpNameEntry) => entry.jumpName === name);
  };

  let sameTypeSiblingsBefore = 0;

  useEffect(() => {
    if (
      context["rrze-elements/accordion-hstart"] &&
      context["rrze-elements/accordion-hstart"] !== attributes.hstart
    ) {
      void __unstableMarkNextChangeAsNotPersistent();
      setAttributes({hstart: context["rrze-elements/accordion-hstart"] as number});
    }
  }, [context["rrze-elements/accordion-hstart"]]);

  // Functions to handle the opening and closing of the icon picker modal.
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const toggleActive = () => {
    setIsActive(!isActive);
    if (isActive) {
      speak(__("reduced. Button.", "rrze-elements-blocks"));
    } else if (!isActive) {
      speak(__("extended. Button.", "rrze-elements-blocks"));
    }
  };

  // Function to handle the change of the title attribute.
  const onChangeTitle = (newText: string) => {
    if (newText === "") {
      void __unstableMarkNextChangeAsNotPersistent();
      setAttributes({title: ""});
    } else {
      void __unstableMarkNextChangeAsNotPersistent();
      setAttributes({title: newText});
    }
  };

  const onChangeTitleFocus = () => {
    const newJumpName = sanitizeTitleToJumpName(title);
    if (
      newJumpName &&
      newJumpName !== jumpName &&
      !doesJumpNameExist(newJumpName) &&
      !isCustomJumpname
    ) {
      setAttributes({jumpName: newJumpName});
    }
  };

  // Function to handle the toggle of the loadOpen attribute.
  const loadOpenToggle = () => {
    setAttributes({loadOpen: !loadOpen});
  };

  return (
    <>
      <div {...props}>
        <BlockControls>
          <ColorSwitcherToolbar {...{attributes, setAttributes}} />
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
                      <>
                        <MaterialSymbolPicker attributes={attributes} setAttributes={setAttributes}/>
                        <IconPickerModalInset
                          attributes={{
                            icon: attributes.icon,
                            svgString: attributes.svgString,
                          }}
                          setAttributes={setAttributes}
                        />
                      </>
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
              isCustomJumpname: attributes.isCustomJumpname,
            }}
            setAttributes={setAttributes}
            clientId={clientId}
          />
          <ColorSwitcher {...{attributes, setAttributes}} />
          <AdvancedSettings {...{attributes, setAttributes}} />
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
                onBlur={onChangeTitleFocus}
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
                  "core/table",
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
