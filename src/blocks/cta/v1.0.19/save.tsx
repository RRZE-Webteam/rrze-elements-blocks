import {InnerBlocks, useBlockProps} from "@wordpress/block-editor";
import {BlockSaveProps} from "@wordpress/blocks";
import {AttributesV1_0_19} from "./attributes";

const Save = ({attributes}: BlockSaveProps<AttributesV1_0_19>) => {
  const blockProps = useBlockProps.save();

  const {
    id,
    alt,
    url,
    title,
    subtitle,
    buttonText,
    buttonUrl,
    background,
    isSearch,
  } = attributes;

  function prependHttps(url: string): string {
    if (url?.startsWith("www.")) {
      return "https://" + url;
    } else if (url?.startsWith("http://")) {
      return url.replace("http://", "https://");
    }
    return url;
  }

  let urlClass = "has-image";
  if (!url) {
    urlClass = "no-image";
  }

  return (
    <div {...blockProps}>
      {!isSearch && (
        <div className={`rrze-elements-cta ${urlClass} ${background}`}>
          <div className="cta-content">
            <span className="cta-title">{title}</span>
            <span className="cta-subtitle">{subtitle}</span>
          </div>
          {url && (
            <div className="cta-image">
              <img
                src={url}
                className={id ? `wp-image-${id}` : null}
                alt={alt}
                decoding="async"
              />
            </div>
          )}
          <div className="cta-button-container">
            <a href={prependHttps(buttonUrl)} className="btn cta-button">
              {buttonText}
              <span
                className={"fa-solid fa-arrow-right rrze-elements-cta-icon"}
              ></span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Save;
