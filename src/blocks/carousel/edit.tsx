// Imports from WordPress libraries
import {
  InspectorControls, RichText,
  useBlockProps,
  useInnerBlocksProps
} from "@wordpress/block-editor";
import {PanelBody, RangeControl, Notice} from "@wordpress/components";
import {__, sprintf} from "@wordpress/i18n";
import {useMemo, useRef} from "@wordpress/element";
import {useSelect} from "@wordpress/data";
import {store as blockEditorStore} from "@wordpress/block-editor";

interface EditProps {
  attributes: {
    title: string;
    cardHeight: number;
  }
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
  clientId: string;
}

export default function Edit({attributes, setAttributes, clientId}: EditProps) {
  const props = useBlockProps();
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingId = useMemo(() => `${clientId}-heading`, [clientId]);
  const listId = useMemo(() => `${clientId}-content`, [clientId]);
  const parentId = useSelect(
    (select) => select(blockEditorStore).getBlockRootClientId(clientId),
    [clientId]
  );
  const isTopLevel = !parentId;

  const innerBlocksProps = useInnerBlocksProps(
    {
      className: "rrze-elements-blocks__carousel-content-list",
      "aria-labelledby": headingId,
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
            onChange={(val) => setAttributes({cardHeight: val})}
            min={350}
            max={680}
          />
        </PanelBody>
      </InspectorControls>

      <section {...props} style={style}>
        {!isTopLevel && (
          <Notice status="info" isDismissible={false}
                  className={"rrze-elements-blocks__carousel-container-violation"}>
            <>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Zm60-364 20-12q2 24 19 40t41 16q25 0 42.5-17.5T680-540q0-15-7-28.5T654-590l26-15-20-35-140 80 20 36Zm-120 0 20-36-140-80-20 35 26 15q-12 8-19 21.5t-7 28.5q0 25 17.5 42.5T340-480q24 0 41-16t19-40l20 12Zm60 84q-71 0-125 45.5T279-280h402q-22-69-76-114.5T480-440Zm0-40Z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                     fill="#000">
                  <path
                    d="m840-234-80-80v-446q0-17 11.5-28.5T800-800q17 0 28.5 11.5T840-760v526ZM360-714l-80-80v-6q0-17 11.5-28.5T320-840q17 0 28.5 11.5T360-800v86Zm160 160-80-80v-246q0-17 11.5-28.5T480-920q17 0 28.5 11.5T520-880v326Zm160 81h-80v-367q0-17 11.5-28.5T640-880q17 0 28.5 11.5T680-840v367Zm37 343L360-487v224L212-367l157 229q5 8 14 13t19 5h278q10 0 19.5-2.5T717-130ZM402-40q-30 0-56-13.5T303-92L48-465l24-23q19-19 45-22t47 12l116 81v-150L27-820l57-57L876-85l-57 57-44-44q-20 15-44 23.5T680-40H402Zm137-268Zm61-165Z"/>
                </svg>
              </div>
              <p className={"rrze-elements-blocks__carousel-container-violation-text"}>{__(
                'The Carousel block should be placed at the top level for full functionality. Nested usage may break styles and accessibility. The developer does not approve this Block Move.',
                'rrze-elements-blocks'
              )}</p>
            </>
          </Notice>
        )}
        <div className={"rrze-elements-blocks__carousel"}>
          <div className={"rrze-elements-blocks__carousel-section-header"}>
            <RichText placeholder={__('Add your Carousel Headline', 'rrze-elements-blocks')}
                      className={"rrze-elements-blocks__carousel-section-header-headline"} id={headingId}
                      onChange={(newTitle) => setAttributes({title: newTitle})} value={attributes.title}
                      tagName={"h2"}/>
          </div>
          <div id={listId} className={"rrze-elements-blocks__carousel-container"}>
            <div className={"rrze-elements-blocks__carousel-content"} ref={scrollRef}>
              <ul aria-labelledby={headingId} role={"list"}
                  className={"rrze-elements-blocks__carousel-content-list"} {...innerBlocksProps} >
              </ul>
            </div>
            <div className={"rrze-elements-blocks__carousel-navigation"}>
              <ul className={"rrze-elements-blocks__carousel-navigation-container"}>
                <li className={"rrze-elements-blocks__carousel_navigation-button-container"}>
                  <button
                    className={"rrze-elements-blocks_carousel_navigation_button"}
                    aria-label={sprintf(
                      /* translators: %s: carousel title */
                      __('Back in %s Carousel', 'rrze-elements-blocks'),
                      attributes.title
                    )}
                    type={"button"}
                    onClick={() => scroll('prev')}
                  >
                    <svg className={"rrze-elements-blocks__carousel_navigation_icon"} xmlns="http://www.w3.org/2000/svg"
                         height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                      <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                    </svg>
                  </button>
                </li>
                <li className={"rrze-elements-blocks__carousel_navigation-button-container"}>
                  <button
                    className={"rrze-elements-blocks_carousel_navigation_button"}
                    aria-label={sprintf(
                      /* translators: %s: carousel title */
                      __('Proceed in %s Carousel', 'rrze-elements-blocks'),
                      attributes.title
                    )}
                    type={"button"}
                    onClick={() => scroll('next')}
                  >
                    <svg className={"rrze-elements-blocks__carousel_navigation_icon"} xmlns="http://www.w3.org/2000/svg"
                         height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                      <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                    </svg>
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
