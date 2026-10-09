// Keep the segmented WordPress controls until a stable equivalent is available.
// Centralize this deliberate experimental dependency and retain its lint warnings.
import {
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
  __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon,
} from '@wordpress/components';

export { ToggleGroupControl, ToggleGroupControlOption, ToggleGroupControlOptionIcon };
