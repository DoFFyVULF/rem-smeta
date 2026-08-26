import { AREA_MAX, AREA_MIN } from './constants';
import type { CalculatorState, StepErrors } from './types';

export type { StepErrors } from './types';

/** Strip everything but digits, then validate a Russian phone number. */
export function digitsOnly(value: string): string {
  return value.replace(/\D/g, '');
}

export function isValidPhone(value: string): boolean {
  const d = digitsOnly(value);
  if (d.length === 11 && (d.startsWith('7') || d.startsWith('8'))) return true;
  if (d.length === 10) return true; // local number without country code
  return false;
}

export function isValidName(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 2) return false;
  // Allow Cyrillic and Latin letters, spaces, hyphens; reject digits.
  return /^[\p{L}\s-]+$/u.test(trimmed);
}

/** Validate the contact form on the final step. */
export function validateContact(state: CalculatorState): StepErrors {
  const errors: StepErrors = {};
  if (!isValidName(state.contact.name)) {
    errors.name = 'Укажите имя (минимум 2 буквы)';
  }
  if (!isValidPhone(state.contact.phone)) {
    errors.phone = 'Укажите корректный номер телефона';
  }
  if (!state.contact.consent) {
    errors.consent = 'Для отправки нужно согласие на обработку данных';
  }
  return errors;
}

/** Validate the whole calculator state for the current step. */
export function validateStep(state: CalculatorState, step: number): StepErrors {
  const errors: StepErrors = {};

  if (step === 1) {
    if (state.area < AREA_MIN || state.area > AREA_MAX) {
      // Non-fatal warnings are handled separately; here we only block on type.
      if (state.area < AREA_MIN) errors.area = `Укажите площадь от ${AREA_MIN} м²`;
      if (state.area > AREA_MAX) errors.area = `Для площади больше ${AREA_MAX} м² нужен индивидуальный расчёт`;
    }
  }

  if (step === 5) {
    return validateContact(state);
  }

  return errors;
}

export function isStepValid(state: CalculatorState, step: number): boolean {
  return Object.keys(validateStep(state, step)).length === 0;
}

export function clampArea(value: number): number {
  if (Number.isNaN(value)) return AREA_MIN;
  return Math.min(AREA_MAX, Math.max(1, Math.round(value)));
}
