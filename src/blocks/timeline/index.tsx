import { registerBlockType } from "@wordpress/blocks";
import "./editor.scss";

import Edit from "./edit";
import save from "./save";
import metadata from "./block.json";
import deprecated from "./deprecated";
import { InnerBlocks } from "@wordpress/block-editor";

registerBlockType(
	metadata.name as any,
	{
		icon: {
			src: (
				<svg
					id="Ebene_1"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
				>
					<rect
						x="199.53"
						y="-23.79"
						width="112.94"
						height="280.62"
						rx="5.73"
						ry="5.73"
						transform="translate(372.52 -139.48) rotate(90)"
						fillRule="evenodd"
					/>
					<rect
						x="199.53"
						y="115.69"
						width="112.94"
						height="280.62"
						rx="5.73"
						ry="5.73"
						transform="translate(512) rotate(90)"
						fillRule="evenodd"
					/>
					<rect
						x="199.53"
						y="255.17"
						width="112.94"
						height="280.62"
						rx="5.73"
						ry="5.73"
						transform="translate(651.48 139.48) rotate(90)"
						fillRule="evenodd"
					/>
					<line
						x1="80.6"
						y1="62.76"
						x2="80.6"
						y2="451.28"
						fill="none"
						stroke="black"
						strokeLinecap="round"
						strokeMiterlimit="10"
						strokeWidth="8"
					/>
					<rect
						x="66.87"
						y="73.88"
						width="27.46"
						height="27.46"
						rx="11.29"
						ry="11.29"
						fillRule="evenodd"
					/>
					<rect
						x="66.87"
						y="214.88"
						width="27.46"
						height="27.46"
						rx="11.29"
						ry="11.29"
						fillRule="evenodd"
					/>
					<rect
						x="66.87"
						y="352.85"
						width="27.46"
						height="27.46"
						rx="11.29"
						ry="11.29"
						fillRule="evenodd"
					/>
				</svg>
			),
		},
		// @see ./edit.js
		edit: Edit,

		// @see ./save.js
		save: () => <InnerBlocks.Content />,
    deprecated
	} as any,
);
