// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
  InspectorControls,
} from "@wordpress/block-editor";

import {
  HeadingSelector,
  HeadingSelectorInspector,
} from "../components/HeadingSelector";

import ServerSideRender from "@wordpress/server-side-render";

import {
  PanelBody,
  TextControl,
  CheckboxControl,
  RangeControl,
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { symbol } from "@wordpress/icons";
import { CustomQueryControls } from "../components/QueryControls";
import {} from "@wordpress/components";

/**
 * Interface representing the properties for the Edit component.
 *
 * @interface EditProps
 * @property {Object} attributes - The block attributes.
 */
interface EditProps {
  blockProps: string[];
  attributes: {
    title: string;
    num: number;
    columns: number;
    type: string;
    cat: string;
    tag: string;
    divclass: string;
    hidemeta: boolean;
    grid: boolean;
    hstart: number;
    hideduplicates: boolean;
    has_thumbnail: boolean;
    sticky_only: boolean;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

/**
 * Edit component for the Blueprint block.
 *
 * Provides controls for customizing the Blueprint-block and renders the block inside the editor.
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

  const title = attributes.title || "";
  const tag = attributes.tag || "";
  const divclass = attributes.divclass || "";
  const hidemeta = attributes.hidemeta || false;

  console.log(attributes);

  const [leftColumnWidth, setLeftColumnWidth] = useState(0);
  const [rightColumnWidth, setRightColumnWidth] = useState(0);

  const onChangeType = (newType: string) => () => {
    const type = attributes.type || "";
    const types = type.split(",");
    if (types.includes(newType)) {
      const index = types.indexOf(newType);
      types.splice(index, 1);
    } else {
      types.push(newType);
    }

    setAttributes({ type: types.join(",") });
  };

  const onChangeLeftColumnWidth = (newWidth: number) => {
    let newRightWidth = 0;
    if (newWidth !== 0) {
      newRightWidth = 4 - newWidth;
    }
    setLeftColumnWidth(newWidth);
    setRightColumnWidth(newRightWidth);
    updateTypeAttribute(newWidth, newRightWidth);
  };

  const onChangeRightColumnWidth = (newWidth: number) => {
    let newLeftWidth = 0;
    if (newWidth !== 0) {
      newLeftWidth = 4 - newWidth;
    }
    setRightColumnWidth(newWidth);
    setLeftColumnWidth(newLeftWidth);
    updateTypeAttribute(newLeftWidth, newWidth);
  };

  const updateTypeAttribute = (leftWidth: number, rightWidth: number) => {
    const type = attributes.type || "";
    const types = type.split(",").filter((t) => t); // Filter out empty strings
    const regex = /cols_\d+-\d+/;
    let newTypes: string[];

    if (leftWidth === 0 || rightWidth === 0) {
      // Remove any 'cols_?-?' entries when either width is 0
      newTypes = types.filter((t) => !regex.test(t));
    } else {
      // Update or add 'cols_?-?' entry
      let hasCol = false;
      newTypes = types.map((t) => {
        if (regex.test(t)) {
          hasCol = true;
          return `cols_${leftWidth}-${rightWidth}`;
        }
        return t;
      });

      if (!hasCol) {
        newTypes.push(`cols_${leftWidth}-${rightWidth}`);
      }
    }

    setAttributes({ type: newTypes.join(",") });
  };

  const removeColsFromType = () => {
    const type = attributes.type || "";
    const regex = /cols_\d+-\d+/; // Regular expression to match 'cols_?-?' pattern
    const types = type.split(",").filter((t) => !regex.test(t)); // Remove only the matching 'cols_?-?' entries
    setAttributes({ type: types.join(",") }); // Update the 'type' attribute
  };

  return (
    <div {...props}>
      <BlockControls controls>
        <HeadingSelector
          attributes={{ hstart: attributes.hstart }}
          setAttributes={setAttributes}
        />
      </BlockControls>
      <InspectorControls>
        <PanelBody title={__("Filter", "rrze-elements-b")} initialOpen={true}>
          <HeadingSelectorInspector
            attributes={{ hstart: attributes.hstart }}
            setAttributes={setAttributes}
          />
          <TextControl
            label="Title"
            value={title}
            onChange={(value) => setAttributes({ title: value })}
          />
          <CustomQueryControls
            attributes={{
              cat: attributes.cat,
              num: attributes.num,
            }}
            setAttributes={setAttributes}
          />
          <TextControl
            label={__("tags", "rrze-elements-b")}
            help={__("Comma separated list of tags", "rrze-elements-b")}
            value={tag}
            onChange={(value) => setAttributes({ tag: value })}
          />
          <TextControl
            label={__("Additional classes", "rrze-elements-b")}
            value={divclass}
            onChange={(value) => setAttributes({ divclass: value })}
          />
          <CheckboxControl
            label={__("Hide duplicate posts", "rrze-elements-b")}
            checked={attributes.hideduplicates ?? false}
            onChange={(value) => setAttributes({ hideduplicates: value })}
          />
          <CheckboxControl
            label={__("Only show posts with thumbnails", "rrze-elements-b")}
            checked={attributes.has_thumbnail ?? false}
            onChange={(value) => setAttributes({ has_thumbnail: value })}
          />
           <CheckboxControl
            label={__("Only show sticky posts", "rrze-elements-b")}
            checked={attributes.sticky_only ?? false}
            onChange={(value) => setAttributes({ sticky_only: value })}
          />
        </PanelBody>
        <PanelBody title={__("Layout", "rrze-elements-b")} initialOpen={true}>
          <CheckboxControl
            label={__("Hide meta", "rrze-elements-b")}
            checked={attributes.hidemeta ?? false}
            onChange={(value) => setAttributes({ hidemeta: value })}
          />
          <CheckboxControl
            label={__("Img first", "rrze-elements-b")}
            checked={attributes.type?.includes("img_first") ?? false}
            onChange={onChangeType("img_first")}
          />
          <CheckboxControl
            label={__("Show more articles button", "rrze-elements-b")}
            checked={attributes.type?.includes("show_more") ?? false}
            onChange={onChangeType("show_more")}
          />
          <RangeControl
            label={__("Ratio image", "rrze-elements-b")}
            value={leftColumnWidth}
            onChange={onChangeLeftColumnWidth}
            min={0}
            max={3}
          />
          <RangeControl
            label={__("Ratio text & metadata", "rrze-elements-b")}
            value={rightColumnWidth}
            onChange={onChangeRightColumnWidth}
            min={0}
            max={3}
          />
        </PanelBody>
      </InspectorControls>
      <ServerSideRender
        block="rrze-elements/block-blueprint"
        attributes={{
          title: title,
          num: attributes.num,
          cat: attributes.cat,
          columns: 3,
          tag: tag,
          type: attributes.type,
          divclass: divclass,
          hidemeta: hidemeta,
          sticky_only: attributes.sticky_only,
          hideduplicates: attributes.hideduplicates,
          has_thumbnail: attributes.has_thumbnail,
        }}
      />
    </div>
  );
}
