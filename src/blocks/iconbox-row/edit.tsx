import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
} from "@wordpress/block-editor";

import {
  PanelBody,
  RangeControl,
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";
interface EditProps {
  blockProps: string[];
  isSelected: boolean;
  attributes: {
    stagger: number;
    columns: number;
    startValue: number;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

/**
 * Edit component for the Blueprint block.
 *
 * Provides controls for customizing the Blueprint-block and renders the block inside the editor.
 *
 * @param props - The properties passed to the component.
 * @returns     - The JSX representation of the component.
 */
export default function Edit({
  attributes,
  setAttributes,
}: EditProps) {
  const dynamicClass = `rrze-elements-column-${attributes.columns}`;

  const props = useBlockProps({
    className: dynamicClass,
  });

  const onChangeColumns = (columns: number) => {
    setAttributes({ columns });
  };

  return (
    <div {...props}>
      <section className="rrze-elements-blocks-counter-row">
        <InspectorControls>
          <PanelBody title={__("Grid Settings", "rrze-elements-blocks")}>
            <RangeControl
              label={__("Column number", "rrze-elements-blocks")}
              marks
              max={5}
              min={1}
              value={attributes.columns}
              onBlur={function noRefCheck() {}}
              onChange={onChangeColumns}
              onFocus={function noRefCheck() {}}
              onMouseLeave={function noRefCheck() {}}
              onMouseMove={function noRefCheck() {}}
              step={1}
            />
          </PanelBody>
        </InspectorControls>
        <InnerBlocks
          template={[
            ["rrze-elements/rrze-iconbox"],
            ["rrze-elements/rrze-iconbox"],
            ["rrze-elements/rrze-iconbox"],
            ["rrze-elements/rrze-iconbox"],
          ]}
          allowedBlocks={[
            "rrze-elements/rrze-iconbox",
          ]}
        />
      </section>
    </div>
  );
}
