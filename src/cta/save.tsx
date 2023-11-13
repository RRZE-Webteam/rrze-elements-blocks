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
    srcset,
    title,
    subtitle,
    buttonText,
    buttonUrl,
    target,
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

  return (
    <div {...blockProps}>
      {!isSearch && (
        <div className={`rrze-elements-cta no-image ${background}`}>
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
              <svg
                height="1em"
                width="1em"
                className="rrze-elements-icon"
                aria-hidden="true"
                focusable="false"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                style={{
                  fill: "currentcolor",
                  fontSize: "2em",
                  marginLeft: "1em",
                }}
              >
                {/* <!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --> */}
                <path d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"></path>
              </svg>
            </a>
          </div>
        </div>
      )}
      {isSearch && (
        <div className="rrze-elements-cta no-image bg-1">
          <div className="cta-content">
            <span className="cta-title">{title}</span>
            <span className="cta-subtitle">{subtitle}</span>
          </div>
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
                Please enter the search term for searching on /:
              </label>
              <meta itemProp="target" content="/?s={s}" />
              <input
                itemProp="query-input"
                id="442333"
                type="text"
                value=""
                name="s"
                placeholder="Search for..."
                required
              />
              {/* @ts-ignore */}
              <button type="submit" enterkeyhint="search" value="">
                <svg
                  height="1em"
                  width="1em"
                  className="rrze-elements-icon"
                  // @ts-ignore
                  style={{
                    fill: "currentcolor",
                    fontSize: "2em",
                    marginLeft: "1em",
                  }}
                  aria-hidden="true"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  {/* <!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --> */}
                  <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"></path>
                </svg>
                <span className="sr-only">Find</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
