import {__} from "@wordpress/i18n";
import {
  ToolbarDropdownMenu,
  ToolbarItem,
  ToolbarGroup,
  SVG,
  Path
} from "@wordpress/components";

type EditControlProps = {
  attributes: {
    isEditView: boolean;
  }
  setAttributes: (newAttributes: { isEditView: boolean }) => void;
};

/**
 * EditControl component - Displays a toolbar for toggling the Edit View
 * @param props - React props
 * @returns     - The rendered EditControl component
 */
const EditControl = ({attributes, setAttributes}: EditControlProps) => {
  const {isEditView} = attributes ? attributes : {isEditView: false};

  /**
   * Creates the SVG icon for the Toolbar Button
   * @param fillColor - The color to fill the SVG path with
   * @returns         - The SVG icon
   */
  const createEditIcon = (fillColor = "none") => (
    <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill={fillColor}>
      <Path
        d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/>
    </SVG>
  );

  /**
   * Creates the SVG icon for the View Button
   * @param fillColor - The color to fill the SVG path with
   * @returns         - The SVG icon
   */
  const createViewIcon = (fillColor = "none") => (
    <SVG xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><Path
      d="M280-160v-640h400v640H280Zm-160-80v-480h80v480h-80Zm640 0v-480h80v480h-80Zm-400 0h240v-480H360v480Zm0 0v-480 480Z"/></SVG>
  );

  const toggleEditView = (state: boolean) => {
    setAttributes({isEditView: state});
  }

  const inactiveEditIcon = createEditIcon("#D3D3D3");
  const activeEditIcon = createViewIcon("currentColor");

  return(
    <ToolbarGroup>
      <ToolbarItem>
        {() => (
          <ToolbarDropdownMenu
            icon = {isEditView ? inactiveEditIcon : activeEditIcon}
            label = {__("Popover options", "rrze-elements-blocks")}
            controls={[
              {
                title: __(
                  "Card Editing mode",
                  "rrze-elements-blocks",
                ),
                icon: activeEditIcon,
                isDisabled: !isEditView,
                onClick: () => toggleEditView(false),
              },
              {
                title: __(
                  "Popover Editing Mode",
                  "rrze-elements-blocks",
                ),
                icon: inactiveEditIcon,
                isDisabled: isEditView,
                onClick: () => toggleEditView(true),
              },
            ]}/>
        )}
      </ToolbarItem>
    </ToolbarGroup>
  )
}

export { EditControl };
