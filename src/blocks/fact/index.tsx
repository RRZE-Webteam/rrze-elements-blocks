import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import metadata from './block.json';
import './editor.scss';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType( metadata.name as any, {
	icon: {
		src: <svg id="a" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect x="68.16" y="64.1" width="171.82" height="188.56" rx="5.73" ry="5.73" transform="translate(312.45 4.32) rotate(90)" fill="evenodd"/><g opacity=".25"><rect x="68.16" y="251.45" width="171.82" height="188.56" rx="5.73" ry="5.73" transform="translate(499.8 191.67) rotate(90)" fill="evenodd"/></g><g opacity=".25"><rect x="274.84" y="64.1" width="171.82" height="188.56" rx="5.73" ry="5.73" transform="translate(519.13 -202.37) rotate(90)" fill="evenodd"/></g><g opacity=".25"><rect x="274.84" y="253.71" width="171.82" height="188.56" rx="5.73" ry="5.73" transform="translate(708.74 -12.76) rotate(90)" fill="evenodd"/></g></svg>
	},
	__experimentalLabel: (attributes: any, { context }: any) => {
		const { description } = attributes;

		if (context === 'list-view' && description) {
			return description;
		}
	},
	// @see ./edit.js
	edit: Edit,

	// @see ./save.js
	save: () => <InnerBlocks.Content />,
} as any );
