// Imports from WordPress libraries
import {
  InnerBlocks,
  useBlockProps,
  useInnerBlocksProps
} from "@wordpress/block-editor";

// interface EditProps {
//   blockProps: string[];
// }

export default function Edit() {
  const props = useBlockProps();
  const innerBlocksProps = useInnerBlocksProps(
    {
      className: "rrze-elements-blocks__carousel-content-list",
      "aria-labelledby": "uniqueIDforTheSection-header",
      role: "list"
    },
    {
      allowedBlocks: ["rrze-elements/info-card"],
      template: [
        ["rrze-elements/info-card", {}],
        ["rrze-elements/info-card", {}],
      ]
    }
  );

  return (
    <section {...props}>
      <div className={"rrze-elements-blocks__carousel"}>
        <div className={"rrze-elements-blocks__carousel-section-header"}>
          <h2 className={"rrze-elements-blocks__carousel-section-header-headline"} id={"uniqueIDforTheSection-header"}>Lerne die FAU kennen.</h2>
        </div>
        <div id={"anotherUniqueIDForThisContentSection"} className={"rrze-elements-blocks__carousel-container"}>
          <div className={"rrze-elements-blocks__carousel-content"}>
            <ul aria-labelledby={"uniqueIDforTheSection-header"} role={"list"} className={"rrze-elements-blocks__carousel-content-list"} {...innerBlocksProps} >
              {/*<ul aria-labelledby={"uniqueIDforTheSection-header"} role={"list"} className={"rrze-elements-blocks__carousel-content-list"}><InnerBlocks
                allowedBlocks={["rrze-elements/info-card"]}
                template={[
                  ["rrze-elements/info-card", {}],
                  ["rrze-elements/info-card", {}],
                ]}
              />*/}
            </ul>
          </div>
          <div className={"rrze-elements-blocks__carousel-navigation"}>
            <ul className={"rrze-elements-blocks__carousel-navigation-container"}>
              <li className={"rrze-elements-blocks__carousel_navigation-button-container"}>
                <button className={"rrze-elements-blocks_carousel_navigation_button"} aria-label={"Zurück im H3-Überschrift Karusell"} type={"button"}>
                  <svg className={"rrze-elements-blocks__carousel_navigation_icon"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z"/></svg>
                </button>
              </li>
              <li className={"rrze-elements-blocks__carousel_navigation-button-container"}>
                <button className={"rrze-elements-blocks_carousel_navigation_button"} aria-label={"Weiter im H3-Überschrift Karusell"} type={"button"}>
                  <svg className={"rrze-elements-blocks__carousel_navigation_icon"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z"/></svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </section>
  );
}
