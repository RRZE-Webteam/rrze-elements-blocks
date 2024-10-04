import { __ } from "@wordpress/i18n";
import { BlockControls, MediaReplaceFlow } from "@wordpress/block-editor";
import {
  ToolbarItem,
  ToolbarButton,
  ToolbarGroup,
} from "@wordpress/components";
import { store as noticesStore } from "@wordpress/notices";
import { getBlobTypeByURL, isBlobURL, revokeBlobURL } from "@wordpress/blob";
import { useDispatch } from "@wordpress/data";
import { trash } from "@wordpress/icons";
import { useEffect, useState } from "@wordpress/element";

interface CustomMediaReplaceFlowProps {
  attributes: {
    id: number;
    url: string;
    alt: string;
    srcset: string;
  };
  setAttributes: (
    attributes: Partial<CustomMediaReplaceFlowProps["attributes"]>
  ) => void;
}

const CustomMediaReplaceFlow = ({
  attributes,
  setAttributes,
}: CustomMediaReplaceFlowProps) => {

  const { id, alt, url } = attributes;
  const { createErrorNotice } = useDispatch(noticesStore);
  const [blobURL, setBlobURL] = useState<string | undefined>();

  useEffect(() => {
    if ( !id && isBlobURL(url)){
      setAttributes({
        url: undefined,
        id: undefined,
        alt: '',
        srcset: undefined,
      })
    }
  }, []);

  useEffect(() => {
    if (isBlobURL(url)){
      setBlobURL(url);
    } else {
      revokeBlobURL(blobURL);
      setBlobURL(undefined);
    }
  }, [url])

  const onSelectImage = ( image: any ) => {
		if ( ! image || ! image.url ) {
			setAttributes( { url: undefined, id: undefined, alt: '' } );
			return;
		}
		setAttributes( { url: image.url, id: image.id, alt: image.alt } );
	};

  const onSelectURL = ( newURL: any ) => {
		setAttributes( {
			url: newURL,
			id: undefined,
			alt: '',
		} );
	};

  const onClearMedia = () => {
    setAttributes({
      url: undefined,
      id: undefined,
      alt: undefined,
      srcset: undefined,
    });
  };

  const onUploadError = (message: string) => {
    createErrorNotice(message, { type: "snackbar" });
  };

  return (
    <BlockControls>
      <ToolbarGroup>
        <MediaReplaceFlow
          mediaId={id}
          mediaURL={url}
          allowedTypes={["image"]}
          accept="image/*,video/*"
          onError={onUploadError}
          onSelect={onSelectImage}
          useFeaturedImage={false}
          name={
            !url
              ? __("Add Image", "rrze-elements-blocks")
              : __("Replace Image", "rrze-elements-blocks")
          }
        />
        {url && (
          <ToolbarItem>
            {() => (
              <ToolbarButton
                icon={trash}
                label={__("Remove image", "rrze-elements-blocks")}
                onClick={onClearMedia} />
            )}
          </ToolbarItem>
        )}
      </ToolbarGroup>
    </BlockControls>
  );
};

export { CustomMediaReplaceFlow };
