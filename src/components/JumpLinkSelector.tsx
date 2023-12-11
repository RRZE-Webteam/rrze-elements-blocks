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
  __experimentalToggleGroupControlOption as ToggleGroupControlOption
} from "@wordpress/components";
import { useState } from "@wordpress/element";
import { ChangeEvent, FormEvent } from "react";
import { Icon } from "@wordpress/components";
import { link } from "@wordpress/icons";


interface JumpLinkSelectorProps {
  attributes: {
    jumpName: string;
  };
  setAttributes: (attributes: { jumpName: string }) => void;
}

/**
 * Adds an input field to set individual jump links for collapses.
 * @param {*} attributes The attributes of the block
 * @param {*} setAttributes The function to set the attributes of the block
 * @returns JSX element
 */
const JumpLinkSelector: React.FC<JumpLinkSelectorProps> = ({ attributes, setAttributes }) => {
  const [inputURL, setInputURL] = useState(attributes.jumpName);

  /**
   * Handles the submit event of the form for the video url
   * @param {*} event
   */
  const handleToggleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setAttributes({ jumpName: inputURL });
  };

  const onChangeURL = (event: ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setInputURL(url);
  };

  return (
      <PanelBody
        title={__("Jump Link Settings", "rrze-elements-b")}
        initialOpen={false}
        icon = {<Icon icon={link} />}
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
              onChange={onChangeURL}
              placeholder={__("Update the Jump Link", "rrze-video")}
              style={{ width: "100%" }}
            />
          </BaseControl>
          <Button variant="primary" type="submit">
            {__("Set Jump Link", "rrze-elements-b")}
          </Button>
        </form>
      </PanelBody>
  );
};

export default JumpLinkSelector;
