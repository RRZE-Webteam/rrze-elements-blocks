// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
} from "@wordpress/block-editor";

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
  attributes: {};
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

/**
 * Edit component for the Text-Slider block.
 *
 * Provides controls for customizing the Text-Slider-block and renders the block inside the editor.
 *
 * @param {EditProps} props - The properties passed to the component.
 * @returns {JSX.Element} The JSX representation of the component.
 */
export default function Edit({
  blockProps,
  attributes,
  setAttributes,
}: EditProps) {
  const props = useBlockProps();

  const liStyle: React.CSSProperties = {
    width: "100%",
    // float: "left",
    // marginRight: "-100%",
    // position: "relative",
    // opacity: 1,
    // display: "block",
    // zIndex: 2,
  };

  const liStyleInactive: React.CSSProperties = {
    width: "100%",
    // float: "left",
    // marginRight: "-100%",
    // position: "relative",
    // opacity: 0,
    // display: "block",
    // zIndex: 1,
  };

  return (
    <div {...props}>
      <div className="example">
        <div className="content-slider flexslider clear clearfix">
          <ul className="slides">
            <InnerBlocks 
              template = {[
                ['rrze-elements/textslideritem', {style: liStyle}],
                ['rrze-elements/textslideritem', {style: liStyleInactive}],
                ['rrze-elements/textslideritem', {style: liStyleInactive}],                
              ]}
              allowedBlocks = {['rrze-elements/textslideritem']}
            />
          </ul>
          {/* <ol className="flex-control-nav flex-control-paging">
            <li>
              <a href="#" className="flex-active">
                1
              </a>
            </li>
            <li>
              <a href="#" className="">
                2
              </a>
            </li>
          </ol> */}
          <ul className="flex-direction-nav">
            <li className="flex-nav-prev">
              <a className="flex-prev" href="#">
                Previous
              </a>
            </li>
            <li className="flex-nav-next">
              <a className="flex-next" href="#">
                Next
              </a>
            </li>
          </ul>
          <div className="flex-pauseplay">
            <a href="#" className="flex-pause">
              Pause
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
