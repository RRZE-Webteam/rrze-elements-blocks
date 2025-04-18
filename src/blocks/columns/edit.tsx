import {
  useBlockProps,
  InnerBlocks,
  InspectorControls,
  ContrastChecker,
} from "@wordpress/block-editor";

import {
  StandardColorSwitcher,
} from "../../components/CustomColorSwitcher";

import { RangeControl, PanelBody, ToggleControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { useDispatch } from "@wordpress/data";
import { store as blockEditorStore } from "@wordpress/block-editor";

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
    colorSlug?: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

/**
 * Edit component for the Columns block.
 *
 * Provides controls for customizing the Columns-block and renders the block inside the editor.
 *
 * @param props - The properties passed to the component.
 * @returns     - The JSX representation of the component.
 */
export default function Edit({
  attributes,
  setAttributes,
}: EditProps) {
  const props = useBlockProps();
  const { __unstableMarkNextChangeAsNotPersistent } =
  useDispatch(blockEditorStore);

  const {
    numberOfColumns,
    rule,
    width,
    borderColor,
    border,
    color,
  } = attributes;

  const onChangeRangeControl = (numberOfColumns: number) => {
    setAttributes({ numberOfColumns });
  };

  const onChangeRuler = (rule: boolean) => {
    setAttributes({ rule });
  };

  const colorDataAlert = [
    {
      color: "#e9edf2",
      slug: "default",
      name: __("Default", "rrze-elements-blocks"),
    },
    {
      color: "#dff0d8",
      slug: "success",
      name: __("Success", "rrze-elements-blocks"),
    },
    {
      color: "#d9edf7",
      slug: "info",
      name: __("Info", "rrze-elements-blocks"),
    },
    {
      color: "#fcf8e3",
      slug: "warning",
      name: __("Warning", "rrze-elements-blocks"),
    },
    {
      color: "#f2dede",
      slug: "danger",
      name: __("Danger", "rrze-elements-blocks"),
    },
  ];

  // Lookup color slug based on hex value
  useEffect(() => {
    if (!color) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ colorSlug: "colorless" });
    } else {
      const colorEntry = colorDataAlert.find(
        (c) => c.color.toUpperCase() === color.toUpperCase()
      );
      if (colorEntry) {
        __unstableMarkNextChangeAsNotPersistent();
        setAttributes({ colorSlug: colorEntry.slug });
      }
    }
  }, [color, setAttributes]);

  // Style calculation moved outside JSX for clarity and optimization
  const style = {
    ...props.style,
    columnCount: numberOfColumns,
    columnWidth: width,
    ...(rule ? { columnRule: `1px solid ${borderColor}` } : {}),
    ...(border ? { border: `1px solid ${borderColor}` } : {}),
    // color: attributes.textColor
  };

  useEffect(() => {
    if (!attributes.color) {
      __unstableMarkNextChangeAsNotPersistent();
      setAttributes({ textColor: undefined, color: "default" });
    }
  }, [attributes.color]);

  return (
    <div {...props}>
      <div
        className={`rrze-elements-blocks-text-column bg-${attributes.colorSlug}`}
        style={style}
      >
        <InspectorControls>
          <PanelBody
            title={__("Display settings", "rrze-elements-blocks")}
            initialOpen={true}
          >
            <RangeControl
              label={__("Number of columns", "rrze-elements-blocks")}
              marks
              max={4}
              min={2}
              onChange={onChangeRangeControl}
              step={1}
              value={numberOfColumns}
            />
            <ToggleControl
              checked={rule}
              label={__("Show Rule", "rrze-elements-blocks")}
              onChange={onChangeRuler}
            />
            <StandardColorSwitcher
              attributes={{ color: attributes.color }}
              setAttributes={setAttributes}
              colorData={colorDataAlert}
              hex={true}
              useStyle={true}
              customColor={false}
              useTextColor={true}
              clearButton={true}
            />
            <ContrastChecker
              textColor={attributes.textColor}
              backgroundColor={attributes.color}
            />
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
                  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
              },
            ],
            [
              "core/paragraph",
              {
                placeholder:
                  "Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.",
              },
            ],
          ]}
        />
      </div>
    </div>
  );
}
