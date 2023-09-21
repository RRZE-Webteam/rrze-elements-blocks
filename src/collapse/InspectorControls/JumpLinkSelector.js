//Imports for necessary WordPress libraries
import { __ } from "@wordpress/i18n";
import {
  Button,
  PanelBody,
  BaseControl,
  __experimentalText as Text,
  __experimentalDivider as Divider,
  __experimentalHeading as Heading,
  __experimentalSpacer as Spacer,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * Controls the sidebar for videoblock in the blockeditor
 * @param {*} params
 * @returns JSX element
 */
const JumpLinkSelector = ({ attributes, setAttributes }) => {
  const [inputURL, setInputURL] = useState(attributes.jumpName);
  const { textAlign } = attributes;

  /**
   * Handles the submit event of the form for the video url
   * @param {*} event
   */
  const handleToggleSubmit = (event) => {
    event.preventDefault();
    const url = inputURL;

    setAttributes({jumpName: inputURL});
  };

  const onChangeURL = (event) => {
    const url = event.target.value;
    setInputURL(url);
  };

  return (
      <PanelBody
        title={__("Jump Link Settings", "rrze-elements-b")}
        icon="admin-links"
        initialOpen={false}
      >
        <Spacer>
          <Text>
            {__("Jump Links allow your users to jump to this collapse by adding /#jumplinkname to the end of the URL.", "rrze-elements-b")}
          </Text>
        </Spacer>

        <form onSubmit={handleToggleSubmit}>
          <BaseControl
            label={__("Jump Link Name", "rrze-elements-b")}
            id="rrze-elements"
          >
            <input
              className="rrze-element-input-field"
              type="text"
              value={inputURL}
              onChange={(event) => onChangeURL(event)}
              placeholder={__("Update the Jump Link", "rrze-video")}
              style={{ width: "100%" }}
            />
          </BaseControl>
          <Button isPrimary type="submit">
            {__("Set Jump Link", "rrze-elements-b")}
          </Button>
        </form>
      </PanelBody>
  );
};

export default JumpLinkSelector;
