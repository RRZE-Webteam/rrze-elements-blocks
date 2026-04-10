import {
  PanelBody,
  TextControl,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  FocalPointPicker,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import DeviceViewportToggle from "./DeviceViewportToggle";
import { DeviceType, InfoCardAttributes } from "../types";

interface ImageSettingsPanelProps {
  deviceType: DeviceType;
  onDeviceTypeChange: (device: DeviceType) => void;
  hasBackgroundImage: boolean;
  hasDesktopImage: boolean;
  hasTabletImage: boolean;
  hasMobileImage: boolean;
  isCoverFit: boolean;
  desktopImageUrl?: string;
  tabletImageUrl?: string;
  mobileImageUrl?: string;
  attributes: InfoCardAttributes;
  setAttributes: (attrs: Partial<InfoCardAttributes>) => void;
  onImageSelect: (image: { id: number; url: string }, device: DeviceType) => void;
}

const ImageSettingsPanel = ({
  deviceType,
  onDeviceTypeChange,
  hasBackgroundImage,
  hasDesktopImage,
  hasTabletImage,
  hasMobileImage,
  isCoverFit,
  desktopImageUrl,
  tabletImageUrl,
  mobileImageUrl,
  attributes,
  setAttributes,
  onImageSelect,
}: ImageSettingsPanelProps) => (
  <PanelBody title={__("Image Settings", "rrze-elements-blocks")} initialOpen={false}>
    <DeviceViewportToggle
      label={__("Choose Viewport", "rrze-elements-blocks")}
      deviceType={deviceType}
      onChange={onDeviceTypeChange}
    />
    {(deviceType === 'desktop' && hasDesktopImage && isCoverFit) && (
      <FocalPointPicker
        url={desktopImageUrl}
        value={attributes.desktopFocusPoint}
        onChange={(newFocusPoint: { x: number; y: number }) => setAttributes({desktopFocusPoint: newFocusPoint})}
      />
    )}
    {(deviceType === 'tablet' && hasTabletImage && isCoverFit) && (
      <FocalPointPicker
        url={tabletImageUrl}
        value={attributes.tabletFocusPoint}
        onChange={(newFocusPoint: { x: number; y: number }) => setAttributes({tabletFocusPoint: newFocusPoint})}
      />
    )}
    {(deviceType === 'mobile' && hasMobileImage && isCoverFit) && (
      <FocalPointPicker
        url={mobileImageUrl}
        value={attributes.mobileFocusPoint}
        onChange={(newFocusPoint: { x: number; y: number }) => setAttributes({mobileFocusPoint: newFocusPoint})}
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
);

export default ImageSettingsPanel;
