import { useBlockProps } from "@wordpress/block-editor";

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

  const { id, alt, url, srcset, title, subtitle, buttonText, buttonUrl, target } = attributes;

  function prependHttps(url: string): string {
    if (url?.startsWith('www.')) {
      return 'https://' + url;
    } else if (url?.startsWith('http://')) {
      return url.replace('http://', 'https://');
    }
    return url;
  }  

  return (
    <div {...blockProps}>
      <div className="rrze-elements-cta no-image bg-1">
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
          <a href={prependHttps(buttonUrl)} className="btn cta-button" target={target} rel="noopener">
            {buttonText}
            <svg
              height="1em"
              width="1em"
              className="rrze-elements-icon"
              aria-hidden="true"
              focusable="false"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              {/* <!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --> */}
              <path d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
