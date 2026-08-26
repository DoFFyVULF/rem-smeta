'use client';

import { useCalculator } from '@/hooks/useCalculator';
import { Slider } from '@/components/ui/Slider';
import { NumberStepper } from '@/components/ui/NumberStepper';
import { AlertIcon, DoorIcon, BalconyIcon, BathroomIcon, HomeIcon } from '@/components/ui/icons';
import { formatNumber } from '@/lib/format';
import { AREA_MIN, AREA_MAX } from '@/lib/constants';

export function ApartmentParamsStep() {
  const { state, setArea, setRooms, setBathrooms, setBalconies, setDoors } = useCalculator();
  const outOfRange = state.area < AREA_MIN || state.area > AREA_MAX;

  return (
    <div className="space-y-8">
      {/* Площадь */}
      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="area" className="text-base font-semibold text-graphite">
            Площадь квартиры
          </label>
          <span className="text-3xl font-bold text-graphite">
            {formatNumber(state.area)}{' '}
            <span className="text-lg font-medium text-graphite-muted">м²</span>
          </span>
        </div>
        <div className="mt-4">
          <Slider
            id="area"
            min={AREA_MIN}
            max={AREA_MAX}
            step={1}
            value={state.area}
            onChange={(v) => setArea(Number(v))}
            aria-label="Площадь квартиры"
            valueLabel={`${formatNumber(state.area)} м²`}
          />
        </div>
        <div className="mt-1 flex justify-between text-xs text-graphite-muted">
          <span>от {AREA_MIN} м²</span>
          <span>до {AREA_MAX} м²</span>
        </div>
        {outOfRange && (
          <p className="mt-3 flex items-start gap-2 rounded-xl bg-brand-soft px-3 py-2 text-sm text-brand-dark">
            <AlertIcon className="mt-0.5 h-4 w-4 shrink-0" />
            Мы считаем для площади от {AREA_MIN} до {AREA_MAX} м². Значение вне диапазона
            используется как есть.
          </p>
        )}
      </div>

      {/* Планировка */}
      <div className="border-t border-line pt-7">
        <h3 className="mb-5 text-base font-semibold text-graphite">Планировка</h3>
        <div className="grid items-stretch gap-3 sm:grid-cols-2">
          <NumberStepper
            id="rooms"
            label="Комнаты"
            min={1}
            max={10}
            value={state.rooms}
            onChange={(v) => setRooms(Number(v))}
            icon={<HomeIcon className="h-5 w-5" />}
          />
          <NumberStepper
            id="bathrooms"
            label="Санузлы"
            min={1}
            max={5}
            value={state.bathrooms}
            onChange={(v) => setBathrooms(Number(v))}
            icon={<BathroomIcon className="h-5 w-5" />}
          />
          <NumberStepper
            id="balconies"
            label="Балконы"
            min={0}
            max={4}
            value={state.balconies}
            onChange={(v) => setBalconies(Number(v))}
            icon={<BalconyIcon className="h-5 w-5" />}
          />
          <NumberStepper
            id="doors"
            label="Межкомнатные двери"
            suffix="шт"
            min={0}
            max={10}
            value={state.doors}
            onChange={(v) => setDoors(Number(v))}
            icon={<DoorIcon className="h-5 w-5" />}
          />
        </div>
      </div>
    </div>
  );
}
