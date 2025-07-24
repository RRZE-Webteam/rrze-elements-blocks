import {
  Spinner,
  Popover,
  ToolbarGroup,
  ToolbarButton,
} from "@wordpress/components";
import {
  useBlockProps,
  BlockControls,
  RichText,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import {useEffect, useState} from "@wordpress/element";
import {__} from "@wordpress/i18n";
import {isBlobURL} from "@wordpress/blob";
import {displayShortcut} from "@wordpress/keycodes";
import {link, linkOff} from "@wordpress/icons";
import {CustomMediaReplaceFlow} from "../../components/CustomMediaReplaceFlow";
import {IconMarkComponent} from "../../components/IconPicker";

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
    setAttributes({buttonUrl: undefined});
    setIsEditingURL(false);
  };

  useEffect(() => {
    if (props.className) {
      const hasNeedle = (needle: string) => {
        return props.className.indexOf(needle) !== -1;
      };
      if (hasNeedle("is-style-no-background")) {
        setAttributes({background: ""});
      } else if (hasNeedle("is-style-small")) {
        setAttributes({background: "style-small"});
      } else {
        setAttributes({background: ""});
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
      setAttributes({target: "_blank"});
    }
    setAttributes({buttonUrl: newButtonUrl?.url});
  };

  const onChangeTitle = (newTitle: string) => {
    setAttributes({title: newTitle});
  };

  const onChangeSubtitle = (newSubtitle: string) => {
    setAttributes({subtitle: newSubtitle});
  };

  const onChangeButtonText = (newButtonText: string) => {
    setAttributes({buttonText: newButtonText});
  };

  return (
    <div {...props}>
      <BlockControls>
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
              title={__("Link", "rrze-elements-blocks")}
              shortcut={displayShortcut.primary("k")}
              onClick={startEditing}
            />
          )}
          {isURLSet && isLinkTag && (
            <ToolbarButton
              label="link"
              icon={linkOff}
              title={__("Unlink", "rrze-elements-blocks")}
              shortcut={displayShortcut.primaryShift("k")}
              onClick={unlink}
              isActive={true}
            />
          )}
        </ToolbarGroup>
      </BlockControls>
      {isLinkTag && isSelected && (isEditingURL || isURLSet) && (
        <Popover
          placement="bottom"
          onClose={() => {
          }}
          anchor={UrlPopoverAnchor}
          focusOnMount={isEditingURL ? "firstElement" : false}
          __unstableSlotName={"__unstable-block-tools-after"}
          shift
        >
          <LinkControl
            value={{url: buttonUrl}}
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
            placeholder={__("CTA Title", "rrze-elements-blocks")}
            allowedFormats={[]}
            className="cta-title"
          />
          <RichText
            tagName="span"
            value={subtitle}
            onChange={onChangeSubtitle}
            placeholder={__("CTA Subtitle", "rrze-elements-blocks")}
            allowedFormats={[]}
            className="cta-subtitle"
          />
        </div>
        {url && (
          <div className={`cta-image ${isBlobURL(url) ? " is-loading" : ""}`}>
            <img src={url} className="attachment-large size-large" alt={alt}/>
            {isBlobURL(url) && <Spinner/>}
          </div>
        )}
        {!isSearch && (
          <div className="cta-button-container">
            <a ref={setUrlPopoverAnchor} className="btn cta-button">
              <RichText
                tagName="span"
                value={buttonText}
                onChange={onChangeButtonText}
                placeholder={__("CTA Button Text", "rrze-elements-blocks")}
                allowedFormats={[]}
                className="cta-button-text"
              />
              &nbsp;
              <IconMarkComponent
                type='solid'
                iconName='arrow-right'
                attributes={{
                  icon: 'solid arrow-right',
                  svgString: '',
                }}
                defaultClass="rrze-iconbox-icon"
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
