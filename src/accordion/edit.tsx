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
  store as blockEditorStore
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
  clientId,
  context,
}) => {
  const { __unstableMarkNextChangeAsNotPersistent } =
    useDispatch(blockEditorStore);

  /////////// Use Selects ///////////
  const { selectedBlock, blockParents, siblingBlocks, totalChildrenCount } =
    useSelect(
      (select) => {
        const { getBlock, getBlockParents, getBlocks } = select(
          "core/block-editor"
        ) as {
          getBlock: Function;
          getBlockParents: Function;
          getBlocks: Function;
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

  const props = useBlockProps();
  const { sameBlockCount, title, color, loadOpen, icon } = attributes;

  const [isActive, setIsActive] = useState(false);
  const [iconType, iconName] = icon?.split(" ") || [];
  const [isOpen, setOpen] = useState(false);
  const [pluginDir, setPluginDir] = useState("");

  //////////////// Use Effects ////////////////
  useEffect(() => {
    __unstableMarkNextChangeAsNotPersistent();
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
    let color = context["rrze-elements/collapseColor"];
  
    if (color !== attributes.color) {
      color = attributes.color;
    }
  
    setAttributes({
      color: color
    });
  
  }, [context["rrze-elements/collapseColor"], attributes.color]);
  
  let sameTypeSiblingsBefore = 0;
  useEffect(() => {
    if (selectedBlock && blockParents.length > 0) {
      for (const block of siblingBlocks) {
        if (block.clientId === selectedBlock.clientId) {
          break;
        }
        if (block.name === selectedBlock.name) {
          if (
            block?.innerBlocks?.forEach((innerBlock: WPBlock) => {
              if (innerBlock.name === "rrze-elements/accordions") {
                sameTypeSiblingsBefore =
                  sameTypeSiblingsBefore + innerBlock?.innerBlocks.length;
              }
            })
            // @ts-ignore
          );
          sameTypeSiblingsBefore++;
        }
      }
      if (sameTypeSiblingsBefore !== attributes.sameBlockCount) {
        __unstableMarkNextChangeAsNotPersistent();
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
  };

  const onChangeTitle = (newText: string) => {
    if (newText === "") {
      setAttributes({ title: " " });
    } else {
      setAttributes({ title: newText });
    }
  };

  let finalColor = attributes.color === "inherit" ? context["rrze-elements/collapseColor"] : attributes.color;

  return (
    <>
      <BlockControls controls>
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
        {/* <ExtendedColorSwitcher attributes={attributes} setAttributes={setAttributes} /> */}
        <ExtendedColorSwitcher attributes={attributes} setAttributes={setAttributes} />
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

      <div {...props}>
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
              <TextControl
                onChange={onChangeTitle}
                value={title}
                placeholder={__("Your Text", "rrze-elements-b")}
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
