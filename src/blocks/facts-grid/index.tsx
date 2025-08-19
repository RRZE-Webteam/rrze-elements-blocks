import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import metadata from './block.json';
import './editor.scss';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType( metadata.name as any, {
	icon: {
		src: <svg id="a" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect x="241.88" y="91.64" width="188.73" height="51.85" rx="5.73" ry="5.73" fill="currentColor"/><rect x="241.88" y="232.78" width="188.73" height="51.85" rx="5.73" ry="5.73" fill="currentColor" /><rect x="241.88" y="368.5" width="188.73" height="51.85" rx="5.73" ry="5.73" fill="currentColor" /><polyline points="95.11 114.2 123.93 143.02 174.82 92.12" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><polyline points="95.11 255.32 123.93 284.16 174.82 233.26" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><polyline points="95.11 391.06 123.93 419.88 174.82 368.98" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg>
	},
	__experimentalLabel: (attributes: any, { context }: any) => {
		const { title } = attributes;

		if (context === 'list-view' && title) {
			return title;
		}
	},
	// @see ./edit.js
	edit: Edit,

	// @see ./save.js
	save: () => <InnerBlocks.Content />,
} as any );
