// Imports from WordPress libraries
import {
  useBlockProps,
  InnerBlocks,
  BlockControls,
  InspectorControls,
} from "@wordpress/block-editor";

import {
  ToolbarButton,
  ToolbarItem,
  PanelBody,
  RangeControl,
  Button,
  __experimentalNumberControl as NumberControl,
} from "@wordpress/components";

import { __ } from "@wordpress/i18n";
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
  const dynamicClass = `rrze-elements-column-${attributes.columns}`;

  const props = useBlockProps({
    className: dynamicClass,
  });

  const onChangeStagger = (stagger: number) => {
    setAttributes({ stagger });
  };

  const onChangeColumns = (columns: number) => {
    setAttributes({ columns });
  };

  const onChangeStartValue = (startValue: string) => {
    const output = parseInt(startValue, 10);
    setAttributes({ startValue: output });
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
          textContent: attributes.startValue || 0,
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
      <section className="rrze-elements-blocks-counter-row">
        <BlockControls>
          <ToolbarItem>
            {() => (
              <>
                <ToolbarButton
                  icon={play}
                  title={__("Preview Animation", "rrze-elements-blocks")}
                  onClick={onClickPlay}
                />
              </>
            )}
          </ToolbarItem>
        </BlockControls>
        <InspectorControls>
          <PanelBody title={__("Animation Settings", "rrze-elements-blocks")}>
            <RangeControl
              label={__(
                "Stagger between Animations (seconds)",
                "rrze-elements-blocks"
              )}
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
            <Button onClick={onClickPlay}>
              {__("Preview Animation", "rrze-elements-blocks")}
            </Button>
          </PanelBody>
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
            <NumberControl
              label={__("Start value", "rrze-elements-blocks")}
              value={attributes.startValue}
              onChange={onChangeStartValue}
              min={0}
              max={Number.MAX_VALUE}
            />
            <Button onClick={onClickPlay}>
              {__("Preview Animation", "rrze-elements-blocks")}
            </Button>
          </PanelBody>
        </InspectorControls>
        <InnerBlocks
          template={[
            ["rrze-elements/rrze-counter", { title: 920} ],
            ["rrze-elements/rrze-counter", { title: 1040}],
            ["rrze-elements/rrze-counter", { title: 1160}],
            ["rrze-elements/rrze-counter", { title: 1280}],
            ["rrze-elements/rrze-counter", { title: 1340}],
          ]}
          allowedBlocks={[
            "rrze-elements/rrze-counter",
            "rrze-elements/rrze-iconbox",
          ]}
        />
      </section>
    </div>
  );
}
