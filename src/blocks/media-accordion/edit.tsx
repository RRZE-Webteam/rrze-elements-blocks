import {
  BlockControls,
  InspectorControls,
  useBlockProps,
  InnerBlocks,
  MediaPlaceholder,
  MediaReplaceFlow,
  RichText,
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {
  Button,
  Notice,
  PanelBody,
  Modal,
  SelectControl,
  TextControl,
  ToolbarButton,
  ToolbarGroup,
} from "@wordpress/components";
import {useDispatch, useSelect} from "@wordpress/data";
import {useCallback, useEffect, useState} from "@wordpress/element";
import {__ , sprintf} from "@wordpress/i18n";
import {closeSmall, gallery, image, trash, drawerLeft, drawerRight} from "@wordpress/icons";
import {store as blockEditorStore} from "@wordpress/block-editor";
import {store as noticesStore} from "@wordpress/notices";
import {
  AccordionItemAttributes,
  collectAccordionItems,
  getMediaCaption,
  getItemTitle,
  SelectedMedia,
} from "./accordion-items";
import MediaAccordionImageManager from "./MediaAccordionImageManager";
import { ViewRatioSelectorToolbar } from "../../components/ViewRatioSelector";

interface EditProps {
  clientId: string;
  attributes: {
    viewRatio: "2:1" | "1:2";
  }
  setAttributes: (newAttributes: { viewRatio: "2:1" | "1:2"}) => void;
}

interface CoreDataSelectors {
  getMedia: (id: number) => SelectedMedia | undefined;
}

const Edit = ({clientId, attributes, setAttributes}: EditProps) => {
  const props = useBlockProps();
  const [activeItemClientId, setActiveItemClientId] = useState("");
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [imageManagerAnchor, setImageManagerAnchor] =
    useState<Element | null>(null);
  const {updateBlockAttributes} = useDispatch(blockEditorStore);
  const {createErrorNotice} = useDispatch(noticesStore);
  const { viewRatio } = attributes;

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
  const truncateTitle = (title: string, maxLength = 40) =>
    title.length > maxLength ? `${title.slice(0, maxLength - 1)}…` : title;

  const activeItemLabel = truncateTitle(
    activeItemTitle || __("Untitled", "rrze-elements-blocks")
  );
  const imageId = activeItem?.attributes.mediaAccordionImageId ?? 0;
  const imageUrl = activeItem?.attributes.mediaAccordionImageUrl ?? "";
  const imageAlt = activeItem?.attributes.mediaAccordionImageAlt ?? "";
  const storedImageCaption =
    activeItem?.attributes.mediaAccordionImageCaption;
  const attachmentCaption = useSelect((select) => {
    if (imageId <= 0 || storedImageCaption !== undefined) {
      return "";
    }

    const {getMedia} = select("core") as unknown as CoreDataSelectors;

    return getMediaCaption(getMedia(imageId) ?? {});
  }, [imageId, storedImageCaption]);
  const imageCaption =
    storedImageCaption ?? attachmentCaption;

  const updateActiveItemImage = (
    attributes: Partial<AccordionItemAttributes>,
  ) => {
    if (!activeItem) {
      return;
    }

    updateBlockAttributes(activeItem.clientId, attributes);
  };

  const updateItemImage = useCallback(
    (
      itemClientId: string,
      attributes: Partial<AccordionItemAttributes>,
    ) => {
      updateBlockAttributes(itemClientId, attributes);
    },
    [updateBlockAttributes],
  );

  const setImageManagerButtonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      setImageManagerAnchor(node);
    },
    [],
  );

  const onSelectImage = (media: SelectedMedia) => {
    if (!media?.url) {
      return;
    }

    updateActiveItemImage({
      mediaAccordionImageId: Number(media.id) || 0,
      mediaAccordionImageUrl: media.url,
      mediaAccordionImageAlt: media.alt ?? media.alt_text ?? "",
      mediaAccordionImageCaption: getMediaCaption(media),
    });
  };

  const onSelectImageUrl = (mediaAccordionImageUrl: string) => {
    updateActiveItemImage({
      mediaAccordionImageId: 0,
      mediaAccordionImageUrl,
      mediaAccordionImageAlt: "",
      mediaAccordionImageCaption: "",
    });
  };

  const onRemoveImage = () => {
    updateActiveItemImage({
      mediaAccordionImageId: 0,
      mediaAccordionImageUrl: "",
      mediaAccordionImageAlt: "",
      mediaAccordionImageCaption: "",
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
                  ? sprintf(
                    __("Replace image for accordion tab “%s”", "rrze-elements-blocks"),
                    activeItemLabel || __("Untitled", "rrze-elements-blocks")
                  )
                  : sprintf(
                    __("Add image for accordion section “%s”", "rrze-elements-blocks"),
                    activeItemLabel || __("Untitled", "rrze-elements-blocks")
                  )
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
          <ToolbarButton
            ref={setImageManagerButtonRef}
            icon={gallery}
            label={__(
              "Manage accordion images",
              "rrze-elements-blocks",
            )}
            isPressed={isImageManagerOpen}
            onClick={() => setIsImageManagerOpen((isOpen) => !isOpen)}
          />
        </ToolbarGroup>
        <ViewRatioSelectorToolbar
          attributes = { attributes }
          setAttributes = { setAttributes }
        />
      </BlockControls>

      {isImageManagerOpen && imageManagerAnchor && (
        <Modal
          className="media-accordion-image-manager__popover"
          size="fill"
          onRequestClose={() => setIsImageManagerOpen(false)}
        >
          <div className="media-accordion-image-manager">
            <div className="media-accordion-image-manager__header">
              <h2>
                {__("Accordion images", "rrze-elements-blocks")}
              </h2>
              <Button
                icon={closeSmall}
                label={__("Close", "rrze-elements-blocks")}
                onClick={() => setIsImageManagerOpen(false)}
              />
            </div>
            <MediaAccordionImageManager
              items={items}
              onActivateItem={setActiveItemClientId}
              onUpdateItem={updateItemImage}
            />
          </div>
        </Modal>
      )}

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
            <figure className="media-accordion__figure">
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
                      label={__(
                        "Replace item image",
                        "rrze-elements-blocks",
                      )}
                    >
                      <img src={imageUrl} alt={imageAlt} />
                    </Button>
                  )}
                />
              </MediaUploadCheck>
              <RichText
                tagName="figcaption"
                className="wp-element-caption"
                aria-label={__("Image caption", "rrze-elements-blocks")}
                placeholder={__("Add caption", "rrze-elements-blocks")}
                value={imageCaption}
                onChange={(mediaAccordionImageCaption) =>
                  updateActiveItemImage({mediaAccordionImageCaption})
                }
              />
            </figure>
          ) : (
            activeItem && (
              <MediaPlaceholder
                className="media-accordion__image-placeholder"
                icon={image}
                labels={{
                  title: __(
                    "Add image for this item",
                    "rrze-elements-blocks",
                  ),
                  instructions: __(
                    "Upload an image, choose one from the Media Library, or insert one from a URL.",
                    "rrze-elements-blocks",
                  ),
                }}
                accept="image/*"
                allowedTypes={["image"]}
                value={imageId}
                onError={onUploadError}
                onSelect={onSelectImage}
                onSelectURL={onSelectImageUrl}
              />
            )
          )}
          {!activeItem && (
            <Notice status="info" isDismissible={false}>
              {__(
                "Add an accordion item to assign an image.",
                "rrze-elements-blocks",
              )}
            </Notice>
          )}
        </aside>
      </div>
    </div>
  );
};

export default Edit;
