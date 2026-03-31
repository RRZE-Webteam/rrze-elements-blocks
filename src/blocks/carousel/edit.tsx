// Imports from WordPress libraries
import {
  InspectorControls,
  useBlockProps,
  useInnerBlocksProps
} from "@wordpress/block-editor";
import { PanelBody, RangeControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useRef } from "@wordpress/element";

interface EditProps {
  attributes: {
    title: string;
    cardHeight: number;
  }
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

export default function Edit({ attributes, setAttributes }: EditProps) {
  const props = useBlockProps();
  const scrollRef = useRef<HTMLDivElement>(null);

  const innerBlocksProps = useInnerBlocksProps(
    {
      className: "rrze-elements-blocks__carousel-content-list",
      "aria-labelledby": "uniqueIDforTheSection-header",
      role: "list"
    },
    {
      allowedBlocks: ["rrze-elements/info-card"],
      orientation: "horizontal",
      template: [
        ["rrze-elements/info-card", {}],
        ["rrze-elements/info-card", {}],
      ]
    }
  );

  const scroll = (direction: 'prev' | 'next') => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const firstItem = container.querySelector('li');
      const itemWidth = firstItem ? firstItem.offsetWidth + 20 : 392;
      const targetScroll = container.scrollLeft + (direction === 'next' ? itemWidth : -itemWidth);

      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const style = {
    '--rrze-carousel-height': `${attributes.cardHeight}px`,
  } as any;

  return (
    <>
      <InspectorControls>
        <PanelBody title={__("Carousel Settings", "rrze-elements-blocks")}>
          <RangeControl
            label={__("Card Height (px)", "rrze-elements-blocks")}
            value={attributes.cardHeight}
            onChange={(val) => setAttributes({ cardHeight: val })}
            min={350}
            max={680}
          />
        </PanelBody>
      </InspectorControls>

      <section {...props} style={style}>
        <div className={"rrze-elements-blocks__carousel"}>
          <div className={"rrze-elements-blocks__carousel-section-header"}>
            <h2 className={"rrze-elements-blocks__carousel-section-header-headline"} id={"uniqueIDforTheSection-header"}>Lerne die FAU kennen.</h2>
          </div>
          <div id={"anotherUniqueIDForThisContentSection"} className={"rrze-elements-blocks__carousel-container"}>
            <div className={"rrze-elements-blocks__carousel-content"} ref={scrollRef}>
              <ul aria-labelledby={"uniqueIDforTheSection-header"} role={"list"} className={"rrze-elements-blocks__carousel-content-list"} {...innerBlocksProps} >
              </ul>
            </div>
            <div className={"rrze-elements-blocks__carousel-navigation"}>
              <ul className={"rrze-elements-blocks__carousel-navigation-container"}>
                <li className={"rrze-elements-blocks__carousel_navigation-button-container"}>
                  <button
                    className={"rrze-elements-blocks_carousel_navigation_button"}
                    aria-label={"Zurück im H3-Überschrift Karusell"}
                    type={"button"}
                    onClick={() => scroll('prev')}
                  >
                    <svg className={"rrze-elements-blocks__carousel_navigation_icon"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
                  </button>
                </li>
                <li className={"rrze-elements-blocks__carousel_navigation-button-container"}>
                  <button
                    className={"rrze-elements-blocks_carousel_navigation_button"}
                    aria-label={"Weiter im H3-Überschrift Karusell"}
                    type={"button"}
                    onClick={() => scroll('next')}
                  >
                    <svg className={"rrze-elements-blocks__carousel_navigation_icon"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
