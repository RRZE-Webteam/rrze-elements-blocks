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

/**
 * Interface representing the properties for the Edit component.
 *
 * @interface EditProps
 * @property {Object} attributes - The block attributes.
 */
interface EditProps {
  blockProps: string[];
  attributes: {
    title: number;
    description: string;
    buttonText: string;
    fontSize: string;
    buttonUrl: string;
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

  const { buttonUrl } = attributes;

  const onChangeTitle = (title: string) => {
    if (isNaN(parseInt(title))) {
      return;
    } else {
      setAttributes({ title: parseInt(title) });
    }
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
      <BlockControls>
        <ToolbarGroup>
          {!isURLSet && isLinkTag && (
            <ToolbarButton
              label="link"
              icon={link}
              title={__("Link", "rrze-elements-b")}
              shortcut={displayShortcut.primary("k")}
              onClick={startEditing}
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
            />
          )}
        </ToolbarGroup>
      </BlockControls>
      <InspectorControls>
        <PanelBody title={__("Font Size", "rrze-elements-b")}>
          <FontSizePicker
            disableCustomFontSizes
            fontSizes={[
              {
                name: `${__("Small", "rrze-elements-b")}`,
                size: "normal",
                slug: "small",
              },
              {
                name: `${__("Normal", "rrze-elements-b")}`,
                size: "medium",
                slug: "normal",
              },
              {
                name: `${__("Big", "rrze-elements-b")}`,
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

      <div className="rrze--counter-element-container">
        <dl className="rrze-elements-counter">
          <dt>
            {isSelected && (
              <RichText
                tagName="span"
                value={attributes.title.toString()}
                onChange={onChangeTitle}
                allowedFormats={[]}
                className={`fau-counter-editor-data rrze-counter-${attributes.fontSize || "large"} `}
              />
            )}
            {!isSelected && (
              <span
                className={`fau-counter-data rrze-counter-${attributes.fontSize || "large"} `}
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
              placeholder={__("Description", "rrze-elements-b")}
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
                  placeholder={__("Button Text", "rrze-elements-b")}
                />
              </a>
            )}
          </dd>
        </dl>
      </div>
    </div>
  );
}
