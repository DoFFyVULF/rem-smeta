import type { ReactNode } from 'react';
import { OptionCard } from './OptionCard';

interface CheckboxCardProps {
  checked: boolean;
  onChange: () => void;
  title: string;
  description?: string;
  /** Structured spec tiles rendered at the bottom of the card. */
  specs: { label: string; value: ReactNode }[];
  icon?: ReactNode;
  disabled?: boolean;
  id: string;
}

/**
 * Checkbox-style selectable card.
 *
 * Thin wrapper over the unified OptionCard. The `specs` prop is now required
 * so that every card in a grid row has the same structure (icon / title /
 * description / metrics / indicator) and therefore the same height.
 */
export function CheckboxCard({
  checked,
  onChange,
  title,
  description,
  specs,
  icon,
  disabled,
  id,
}: CheckboxCardProps) {
  return (
    <OptionCard
      mode="checkbox"
      id={id}
      selected={checked}
      onToggle={onChange}
      title={title}
      description={description}
      specs={specs}
      icon={icon}
      disabled={disabled}
    />
  );
}
