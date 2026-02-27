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
  IconPicker,
  IconMarkComponent,
} from "../../components/IconPicker";
import {
  MaterialSymbolPicker
} from "../../components/MaterialSymbolPicker";
import {speak} from "@wordpress/a11y";

import {useJumpNameStore} from "../../hooks/useJumpNameStore";
import {JumpNameEntry} from "../../stores/jumpNameStore";
import {sanitizeTitleToJumpName} from "../../utility/utils";
import {useDispatch, select} from "@wordpress/data";
import {store as blockEditorStore} from "@wordpress/block-editor";

import {AttributesV1_0_12 as BlockAttributes} from "./index";

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
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({jumpName: computedDefaultJumpName});
    }
    if (jumpName && jumpName.startsWith("panel_")) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({isCustomJumpname: false});
    }
  }, [attributes.jumpName, clientId, setAttributes]);

  const {jumpNames}: { jumpNames: JumpNameEntry[] } = useJumpNameStore({
    clientId,
    jumpName: computedDefaultJumpName,
    setAttributes: (attrs) => setAttributes(attrs),
  });

  useJumpNameStore({
    clientId,
    jumpName: computedDefaultJumpName,
    setAttributes: (attrs) => setAttributes(attrs),
  });

  const doesJumpNameExist = (name: string): boolean => {
    return select("rrze/elements-blocks").jumpNameExists(name);
  };

  const areDuplicateJumpNamesPresent = (name: string): boolean => {
    return select("rrze/elements-blocks").jumpNameDuplicateIDs(name).length > 1;
  };

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

  /**
   * Sanitizes a given string to be used as a valid HTML ID / Jump Name.
   * Handles European diacritics, expands specific ligatures/umlauts,
   * and formats the string safely for HTML attributes.
   * * @param title The raw string to sanitize
   * @returns A safe, URL-friendly string
   */
  const sanitizeTitleToJumpName = (title: string): string => {
    if (!title) {
      return "";
    }

    let sanitized = title.toLowerCase();

    // 1. Map characters that need to be expanded into multiple letters
    const charMap: { [key: string]: string } = {
      'ä': 'ae',
      'ö': 'oe',
      'ü': 'ue',
      'ß': 'ss',
      'æ': 'ae',
      'œ': 'oe',
    };

    sanitized = sanitized.replace(/[äöüßæœ]/g, (match) => charMap[match] || match);

    // 2. Normalize and strip remaining diacritics (accents)
    // .normalize('NFD') splits 'é' into 'e' + '´' (combining acute accent)
    // The regex /[\u0300-\u036f]/g targets those combining accent marks and deletes them.
    sanitized = sanitized.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // 3. Replace spaces, underscores, and common separators with hyphens
    sanitized = sanitized.replace(/[\s_&/]+/g, '-');

    // 4. Remove all characters that are not alphanumeric or hyphens
    sanitized = sanitized.replace(/[^a-z0-9-]/g, '');

    // 5. Remove multiple consecutive hyphens (e.g., "my---title" -> "my-title")
    sanitized = sanitized.replace(/-+/g, '-');

    // 6. Trim hyphens from the start and end of the string
    sanitized = sanitized.replace(/^-+|-+$/g, '');

    return sanitized;
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
                      {/*<IconPickerModalInset*/}
                      {/*  attributes={{*/}
                      {/*    icon: attributes.icon,*/}
                      {/*    svgString: attributes.svgString,*/}
                      {/*  }}*/}
                      {/*  setAttributes={setAttributes}*/}
                      {/*/>*/}
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

        <InspectorControls>
          {doesJumpNameExist(attributes.jumpName) && areDuplicateJumpNamesPresent(attributes.jumpName) && (
            <>
              <Notice isDismissible={false} status={"warning"} politeness={"assertive"} spokenMessage={__("This jump link name is already in use in another accordion element.", "rrze-elements-blocks")}>
                {__("This jump link name is already in use in another accordion element.", "rrze-elements-blocks")}
              </Notice>
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
