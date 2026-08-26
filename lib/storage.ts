import { STORAGE_KEY } from './constants';
import type { CalculatorDraft, CalculatorState } from './types';

function hasWindow(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Persist a draft. Per the brief (section 42) we store the step and chosen
 * parameters but deliberately drop the phone number until consent is given.
 */
export function saveDraft(state: CalculatorState): void {
  if (!hasWindow()) return;
  try {
    const draft: CalculatorDraft = {
      ...state,
      contact: { ...state.contact, phone: '' },
      savedAt: Date.now(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    /* storage may be unavailable (private mode / quota) — fail silently */
  }
}

export function loadDraft(): CalculatorState | null {
  if (!hasWindow()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CalculatorState>;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as CalculatorState;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  if (!hasWindow()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function hasDraft(): boolean {
  if (!hasWindow()) return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}
