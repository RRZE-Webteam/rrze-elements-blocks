import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import metadata from './block.json';
import './editor.scss';
import { InnerBlocks } from '@wordpress/block-editor';
import deprecated from './deprecated';

registerBlockType( metadata.name as any, {
	// Used to construct a preview for the block to be shown in the block inserter.
	example: {
		attributes: {
			message: 'Accordion',
		},
	},
	icon: {
		src: <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g opacity=".5"><rect x="75.86" y="204.25" width="360.29" height="133.91" fill="evenodd" strokeWidth="0"/></g><path d="m81.59,173.84h112.67c3.16,0,5.73,2.57,5.73,5.73v25.16h-124.13v-25.16c0-3.16,2.57-5.73,5.73-5.73Z" fill="evenodd" strokeWidth="0"/><path d="m150.48,173.84h112.67c3.16,0,5.73,2.57,5.73,5.73v25.16h-124.13v-25.16c0-3.16,2.57-5.73,5.73-5.73Z" fill="evenodd" opacity=".2" strokeWidth="0"/></svg>
	},
	__experimentalLabel: (attributes: any, { context }: any) => {
		const { title } = attributes;

		// In the list view, use the block's title as the label.
		// If the title is empty, fall back to the default label.
		if (context === 'list-view' && title) {
			return title;
		}
	},
	// @see ./edit.js
	edit: Edit,
	// @see ./save.js
	save: () => <InnerBlocks.Content/>,
  deprecated
} as any );
