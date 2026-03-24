// Imports from WordPress libraries
import {
  RichText,
  useBlockProps,
  BlockControls,
  InnerBlocks,
  MediaReplaceFlow,
  InspectorControls,
  LinkControl,
} from "@wordpress/block-editor";
import {
  ToolbarGroup,
  ToolbarButton,
  DropdownMenu,
  Button,
  PanelBody,
  FocalPointPicker,
  TextControl,
  Popover,
  RangeControl,
  ColorPalette,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import {useState, useRef, useEffect} from "@wordpress/element";
import {page, desktop, tablet, mobile, link} from "@wordpress/icons";
import {__} from "@wordpress/i18n";
import {getImageBrightness} from "../../utility/color";
import {useDispatch, useSelect} from "@wordpress/data";
import {store as blockEditorStore} from "@wordpress/block-editor";
import {CharacterCountProgressBar} from "../../components/ProgressBar";
import {CSSProperties} from "react";

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
    desktopCustomTextColor: string;
    tabletCustomTextColor: string;
    mobileCustomTextColor: string;
    desktopFocusPoint: { x: number; y: number };
    tabletFocusPoint: { x: number; y: number };
    mobileFocusPoint: { x: number; y: number };
    alt: string;
    url: string;
  }
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
  clientId: string;
  isSelected: boolean;
}

interface CustomStyles extends CSSProperties {
  '--desktop-text-color'?: string;
  '--tablet-text-color'?: string;
  '--mobile-text-color'?: string;
  '--desktop-object-position'?: string;
  '--tablet-object-position'?: string;
  '--mobile-object-position'?: string;
}

export default function Edit({attributes, setAttributes, isSelected, clientId}: EditProps) {
  const ref = useRef<HTMLLIElement>(null);

  let imageStatus = 'image';
  if (attributes.desktopImageId === 0) {
    imageStatus = 'no-image';
  }

  const blockProps = useBlockProps({
    className: `rrze-elements-blocks__carousel-content-list-item ${imageStatus}`,
    ref: ref
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  const {__experimentalSetPreviewDeviceType: setPreviewDeviceType} = useDispatch('core/edit-post');
  const {updateBlockAttributes} = useDispatch(blockEditorStore);

  const {parentId, parentAttributes} = useSelect((select) => {
    const {getBlockParents, getBlockAttributes} = select(blockEditorStore);
    const parents = getBlockParents(clientId);
    const parentId = parents.length > 0 ? parents[parents.length - 1] : null;
    return {
      parentId,
      parentAttributes: parentId ? getBlockAttributes(parentId) : null,
    };
  }, [clientId]);

  const cardHeight = parentAttributes?.cardHeight !== undefined ? parentAttributes.cardHeight : 680;

  const setCardHeight = (val: number) => {
    if (parentId) {
      updateBlockAttributes(parentId, {cardHeight: val});
    }
  };

  const desktopImageUrl = attributes.desktopImageUrl;
  const tabletImageUrl = attributes.tabletImageUrl || desktopImageUrl;
  const mobileImageUrl = attributes.mobileImageUrl || tabletImageUrl;

  const isLinkCard = !!attributes.url;
  // does it have inner Content
  const isInfoCard = blockProps;

  const deviceIcons = {
    desktop: desktop,
    tablet: tablet,
    mobile: mobile,
  };

  const colorPaletteColors = [
    {name: __('Black', 'rrze-elements-blocks'), color: '#000000'},
    {name: __('White', 'rrze-elements-blocks'), color: '#FFFFFF'},
  ];

  useEffect(() => {
    if (isSelected && ref.current) {
      // Use a slight delay to allow the editor's UI to settle before scrolling
      setTimeout(() => {
        ref.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }, 50);
    }
  }, [isSelected]);

  const onImageSelect = (image: { id: number; url: string }, device: DeviceType) => {
    const newAttributes = {
      [`${device}ImageId`]: image.id,
      [`${device}ImageUrl`]: image.url,
    };
    setAttributes(newAttributes);

    getImageBrightness(image.url).then(brightness => {
      const newTextColor = brightness < 128 ? '#FFFFFF' : '#000000';
      setAttributes({[`${device}TextColor`]: newTextColor});
    });
  };

  const handleDeviceTypeChange = (newDeviceType: DeviceType) => {
    setDeviceType(newDeviceType);
    const deviceName = newDeviceType.charAt(0).toUpperCase() + newDeviceType.slice(1);
    setPreviewDeviceType(deviceName);
  };

  const desktopFinalColor = attributes.desktopCustomTextColor || attributes.desktopTextColor;
  const tabletFinalColor = attributes.tabletCustomTextColor || attributes.tabletTextColor || desktopFinalColor;
  const mobileFinalColor = attributes.mobileCustomTextColor || attributes.mobileTextColor || tabletFinalColor;

  const style: CustomStyles = {
    '--desktop-text-color': desktopFinalColor,
    '--tablet-text-color': tabletFinalColor,
    '--mobile-text-color': mobileFinalColor,
    '--desktop-object-position': `${attributes.desktopFocusPoint.x * 100}% ${attributes.desktopFocusPoint.y * 100}%`,
    '--tablet-object-position': `${attributes.tabletFocusPoint.x * 100}% ${attributes.tabletFocusPoint.y * 100}%`,
    '--mobile-object-position': `${attributes.mobileFocusPoint.x * 100}% ${attributes.mobileFocusPoint.y * 100}%`,
  };

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
          <ToolbarButton
            icon={link}
            label={__("Link", "rrze-elements-blocks")}
            onClick={() => setIsLinkPickerVisible(true)}
          />
          {isLinkPickerVisible && (
            <Popover
              onClose={() => setIsLinkPickerVisible(false)}
              headerTitle={__("Add Link", "rrze-elements-blocks")}
            >
              <LinkControl
                value={{url: attributes.url}}
                onChange={(newLink) => setAttributes({url: newLink.url})}
              />
            </Popover>
          )}
        </ToolbarGroup>
        <ToolbarGroup>
          <DropdownMenu
            icon={deviceIcons[deviceType]}
            label={__("Select device type", "rrze-elements-blocks")}
            controls={[
              {
                title: __('Desktop', 'rrze-elements-blocks'),
                icon: desktop,
                onClick: () => handleDeviceTypeChange('desktop'),
              },
              {
                title: __('Tablet', 'rrze-elements-blocks'),
                icon: tablet,
                onClick: () => handleDeviceTypeChange('tablet'),
              },
              {
                title: __('Mobile', 'rrze-elements-blocks'),
                icon: mobile,
                onClick: () => handleDeviceTypeChange('mobile'),
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
              name={__('Add Desktop Image', 'rrze-elements-blocks')}
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
        {parentId && (
          <PanelBody title={__("Carousel Settings", "rrze-elements-blocks")}>
            <RangeControl
              label={__("Card Height (px)", "rrze-elements-blocks")}
              value={cardHeight}
              onChange={setCardHeight}
              min={350}
              max={680}
            />
          </PanelBody>
        )}
        <PanelBody title={__("Image Settings", "rrze-elements-blocks")}>
          <ToggleGroupControl
            __next40pxDefaultSize
            isBlock
            label="Choose Viewport"
            value={deviceType}
            onChange={(device: DeviceType) => {
              handleDeviceTypeChange(device)
            }}
          >
            <ToggleGroupControlOption
              label={__("Desktop", "rrze-elements-blocks")}
              value="desktop"
            />
            <ToggleGroupControlOption
              label={__("Tablet", "rrze-elements-blocks")}
              value="tablet"
            />
            <ToggleGroupControlOption
              label={__("Mobile", "rrze-elements-blocks")}
              value="mobile"
            />
          </ToggleGroupControl>
          {deviceType === 'desktop' && (
            <MediaReplaceFlow
              mediaId={attributes.desktopImageId}
              mediaURL={attributes.desktopImageUrl}
              allowedTypes={['image']}
              accept="image/*"
              onSelect={(media) => onImageSelect(media, 'desktop')}
              onError={(error: string) => console.error(error)}
              name={__('Add Desktop Image', 'rrze-elements-blocks')}
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
              name={__('Add Tablet Image', 'rrze-elements-blocks')}
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
              name={__('Add Mobile Image', 'rrze-elements-blocks')}
            />
          )}
          {(deviceType === 'desktop' && !!attributes.desktopImageId) && (
            <FocalPointPicker
              url={attributes.desktopImageUrl}
              value={attributes.desktopFocusPoint}
              onChange={(newFocusPoint) => setAttributes({desktopFocusPoint: newFocusPoint})}
            />
          )}
          {(deviceType === 'tablet' && !!attributes.tabletImageId) && (
            <FocalPointPicker
              url={attributes.tabletImageUrl}
              value={attributes.tabletFocusPoint}
              onChange={(newFocusPoint) => setAttributes({tabletFocusPoint: newFocusPoint})}
            />
          )}
          {(deviceType === 'mobile' && !!attributes.mobileImageId) && (
            <FocalPointPicker
              url={attributes.mobileImageUrl}
              value={attributes.mobileFocusPoint}
              onChange={(newFocusPoint) => setAttributes({mobileFocusPoint: newFocusPoint})}
            />
          )}
          {(!!attributes.mobileImageId || !!attributes.tabletImageId || !!attributes.desktopImageId) && (
            <TextControl
              label={__("Alt Text", "rrze-elements-blocks")}
              value={attributes.alt}
              onChange={(alt) => setAttributes({alt})}
            />
          )}
        </PanelBody>
        <PanelBody title={__("Text Color", "rrze-elements-blocks")}>
          {deviceType === 'desktop' && (
            <ColorPalette
              colors={colorPaletteColors}
              value={attributes.desktopCustomTextColor}
              onChange={(color) => setAttributes({desktopCustomTextColor: color})}
              clearable={true}
            />
          )}
          {deviceType === 'tablet' && (
            <ColorPalette
              colors={colorPaletteColors}
              value={attributes.tabletCustomTextColor}
              onChange={(color) => setAttributes({tabletCustomTextColor: color})}
              clearable={true}
            />
          )}
          {deviceType === 'mobile' && (
            <ColorPalette
              colors={colorPaletteColors}
              value={attributes.mobileCustomTextColor}
              onChange={(color) => setAttributes({mobileCustomTextColor: color})}
              clearable={true}
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
               style={{position: 'relative', height: `${cardHeight}px`, width: '320px'}}>
            <RichText className={"rrze-elements-blocks__carousel_feature_card_subtitle"} tagName={"h3"}
                      allowedFormats={[]} placeholder={__("Your Topic", "rrze-elements-blocks")}
                      onChange={(newTitle) => setAttributes({subtitle: newTitle})} value={attributes.subtitle}/>
            {isSelected && (
              <CharacterCountProgressBar value={attributes.subtitle?.length || 0} maxValue={40}/>
            )}
            <RichText className={"rrze-elements-blocks__carousel_feature_card_text"} tagName={"p"} allowedFormats={[]}
                      placeholder={__("Your Headline", "rrze-elements-blocks")}
                      onChange={(newTitle) => setAttributes({title: newTitle})} value={attributes.title}/>
            {isSelected && (
              <CharacterCountProgressBar value={attributes.title?.length || 0} maxValue={60}/>
            )}
            <div className={"rrze-elements-blocks__carousel_feature_card_bg"}>
              <figure className={"rrze-elements-blocks__carousel_feature_card_bg_figure"}>
                <picture className={"rrze-elements-blocks__carousel_feature_card_bg_figure_picture"}>
                  <source
                    srcSet={mobileImageUrl}
                    media={"(max-width: 734px)"}/>
                  <source
                    srcSet={tabletImageUrl}
                    media={"(max-width: 1024px)"}/>
                  <img src={desktopImageUrl} alt={attributes.alt}/>
                </picture>
              </figure>
            </div>
            {/*Todo: hier */}
            <div className={"rrze-elements-blocks__carousel_feature_card_link"}
                 aria-label={"Weitere Informationen zum Thema XYZ"} role={"button"}>
              <div className={"rrze-elements-blocks__carousel_feature_card_link_control_container"}>
            <span className={"rrze-elements-blocks__carousel_feature_card_link_control_icon-container"}
                  style={{position: 'absolute'}}>
              {!isLinkCard ? (
                <svg className={"rrze-elements-blocks__carousel_feature_card_link_control_icon"}
                     xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                     fill="#5f6368">
                  <path
                    d="M440-120v-320H120v-80h320v-320h80v320h320v80H520v320h-80Z"/>
                </svg>
              ) : (
                <svg className={"rrze-elements-blocks__carousel_feature_card_link_control_icon"}
                     xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                     fill="#5f6368">
                  <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                </svg>
              )}
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
