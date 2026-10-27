# EU AI labelling icons

Source: [European Commission: EU Icons for labelling AI-generated content](https://digital-strategy.ec.europa.eu/en/policies/eu-icons-labelling-ai-generated-content), retrieved 2026-10-27.

Official SVG archive: <https://ec.europa.eu/newsroom/dae/redirection/document/129546>.

The source page's licence permits everyone to use the icons freely without attribution to the Commission or the AI Office.

| Bundled asset in `src/_shared/icons/symbols/` | Original filename |
| --- | --- |
| `eu-ai.svg` | `LABEL_AI_black.svg` |
| `eu-ai-generated.svg` | `LABEL_AI GENERATED_black.svg` |
| `eu-ai-modified.svg` | `LABEL_AI MODIFIED_black.svg` |

The plugin uses the opaque black versions with white lettering. Path data, geometry and viewBoxes are unchanged. XML metadata, editor IDs and embedded CSS were removed; the original class rules were converted to explicit `fill` and `fill-rule` attributes. Explicit black fills prevent inherited theme colors from obscuring the white lettering. No fonts or external resources are needed.

The frontend sprite and editor previews preserve the original proportions, including the wide text labels. The shared picker stores canonical `eu-ai*` names in its existing `materialSymbol` attribute. EU labels appear only for searches containing an explicit `ai` or `ki` term (including names such as `eu-ai-modified`), never in the default grid or for substring matches such as `mail`. The shortcode additionally accepts the three unprefixed `ai*` aliases. Existing Material Symbols and Font Awesome mappings are unchanged.
