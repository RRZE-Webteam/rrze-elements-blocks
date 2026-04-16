// Imports from WordPress libraries
import {
  BlockControls, RichText,
  useBlockProps,
  InspectorControls,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import {IconMarkComponent} from "../../components/IconPicker";
// @ts-ignore
import {Button, Modal, Popover, ToolbarButton, ToolbarGroup, PanelBody, TextControl} from "@wordpress/components";
import {link, linkOff, symbol} from "@wordpress/icons";
import {__} from "@wordpress/i18n";
import {displayShortcut} from "@wordpress/keycodes";
import {MaterialSymbolPicker} from "../../components/MaterialSymbolPicker";
import {useState} from "@wordpress/element";
import {CharacterCountProgressBar} from "../../components/ProgressBar";

interface EditProps {
  blockProps: string[];
  attributes: {
    description: string;
    buttonText: string;
    fontSize: string;
    buttonUrl: string;
    ariaLabel: string;
    materialSymbol: string;
  };
  setAttributes: (attributes: Partial<EditProps["attributes"]>) => void;
  isSelected: boolean;
}

export default function Edit({attributes, setAttributes, isSelected}: EditProps) {
  const props = useBlockProps();
  const [UrlPopoverAnchor, setUrlPopoverAnchor] = useState(null);
  const [isEditingURL, setIsEditingURL] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const TagName = "a";
  const isLinkTag = "a" === TagName;
  const {buttonUrl, materialSymbol, description, ariaLabel} = attributes;
  const isURLSet = !!buttonUrl;

  const startEditing = () => {
    setIsEditingURL(true);
  };

  const unlink = () => {
    setAttributes({buttonUrl: undefined});
    setIsEditingURL(false);
  };

  // Functions to handle the opening and closing of the icon picker modal.
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const onChangeButtonUrl = (newButtonUrl: {
    url: string;
    id: string;
    title: string;
    type: string;
    opensInNewTab?: boolean;
  }) => {
    setAttributes({buttonUrl: newButtonUrl?.url});
  };


  const onChangeFact = (title: string) => {
    setAttributes({description: title});
  };

  const descriptionLength = description?.length || 0;
  const progressValue = Math.min((descriptionLength / 120) * 100, 100);

  let iconName = materialSymbol

  if (progressValue >= 100 && isSelected) {
    iconName = "sentiment_stressed";
  }


  return (
    <div  {...props}>
      <BlockControls>
        <ToolbarGroup>
          {!isURLSet && isLinkTag && (
            <ToolbarButton
              label="link"
              icon={link}
              title={__("Link", "rrze-elements-blocks")}
              shortcut={displayShortcut.primary("k")}
              onClick={startEditing}
            />
          )}
          {isURLSet && isLinkTag && (
            <ToolbarButton
              label="link"
              icon={linkOff}
              title={__("Unlink", "rrze-elements-blocks")}
              shortcut={displayShortcut.primaryShift("k")}
              onClick={unlink}
              isActive={true}
            />
          )}
          <ToolbarButton
            icon={symbol}
            label={
              materialSymbol === ""
                ? __("Add an icon", "rrze-elements-blocks")
                : __("Change the icon", "rrze-elements-blocks")
            }
            onClick={openModal}
          />
          {isOpen && (
            <Modal
              title={__("Select an Icon", "rrze-elements-blocks")}
              onRequestClose={closeModal}
              size="large"
            >
              <MaterialSymbolPicker attributes={attributes} setAttributes={setAttributes}/>
              <Button variant="primary" onClick={closeModal}>
                {__("Close", "rrze-elements-blocks")}
              </Button>
            </Modal>
          )}
        </ToolbarGroup>
      </BlockControls>
      <InspectorControls>
        <PanelBody title={__("Accessibility", "rrze-elements-blocks")} initialOpen={true}>
          <TextControl
            label={__("Aria-Label", "rrze-elements-blocks")}
            value={ariaLabel || ""}
            onChange={(value) => setAttributes({ariaLabel: value})}
            disabled={!isURLSet}
            help={!isURLSet ? __("Add a link to enable this field.", "rrze-elements-blocks") : undefined}
          />
        </PanelBody>
      </InspectorControls>
      {isLinkTag && isSelected && (isEditingURL || isURLSet) && (
        <Popover
          placement="bottom"
          onClose={() => {
          }}
          anchor={UrlPopoverAnchor}
          focusOnMount={isEditingURL ? "firstElement" : false}
          __unstableSlotName={"__unstable-block-tools-after"}
          shift
        >
          <LinkControl
            value={{url: buttonUrl}}
            onChange={onChangeButtonUrl}
            onRemove={unlink}
          />
        </Popover>
      )}
      <li className="facts__item">
        <span className="facts__icon" aria-hidden="true">
          <IconMarkComponent className={"no-selection"} type={"symbol"} iconName={"add_reaction"}
                             materialSymbol={iconName}
                             onClick={openModal}/>
          {(progressValue >= 100 && isSelected) && (
            <IconMarkComponent type={"symbol"} iconName={"keyboard_lock"} materialSymbol={"keyboard_lock"}/>
          )}
        </span>
        <RichText
          tagName="p"
          value={description}
          onChange={onChangeFact}
          allowedFormats={[]}
          placeholder={__("Fact description", "rrze-elements-blocks")}
          className={`facts__text`}
        />
        {isSelected && (
          <CharacterCountProgressBar value={descriptionLength} maxValue={120}/>
        )}
        {isURLSet && isLinkTag && (
          <a className="is-style-tertiary">
            <RichText
              tagName="span"
              value={attributes.buttonText}
              onChange={(buttonText) => setAttributes({buttonText})}
              allowedFormats={[]}
              placeholder={__("Button Text", "rrze-elements-blocks")}
              ref={setUrlPopoverAnchor}
            />
          </a>
        )}
      </li>
    </div>
  );
}
