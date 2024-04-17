// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
  InspectorControls,
} from "@wordpress/block-editor";

import {
  ToolbarButton,
  ToolbarGroup,
  ToolbarItem,
  PanelBody,
  RangeControl,
  Button
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";
import { useState, useEffect } from "@wordpress/element";
import { update as play } from "@wordpress/icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Interface representing the properties for the Edit component.
 *
 * @interface EditProps
 * @property {Object} attributes - The block attributes.
 */
interface EditProps {
  blockProps: string[];
  isSelected: boolean;
  attributes: {
    stagger: number;
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
  isSelected,
  attributes,
  setAttributes,
}: EditProps) {
  gsap.registerPlugin(ScrollTrigger);
  const props = useBlockProps();

  const onChangeStagger = (stagger: number) => {
    setAttributes({ stagger });
  };

  const onClickPlay = () => {
    if (isSelected) {
      function numberWithDots(x: any) {
        if (x == null) {
          return "0";
        }

        let cleanInput = x.toString().replace(/\./g, ""); // Remove any dots in the string
        const number = parseInt(cleanInput, 10);
        if (isNaN(number)) {
          console.log("Conversion to number failed");
          return "Invalid number";
        }

        const numberAsString = number.toString();
        return numberAsString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      }
      // Select an element with id
      const container = document.querySelector(`#${props.id}`);

      if (container) {
        // Select all items with class
        const items = container.querySelectorAll(".fau-counter-data");

        gsap.from(items, {
          textContent: 0,
          duration: 2,
          ease: "power3.inOut",
          stagger: attributes.stagger || 0,
          snap: { textContent: 1 },
        });
      }
    }
  };

  return (
    <div {...props}>
      <section className="fauCustomResearchHighlights">
        <BlockControls controls>
          <ToolbarItem>
          {() => (
            <>
            <ToolbarButton
              icon={play}
              title={__("Preview Animation", "rrze-elements-b")}
              onClick={onClickPlay}
              placeholder={undefined}
            />
            </>
          )}
          </ToolbarItem>
        </BlockControls>
        <InspectorControls>
          <PanelBody title={__("Animation Settings")}>
            <RangeControl
              label="Stagger between Animations (seconds)"
              marks
              max={0.5}
              min={0}
              value={attributes.stagger}
              onBlur={function noRefCheck() {}}
              onChange={onChangeStagger}
              onFocus={function noRefCheck() {}}
              onMouseLeave={function noRefCheck() {}}
              onMouseMove={function noRefCheck() {}}
              step={0.05}
            />
            <Button onClick={onClickPlay}>Preview Animation</Button>
          </PanelBody>
        </InspectorControls>
        <InnerBlocks allowedBlocks={["rrze-elements/rrze-counter"]} />
      </section>
    </div>
  );
}
