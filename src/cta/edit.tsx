import { SVG, Path } from "@wordpress/components";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
} from "@wordpress/block-editor";
// import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";

interface EditProps {
  attributes: {
    color: string;
    textColor?: string;
    borderColor?: string;
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

  return (
    <div {...props}>
      {/* <InspectorControls></InspectorControls>
      <BlockControls controls></BlockControls> */}
      <div className="rrze-elements-cta no-image bg-1">
        <div className="cta-content">
          <span className="cta-title">Der Titel des CTA!</span>
          <span className="cta-subtitle">Wissen bewegen.</span>
        </div>
        <div className="cta-button-container">
          <a href="#" className="btn cta-button">
            FAU Forschung kennenlernen
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