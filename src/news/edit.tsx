// Imports from WordPress libraries
import {
  useBlockProps,
  BlockControls,
  InspectorControls,
} from "@wordpress/block-editor";

import {
  HeadingSelector,
  HeadingSelectorInspector,
} from "../components/HeadingSelector";

import ServerSideRender from "@wordpress/server-side-render";
import { ErrorBoundary } from "react-error-boundary";

import {
  PanelBody,
  TextControl,
  CheckboxControl,
  RangeControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { symbol } from "@wordpress/icons";
import { CustomQueryControls } from "../components/QueryControls";

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
    days: number;
    display: string;
    hide: string;
    imgfloat: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

/**
 * Edit component for the News block.
 *
 * Provides controls for customizing the News-block and renders the block inside the editor.
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

  const [leftColumnWidth, setLeftColumnWidth] = useState(0);
  const [rightColumnWidth, setRightColumnWidth] = useState(0);

  const onChangeType = (newType: string) => () => {
    const type = attributes.type || "";
    const types = type.split(",").filter((t) => t);
    if (types.includes(newType)) {
      const index = types.indexOf(newType);
      types.splice(index, 1);
    } else {
      types.push(newType);
    }

    setAttributes({ type: types.join(",") });
  };

  const onChangeDisplay = () => {
    const currentDisplay = attributes.display || "";
    if (currentDisplay.includes("list")) {
      setAttributes({ display: currentDisplay.replace("list", "").trim() });
    } else {
      setAttributes({
        display: currentDisplay ? `${currentDisplay}, list` : "list",
      });
    }
  };

  const onChangeLeftColumnWidth = (newWidth: number) => {
    let newRightWidth = 0;
    if (newWidth !== 0) {
      newRightWidth = 4 - newWidth;
    }
    setAttributes({ columns: 0 });
    setLeftColumnWidth(newWidth);
    setRightColumnWidth(newRightWidth);
    updateTypeAttribute(newWidth, newRightWidth);
  };

  const onChangeRightColumnWidth = (newWidth: number) => {
    let newLeftWidth = 0;
    if (newWidth !== 0) {
      newLeftWidth = 4 - newWidth;
    }
    setAttributes({ columns: 0 });
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

  const onChangeColumns = (newColumns: number) => {
    if (newColumns === 1) {
      setAttributes({ columns: 0 });
    } else {
      setLeftColumnWidth(0);
      setRightColumnWidth(0);
      setAttributes({ columns: newColumns });
    }
  };

  const onChangeDays = (newDays: number) => {
    setAttributes({ days: newDays });
  };

  const toggleHideValue = (value: string) => {
    let hideValues = attributes.hide ? attributes.hide.split(",") : [];
    if (hideValues.includes(value)) {
      hideValues = hideValues.filter((v) => v !== value); // Remove the value
    } else {
      hideValues.push(value); // Add the value
    }
    setAttributes({ hide: hideValues.join(",") });
  };

  const handleToggleImgAlignment = (newAlignment: string) => {
    setAttributes({ imgfloat: newAlignment });
  };

  console.log("Attributes passed to ServerSideRender:", {
    title: attributes.title || "",
    num: attributes.num || "",
    cat: attributes.cat || "",
    columns: attributes.columns || "",
    tag: attributes.tag || "",
    type: attributes.type || "",
    divclass: attributes.divclass || "",
    hidemeta: attributes.hidemeta || false,
    sticky_only: attributes.sticky_only || false,
    hideduplicates: attributes.hideduplicates || false,
    has_thumbnail: attributes.has_thumbnail || false,
    days: attributes.days || "",
    display: attributes.display || "",
    hide: attributes.hide || "",
    imgfloat: attributes.imgfloat || "",
  });

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
          <RangeControl
            label={__("Number of days", "rrze-elements-b")}
            value={attributes.days}
            onChange={onChangeDays}
            min={0}
            max={365}
          />
        </PanelBody>
        <PanelBody title={__("Layout", "rrze-elements-b")} initialOpen={false}>
          <HeadingSelectorInspector
            attributes={{ hstart: attributes.hstart }}
            setAttributes={setAttributes}
          />
          <TextControl
            label="Title"
            value={title}
            onChange={(value) => setAttributes({ title: value })}
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
          <CheckboxControl
            label={__("Display as List", "rrze-elements-b")}
            checked={attributes.display?.includes("list") ?? false}
            onChange={onChangeDisplay}
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
          <RangeControl
            label={__("Number of Columns", "rrze-elements-b")}
            value={attributes.columns}
            onChange={onChangeColumns}
            min={1}
            max={4}
          />
          <ToggleGroupControl
            label={__("Image alignment", "rrze-elements-b")}
            value={attributes.hstart}
            onChange={handleToggleImgAlignment}
            isBlock
          >
            <ToggleGroupControlOption
              value={"left"}
              label={__("left", "rrze-elements-b")}
            />
            <ToggleGroupControlOption
              value={"right"}
              label={__("right", "rrze-elements-b")}
            />
          </ToggleGroupControl>
        </PanelBody>
        <PanelBody
          title={__("Hide Options", "rrze-elements-b")}
          initialOpen={false}
        >
          <CheckboxControl
            label={__("Hide Date", "rrze-elements-b")}
            checked={attributes.hide?.includes("date") ?? false}
            onChange={() => toggleHideValue("date")}
          />
          <CheckboxControl
            label={__("Hide Thumbnail", "rrze-elements-b")}
            checked={attributes.hide?.includes("thumbnail") ?? false}
            onChange={() => toggleHideValue("thumbnail")}
          />
          <CheckboxControl
            label={__("Hide Category", "rrze-elements-b")}
            checked={attributes.hide?.includes("category") ?? false}
            onChange={() => toggleHideValue("category")}
          />
          <CheckboxControl
            label={__("Hide meta", "rrze-elements-b")}
            checked={attributes.hidemeta ?? false}
            onChange={(value) => setAttributes({ hidemeta: value })}
          />
        </PanelBody>
      </InspectorControls>
      <ErrorBoundary
        fallback={
          <div {...props}>
            <p>{__("An error occured inside the ServerSideRender component of this block. Try adjusting the block settings, save your draft and refresh the page.", "rrze-elements-b")}</p>
          </div>
        }
      >
        <ServerSideRender
          block="rrze-elements/news"
          attributes={{
            title: title,
            num: attributes.num,
            cat: attributes.cat,
            columns: attributes.columns,
            tag: tag,
            type: attributes.type,
            divclass: divclass,
            hidemeta: hidemeta,
            sticky_only: attributes.sticky_only,
            hideduplicates: attributes.hideduplicates,
            has_thumbnail: attributes.has_thumbnail,
            days: attributes.days,
            display: attributes.display,
            hide: attributes.hide,
            imgfloat: attributes.imgfloat,
          }}
        />
      </ErrorBoundary>
    </div>
  );
}
