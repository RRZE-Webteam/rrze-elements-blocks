// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
  InspectorControls,
  RichText,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";

import {
  FontSizePicker,
  PanelBody,
  Popover,
  ToolbarGroup,
  ToolbarButton,
} from "@wordpress/components";
import { link, linkOff } from "@wordpress/icons";
import { displayShortcut, isKeyboardEvent } from "@wordpress/keycodes";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { symbol } from "@wordpress/icons";
import { IconPicker, IconMarkComponent } from "../components/IconPicker";

/**
 * Interface representing the properties for the Edit component.
 *
 * @interface EditProps
 * @property {Object} attributes - The block attributes.
 */
interface EditProps {
  blockProps: string[];
  attributes: {
    title: string;
    description: string;
    buttonText: string;
    fontSize: string;
    buttonUrl: string;
    icon: string;
    svgString: string;
    buttonOpensInNewTab: boolean;
    target: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
  isSelected: boolean;
}
/**
 * Edit component for the Blueprint block.
 *
 * Provides controls for customizing the Blueprint-block and renders the block inside the editor.
 *
 * @param {EditProps} props - The properties passed to the component.
 * @returns {JSX.Element} The JSX representation of the component.
 */
export default function Edit({
  blockProps,
  attributes,
  setAttributes,
  isSelected,
}: EditProps) {
  const props = useBlockProps();

  const { buttonUrl, icon } = attributes;

  const [iconType, iconName] = icon?.split(" ") || [];

  const onChangeTitle = (title: string) => {
      setAttributes({ title: title });
  };

  const onChangeButtonUrl = (newButtonUrl: {
    url: string;
    id: string;
    title: string;
    type: string;
    opensInNewTab?: boolean;
  }) => {
    if (newButtonUrl?.opensInNewTab) {
      setAttributes({ target: "_blank" });
    }
    setAttributes({ buttonUrl: newButtonUrl?.url });
  };

  const [UrlPopoverAnchor, setUrlPopoverAnchor] = useState(null);
  const [isEditingURL, setIsEditingURL] = useState(false);

  const TagName = "a";
  const isLinkTag = "a" === TagName;
  const isURLSet = !!buttonUrl;

  const startEditing = () => {
    setIsEditingURL(true);
  };

  const unlink = () => {
    setAttributes({ buttonUrl: undefined });
    setIsEditingURL(false);
  };

  useEffect(() => {
    if (!isSelected) {
      setIsEditingURL(false);
    }
  }, [isSelected]);

  return (
    <div {...props}>
      <BlockControls controls>
        <ToolbarGroup>
          {!isURLSet && isLinkTag && (
            <ToolbarButton
              label="link"
              icon={link}
              title={__("Link", "rrze-elements-b")}
              shortcut={displayShortcut.primary("k")}
              onClick={startEditing}
              placeholder={undefined}
            />
          )}
          {isURLSet && isLinkTag && (
            <ToolbarButton
              label="link"
              icon={linkOff}
              title={__("Unlink", "rrze-elements-b")}
              shortcut={displayShortcut.primaryShift("k")}
              onClick={unlink}
              isActive={true}
              placeholder={undefined}
            />
          )}
        </ToolbarGroup>
      </BlockControls>
      <InspectorControls>
        <PanelBody title={__("Font Size", "rrze-elements-blocks")}>
          <FontSizePicker
            disableCustomFontSizes
            fontSizes={[
              {
                name: "Small",
                size: "normal",
                slug: "small",
              },
              {
                name: "Normal",
                size: "medium",
                slug: "normal",
              },
              {
                name: "Big",
                size: "large",
                slug: "big",
              },
            ]}
            onChange={(newFontSize: string) =>
              setAttributes({ fontSize: newFontSize })
            }
            units={["px", "em", "rem"]}
            value={16}
          />
          <IconPicker
            attributes={{
              icon: attributes.icon,
              svgString: attributes.svgString,
            }}
            setAttributes={setAttributes}
          />
        </PanelBody>
      </InspectorControls>
      {isLinkTag && isSelected && (isEditingURL || isURLSet) && (
        <Popover
          placement="bottom"
          onClose={() => {}}
          anchor={UrlPopoverAnchor}
          focusOnMount={isEditingURL ? "firstElement" : false}
          __unstableSlotName={"__unstable-block-tools-after"}
          shift
        >
          <LinkControl
            value={{ url: buttonUrl }}
            onChange={onChangeButtonUrl}
            onRemove={unlink}
          />
        </Popover>
      )}

      <div className="rrze--iconbox-element-container">
        <div className="rrze-iconbox-icon">
          {attributes.icon && (
            <IconMarkComponent
              type={iconType}
              iconName={iconName}
              attributes={{
                icon: attributes.icon,
                svgString: attributes.svgString,
              }}
              defaultClass="rrze-iconbox-icon"
              setAttributes={setAttributes}
            />
          )}
        </div>
        <div className="rrze-iconbox-content">
          <dl className="rrze-elements-iconbox">
            <dt>
              {isSelected && (
                <RichText
                  tagName="span"
                  value={attributes.title}
                  onChange={onChangeTitle}
                  allowedFormats={[]}
                  placeholder={__("Title", "rrze-elements-b")}
                  className={`fau-iconbox-editor-data rrze-iconbox-${attributes.fontSize || "large"} `}
                />
              )}
              {!isSelected && (
                <span
                  className={`fau-iconbox-editor-data rrze-iconbox-${attributes.fontSize || "large"} `}
                >
                  {attributes.title.toString()}
                </span>
              )}
            </dt>
            <dd>
              <RichText
                tagName="span"
                value={attributes.description}
                onChange={(description) => setAttributes({ description })}
                allowedFormats={[]}
              />
              <br />
              {isURLSet && isLinkTag && (
                <a className="standard-btn ghost-btn">
                  <RichText
                    tagName="span"
                    value={attributes.buttonText}
                    onChange={(buttonText) => setAttributes({ buttonText })}
                    allowedFormats={[]}
                    ref={setUrlPopoverAnchor}
                  />
                </a>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
