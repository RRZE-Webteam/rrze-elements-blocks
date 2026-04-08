// Imports from WordPress libraries
import {
  InspectorControls, RichText,
  useBlockProps,
  useInnerBlocksProps,
  BlockControls,
  HeadingLevelDropdown
} from "@wordpress/block-editor";
import {PanelBody, RangeControl, Notice} from "@wordpress/components";
import {__, sprintf} from "@wordpress/i18n";
import {useMemo, useRef, useEffect} from "@wordpress/element";
import {useSelect} from "@wordpress/data";
import {store as blockEditorStore} from "@wordpress/block-editor";

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

interface CarouselAttributes {
  title: string;
  cardHeight: number;
  isNestedWarning?: boolean;
  headingLevel?: HeadingLevel;
}

interface EditProps {
  attributes: CarouselAttributes;
  setAttributes: (attributes: Partial<CarouselAttributes>) => void;
  clientId: string;
}

export default function Edit({attributes, setAttributes, clientId}: EditProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const headingId = useMemo(() => `${clientId}-heading`, [clientId]);
  const listId = useMemo(() => `${clientId}-content`, [clientId]);
  const headingLevel: HeadingLevel = attributes.headingLevel || 2;
  const {parentId, parentBlock} = useSelect(
    (select) => {
      const rootId = select(blockEditorStore).getBlockRootClientId(clientId);
      return {
        parentId: rootId,
        parentBlock: rootId ? select(blockEditorStore).getBlock(rootId) : null,
      };
    },
    [clientId]
  );
  const parentIsDarkGroup = parentBlock?.name === 'core/group'
    && typeof parentBlock?.attributes?.className === 'string'
    && parentBlock.attributes.className.includes('is-style-dark');
  const isTopLevel = !parentId || parentIsDarkGroup;
  const style = {
    '--rrze-carousel-height': `${attributes.cardHeight}px`,
  } as any;
  useEffect(() => {
    const warningActive = !isTopLevel;
    if (attributes.isNestedWarning !== warningActive) {
      setAttributes({isNestedWarning: warningActive});
    }
  }, [isTopLevel, attributes.isNestedWarning, setAttributes]);
  const sectionProps = useBlockProps({
    style,
    className: !isTopLevel ? 'rrze-elements-blocks__carousel-prison' : undefined,
  });

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
      <BlockControls group="block">
          <HeadingLevelDropdown
            value={headingLevel}
            onChange={(newLevel: HeadingLevel) => setAttributes({headingLevel: newLevel})}
            options={[2, 3, 4, 5, 6]}
          />
      </BlockControls>

      <section {...sectionProps}>
        {!isTopLevel && (
          <Notice status="warning" isDismissible={false}
                  className={"rrze-elements-blocks__carousel-container-violation"}>
            <>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M320-160q-117 0-198.5-81.5T40-440q0-107 70.5-186.5T287-718l-63-66 56-56 160 160-160 160-56-57 59-59q-71 14-117 69t-46 127q0 83 58.5 141.5T320-240h120v80H320Zm200-360v-280h360v280H520Zm0 360v-280h360v280H520Zm80-80h200v-120H600v120Z"/></svg>
              </div>
              <p className={"rrze-elements-blocks__carousel-container-violation-text"}>{__(
                'The Carousel block has to live at the top level of the page layout (not inside other blocks). Please move it out of its current container to make it visible inside the Frontend.',
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
                      tagName={`h${headingLevel}`}
                      allowedFormats={[]}
            />
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
