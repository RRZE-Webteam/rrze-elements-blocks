import { registerBlockType } from '@wordpress/blocks';

import Edit from './edit';
import metadata from './block.json';
import './editor.scss';
import { InnerBlocks } from '@wordpress/block-editor';

registerBlockType( metadata.name as any, {
	icon: {
		src: <svg id="a" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill="none" stroke="currentColor"><rect x="249.16" y="145.29" width="129.94" height="35.7" rx="5.73" ry="5.73" /><rect x="249.16" y="242.46" width="129.94" height="35.7" rx="5.73" ry="5.73"  /><rect x="249.16" y="335.9" width="129.94" height="35.7" rx="5.73" ry="5.73"  /><rect x="86.73" y="92.15" width="335.14" height="335.14" rx=".37" ry=".37" fill="none"  stroke-miterlimit="10" stroke-width="30"/><polyline points="148.11 160.82 167.95 180.66 202.99 145.62" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><polyline points="148.11 257.98 167.95 277.83 202.99 242.79" fill="none"   stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/><polyline points="148.11 351.43 167.95 371.27 202.99 336.23" fill="none"   stroke-linecap="round" stroke-linejoin="round" stroke-width="20"/></svg>
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
