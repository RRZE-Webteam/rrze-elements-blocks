import { PanelBody, ColorPalette, ColorIndicator } from "@wordpress/components";
import { ContrastChecker } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import DeviceViewportToggle from "./DeviceViewportToggle";
import { DeviceType, InfoCardAttributes } from "../types";

interface TextColorPanelProps {
  deviceType: DeviceType;
  onDeviceTypeChange: (device: DeviceType) => void;
  attributes: InfoCardAttributes;
  setAttributes: (attrs: Partial<InfoCardAttributes>) => void;
  colorPaletteColors: { name: string; color: string }[];
}

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

const TextColorPanel = ({
  deviceType,
  onDeviceTypeChange,
  attributes,
  setAttributes,
  colorPaletteColors,
}: TextColorPanelProps) => (
  <PanelBody title={__("Text Color", "rrze-elements-blocks")} initialOpen={false}>
    <DeviceViewportToggle
      label={__("Text Color Viewport", "rrze-elements-blocks")}
      deviceType={deviceType}
      onChange={onDeviceTypeChange}
    />
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
);

export default TextColorPanel;
