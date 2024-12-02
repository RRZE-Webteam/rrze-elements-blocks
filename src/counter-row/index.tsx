import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './editor.scss';

registerBlockType( metadata.name as any, {
	icon: {
		src: <svg id="a" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect x="60.05" y="210.12" width="112.94" height="91.77" rx="5.73" ry="5.73" fill="evenodd"/><rect x="199.53" y="210.12" width="112.94" height="91.77" rx="5.73" ry="5.73" fill="evenodd"/><rect x="339.01" y="210.12" width="112.94" height="91.77" rx="5.73" ry="5.73" fill="evenodd"/></svg>
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
	save,
} as any );
