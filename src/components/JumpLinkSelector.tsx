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
const JumpLinkSelector: React.FC<JumpLinkSelectorProps> = ({
  attributes,
  setAttributes,
}) => {
  const [inputURL, setInputURL] = useState(attributes.jumpName);
  const [disabled, setDisabled] = useState(false);

  /**
   * Sanitizes the input string for use in an href attribute.
   * @param {*} input The user input string
   * @returns Sanitized string
   */
  const sanitizeInput = (input: string): string => {
    return input
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[^a-z0-9\-]/g, ""); // Remove non-alphanumeric characters except hyphens
  };

  /**
   * Handles the submit event of the form for the video url
   * @param {*} event
   */
  const handleToggleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const sanitizedURL = sanitizeInput(inputURL);
    setAttributes({ jumpName: sanitizedURL });
    setDisabled(sanitizedURL === sanitizeInput(attributes.jumpName));
  };

  const onChangeURL = (event: ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setInputURL(url);
    setDisabled(sanitizeInput(url) === sanitizeInput(attributes.jumpName));
  };

  return (
    <PanelBody
      title={__("Jump Link Settings", "rrze-elements-blocks")}
      initialOpen={false}
      icon={<Icon icon={link} />}
    >
      <Spacer>
        <Text>
          {__(
            "Jump Links allow your users to jump to this collapse by adding /#jumplinkname to the end of the URL.",
            "rrze-elements-blocks"
          )}
        </Text>
      </Spacer>

      <form onSubmit={handleToggleSubmit}>
        <BaseControl
          label={__("Jump Link Name", "rrze-elements-blocks")}
          id="rrze-elements"
        >
          <input
            className="rrze-element-input-field"
            type="text"
            value={inputURL}
            onChange={onChangeURL}
            placeholder={__("Update the Jump Link", "rrze-elements-blocks")}
            style={{ width: "100%" }}
          />
        </BaseControl>
        <Button variant="primary" type="submit" disabled={disabled}>
          {__("Set Jump Link", "rrze-elements-blocks")}
        </Button>
      </form>
    </PanelBody>
  );
};

export default JumpLinkSelector;
