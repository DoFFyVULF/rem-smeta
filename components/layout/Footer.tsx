import { RulerIcon, PhoneIcon, MailIcon } from '@/components/ui/icons';

const NAV = [
  { href: '#calculator', label: 'Калькулятор' },
  { href: '#how', label: 'Как работает' },
  { href: '#included', label: 'Входит в расчёт' },
  { href: '#examples', label: 'Примеры' },
  { href: '#faq', label: 'Вопросы' },
];

export function Footer() {
  return (
    <footer className="relative bg-graphite text-white">
      <div aria-hidden className="h-1 w-full bg-brand-gradient" />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="icon-chip h-9 w-9">
              <RulerIcon className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold text-white">РемСмета</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Онлайн-калькулятор стоимости ремонта квартиры. Предварительный расчёт за минуту.
          </p>
          <p className="mt-6 text-xs text-white/40">© 2026 РемСмета</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white/90">Навигация</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-white/65 transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white/90">Контакты (демо)</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/65">
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-4 w-4 text-brand-400" />
              8 (800) 000-00-00
            </li>
            <li className="flex items-center gap-2">
              <MailIcon className="h-4 w-4 text-brand-400" />
              hello@remsmeta.ru
            </li>
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-white/40">
            Демонстрационный проект. Заявки не отправляются на реальный адрес.
          </p>
        </div>
      </div>
    </footer>
  );
}
