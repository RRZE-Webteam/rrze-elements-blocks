// Imports from WordPress libraries
import {
  RichText,
  useBlockProps,
  BlockControls,
  InnerBlocks,
  MediaReplaceFlow,
  InspectorControls,
} from "@wordpress/block-editor";
import {
  ToolbarGroup,
  ToolbarButton,
  DropdownMenu,
  PanelBody,
  ToggleControl,
  FocalPointPicker,
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { page, desktop, tablet, mobile } from "@wordpress/icons";
import { __ } from "@wordpress/i18n";
import { getImageBrightness } from "../../utility/color";

type DeviceType = 'desktop' | 'tablet' | 'mobile';

interface EditProps {
  attributes: {
    title: string;
    subtitle: string;
    desktopImageId: number;
    desktopImageUrl: string;
    tabletImageId: number;
    tabletImageUrl: string;
    mobileImageId: number;
    mobileImageUrl: string;
    desktopTextColor: string;
    tabletTextColor: string;
    mobileTextColor: string;
    desktopFocusPoint: { x: number; y: number };
    tabletFocusPoint: { x: number; y: number };
    mobileFocusPoint: { x: number; y: number };
  }
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
}

export default function Edit({attributes, setAttributes}: EditProps) {
  const blockProps = useBlockProps({
    className: "rrze-elements-blocks__carousel-content-list-item"
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  const desktopImageUrl = attributes.desktopImageUrl;
  const tabletImageUrl = attributes.tabletImageUrl || desktopImageUrl;
  const mobileImageUrl = attributes.mobileImageUrl || tabletImageUrl;

  const deviceIcons = {
    desktop: desktop,
    tablet: tablet,
    mobile: mobile,
  };

  const onImageSelect = (image: { id: number; url: string }, device: DeviceType) => {
    const newAttributes = {
      [`${device}ImageId`]: image.id,
      [`${device}ImageUrl`]: image.url,
    };
    setAttributes(newAttributes);

    getImageBrightness(image.url).then(brightness => {
      const newTextColor = brightness < 128 ? '#FFFFFF' : '#000000';
      setAttributes({ [`${device}TextColor`]: newTextColor });
    });
  };

  const style = {
    '--desktop-text-color': attributes.desktopTextColor,
    '--tablet-text-color': attributes.tabletTextColor || attributes.desktopTextColor,
    '--mobile-text-color': attributes.mobileTextColor || attributes.tabletTextColor || attributes.desktopTextColor,
    '--desktop-object-position': `${attributes.desktopFocusPoint.x * 100}% ${attributes.desktopFocusPoint.y * 100}%`,
    '--tablet-object-position': `${attributes.tabletFocusPoint.x * 100}% ${attributes.tabletFocusPoint.y * 100}%`,
    '--mobile-object-position': `${attributes.mobileFocusPoint.x * 100}% ${attributes.mobileFocusPoint.y * 100}%`,
  } as React.CSSProperties;

  return (
    <li {...blockProps} style={style}>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={page}
            label={__("Add / Edit Content", "rrze-elements-blocks")}
            onClick={() => setIsModalOpen(!isModalOpen)}
          />
        </ToolbarGroup>
        <ToolbarGroup>
            <DropdownMenu
                icon={deviceIcons[deviceType]}
                label={__("Select device type", "rrze-elements-blocks")}
                controls={[
                    {
                        title: __('Desktop', 'rrze-elements-blocks'),
                        icon: desktop,
                        onClick: () => setDeviceType('desktop'),
                    },
                    {
                        title: __('Tablet', 'rrze-elements-blocks'),
                        icon: tablet,
                        onClick: () => setDeviceType('tablet'),
                    },
                    {
                        title: __('Mobile', 'rrze-elements-blocks'),
                        icon: mobile,
                        onClick: () => setDeviceType('mobile'),
                    },
                ]}
            />
            {deviceType === 'desktop' && (
                <MediaReplaceFlow
                    mediaId={attributes.desktopImageId}
                    mediaURL={attributes.desktopImageUrl}
                    allowedTypes={['image']}
                    accept="image/*"
                    onSelect={(media) => onImageSelect(media, 'desktop')}
                    onError={(error: string) => console.error(error)}
                    name={__('Desktop Image', 'rrze-elements-blocks')}
                />
            )}
            {deviceType === 'tablet' && (
                <MediaReplaceFlow
                    mediaId={attributes.tabletImageId}
                    mediaURL={attributes.tabletImageUrl}
                    allowedTypes={['image']}
                    accept="image/*"
                    onSelect={(media) => onImageSelect(media, 'tablet')}
                    onError={(error: string) => console.error(error)}
                    name={__('Tablet Image', 'rrze-elements-blocks')}
                />
            )}
            {deviceType === 'mobile' && (
                <MediaReplaceFlow
                    mediaId={attributes.mobileImageId}
                    mediaURL={attributes.mobileImageUrl}
                    allowedTypes={['image']}
                    accept="image/*"
                    onSelect={(media) => onImageSelect(media, 'mobile')}
                    onError={(error: string) => console.error(error)}
                    name={__('Mobile Image', 'rrze-elements-blocks')}
                />
            )}
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls>
        <PanelBody title={__("Image Settings", "rrze-elements-blocks")}>
            <ToggleControl
                label={__("Desktop", "rrze-elements-blocks")}
                checked={deviceType === 'desktop'}
                onChange={() => setDeviceType('desktop')}
            />
            <ToggleControl
                label={__("Tablet", "rrze-elements-blocks")}
                checked={deviceType === 'tablet'}
                onChange={() => setDeviceType('tablet')}
            />
            <ToggleControl
                label={__("Mobile", "rrze-elements-blocks")}
                checked={deviceType === 'mobile'}
                onChange={() => setDeviceType('mobile')}
            />
        </PanelBody>
        <PanelBody title={__("Focus Point", "rrze-elements-blocks")}>
            {deviceType === 'desktop' && (
                <FocalPointPicker
                    url={attributes.desktopImageUrl}
                    value={attributes.desktopFocusPoint}
                    onChange={(newFocusPoint) => setAttributes({ desktopFocusPoint: newFocusPoint })}
                />
            )}
            {deviceType === 'tablet' && (
                <FocalPointPicker
                    url={attributes.tabletImageUrl}
                    value={attributes.tabletFocusPoint}
                    onChange={(newFocusPoint) => setAttributes({ tabletFocusPoint: newFocusPoint })}
                />
            )}
            {deviceType === 'mobile' && (
                <FocalPointPicker
                    url={attributes.mobileImageUrl}
                    value={attributes.mobileFocusPoint}
                    onChange={(newFocusPoint) => setAttributes({ mobileFocusPoint: newFocusPoint })}
                />
            )}
        </PanelBody>
      </InspectorControls>

      {isModalOpen && (
        <div className={"rrze-elements-blocks-info-card-editor"} style={{padding: '16px'}}>
          <InnerBlocks
            template={[
              [
                "core/paragraph",
                {placeholder: __("Add a description…", "rrze-elements-blocks")},
              ],
            ]}
            allowedBlocks={["core/paragraph", "core/heading", "core/list", "core/buttons", "core/button", "rrze-faudir/block"]}
            templateLock={false}
          />
        </div>
      )}

      {!isModalOpen && (
        <div className={"rrze-elements-blocks__carousel_feature-card-box"}>
          <div className={"rrze-elements-blocks__carousel_feature_card-content"}
               style={{position: 'relative', height: '680px', width: '320px'}}>
            <RichText className={"rrze-elements-blocks__carousel_feature_card_subtitle"} tagName={"h3"}
                      allowedFormats={[]} placeholder={__("Dein Thema", "rrze-elements-blocks")}
                      onChange={(newTitle) => setAttributes({subtitle: newTitle})} value={attributes.subtitle} />
            <RichText className={"rrze-elements-blocks__carousel_feature_card_text"} tagName={"p"} allowedFormats={[]}
                      placeholder={__("Hier steht dein Titel", "rrze-elements-blocks")}
                      onChange={(newTitle) => setAttributes({title: newTitle})} value={attributes.title} />
            <div className={"rrze-elements-blocks__carousel_feature_card_bg"}>
              <figure className={"rrze-elements-blocks__carousel_feature_card_bg_figure"}>
                <picture className={"rrze-elements-blocks__carousel_feature_card_bg_figure_picture"}>
                  <source
                    srcSet={mobileImageUrl}
                    media={"(max-width: 734px)"}/>
                  <source
                    srcSet={tabletImageUrl}
                    media={"(max-width: 1024px)"}/>
                  <img src={desktopImageUrl} alt={"Alternativtext hier"}/>
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
      )}
    </li>
  )
    ;
}
