import type { ReactNode } from 'react';
import { OptionCard } from './OptionCard';

interface RadioCardProps {
  selected: boolean;
  onSelect: () => void;
  title: string;
  description?: string;
  /** Structured spec tiles rendered at the bottom of the card. */
  specs: { label: string; value: ReactNode }[];
  icon?: ReactNode;
  disabled?: boolean;
  name: string;
}

/**
 * Radio-style selectable card.
 *
 * Thin wrapper over the unified OptionCard. The `specs` prop is now required
 * so that every card in a grid row has the same structure (icon / title /
 * description / metrics / indicator) and therefore the same height.
 */
export function RadioCard({
  selected,
  onSelect,
  title,
  description,
  specs,
  icon,
  disabled,
  name,
}: RadioCardProps) {
  return (
    <OptionCard
      mode="radio"
      selected={selected}
      onToggle={onSelect}
      title={title}
      description={description}
      specs={specs}
      icon={icon}
      disabled={disabled}
    />
  );
}
