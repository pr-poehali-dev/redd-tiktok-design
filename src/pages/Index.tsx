import { useState, useRef, useCallback } from "react";
import Icon from "@/components/ui/icon";

type MainTab = "home" | "feed";
type FeedTab = "recommendations" | "subscriptions";

const ALL_POSTS = [
  {
    id: 1,
    author: "kira_vibes",
    avatar: "K",
    avatarColor: "from-pink-500 to-purple-600",
    bg: "from-pink-900/40 via-purple-900/30 to-background",
    time: "2 мин назад",
    content: "Ребят, только что открыла кафе с розовыми облаками на потолке — это уже не просто место, это опыт 🌸✨ Адрес скину в следующем посте",
    likes: 4821, comments: 312, reposts: 88,
    tags: ["#кафе", "#москва", "#эстетика"],
    liked: false, type: "recommendations",
  },
  {
    id: 2,
    author: "tech_maxim",
    avatar: "M",
    avatarColor: "from-cyan-400 to-blue-600",
    bg: "from-cyan-900/40 via-blue-900/30 to-background",
    time: "8 мин назад",
    content: "GPT-5 вышел и я уже потрогал. Если кратко — это не просто апгрейд, это другая лига. Объясняю почему в треде 🧵",
    likes: 12440, comments: 2103, reposts: 5621,
    tags: ["#ИИ", "#технологии", "#gpt5"],
    liked: true, type: "recommendations",
  },
  {
    id: 3,
    author: "dana_creates",
    avatar: "D",
    avatarColor: "from-yellow-400 to-orange-500",
    bg: "from-yellow-900/40 via-orange-900/30 to-background",
    time: "15 мин назад",
    content: "Сделала цифровой арт за 40 минут используя только телефон. Показываю процесс — никаких секретов, только честный труд 🎨",
    likes: 7230, comments: 891, reposts: 431,
    tags: ["#арт", "#digart", "#процесс"],
    liked: false, type: "recommendations",
  },
  {
    id: 4,
    author: "night_runner",
    avatar: "N",
    avatarColor: "from-purple-500 to-pink-500",
    bg: "from-purple-900/40 via-pink-900/30 to-background",
    time: "31 мин назад",
    content: "5км в 2 ночи под неоновым дождём. Город принадлежит бегунам 🌆🏃",
    likes: 3199, comments: 204, reposts: 112,
    tags: ["#бег", "#ночь", "#спорт"],
    liked: false, type: "subscriptions",
  },
  {
    id: 5,
    author: "vsyo_ok_vlad",
    avatar: "V",
    avatarColor: "from-green-400 to-teal-500",
    bg: "from-green-900/40 via-teal-900/30 to-background",
    time: "1 час назад",
    content: "Рецепт пасты карбонара, которую я готовлю каждое воскресенье. Никаких сливок — только классика 🍝 Сохраняйте, пригодится",
    likes: 9841, comments: 1450, reposts: 2230,
    tags: ["#рецепт", "#паста", "#еда"],
    liked: false, type: "subscriptions",
  },
  {
    id: 6,
    author: "trending_igor",
    avatar: "I",
    avatarColor: "from-red-500 to-orange-500",
    bg: "from-red-900/40 via-orange-900/30 to-background",
    time: "45 мин назад",
    content: "Этот момент в метро сегодня собрал 80к просмотров за час. Люди реально добрые — мужчина отдал место бабушке и помог с сумками 🥹",
    likes: 81200, comments: 9340, reposts: 41000,
    tags: ["#доброта", "#метро", "#реальнаяжизнь"],
    liked: false, type: "recommendations",
  },
  {
    id: 7,
    author: "viral_nastya",
    avatar: "A",
    avatarColor: "from-fuchsia-500 to-pink-500",
    bg: "from-fuchsia-900/40 via-pink-900/30 to-background",
    time: "1 час назад",
    content: "Провела эксперимент — неделю без социальных сетей. Результаты вас шокируют (нет, но читайте всё равно) 😄",
    likes: 34000, comments: 5100, reposts: 12200,
    tags: ["#эксперимент", "#детокс", "#лайфстайл"],
    liked: false, type: "subscriptions",
  },
  {
    id: 8,
    author: "science_bot",
    avatar: "S",
    avatarColor: "from-blue-400 to-indigo-600",
    bg: "from-blue-900/40 via-indigo-900/30 to-background",
    time: "2 часа назад",
    content: "Учёные обнаружили: мозг воспринимает музыку и математику одними и теми же нейронными паттернами. Случайность? 🎵🔢",
    likes: 22800, comments: 3200, reposts: 8800,
    tags: ["#наука", "#мозг", "#музыка"],
    liked: false, type: "recommendations",
  },
];

const HOME_POSTS = ALL_POSTS.slice(0, 5);

const ALL_TAGS = ["Все", "#ИИ", "#технологии", "#арт", "#кафе", "#москва", "#еда", "#спорт", "#наука", "#лайфстайл", "#gpt5"];

const SUGGESTED = [
  { author: "photo_lena", avatar: "L", avatarColor: "from-rose-400 to-pink-600", followers: "12.4к" },
  { author: "code_wolf", avatar: "W", avatarColor: "from-indigo-400 to-purple-600", followers: "8.9к" },
  { author: "food_yan", avatar: "Y", avatarColor: "from-amber-400 to-orange-500", followers: "31к" },
];

const ACTIVE_USERS = [
  { author: "tech_maxim", avatar: "M", avatarColor: "from-cyan-400 to-blue-600", posts: 3, online: true },
  { author: "kira_vibes", avatar: "K", avatarColor: "from-pink-500 to-purple-600", posts: 1, online: true },
  { author: "science_bot", avatar: "S", avatarColor: "from-blue-400 to-indigo-600", posts: 2, online: false },
  { author: "dana_creates", avatar: "D", avatarColor: "from-yellow-400 to-orange-500", posts: 1, online: true },
];

const HOT_TAGS = [
  { tag: "#GPT5", count: "841к", heat: 98 },
  { tag: "#кибер2025", count: "320к", heat: 76 },
  { tag: "#ночнойгород", count: "218к", heat: 61 },
  { tag: "#рецепты", count: "195к", heat: 54 },
  { tag: "#диджитал", count: "167к", heat: 44 },
];

function formatNum(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "к";
  return String(n);
}

// ─── Карточка главной ────────────────────────────────────────────────────────
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
        <button className={`like-btn flex items-center gap-1.5 text-sm font-medium transition-colors ${liked ? "text-pink-500" : "text-muted-foreground hover:text-pink-400"}`}
          onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}>
          <Icon name="Heart" size={16} className={liked ? "fill-current" : ""} />{formatNum(likes)}
        </button>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
          <Icon name="MessageCircle" size={16} />{formatNum(post.comments)}
        </button>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-purple-400 transition-colors">
          <Icon name="Repeat2" size={16} />{formatNum(post.reposts)}
        </button>
        <div className="ml-auto flex gap-3">
          <button className="text-muted-foreground hover:text-white transition-colors"><Icon name="Bookmark" size={16} /></button>
          <button className="text-muted-foreground hover:text-white transition-colors"><Icon name="Share2" size={16} /></button>
        </div>
      </div>
    </div>
  );
}

// ─── Полноэкранный слайд ──────────────────────────────────────────────────────
function FeedSlide({
  post, isActive, onTagClick,
}: {
  post: typeof ALL_POSTS[0];
  isActive: boolean;
  onTagClick: (tag: string) => void;
}) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [bookmarked, setBookmarked] = useState(false);
  const [reported, setReported] = useState(false);

  return (
    <div className={`relative w-full h-full flex flex-col justify-end pb-24 transition-all duration-700 ${isActive ? "opacity-100" : "opacity-0"}`}>
      {/* Атмосферный фон */}
      <div className={`absolute inset-0 bg-gradient-to-br ${post.bg}`} />
      <div className={`absolute inset-0 bg-gradient-to-br ${post.avatarColor} opacity-[0.07]`} />
      {/* Виньетка снизу */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      {/* Большой декоративный текст позади */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[18vw] font-black font-rubik text-white/[0.02] leading-none">
          {post.avatar}
        </span>
      </div>

      {/* Контент поста */}
      <div className="relative z-10 px-8 pb-2 max-w-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="avatar-ring">
            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${post.avatarColor} flex items-center justify-center text-white font-bold font-rubik`}>
              {post.avatar}
            </div>
          </div>
          <div>
            <div className="font-semibold text-white text-sm">@{post.author}</div>
            <div className="text-xs text-white/40">{post.time}</div>
          </div>
          <button className="ml-3 px-3 py-1 rounded-full border border-white/25 text-white text-xs hover:bg-white/10 transition-colors font-medium">
            + Подписаться
          </button>
        </div>

        <p className="text-white/95 text-base leading-relaxed mb-4 font-medium">
          {post.content}
        </p>

        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className="text-cyan-400 text-sm font-medium hover:text-cyan-200 transition-colors hover:underline"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Правые кнопки действий */}
      <div className="absolute right-5 bottom-28 flex flex-col items-center gap-4 z-20">
        <div className="relative mb-1">
          <div className="avatar-ring">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.avatarColor} flex items-center justify-center text-white font-bold font-rubik text-sm`}>
              {post.avatar}
            </div>
          </div>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
            <Icon name="Plus" size={8} className="text-white" />
          </div>
        </div>

        <ActionBtn icon="Heart" count={formatNum(likes)} active={liked} activeColor="text-pink-500"
          onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }} />
        <ActionBtn icon="MessageCircle" count={formatNum(post.comments)} />
        <ActionBtn icon="Repeat2" count={formatNum(post.reposts)} />
        <ActionBtn icon="Bookmark" active={bookmarked} activeColor="text-yellow-400"
          onClick={() => setBookmarked(!bookmarked)} />
        <ActionBtn icon="Flag" active={reported} activeColor="text-orange-400"
          onClick={() => setReported(!reported)} />
      </div>
    </div>
  );
}

function ActionBtn({
  icon, count, active, activeColor, onClick,
}: {
  icon: string; count?: string; active?: boolean; activeColor?: string; onClick?: () => void;
}) {
  return (
    <button className="flex flex-col items-center gap-0.5" onClick={onClick}>
      <div className={`w-10 h-10 rounded-full glass flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 ${active ? "bg-white/15" : ""}`}>
        <Icon name={icon} size={20} className={active && activeColor ? `${activeColor} fill-current` : "text-white"} />
      </div>
      {count && <span className="text-white text-[10px] font-medium">{count}</span>}
    </button>
  );
}

// ─── Правая панель ────────────────────────────────────────────────────────────
function RightPanel({ activeTag, onTagClick, feedTab, setFeedTab }: {
  activeTag: string;
  onTagClick: (tag: string) => void;
  feedTab: FeedTab;
  setFeedTab: (t: FeedTab) => void;
}) {
  return (
    <div className="h-full overflow-y-auto pr-1 space-y-4 scrollbar-thin" style={{ scrollbarWidth: "none" }}>

      {/* Переключатель Рек / Подписки */}
      <div className="glass rounded-2xl p-1 flex gap-1">
        <button onClick={() => setFeedTab("recommendations")}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${feedTab === "recommendations" ? "bg-gradient-to-r from-pink-500/30 to-purple-600/30 text-white border border-white/10" : "text-muted-foreground hover:text-white"}`}>
          Рекомендации
        </button>
        <button onClick={() => setFeedTab("subscriptions")}
          className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${feedTab === "subscriptions" ? "bg-gradient-to-r from-pink-500/30 to-purple-600/30 text-white border border-white/10" : "text-muted-foreground hover:text-white"}`}>
          Подписки
        </button>
      </div>

      {/* Фильтр по тегам */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Filter" size={14} className="text-purple-400" />
          <h3 className="text-xs font-rubik font-bold uppercase tracking-widest text-white/60">Фильтр тегов</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                activeTag === tag
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-105 shadow-lg"
                  : "trend-tag text-white/60 hover:text-white"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Горячие теги с heat-баром */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm">🔥</span>
          <h3 className="text-xs font-rubik font-bold uppercase tracking-widest text-white/60">Горят сейчас</h3>
        </div>
        <div className="space-y-2.5">
          {HOT_TAGS.map((t, i) => (
            <button key={t.tag} onClick={() => onTagClick(t.tag)} className="w-full text-left group">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">{t.tag}</span>
                <span className="text-xs text-muted-foreground">{t.count}</span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-500"
                  style={{ width: `${t.heat}%`, animationDelay: `${i * 100}ms` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Активные авторы */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Zap" size={14} className="text-yellow-400" />
          <h3 className="text-xs font-rubik font-bold uppercase tracking-widest text-white/60">Активны сейчас</h3>
        </div>
        <div className="space-y-3">
          {ACTIVE_USERS.map(u => (
            <div key={u.author} className="flex items-center gap-2.5 group cursor-pointer">
              <div className="relative">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${u.avatarColor} flex items-center justify-center text-white font-bold text-xs font-rubik`}>
                  {u.avatar}
                </div>
                {u.online && <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-background" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white group-hover:text-purple-300 transition-colors truncate">@{u.author}</div>
                <div className="text-[10px] text-muted-foreground">{u.posts} постов сегодня</div>
              </div>
              <button className="text-[10px] px-2 py-0.5 rounded-full border border-white/15 text-white/50 hover:border-purple-400 hover:text-purple-300 transition-all">
                +
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Подписаться на авторов */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="Users" size={14} className="text-cyan-400" />
          <h3 className="text-xs font-rubik font-bold uppercase tracking-widest text-white/60">Подписаться</h3>
        </div>
        <div className="space-y-3">
          {SUGGESTED.map(u => (
            <div key={u.author} className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${u.avatarColor} flex items-center justify-center text-white font-bold text-xs font-rubik flex-shrink-0`}>
                {u.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-white truncate">@{u.author}</div>
                <div className="text-[10px] text-muted-foreground">{u.followers} подписчиков</div>
              </div>
              <button className="text-[10px] px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-500/80 to-purple-600/80 text-white font-medium hover:scale-105 transition-transform flex-shrink-0">
                + Фол
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Мини-статистика */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="BarChart2" size={14} className="text-green-400" />
          <h3 className="text-xs font-rubik font-bold uppercase tracking-widest text-white/60">Твоя активность</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "Лайков", val: "142", icon: "Heart", color: "text-pink-400" },
            { label: "Постов", val: "8", icon: "FileText", color: "text-purple-400" },
            { label: "Читателей", val: "230", icon: "Users", color: "text-cyan-400" },
            { label: "Просмотров", val: "1.2к", icon: "Eye", color: "text-yellow-400" },
          ].map(s => (
            <div key={s.label} className="bg-white/[0.04] rounded-xl p-2.5 flex flex-col gap-1">
              <Icon name={s.icon} size={14} className={s.color} />
              <div className="text-sm font-bold text-white font-rubik">{s.val}</div>
              <div className="text-[10px] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── TrendsPanel для Главной ──────────────────────────────────────────────────
function TrendsPanel() {
  return (
    <div className="space-y-5">
      <div className="glass rounded-2xl p-5">
        <h3 className="font-rubik font-bold text-sm uppercase tracking-widest gradient-text mb-4">🔥 Хэштеги</h3>
        <div className="flex flex-wrap gap-2">
          {HOT_TAGS.map((t, i) => (
            <div key={t.tag} className="trend-tag rounded-full px-3 py-1.5 cursor-pointer opacity-0 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <span className="text-sm font-medium text-white">{t.tag}</span>
              <span className="text-xs text-muted-foreground ml-1.5">{t.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="glass rounded-2xl p-5">
        <h3 className="font-rubik font-bold text-sm uppercase tracking-widest gradient-text mb-4">💡 Рекомендуем</h3>
        <div className="space-y-3">
          {SUGGESTED.map((u, i) => (
            <div key={u.author} className="flex items-center gap-3 opacity-0 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${u.avatarColor} flex items-center justify-center text-white font-bold text-xs font-rubik`}>{u.avatar}</div>
              <div className="flex-1"><div className="text-sm text-white">@{u.author}</div><div className="text-xs text-muted-foreground">{u.followers}</div></div>
              <button className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/70 to-purple-600/70 text-white hover:scale-105 transition-transform">+</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Главный компонент ────────────────────────────────────────────────────────
export default function Index() {
  const [mainTab, setMainTab] = useState<MainTab>("home");
  const [feedTab, setFeedTab] = useState<FeedTab>("recommendations");
  const [activeTag, setActiveTag] = useState("Все");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredPosts = ALL_POSTS.filter(p => {
    const matchType = p.type === feedTab;
    const matchTag = activeTag === "Все" || p.tags.includes(activeTag);
    return matchType && matchTag;
  });

  const goTo = useCallback((idx: number) => {
    setCurrentIndex(Math.max(0, Math.min(filteredPosts.length - 1, idx)));
  }, [filteredPosts.length]);

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    setCurrentIndex(0);
  };

  const touchStartY = useRef(0);
  const lastWheel = useRef(0);

  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now - lastWheel.current < 400) return;
    if (Math.abs(e.deltaY) > 30) {
      lastWheel.current = now;
      goTo(currentIndex + (e.deltaY > 0 ? 1 : -1));
    }
  };

  return (
    <div className="min-h-screen bg-background font-golos overflow-hidden">
      <div className="noise-overlay" />

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-600/8 rounded-full blur-3xl" />
      </div>

      {/* ── HEADER ── */}
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

      {/* ══════════ ГЛАВНАЯ ══════════ */}
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

      {/* ══════════ ЛЕНТА — split layout ══════════ */}
      {mainTab === "feed" && (
        <div className="fixed inset-0 pt-14 flex" onWheel={handleWheel}
          onTouchStart={e => { touchStartY.current = e.touches[0].clientY; }}
          onTouchEnd={e => {
            const diff = touchStartY.current - e.changedTouches[0].clientY;
            if (Math.abs(diff) > 50) goTo(currentIndex + (diff > 0 ? 1 : -1));
          }}
        >
          {/* ── Левая часть: пост ── */}
          <div className="flex-1 relative overflow-hidden">
            {filteredPosts.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center">
                  <Icon name="Search" size={28} className="text-purple-400" />
                </div>
                <p className="text-muted-foreground text-sm">Нет постов по тегу <span className="text-white font-medium">{activeTag}</span></p>
                <button onClick={() => setActiveTag("Все")} className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm">
                  Показать все
                </button>
              </div>
            ) : (
              filteredPosts.map((post, i) => (
                <div key={post.id}
                  className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{ transform: `translateY(${(i - currentIndex) * 100}%)` }}
                >
                  <FeedSlide post={post} isActive={i === currentIndex} onTagClick={handleTagClick} />
                </div>
              ))
            )}

            {/* Индикаторы слайдов */}
            {filteredPosts.length > 0 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5">
                {filteredPosts.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/25"}`}
                  />
                ))}
              </div>
            )}

            {/* Нижняя навигация */}
            <div className="absolute bottom-0 left-0 right-0 z-40 glass border-t border-white/5">
              <div className="flex items-center justify-around py-3 px-8 max-w-sm mx-auto">
                <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors" onClick={() => setMainTab("home")}>
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                    <Icon name="Home" size={20} />
                  </div>
                  <span className="text-[10px]">Домой</span>
                </button>
                <button
                  className={`flex flex-col items-center gap-1 transition-colors ${currentIndex === 0 ? "text-white/20" : "text-white/60 hover:text-white"}`}
                  onClick={() => goTo(currentIndex - 1)} disabled={currentIndex === 0}
                >
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                    <Icon name="ChevronLeft" size={22} />
                  </div>
                  <span className="text-[10px]">Назад</span>
                </button>
                <button className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Icon name="Plus" size={24} className="text-white" />
                  </div>
                  <span className="text-[10px] text-white/60">Создать</span>
                </button>
                <button
                  className={`flex flex-col items-center gap-1 transition-colors ${currentIndex === filteredPosts.length - 1 ? "text-white/20" : "text-white/60 hover:text-white"}`}
                  onClick={() => goTo(currentIndex + 1)} disabled={currentIndex === filteredPosts.length - 1}
                >
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                    <Icon name="ChevronRight" size={22} />
                  </div>
                  <span className="text-[10px]">Далее</span>
                </button>
                <button className="flex flex-col items-center gap-1 text-white/60 hover:text-white transition-colors">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                    <Icon name="Search" size={20} />
                  </div>
                  <span className="text-[10px]">Поиск</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Правая панель ── */}
          <div className="w-72 flex-shrink-0 border-l border-white/5 glass h-full pt-4 px-4 pb-4 overflow-hidden">
            <RightPanel
              activeTag={activeTag}
              onTagClick={handleTagClick}
              feedTab={feedTab}
              setFeedTab={setFeedTab}
            />
          </div>
        </div>
      )}
    </div>
  );
}
