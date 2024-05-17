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

// Define TypeScript interface for component props
type XrayTogglerProps = {
  attributes: {
    xray: boolean;
  };
  setAttributes: (newAttributes: { xray: boolean }) => void;
};

/**
 * XrayBar component - Displays a toolbar for toggling X-ray feature.
 * @param {XrayTogglerProps} props - React props.
 * @returns {JSX.Element} The rendered XrayBar component.
 */
const XrayBar = ({ attributes, setAttributes }: XrayTogglerProps) => {
  const { xray } = attributes;

  /**
   * Creates an SVG icon for the xray feature.
   * @param {string} fillColor - The color to fill the SVG path with.
   * @returns {JSX.Element} The SVG icon.
   */
  const createXrayIcon = (fillColor = "none") => (
    <SVG xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
      <Path
        fill={fillColor}
        d="M0 64C0 46.3 14.3 32 32 32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V96C14.3 96 0 81.7 0 64zM256 96c-8.8 0-16 7.2-16 16v32H160c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v48H128c-8.8 0-16 7.2-16 16s7.2 16 16 16H240v70.6L189.1 307c-5.2-2-10.6-3-16.2-3h-2.1c-23.6 0-42.8 19.2-42.8 42.8c0 9.6 3.2 18.9 9.1 26.4l18.2 23.2c9.7 12.4 24.6 19.6 40.3 19.6H316.4c15.7 0 30.6-7.2 40.3-19.6l18.2-23.2c5.9-7.5 9.1-16.8 9.1-26.4c0-23.6-19.2-42.8-42.8-42.8H339c-5.5 0-11 1-16.2 3L272 326.6V256H384c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V176h80c8.8 0 16-7.2 16-16s-7.2-16-16-16H272V112c0-8.8-7.2-16-16-16zM208 352a16 16 0 1 1 0 32 16 16 0 1 1 0-32zm80 16a16 16 0 1 1 32 0 16 16 0 1 1 -32 0z"
      />
    </SVG>
  );

  // Define inactive and active xray icons
  const inactiveXrayIcon = createXrayIcon("#D3D3D3");
  const ActivexrayIcon = createXrayIcon("#000");

  /**
   * Toggles the xray attribute.
   * @param {boolean} newXray - The new xray state.
   */
  const toggleXray = (newXray: boolean) => {
    setAttributes({ xray: newXray });
  };

  // Return the main component
  return (
    <ToolbarGroup>
      <ToolbarItem>
        {() => (
          <ToolbarDropdownMenu
            icon={xray ? ActivexrayIcon : inactiveXrayIcon}
            label={__("Display options for the Editor", "rrze-elements-b")}
            controls={[
              {
                title: __(
                  "Reveal all tabs inside the Editor (X-ray)",
                  "rrze-elements-b"
                ),
                icon: ActivexrayIcon,
                onClick: () => toggleXray(true),
              },
              {
                title: __(
                  "Only show active tabs inside the editor",
                  "rrze-elements-b"
                ),
                icon: inactiveXrayIcon,
                onClick: () => toggleXray(false),
              },
            ]}
          />
        )}
      </ToolbarItem>
    </ToolbarGroup>
  );
};

// Export the XrayBar component
export { XrayBar };
