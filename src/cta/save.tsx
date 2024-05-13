import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

interface SaveProps {
  attributes: {
    id: number;
    alt: string;
    url: string;
    srcset: string;
    title: string;
    subtitle: string;
    buttonText: string;
    buttonUrl: string;
    target: string;
    background: string;
    isSearch: boolean;
  };
}

/**
 * Save Component for the Tabs WordPress block.
 *
 * This component serves as the Save function for the Tabs WordPress block.
 * It controls the block's display inside the frontend using data stored as attributes.
 */
export default function save({ attributes }: SaveProps) {
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

  let urlClass = 'has-image'
  if(!url) {
    urlClass = 'no-image';
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
              <span className={"fa-solid fa-arrow-right rrze-elements-cta-icon"}></span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
