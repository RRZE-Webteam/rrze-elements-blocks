/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import { createBlock } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';
import './editor.scss';

interface ShortcodeAttributes {
    named: {
        style?: string;
        title?: string;
		color?: string;
    };
	content: string;
    numeric: any[];
}

interface ShortcodeTransformAttributes {
    named: {
      style?: string;
      title?: string;
    };
    style: string;
    content: string;
}

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( metadata.name as any, {
	/**
	 * Used to construct a preview for the block to be shown in the block inserter.
	 */
	icon: {
		src: <svg id="Ebene_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect x="75.86" y="231.31" width="360.28" height="49.39" rx="5.73" ry="5.73" fillRule="evenodd" strokeWidth="0"/></svg>
	},
	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
	transforms: {
		from: [
			{
				type: "shortcode",
				tag: "alert",
				attributes: {
					style: {
						type: "string",
						shortcode: (attrs: ShortcodeAttributes) => {
							if (
								["success", "danger", "default", "info", "warning"].includes(attrs.named.style)
							) {
								return attrs.named.style;
							} else {
								return "info";
							}
						}
					},
					content: {
                        type: "string",
                        shortcode: (attrs: ShortcodeAttributes, { content }: { content: string }) => {
                            return content;
                        },
                    },
				},
				transform: (attributes: ShortcodeTransformAttributes, data: any) => {
					// console.log('Transforming content:', attributes);
					// console.log('transformation data:', data);
					let cleanData = data.shortcode?.content.replace(/<\/?p>/g, "");
          const styleChoice = (style: string) => {
            switch (style) {
              case "success":
                return "success";
              case "danger":
                return "danger";
              case "default":
                return "default";
              case "info":
                return "info";
              case "warning":
                return "warning";
              case "example":
                return "example";
              default:
                return "";
            }
          }
					// console.log('cleaned data:', cleanData);
                    const blockContent = createBlock('core/freeform', {
                        content: cleanData,
                    });
                    return createBlock(metadata.name, {
                        style: styleChoice(attributes.named.style),
                        title: attributes.named.title,
                    }, [blockContent]);
                },

			}
		]
	}
}as any );
