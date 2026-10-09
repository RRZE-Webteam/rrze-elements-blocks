import { Button } from '@wordpress/components';
import type { ComponentProps } from 'react';
import './variation-picker.scss';

export interface NoticeVariation {
  name: string;
  title: string;
  description?: string;
  icon?: ComponentProps<typeof Button>['icon'];
  iconClass?: string;
}

interface VariationPickerProps {
  variations: NoticeVariation[];
  selectedName?: string;
  onSelect: (variation: NoticeVariation) => void;
}

export default function VariationPicker({ variations, selectedName, onSelect }: VariationPickerProps) {
  return (
    <div className="rrze-notice-variation-picker">
      {variations.map((variation) => (
        <Button
          key={variation.name}
          type="button"
          className="rrze-notice-variation-picker__option"
          variant="secondary"
          icon={variation.icon}
          title={variation.description}
          isPressed={selectedName === variation.name}
          aria-pressed={selectedName === variation.name}
          onClick={() => onSelect(variation)}
        >
          {variation.title}
        </Button>
      ))}
    </div>
  );
}
