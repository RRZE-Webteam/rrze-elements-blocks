import {
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { DeviceType } from "../types";

interface Props {
  label: string;
  deviceType: DeviceType;
  onChange: (device: DeviceType) => void;
}

const DeviceViewportToggle = ({ label, deviceType, onChange }: Props) => (
  <ToggleGroupControl
    __next40pxDefaultSize
    isBlock
    label={label}
    value={deviceType}
    onChange={(device: DeviceType) => onChange(device)}
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

export default DeviceViewportToggle;
