
# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

 ## [1.0.9] - 2024-10-10
 
Accessibility improvements for the Accordion-Block inside the Frontend.
 
### Fixed
- Fixed a11y-issues like missing aria-Tags and roles for full Voice Over Support. The script follows the a11y-Update from the RRZE Element suite, still sharing the same JS for backwards compatibility.

### Added
- German Formal Translation for better coverage

 ## [1.0.8] - 2024-08-09
 
Quality of Life improvements
 
### Updated
- [Updated #143](https://github.com/RRZE-Webteam/rrze-elements-blocks/issues/143)
  Further improved the automatic block transforms for Accordions

### Fixed
- [Fixed #151](https://github.com/RRZE-Webteam/rrze-elements-blocks/issues/151)
  Fixed an issue, where the Font size was not applied to Icon boxes.
- [Fixed #150](https://github.com/RRZE-Webteam/rrze-elements-blocks/issues/150)
  Fixed the translation & Minor Usablity Issues inside all Elements Blocks

### Removed
- Removed the starter templates for patterns, waiting for the new design in 2025 to establish the feature.

## [1.0.7] - 2024-07-12
 
Improvements for the Accordion & Collapsible-Blocks. UI-Improvements
 
### Added
- [Added #143](https://github.com/RRZE-Webteam/rrze-elements-blocks/issues/143)
  Added Block Transforms for nested Accordions, Accordion-Elements and inner Accordions. Also added a prompt window to ask users, if accordions were detected in a correct manner and if users want to proceed.

### Fixed
- [Fixed #140](https://github.com/RRZE-Webteam/rrze-elements-blocks/issues/140)
  Fixed an Issue where the Accordion Title was invisible after title was deleted.
- [Fixed #146 & #137 ](https://github.com/RRZE-Webteam/rrze-elements-blocks/issues/146)
  Fixed missing Translation inside the Accordion & Collapsible-Blocks
- [Fixed #141](https://github.com/RRZE-Webteam/rrze-elements-blocks/issues/141)
  Resolved PHP-Warning "Undefined array key "isPHP" for Pattern registration
- [Fixed #144](https://github.com/RRZE-Webteam/rrze-elements-blocks/issues/144)
  Resolved an Error where drag & drop of several Accordion items caused an Error and frozen Editor

### Removed
- [Removed #144](https://github.com/RRZE-Webteam/rrze-elements-blocks/issues/144)
  Removed the old automatic jump link generation. Jump links are now generated via the cut-off block-id to reduce calculations on block interaction. Elements-Accordions generated via Shortcode won't be dynamically transformed


Older Versions are tracked via GitHub Releases but not listed inside this File.