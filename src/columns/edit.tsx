// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
  InspectorControls,
  ContrastChecker
} from "@wordpress/block-editor";

import {
  StandardColorSwitcher,
  StandardColorSwitcherToolbar,
  BorderColorPicker,
} from "../components/CustomColorSwitcher";


import { RangeControl, PanelBody, ToggleControl } from "@wordpress/components";

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
  attributes: {
    numberOfColumns: number;
    rule: boolean;
    width: number;
    borderColor: string;
    border: boolean;
    color: string;
    textColor: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

/**
 * Edit component for the Columns block.
 *
 * Provides controls for customizing the Columns-block and renders the block inside the editor.
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

  const { numberOfColumns, rule, width, borderColor, border } = attributes;

  const onChangeRangeControl = (numberOfColumns: number) => {
    setAttributes({ numberOfColumns });
  };

  const onChangeWidthControl = (width: number) => {
    setAttributes({ width });
  };

  const onChangeRuler = (rule: boolean) => {
    setAttributes({ rule });
  };

  const onChangeBorder = (border: boolean) => {
    setAttributes({ border });
  };

  const colorDataAlert = [
    {
      color: "#e9edf2",
      slug: "default",
      name: __("Default", "rrze-elements-b"),
    },
    {
      color: "#dff0d8",
      slug: "success",
      name: __("Success", "rrze-elements-b"),
    },
    {
      color: "#d9edf7",
      slug: "info",
      name: __("Info", "rrze-elements-b"),
    },
    {
      color: "#fcf8e3",
      slug: "warning",
      name: __("Warning", "rrze-elements-b"),
    },
    {
      color: "#f2dede",
      slug: "danger",
      name: __(
        "Danger",
        "rrze-elements-b"
      ),
    },
  ];

    // Style calculation moved outside JSX for clarity and optimization
    const style = {
      ...props.style,
      columnCount: numberOfColumns,
      columnWidth: width,
      ...(rule ? { columnRule: `1px solid ${borderColor}` } : {}),
      ...(border ? { border: `1px solid ${borderColor}` } : {}),
      backgroundColor: attributes.color,
      // color: attributes.textColor
    };

    useEffect(() => {
      if (!attributes.color) {
        setAttributes({ textColor: undefined });
      }
    }, [attributes.color]);

  return (
    <div {...props} style={style}>
      <InspectorControls>
        <PanelBody
          title={__("Display settings", "rrze-elements-b")}
          initialOpen={true}
        >
          <RangeControl
            label={__("Number of columns", "rrze-elements-b")}
            marks
            max={4}
            min={2}
            onChange={onChangeRangeControl}
            step={1}
            value={numberOfColumns}
          />
          <RangeControl
            label={__("Minimum Width of Columns", "rrze-elements-b")}
            marks={[
              {
                label: "240 (Default)",
                value: 240,
              },
            ]}
            max={400}
            min={200}
            onChange={onChangeWidthControl}
            step={1}
            value={width}
          />
          
          <ToggleControl
            checked={rule}
            label={__("Show Rule", "rrze-elements-b")}
            onChange={onChangeRuler}
          />
          {/* <ToggleControl
            checked={border}
            label={__("Show Border", "rrze-elements-b")}
            onChange={onChangeBorder}
          /> */}
          <StandardColorSwitcher
          attributes={{ color: attributes.color }}
          setAttributes={setAttributes}
          colorData={colorDataAlert}
          hex={true}
          useStyle={true}
          customColor={false}
          useTextColor={true}
          clearButton = {true}
        />
        <ContrastChecker textColor={attributes.textColor} backgroundColor={attributes.color} />
        </PanelBody>
        {/* { (rule || border) && (
          <BorderColorPicker
            attributes={{ color: borderColor }}
            setAttributes={setAttributes}
          />
        )} */}
      </InspectorControls>
      <InnerBlocks
        template={[
          [
            "core/paragraph",
            {
              placeholder:
                "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
            },
          ],
        ]}
      />
    </div>
  );
}
