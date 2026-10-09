[![Aktuelle Version](https://img.shields.io/github/package-json/v/rrze-webteam/rrze-elements-blocks/main?label=Version)](https://github.com/RRZE-Webteam/rrze-elements-blocks) [![Release Version](https://img.shields.io/github/v/release/rrze-webteam/rrze-elements-blocks?label=Release+Version)](https://github.com/rrze-webteam/rrze-elements-blocks/releases/) [![GitHub License](https://img.shields.io/github/license/rrze-webteam/rrze-elements-blocks)](https://github.com/RRZE-Webteam/rrze-elements-blocks) [![GitHub issues](https://img.shields.io/github/issues/RRZE-Webteam/rrze-elements-blocks)](https://github.com/RRZE-Webteam/rrze-elements-blocks/issues)
![GitHub milestone details](https://img.shields.io/github/milestones/progress-percent/RRZE-Webteam/RRZE-Elements-blocks/36)
![GitHub milestone details](https://img.shields.io/github/milestones/progress-percent/RRZE-Webteam/RRZE-Elements-blocks/37)

# RRZE Elements Blocks
RRZE Elements Blocks ermöglicht die Nutzung der RRZE Elements-Suite im Gutenberg BlockEditor. Die folgenden Elemente / Blöcke werden unterstützt:

- Accordion + Inner Accordion
- Content Width Limiter
- Tabs
- Insertion
- Fluid Text Columns
- IconBox & Counter
- Custom News (Falls Elements aktiviert ist)
- Call to Action Box
- Notice
- Alert (Hinweisbox)

## Dokumentation
Die Nutzerdokumentation ist selbsterklärend und bei der Nutzung des Blocks ersichtlich, bzw. in den BlockEinstellungen enthalten.

## Entwicklung
Tipps zur Entwicklung finden sich unter /docs

## Bestehende Icon-Shortcodes

Die Übernahme von `[icon]` und `[list-icons]` aus RRZE Elements und das zugehörige FontAwesome→Material-Symbols-Mapping sind vorerst standardmäßig deaktiviert. Vorhandene Shortcode-Handler bleiben zuständig.

Bei expliziter Aktivierung der Familie `icon` werden diese Shortcodes unterstützt:

```text
[icon icon="solid pencil" style="2x, border" color="fau" alt="Bearbeiten"]
[list-icons icon="check" color="#04316a"]<ul><li>Listenpunkt</li></ul>[/list-icons]
```

Die alten Namen werden ausschließlich über `src/_shared/icons/sprites/material-symbols/mapping/fontAwesome6ToMaterialSymbols.json` auf lokal vorhandene Material Symbols abgebildet. Die Präfixe `solid`, `regular` und `brands` werden weiterhin akzeptiert; die Darstellung verwendet immer Material Symbols. Es gibt keinen Font-Awesome-Fallback und keine automatische Namenssuche. Fehlende Zuordnungen oder SVG-Dateien ergeben „Icon not found.“; Listeninhalte bleiben erhalten. Das betrifft auch Markenlogos ohne Zuordnung.

`[icon]` unterstützt weiterhin `2x` bis `5x`, `border`, `pull-left`, `pull-right`, Fakultätsfarben und Hexfarben. Ohne `alt` ist das Icon dekorativ, mit `alt` erhält es einen zugänglichen Namen. `[list-icons]` ersetzt die Aufzählungszeichen ungeordneter Listen; vorhandene Klassen und Attribute bleiben erhalten.

Die Familie `icon` lässt sich über `rrze_elements_blocks_legacy_shortcode_families` explizit aktivieren. Shortcodes anderer Plugins werden nicht überschrieben.

## Fehler melden & Feedback
Feedback und Fehler können als Issue im GitHub Repository oder als E-Mail an webmaster@fau.de mit Betreff "Elements-Blocks" gemeldet werden.

Vgl. https://www.wordpress.rrze.fau.de/plugins/elements/
