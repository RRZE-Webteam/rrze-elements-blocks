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

import { useRef } from "@wordpress/element";

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
  isSelected,
  attributes,
  setAttributes,
}: EditProps) {
  gsap.registerPlugin(ScrollTrigger);
  const dynamicClass = `rrze-elements-column-${attributes.columns}`;

  const containerRef = useRef<HTMLDivElement>(null);

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
    if (isSelected && containerRef.current) {
      const items = containerRef.current.querySelectorAll(".fau-counter-data");

      gsap.from(items, {
        textContent: attributes.startValue || 0,
        duration: 2,
        ease: "power3.inOut",
        stagger: attributes.stagger || 0,
        snap: { textContent: 1 },
      });
    }
  };

  return (
    <div {...props}>
      <section className="rrze-elements-blocks-counter-row" ref={containerRef}>
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
