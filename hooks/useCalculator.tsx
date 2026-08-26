'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react';
import {
  EMPTY_EXTRAS,
  INITIAL_STATE,
  STEP_COUNT,
  getApartmentMeta,
} from '@/lib/constants';
import { calculateEstimate } from '@/lib/calculate';
import { clearDraft, loadDraft, saveDraft } from '@/lib/storage';
import type {
  ApartmentCondition,
  ApartmentType,
  CalculatorState,
  CityType,
  ContactForm,
  ExtraKey,
  RepairType,
} from '@/lib/types';

type ContactField = keyof ContactForm;

type Action =
  | { type: 'SET_APARTMENT_TYPE'; value: ApartmentType }
  | { type: 'SET_AREA'; value: number }
  | { type: 'SET_ROOMS'; value: number }
  | { type: 'SET_BATHROOMS'; value: number }
  | { type: 'SET_BALCONIES'; value: number }
  | { type: 'SET_DOORS'; value: number }
  | { type: 'SET_REPAIR'; value: RepairType }
  | { type: 'SET_CONDITION'; value: ApartmentCondition }
  | { type: 'TOGGLE_EXTRA'; key: ExtraKey }
  | { type: 'SET_CITY'; value: CityType }
  | { type: 'SET_URGENT'; value: boolean }
  | { type: 'SET_CONTACT'; field: ContactField; value: string | boolean }
  | { type: 'GO_TO'; step: number }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'HYDRATE'; state: CalculatorState }
  | { type: 'RESET' };

function clampStep(step: number): number {
  return Math.min(STEP_COUNT, Math.max(1, step));
}

/** Merge a loaded draft over the defaults so missing keys are always defined. */
function mergeState(draft: Partial<CalculatorState>): CalculatorState {
  return {
    ...INITIAL_STATE,
    ...draft,
    extras: { ...EMPTY_EXTRAS, ...(draft.extras ?? {}) },
    contact: { ...INITIAL_STATE.contact, ...(draft.contact ?? {}) },
  };
}

function reducer(state: CalculatorState, action: Action): CalculatorState {
  switch (action.type) {
    case 'SET_APARTMENT_TYPE': {
      const meta = getApartmentMeta(action.value);
      return {
        ...state,
        apartmentType: action.value,
        rooms: meta.rooms,
        bathrooms: meta.bathrooms,
        balconies: meta.balconies,
      };
    }
    case 'SET_AREA':
      return { ...state, area: action.value };
    case 'SET_ROOMS':
      return { ...state, rooms: action.value };
    case 'SET_BATHROOMS':
      return { ...state, bathrooms: action.value };
    case 'SET_BALCONIES':
      return { ...state, balconies: action.value };
    case 'SET_DOORS':
      return { ...state, doors: action.value };
    case 'SET_REPAIR':
      return { ...state, repairType: action.value };
    case 'SET_CONDITION':
      return { ...state, condition: action.value };
    case 'TOGGLE_EXTRA':
      return {
        ...state,
        extras: { ...state.extras, [action.key]: !state.extras[action.key] },
      };
    case 'SET_CITY':
      return { ...state, city: action.value };
    case 'SET_URGENT':
      return { ...state, urgent: action.value };
    case 'SET_CONTACT':
      return {
        ...state,
        contact: { ...state.contact, [action.field]: action.value },
      };
    case 'GO_TO':
      return { ...state, step: clampStep(action.step) };
    case 'NEXT':
      return { ...state, step: clampStep(state.step + 1) };
    case 'PREV':
      return { ...state, step: clampStep(state.step - 1) };
    case 'HYDRATE':
      return mergeState(action.state);
    case 'RESET':
      return { ...INITIAL_STATE, step: 1 };
    default:
      return state;
  }
}

interface CalculatorContextValue {
  state: CalculatorState;
  estimate: ReturnType<typeof calculateEstimate>;
  setApartmentType: (v: ApartmentType) => void;
  setArea: (v: number) => void;
  setRooms: (v: number) => void;
  setBathrooms: (v: number) => void;
  setBalconies: (v: number) => void;
  setDoors: (v: number) => void;
  setRepairType: (v: RepairType) => void;
  setCondition: (v: ApartmentCondition) => void;
  toggleExtra: (key: ExtraKey) => void;
  setCity: (v: CityType) => void;
  setUrgent: (v: boolean) => void;
  setContact: (field: ContactField, value: string | boolean) => void;
  goTo: (step: number) => void;
  next: () => void;
  prev: () => void;
  reset: () => void;
  resumeAvailable: boolean;
  resume: () => void;
  discardDraft: () => void;
}

const CalculatorContext = createContext<CalculatorContextValue | null>(null);

export function CalculatorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [pendingDraft, setPendingDraft] = useState<CalculatorState | null>(null);
  const [resumeAvailable, setResumeAvailable] = useState(false);

  // Detect a saved draft once on mount (client only).
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setPendingDraft(draft);
      setResumeAvailable(true);
    }
  }, []);

  // Persist on change (phone is stripped inside saveDraft).
  useEffect(() => {
    saveDraft(state);
  }, [state]);

  const estimate = useMemo(() => calculateEstimate(state), [state]);

  const resume = useCallback(() => {
    if (pendingDraft) dispatch({ type: 'HYDRATE', state: pendingDraft });
    setResumeAvailable(false);
    setPendingDraft(null);
  }, [pendingDraft]);

  const discardDraft = useCallback(() => {
    clearDraft();
    dispatch({ type: 'RESET' });
    setResumeAvailable(false);
    setPendingDraft(null);
  }, []);

  const value: CalculatorContextValue = {
    state,
    estimate,
    setApartmentType: (v) => dispatch({ type: 'SET_APARTMENT_TYPE', value: v }),
    setArea: (v) => dispatch({ type: 'SET_AREA', value: v }),
    setRooms: (v) => dispatch({ type: 'SET_ROOMS', value: v }),
    setBathrooms: (v) => dispatch({ type: 'SET_BATHROOMS', value: v }),
    setBalconies: (v) => dispatch({ type: 'SET_BALCONIES', value: v }),
    setDoors: (v) => dispatch({ type: 'SET_DOORS', value: v }),
    setRepairType: (v) => dispatch({ type: 'SET_REPAIR', value: v }),
    setCondition: (v) => dispatch({ type: 'SET_CONDITION', value: v }),
    toggleExtra: (key) => dispatch({ type: 'TOGGLE_EXTRA', key }),
    setCity: (v) => dispatch({ type: 'SET_CITY', value: v }),
    setUrgent: (v) => dispatch({ type: 'SET_URGENT', value: v }),
    setContact: (field, v) => dispatch({ type: 'SET_CONTACT', field, value: v }),
    goTo: (step) => dispatch({ type: 'GO_TO', step }),
    next: () => dispatch({ type: 'NEXT' }),
    prev: () => dispatch({ type: 'PREV' }),
    reset: () => dispatch({ type: 'RESET' }),
    resumeAvailable,
    resume,
    discardDraft,
  };

  return <CalculatorContext.Provider value={value}>{children}</CalculatorContext.Provider>;
}

export function useCalculator(): CalculatorContextValue {
  const ctx = useContext(CalculatorContext);
  if (!ctx) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return ctx;
}
