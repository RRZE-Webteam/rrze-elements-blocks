// import { TextControl } from "@wordpress/components";
import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  BlockControls,
  __experimentalBlockVariationPicker as BlockVariationPicker,
  store as blockEditorStore,
} from "@wordpress/block-editor";
  import {
	store as blocksStore,
} from '@wordpress/blocks';
// import { useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";
import { Placeholder } from "@wordpress/components";

import {
  StandardColorSwitcher,
  StandardColorSwitcherToolbar,
  BorderColorPicker,
} from "../components/CustomColorSwitcher";

{/* @ts-ignore */}
import variations from "./variations";

import { IconMarkComponent, IconPicker } from "../components/IconPicker";

interface EditProps {
  attributes: {
    style?: string;
    color: string;
    textColor?: string;
    borderColor?: string;
    icon?: string;
    svgString?: string;
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
  const { icon } = attributes;
  const [iconType, iconName] = icon?.split(" ") || [];
  // Data for color options

  const blockName = 'rrze-elements/notice';

  const variations = useSelect(
		( select ) => {
			const { getBlockVariations } = select( blocksStore ) as any;;
			return getBlockVariations( blockName, 'block' );
		},
		[ blockName ]
	);

  return (
    <div {...props}>
      <Placeholder
        icon="admin-plugins"
        label={__("Notice", "rrze-elements")}
      >
        <BlockVariationPicker variations = { variations } />
      </Placeholder>
      <InspectorControls>
        {attributes.style ? null : (
          <BorderColorPicker
            attributes={{ color: attributes.borderColor }}
            setAttributes={setAttributes}
          />
        )}
        <IconPicker
          attributes={{
            icon: attributes.icon,
            svgString: attributes.svgString,
          }}
          setAttributes={setAttributes}
        />
      </InspectorControls>
      {/* <BlockControls controls></BlockControls> */}
      <div
        className={`notice notice-attention no-title ${
          attributes.style ? `alert-${attributes.style}` : ""
        }`}
        style={
          attributes.style
            ? {}
            : {
                backgroundColor: attributes.color,
                color: attributes.textColor,
                border: `1px solid ${attributes.borderColor}`,
              }
        }
      >
        <div>
          {/* {attributes.icon && (
            <IconMarkComponent
              className="rrze-elements-icon"
              type={iconType}
              iconName={iconName}
              attributes={{
                icon: attributes.icon,
                svgString: attributes.svgString,
              }}
              setAttributes={setAttributes}
            />
          )} */}
          {variations.map ( ( variation: any ) => { 
            return (
              variation.icon
            )
          })
          }

        </div>
        <InnerBlocks
          template={[
            ["core/paragraph", { placeholder: __("Add a description…") }],
          ]}
          allowedBlocks={["core/paragraph"]}
          templateLock={false}
        />
      </div>
    </div>
  );
}
