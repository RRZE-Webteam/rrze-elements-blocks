import {
  SVG,
  Path,
  Spinner,
  Popover,
  ToolbarGroup,
  ToolbarButton,
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

import { CustomMediaReplaceFlow } from "./BlockControls/CustomMediaReplaceFlow";

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
  } = attributes;
  const [popoverAnchor, setPopoverAnchor] = useState(null);
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
    console.log(newButtonUrl);
    if (newButtonUrl?.opensInNewTab) {
      setAttributes({ target: "_blank" });
    }
    setAttributes({ buttonUrl: newButtonUrl?.url });
    console.log(buttonUrl);
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

  return (
    <div {...props}>
      {/* <InspectorControls></InspectorControls> */}
      {isLinkTag && isSelected && (isEditingURL || isURLSet) && (
        <Popover
          placement="bottom"
          onClose={() => {}}
          anchor={popoverAnchor}
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
              title={__("Link")}
              shortcut={displayShortcut.primary("k")}
              onClick={startEditing}
            />
          )}
          {isURLSet && isLinkTag && (
            <ToolbarButton
              label="link"
              icon={linkOff}
              title={__("Unlink")}
              shortcut={displayShortcut.primaryShift("k")}
              onClick={unlink}
              isActive={true}
            />
          )}
        </ToolbarGroup>
      </BlockControls>
      <div className={`rrze-elements-cta ${imageClass} bg-1`}>
        <div className="cta-content">
          <RichText
            {...props}
            tagName="span"
            value={title}
            onChange={onChangeTitle}
            placeholder={__("CTA Title", "rrze-elements-b")}
            allowedFormats={[]}
            className="cta-title"
          />
          <RichText
            {...props}
            tagName="span"
            value={subtitle}
            onChange={onChangeSubtitle}
            placeholder={__("CTA Subtitle", "rrze-elements-b")}
            allowedFormats={[]}
            className="cta-subtitle"
          />
        </div>
        {url && (
          <div className={`cta-image ${isBlobURL(url) ? " is-loading" : ""}`}>
            <img src={url} className="attachment-large size-large" alt={alt} />
            {isBlobURL(url) && <Spinner />}
          </div>
        )}
        <div className="cta-button-container">
          <a ref={setPopoverAnchor} href="#" className="btn cta-button">
            <RichText
              {...props}
              tagName="span"
              value={buttonText}
              onChange={onChangeButtonText}
              placeholder={__("CTA Button Text", "rrze-elements-b")}
              allowedFormats={[]}
              className="cta-button-text"
            />
            &nbsp;
            <SVG
              height="1em"
              width="1em"
              className="rrze-elements-icon"
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              style={{fill:'currentcolor', fontSize:'2em', marginLeft: '1em'}}
            >
              {/* <!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --> */}
              <Path d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"></Path>
            </SVG>
          </a>
        </div>
      </div>
    </div>
  );
}
