// Imports from WordPress libraries
import {
  RichText,
  useBlockProps,
  BlockControls,
  InnerBlocks,
  MediaReplaceFlow,
  InspectorControls,
  LinkControl,
  ContrastChecker
} from "@wordpress/block-editor";
import {
  ToolbarGroup,
  ToolbarButton,
  DropdownMenu,
  PanelBody,
  FocalPointPicker,
  TextControl,
  Popover,
  RangeControl,
  ColorPalette,
  ColorIndicator,
  BaseControl,
  GradientPicker,
  ToggleControl,
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
    textShadowEnabled?: boolean;
    backgroundOverlayEnabled?: boolean;
    backgroundOverlayGradient?: string;
    imageObjectFit?: 'cover' | 'contain';
    desktopTextColor: string;
    tabletTextColor: string;
    mobileTextColor: string;
    desktopCustomTextColor: string;
    tabletCustomTextColor: string;
    mobileCustomTextColor: string;
    backgroundColor: string;
    desktopFocusPoint: { x: number; y: number };
    tabletFocusPoint: { x: number; y: number };
    mobileFocusPoint: { x: number; y: number };
    alt: string;
    url: string;
    scientificText: string;
    desktopContentWidth?: number;
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
  '--background-color'?: string;
  '--image-object-fit'?: string;
  '--card-text-shadow'?: string;
  '--rrze-card-overlay-gradient'?: string;
  '--desktop-card-width'?: string;
}

const DEFAULT_OVERLAY_GRADIENT = 'linear-gradient(160deg, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.05) 70%)';

export default function Edit({attributes, setAttributes, isSelected, clientId}: EditProps) {
  const ref = useRef<HTMLLIElement>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkPickerVisible, setIsLinkPickerVisible] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  const {__experimentalSetPreviewDeviceType: setPreviewDeviceType} = useDispatch('core/edit-post');
  const {updateBlockAttributes} = useDispatch(blockEditorStore);

  const {parentId, parentAttributes, hasInnerBlocks} = useSelect((select) => {
    const {getBlockParents, getBlockAttributes, getBlock} = select(blockEditorStore);
    const parents = getBlockParents(clientId);
    const parentId = parents.length > 0 ? parents[parents.length - 1] : null;
    const block = getBlock(clientId);
    return {
      parentId,
      parentAttributes: parentId ? getBlockAttributes(parentId) : null,
      hasInnerBlocks: !!block?.innerBlocks?.length,
    };
  }, [clientId]);

  const cardHeight = parentAttributes?.cardHeight !== undefined ? parentAttributes.cardHeight : 680;
  const isScientificStyle = typeof parentAttributes?.className === 'string' && parentAttributes.className.includes('is-style-scientific');

  const setCardHeight = (val: number) => {
    if (parentId) {
      updateBlockAttributes(parentId, {cardHeight: val});
    }
  };

  const desktopImageUrl = attributes.desktopImageUrl;
  const tabletImageUrl = attributes.tabletImageUrl || desktopImageUrl;
  const mobileImageUrl = attributes.mobileImageUrl || tabletImageUrl;
  const desktopContentWidth = Math.min(Math.max(attributes.desktopContentWidth || 320, 320), 520);

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

  const DeviceViewportToggle = ({label}: {label: string}) => (
    <ToggleGroupControl
      __next40pxDefaultSize
      isBlock
      label={label}
      value={deviceType}
      onChange={(device: DeviceType) => handleDeviceTypeChange(device)}
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
  );

  const AutoColorHint = ({color, label}: {color?: string; label: string}) => {
    if (!color) {
      return null;
    }
    return (
      <div
        className="rrze-elements-blocks__auto-color-hint"
        style={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'}}
      >
        <ColorIndicator colorValue={color}/>
        <span style={{fontSize: '12px'}}>
          {label}: {color}
        </span>
      </div>
    );
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

  const style: CustomStyles = {
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

  const backgroundOverlayStyle: CustomStyles = {
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
          <DeviceViewportToggle label={__("Choose Viewport", "rrze-elements-blocks")} />
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
          {(deviceType === 'desktop' && hasDesktopImage && isCoverFit) && (
            <FocalPointPicker
              url={desktopImageUrl}
              value={attributes.desktopFocusPoint}
              onChange={(newFocusPoint) => setAttributes({desktopFocusPoint: newFocusPoint})}
            />
          )}
          {(deviceType === 'tablet' && hasTabletImage && isCoverFit) && (
            <FocalPointPicker
              url={tabletImageUrl}
              value={attributes.tabletFocusPoint}
              onChange={(newFocusPoint) => setAttributes({tabletFocusPoint: newFocusPoint})}
            />
          )}
          {(deviceType === 'mobile' && hasMobileImage && isCoverFit) && (
            <FocalPointPicker
              url={mobileImageUrl}
              value={attributes.mobileFocusPoint}
              onChange={(newFocusPoint) => setAttributes({mobileFocusPoint: newFocusPoint})}
            />
          )}
          {hasBackgroundImage && (
            <TextControl
              label={__("Alt Text", "rrze-elements-blocks")}
              value={attributes.alt}
              onChange={(alt) => setAttributes({alt})}
            />
          )}
          <ToggleGroupControl
            isBlock
            label={__("Image Fit", "rrze-elements-blocks")}
            value={attributes.imageObjectFit || 'cover'}
            onChange={(value: 'cover' | 'contain' | undefined) => {
              setAttributes({imageObjectFit: value || 'cover'});
            }}
          >
            <ToggleGroupControlOption
              label={__("Fill (cover)", "rrze-elements-blocks")}
              value="cover"
            />
            <ToggleGroupControlOption
              label={__("Fit (contain)", "rrze-elements-blocks")}
              value="contain"
            />
          </ToggleGroupControl>
        </PanelBody>
        <PanelBody title={__("Text Color", "rrze-elements-blocks")}>
          <DeviceViewportToggle label={__("Text Color Viewport", "rrze-elements-blocks")} />
          {deviceType === 'desktop' && (
            <>
              <AutoColorHint
                color={attributes.desktopTextColor}
                label={__("Auto text color (calculated)", "rrze-elements-blocks")}
              />
              <ContrastChecker backgroundColor={attributes.backgroundColor}
                               textColor={attributes.desktopCustomTextColor}/>
              <ColorPalette
                colors={colorPaletteColors}
                value={attributes.desktopCustomTextColor}
                onChange={(color) => setAttributes({desktopCustomTextColor: color})}
                clearable={true}
              />
            </>
          )}
          {deviceType === 'tablet' && (
            <>
              <AutoColorHint
                color={attributes.tabletTextColor}
                label={__("Auto text color (calculated)", "rrze-elements-blocks")}
              />
              <ContrastChecker backgroundColor={attributes.backgroundColor}
                               textColor={attributes.tabletCustomTextColor}/>
              <ColorPalette
                colors={colorPaletteColors}
                value={attributes.tabletCustomTextColor}
                onChange={(color) => setAttributes({tabletCustomTextColor: color})}
                clearable={true}
              />
            </>
          )}
          {deviceType === 'mobile' && (
            <>
              <AutoColorHint
                color={attributes.mobileTextColor}
                label={__("Auto text color (calculated)", "rrze-elements-blocks")}
              />
              <ContrastChecker backgroundColor={attributes.backgroundColor}
                               textColor={attributes.mobileCustomTextColor}/>
              <ColorPalette
                colors={colorPaletteColors}
                value={attributes.mobileCustomTextColor}
                onChange={(color) => setAttributes({mobileCustomTextColor: color})}
                clearable={true}
              />
            </>
          )}
        </PanelBody>
        <PanelBody title={__("Background Color", "rrze-elements-blocks")}>
          <ContrastChecker backgroundColor={attributes.backgroundColor} textColor={attributes.desktopCustomTextColor}/>
          <ColorPalette
            colors={backgroundColorPaletteColors}
            value={attributes.backgroundColor}
            onChange={(color) => setAttributes({backgroundColor: color})}
            clearable={false}
            disableCustomColors={true}
          />
        </PanelBody>
        <PanelBody title={__("Layout", "rrze-elements-blocks")} initialOpen={false}>
          <RangeControl
            label={__("Desktop card width (px)", "rrze-elements-blocks")}
            value={desktopContentWidth}
            onChange={(value?: number) => {
              if (!value) {
                setAttributes({desktopContentWidth: 320});
                return;
              }
              const clampedValue = Math.min(Math.max(value, 320), 520);
              setAttributes({desktopContentWidth: clampedValue});
            }}
            min={320}
            max={520}
            step={2}
            help={__("Desktop cards can only be wider than the default. Tablet and mobile widths stay fixed.", "rrze-elements-blocks")}
          />
        </PanelBody>
        <PanelBody title={__("Effects", "rrze-elements-blocks")}>
          <ToggleControl
            label={__("Show background overlay", "rrze-elements-blocks")}
            help={__("Adds a gradient overlay on top of the background media to improve text contrast.", "rrze-elements-blocks")}
            checked={backgroundOverlayEnabled}
            onChange={(value: boolean) => setAttributes({backgroundOverlayEnabled: value})}
          />
          {backgroundOverlayEnabled && (
            <BaseControl label={__("Overlay gradient", "rrze-elements-blocks")}>
              <GradientPicker
                value={attributes.backgroundOverlayGradient || overlayGradient}
                onChange={(gradientValue?: string) => setAttributes({backgroundOverlayGradient: gradientValue || ''})}
                gradients={overlayGradientOptions}
              />
            </BaseControl>
          )}
          <ToggleControl
            label={__("Enable text shadow", "rrze-elements-blocks")}
            checked={textShadowEnabled}
            onChange={(value: boolean) => setAttributes({textShadowEnabled: value})}
          />
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
               style={{position: 'relative', height: `${cardHeight}px`, width: 'var(--desktop-card-width, 320px)'}}>
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
            {/*Todo: hier */}
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
