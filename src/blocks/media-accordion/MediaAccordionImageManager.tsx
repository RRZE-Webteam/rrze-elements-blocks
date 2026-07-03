import {
  MediaUpload,
  MediaUploadCheck,
} from "@wordpress/block-editor";
import {Button} from "@wordpress/components";
import {
  DataViews,
  filterSortAndPaginate,
} from "@wordpress/dataviews";
import type {
  Field,
  View,
} from "@wordpress/dataviews";
import {useMemo, useState} from "@wordpress/element";
import {__} from "@wordpress/i18n";
import {image, replace, trash} from "@wordpress/icons";
import {
  AccordionItem,
  AccordionItemAttributes,
  getMediaCaption,
  getItemTitle,
  SelectedMedia,
} from "./accordion-items";

const BLOCK_TYPE_FIELD = "blockType";
const DEFAULT_VIEW_FIELDS = ["jumpName", "image", "actions"];

interface AccordionImageRow extends AccordionItem {
  id: string;
  displayTitle: string;
  blockType: string;
  jumpName: string;
  imageId: number;
  imageUrl: string;
  imageAlt: string;
}

interface MediaAccordionImageManagerProps {
  items: AccordionItem[];
  onActivateItem: (clientId: string) => void;
  onUpdateItem: (
    clientId: string,
    attributes: Partial<AccordionItemAttributes>,
  ) => void;
}

const MediaAccordionImageManager = ({
  items,
  onActivateItem,
  onUpdateItem,
}: MediaAccordionImageManagerProps) => {
  const [view, setView] = useState<View>({
    type: "table",
    fields: DEFAULT_VIEW_FIELDS,
    titleField: "title",
    showTitle: true,
    showLevels: true,
    perPage: 10,
    page: 1,
    filters: [],
    layout: {
      density: "comfortable",
      enableMoving: false,
      styles: {
        image: {
          width: "100px",
        },
        blockType: {
          width: "160px",
        },
        actions: {
          minWidth: "220px",
        },
        jumpName: {
          width: "220px",
          minWidth: "220px",
        }
      },
    },
  });

  const rows = useMemo<AccordionImageRow[]>(
    () =>
      items.map((item, index) => ({
        ...item,
        id: item.clientId,
        displayTitle: getItemTitle(item, index),
        blockType:
          item.name === "rrze-elements/accordion" || item.depth > 0
            ? __("Inner accordion item", "rrze-elements-blocks")
            : __("Accordion item", "rrze-elements-blocks"),
        jumpName: item.attributes.jumpName?.trim() ?? "",
        imageId: item.attributes.mediaAccordionImageId ?? 0,
        imageUrl: item.attributes.mediaAccordionImageUrl ?? "",
        imageAlt: item.attributes.mediaAccordionImageAlt ?? "",
      })),
    [items],
  );

  const hasInnerAccordions = useMemo(
    () =>
      rows.some(
        (item) => item.name === "rrze-elements/accordion" || item.depth > 0,
      ),
    [rows],
  );

  const currentView = useMemo<View>(() => {
    const viewFields = view.fields ?? DEFAULT_VIEW_FIELDS;
    const fieldsWithoutBlockType = viewFields.filter(
      (field) => field !== BLOCK_TYPE_FIELD,
    );

    return {
      ...view,
      fields: hasInnerAccordions
        ? [BLOCK_TYPE_FIELD, ...fieldsWithoutBlockType]
        : fieldsWithoutBlockType,
    };
  }, [hasInnerAccordions, view]);

  const removeImage = (item: AccordionImageRow) => {
    onActivateItem(item.clientId);
    onUpdateItem(item.clientId, {
      mediaAccordionImageId: 0,
      mediaAccordionImageUrl: "",
      mediaAccordionImageAlt: "",
      mediaAccordionImageCaption: "",
    });
  };

  const selectImage = (
    item: AccordionImageRow,
    media: SelectedMedia,
  ) => {
    if (!media?.url) {
      return;
    }

    onActivateItem(item.clientId);
    onUpdateItem(item.clientId, {
      mediaAccordionImageId: Number(media.id) || 0,
      mediaAccordionImageUrl: media.url,
      mediaAccordionImageAlt: media.alt ?? media.alt_text ?? "",
      mediaAccordionImageCaption: getMediaCaption(media),
    });
  };

  const fields = useMemo<Field<AccordionImageRow>[]>(
    () => [
      {
        id: "title",
        label: __("Accordion title", "rrze-elements-blocks"),
        enableHiding: false,
        enableSorting: true,
        enableGlobalSearch: true,
        getValue: ({item}) => item.displayTitle,
      },
      ...(hasInnerAccordions
        ? [
            {
              id: BLOCK_TYPE_FIELD,
              label: __("Block Type", "rrze-elements-blocks"),
              enableHiding: false,
              enableSorting: true,
              enableGlobalSearch: true,
              render: ({item}) => (
                <span className="media-accordion-image-manager__block-type">
                  {item.blockType}
                </span>
              ),
            } satisfies Field<AccordionImageRow>,
          ]
        : []),
      {
        id: "jumpName",
        label: __("Jump name", "rrze-elements-blocks"),
        enableHiding: false,
        enableSorting: true,
        enableGlobalSearch: true,
        render: ({item}) =>
          item.jumpName ? (
            <code style={{ whiteSpace: 'initial' }}>
              {item.jumpName}
            </code>
          ) : (
            <span className="media-accordion-image-manager__empty-value">
              {__("Not set", "rrze-elements-blocks")}
            </span>
          ),
      },
      {
        id: "image",
        label: __("Selected image", "rrze-elements-blocks"),
        enableHiding: false,
        enableSorting: false,
        render: ({item}) =>
          item.imageUrl ? (
            <img
              className="media-accordion-image-manager__thumbnail"
              src={item.imageUrl}
              alt={item.imageAlt}
            />
          ) : (
            <span className="media-accordion-image-manager__empty-value">
              {__("No image", "rrze-elements-blocks")}
            </span>
          ),
      },
      {
        id: "actions",
        label: __("Image actions", "rrze-elements-blocks"),
        enableHiding: false,
        enableSorting: false,
        render: ({item}) => (
          <div className="media-accordion-image-manager__actions">
            <MediaUploadCheck>
              <MediaUpload
                allowedTypes={["image"]}
                value={item.imageId}
                onSelect={(media: SelectedMedia) =>
                  selectImage(item, media)
                }
                render={({open}) => (
                  <Button
                    variant="secondary"
                    size="compact"
                    icon={item.imageUrl ? replace : image}
                    onClick={open}
                  >
                    {item.imageUrl
                      ? __("Replace", "rrze-elements-blocks")
                      : __("Select", "rrze-elements-blocks")}
                  </Button>
                )}
              />
            </MediaUploadCheck>
            {item.imageUrl && (
              <Button
                variant="tertiary"
                size="compact"
                icon={trash}
                isDestructive
                onClick={() => removeImage(item)}
              >
                {__("Remove", "rrze-elements-blocks")}
              </Button>
            )}
          </div>
        ),
      },
    ],
    [hasInnerAccordions, onActivateItem, onUpdateItem],
  );

  const processed = useMemo(
    () => filterSortAndPaginate(rows, currentView, fields),
    [currentView, fields, rows],
  );

  return (
    <DataViews
      data={processed.data}
      fields={fields}
      view={currentView}
      onChangeView={setView}
      paginationInfo={processed.paginationInfo}
      defaultLayouts={{
        table: {
          showMedia: false,
          showLevels: true,
        },
      }}
      getItemId={(item: AccordionImageRow) => item.id}
      getItemLevel={(item: AccordionImageRow) => item.depth}
      search
      searchLabel={__(
        "Search accordion images",
        "rrze-elements-blocks",
      )}
      empty={
        <p className="media-accordion-image-manager__empty">
          {__(
            "Add an accordion item before assigning images.",
            "rrze-elements-blocks",
          )}
        </p>
      }
    />
  );
};

export default MediaAccordionImageManager;
