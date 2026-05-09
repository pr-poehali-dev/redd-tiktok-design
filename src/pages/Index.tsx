import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

type MainTab = "home" | "feed";
type FeedTab = "recommendations" | "subscriptions";

const ALL_POSTS = [
  {
    id: 1,
    author: "kira_vibes",
    avatar: "K",
    avatarColor: "from-pink-500 to-purple-600",
    time: "2 мин назад",
    content: "Ребят, только что открыла кафе с розовыми облаками на потолке — это уже не просто место, это опыт 🌸✨ Адрес скину в следующем посте",
    likes: 4821,
    comments: 312,
    reposts: 88,
    tags: ["#кафе", "#москва", "#эстетика"],
    liked: false,
    type: "recommendations",
  },
  {
    id: 2,
    author: "tech_maxim",
    avatar: "M",
    avatarColor: "from-cyan-400 to-blue-600",
    time: "8 мин назад",
    content: "GPT-5 вышел и я уже потрогал. Если кратко — это не просто апгрейд, это другая лига. Объясняю почему в треде 🧵",
    likes: 12440,
    comments: 2103,
    reposts: 5621,
    tags: ["#ИИ", "#технологии", "#gpt5"],
    liked: true,
    type: "recommendations",
  },
  {
    id: 3,
    author: "dana_creates",
    avatar: "D",
    avatarColor: "from-yellow-400 to-orange-500",
    time: "15 мин назад",
    content: "Сделала цифровой арт за 40 минут используя только телефон. Показываю процесс — никаких секретов, только честный труд 🎨",
    likes: 7230,
    comments: 891,
    reposts: 431,
    tags: ["#арт", "#digart", "#процесс"],
    liked: false,
    type: "recommendations",
  },
  {
    id: 4,
    author: "night_runner",
    avatar: "N",
    avatarColor: "from-purple-500 to-pink-500",
    time: "31 мин назад",
    content: "5км в 2 ночи под неоновым дождём. Город принадлежит бегунам 🌆🏃",
    likes: 3199,
    comments: 204,
    reposts: 112,
    tags: ["#бег", "#ночь", "#спорт"],
    liked: false,
    type: "subscriptions",
  },
  {
    id: 5,
    author: "vsyo_ok_vlad",
    avatar: "V",
    avatarColor: "from-green-400 to-teal-500",
    time: "1 час назад",
    content: "Рецепт пасты карбонара, которую я готовлю каждое воскресенье. Никаких сливок — только классика 🍝 Сохраняйте, пригодится",
    likes: 9841,
    comments: 1450,
    reposts: 2230,
    tags: ["#рецепт", "#паста", "#еда"],
    liked: false,
    type: "subscriptions",
  },
  {
    id: 6,
    author: "trending_igor",
    avatar: "I",
    avatarColor: "from-red-500 to-orange-500",
    time: "45 мин назад",
    content: "Этот момент в метро сегодня собрал 80к просмотров за час. Люди реально добрые — мужчина отдал место бабушке и помог с сумками 🥹",
    likes: 81200,
    comments: 9340,
    reposts: 41000,
    tags: ["#доброта", "#метро", "#реальнаяжизнь"],
    liked: false,
    type: "recommendations",
  },
  {
    id: 7,
    author: "viral_nastya",
    avatar: "A",
    avatarColor: "from-fuchsia-500 to-pink-500",
    time: "1 час назад",
    content: "Провела эксперимент — неделю без социальных сетей. Результаты вас шокируют (нет, но читайте всё равно) 😄",
    likes: 34000,
    comments: 5100,
    reposts: 12200,
    tags: ["#эксперимент", "#детокс", "#лайфстайл"],
    liked: false,
    type: "subscriptions",
  },
  {
    id: 8,
    author: "science_bot",
    avatar: "S",
    avatarColor: "from-blue-400 to-indigo-600",
    time: "2 часа назад",
    content: "Учёные обнаружили: мозг воспринимает музыку и математику одними и теми же нейронными паттернами. Случайность? 🎵🔢",
    likes: 22800,
    comments: 3200,
    reposts: 8800,
    tags: ["#наука", "#мозг", "#музыка"],
    liked: false,
    type: "recommendations",
  },
];

const HOME_POSTS = ALL_POSTS.slice(0, 5);

const TRENDS = {
  hashtags: [
    { tag: "#GPT5", count: "841к" },
    { tag: "#кибер2025", count: "320к" },
    { tag: "#ночнойгород", count: "218к" },
    { tag: "#рецепты", count: "195к" },
    { tag: "#диджитал", count: "167к" },
    { tag: "#наука", count: "143к" },
  ],
  sounds: [
    { name: "Neon Dreams", artist: "SYML", uses: "2.1М" },
    { name: "Cyber Pulse", artist: "ODESZA", uses: "980к" },
    { name: "Midnight Run", artist: "Perturbator", uses: "741к" },
  ],
  topPosts: [
    { author: "trending_igor", preview: "Этот момент в метро сегодня...", likes: "81.2к" },
    { author: "tech_maxim", preview: "GPT-5 вышел и я уже потрогал...", likes: "12.4к" },
    { author: "viral_nastya", preview: "Провела эксперимент — неделю...", likes: "34к" },
  ],
};

function formatNum(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "к";
  return String(n);
}

// ─── Карточка для вкладки "Главная" ───────────────────────────────────────────
function HomePostCard({ post, delay = 0 }: { post: typeof HOME_POSTS[0]; delay?: number }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  return (
    <div className="post-card rounded-2xl p-5 opacity-0 animate-fade-in" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-start gap-3 mb-4">
        <div className="avatar-ring flex-shrink-0">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.avatarColor} flex items-center justify-center text-white font-bold font-rubik text-sm`}>
            {post.avatar}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-white text-sm">@{post.author}</span>
            <span className="text-xs text-muted-foreground">{post.time}</span>
          </div>
          <p className="text-sm text-foreground/90 mt-2 leading-relaxed">{post.content}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {post.tags.map(tag => (
          <span key={tag} className="trend-tag text-xs px-2.5 py-1 rounded-full text-accent font-medium cursor-pointer">{tag}</span>
        ))}
      </div>
      <div className="flex items-center gap-5 pt-3 border-t border-white/5">
        <button
          className={`like-btn flex items-center gap-1.5 text-sm font-medium transition-colors ${liked ? "text-pink-500" : "text-muted-foreground hover:text-pink-400"}`}
          onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}
        >
          <Icon name="Heart" size={16} className={liked ? "fill-current" : ""} />
          {formatNum(likes)}
        </button>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
          <Icon name="MessageCircle" size={16} />{formatNum(post.comments)}
        </button>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-purple-400 transition-colors">
          <Icon name="Repeat2" size={16} />{formatNum(post.reposts)}
        </button>
        <div className="ml-auto flex items-center gap-3">
          <button className="text-muted-foreground hover:text-white transition-colors"><Icon name="Bookmark" size={16} /></button>
          <button className="text-muted-foreground hover:text-white transition-colors"><Icon name="Share2" size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// ─── TikTok-слайд ─────────────────────────────────────────────────────────────
function FeedSlide({ post, isActive }: { post: typeof ALL_POSTS[0]; isActive: boolean }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [reported, setReported] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Фоновый градиент поста */}
      <div className={`absolute inset-0 bg-gradient-to-br ${post.avatarColor} opacity-5`} />

      {/* Контент поста */}
      <div className="relative z-10 w-full max-w-xl px-6 pr-20">
        {/* Автор */}
        <div className="flex items-center gap-3 mb-5">
          <div className="avatar-ring flex-shrink-0">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${post.avatarColor} flex items-center justify-center text-white font-bold font-rubik`}>
              {post.avatar}
            </div>
          </div>
          <div>
            <div className="font-semibold text-white">@{post.author}</div>
            <div className="text-xs text-white/50">{post.time}</div>
          </div>
          <button className="ml-auto px-3 py-1 rounded-full border border-white/20 text-white text-xs hover:bg-white/10 transition-colors">
            + Подписаться
          </button>
        </div>

        {/* Текст */}
        <p className={`text-white leading-relaxed mb-5 transition-all duration-500 ${isActive ? "text-base" : "text-sm opacity-60"}`}>
          {post.content}
        </p>

        {/* Теги */}
        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="text-cyan-400 text-sm font-medium cursor-pointer hover:text-cyan-300 transition-colors">{tag}</span>
          ))}
        </div>
      </div>

      {/* Правый фиксированный блок действий */}
      <div className="absolute right-4 bottom-8 flex flex-col items-center gap-5 z-20">
        {/* Аватар */}
        <div className="relative">
          <div className="avatar-ring">
            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${post.avatarColor} flex items-center justify-center text-white font-bold font-rubik`}>
              {post.avatar}
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
            <Icon name="Plus" size={10} className="text-white" />
          </div>
        </div>

        {/* Лайк */}
        <button
          className="flex flex-col items-center gap-1"
          onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}
        >
          <div className={`w-11 h-11 rounded-full glass flex items-center justify-center transition-all duration-200 hover:scale-110 ${liked ? "bg-pink-500/30" : ""}`}>
            <Icon name="Heart" size={22} className={liked ? "text-pink-500 fill-current" : "text-white"} />
          </div>
          <span className="text-white text-xs font-medium">{formatNum(likes)}</span>
        </button>

        {/* Комментарии */}
        <button className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
            <Icon name="MessageCircle" size={22} className="text-white" />
          </div>
          <span className="text-white text-xs font-medium">{formatNum(post.comments)}</span>
        </button>

        {/* Репост */}
        <button className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform">
            <Icon name="Repeat2" size={22} className="text-white" />
          </div>
          <span className="text-white text-xs font-medium">{formatNum(post.reposts)}</span>
        </button>

        {/* Пожаловаться */}
        <button
          className="flex flex-col items-center gap-1"
          onClick={() => setReported(!reported)}
        >
          <div className={`w-11 h-11 rounded-full glass flex items-center justify-center hover:scale-110 transition-all ${reported ? "bg-orange-500/30" : ""}`}>
            <Icon name="Flag" size={20} className={reported ? "text-orange-400" : "text-white/60"} />
          </div>
        </button>
      </div>
    </div>
  );
}

// ─── TrendsPanel ──────────────────────────────────────────────────────────────
function TrendsPanel() {
  return (
    <div className="space-y-5">
      <div className="glass rounded-2xl p-5">
        <h3 className="font-rubik font-bold text-sm uppercase tracking-widest gradient-text mb-4">🔥 Хэштеги</h3>
        <div className="flex flex-wrap gap-2">
          {TRENDS.hashtags.map((t, i) => (
            <div key={t.tag} className="trend-tag rounded-full px-3 py-1.5 cursor-pointer opacity-0 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="text-sm font-medium text-white">{t.tag}</span>
              <span className="text-xs text-muted-foreground ml-1.5">{t.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-rubik font-bold text-sm uppercase tracking-widest gradient-text mb-4">🎵 Звуки</h3>
        <div className="space-y-3">
          {TRENDS.sounds.map((s, i) => (
            <div key={s.name} className="flex items-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Icon name="Music" size={14} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.artist} · {s.uses} использ.</div>
              </div>
              <Icon name="Play" size={14} className="text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-rubik font-bold text-sm uppercase tracking-widest gradient-text mb-4">⚡ Топ постов</h3>
        <div className="space-y-3">
          {TRENDS.topPosts.map((p, i) => (
            <div key={p.author} className="flex items-start gap-3 opacity-0 animate-fade-in cursor-pointer hover:opacity-80 transition-opacity" style={{ animationDelay: `${i * 80}ms` }}>
              <span className="text-2xl font-rubik font-black text-white/15 leading-none w-6 flex-shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground mb-0.5">@{p.author}</div>
                <div className="text-sm text-white/80 truncate">{p.preview}</div>
              </div>
              <div className="flex items-center gap-1 text-pink-500 text-xs font-medium flex-shrink-0">
                <Icon name="Heart" size={10} className="fill-current" />{p.likes}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Главный компонент ─────────────────────────────────────────────────────────
export default function Index() {
  const [mainTab, setMainTab] = useState<MainTab>("home");
  const [feedTab, setFeedTab] = useState<FeedTab>("recommendations");
  const [currentIndex, setCurrentIndex] = useState(0);
  const feedPosts = ALL_POSTS.filter(p => p.type === feedTab);

  const goTo = (idx: number) => {
    const clamped = Math.max(0, Math.min(feedPosts.length - 1, idx));
    setCurrentIndex(clamped);
  };

  // Сброс индекса при смене вкладки ленты
  useEffect(() => { setCurrentIndex(0); }, [feedTab]);

  const touchStartY = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) goTo(currentIndex + (diff > 0 ? 1 : -1));
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 30) goTo(currentIndex + (e.deltaY > 0 ? 1 : -1));
  };

  return (
    <div className="min-h-screen bg-background font-golos overflow-hidden">
      <div className="noise-overlay" />

      {/* Ambient blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-600/8 rounded-full blur-3xl" />
      </div>

      {/* ── HEADER ── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Лого */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-black text-xs font-rubik">R</span>
            </div>
            <span className="font-rubik font-black text-lg gradient-text">РенДит</span>
          </div>

          {/* Центр: Главная / Лента */}
          <div className="flex items-center gap-1 glass rounded-2xl p-1">
            <button
              onClick={() => setMainTab("home")}
              className={`px-5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${mainTab === "home" ? "bg-gradient-to-r from-pink-500/25 to-purple-600/25 text-white border border-white/10" : "text-muted-foreground hover:text-white"}`}
            >
              Главная
            </button>
            <button
              onClick={() => setMainTab("feed")}
              className={`px-5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${mainTab === "feed" ? "bg-gradient-to-r from-pink-500/25 to-purple-600/25 text-white border border-white/10" : "text-muted-foreground hover:text-white"}`}
            >
              Лента
            </button>
          </div>

          {/* Правый угол */}
          <div className="flex items-center gap-2">
            <button className="glass rounded-xl p-2 text-muted-foreground hover:text-white transition-colors">
              <Icon name="Bell" size={16} />
            </button>
            <div className="avatar-ring cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">Я</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ ГЛАВНАЯ ══════════ */}
      {mainTab === "home" && (
        <div className="pt-14 pb-6">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {/* Новый пост */}
                <div className="glass rounded-2xl p-4 flex items-center gap-3 cursor-pointer hover:border-purple-500/30 transition-all border border-white/5">
                  <div className="avatar-ring flex-shrink-0">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">Я</span>
                    </div>
                  </div>
                  <span className="text-muted-foreground text-sm flex-1">Что у тебя нового? Поделись с миром...</span>
                  <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold hover:scale-105 transition-transform">
                    Пост
                  </button>
                </div>
                <div className="flex items-center gap-2 px-1">
                  <div className="w-1 h-4 rounded-full bg-gradient-to-b from-pink-500 to-purple-600" />
                  <h2 className="font-rubik font-bold text-sm text-white/70 uppercase tracking-wider">Главная лента</h2>
                </div>
                {HOME_POSTS.map((post, i) => (
                  <HomePostCard key={post.id} post={post} delay={i * 80} />
                ))}
              </div>
              <div className="hidden lg:block">
                <div className="sticky top-20 space-y-4">
                  <div className="flex items-center gap-2 px-1">
                    <div className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-400 to-purple-600" />
                    <h2 className="font-rubik font-bold text-sm text-white/70 uppercase tracking-wider">В тренде</h2>
                  </div>
                  <TrendsPanel />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════ ЛЕНТА (TikTok) ══════════ */}
      {mainTab === "feed" && (
        <div
          className="fixed inset-0 pt-14 pb-20 overflow-hidden"
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Переключатель Рекомендации / Подписки — сверху по центру */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1 glass rounded-2xl p-1">
            <button
              onClick={() => setFeedTab("recommendations")}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${feedTab === "recommendations" ? "bg-white/15 text-white" : "text-white/50 hover:text-white"}`}
            >
              Рекомендации
            </button>
            <button
              onClick={() => setFeedTab("subscriptions")}
              className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${feedTab === "subscriptions" ? "bg-white/15 text-white" : "text-white/50 hover:text-white"}`}
            >
              Подписки
            </button>
          </div>

          {/* Индикатор прогресса */}
          <div className="absolute top-28 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
            {feedPosts.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/30"}`}
              />
            ))}
          </div>

          {/* Слайды */}
          <div className="relative w-full h-full">
            {feedPosts.map((post, i) => (
              <div
                key={post.id}
                className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ transform: `translateY(${(i - currentIndex) * 100}%)` }}
              >
                <FeedSlide post={post} isActive={i === currentIndex} />
              </div>
            ))}
          </div>

          {/* ── Нижняя фиксированная панель навигации ── */}
          <div className="absolute bottom-0 left-0 right-0 z-40 glass border-t border-white/5">
            <div className="flex items-center justify-around py-3 px-8 max-w-sm mx-auto">
              {/* Домой */}
              <button
                className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors"
                onClick={() => setMainTab("home")}
              >
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Icon name="Home" size={20} />
                </div>
                <span className="text-[10px]">Домой</span>
              </button>

              {/* Назад */}
              <button
                className={`flex flex-col items-center gap-1 transition-colors ${currentIndex === 0 ? "text-white/20" : "text-white/60 hover:text-white"}`}
                onClick={() => goTo(currentIndex - 1)}
                disabled={currentIndex === 0}
              >
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Icon name="ChevronLeft" size={22} />
                </div>
                <span className="text-[10px]">Назад</span>
              </button>

              {/* Создать пост */}
              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg glow-purple hover:scale-110 transition-transform">
                  <Icon name="Plus" size={24} className="text-white" />
                </div>
                <span className="text-[10px] text-white/60">Создать</span>
              </button>

              {/* Вперёд */}
              <button
                className={`flex flex-col items-center gap-1 transition-colors ${currentIndex === feedPosts.length - 1 ? "text-white/20" : "text-white/60 hover:text-white"}`}
                onClick={() => goTo(currentIndex + 1)}
                disabled={currentIndex === feedPosts.length - 1}
              >
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Icon name="ChevronRight" size={22} />
                </div>
                <span className="text-[10px]">Далее</span>
              </button>

              {/* Поиск */}
              <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Icon name="Search" size={20} />
                </div>
                <span className="text-[10px]">Поиск</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
