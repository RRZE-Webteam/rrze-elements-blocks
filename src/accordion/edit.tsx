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
  store as blockEditorStore,
  RichText,
} from "@wordpress/block-editor";
import { useState, useEffect } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { seen, unseen, symbol, color as colorIcon } from "@wordpress/icons";
import { useSelect, useDispatch } from "@wordpress/data";
import {
  ExtendedColorSwitcher,
  ExtendedColorSwitcherToolbar,
} from "../components/CustomColorSwitcher";
import HeadingComponent from "../components/HeadingComponent";
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
    ancestorCount?: number;
  };
  setAttributes: (attributes: Partial<SaveProps["attributes"]>) => void;
  clientId: string;
  context: { [key: string]: any }; // You might want to further specify the shape of context if known
}

type WPBlock = {
  innerBlocks: WPBlock[];
  name?: string;
  attributes?: {
    childrenCount?: number;
  };
  clientId?: string;
};

const Edit: React.FC<SaveProps> = ({
  attributes,
  setAttributes,
  context,
  ...ownProps
}) => {
  const { __unstableMarkNextChangeAsNotPersistent } =
    useDispatch(blockEditorStore);

  /////////// Use Selects ///////////

  const props = useBlockProps();
  const { sameBlockCount, color, loadOpen, icon } = attributes;
  const title = attributes.title;

  const { clientId } = ownProps;
  const [isActive, setIsActive] = useState(false);
  const [uid, setUid] = useState("");
  const [iconType, iconName] = icon?.split(" ") || [];
  const [isOpen, setOpen] = useState(false);
  const [pluginDir, setPluginDir] = useState("");

  //////////////// Use Effects ////////////////

  useEffect(() => {
    setAttributes({
      jumpName: `panel_${clientId?.slice(-8)}`,
    });
  }, [clientId]);

  useEffect(() => {
    let color = context["rrze-elements/collapseColor"];

    if (color !== attributes.color) {
      color = attributes.color;
    }

    setAttributes({
      color: color,
    });
  }, [context["rrze-elements/collapseColor"], attributes.color]);

  useEffect(() => {
    setAttributes({
      hstart: context["rrze-elements/accordion-hstart"],
    });
  }),
    [context["rrze-elements/accordion-hstart"]];

  /////////////////////// Event Handler / OnClick Handler //////////
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

  const onChangeTitle = (newText: string) => {
    setAttributes({ title: newText });
  };

  let finalColor =
    attributes.color === "inherit"
      ? context["rrze-elements/collapseColor"]
      : attributes.color;

  return (
    <div {...props}>
      <BlockControls>
        <ExtendedColorSwitcherToolbar
          attributes={attributes}
          setAttributes={setAttributes}
        />
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
        <ExtendedColorSwitcher
          attributes={attributes}
          setAttributes={setAttributes}
        />
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
      <div className={`accordion-group ${finalColor} `}>
        <HeadingComponent
          level={attributes.hstart + 1}
          className="accordion-heading"
          onClick={toggleActive}
        >
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
                "rrze-elements/alert",
                "rrze-elements/notice",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
