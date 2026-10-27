# ROVBA Design — портфолио студии

Главная — «The Project Line»: работы студии висят на верёвке как принты на прищепках. Линию тянут мышью, пальцем, свайпом трекпада или стрелками; после отпускания она идёт по инерции и бесконечно зацикливается. Клик по принту переносит его в hero кейса `/work/<slug>`.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4. Библиотек анимации нет: физика — свой rAF-движок, переходы — CSS и Web Animations API.

## Запуск

```sh
export PATH=$PATH:~/.local/node/bin
npm install
npm run dev          # http://localhost:3801
```

Или с пульта `~/Desktop/сайты/_launcher` (http://localhost:4000).
`next build` не запускать, пока работает `next dev`: сначала остановить dev, потом build, потом `rm -rf .next` и снова dev.

## Где что лежит

- `src/data/projects.ts` — **все проекты**: тексты, услуги, картинки, цвет поля, наклон/смещение/масштаб/формат принта. Новый проект = новая запись + папка `public/work/<id>/`.
- `src/lib/rope.ts` — геометрия: парабола верёвки (= квадратичный Безье), размеры карточек по ширине экрана, ямки под прищепками.
- `src/lib/lineEngine.ts` — движок: drag с порогом 6 px (дальше клик отменяется), инерция, wrap, маятниковый наклон, провис на скорости, клавиатура, трекпад.
- `src/lib/portfolioPhysics.ts` — все константы физики (время инерции, максимальные углы).
- `src/lib/handoff.ts` — перелёт принта в hero кейса между страницами.
- `src/components/portfolio/*` — линия, карточка, прищепка (SVG), верёвка, шапка, низ, Studio, Contact.
- `src/components/projects/*` — части страницы кейса.
- `design/concepts/*.html` — исходники трёх концептов (Milanovo, North Barber, Atelier 17) с найденными фото в `design/concepts/assets/` (лицензии в `credits.json`).
- `scripts/capture.mjs` — снимает обложки, десктоп- и мобильные экраны с запущенных локально сайтов: `npm run shots [id …]`. Нужен Chrome и Playwright из `~/Desktop/crm`.

## Заставка

При первом заходе за сессию логотип собирается на белом фоне (по мотивам skyrise-architects): три части знака влетают и заостряются, знак сдвигается, проявляются буквы ROVBA и DESIGN, затем всё затухает — 2,5 с. Код: `src/components/Splash.tsx`, тайминги в `globals.css` (раздел «opening splash»), пути логотипа в `src/components/brand-logo.ts` (общие для заставки, шапки и футера) (из `design/logo/02-horizontal.svg`). Длительность для остальных анимаций задаёт CSS-переменная `--splash`. Повторно в той же вкладке/сессии заставка не показывается; при «Уменьшении движения» — никогда. Посмотреть снова: новое приватное окно.

## Языки

Английский — без префикса (`/`, `/work/finir`), польский — `/pl`, `/pl/work/finir`. Внутри оба живут в сегменте `src/app/[lang]`; `next.config.ts` переписывает корневые адреса на `/en/...` и редиректит `/en/...` обратно на корень. Переключатель EN / PL в шапке ведёт на ту же страницу на другом языке, линия остаётся на месте.

- `src/i18n/dictionaries.ts` — все подписи интерфейса (en и pl, польское склонение «projekt / projekty / projektów»).
- `src/data/projects.pl.ts` — польские тексты кейсов по id проекта и перевод названий услуг. Нет записи — показывается английский текст.
- `src/app/global-not-found.tsx` — страница 404 на двух языках.

## Публикация

Код: приватный репозиторий GitHub `FrankieItsFranklin/rovbadesign`, ветка `main`. Хостинг: Vercel, каждый push в `main` выкладывается сам. Домен rovbadesign.pl (DNS на nazwa.pl) направлен на Vercel.

## Перед публикацией заменить

- `hello@rovba.design` в `src/components/portfolio/ContactSection.tsx` — адрес-заглушка.
- Статусы проектов: живой только Ha Long Curry; Finir, Lident, Luka, Piernicova, ADP, Sobaniec, Dental 3D — прототипы; Milanovo, North Barber, Atelier 17 — концепты студии (имена, цены, команда в них придуманы). Перед показом прототипов с названиями реальных клиник/ресторанов — согласовать с ними.
- Год 2026 у всех проектов и тексты кейсов — проверить.


## Заявки, аналитика, данные студии

- **Форма заявки** → `src/app/api/contact/route.ts` присылает заявку сообщением от Telegram-бота.
  В Vercel → Settings → Environment Variables: `TELEGRAM_BOT_TOKEN` (от @BotFather) и `TELEGRAM_CHAT_ID`
  (кому слать; несколько через запятую). Бот должен получить от получателя /start хотя бы раз. Без переменных
  форма показывает e-mail. Причины отказа Telegram пишутся в логи Vercel.
- **Аналитика**: Vercel Web Analytics (`<Analytics />` в layout). Включить в дашборде проекта → Analytics → Enable.
- **Данные студии** (владелец, NIP, телефон/WhatsApp, календарь, фото и био для «О студии»): `src/data/studio.ts`.
  Пустые поля на сайте не показываются. Цены пакетов: `PRICES` в `src/components/portfolio/OfferSection.tsx`.
- **Живые демо** вымышленных проектов: `npm run demos` собирает Tilia и концепты в `public/demo/` (noindex).
  Прототипы реальных фирм туда не попадают: в них настоящие контакты клиентов.
- **Страницы**: `/for|/pl/dla/<ниша>` (`src/data/niches.ts`), `/journal|/pl/dziennik` (`src/data/journal.ts`),
  `/about|/pl/o-studiu`, `/privacy|/pl/polityka-prywatnosci`. Публичные польские адреса задаются в `src/i18n/routes.ts`.
