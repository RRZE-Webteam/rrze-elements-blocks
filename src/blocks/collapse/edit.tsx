// Imports from WordPress core components and hooks.
import {
  ToolbarButton,
  ToolbarGroup,
  ToolbarItem,
  Modal,
  Button,
  PanelBody, Notice,
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
import 'material-symbols';

// Imports of custom components and helper functions.
import JumpLinkSelector from "../../components/JumpLinkSelector";
import {
  StandardColorSwitcher as ColorSwitcher,
  StandardColorSwitcherToolbar as ColorSwitcherToolbar,
} from "../../components/CustomColorSwitcher";
import AdvancedSettings from "./InspectorControls/AdvancedSettings";
import {
  IconMarkComponent,
} from "../../components/IconPicker";
import {
  MaterialSymbolPicker
} from "../../components/MaterialSymbolPicker";
import {speak} from "@wordpress/a11y";

import {useJumpNameStore} from "../../hooks/useJumpNameStore";
import {useDispatch} from "@wordpress/data";
import {store as blockEditorStore} from "@wordpress/block-editor";

import {AttributesV1_0_12 as BlockAttributes} from "./index";
import JumpNameResolverModal from "../../components/JumpNameResolverModal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  // @ts-ignore
  const {__unstableMarkNextChangeAsNotPersistent} =
    useDispatch(blockEditorStore);

  const { doesJumpNameExist, areDuplicateJumpNamesPresent, sanitizeTitleToJumpName } = useJumpNameStore({
    clientId,
    jumpName: attributes.jumpName,
    setAttributes: (attrs) => setAttributes(attrs),
  });

  let sameTypeSiblingsBefore = 0;

  useEffect(() => {
    if (
      context["rrze-elements/accordion-hstart"] &&
      context["rrze-elements/accordion-hstart"] !== attributes.hstart
    ) {
      __unstableMarkNextChangeAsNotPersistent();
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
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({title: ""});
    } else {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({title: newText});
    }
  };

  const onChangeTitleFocus = () => {
    const newJumpName = sanitizeTitleToJumpName(title);
    if (
      newJumpName &&
      newJumpName !== jumpName &&
      !doesJumpNameExist(newJumpName) &&
      !areDuplicateJumpNamesPresent(newJumpName) &&
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
                      <MaterialSymbolPicker attributes={attributes} setAttributes={setAttributes}/>
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
        {isModalOpen && <JumpNameResolverModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />}
        <InspectorControls>
          {doesJumpNameExist(attributes.jumpName) && areDuplicateJumpNamesPresent(attributes.jumpName) && (
            <>
              <Notice isDismissible={false} status={"warning"} politeness={"assertive"}
                      spokenMessage={__("This jump link name is already in use in another accordion element.", "rrze-elements-blocks")}>
                {__("This jump link name is already in use in another accordion element.", "rrze-elements-blocks")}
              </Notice>
              <PanelBody>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>{__('Resolve conflict', 'rrze-elements-blocks')}</Button>
              </PanelBody>
            </>
          )}
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
              {(attributes.icon || attributes.materialSymbol) && (
                <IconMarkComponent
                  type={iconType}
                  iconName={iconName}
                  attributes={{
                    icon: attributes.icon,
                    svgString: attributes.svgString,
                  }}
                  setAttributes={setAttributes}
                  materialSymbol={attributes.materialSymbol}
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
                  "rrze-elements/alert",
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
                  "core/buttons",
                  "core/button",
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
                  "rrze-faudir/block",
                  "core/gallery",
                  "rrze-calendar/calendar",
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
