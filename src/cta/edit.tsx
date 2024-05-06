import {
  Spinner,
  Popover,
  ToolbarGroup,
  ToolbarButton,
  CheckboxControl,
  PanelBody,
} from "@wordpress/components";
import {
  useBlockProps,
  InspectorControls,
  BlockControls,
  RichText,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isBlobURL } from "@wordpress/blob";
import { displayShortcut, isKeyboardEvent } from "@wordpress/keycodes";
import { link, linkOff } from "@wordpress/icons";
import { CustomMediaReplaceFlow } from "../components/CustomMediaReplaceFlow";

interface EditProps {
  attributes: {
    id: number;
    url: string;
    buttonUrl: string;
    alt: string;
    srcset: string;
    title: string;
    subtitle: string;
    buttonText: string;
    target: string;
    background: string;
    isSearch: boolean;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
  isSelected: boolean;
  clientId: string;
  context: { [key: string]: any };
  blockProps: any;
}

export default function Edit({
  blockProps,
  attributes,
  setAttributes,
  isSelected,
}: EditProps) {
  const props = useBlockProps();
  const {
    id,
    url,
    alt,
    srcset,
    title,
    subtitle,
    buttonText,
    buttonUrl,
    target,
    background,
    isSearch,
  } = attributes;
  // For the URL popover
  const [UrlPopoverAnchor, setUrlPopoverAnchor] = useState(null);
  const [isEditingURL, setIsEditingURL] = useState(false);

  const TagName = "a";
  const isLinkTag = "a" === TagName;
  const isURLSet = !!buttonUrl;

  const imageClass = url ? "has-image" : "no-image";

  const startEditing = () => {
    setIsEditingURL(true);
  };

  const unlink = () => {
    setAttributes({ buttonUrl: undefined });
    setIsEditingURL(false);
  };

  useEffect(() => {
    if (props.className) {
      //string contains a string
      const needle = "is-style-no-background";
      const hasNeedle = (needle: string) => {
        return props.className.indexOf(needle) !== -1;
      };
      if (hasNeedle("is-style-no-background")) {
        setAttributes({ background: "" });
      } else if (hasNeedle("is-style-small")) {
        setAttributes({ background: "bg-1 style-small" });
      } else {
        setAttributes({ background: "bg-1" });
      }
    }
  }, [props.className]);

  useEffect(() => {
    if (!isSelected) {
      setIsEditingURL(false);
    }
  }, [isSelected]);

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

  const onChangeTitle = (newTitle: string) => {
    setAttributes({ title: newTitle });
  };

  const onChangeSubtitle = (newSubtitle: string) => {
    setAttributes({ subtitle: newSubtitle });
  };

  const onChangeButtonText = (newButtonText: string) => {
    setAttributes({ buttonText: newButtonText });
  };

  const onChangeSearchBoxText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newButtonText = event.target.value;
  
    // Rest of your logic...
    setAttributes({ buttonText: newButtonText });
  };

  const updateIsSearch = () => {
    setAttributes({ isSearch: !attributes.isSearch });
  };

  return (
    <div {...props}>
      <BlockControls controls>
          <CustomMediaReplaceFlow
            attributes={{
              id: id,
              url: url,
              alt: alt,
              srcset: srcset,
            }}
            setAttributes={setAttributes}
          />
          <ToolbarGroup>
            {!isURLSet && isLinkTag && (
              <ToolbarButton
              label="link"
              icon={link}
              title={__("Link", "rrze-elements-b")}
              shortcut={displayShortcut.primary("k")}
              onClick={startEditing} placeholder={undefined}              />
            )}
            {isURLSet && isLinkTag && (
              <ToolbarButton
              label="link"
              icon={linkOff}
              title={__("Unlink", "rrze-elements-b")}
              shortcut={displayShortcut.primaryShift("k")}
              onClick={unlink}
              isActive={true} placeholder={undefined}              />
            )}
          </ToolbarGroup>
        </BlockControls>
      <InspectorControls>
        <PanelBody
          title={__("Advanced Options", "rrze-elements-b")}
          initialOpen={true}
        >
          <CheckboxControl
            label={__("Display Search box instead of CTA", "rrze-elements-b")}
            checked={attributes.isSearch}
            onChange={updateIsSearch}
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
      <div className={`rrze-elements-cta ${imageClass} ${background}`}>
            <div className="cta-content">
              <RichText
                tagName="span"
                value={title}
                onChange={onChangeTitle}
                placeholder={__("CTA Title", "rrze-elements-b")}
                allowedFormats={[]}
                className="cta-title"
              />
              <RichText
                tagName="span"
                value={subtitle}
                onChange={onChangeSubtitle}
                placeholder={__("CTA Subtitle", "rrze-elements-b")}
                allowedFormats={[]}
                className="cta-subtitle"
              />
            </div>
            {url && (
              <div
                className={`cta-image ${isBlobURL(url) ? " is-loading" : ""}`}
              >
                <img
                  src={url}
                  className="attachment-large size-large"
                  alt={alt}
                />
                {isBlobURL(url) && <Spinner />}
              </div>
            )}
            {!isSearch && (
            <div className="cta-button-container">
              <a ref={setUrlPopoverAnchor} href="#" className="btn cta-button">
                <RichText
                  tagName="span"
                  value={buttonText}
                  onChange={onChangeButtonText}
                  placeholder={__("CTA Button Text", "rrze-elements-b")}
                  allowedFormats={[]}
                  className="cta-button-text"
                />
                &nbsp;
                <span className={"fa-solid fa-arrow-right rrze-elements-cta-icon"}></span>
              </a>
            </div>
            )}
            {isSearch && (
              <div className="cta-search-container">
              <form
                itemProp="potentialAction"
                itemType="https://schema.org/SearchAction"
                role="search"
                aria-label="Search on /"
                method="get"
                className="cta-search searchform"
                action="/"
              >
                <label htmlFor="cta_search_442333">
                  {__(
                    "Please enter the search term for searching on /:",
                    "rrze-elements-b"
                  )}
                </label>
                <meta itemProp="target" content="/?s={s}" />
                <input
                  itemProp="query-input"
                  id="442333"
                  type="text"
                  value={buttonText}
                  name="s"
                  placeholder={__("Search for...", "rrze-elements-b")}
                  required
                  onChange={onChangeSearchBoxText}
                />
                {/* @ts-ignore */}
                <button ref={setUrlPopoverAnchor} type="submit" value="">
                  <span className={"fa-solid fa-magnifying-glass rrze-elements-cta-icon"}></span>
                  <span className="sr-only">
                    {__("Find", "rrze-elements-b")}
                  </span>
                </button>
              </form>
            </div>
            )}
      </div>
    </div>
  );
}
