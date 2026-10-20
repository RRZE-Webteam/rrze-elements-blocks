import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import Edit from './edit';
import metadata from './block.json';
import './editor.scss';

/** Stores the original cards; navigation and preview copies belong to the frontend. */
function Save() {
  return <InnerBlocks.Content />;
}

registerBlockType(metadata.name as any, {
  icon: {
    src: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5V4Zm2 2v12h10V6H7ZM0 7h3v10H0V7Zm21 0h3v10h-3V7Z" /></svg>,
  },
  edit: Edit,
  save: Save,
} as any);
