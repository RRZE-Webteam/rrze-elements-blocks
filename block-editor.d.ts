import '@wordpress/block-editor';
import { ComponentType } from 'react';

declare module '@wordpress/block-editor' {
    export interface MediaReplaceFlowProps {
        mediaId: number;
        mediaURL: string;
        allowedTypes?: string;
        accept?: string;
        onSelect: (media: any) => void;
        onToggleFeaturedImage?: (value: boolean) => void;
        useFeaturedImage?: boolean;
        name: string;
    }

    export const MediaReplaceFlow: ComponentType<MediaReplaceFlowProps>;
}
