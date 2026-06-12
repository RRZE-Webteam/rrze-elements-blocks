import {
  BlockControls,
  InspectorControls,
  useBlockProps,
  InnerBlocks,
  MediaReplaceFlow,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {
  Button,
  Notice,
  PanelBody,
  SelectControl,
  TextControl,
  ToolbarButton,
  ToolbarGroup,
} from "@wordpress/components";
import {useDispatch, useSelect} from "@wordpress/data";
import {useEffect, useState} from "@wordpress/element";
import {__} from "@wordpress/i18n";
import {image, trash} from "@wordpress/icons";
import {store as blockEditorStore} from "@wordpress/block-editor";
import {store as noticesStore} from "@wordpress/notices";
import type {BlockInstance} from "@wordpress/blocks";

const ACCORDION_ITEM_BLOCKS = [
  "rrze-elements/accordion",
  "rrze-elements/collapse",
];

interface AccordionItemAttributes {
  title?: string;
  jumpName?: string;
  mediaAccordionImageId?: number;
  mediaAccordionImageUrl?: string;
  mediaAccordionImageAlt?: string;
}

interface AccordionItem {
  clientId: string;
  depth: number;
  name: string;
  attributes: AccordionItemAttributes;
}

interface SelectedMedia {
  id?: number | string;
  url?: string;
  alt?: string;
  alt_text?: string;
}

interface EditProps {
  clientId: string;
}

const isAccordionItem = (blockName: string) =>
  ACCORDION_ITEM_BLOCKS.includes(blockName);

const collectAccordionItems = (
  blocks: BlockInstance[],
  depth = 0,
): AccordionItem[] => {
  const items: AccordionItem[] = [];

  blocks.forEach((block) => {
    const itemBlock = isAccordionItem(block.name);

    if (itemBlock) {
      items.push({
        clientId: block.clientId,
        depth,
        name: block.name,
        attributes: block.attributes as AccordionItemAttributes,
      });
    }

    items.push(
      ...collectAccordionItems(block.innerBlocks, itemBlock ? depth + 1 : depth),
    );
  });

  return items;
};

const getItemTitle = (item: AccordionItem, index: number) => {
  const title = item.attributes.title?.trim();
  const jumpName = item.attributes.jumpName?.trim();

  if (title) {
    return title;
  }

  if (jumpName) {
    return jumpName;
  }

  return item.name === "rrze-elements/accordion"
    ? `${__("Nested accordion item", "rrze-elements-blocks")} ${index + 1}`
    : `${__("Accordion item", "rrze-elements-blocks")} ${index + 1}`;
};

const Edit = ({clientId}: EditProps) => {
  const props = useBlockProps();
  const [activeItemClientId, setActiveItemClientId] = useState("");
  const {updateBlockAttributes} = useDispatch(blockEditorStore);
  const {createErrorNotice} = useDispatch(noticesStore);

  const {items, selectedItemClientId} = useSelect((select) => {
    const {
      getBlock,
      getBlockParents,
      getSelectedBlockClientId,
    } = select(blockEditorStore);
    const rootBlock = getBlock(clientId);
    const accordionItems = collectAccordionItems(rootBlock?.innerBlocks ?? []);
    const itemClientIds = new Set(
      accordionItems.map((item) => item.clientId),
    );
    const selectedClientId = getSelectedBlockClientId();
    const selectionPath = selectedClientId
      ? [selectedClientId, ...getBlockParents(selectedClientId, true)]
      : [];

    return {
      items: accordionItems,
      selectedItemClientId:
        selectionPath.find((id) => itemClientIds.has(id)) ?? "",
    };
  }, [clientId]);

  useEffect(() => {
    if (selectedItemClientId) {
      setActiveItemClientId(selectedItemClientId);
    }
  }, [selectedItemClientId]);

  useEffect(() => {
    if (
      activeItemClientId &&
      items.some((item) => item.clientId === activeItemClientId)
    ) {
      return;
    }

    const fallbackItem =
      items.find((item) => item.attributes.mediaAccordionImageUrl) ?? items[0];

    setActiveItemClientId(fallbackItem?.clientId ?? "");
  }, [activeItemClientId, items]);

  const activeItem =
    items.find((item) => item.clientId === activeItemClientId) ?? null;
  const activeItemIndex = activeItem
    ? items.findIndex((item) => item.clientId === activeItem.clientId)
    : -1;
  const activeItemTitle = activeItem
    ? getItemTitle(activeItem, activeItemIndex)
    : "";
  const imageId = activeItem?.attributes.mediaAccordionImageId ?? 0;
  const imageUrl = activeItem?.attributes.mediaAccordionImageUrl ?? "";
  const imageAlt = activeItem?.attributes.mediaAccordionImageAlt ?? "";

  const updateActiveItemImage = (
    attributes: Partial<AccordionItemAttributes>,
  ) => {
    if (!activeItem) {
      return;
    }

    updateBlockAttributes(activeItem.clientId, attributes);
  };

  const onSelectImage = (media: SelectedMedia) => {
    if (!media?.url) {
      return;
    }

    updateActiveItemImage({
      mediaAccordionImageId: Number(media.id) || 0,
      mediaAccordionImageUrl: media.url,
      mediaAccordionImageAlt: media.alt ?? media.alt_text ?? "",
    });
  };

  const onRemoveImage = () => {
    updateActiveItemImage({
      mediaAccordionImageId: 0,
      mediaAccordionImageUrl: "",
      mediaAccordionImageAlt: "",
    });
  };

  const onUploadError = (message: string) => {
    createErrorNotice(message, {type: "snackbar"});
  };

  const itemOptions = items.map((item, index) => ({
    label: `${"-- ".repeat(item.depth)}${getItemTitle(item, index)}`,
    value: item.clientId,
  }));

  return (
    <div {...props}>
      <BlockControls>
        <ToolbarGroup>
          {activeItem && (
            <MediaReplaceFlow
              mediaId={imageId}
              mediaURL={imageUrl}
              allowedTypes={["image"]}
              accept="image/*"
              onError={onUploadError}
              onSelect={onSelectImage}
              onReset={onRemoveImage}
              name={
                imageUrl
                  ? __("Replace item image", "rrze-elements-blocks")
                  : __("Add item image", "rrze-elements-blocks")
              }
            />
          )}
          {activeItem && imageUrl && (
            <ToolbarButton
              icon={trash}
              label={__("Remove item image", "rrze-elements-blocks")}
              onClick={onRemoveImage}
            />
          )}
        </ToolbarGroup>
      </BlockControls>

      <InspectorControls>
        <PanelBody
          title={__("Accordion images", "rrze-elements-blocks")}
          initialOpen={true}
        >
          {items.length === 0 ? (
            <Notice status="info" isDismissible={false}>
              {__(
                "Add an accordion item before selecting an image.",
                "rrze-elements-blocks",
              )}
            </Notice>
          ) : (
            <>
              <SelectControl
                label={__("Accordion item", "rrze-elements-blocks")}
                value={activeItemClientId}
                options={itemOptions}
                onChange={setActiveItemClientId}
                help={__(
                  "Nested items are indented. Selecting an item in the canvas also targets it here.",
                  "rrze-elements-blocks",
                )}
              />
              <MediaUploadCheck>
                <MediaUpload
                  allowedTypes={["image"]}
                  value={imageId}
                  onSelect={onSelectImage}
                  render={({open}) => (
                    <Button
                      variant="secondary"
                      icon={image}
                      onClick={open}
                    >
                      {imageUrl
                        ? __("Replace image", "rrze-elements-blocks")
                        : __("Select image", "rrze-elements-blocks")}
                    </Button>
                  )}
                />
              </MediaUploadCheck>
              {imageUrl && (
                <>
                  <Button
                    className="media-accordion__remove-image"
                    variant="tertiary"
                    isDestructive
                    icon={trash}
                    onClick={onRemoveImage}
                  >
                    {__("Remove image", "rrze-elements-blocks")}
                  </Button>
                  <TextControl
                    label={__("Alternative text", "rrze-elements-blocks")}
                    value={imageAlt}
                    onChange={(mediaAccordionImageAlt) =>
                      updateActiveItemImage({mediaAccordionImageAlt})
                    }
                    help={__(
                      "Describe the image when it conveys information. Leave empty for decorative images.",
                      "rrze-elements-blocks",
                    )}
                  />
                </>
              )}
            </>
          )}
        </PanelBody>
      </InspectorControls>

      <div className="media-accordion">
        <div className="media-accordion__accordions">
          <InnerBlocks
            allowedBlocks={["rrze-elements/collapsibles"]}
            template={[["rrze-elements/collapsibles", {}]]}
          />
        </div>
        <aside
          className="media-accordion__media"
          aria-label={__("Accordion item image", "rrze-elements-blocks")}
        >
          {activeItem && (
            <p className="media-accordion__item-label">{activeItemTitle}</p>
          )}
          {imageUrl ? (
            <MediaUploadCheck
              fallback={
                <div className="media-accordion__image-button">
                  <img src={imageUrl} alt={imageAlt} />
                </div>
              }
            >
              <MediaUpload
                allowedTypes={["image"]}
                value={imageId}
                onSelect={onSelectImage}
                render={({open}) => (
                  <Button
                    className="media-accordion__image-button"
                    onClick={open}
                    label={__("Replace item image", "rrze-elements-blocks")}
                  >
                    <img src={imageUrl} alt={imageAlt} />
                  </Button>
                )}
              />
            </MediaUploadCheck>
          ) : (
            <MediaUploadCheck>
              <MediaUpload
                allowedTypes={["image"]}
                value={imageId}
                onSelect={onSelectImage}
                render={({open}) => (
                  <Button
                    className="media-accordion__image-placeholder"
                    variant="secondary"
                    icon={image}
                    onClick={open}
                    disabled={!activeItem}
                  >
                    {activeItem
                      ? __("Add image for this item", "rrze-elements-blocks")
                      : __(
                          "Add an accordion item to assign an image",
                          "rrze-elements-blocks",
                        )}
                  </Button>
                )}
              />
            </MediaUploadCheck>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Edit;
