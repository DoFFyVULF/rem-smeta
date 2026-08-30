export type ApartmentType = 'studio' | 'one' | 'two' | 'three' | 'four_plus';

export type RepairType = 'cosmetic' | 'capital' | 'designer' | 'turnkey';

export type ApartmentCondition =
  | 'new_no_finish'
  | 'white_box'
  | 'secondary_old'
  | 'after_cosmetic';

export type CityType = 'moscow' | 'spb' | 'other';

export type ExtraKey =
  | 'demolition'
  | 'electrical'
  | 'plumbing'
  | 'wallAlignment'
  | 'floorReplacement'
  | 'stretchCeiling'
  | 'bathroomTurnkey'
  | 'balconyTurnkey'
  | 'interiorDoors';

export interface ExtraWorks {
  demolition: boolean;
  electrical: boolean;
  plumbing: boolean;
  wallAlignment: boolean;
  floorReplacement: boolean;
  stretchCeiling: boolean;
  bathroomTurnkey: boolean;
  balconyTurnkey: boolean;
  interiorDoors: boolean;
}

export interface ContactForm {
  name: string;
  phone: string;
  comment: string;
  consent: boolean;
}

export interface CalculatorState {
  step: number;
  apartmentType: ApartmentType;
  area: number;
  rooms: number;
  bathrooms: number;
  balconies: number;
  doors: number;
  repairType: RepairType;
  condition: ApartmentCondition;
  extras: ExtraWorks;
  city: CityType;
  urgent: boolean;
  contact: ContactForm;
}

export interface CalculatorDraft extends CalculatorState {
  savedAt: number;
}

/** A single line in the price breakdown. */
export interface CalculationLine {
  key: string;
  label: string;
  amount: number;
  /** Visual emphasis (e.g. the base line). */
  emphasis?: boolean;
}

export interface TimelineResult {
  minWeeks: number;
  maxWeeks: number;
}

export interface CalculationResult {
  /** area * basePricePerSqm */
  base: number;
  /** base * conditionFactor */
  conditionPrice: number;
  /** area * sum(selected per-sqm extras) */
  extrasPerSqm: number;
  /** Base planirovka costs (bathrooms, balconies, doors) — always included */
  planirovkaBase: number;
  /** Additional turnkey extras on top of planirovka base */
  extrasFixed: number;
  /** conditionPrice + extrasPerSqm + extrasFixed */
  subtotal: number;
  cityFactor: number;
  cityAdjustment: number;
  urgentFactor: number;
  urgentAdjustment: number;
  /** subtotal * cityFactor * urgentFactor, rounded to roubles */
  total: number;
  minPrice: number;
  maxPrice: number;
  lines: CalculationLine[];
  timeline: TimelineResult;
}

export type StepErrors = Record<string, string>;
