// Imports from WordPress libraries
import {
  BlockControls,
  useBlockProps,
} from "@wordpress/block-editor";

// interface EditProps {
//   blockProps: string[];
// }

export default function Edit() {
  const blockProps = useBlockProps({
    className: "rrze-elements-blocks__carousel-content-list-item"
  });

  return (
      <li {...blockProps}>
        <div className={"rrze-elements-blocks__carousel_feature-card-box"}>
          <div className={"rrze-elements-blocks__carousel_feature_card-content"}
               style={{position: 'relative', height: '680px', width: '320px'}}>
            <h3 className={"rrze-elements-blocks__carousel_feature_card_subtitle"}>
              Forschung & Lehre
            </h3>
            <p className={"rrze-elements-blocks__carousel_feature_card_text"}>Ein Studium für alle Fälle.</p>
            <div className={"rrze-elements-blocks__carousel_feature_card_bg"}>
              <figure className={"rrze-elements-blocks__carousel_feature_card_bg_figure"}>
                <picture className={"rrze-elements-blocks__carousel_feature_card_bg_figure_picture"}>
                  <source
                    srcSet={"https://plus.unsplash.com/premium_photo-1755883199872-2d31c8b8b012?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    width={"1920"} height={"1080"} media={"(max-width: 734px)"}/>
                  <source
                    srcSet={"https://plus.unsplash.com/premium_photo-1757682619735-ba211caa04f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    width={"1920"} height={"1080"}/>
                  <img alt={"Alternativtext hier"}/>
                </picture>
              </figure>
            </div>
            <a className={"rrze-elements-blocks__carousel_feature_card_link"} href={"#"}
               aria-label={"Weitere Informationen zum Thema XYZ"} role={"button"}>
              <div className={"rrze-elements-blocks__carousel_feature_card_link_control_container"}>
                        <span className={"rrze-elements-blocks__carousel_feature_card_link_control_icon-container"}
                              style={{position: 'absolute'}}>
                          <svg className={"rrze-elements-blocks__carousel_feature_card_link_control_icon"}
                               xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                               fill="#5f6368"><path
                            d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z"/></svg>
                        </span>
              </div>
            </a>
          </div>
        </div>
      </li>
  );
}
