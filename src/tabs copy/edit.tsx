

import {
  useBlockProps,
  useInnerBlocksProps,
  InnerBlocks,
  RichText,
  InspectorControls,
} from "@wordpress/block-editor";
import {
  TextControl,
} from "@wordpress/components";
import { isEqual } from "lodash";
import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { useSelect } from "@wordpress/data";

interface EditProps {
  attributes: {
    color?: string;
    innerClientIds?: string[];
    active?: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
  blockProps: any;
  context: { [key: string]: any };
  children: any; 
}

export default function Edit ({
  attributes,
  setAttributes,
  context
}: EditProps){

  const id="45zi";
  const active = true;
  const tabindex = -1;
  const focus = "focus";

  const blockProps = useBlockProps();
  const { children, ...innerBlocksProps } = useInnerBlocksProps( blockProps );
  console.log(children);
  console.log(innerBlocksProps);

  // todo: Eine Funktion welche die ClientId's 

  return (
    <>
      <div className="rrze-elements-tabs primary" id="tabs-1">
        <div role="tablist" className="manual">
          <button 
            key={id}
            onClick={event => console.log(event)}
            role="tab"
            aria-selected={active}
            aria-controls={id}
            tabIndex={tabindex}
          >
            <span className={focus} tabIndex={tabindex}>
              Text
            </span>
          </button>
        </div>
          <InnerBlocks />
        {/* <div id={id} role="tabpanel" aria-labelledby={id}>
          <h2 className="print-only">Label 2</h2>
          <p>
            Keinen Plan
          </p>
        </div> */}
      </div>
    </>
  )
}