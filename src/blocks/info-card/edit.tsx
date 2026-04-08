import {
  RichText,
  useBlockProps,
  BlockControls,
  InnerBlocks,
  MediaReplaceFlow,
  LinkControl,
  InspectorControls
} from "@wordpress/block-editor";
import {
  ToolbarGroup,
  ToolbarButton,
  DropdownMenu,
  Popover,
} from "@wordpress/components";
import {useState, useRef, useEffect} from "@wordpress/element";
import {page, desktop, tablet, mobile, link} from "@wordpress/icons";
import {__} from "@wordpress/i18n";
import {getImageBrightness} from "../../utility/color";
import {useDispatch, useSelect} from "@wordpress/data";
import {store as blockEditorStore} from "@wordpress/block-editor";
import {CharacterCountProgressBar} from "../../components/ProgressBar";
import { DeviceType, InfoCardAttributes, InfoCardCustomStyles } from "./types";
import CarouselSettingsPanel from "./inspectorControls/CarouselSettingsPanel";
import ImageSettingsPanel from "./inspectorControls/ImageSettingsPanel";
import TextColorPanel from "./inspectorControls/TextColorPanel";
import BackgroundColorPanel from "./inspectorControls/BackgroundColorPanel";
import LayoutPanel from "./inspectorControls/LayoutPanel";
import EffectsPanel from "./inspectorControls/EffectsPanel";

interface EditProps {
  attributes: InfoCardAttributes;
  setAttributes: (attributes: Partial<InfoCardAttributes>) => void;
  clientId: string;
  isSelected: boolean;
}

const DEFAULT_OVERLAY_GRADIENT = 'linear-gradient(160deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.05) 70%)';

export default function Edit({attributes, setAttributes, isSelected, clientId}: EditProps) {
  const ref = useRef<HTMLLIElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  const {__experimentalSetPreviewDeviceType: setPreviewDeviceType} = useDispatch('core/edit-post');
  const {updateBlockAttributes} = useDispatch(blockEditorStore);

  const {parentId, parentAttributes, parentBlockName, hasInnerBlocks} = useSelect((select) => {
    const {getBlockParents, getBlockAttributes, getBlock} = select(blockEditorStore);
    const parents = getBlockParents(clientId);
    const parentId = parents.length > 0 ? parents[parents.length - 1] : null;
    const parentBlock = parentId ? getBlock(parentId) : null;
    const block = getBlock(clientId);
    return {
      parentId,
      parentAttributes: parentId ? getBlockAttributes(parentId) : null,
      parentBlockName: parentBlock?.name ?? null,
      hasInnerBlocks: !!block?.innerBlocks?.length,
    };
  }, [clientId]);

  const cardHeight = parentAttributes?.cardHeight !== undefined ? parentAttributes.cardHeight : 680;
  const parentClassName = typeof parentAttributes?.className === 'string' ? parentAttributes.className : '';
  const isScientificStyle = parentBlockName === 'rrze-elements/carousel'
    ? !parentClassName.includes('is-style-marketing')
    : parentClassName.includes('is-style-scientific');

  const setCardHeight = (val: number) => {
    if (parentId) {
      updateBlockAttributes(parentId, {cardHeight: val});
    }
  };

  const desktopImageUrl = attributes.desktopImageUrl;
  const tabletImageUrl = attributes.tabletImageUrl || desktopImageUrl;
  const mobileImageUrl = attributes.mobileImageUrl || tabletImageUrl;
  const desktopContentWidth = Math.min(Math.max(attributes.desktopContentWidth || 320, 320), 520);
  const handleDesktopWidthChange = (value: number) => {
    const clampedValue = Math.min(Math.max(value, 320), 520);
    setAttributes({desktopContentWidth: clampedValue});
  };

  const hasDesktopImage = Boolean(desktopImageUrl);
  const hasTabletImage = Boolean(tabletImageUrl);
  const hasMobileImage = Boolean(mobileImageUrl);
  const hasBackgroundImage = hasDesktopImage || hasTabletImage || hasMobileImage;

  const imageStatus = hasBackgroundImage ? 'image' : 'no-image';

  const blockProps = useBlockProps({
    className: `rrze-elements-blocks__carousel-content-list-item ${imageStatus}`,
    ref: ref
  });

  const isLinkCard = !!attributes.url;
  const showLinkIcon = isLinkCard;
  const shouldShowActionIcon = showLinkIcon || hasInnerBlocks;
  const textShadowEnabled = attributes.textShadowEnabled !== false;
  const backgroundOverlayEnabled = attributes.backgroundOverlayEnabled ?? false;

  const deviceIcons = {
    desktop: desktop,
    tablet: tablet,
    mobile: mobile,
  };

  useEffect(() => {
    if (isLinkCard && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [isLinkCard, isModalOpen]);

  const colorPaletteColors = [
    {name: __('Black', 'rrze-elements-blocks'), color: '#000000'},
    {name: __('White', 'rrze-elements-blocks'), color: '#FFFFFF'},
  ];

  const backgroundColorPaletteColors = [
    {name: __('FAU Blue', 'rrze-elements-blocks'), color: '#04316a'},
    {name: __('FAU Deep Blue', 'rrze-elements-blocks'), color: '#041e42'},
    {name: __('RW Light', 'rrze-elements-blocks'), color: '#c50f3c'},
    {name: __('RW Dark', 'rrze-elements-blocks'), color: '#971b2f'},
    {name: __('Med Light', 'rrze-elements-blocks'), color: '#18b4f1'},
    {name: __('Med Dark', 'rrze-elements-blocks'), color: '#005287'},
    {name: __('Nat Light', 'rrze-elements-blocks'), color: '#7bb725'},
    {name: __('Nat Dark', 'rrze-elements-blocks'), color: '#266141'},
    {name: __('Phil Light', 'rrze-elements-blocks'), color: '#fdb735'},
    {name: __('Phil Dark', 'rrze-elements-blocks'), color: '#e87722'},
    {name: __('TF Light', 'rrze-elements-blocks'), color: '#8c9fb1'},
    {name: __('TF Dark', 'rrze-elements-blocks'), color: '#2f586e'},
    {name: __('White', 'rrze-elements-blocks'), color: '#fff'},
    {name: __('Black', 'rrze-elements-blocks'), color: '#000'},
  ];

  const overlayGradientOptions = [
    {name: __('Soft dark', 'rrze-elements-blocks'), gradient: DEFAULT_OVERLAY_GRADIENT, slug: 'rrze-soft-dark'},
    {
      name: __('Fade bottom', 'rrze-elements-blocks'),
      gradient: 'linear-gradient(180deg, rgba(3, 18, 34, 0) 0%, rgba(4, 49, 106, 0.7) 85%)',
      slug: 'rrze-fade-bottom'
    },
    {
      name: __('Warm glow', 'rrze-elements-blocks'),
      gradient: 'linear-gradient(150deg, rgba(0, 0, 0, 0.58) 0%, rgba(83, 36, 0, 0.35) 60%)',
      slug: 'rrze-warm-glow'
    },
    {
      name: __('Cool tint', 'rrze-elements-blocks'),
      gradient: 'linear-gradient(150deg, rgba(5, 34, 55, 0.6) 0%, rgba(7, 94, 108, 0.35) 70%)',
      slug: 'rrze-cool-tint'
    }
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
  const backgroundColor = attributes.backgroundColor;
  const overlayGradient = attributes.backgroundOverlayGradient || DEFAULT_OVERLAY_GRADIENT;
  const isCoverFit = (attributes.imageObjectFit || 'cover') === 'cover';
  const normalizeColor = (color?: string) => {
    if (!color) return '';
    return color.trim().toLowerCase().replace(/\s+/g, '');
  };
  const isWhite = (color?: string) => {
    const normalized = normalizeColor(color);
    return ['#fff', '#ffffff', 'fff', 'ffffff', 'rgb(255,255,255)', 'rgba(255,255,255,1)', 'white'].includes(normalized);
  };
  const needsLightShadow = [desktopFinalColor, tabletFinalColor, mobileFinalColor].some((color) => isWhite(color));
  const cardTextShadow = !textShadowEnabled
    ? 'none'
    : hasBackgroundImage
      ? `1px 1px 2px ${needsLightShadow ? '#ddd' : '#222'}`
      : 'none';

  const clampFocusValue = (value: number) => Math.min(1, Math.max(0, value));
  const formatFocusPercentage = (value: number) => `${parseFloat((clampFocusValue(value) * 100).toFixed(2))}%`;
  const getObjectPosition = (point?: EditProps['attributes']['desktopFocusPoint']) => {
    const x = point?.x ?? 0.5;
    const y = point?.y ?? 0.5;
    return `${formatFocusPercentage(x)} ${formatFocusPercentage(y)}`;
  };

  const style: InfoCardCustomStyles = {
    '--desktop-text-color': desktopFinalColor,
    '--tablet-text-color': tabletFinalColor,
    '--mobile-text-color': mobileFinalColor,
    '--background-color': backgroundColor,
    '--desktop-object-position': getObjectPosition(attributes.desktopFocusPoint),
    '--tablet-object-position': getObjectPosition(attributes.tabletFocusPoint),
    '--mobile-object-position': getObjectPosition(attributes.mobileFocusPoint),
    '--image-object-fit': attributes.imageObjectFit || 'cover',
    '--card-text-shadow': cardTextShadow,
    '--rrze-card-overlay-gradient': overlayGradient,
    '--desktop-card-width': `${desktopContentWidth}px`,
  };

  const backgroundOverlayStyle: InfoCardCustomStyles = {
    '--rrze-card-overlay-gradient': overlayGradient,
  };

  const backgroundOverlayDataAttr = backgroundOverlayEnabled ? 'true' : undefined;

  return (
    <li {...blockProps} style={style}>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon={page}
            label={__("Add / Edit Content", "rrze-elements-blocks")}
            onClick={() => setIsModalOpen(!isModalOpen)}
            disabled={isLinkCard}
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
                onChange={(newLink) => setAttributes({url: newLink?.url || ''})}
                onRemove={() => {
                  setAttributes({url: ''});
                  setIsLinkPickerVisible(false);
                }}
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
        <CarouselSettingsPanel
          isVisible={Boolean(parentId)}
          cardHeight={cardHeight}
          onChange={setCardHeight}
        />
        <ImageSettingsPanel
          deviceType={deviceType}
          onDeviceTypeChange={handleDeviceTypeChange}
          hasBackgroundImage={hasBackgroundImage}
          hasDesktopImage={hasDesktopImage}
          hasTabletImage={hasTabletImage}
          hasMobileImage={hasMobileImage}
          isCoverFit={isCoverFit}
          desktopImageUrl={desktopImageUrl}
          tabletImageUrl={tabletImageUrl}
          mobileImageUrl={mobileImageUrl}
          attributes={attributes}
          setAttributes={setAttributes}
          onImageSelect={onImageSelect}
        />
        <TextColorPanel
          deviceType={deviceType}
          onDeviceTypeChange={handleDeviceTypeChange}
          attributes={attributes}
          setAttributes={setAttributes}
          colorPaletteColors={colorPaletteColors}
        />
        <BackgroundColorPanel
          backgroundColor={attributes.backgroundColor}
          desktopCustomTextColor={attributes.desktopCustomTextColor}
          palette={backgroundColorPaletteColors}
          setAttributes={setAttributes}
        />
        <LayoutPanel
          desktopContentWidth={desktopContentWidth}
          onChange={handleDesktopWidthChange}
        />
        <EffectsPanel
          backgroundOverlayEnabled={backgroundOverlayEnabled}
          backgroundOverlayGradient={attributes.backgroundOverlayGradient}
          overlayGradient={overlayGradient}
          overlayGradientOptions={overlayGradientOptions}
          textShadowEnabled={textShadowEnabled}
          setAttributes={setAttributes}
        />
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
               style={{position: 'relative', height: `${cardHeight}px`}}>
            {!isScientificStyle && (
              <>
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
              </>
            )}
            <div
              className={"rrze-elements-blocks__carousel_feature_card_bg"}
              data-background-overlay={backgroundOverlayDataAttr}
              style={backgroundOverlayStyle}
            >
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
              <span className={"rrze-elements-blocks__carousel_feature_card_bg_overlay"} aria-hidden="true" />
            </div>
            {shouldShowActionIcon && (
              <div className={"rrze-elements-blocks__carousel_feature_card_link"}
                   aria-label={showLinkIcon ? __("Open card link", "rrze-elements-blocks") : __("Show more information", "rrze-elements-blocks")}
                   role={"button"}>
                <div className={"rrze-elements-blocks__carousel_feature_card_link_control_container"}>
              <span className={"rrze-elements-blocks__carousel_feature_card_link_control_icon-container"}
                    style={{position: 'absolute'}}>
                {!showLinkIcon ? (
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
            )}
          </div>
          {isScientificStyle && (
            <div className={"rrze-elements-blocks__carousel_feature_card_scientific-text"}>
              <RichText
                tagName={"p"}
                className={"rrze-elements-blocks__carousel_feature_card_scientific-text-content"}
                allowedFormats={[
                  'core/bold',
                  'core/italic',
                  'core/subscript',
                  'core/superscript',
                ]}
                placeholder={__("Add scientific text…", "rrze-elements-blocks")}
                onChange={(newScientificText) => setAttributes({scientificText: newScientificText})}
                value={attributes.scientificText}
              />
            </div>
          )}
        </div>
      )}
    </li>
  )
    ;
}
