// import { TextControl } from "@wordpress/components";
import { useBlockProps, InnerBlocks, InspectorControls } from "@wordpress/block-editor";
// import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { withSelect } from "@wordpress/data";

import { ColorSwitcher } from "./InspectorControls/ColorSwitcher";

export default function Edit({ blockProps, attributes, selectedBlock, setAttributes, blockParents}) {
  const props = useBlockProps();

  return (
    <>
      <InspectorControls
        allowedBlocks={["core/paragraph"]}
      >
          <ColorSwitcher attributes={attributes} setAttributes={setAttributes} />
      </InspectorControls>
      <div 
    className={`alert clearfix clear ${attributes.style ? `alert-${attributes.style}` : ''}`}
    style={attributes.style ? {} : {backgroundColor: attributes.color}}
>
       <InnerBlocks
          template={[
            ["core/paragraph", { placeholder: __("Add a description…") }],
          ]}
          templateLock={false}
        />
      </div>
    </>
  );
}

