// Import required WordPress packages and components
import { __ } from "@wordpress/i18n";
import {
  ColorPalette,
  PanelBody,
  ToolbarDropdownMenu,
  ToolbarItem,
  ToolbarGroup,
  SVG,
  Path,
  Icon,
} from "@wordpress/components";

import { alignLeft, alignRight, alignCenter } from "@wordpress/icons"

// Define TypeScript interface for component props
type AlignmentTogglerProps = {
  attributes: {
    alignment: string;
  };
  setAttributes: (newAttributes: { alignment: string }) => void;
  showLeftAlign?: boolean;
  showCenterAlign?: boolean;
  showRightAlign?: boolean;
};

const AlignmentBar = ({
  attributes,
  setAttributes,
  showLeftAlign = true,
  showCenterAlign = false,
  showRightAlign = true,
}: AlignmentTogglerProps) => {
  const { alignment } = attributes;

  const toggleAlignment = (newAlignment: string) => {
    setAttributes({ alignment: newAlignment });
  };

  const alignmentControls = [
    showLeftAlign && {
      title: __("Align left", "text-domain"),
      icon: alignLeft,
      onClick: () => toggleAlignment('left'),
    },
    showCenterAlign && {
      title: __("Align center", "text-domain"),
      icon: alignCenter,
      onClick: () => toggleAlignment('center'),
    },
    showRightAlign && {
      title: __("Align right", "text-domain"),
      icon: alignRight,
      onClick: () => toggleAlignment('right'),
    },
  ].filter(Boolean); // Filter out false values

  return (
    <ToolbarGroup>
      <ToolbarItem>
        {() => (
          <ToolbarDropdownMenu
            icon={(alignment === 'left') ? alignLeft : (alignment === 'center') ? alignCenter : alignRight}
            label={__("Display options for the Editor", "text-domain")}
            controls={alignmentControls}
          />
        )}
      </ToolbarItem>
    </ToolbarGroup>
  );
};

// Export the AlignmentBar component
export { AlignmentBar };
