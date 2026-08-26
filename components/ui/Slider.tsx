interface SliderProps {
  id: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  'aria-label'?: string;
  valueLabel?: string;
}

export function Slider({
  id,
  min,
  max,
  step = 1,
  value,
  onChange,
  valueLabel,
  ...aria
}: SliderProps) {
  return (
    <div className="w-full">
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rem-range"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={valueLabel}
        {...aria}
      />
      <div className="mt-2 flex justify-between text-xs text-graphite-muted">
        <span>{min} м²</span>
        <span>{max} м²</span>
      </div>
    </div>
  );
}
