/* eslint-disable no-undef */
/**
 * This script updates the version number for the main php file and all block.json files
 */

const fs = require("fs");
const packageJson = require("./package.json");

const updateVersion = (filePath, version) => {
  let fileContent = fs.readFileSync(filePath, "utf8");

  // Update the version number in the main plugin file
  if (filePath.endsWith("rrze-elements-blocks.php")) {
    // Refresh the version mentioned inside the WP Plugin comment
    fileContent = fileContent.replace(
      /Version:\s*\d+\.\d+\.\d+/,
      `Version:         ${version}`
    );

    // Refresh the version number for RRZE_ELEMENTSB_VERSION constant
    fileContent = fileContent.replace(
      /const RRZE_ELEMENTSB_VERSION = '\d+\.\d+\.\d+';/,
      `const RRZE_ELEMENTSB_VERSION = '${version}';`
    );
  }
  // Update the version number in all blocks
  else if (filePath.endsWith("block.json")) {
    const jsonContent = JSON.parse(fileContent);
    jsonContent.version = version;
    fileContent = JSON.stringify(jsonContent, null, 2);
  }

  fs.writeFileSync(filePath, fileContent, "utf8");
};

// Use the version number from package.json
const version = packageJson.version;

// Update the following files
const filesToUpdate = [
  "./rrze-elements-blocks.php",
  "./src/blocks/accordion/block.json",
  "./src/blocks/accordions/block.json",
  "./src/blocks/alert/block.json",
  "./src/blocks/collapse/block.json",
  "./src/blocks/block-blueprint/block.json",
  "./src/blocks/collapse/block.json",
  "./src/blocks/collapsibles/block.json",
  "./src/blocks/columns/block.json",
  "./src/blocks/contentwidthlimiter/block.json",
  "./src/blocks/cta/block.json",
  "./src/blocks/insertion/block.json",
  "./src/blocks/news/block.json",
  "./src/blocks/notice/block.json",
  "./src/blocks/tab/block.json",
  "./src/blocks/tabs/block.json",
  "./src/blocks/timeline/block.json",
  "./src/blocks/timeline-item/block.json",
  "./src/blocks/counter/block.json",
  "./src/blocks/counter-row/block.json",
  "./src/blocks/iconbox/block.json",
];

filesToUpdate.forEach((filePath) => updateVersion(filePath, version));