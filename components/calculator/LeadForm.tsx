'use client';

import { useCalculator } from '@/hooks/useCalculator';
import { Input } from '@/components/ui/Input';
import type { StepErrors } from '@/lib/validation';

/** Format raw digits into +7 (XXX) XXX-XX-XX as the user types. */
function maskPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  const d = digits.startsWith('8') ? '7' + digits.slice(1) : digits;
  const a = d.slice(0, 1);
  const b = d.slice(1, 4);
  const c = d.slice(4, 7);
  const e = d.slice(7, 9);
  const f = d.slice(9, 11);
  let out = '+7';
  if (b) out += ` (${b}`;
  if (c) out += `) ${c}`;
  if (e) out += `-${e}`;
  if (f) out += `-${f}`;
  return out;
}

export function LeadForm({ errors }: { errors: StepErrors }) {
  const { state, setContact } = useCalculator();
  const { name, phone, comment, consent } = state.contact;

  return (
    <div className="space-y-4">
      <Input
        id="name"
        label="Имя"
        placeholder="Как к вам обращаться"
        autoComplete="name"
        value={name}
        error={errors.name}
        onChange={(e) => setContact('name', e.target.value)}
      />

      <Input
        id="phone"
        label="Телефон"
        placeholder="+7 (999) 123-45-67"
        inputMode="tel"
        autoComplete="tel"
        value={phone}
        error={errors.phone}
        onChange={(e) => setContact('phone', maskPhone(e.target.value))}
      />

      <div className="w-full">
        <label htmlFor="comment" className="mb-1.5 block text-sm font-medium text-graphite-soft">
          Комментарий (необязательно)
        </label>
        <textarea
          id="comment"
          rows={3}
          maxLength={500}
          value={comment}
          onChange={(e) => setContact('comment', e.target.value)}
          placeholder="Адрес, особенности квартиры, пожелания…"
          className="w-full rounded-xl border border-line-strong bg-white px-3.5 py-2.5 text-[15px] text-graphite outline-none transition-colors placeholder:text-graphite-muted focus-within:border-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1"
        />
        <div className="mt-1 flex justify-end text-xs text-graphite-muted">
          {comment.length}/500
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm text-graphite-soft">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setContact('consent', e.target.checked)}
            className="mt-0.5 h-5 w-5 shrink-0 rounded border-line-strong text-brand focus-visible:ring-2 focus-visible:ring-brand"
          />
          <span>
            Я согласен на обработку персональных данных и принимаю политику
            конфиденциальности.
          </span>
        </label>
        {errors.consent && <p className="mt-1.5 text-sm text-danger">{errors.consent}</p>}
      </div>

      <p className="text-xs text-graphite-muted">
        Демо: данные сохраняются локально в браузере и не уходят на сервер. В реальном проекте
        здесь была бы отправка в CRM или Telegram.
      </p>
    </div>
  );
}
