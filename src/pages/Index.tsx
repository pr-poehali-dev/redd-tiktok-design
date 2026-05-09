import { useState } from "react";
import Icon from "@/components/ui/icon";

type Tab = "feed" | "subscriptions" | "recommendations";

const POSTS = [
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
  },
];

const SUB_POSTS = [
  {
    id: 10,
    author: "kira_vibes",
    avatar: "K",
    avatarColor: "from-pink-500 to-purple-600",
    time: "5 мин назад",
    content: "Итак, адрес того самого кафе — ул. Кузнецкий Мост, 7. Скажите что от меня — дадут скидку 10% 💖",
    likes: 1820,
    comments: 445,
    reposts: 230,
    tags: ["#кафе", "#москва"],
    liked: false,
  },
  {
    id: 11,
    author: "dana_creates",
    avatar: "D",
    avatarColor: "from-yellow-400 to-orange-500",
    time: "20 мин назад",
    content: "Новая серия работ готова. 12 иллюстраций о том, каким мог быть 2077 если бы интернет придумали в СССР 🛸",
    likes: 5610,
    comments: 733,
    reposts: 321,
    tags: ["#арт", "#ретрофутуризм"],
    liked: true,
  },
];

const REC_POSTS = [
  {
    id: 20,
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
  },
  {
    id: 21,
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
  },
  {
    id: 22,
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
  },
];

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

function formatNumber(n: number) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(".0", "") + "к";
  return String(n);
}

function PostCard({ post, delay = 0 }: { post: typeof POSTS[0]; delay?: number }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <div
      className="post-card rounded-2xl p-5 opacity-0 animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
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
          <span key={tag} className="trend-tag text-xs px-2.5 py-1 rounded-full text-accent font-medium cursor-pointer">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-5 pt-3 border-t border-white/5">
        <button
          className={`like-btn flex items-center gap-1.5 text-sm font-medium transition-colors ${liked ? "liked text-pink-500" : "text-muted-foreground hover:text-pink-400"}`}
          onClick={toggleLike}
        >
          <Icon name="Heart" size={16} className={liked ? "fill-current" : ""} />
          {formatNumber(likes)}
        </button>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-cyan-400 transition-colors">
          <Icon name="MessageCircle" size={16} />
          {formatNumber(post.comments)}
        </button>
        <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-purple-400 transition-colors">
          <Icon name="Repeat2" size={16} />
          {formatNumber(post.reposts)}
        </button>
        <div className="ml-auto flex items-center gap-3">
          <button className="text-muted-foreground hover:text-white transition-colors">
            <Icon name="Bookmark" size={16} />
          </button>
          <button className="text-muted-foreground hover:text-white transition-colors">
            <Icon name="Share2" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TrendsPanel() {
  return (
    <div className="space-y-5">
      <div className="glass rounded-2xl p-5">
        <h3 className="font-rubik font-bold text-sm uppercase tracking-widest gradient-text mb-4">🔥 Хэштеги</h3>
        <div className="flex flex-wrap gap-2">
          {TRENDS.hashtags.map((t, i) => (
            <div
              key={t.tag}
              className="trend-tag rounded-full px-3 py-1.5 cursor-pointer opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
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
            <div
              key={s.name}
              className="flex items-center gap-3 opacity-0 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
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
            <div
              key={p.author}
              className="flex items-start gap-3 opacity-0 animate-fade-in cursor-pointer hover:opacity-80 transition-opacity"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="text-2xl font-rubik font-black text-white/15 leading-none w-6 flex-shrink-0">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-muted-foreground mb-0.5">@{p.author}</div>
                <div className="text-sm text-white/80 truncate">{p.preview}</div>
              </div>
              <div className="flex items-center gap-1 text-pink-500 text-xs font-medium flex-shrink-0">
                <Icon name="Heart" size={10} className="fill-current" />
                {p.likes}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("feed");

  const postsByTab: Record<Tab, typeof POSTS> = {
    feed: POSTS,
    subscriptions: SUB_POSTS,
    recommendations: REC_POSTS,
  };

  const tabLabels: Record<Tab, string> = {
    feed: "Лента",
    subscriptions: "Подписки",
    recommendations: "Рекомендации",
  };

  const sectionLabels: Record<Tab, string> = {
    feed: "Главная лента",
    subscriptions: "От ваших подписок",
    recommendations: "Для вас",
  };

  const currentPosts = postsByTab[activeTab];

  return (
    <div className="min-h-screen bg-background font-golos pb-20 md:pb-0">
      <div className="noise-overlay" />

      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-cyan-600/8 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 via-purple-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-black text-xs font-rubik">R</span>
            </div>
            <span className="font-rubik font-black text-xl gradient-text animate-neon-flicker">РенДит</span>
          </div>

          <div className="hidden md:flex items-center gap-1 glass rounded-2xl p-1">
            {(["feed", "subscriptions", "recommendations"] as Tab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-pink-500/20 to-purple-600/20 text-white border border-white/10"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="glass rounded-xl p-2.5 text-muted-foreground hover:text-white transition-colors">
              <Icon name="Search" size={18} />
            </button>
            <button className="glass rounded-xl p-2.5 text-muted-foreground hover:text-white transition-colors relative">
              <Icon name="Bell" size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full" />
            </button>
            <div className="avatar-ring cursor-pointer">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">Я</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile tabs */}
      <div className="md:hidden sticky top-16 z-40 glass border-b border-white/5">
        <div className="flex">
          {(["feed", "subscriptions", "recommendations"] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-xs font-medium transition-colors ${
                activeTab === tab
                  ? "text-white border-b-2 border-pink-500"
                  : "text-muted-foreground"
              }`}
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Posts */}
          <div className="lg:col-span-2 space-y-4">
            {/* New post */}
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

            {/* Section label */}
            <div className="flex items-center gap-2 px-1">
              <div className="w-1 h-4 rounded-full bg-gradient-to-b from-pink-500 to-purple-600" />
              <h2 className="font-rubik font-bold text-sm text-white/70 uppercase tracking-wider">
                {sectionLabels[activeTab]}
              </h2>
            </div>

            {/* Posts list */}
            <div className="space-y-4" key={activeTab}>
              {currentPosts.map((post, i) => (
                <PostCard key={post.id} post={post} delay={i * 80} />
              ))}

              {activeTab === "subscriptions" && (
                <div className="text-center py-10 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
                  <div className="inline-flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center">
                      <Icon name="Users" size={28} className="text-purple-400" />
                    </div>
                    <p className="text-muted-foreground text-sm">Подпишитесь на авторов, чтобы видеть их посты здесь</p>
                    <button className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold hover:scale-105 transition-transform">
                      Найти авторов
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Trends sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center gap-2 px-1">
                <div className="w-1 h-4 rounded-full bg-gradient-to-b from-cyan-400 to-purple-600" />
                <h2 className="font-rubik font-bold text-sm text-white/70 uppercase tracking-wider">В тренде</h2>
              </div>
              <TrendsPanel />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/5 z-50">
        <div className="flex items-center justify-around py-3">
          {[
            { icon: "Home", label: "Лента" },
            { icon: "Users", label: "Подписки" },
            { icon: "Sparkles", label: "Для вас" },
            { icon: "TrendingUp", label: "Тренды" },
            { icon: "User", label: "Профиль" },
          ].map(item => (
            <button key={item.icon} className="flex flex-col items-center gap-1 text-muted-foreground hover:text-white transition-colors">
              <Icon name={item.icon} size={20} />
              <span className="text-[9px]">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}