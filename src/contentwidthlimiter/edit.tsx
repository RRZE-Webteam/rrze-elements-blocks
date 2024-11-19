// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
} from "@wordpress/block-editor";

import { ResizableBox } from "@wordpress/components";

import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";

import { AlignmentBar } from "../components/Alignment";

/**
 * Interface representing the properties for the Edit component.
 *
 * @interface EditProps
 * @property {Object} attributes - The block attributes.
 */
interface EditProps {
  blockProps: any;
  attributes: {
    width: number;
    alignment: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

/**
 * Edit component for the Content Width Limiter block.
 *
 * Provides controls for customizing the Content Width Limiter-block and renders the block inside the editor.
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
  // Initialize state with the width from attributes
  const [width, setWidth] = useState(attributes.width);
  const [background, setBackground] = useState("transparent");
  const [active, setActive] = useState(false);
  const alignment = attributes.alignment;

  const onChangeResizerStart = (
    event: MouseEvent,
    direction: string,
    elementRef: HTMLElement
  ): void => {};

  const onChangeResizer = (
    event: MouseEvent,
    direction: string,
    elementRef: HTMLElement,
    delta: { height: number; width: number }
  ): void => {
    const newWidth = elementRef.offsetWidth;

    if (newWidth >= 300 && newWidth <= 1040) {
      setWidth(newWidth);
    }
    setActive(true);

    if (
      Math.round(newWidth * 0.125) >= 50 &&
      Math.round(newWidth * 0.125) <= 75
    ) {
      setBackground("#cfedd8");
    } else if (newWidth <= 300 || newWidth >= 1040) {
      setBackground("#E61607");
    } else {
      setBackground("#f2ded1");
    }
  };

  const onChangeResizerStop = (
    event: MouseEvent,
    direction: string,
    elementRef: HTMLElement,
    delta: { height: number; width: number }
  ): void => {
    const finalWidth = elementRef.offsetWidth;
    // Finalize the width when resizing stops
    if (finalWidth >= 300 && finalWidth <= 1040) {
      setWidth(finalWidth);
      setAttributes({ width: finalWidth });
    }
    setBackground("transparent");
    console.log("Resize stopped: final width is ", finalWidth);
    setActive(false);
  };

  let hint = "";
  if (Math.round(width * 0.125) >= 50 && Math.round(width * 0.125) <= 75) {
    hint = __(" (Ideale Leselänge)", "rrze-elements-blocks");
  } else if (width <= 300 || width >= 1040) {
    hint = __(" (Außerhalb des sichtbaren Bereichs)", "rrze-elements-blocks");
  } else {
    hint = "";
  }

  let showHandleLeft = false;
  let showHandleRight = false;
  if (alignment === "right") {
    showHandleLeft = true;
    showHandleRight = false;
  } else if (alignment === "center") {
    showHandleLeft = true;
    showHandleRight = true;
  } else {
    showHandleLeft = false;
    showHandleRight = true;
  }

  return (
    <div {...props} className={`${props.className}`}>
      <BlockControls>
        <AlignmentBar
          attributes={{ alignment }}
          setAttributes={setAttributes}
          showCenterAlign={true}
        />
      </BlockControls>
      {active &&
        __("Ca. ") +
          Math.round(width * 0.125) +
          __(" Zeichen", "rrze-elements-blocks") +
          hint}
      <ResizableBox
        className={`limit-width cwl-${alignment}`}
        enable={{
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          left: showHandleLeft,
          right: showHandleRight,
          top: false,
          topLeft: false,
          topRight: false,
        }}
        onResizeStop={onChangeResizerStop}
        // onResizeStart={ onChangeResizerStart }
        onResize={onChangeResizer}
        size={{
          height: "auto",
          width: width,
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: background,
            display: "flex",
            height: "100%",
            justifyContent: "left",
            width: Math.round(width * 0.125) + "ch",
          }}
        >
          <InnerBlocks
            template={[
              [
                "core/paragraph"
              ],
            ]}
          />
        </div>
      </ResizableBox>
    </div>
  );
}
