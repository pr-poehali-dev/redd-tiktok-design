import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

type MainTab = "home" | "feed";
type FeedTab = "recommendations" | "subscriptions";
type SortType = "hot" | "new" | "top";

// ─── Полноценные статьи ───────────────────────────────────────────────────────
const ARTICLES = [
  {
    id: 1,
    author: "tech_maxim",
    avatar: "M",
    avatarColor: "from-cyan-400 to-blue-600",
    accentColor: "#00d4ff",
    community: "r/технологии",
    time: "8 мин назад",
    readTime: "5 мин",
    title: "GPT-5: что изменилось и почему это другая лига",
    body: `С выходом GPT-5 индустрия ИИ сделала то, чего многие не ожидали — прыжок, а не шаг.

**Что реально нового?**

Первое, что поражает — рассуждение. Модель не просто выдаёт ответ, она показывает ход мыслей. Спросите её о парадоксе корабля Тесея — и получите не три строчки, а развёрнутый философский анализ с контраргументами.

Второе — память между сессиями. Впервые GPT помнит, кто вы, что вы обсуждали вчера, какой стиль письма вам нравится. Это меняет всё взаимодействие: из инструмента он превращается в коллегу.

Третье — мультимодальность стала настоящей. Не «загрузи картинку и получи описание», а живое взаимодействие: нарисуй схему, я объясню; запиши голос, я транскрибирую и улучшу.

**Стоит ли переходить?**

Если вы используете ИИ для работы — однозначно да. Для бытовых задач разница менее заметна, но всё равно ощутима. Скорость генерации выросла примерно на 40%, галлюцинации стали редкостью.

Я протестировал модель на задачах из своей работы: написание технических спецификаций, отладка кода на Rust, анализ бизнес-требований. Во всех случаях GPT-5 показал себя лучше, чем я ожидал.`,
    likes: 12440,
    comments: 2103,
    reposts: 5621,
    views: "84к",
    tags: ["#ИИ", "#технологии", "#gpt5"],
    liked: true,
    bookmarked: false,
    type: "recommendations",
    award: "🏆",
  },
  {
    id: 2,
    author: "kira_vibes",
    avatar: "K",
    avatarColor: "from-pink-500 to-purple-600",
    accentColor: "#ff2d78",
    community: "r/москва",
    time: "2 мин назад",
    readTime: "3 мин",
    title: "Кафе с розовыми облаками на потолке — обзор нового места в Москве",
    body: `Такого я ещё не видела. Кузнецкий Мост, 7 — запомните этот адрес.

**Атмосфера**

Войдя, первое что видишь — потолок. Он буквально состоит из розовых облаков: мягкий текстиль, подсветка снизу, ощущение что ты в сне. Фотографы точно оценят — свет здесь идеальный в любое время суток.

**Меню**

Не стандартное кафе с тысячей позиций. Здесь 12 напитков и 8 десертов. Зато каждый продуман: латте с вишнёвым сиропом и розовой пеной — это не просто красиво, это вкусно.

Средний чек: 600-900 рублей на человека. Для центра Москвы — более чем адекватно.

**Лайфхак**

Скажите что от @kira_vibes — дадут скидку 10%. Это не реклама, владелец — моя подруга, просто хочу поддержать классное место.

**Итог**

Для свидания, фотосессии или просто приятного вечера — идеально. Для рабочей встречи — наверное нет, слишком расслабляет 😄`,
    likes: 4821,
    comments: 312,
    reposts: 88,
    views: "19к",
    tags: ["#кафе", "#москва", "#эстетика"],
    liked: false,
    bookmarked: false,
    type: "recommendations",
    award: null,
  },
  {
    id: 3,
    author: "science_bot",
    avatar: "S",
    avatarColor: "from-blue-400 to-indigo-600",
    accentColor: "#818cf8",
    community: "r/наука",
    time: "2 часа назад",
    readTime: "7 мин",
    title: "Музыка и математика: мозг не видит разницы — что это значит для нас",
    body: `Исследование нейробиологов из MIT опубликованное в Nature Neuroscience перевернуло привычное представление о том, как работает наш мозг.

**Открытие**

Команда под руководством Анджали Мехты обнаружила: зоны мозга, активирующиеся при восприятии музыкальных паттернов, практически идентичны тем, что работают при решении математических задач. Особенно это заметно при восприятии ритма и математических последовательностей.

**Почему это важно**

Это объясняет давно замеченную корреляцию: дети, обучающиеся музыке, как правило показывают лучшие результаты в математике. Раньше это списывали на дисциплину и усидчивость. Теперь — на нейронные паттерны.

**Практическое применение**

Исследователи уже работают над методиками: музыкальные упражнения для улучшения математических способностей, и наоборот — математические задачи для развития музыкального слуха.

**Спорные моменты**

Критики указывают: корреляция не означает причинно-следственную связь. Возможно, оба навыка просто требуют похожего типа мышления — абстрактного паттерн-распознавания.

Лично я думаю, что истина где-то посередине. Наш мозг — невероятно экономный орган, и если один нейронный путь работает для двух задач, почему бы ему не использовать его?`,
    likes: 22800,
    comments: 3200,
    reposts: 8800,
    views: "112к",
    tags: ["#наука", "#мозг", "#музыка"],
    liked: false,
    bookmarked: true,
    type: "recommendations",
    award: "🥇",
  },
  {
    id: 4,
    author: "vsyo_ok_vlad",
    avatar: "V",
    avatarColor: "from-green-400 to-teal-500",
    accentColor: "#34d399",
    community: "r/еда",
    time: "1 час назад",
    readTime: "4 мин",
    title: "Карбонара без сливок: почему итальянцы правы, и как это приготовить",
    body: `Каждое воскресенье я готовлю карбонару. За три года я перепробовал десятки вариантов — и вот что понял.

**Почему без сливок?**

Это не снобизм. Это химия. Сливки делают соус жидким и однородным — красиво, но не то. Классическая эмульсия из яйца, желтка и пекорино даёт совершенно другую текстуру: кремовую, с характером, обволакивающую каждую макаронину.

**Ингредиенты на 2 порции**

- Спагетти или ригатони — 200г
- Гуанчале (можно панчетта) — 100г  
- Яйцо — 1 целое + 2 желтка
- Пекорино романо — 80г (можно смешать с пармезаном 50/50)
- Чёрный перец — много, свежемолотый

**Техника**

Главная ошибка — добавить яйца на слишком горячую сковороду. Вы получите омлет. Снимите с огня, дайте остыть 30 секунд, потом добавляйте яично-сырную смесь и активно перемешивайте. Вода от пасты — ваш лучший друг, добавляйте по ложке.

**Результат**

Когда всё сделано правильно — это блюдо стоит любого ресторана. Честно.`,
    likes: 9841,
    comments: 1450,
    reposts: 2230,
    views: "43к",
    tags: ["#рецепт", "#паста", "#еда"],
    liked: false,
    bookmarked: false,
    type: "subscriptions",
    award: null,
  },
  {
    id: 5,
    author: "night_runner",
    avatar: "N",
    avatarColor: "from-purple-500 to-pink-500",
    accentColor: "#a855f7",
    community: "r/спорт",
    time: "31 мин назад",
    readTime: "3 мин",
    title: "Почему я бегаю ночью: честный отчёт после 6 месяцев практики",
    body: `Когда я впервые вышел на пробежку в 2 ночи, сосед посмотрел на меня как на сумасшедшего. Через полгода я не могу представить другого способа.

**Как это началось**

Работа до 22:00, пробки, усталость. Утро — не вариант, я не жаворонок. Вечером светло и людно, мешает концентрации. Ночь оказалась единственным окном.

**Что изменилось**

Физически: похудел на 7 кг, ушла хроническая усталость в ногах, сон улучшился кардинально. Но главное — ментальное. Ночной город в наушниках с правильной музыкой — это медитация в движении.

**Безопасность**

Часто спрашивают. Светоотражающий жилет, маршрут по освещённым улицам, телефон в кармане. Знакомые маршруты 5-8 км. За полгода — ни одного неприятного инцидента в Москве.

**Рекомендую ли?**

Если вы, как и я, не можете найти время днём — попробуйте хотя бы раз. Город ночью принадлежит вам.`,
    likes: 3199,
    comments: 204,
    reposts: 112,
    views: "12к",
    tags: ["#бег", "#ночь", "#спорт"],
    liked: false,
    bookmarked: false,
    type: "subscriptions",
    award: null,
  },
  {
    id: 6,
    author: "dana_creates",
    avatar: "D",
    avatarColor: "from-yellow-400 to-orange-500",
    accentColor: "#fb923c",
    community: "r/арт",
    time: "15 мин назад",
    readTime: "6 мин",
    title: "Как я создала 12 иллюстраций о советском интернете за неделю — только телефон",
    body: `Год назад я не умела рисовать цифровой арт. Сегодня у меня вышла серия из 12 иллюстраций, которую репостили 400+ раз. Рассказываю как.

**Идея**

«Что если бы интернет изобрели в СССР в 70-х?» — этот вопрос не давал мне покоя. Я представила: советская эстетика конструктивизма + интерфейсы в стиле терминалов + космическая программа. Получился ретрофутуризм с характером.

**Инструменты**

Только телефон. Приложение Procreate Pocket. Никакого планшета, никакого компьютера. Пальцем, в метро, в очередях, поздно ночью.

**Процесс**

Каждая иллюстрация — это отдельная «страница» несуществующего советского сайта. Главная страница «Сов-Нет», раздел «Культура», форум «Дискуссион». Все элементы — кириллица, красные звёзды, конструктивистские сетки.

**Что я поняла**

Инструмент не важен. Важна идея и дисциплина. 40 минут в день на протяжении двух недель — и серия готова. Самый сложный момент — начать первую из 12, потом идёт легче.

**Продолжение**

Сейчас работаю над серией «Советский TikTok». Спойлер: там будут кинохроники.`,
    likes: 7230,
    comments: 891,
    reposts: 431,
    views: "28к",
    tags: ["#арт", "#digart", "#процесс", "#ретрофутуризм"],
    liked: false,
    bookmarked: false,
    type: "recommendations",
    award: "🎨",
  },
];

const HOME_POSTS = ARTICLES.slice(0, 4);

const ALL_TAGS = ["Все", "#ИИ", "#арт", "#наука", "#еда", "#спорт", "#москва", "#gpt5", "#лайфстайл", "#технологии"];

const SUGGESTED = [
  { author: "photo_lena", avatar: "L", avatarColor: "from-rose-400 to-pink-600", followers: "12.4к", about: "Фотограф, Москва" },
  { author: "code_wolf", avatar: "W", avatarColor: "from-indigo-400 to-purple-600", followers: "8.9к", about: "Разработчик, Rust" },
  { author: "food_yan", avatar: "Y", avatarColor: "from-amber-400 to-orange-500", followers: "31к", about: "Шеф-повар" },
];

const HOT_TAGS = [
  { tag: "#GPT5", count: "841к", heat: 98 },
  { tag: "#кибер2025", count: "320к", heat: 76 },
  { tag: "#ночнойгород", count: "218к", heat: 61 },
  { tag: "#рецепты", count: "195к", heat: 54 },
  { tag: "#диджитал", count: "167к", heat: 44 },
];

const COMMUNITIES = [
  { name: "r/технологии", members: "234к", color: "from-cyan-400 to-blue-600" },
  { name: "r/наука", members: "189к", color: "from-indigo-400 to-purple-600" },
  { name: "r/арт", members: "97к", color: "from-yellow-400 to-orange-500" },
  { name: "r/еда", members: "312к", color: "from-green-400 to-teal-500" },
  { name: "r/москва", members: "521к", color: "from-pink-400 to-rose-600" },
];

function formatNum(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "к";
  return String(n);
}

// ─── Markdown-лайт рендер ────────────────────────────────────────────────────
function ArticleBody({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <div className="space-y-3 text-foreground/85 leading-relaxed text-[15px]">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        if (line.startsWith("**") && line.endsWith("**")) {
          return <h4 key={i} className="font-rubik font-bold text-white text-base mt-2">{line.replace(/\*\*/g, "")}</h4>;
        }
        if (line.startsWith("- ")) {
          return (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-purple-400 mt-1 flex-shrink-0">•</span>
              <span>{line.slice(2)}</span>
            </div>
          );
        }
        // inline bold
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i}>
            {parts.map((part, j) =>
              j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
            )}
          </p>
        );
      })}
    </div>
  );
}

// ─── Карточка статьи (горизонтальный слайд) ──────────────────────────────────
function ArticleSlide({
  article, isActive, onTagClick,
}: {
  article: typeof ARTICLES[0];
  isActive: boolean;
  onTagClick: (tag: string) => void;
}) {
  const [liked, setLiked] = useState(article.liked);
  const [likes, setLikes] = useState(article.likes);
  const [bookmarked, setBookmarked] = useState(article.bookmarked);
  const [showComments, setShowComments] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [isActive]);

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ transition: "opacity 0.4s ease", opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none" }}
    >
      {/* Акцент-полоса сверху */}
      <div className="h-0.5 w-full flex-shrink-0" style={{ background: `linear-gradient(90deg, ${article.accentColor}88, transparent)` }} />

      {/* Скроллируемый контент статьи */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-6" style={{ scrollbarWidth: "none" }}>
        {/* Шапка */}
        <div className="flex items-center gap-2 mb-5 flex-wrap">
          <span className="text-xs font-bold text-white/40 uppercase tracking-wider font-rubik">{article.community}</span>
          <span className="text-white/20">·</span>
          <span className="text-xs text-muted-foreground">{article.time}</span>
          <span className="text-white/20">·</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="Clock" size={11} />
            <span>{article.readTime} чтения</span>
          </div>
          <span className="text-white/20">·</span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="Eye" size={11} />
            <span>{article.views}</span>
          </div>
          {article.award && (
            <span className="ml-auto text-lg" title="Награда редакции">{article.award}</span>
          )}
        </div>

        {/* Автор */}
        <div className="flex items-center gap-3 mb-6">
          <div className="avatar-ring flex-shrink-0">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${article.avatarColor} flex items-center justify-center text-white font-bold font-rubik`}>
              {article.avatar}
            </div>
          </div>
          <div>
            <div className="font-semibold text-white text-sm">@{article.author}</div>
            <div className="text-xs text-muted-foreground">Автор</div>
          </div>
          <button className="ml-auto px-3 py-1.5 rounded-full border border-white/20 text-white text-xs hover:bg-white/10 transition-colors font-medium">
            + Подписаться
          </button>
        </div>

        {/* Заголовок */}
        <h2 className="font-rubik font-black text-2xl text-white leading-tight mb-5">
          {article.title}
        </h2>

        {/* Тело статьи */}
        <ArticleBody text={article.body} />

        {/* Теги */}
        <div className="flex flex-wrap gap-2 mt-6 pb-2">
          {article.tags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="trend-tag px-3 py-1 rounded-full text-xs font-medium text-accent hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Комментарии */}
        {showComments && (
          <div className="mt-6 space-y-4 border-t border-white/5 pt-5">
            <h3 className="font-rubik font-bold text-sm text-white/70 uppercase tracking-wider">Комментарии · {formatNum(article.comments)}</h3>
            {[
              { u: "alex_m", c: "Отличная статья, давно ждал такого материала!", t: "1 мин", likes: 24 },
              { u: "maria_k", c: "А можно подробнее про второй пункт? Не совсем понял логику.", t: "3 мин", likes: 8 },
              { u: "dev_pro", c: "Полностью согласен. Сам столкнулся с этим неделю назад.", t: "7 мин", likes: 15 },
            ].map((cm, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold font-rubik flex-shrink-0">
                  {cm.u[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-white">@{cm.u}</span>
                    <span className="text-xs text-muted-foreground">{cm.t} назад</span>
                  </div>
                  <p className="text-sm text-foreground/80">{cm.c}</p>
                  <button className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground hover:text-pink-400 transition-colors">
                    <Icon name="Heart" size={11} />{cm.likes}
                  </button>
                </div>
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              <input
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-muted-foreground outline-none focus:border-purple-500/50 transition-colors"
                placeholder="Написать комментарий..."
              />
              <button className="px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-medium hover:scale-105 transition-transform">
                <Icon name="Send" size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Нижняя панель действий */}
      <div className="flex-shrink-0 glass border-t border-white/5 px-8 py-3">
        <div className="flex items-center gap-4">
          {/* Лайк */}
          <button
            onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all hover:scale-105 ${liked ? "bg-pink-500/20 text-pink-400" : "glass text-muted-foreground hover:text-pink-400"}`}
          >
            <Icon name="Heart" size={15} className={liked ? "fill-current" : ""} />
            <span className="text-sm font-medium">{formatNum(likes)}</span>
          </button>

          {/* Комментарии */}
          <button
            onClick={() => setShowComments(!showComments)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all hover:scale-105 ${showComments ? "bg-cyan-500/20 text-cyan-400" : "glass text-muted-foreground hover:text-cyan-400"}`}
          >
            <Icon name="MessageCircle" size={15} />
            <span className="text-sm font-medium">{formatNum(article.comments)}</span>
          </button>

          {/* Репост */}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass text-muted-foreground hover:text-purple-400 transition-all hover:scale-105">
            <Icon name="Repeat2" size={15} />
            <span className="text-sm font-medium">{formatNum(article.reposts)}</span>
          </button>

          {/* Поделиться */}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass text-muted-foreground hover:text-white transition-all hover:scale-105">
            <Icon name="Share2" size={15} />
          </button>

          <div className="flex-1" />

          {/* Читать мин */}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Icon name="Clock" size={12} />
            <span>{article.readTime}</span>
          </div>

          {/* Закладка */}
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-1.5 rounded-xl glass transition-all hover:scale-105 ${bookmarked ? "text-yellow-400" : "text-muted-foreground hover:text-yellow-400"}`}
          >
            <Icon name="Bookmark" size={15} className={bookmarked ? "fill-current" : ""} />
          </button>

          {/* Пожаловаться */}
          <button className="p-1.5 rounded-xl glass text-muted-foreground hover:text-orange-400 transition-all hover:scale-105">
            <Icon name="Flag" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Правая панель ────────────────────────────────────────────────────────────
function RightPanel({
  activeTag, onTagClick, feedTab, setFeedTab, sortType, setSortType,
}: {
  activeTag: string;
  onTagClick: (t: string) => void;
  feedTab: FeedTab;
  setFeedTab: (t: FeedTab) => void;
  sortType: SortType;
  setSortType: (s: SortType) => void;
}) {
  return (
    <div className="h-full overflow-y-auto space-y-3 pb-4" style={{ scrollbarWidth: "none" }}>

      {/* Рек / Подписки */}
      <div className="glass rounded-2xl p-1 flex gap-1">
        {(["recommendations", "subscriptions"] as FeedTab[]).map(t => (
          <button key={t} onClick={() => setFeedTab(t)}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${feedTab === t ? "bg-gradient-to-r from-pink-500/30 to-purple-600/30 text-white border border-white/10" : "text-muted-foreground hover:text-white"}`}>
            {t === "recommendations" ? "Рекомендации" : "Подписки"}
          </button>
        ))}
      </div>

      {/* Сортировка */}
      <div className="glass rounded-2xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="ArrowUpDown" size={13} className="text-purple-400" />
          <span className="text-xs font-rubik font-bold uppercase tracking-widest text-white/50">Сортировка</span>
        </div>
        <div className="flex gap-1.5">
          {([["hot", "🔥", "Горячее"], ["new", "✨", "Новое"], ["top", "🏆", "Топ"]] as [SortType, string, string][]).map(([s, e, l]) => (
            <button key={s} onClick={() => setSortType(s)}
              className={`flex-1 py-1.5 rounded-xl text-xs font-medium transition-all ${sortType === s ? "bg-gradient-to-r from-pink-500/30 to-purple-600/30 text-white" : "text-muted-foreground hover:text-white bg-white/5"}`}>
              {e} {l}
            </button>
          ))}
        </div>
      </div>

      {/* Фильтр по тегам */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Filter" size={13} className="text-pink-400" />
          <span className="text-xs font-rubik font-bold uppercase tracking-widest text-white/50">Теги</span>
          {activeTag !== "Все" && (
            <button onClick={() => onTagClick("Все")} className="ml-auto text-[10px] text-muted-foreground hover:text-white">
              сбросить ×
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ALL_TAGS.map(tag => (
            <button key={tag} onClick={() => onTagClick(tag)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${activeTag === tag ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20" : "trend-tag text-white/60 hover:text-white"}`}>
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Горячие теги */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span>🔥</span>
          <span className="text-xs font-rubik font-bold uppercase tracking-widest text-white/50">Горят сейчас</span>
        </div>
        <div className="space-y-2.5">
          {HOT_TAGS.map((t, i) => (
            <button key={t.tag} onClick={() => onTagClick(t.tag)} className="w-full text-left group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-white group-hover:text-cyan-400 transition-colors">{t.tag}</span>
                <span className="text-[10px] text-muted-foreground">{t.count}</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all"
                  style={{ width: `${t.heat}%`, animationDelay: `${i * 80}ms` }} />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Сообщества */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Hash" size={13} className="text-cyan-400" />
          <span className="text-xs font-rubik font-bold uppercase tracking-widest text-white/50">Сообщества</span>
        </div>
        <div className="space-y-2">
          {COMMUNITIES.map(c => (
            <button key={c.name} className="w-full flex items-center gap-2.5 group">
              <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}>
                <Icon name="Hash" size={12} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-xs font-medium text-white group-hover:text-purple-300 transition-colors">{c.name}</div>
                <div className="text-[10px] text-muted-foreground">{c.members} участников</div>
              </div>
              <Icon name="ChevronRight" size={12} className="text-muted-foreground group-hover:text-white transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Подписаться */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="UserPlus" size={13} className="text-green-400" />
          <span className="text-xs font-rubik font-bold uppercase tracking-widest text-white/50">Авторы</span>
        </div>
        <div className="space-y-3">
          {SUGGESTED.map(u => (
            <div key={u.author} className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${u.avatarColor} flex items-center justify-center text-white font-bold text-xs font-rubik flex-shrink-0`}>
                {u.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white truncate">@{u.author}</div>
                <div className="text-[10px] text-muted-foreground">{u.about}</div>
              </div>
              <button className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500/70 to-purple-600/70 text-white font-medium hover:scale-105 transition-transform flex-shrink-0">
                + Фол
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Мини-статистика */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="BarChart2" size={13} className="text-yellow-400" />
          <span className="text-xs font-rubik font-bold uppercase tracking-widest text-white/50">Активность</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { l: "Лайков", v: "142", i: "Heart", c: "text-pink-400" },
            { l: "Статей", v: "8", i: "FileText", c: "text-purple-400" },
            { l: "Читателей", v: "230", i: "Users", c: "text-cyan-400" },
            { l: "Просмотров", v: "1.2к", i: "Eye", c: "text-yellow-400" },
          ].map(s => (
            <div key={s.l} className="bg-white/[0.04] rounded-xl p-2.5 flex flex-col gap-1">
              <Icon name={s.i} size={13} className={s.c} />
              <div className="text-sm font-bold text-white font-rubik">{s.v}</div>
              <div className="text-[10px] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Карточки для Главной ─────────────────────────────────────────────────────
function HomeCard({ article, delay = 0 }: { article: typeof HOME_POSTS[0]; delay?: number }) {
  const [liked, setLiked] = useState(article.liked);
  const [likes, setLikes] = useState(article.likes);
  return (
    <div className="post-card rounded-2xl overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="h-0.5" style={{ background: `linear-gradient(90deg, ${article.accentColor}99, transparent)` }} />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-bold text-white/40 uppercase tracking-wider font-rubik">{article.community}</span>
          <span className="text-white/20 text-xs">·</span>
          <span className="text-xs text-muted-foreground">{article.time}</span>
          {article.award && <span className="text-sm ml-auto">{article.award}</span>}
        </div>
        <div className="flex items-start gap-3 mb-3">
          <div className="avatar-ring flex-shrink-0">
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${article.avatarColor} flex items-center justify-center text-white font-bold font-rubik text-sm`}>
              {article.avatar}
            </div>
          </div>
          <div>
            <div className="font-rubik font-bold text-white text-base leading-snug mb-1">{article.title}</div>
            <div className="text-xs text-muted-foreground">@{article.author}</div>
          </div>
        </div>
        <p className="text-sm text-foreground/75 line-clamp-3 mb-4">{article.body.split("\n\n")[0]}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.map(tag => (
            <span key={tag} className="trend-tag text-xs px-2 py-0.5 rounded-full text-accent">{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-4 pt-3 border-t border-white/5">
          <button onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}
            className={`flex items-center gap-1.5 text-sm transition-colors ${liked ? "text-pink-500" : "text-muted-foreground hover:text-pink-400"}`}>
            <Icon name="Heart" size={14} className={liked ? "fill-current" : ""} />{formatNum(likes)}
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
            <Icon name="MessageCircle" size={14} />{formatNum(article.comments)}
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-purple-400 transition-colors">
            <Icon name="Repeat2" size={14} />{formatNum(article.reposts)}
          </button>
          <div className="flex items-center gap-1 ml-auto text-xs text-muted-foreground">
            <Icon name="Clock" size={11} />{article.readTime}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Index() {
  const [mainTab, setMainTab] = useState<MainTab>("home");
  const [feedTab, setFeedTab] = useState<FeedTab>("recommendations");
  const [activeTag, setActiveTag] = useState("Все");
  const [sortType, setSortType] = useState<SortType>("hot");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filtered = ARTICLES.filter(a => {
    const matchType = a.type === feedTab;
    const matchTag = activeTag === "Все" || a.tags.includes(activeTag);
    return matchType && matchTag;
  });

  const goTo = (idx: number) => {
    setCurrentIndex(Math.max(0, Math.min(filtered.length - 1, idx)));
  };

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    setCurrentIndex(0);
  };

  // Горизонтальный свайп
  const touchStartX = useRef(0);
  const isDragging = useRef(false);
  const dragStart = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragStart.current = e.clientX;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    setDragOffset(e.clientX - dragStart.current);
  };
  const onMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragOffset < -60) goTo(currentIndex + 1);
    else if (dragOffset > 60) goTo(currentIndex - 1);
    setDragOffset(0);
  };

  return (
    <div className="min-h-screen bg-background font-golos overflow-hidden">
      <div className="noise-overlay" />
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-600/8 rounded-full blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 h-14">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-black text-xs font-rubik">R</span>
            </div>
            <span className="font-rubik font-black text-lg gradient-text">РенДит</span>
          </div>

          <div className="flex items-center gap-1 glass rounded-2xl p-1">
            <button onClick={() => setMainTab("home")}
              className={`px-5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${mainTab === "home" ? "bg-gradient-to-r from-pink-500/25 to-purple-600/25 text-white border border-white/10" : "text-muted-foreground hover:text-white"}`}>
              Главная
            </button>
            <button onClick={() => setMainTab("feed")}
              className={`px-5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${mainTab === "feed" ? "bg-gradient-to-r from-pink-500/25 to-purple-600/25 text-white border border-white/10" : "text-muted-foreground hover:text-white"}`}>
              Лента
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="glass rounded-xl p-2 text-muted-foreground hover:text-white transition-colors">
              <Icon name="Search" size={16} />
            </button>
            <button className="glass rounded-xl p-2 text-muted-foreground hover:text-white transition-colors relative">
              <Icon name="Bell" size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-pink-500 rounded-full" />
            </button>
            <div className="avatar-ring cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">Я</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ГЛАВНАЯ */}
      {mainTab === "home" && (
        <div className="pt-14">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="glass rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:border-purple-500/30 transition-all border border-white/5">
                  <div className="avatar-ring flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">Я</span>
                    </div>
                  </div>
                  <span className="text-muted-foreground text-sm flex-1">Написать статью или поделиться мыслью...</span>
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold hover:scale-105 transition-transform">
                    Написать
                  </button>
                </div>
                <div className="flex items-center gap-2 px-1">
                  <div className="w-1 h-4 rounded-full bg-gradient-to-b from-pink-500 to-purple-600" />
                  <h2 className="font-rubik font-bold text-sm text-white/70 uppercase tracking-wider">Популярные статьи</h2>
                </div>
                {HOME_POSTS.map((a, i) => <HomeCard key={a.id} article={a} delay={i * 80} />)}
              </div>
              <div className="hidden lg:block">
                <div className="sticky top-20 space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-400 to-purple-600" />
                    <h2 className="font-rubik font-bold text-sm text-white/70 uppercase tracking-wider">В тренде</h2>
                  </div>
                  <div className="glass rounded-2xl p-4 space-y-3">
                    {HOT_TAGS.map((t, i) => (
                      <div key={t.tag} className="opacity-0 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-white">{t.tag}</span>
                          <span className="text-xs text-muted-foreground">{t.count}</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500" style={{ width: `${t.heat}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="glass rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Users" size={13} className="text-cyan-400" />
                      <span className="text-xs font-rubik font-bold uppercase tracking-widest text-white/50">Авторы</span>
                    </div>
                    {SUGGESTED.map(u => (
                      <div key={u.author} className="flex items-center gap-2.5 mb-3 last:mb-0">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${u.avatarColor} flex items-center justify-center text-white font-bold text-xs font-rubik flex-shrink-0`}>{u.avatar}</div>
                        <div className="flex-1"><div className="text-xs font-medium text-white">@{u.author}</div><div className="text-[10px] text-muted-foreground">{u.about}</div></div>
                        <button className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500/70 to-purple-600/70 text-white">+</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ЛЕНТА */}
      {mainTab === "feed" && (
        <div className="fixed inset-0 pt-14 flex select-none">
          {/* Левая: горизонтальный слайдер статей */}
          <div
            className="flex-1 relative overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              const diff = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(diff) > 50) goTo(currentIndex + (diff > 0 ? 1 : -1));
            }}
          >
            {/* Стрелки навигации */}
            <button
              onClick={() => goTo(currentIndex - 1)}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass flex items-center justify-center transition-all hover:bg-white/15 ${currentIndex === 0 ? "opacity-20 pointer-events-none" : "opacity-70 hover:opacity-100"}`}
            >
              <Icon name="ChevronLeft" size={20} className="text-white" />
            </button>
            <button
              onClick={() => goTo(currentIndex + 1)}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full glass flex items-center justify-center transition-all hover:bg-white/15 ${currentIndex === filtered.length - 1 ? "opacity-20 pointer-events-none" : "opacity-70 hover:opacity-100"}`}
            >
              <Icon name="ChevronRight" size={20} className="text-white" />
            </button>

            {/* Индикатор позиции */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5">
              {filtered.map((_, i) => (
                <button key={i} onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-300 ${i === currentIndex ? "w-5 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"}`}
                />
              ))}
            </div>

            {/* Счётчик */}
            <div className="absolute top-3 right-6 z-30 text-xs text-white/30 font-rubik">
              {filtered.length > 0 ? `${currentIndex + 1} / ${filtered.length}` : "0 / 0"}
            </div>

            {/* Подсказка свайп */}
            {currentIndex === 0 && filtered.length > 1 && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 glass px-4 py-2 rounded-full opacity-60 pointer-events-none">
                <Icon name="ChevronLeft" size={12} className="text-white/50" />
                <span className="text-xs text-white/50">листайте или тяните</span>
                <Icon name="ChevronRight" size={12} className="text-white" />
              </div>
            )}

            {/* Слайды */}
            {filtered.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center">
                  <Icon name="FileSearch" size={28} className="text-purple-400" />
                </div>
                <p className="text-muted-foreground text-sm">Нет статей по фильтру <span className="text-white">{activeTag}</span></p>
                <button onClick={() => setActiveTag("Все")} className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm">
                  Сбросить фильтр
                </button>
              </div>
            ) : (
              filtered.map((article, i) => (
                <div
                  key={article.id}
                  className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ transform: `translateX(calc(${(i - currentIndex) * 100}% + ${i === currentIndex ? dragOffset : 0}px))` }}
                >
                  <ArticleSlide article={article} isActive={i === currentIndex} onTagClick={handleTagClick} />
                </div>
              ))
            )}
          </div>

          {/* Правая панель */}
          <div className="w-72 flex-shrink-0 border-l border-white/5 bg-black/20 backdrop-blur-xl h-full pt-4 px-4">
            <RightPanel
              activeTag={activeTag}
              onTagClick={handleTagClick}
              feedTab={feedTab}
              setFeedTab={setFeedTab}
              sortType={sortType}
              setSortType={setSortType}
            />
          </div>
        </div>
      )}
    </div>
  );
}
