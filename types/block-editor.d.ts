import '@wordpress/block-editor';
import { ComponentType } from 'react';
import type { ReactNode } from 'react';

declare module '@wordpress/block-editor' {
    export interface MediaReplaceFlowProps {
        mediaId: number;
        mediaURL: string;
        allowedTypes?: string[];
        accept?: string;
        onSelect: (media: any) => void;
        onReset?: (media: any) => void;
        onError: (error: string) => void;
        onToggleFeaturedImage?: (value: boolean) => void;
        useFeaturedImage?: boolean;
        name: string;
        variant?: string;
        renderToggle?: (props: { onToggle: () => void; isOpen: boolean }) => ReactNode;
    }

    export interface __experimentalImageURLInputUI {
      url: string;
      onChangeUrl: (change: any) => void;
      linkDestination: string;
      mediaUrl: string;
      mediaLink:string;
      linkTarget: string;
      linkClass?: string;
      rel: any
      showLightboxSetting: boolean;
      lightboxEnabled: boolean;
      onSetLightbox: (change: any) => void;
      resetLightbox: (change: any) => void;
    }

    export const MediaReplaceFlow: ComponentType<MediaReplaceFlowProps>;
}
