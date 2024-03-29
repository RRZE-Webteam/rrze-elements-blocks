/**
 * WordPress dependencies
 */
import { Path, SVG } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { WPBlockVariation } from "@wordpress/blocks";

/** 
@typedef {import('@wordpress/blocks').WPBlockVariation} WPBlockVariation */

/**
 * Template option choices for predefined columns layouts.
 *
 * @type {WPBlockVariation[]}
 */
const variations = [
  {
    name: "notice-attention",
    title: __("Warning", "rrze-elements-b"),
    description: __("Warning", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --> */}
        <Path
          fill="#a51c18"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"
        ></Path>
      </SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-hinweis",
    title: __("Hint"),
    description: __("Notice with hint-icon", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!--! Font Awesome Free 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2022 Fonticons, Inc. --> */}
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM232 152C232 138.8 242.8 128 256 128s24 10.75 24 24v128c0 13.25-10.75 24-24 24S232 293.3 232 280V152zM256 400c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 385.9 273.4 400 256 400z"
        ></Path>
      </SVG>
    ),
    isDefault: true,
    innerBlocks: [["core/column"], ["core/column"]],
    scope: ["block"],
  },
  {
    name: "notice-baustelle",
    title: __("Maintenance", "rrze-elements-b"),
    description: __("Notice with wrench icon", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fill="#4b4a56"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M507.6 122.8c-2.904-12.09-18.25-16.13-27.04-7.338l-76.55 76.56l-83.1-.0002l0-83.1l76.55-76.56c8.791-8.789 4.75-24.14-7.336-27.04c-23.69-5.693-49.34-6.111-75.92 .2484c-61.45 14.7-109.4 66.9-119.2 129.3C189.8 160.8 192.3 186.7 200.1 210.1l-178.1 178.1c-28.12 28.12-28.12 73.69 0 101.8C35.16 504.1 53.56 512 71.1 512s36.84-7.031 50.91-21.09l178.1-178.1c23.46 7.736 49.31 10.24 76.17 6.004c62.41-9.84 114.6-57.8 129.3-119.2C513.7 172.1 513.3 146.5 507.6 122.8zM80 456c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24s24 10.74 24 24C104 445.3 93.25 456 80 456z"
        />
      </SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-question",
    title: __("Question", "rrze-elements-b"),
    description: __("Questionmark", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fill="#005cae"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"
        />
      </SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-minus",
    title: __("Negative", "rrze-elements-b"),
    description: __("Minus icon", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fill="#a51c18"
          fillRule="evenodd"
          d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM168 232C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H168z"
        />
      </SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-plus",
    title: __("Positive", "rrze-elements-b"),
    description: __("Plus-icon", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fill="#00905a"
          fillRule="evenodd"
          d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM256 368C269.3 368 280 357.3 280 344V280H344C357.3 280 368 269.3 368 256C368 242.7 357.3 232 344 232H280V168C280 154.7 269.3 144 256 144C242.7 144 232 154.7 232 168V232H168C154.7 232 144 242.7 144 256C144 269.3 154.7 280 168 280H232V344C232 357.3 242.7 368 256 368z"
        />
      </SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-idea",
    title: __("Idea", "rrze-elements-b"),
    description: __("Lightbulb icon", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fill="orange"
          fillRule="evenodd"
          d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM192 0C90.02 .3203 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.8 289.2 .0039 192 0zM288.4 260.1c-15.66 17.85-35.04 46.3-49.05 75.89h-94.61c-14.01-29.59-33.39-58.04-49.04-75.88C75.24 236.8 64 206.1 64 175.1C64 113.3 112.1 48.25 191.1 48C262.6 48 320 105.4 320 175.1C320 206.1 308.8 236.8 288.4 260.1zM176 80C131.9 80 96 115.9 96 160c0 8.844 7.156 16 16 16S128 168.8 128 160c0-26.47 21.53-48 48-48c8.844 0 16-7.148 16-15.99S184.8 80 176 80z"
        />
      </SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-download",
    title: __("Download", "rrze-elements-b"),
    description: __("Download-icon", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fillRule="evenodd"
          d="M480 352h-133.5l-45.25 45.25C289.2 409.3 273.1 416 256 416s-33.16-6.656-45.25-18.75L165.5 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h448c17.67 0 32-14.33 32-32v-96C512 366.3 497.7 352 480 352zM432 456c-13.2 0-24-10.8-24-24c0-13.2 10.8-24 24-24s24 10.8 24 24C456 445.2 445.2 456 432 456zM233.4 374.6C239.6 380.9 247.8 384 256 384s16.38-3.125 22.62-9.375l128-128c12.49-12.5 12.49-32.75 0-45.25c-12.5-12.5-32.76-12.5-45.25 0L288 274.8V32c0-17.67-14.33-32-32-32C238.3 0 224 14.33 224 32v242.8L150.6 201.4c-12.49-12.5-32.75-12.5-45.25 0c-12.49 12.5-12.49 32.75 0 45.25L233.4 374.6z"
        />
      </SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-faubox",
    title: __("FAUbox", "rrze-elements-b"),
    description: __("FAUbox-icon", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fillRule="evenodd"
          d="M144 480C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144zM303 392.1C312.4 402.3 327.6 402.3 336.1 392.1L416.1 312.1C426.3 303.6 426.3 288.4 416.1 279C407.6 269.7 392.4 269.7 383 279L344 318.1V184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184V318.1L256.1 279C247.6 269.7 232.4 269.7 223 279C213.7 288.4 213.7 303.6 223 312.1L303 392.1z"
        />
      </SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-audio",
    title: __("Audio", "rrze-elements-b"),
    description: __("Loudspeaker icon", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fillRule="evenodd"
          d="M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402c-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83c-10.28 8.396-11.78 23.5-3.375 33.74c4.719 5.806 11.62 8.802 18.56 8.802c5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1S435.1 200.4 412.6 182zM473.1 108.2c-10.22-8.334-25.34-6.898-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74c4.75 5.775 11.62 8.771 18.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zM534.4 33.4c-10.22-8.334-25.34-6.867-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zM301.2 34.98c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8C272.7 477 280.3 479.8 288 479.8c4.438 0 8.959-.9314 13.16-2.835C312.7 471.8 320 460.4 320 447.9V64.12C320 51.55 312.7 40.13 301.2 34.98z"
        />
      </SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-video",
    title: __("Video", "rrze-elements-b"),
    description: __("Video-icon", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fillRule="evenodd"
          d="M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z"
        />
      </SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-thumbs-up",
    title: __("Thumbs up", "rrze-elements-b"),
    description: __("Thumps up icon", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fill="#00905a"
          fillRule="evenodd"
          d="M128 447.1V223.1c0-17.67-14.33-31.1-32-31.1H32c-17.67 0-32 14.33-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64C113.7 479.1 128 465.6 128 447.1zM512 224.1c0-26.5-21.48-47.98-48-47.98h-146.5c22.77-37.91 34.52-80.88 34.52-96.02C352 56.52 333.5 32 302.5 32c-63.13 0-26.36 76.15-108.2 141.6L178 186.6C166.2 196.1 160.2 210 160.1 224c-.0234 .0234 0 0 0 0L160 384c0 15.1 7.113 29.33 19.2 38.39l34.14 25.59C241 468.8 274.7 480 309.3 480H368c26.52 0 48-21.47 48-47.98c0-3.635-.4805-7.143-1.246-10.55C434 415.2 448 397.4 448 376c0-9.148-2.697-17.61-7.139-24.88C463.1 347 480 327.5 480 304.1c0-12.5-4.893-23.78-12.72-32.32C492.2 270.1 512 249.5 512 224.1z"
        />
      </SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
  {
    name: "notice-thumbs-down",
    title: __("Thumbs down", "rrze-elements-b"),
    description: __("Thumbs down icon", "rrze-elements-b"),
    icon: (
      <SVG
        width="1em"
        height="1em"
        fontSize="2em"
        viewBox="0 0 512 512"
        className="rrze-elements-icon"
        // style="font-size: 2em; fill: currentcolor;"
        alt="Exclamation mark"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fill="#a51c18"
          fillRule="evenodd"
          d="M96 32.04H32c-17.67 0-32 14.32-32 31.1v223.1c0 17.67 14.33 31.1 32 31.1h64c17.67 0 32-14.33 32-31.1V64.03C128 46.36 113.7 32.04 96 32.04zM467.3 240.2C475.1 231.7 480 220.4 480 207.9c0-23.47-16.87-42.92-39.14-47.09C445.3 153.6 448 145.1 448 135.1c0-21.32-14-39.18-33.25-45.43C415.5 87.12 416 83.61 416 79.98C416 53.47 394.5 32 368 32h-58.69c-34.61 0-68.28 11.22-95.97 31.98L179.2 89.57C167.1 98.63 160 112.9 160 127.1l.1074 160c0 0-.0234-.0234 0 0c.0703 13.99 6.123 27.94 17.91 37.36l16.3 13.03C276.2 403.9 239.4 480 302.5 480c30.96 0 49.47-24.52 49.47-48.11c0-15.15-11.76-58.12-34.52-96.02H464c26.52 0 48-21.47 48-47.98C512 262.5 492.2 241.9 467.3 240.2z"
        />
      </SVG>
    ),
    innerBlocks: [["core/paragraph"]],
    scope: ["block"],
  },
];

export default variations;
