import type {
  ApartmentType,
  ApartmentCondition,
  CalculatorState,
  CityType,
  ExtraKey,
  ExtraWorks,
  RepairType,
} from './types';

/* ------------------------------------------------------------------ */
/* Numeric pricing constants (per the brief, section 25)              */
/* ------------------------------------------------------------------ */

export const BASE_PRICES: Record<RepairType, number> = {
  cosmetic: 5500,
  capital: 11000,
  designer: 21000,
  turnkey: 15000,
};

export const CONDITION_FACTORS: Record<ApartmentCondition, number> = {
  new_no_finish: 1.0,
  white_box: 0.9,
  secondary_old: 1.15,
  after_cosmetic: 0.85,
};

export const CITY_FACTORS: Record<CityType, number> = {
  moscow: 1.2,
  spb: 1.1,
  other: 1.0,
};

export const URGENT_FACTOR = 1.15;

/** Extras billed per square metre. */
export const EXTRA_PER_SQM: Partial<Record<ExtraKey, number>> = {
  demolition: 850,
  electrical: 1250,
  plumbing: 950,
  wallAlignment: 900,
  floorReplacement: 950,
  stretchCeiling: 650,
};

/** Extras billed as a fixed amount per unit (bathroom / balcony / door). */
export const EXTRA_FIXED = {
  bathroomTurnkey: 95000,
  balconyTurnkey: 35000,
  interiorDoors: 7500,
} as const;

export const AREA_MIN = 18;
export const AREA_MAX = 250;
export const STEP_COUNT = 5;
export const STORAGE_KEY = 'remsmeta-calculator-state';

/* ------------------------------------------------------------------ */
/* Metadata: option lists with human-readable labels (Russian)        */
/* ------------------------------------------------------------------ */

export interface OptionMeta<T extends string> {
  id: T;
  label: string;
  description: string;
}

export const APARTMENT_TYPES: Array<
  OptionMeta<ApartmentType> & {
    rooms: number;
    bathrooms: number;
    balconies: number;
  }
> = [
  {
    id: 'studio',
    label: 'Студия',
    description: 'Единое пространство без перегородок',
    rooms: 1,
    bathrooms: 1,
    balconies: 0,
  },
  {
    id: 'one',
    label: '1-комнатная квартира',
    description: 'Спальня и совмещённая гостиная',
    rooms: 1,
    bathrooms: 1,
    balconies: 1,
  },
  {
    id: 'two',
    label: '2-комнатная квартира',
    description: 'Две изолированные комнаты',
    rooms: 2,
    bathrooms: 1,
    balconies: 1,
  },
  {
    id: 'three',
    label: '3-комнатная квартира',
    description: 'Три комнаты и два санузла',
    rooms: 3,
    bathrooms: 2,
    balconies: 1,
  },
  {
    id: 'four_plus',
    label: '4+ комнатная квартира',
    description: 'Просторная планировка',
    rooms: 4,
    bathrooms: 2,
    balconies: 2,
  },
];

export const REPAIR_TYPES: Array<
  OptionMeta<RepairType> & { priceFrom: number; weeks: [number, number] }
> = [
  {
    id: 'cosmetic',
    label: 'Косметический ремонт',
    description:
      'Обновление отделки без капитальных изменений: обои, покраска, замена напольного покрытия, обновление потолков.',
    priceFrom: 5500,
    weeks: [4, 6],
  },
  {
    id: 'capital',
    label: 'Капитальный ремонт',
    description:
      'Полное обновление квартиры: замена электрики, сантехники, выравнивание стен и пола, новые покрытия.',
    priceFrom: 11000,
    weeks: [8, 12],
  },
  {
    id: 'designer',
    label: 'Дизайнерский ремонт',
    description:
      'Ремонт по индивидуальному дизайн-проекту со сложными решениями, нестандартными материалами и повышенной детализацией.',
    priceFrom: 21000,
    weeks: [12, 20],
  },
  {
    id: 'turnkey',
    label: 'Ремонт под ключ',
    description:
      'Комплексный ремонт с организацией работ, закупкой материалов и финальной уборкой.',
    priceFrom: 15000,
    weeks: [8, 14],
  },
];

export const CONDITIONS: OptionMeta<ApartmentCondition>[] = [
  {
    id: 'new_no_finish',
    label: 'Новостройка без отделки',
    description: 'Черновая отделка: нет финальных покрытий, нужна полная подготовка.',
  },
  {
    id: 'white_box',
    label: 'Новостройка white box',
    description: 'Часть черновых работ уже выполнена: стены и пол частично подготовлены.',
  },
  {
    id: 'secondary_old',
    label: 'Вторичка с ремонтом',
    description: 'Нужно демонтировать старую отделку и обновить инженерные решения.',
  },
  {
    id: 'after_cosmetic',
    label: 'Квартира после косметического ремонта',
    description: 'Капитальные работы не нужны, только обновление части покрытий.',
  },
];

export const CITIES: OptionMeta<CityType>[] = [
  { id: 'moscow', label: 'Москва', description: 'Коэффициент 1.2' },
  { id: 'spb', label: 'Санкт-Петербург', description: 'Коэффициент 1.1' },
  { id: 'other', label: 'Другой город', description: 'Коэффициент 1.0' },
];

export type ExtraKind = 'perSqm' | 'fixedBathroom' | 'fixedBalcony' | 'fixedDoor';

export interface ExtraMeta extends OptionMeta<ExtraKey> {
  /** Short price label shown on the card. */
  priceLabel: string;
  kind: ExtraKind;
  /** Only offer this extra when the apartment condition is in this list. */
  availableFor?: ApartmentCondition[];
}

export const EXTRA_WORKS: ExtraMeta[] = [
  {
    id: 'demolition',
    label: 'Демонтаж старой отделки',
    description: 'Демонтаж старых покрытий, подготовка квартиры к ремонту.',
    priceLabel: '+ 850 ₽/м²',
    kind: 'perSqm',
    availableFor: ['secondary_old'],
  },
  {
    id: 'electrical',
    label: 'Полная замена электрики',
    description: 'Новые розетки, выключатели, освещение, щиток, прокладка кабеля.',
    priceLabel: '+ 1 250 ₽/м²',
    kind: 'perSqm',
  },
  {
    id: 'plumbing',
    label: 'Замена сантехники и труб',
    description: 'Замена труб, разводка санузла, установка сантехнических выводов.',
    priceLabel: '+ 950 ₽/м²',
    kind: 'perSqm',
  },
  {
    id: 'wallAlignment',
    label: 'Выравнивание стен',
    description: 'Штукатурка, шпаклевка, подготовка стен под обои или покраску.',
    priceLabel: '+ 900 ₽/м²',
    kind: 'perSqm',
  },
  {
    id: 'floorReplacement',
    label: 'Замена напольного покрытия',
    description: 'Ламинат, кварцвинил, линолеум, плинтусы, подложка.',
    priceLabel: '+ 950 ₽/м²',
    kind: 'perSqm',
  },
  {
    id: 'stretchCeiling',
    label: 'Натяжные потолки',
    description: 'Материал и монтаж.',
    priceLabel: '+ 650 ₽/м²',
    kind: 'perSqm',
  },
  {
    id: 'bathroomTurnkey',
    label: 'Санузел под ключ',
    description: 'Плитка, гидроизоляция, разводка, установка сантехники.',
    priceLabel: '+ 95 000 ₽ / санузел',
    kind: 'fixedBathroom',
  },
  {
    id: 'balconyTurnkey',
    label: 'Балкон под ключ',
    description: 'Утепление, отделка, пол, потолок.',
    priceLabel: '+ 35 000 ₽ / балкон',
    kind: 'fixedBalcony',
  },
  {
    id: 'interiorDoors',
    label: 'Установка межкомнатных дверей',
    description: 'Полотно, коробка, фурнитура и монтаж.',
    priceLabel: '+ 7 500 ₽ / дверь',
    kind: 'fixedDoor',
  },
];

export const STEP_TITLES: Record<number, { title: string; hint: string }> = {
  1: {
    title: 'Параметры квартиры',
    hint: 'Укажите площадь и планировку — от этого зависит вся смета.',
  },
  2: {
    title: 'Какой ремонт планируете?',
    hint: 'Выберите подходящий формат работ.',
  },
  3: {
    title: 'В каком состоянии квартира сейчас?',
    hint: 'Это влияет на объём подготовительных работ.',
  },
  4: {
    title: 'Какие работы нужно добавить?',
    hint: 'Отметьте дополнительные опции — они сразу пересчитают цену.',
  },
  5: {
    title: 'Готово! Осталось уточнить детали',
    hint: 'Укажите город, срочность и контакт для точной сметы.',
  },
};

/* ------------------------------------------------------------------ */
/* Initial state                                                      */
/* ------------------------------------------------------------------ */

export const INITIAL_STATE: CalculatorState = {
  step: 1,
  apartmentType: 'two',
  area: 55,
  rooms: 2,
  bathrooms: 1,
  balconies: 1,
  doors: 2,
  repairType: 'capital',
  condition: 'secondary_old',
  extras: {
    demolition: false,
    electrical: false,
    plumbing: false,
    wallAlignment: false,
    floorReplacement: false,
    stretchCeiling: false,
    bathroomTurnkey: false,
    balconyTurnkey: false,
    interiorDoors: false,
  },
  city: 'other',
  urgent: false,
  contact: {
    name: '',
    phone: '',
    comment: '',
    consent: false,
  },
};

/* ------------------------------------------------------------------ */
/* Lookup helpers                                                     */
/* ------------------------------------------------------------------ */

export const getApartmentMeta = (id: ApartmentType) =>
  APARTMENT_TYPES.find((a) => a.id === id)!;
export const getRepairMeta = (id: RepairType) => REPAIR_TYPES.find((r) => r.id === id)!;
export const getConditionMeta = (id: ApartmentCondition) =>
  CONDITIONS.find((c) => c.id === id)!;
export const getCityMeta = (id: CityType) => CITIES.find((c) => c.id === id)!;
export const getExtraMeta = (id: ExtraKey) => EXTRA_WORKS.find((e) => e.id === id)!;

/** Returns true when an extra is currently selectable for the condition. */
export function isExtraAvailable(id: ExtraKey, condition: ApartmentCondition): boolean {
  const meta = getExtraMeta(id);
  if (!meta.availableFor) return true;
  return meta.availableFor.includes(condition);
}

/** Stable default extras value. */
export const EMPTY_EXTRAS: ExtraWorks = {
  demolition: false,
  electrical: false,
  plumbing: false,
  wallAlignment: false,
  floorReplacement: false,
  stretchCeiling: false,
  bathroomTurnkey: false,
  balconyTurnkey: false,
  interiorDoors: false,
};
