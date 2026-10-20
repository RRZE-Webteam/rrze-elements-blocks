import {
  BlockControls, HeadingLevelDropdown, InspectorControls, RichText,
  useBlockProps, useInnerBlocksProps, store as blockEditorStore,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

interface SliderAttributes {
  title: string;
  cardHeight: number;
  headingLevel: HeadingLevel;
}

interface EditProps {
  attributes: SliderAttributes;
  setAttributes: (attributes: Partial<SliderAttributes>) => void;
  clientId: string;
}

/**
 * Edits original cards in their saved order and centers the selected card.
 *
 * @param props - Block attributes, updater and editor instance ID.
 * @returns The editable slider with shared height controls.
 */
export default function Edit({ attributes, setAttributes, clientId }: EditProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const { selectedCardId, cardIds } = useSelect((select) => {
    const editor = select(blockEditorStore);
    const ids = editor.getBlockOrder(clientId);
    const selectedId = editor.getSelectedBlockClientId();
    const parents = selectedId ? editor.getBlockParents(selectedId) : [];
    return {
      cardIds: ids,
      selectedCardId: ids.find((id: string) => id === selectedId || parents.includes(id)),
    };
  }, [clientId]);
  const sectionProps = useBlockProps({
    className: 'rrze-elements-blocks__content-slider',
    'data-slider-editor': true,
  });
  const innerProps = useInnerBlocksProps({
    className: 'rrze-elements-blocks__content-slider-track',
  }, {
    allowedBlocks: ['rrze-elements/info-card'],
    orientation: 'horizontal',
    template: [
      ['rrze-elements/info-card', {}],
      ['rrze-elements/info-card', {}],
      ['rrze-elements/info-card', {}],
    ],
  });

  /**
   * Keeps editor scrolling local, without moving the document vertically.
   *
   * @param id - Client ID of a direct child card.
   */
  function centerCard(id: string) {
    const viewport = viewportRef.current;
    const card = viewport?.querySelector<HTMLElement>(`[data-block="${id}"]`);
    if (!viewport || !card) return;
    viewport.querySelectorAll('.rrze-elements-blocks__content-slider-track > .rrze-elements-blocks__info-card')
      .forEach((slide) => slide.toggleAttribute('data-slider-active', slide === card));
    viewport.scrollTo({
      left: viewport.scrollLeft + card.getBoundingClientRect().left
        - viewport.getBoundingClientRect().left + (card.offsetWidth - viewport.clientWidth) / 2,
      behavior: 'instant',
    });
  }

  const firstCardId = cardIds[0];
  useEffect(() => {
    if (selectedCardId || firstCardId) centerCard(selectedCardId || firstCardId);
  }, [selectedCardId, firstCardId]);

  /**
   * Previews adjacent cards without changing their selection or saved order.
   *
   * @param direction - Previous (-1) or next (1) card.
   */
  function navigate(direction: number) {
    const viewport = viewportRef.current;
    if (!viewport || !cardIds.length) return;
    const middle = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
    let nearest = 0;
    let distance = Infinity;
    cardIds.forEach((id: string, index: number) => {
      const card = viewport.querySelector<HTMLElement>(`[data-block="${id}"]`);
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const delta = Math.abs(rect.left + rect.width / 2 - middle);
      if (delta < distance) { nearest = index; distance = delta; }
    });
    centerCard(cardIds[(nearest + direction + cardIds.length) % cardIds.length]);
  }

  return <>
    <InspectorControls>
      <PanelBody title={__('Inhalts-Slider', 'rrze-elements-blocks')}>
        <RangeControl
          label={__('Kartenhöhe (px)', 'rrze-elements-blocks')}
          help={__('Gilt für alle Karten in diesem Slider. Die Breite passt sich automatisch an.', 'rrze-elements-blocks')}
          value={attributes.cardHeight}
          min={350} max={680}
          onChange={(value) => setAttributes({ cardHeight: value ?? 480 })}
        />
        <p>{__('Im Frontend läuft der Slider endlos. Hier bearbeitest du jede Karte einmal in ihrer ursprünglichen Reihenfolge.', 'rrze-elements-blocks')}</p>
      </PanelBody>
    </InspectorControls>
    <BlockControls group="block">
      <HeadingLevelDropdown value={attributes.headingLevel} options={[2, 3, 4, 5, 6]}
        onChange={(headingLevel: HeadingLevel) => setAttributes({ headingLevel })} />
    </BlockControls>
    <section {...sectionProps}>
      <RichText tagName={`h${attributes.headingLevel}`}
        className="rrze-elements-blocks__content-slider-heading"
        placeholder={__('Überschrift ergänzen …', 'rrze-elements-blocks')}
        value={attributes.title} allowedFormats={[]}
        onChange={(title) => setAttributes({ title })} />
      <div className="rrze-elements-blocks__content-slider-viewport" ref={viewportRef}>
        <div {...innerProps} />
      </div>
      <div className="rrze-elements-blocks__content-slider-navigation">
        <button type="button" aria-label={__('Vorherige Karte', 'rrze-elements-blocks')}
          onClick={() => navigate(-1)} disabled={cardIds.length < 2}>←</button>
        <button type="button" aria-label={__('Nächste Karte', 'rrze-elements-blocks')}
          onClick={() => navigate(1)} disabled={cardIds.length < 2}>→</button>
      </div>
    </section>
  </>;
}
