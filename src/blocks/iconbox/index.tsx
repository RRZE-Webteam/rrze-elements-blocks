import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './editor.scss';
import { InnerBlocks } from '@wordpress/block-editor';
import deprecated from './deprecated';

registerBlockType( metadata.name as any, {
	icon: {
		src: <svg id="a" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect x="60.05" y="210.12" width="99.56" height="91.77" rx="5.73" ry="5.73" fill="evenodd"/><rect x="193.32" y="265.52" width="201.21" height="11.8" rx="5.73" ry="5.73" fill="#27348b"/><rect x="193.32" y="227.37" width="201.21" height="22.11" rx="5.73" ry="5.73" fill="evenodd"/><g opacity=".2"><rect x="144.75" y="210.12" width="298.34" height="91.77" rx="5.73" ry="5.73" fill="#27348b"/></g><path d="M116.18,225.85h3.75c1.09,0,1.99.35,2.7,1.05s1.05,1.6,1.05,2.7-.35,1.99-1.05,2.7-1.6,1.05-2.7,1.05v15.59c0,1.41.39,2.7,1.17,3.87l12.66,20.62c.78,1.33,1.17,2.77,1.17,4.34-.08,2.26-.86,4.18-2.34,5.74-1.56,1.48-3.48,2.26-5.74,2.34h-36.33c-2.27-.08-4.18-.86-5.74-2.34-1.49-1.56-2.27-3.48-2.34-5.74,0-1.56.39-3.01,1.17-4.34l12.77-20.62c.7-1.17,1.05-2.46,1.05-3.87v-15.59c-1.09,0-1.99-.35-2.7-1.05s-1.05-1.6-1.05-2.7.35-1.99,1.05-2.7,1.6-1.05,2.7-1.05h18.75ZM104.93,248.94c0,2.81-.74,5.43-2.23,7.85l-3.98,6.56h20.04l-4.1-6.56c-1.49-2.42-2.23-5.04-2.23-7.85v-15.59h-7.5v15.59Z" fill="#fff"/></svg>
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
	save: () => <InnerBlocks.Content />,
  deprecated
} as any );
