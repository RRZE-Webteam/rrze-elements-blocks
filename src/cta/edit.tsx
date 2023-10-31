import { SVG, Path } from "@wordpress/components";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
  RichText,
  MediaReplaceFlow,
} from "@wordpress/block-editor";
// import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";
import { getBlobTypeByURL, isBlobURL } from "@wordpress/blob";

interface EditProps {
  attributes: {
    id: number;
    url: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
  clientId: string;
  context: { [key: string]: any };
  blockProps: any;
}

export default function Edit({
  blockProps,
  attributes,
  setAttributes,
}: EditProps) {
  const props = useBlockProps();
  const { id, url } = attributes;

  const onSelectMedia = async (newMedia: any) => {
    if (!newMedia || !newMedia.url) {
      setAttributes({
        id: undefined,
        url: undefined,
      });
    }

    if (isBlobURL(newMedia.url)) {
      newMedia.type = getBlobTypeByURL(newMedia.url);
    }

    let newMediaType;

    if (newMedia.media_type) {
      newMediaType = "image";
    } else {
      if (newMedia.type !== "image") {
        return;
      }
    }

    console.log("newMedia.id", newMedia.id);
    console.log("newMedia.url", newMedia.url);
    setAttributes({
      id: newMedia.id,
      url: newMedia.url,
    });
  };

  const imageClass = url ? "has-image" : "no-image";

  return (
    <div {...props}>
      {/* <InspectorControls></InspectorControls> */}
      <BlockControls controls>
        <MediaReplaceFlow
          mediaId={id}
          mediaURL={url}
          allowedTypes="image"
          accept="image/*,video/*"
          //onSelect={onSelectMedia}
          onSelect={onSelectMedia}
          //onToggleFeaturedImage={toggleUseFeaturedImage}
          // onToggleFeaturedImage={() => {}}
          //useFeaturedImage={useFeaturedImage}
          useFeaturedImage={false}
          name={
            !url
              ? __("Add Image", "rrze-elements-b")
              : __("Replace Image", "rrze-elements-b")
          }
        />
      </BlockControls>
      <div className={`rrze-elements-cta ${imageClass} bg-1`}>
        <div className="cta-content">
          <RichText
            {...props}
            tagName="span"
            value=""
            onChange={() => {}}
            placeholder={__("CTA Title", "rrze-elements-b")}
            allowedFormats={[]}
            className="cta-title"
          />
          <RichText
            {...props}
            tagName="span"
            value=""
            onChange={() => {}}
            placeholder={__("CTA Subtitle", "rrze-elements-b")}
            allowedFormats={[]}
            className="cta-subtitle"
          />
        </div>
        {url && (
          <div className="cta-image">
            <img
              width="620"
              height="620"
              src={url}
              className="attachment-large size-large"
              alt="Ein gelber Singvogel sitzt auf einem Ast."
              decoding="async"
              sizes="(max-width: 620px) 100vw, 620px"
            />
          </div>
        )}
        <div className="cta-button-container">
          <a href="#" className="btn cta-button">
            <RichText
              {...props}
              tagName="span"
              value=""
              onChange={() => {}}
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
