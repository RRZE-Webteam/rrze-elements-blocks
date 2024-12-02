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
  "./src/accordion/block.json",
  "./src/accordions/block.json",
  "./src/alert/block.json",
  "./src/collapse/block.json",
  "./src/block-blueprint/block.json",
  "./src/collapse/block.json",
  "./src/collapsibles/block.json",
  "./src/columns/block.json",
  "./src/contentwidthlimiter/block.json",
  "./src/cta/block.json",
  "./src/insertion/block.json",
  "./src/news/block.json",
  "./src/notice/block.json",
  "./src/tab/block.json",
  "./src/tabs/block.json",
  "./src/timeline/block.json",
  "./src/timeline-item/block.json",
]; // usw.

filesToUpdate.forEach((filePath) => updateVersion(filePath, version));