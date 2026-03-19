// Imports from WordPress libraries
import {
  RichText,
  useBlockProps,
  BlockControls,
  useInnerBlocksProps, InnerBlocks,
} from "@wordpress/block-editor";
import {
  ToolbarGroup,
  ToolbarButton,
  Modal,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { postContent } from "@wordpress/icons";
import { __ } from "@wordpress/i18n";

interface EditProps {
  attributes: {
    title: string;
    subtitle: string;
  }
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

export default function Edit({attributes, setAttributes}: EditProps){
  const blockProps = useBlockProps({
    className: "rrze-elements-blocks__carousel-content-list-item"
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const innerBlocksProps = useInnerBlocksProps(
    { className: 'rrze-elements-blocks__info-card-inner-content' },
    {
      allowedBlocks: ['core/paragraph', 'core/heading', 'core/list', 'core/button'],
      template: [
        ['core/paragraph', { placeholder: 'Add your content here...' }],
      ],
    }
  );

  return (
    <li {...blockProps}>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={postContent}
            label={__("Add / Edit Content", "rrze-elements-blocks")}
            onClick={() => setIsModalOpen(true)}
          />
        </ToolbarGroup>
      </BlockControls>

      {isModalOpen && (
          <div className={"rrze-elements-blocks-info-card-editor"} style={{ padding: '16px' }}>
            <InnerBlocks
              template={[
                [
                  "core/paragraph",
                  { placeholder: __("Add a description…", "rrze-elements-blocks") },
                ],
              ]}
              allowedBlocks={["core/paragraph", "core/heading", "core/list", "core/buttons", "core/button", "rrze-faudir/block"]}
              templateLock={false}
            />
          </div>
      )}

      <div className={"rrze-elements-blocks__carousel_feature-card-box"}>
        <div className={"rrze-elements-blocks__carousel_feature_card-content"}
             style={{position: 'relative', height: '680px', width: '320px'}}>
          <RichText className={"rrze-elements-blocks__carousel_feature_card_subtitle"} tagName={"h3"} allowedFormats={[]} placeholder={__("Dein Thema", "rrze-elements-blocks")} onChange={(newTitle) => setAttributes({subtitle: newTitle})} value={attributes.subtitle} />
          <RichText className={"rrze-elements-blocks__carousel_feature_card_text"} tagName={"p"} allowedFormats={[]} placeholder={__("Hier steht dein Titel", "rrze-elements-blocks")} onChange={(newTitle) => setAttributes({title: newTitle})} value={attributes.title} />
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
          <div className={"rrze-elements-blocks__carousel_feature_card_link"}
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
          </div>
        </div>
      </div>
    </li>
  );
}
