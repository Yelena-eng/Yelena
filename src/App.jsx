import { useState, useEffect, useRef } from 'react'
import './App.css'

const PROFILE = {
  name: '李宜晓',
  subtitle: 'AI 产品 · 商业分析 · 海外业务',
  siteTitle: 'BRIDGE / 宜晓',
  avatarEmoji: '👩‍🎓',
  location: '来自 英国曼彻斯特 / 中国郑州，很高兴遇见你。',
  email: 'liyixiao2022@126.com',
  phone: '+86 199 3978 0007',
  github: 'github.com/Yelena-eng',
}

const CATEGORIES = [
  { name: '主页', href: '#home', count: null },
  { name: '个人简介', href: '#about', count: '1' },
  { name: '项目作品', href: '#projects', count: '3' },
  { name: '技能栈', href: '#skills', count: '12' },
  { name: '实习经历', href: '#experience', count: '3' },
  { name: '教育背景', href: '#education', count: '2' },
  { name: '联系方式', href: '#contact', count: '4' },
  { name: '更多', href: '#footer', count: null },
]

const CATEGORY_BADGES = [
  { name: '个人简介', count: '1', color: 'purple' },
  { name: '项目作品', count: '3', color: 'cyan' },
  { name: '技能栈', count: '12', color: 'pink' },
  { name: '实习经历', count: '3', color: 'yellow' },
  { name: '教育背景', count: '2', color: 'green' },
]

const TAGS = [
  'AI产品', '用户研究', '竞品分析', 'AIGC应用', '产品策划',
  '小红书运营', '内容增长', '消费者洞察', '品牌策略',
  '商业分析', '海外业务', '经济学', '中英双语', '2027校招',
  'LinkUp', 'MVP开发', '用户体验', '数据驱动', '管培生',
]

const POSTS = [
  {
    category: '项目作品',
    categoryHref: '#projects',
    tags: ['AI产品', 'AIGC应用', 'MVP开发'],
    tagsHref: ['#projects', '#projects', '#projects'],
    title: 'LinkUp AI 社交连接工具：产品策划与 MVP 实践',
    desc: '围绕课程组队、项目协作等短期合作场景，定义"房间加入—轻量问答—同频地图—留灯连接"核心路径。参与 AIGC 破冰场景设计，协同团队将早期构想转化为可交互 MVP。',
    updated: null,
    updatedLink: '#projects',
    cover: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cyberpunk%20futuristic%20social%20network%20app%20interface%2C%20holographic%20connection%20map%20between%20people%2C%20neon%20purple%20cyan%20glow%2C%20dark%20tech%20background%2C%20hud%20style%2C%20high%20detail&image_size=landscape_16_9',
    cardLink: '#projects',
  },
  {
    category: '项目作品',
    categoryHref: '#projects',
    tags: ['小红书运营', '内容增长', 'AI产品'],
    tagsHref: ['#projects', '#projects', '#projects'],
    title: 'AI 产品内容增长：小红书单篇 8.8k+ 浏览实战',
    desc: '围绕 fancyJobs 等 AI 初创产品独立完成用户分析、内容策划与发布。单篇获 8,834 浏览、795 赞、541 收藏、117 分享，远超 500 赞目标。复盘海外求职用户对 AI 求职的核心关注点。',
    updated: null,
    updatedLink: '#projects',
    cover: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cyberpunk%20data%20growth%20dashboard%20social%20media%2C%20neon%20pink%20and%20purple%20charts%20rising%2C%20xiaohongshu%20style%20content%20cards%2C%20futuristic%20metrics%20display%2C%20holographic%20interface%2C%20dark&image_size=landscape_16_9',
    cardLink: '#projects',
  },
  {
    category: '项目作品',
    categoryHref: '#projects',
    tags: ['消费者洞察', '品牌策略', '英文学术'],
    tagsHref: ['#projects', '#projects', '#projects'],
    title: 'Starbucks Third Place：消费者洞察与英文论文发表',
    desc: '独立完成英文论文并发表于 Finance & Economics (2024)。围绕星巴克"第三空间"策略开展消费者与案例研究，将调研反馈转化为提升年轻用户黏性、空间体验与品牌沟通的策略建议。',
    updated: null,
    updatedLink: '#projects',
    cover: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cyberpunk%20coffee%20shop%20third%20place%20concept%2C%20neon%20signs%20holographic%20brand%20analysis%20charts%2C%20tokyo%20street%20coffee%20storefront%20at%20night%2C%20purple%20and%20orange%20neon%20lighting%2C%20cinematic&image_size=landscape_16_9',
    cardLink: '#projects',
  },
  {
    category: '个人简介',
    categoryHref: '#about',
    tags: ['2027校招', 'AI产品', '商业分析'],
    tagsHref: ['#about', '#about', '#about'],
    title: '关于我：以用户为中心 + 数据驱动的产品思考者',
    desc: '🎓 曼彻斯特大学发展经济学硕士在读，布里斯托大学经济学学士。兼具经济学学术背景与 AIGC 产品实践经验，热爱用产品思维连接技术与商业价值，尤其关注 AI 产品、用户体验与海外市场。',
    updated: null,
    updatedLink: '#about',
    cover: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cyberpunk%20portrait%20of%20confident%20young%20asian%20woman%20product%20manager%2C%20futuristic%20tech%20office%20background%2C%20holographic%20data%20screens%20around%20her%2C%20neon%20purple%20cyan%20lighting%2C%20professional%20cinematic&image_size=landscape_16_9',
    cardLink: '#about',
  },
  {
    category: '实习经历',
    categoryHref: '#experience',
    tags: ['商业分析', '用户研究', '金融服务'],
    tagsHref: ['#experience', '#experience', '#experience'],
    title: '银行实习×2：从大堂到零售，近距离观察用户需求与业务数据',
    desc: '🏦 中国光大银行零售实习生 + 中国银行大堂经理助理。协助客户信息核对、金融产品推广、市场调研与业务数据整理，观察信用卡、账户与转账等业务中的用户痛点与需求。',
    updated: null,
    updatedLink: '#experience',
    cover: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cyberpunk%20futuristic%20banking%20finance%20data%20center%2C%20neon%20green%20and%20cyan%20holographic%20stock%20charts%2C%20digital%20currency%20flow%2C%20dark%20glass%20office%2C%20hud%20interface%20panels%2C%20high%20detail&image_size=landscape_16_9',
    cardLink: '#experience',
  },
  {
    category: '教育背景',
    categoryHref: '#education',
    tags: ['经济学', '中英双语', '海外业务'],
    tagsHref: ['#education', '#education', '#education'],
    title: '英制名校双学位：从布里斯托到曼彻斯特的经济学之旅',
    desc: '🇬🇧 曼彻斯特大学｜发展经济学与政策 硕士 (2025-2026) · 布里斯托大学｜经济学 学士 (2022-2025)。核心课程覆盖微观/宏观经济学、计量经济学、运营管理、统计学、公共部门经济分析等。',
    updated: null,
    updatedLink: '#education',
    cover: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cyberpunk%20uk%20university%20campus%20scene%2C%20historic%20buildings%20with%20neon%20holographic%20holograms%20of%20economics%20equations%2C%20manchester%20bristol%20style%2C%20purple%20blue%20neon%20night%2C%20magical&image_size=landscape_16_9',
    cardLink: '#education',
  },
  {
    category: '技能栈',
    categoryHref: '#skills',
    tags: ['用户研究', '竞品分析', '产品策划'],
    tagsHref: ['#skills', '#skills', '#skills'],
    title: '三维能力模型：产品研究 + 数据工具 + 内容运营',
    desc: '📊 产品与研究：产品需求(88%)、用户研究(90%)、竞品分析(85%)、AIGC设计(88%)；💻 数据与工具：Office(92%)、Figma(78%)、Stata/R(72%)、AI提效(90%)；📝 内容运营：小红书(88%)、文案(85%)、双语(90%)。',
    updated: null,
    updatedLink: '#skills',
    cover: 'https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cyberpunk%20skill%20tree%20holographic%20radar%20chart%20interface%2C%20three%20pillars%20product%20research%20data%20content%2C%20neon%20purple%20cyan%20pink%20progress%20bars%2C%20dark%20background%2C%20hud%20design%2C%203d%20depth&image_size=landscape_16_9',
    cardLink: '#skills',
  },
]

const SKILLS = [
  { name: '用户研究 · 消费者分析', level: 90, cat: '产品与研究' },
  { name: '产品需求梳理 · PRD', level: 88, cat: '产品与研究' },
  { name: 'AIGC 产品应用与设计', level: 88, cat: '产品与研究' },
  { name: '竞品分析 · 市场研究', level: 85, cat: '产品与研究' },
  { name: 'Excel · PPT · Word', level: 92, cat: '数据与工具' },
  { name: 'Codex · Trae · AI 提效', level: 90, cat: '数据与工具' },
  { name: 'Figma · 产品原型设计', level: 78, cat: '数据与工具' },
  { name: 'Stata · R 基础数据分析', level: 72, cat: '数据与工具' },
  { name: '中英双语 · 英文学术写作', level: 90, cat: '内容与运营' },
  { name: '小红书内容策划与增长', level: 88, cat: '内容与运营' },
  { name: '文案撰写 · 产品价值表达', level: 85, cat: '内容与运营' },
  { name: '问卷设计 · 访谈整理', level: 80, cat: '内容与运营' },
]

const EXPERIENCES = [
  {
    title: 'LinkUp AI 社交连接工具 · 产品策划与 MVP 实践',
    role: '团队项目 · 核心产品成员',
    time: '2026.07 – 2026.08',
    points: [
      '围绕课程组队、项目协作场景，梳理用户痛点并定义"房间加入—轻量问答—同频地图—留灯连接"核心用户路径',
      '参与 AIGC 破冰场景设计，提出产品创意并负责核心功能设计、Demo 制作',
      '使用 Codex/Trae 辅助页面搭建、功能调试与交互优化，通过 GitHub 开展团队协作',
    ],
  },
  {
    title: '中国光大银行郑州分行 · 零售实习生',
    role: '零售金融部',
    time: '2024.06 – 2024.07',
    points: [
      '协助客户信息核对、客户维护及零售金融产品推广，记录客户对理财与储蓄产品的关注点',
      '参与市场调研并整理业务数据和沟通记录，协助完成部门周报与数据汇总',
    ],
  },
  {
    title: '中国银行河南省分行 · 大堂经理助理',
    role: '营业部',
    time: '2023.06 – 2023.07',
    points: [
      '负责客户接待、业务引导及基础咨询，观察信用卡、账户与转账业务中的常见需求与痛点',
      '参与信用卡推广执行与反馈整理，协助完成客户分流与业务登记',
    ],
  },
  {
    title: '布里斯托大学中国学联 · 学习部干事 + 辩论社副主席',
    role: '学生社团',
    time: '2022.09 – 2023.05',
    points: [
      '组织学术讲座、辩论赛等校园活动的策划、宣传、嘉宾对接与现场执行',
      '协助外联部对接熊猫外卖等本地商家，参与宣传资源与学生折扣合作权益沟通',
    ],
  },
]

const EDUCATIONS = [
  {
    school: '曼彻斯特大学 (The University of Manchester)',
    degree: '发展经济学与政策 · 硕士',
    time: '2025.09 – 2026.11',
    location: '英国 · 曼彻斯特',
    courses: ['发展微观经济学', '发展宏观经济学', '应用发展经济学', '公共部门经济分析'],
  },
  {
    school: '布里斯托大学 (University of Bristol)',
    degree: '经济学 · 学士',
    time: '2022.09 – 2025.06',
    location: '英国 · 布里斯托',
    courses: ['中级微观经济学', '中级宏观经济学', '计量经济学', '运营管理', '统计学'],
  },
]

function formatUptime() {
  const start = new Date('2026-07-08T00:00:00')
  const now = new Date()
  const diff = now - start
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins = Math.floor((diff % 3600000) / 60000)
  const secs = Math.floor((diff % 60000) / 1000)
  return { days, hours, mins, secs }
}

export default function App() {
  const [darkMode, setDarkMode] = useState('dark')
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicPanel, setMusicPanel] = useState(false)
  const [settingsPanel, setSettingsPanel] = useState(false)
  const [settingsTab, setSettingsTab] = useState('外观')
  const [hue, setHue] = useState(270)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [rightPanel, setRightPanel] = useState(true)
  const [uptime, setUptime] = useState(formatUptime())
  const [activeCat, setActiveCat] = useState('主页')
  const [currentSong] = useState({ title: 'Neon Dreams', artist: 'Synthwave Collective', album: 'Cyber 2077' })
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setUptime(formatUptime()), 1000)
    const t2 = setInterval(() => setTime(new Date()), 1000)
    return () => { clearInterval(t); clearInterval(t2) }
  }, [])

  const timeStr = time.toLocaleTimeString('zh-CN', { hour12: false })
  const dateStr = time.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })
  const hour = time.getHours()
  const greeting = hour < 6 ? '夜深了' : hour < 12 ? '早上好' : hour < 18 ? '下午好' : '晚上好'

  return (
    <div className="rainzt-app" style={{ '--theme-hue': `${hue}deg` }} data-mode={darkMode}>
      {/* 背景层 */}
      <div className="bg-layer">
        <div className="bg-grid"></div>
        <div className="bg-scanline"></div>
        <div className="bg-glow bg-glow-tl"></div>
        <div className="bg-glow bg-glow-br"></div>
      </div>

      {/* 顶部工具栏 */}
      <header className="top-bar">
        <div className="top-bar-left">
          <a href="#home" className="site-logo">
            <span className="logo-bracket">[</span>
            <span className="logo-text">{PROFILE.siteTitle}</span>
            <span className="logo-bracket">]</span>
          </a>
        </div>

        <div className="top-bar-right">
          <button className={`tb-btn ${searchOpen ? 'active' : ''}`} onClick={() => setSearchOpen(v => !v)} title="搜索">
            <span className="tb-icon">⌕</span>
          </button>

          <button className="tb-btn" onClick={() => alert('💡 字体提示：当前已使用赛博朋克字体组合 Orbitron + Share Tech Mono + Rajdhani')} title="切换字体">
            <span className="tb-icon">Aa</span>
          </button>

          <button className={`tb-btn ${musicPanel ? 'active' : ''}`} onClick={() => { setMusicPanel(v => !v); setSettingsPanel(false) }} title="音乐">
            <span className="tb-icon">{musicPlaying ? '♫' : '♪'}</span>
          </button>

          <button className="tb-btn" onClick={() => alert('🌌 背景视频模式提示：把 MP4 放到 /public/bg.mp4 即可启用赛博朋克动态背景！')} title="背景视频">
            <span className="tb-icon">▶</span>
          </button>

          <button className={`tb-btn ${settingsPanel ? 'active' : ''}`} onClick={() => { setSettingsPanel(v => !v); setMusicPanel(false) }} title="显示设置">
            <span className="tb-icon">⚙</span>
          </button>

          <div className="theme-dropdown">
            <button className="tb-btn" onClick={() => {}} title="明暗模式">
              <span className="tb-icon">{darkMode === 'dark' ? '☾' : darkMode === 'light' ? '☀' : '◐'}</span>
            </button>
            <div className="theme-menu">
              <button className={`theme-menu-item ${darkMode === 'light' ? 'active' : ''}`} onClick={() => setDarkMode('light')}>亮色</button>
              <button className={`theme-menu-item ${darkMode === 'dark' ? 'active' : ''}`} onClick={() => setDarkMode('dark')}>暗色</button>
              <button className={`theme-menu-item ${darkMode === 'auto' ? 'active' : ''}`} onClick={() => setDarkMode('auto')}>跟随系统</button>
            </div>
          </div>

          <button className="tb-btn menu-btn" title="菜单" onClick={() => setRightPanel(v => !v)}>
            <span className="tb-icon">☰</span>
          </button>
        </div>
      </header>

      {/* 搜索面板 */}
      {searchOpen && (
        <div className="search-panel">
          <div className="search-inner">
            <input
              className="search-input"
              placeholder="> 搜索项目 / 技能 / 经历..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              autoFocus
            />
            <div className="search-results">
              {searchQuery ? (
                POSTS.filter(p => (p.title + p.desc + p.tags.join()).toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((p, i) => (
                    <a key={i} href={p.cardLink} className="search-result-item" onClick={() => setSearchOpen(false)}>
                      <span className="sr-cat mono">{p.category}</span>
                      <span className="sr-title">{p.title}</span>
                    </a>
                  ))
              ) : (
                <div className="search-hint mono">
                  <span className="sh-title">// 热门搜索：</span>
                  <span className="sh-tag">AI产品</span>
                  <span className="sh-tag">LinkUp</span>
                  <span className="sh-tag">小红书</span>
                  <span className="sh-tag">曼彻斯特</span>
                  <span className="sh-tag">2027校招</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 设置面板 */}
      {settingsPanel && (
        <div className="settings-panel">
          <div className="sp-tabs">
            {['外观', '壁纸', '偏好'].map(tab => (
              <button key={tab} className={`sp-tab ${settingsTab === tab ? 'active' : ''}`} onClick={() => setSettingsTab(tab)}>
                {tab}
              </button>
            ))}
          </div>
          {settingsTab === '外观' && (
            <div className="sp-content">
              <div className="sp-row">
                <label className="sp-label mono">主题色相</label>
                <input type="range" min="0" max="360" value={hue} onChange={e => setHue(+e.target.value)} className="sp-slider" />
                <span className="sp-value mono">{hue}°</span>
              </div>
              <div className="sp-row sp-btn-row">
                <button className="sp-bg-btn active">横幅壁纸</button>
                <button className="sp-bg-btn">全屏壁纸</button>
              </div>
              <div className="sp-row sp-btn-row">
                <button className="sp-bg-btn">全屏透明</button>
                <button className="sp-bg-btn">纯色背景</button>
              </div>
            </div>
          )}
          {settingsTab === '壁纸' && (
            <div className="sp-content sp-wallpapers">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className={`sp-wp-item ${i === 0 ? 'active' : ''}`} style={{ background: `linear-gradient(${135 + i * 20}deg, hsl(${hue}, 70%, ${20 + i * 3}%), hsl(${(hue + 60) % 360}, 70%, ${15 + i * 3}%))` }}></div>
              ))}
            </div>
          )}
          {settingsTab === '偏好' && (
            <div className="sp-content">
              <div className="sp-hint mono">
                // 偏好设置占位<br />
                // - 动效开关<br />
                // - 欢迎弹窗<br />
                // - 音乐自动播放<br />
                // （可后续扩展）
              </div>
            </div>
          )}
        </div>
      )}

      {/* 音乐面板 */}
      {musicPanel && (
        <div className="music-panel">
          <div className="mp-cover">
            <div className="mp-cover-art" style={{ background: `linear-gradient(135deg, hsl(${hue}, 70%, 25%), hsl(${(hue + 180) % 360}, 70%, 20%))` }}>
              <div className="mp-vinyl"></div>
            </div>
          </div>
          <div className="mp-info">
            <div className="mp-title">{currentSong.title}</div>
            <div className="mp-artist mono">{currentSong.artist} / {currentSong.album}</div>
          </div>
          <div className="mp-lyrics mono">
            {[
              'Neon lights across the sky',
              'Data streams forever flowing',
              'In the city of tomorrow',
              'We code our dreams together',
              'Every heartbeat synchronized',
              'With the rhythm of the future',
            ].map((line, i) => (
              <div key={i} className={`mp-lyric-line ${i === 1 ? 'active' : ''}`}>{line}</div>
            ))}
          </div>
          <div className="mp-controls">
            <button className="mp-ctrl-btn" title="切换模式">⇄</button>
            <button className="mp-ctrl-btn" title="上一首">⏮</button>
            <button className="mp-ctrl-btn mp-play" onClick={() => setMusicPlaying(p => !p)}>
              {musicPlaying ? '⏸' : '▶'}
            </button>
            <button className="mp-ctrl-btn" title="下一首">⏭</button>
            <button className="mp-ctrl-btn" title="列表">☰</button>
          </div>
          <div className="mp-progress">
            <div className="mp-progress-bar" style={{ width: '32%' }}></div>
          </div>
          <div className="mp-time mono">
            <span>01:12</span><span>03:45</span>
          </div>
        </div>
      )}

      {/* 主体三栏布局 */}
      <div className="main-layout">
        {/* 左侧分类导航 */}
        <aside className="left-nav">
          <div className="ln-section">
            {CATEGORIES.map(cat => (
              <a
                key={cat.name}
                href={cat.href}
                className={`ln-item ${activeCat === cat.name ? 'active' : ''}`}
                onClick={() => setActiveCat(cat.name)}
              >
                <span className="ln-name">{cat.name}</span>
                {cat.count && <span className="ln-count mono">{cat.count}</span>}
              </a>
            ))}
          </div>
        </aside>

        {/* 中央主内容 */}
        <main className="center-content">
          {/* Hero Banner */}
          <section id="home" className="hero-banner">
            <div className="hb-bg">
              <div className="hb-pattern"></div>
              <div className="hb-scan"></div>
              <div className="hb-glow"></div>
            </div>
            <div className="hb-content">
              <div className="hb-time mono">{timeStr}</div>
              <div className="hb-date mono">{dateStr}</div>
              <h1 className="hb-title">
                <span className="hbt-greet">{greeting}，访客。</span>
                <span className="hbt-name glitch-text" data-text={PROFILE.name}>{PROFILE.name}</span>
                <span className="hbt-sub mono">{PROFILE.subtitle}</span>
              </h1>
              <div className="hb-cta-row">
                <a href="#projects" className="hb-cta hb-cta-primary">
                  <span className="hbc-icon">▸</span> 查看项目作品
                </a>
                <a href="#contact" className="hb-cta hb-cta-secondary">
                  <span className="hbc-icon">✉</span> 联系我
                </a>
              </div>
              <div className="hb-progress">
                {[
                  { label: '年度', percent: Math.floor((((new Date().getMonth() + 1) * 30 + new Date().getDate()) / 365) * 100) },
                  { label: '月度', percent: Math.floor((new Date().getDate() / 31) * 100) },
                  { label: '周度', percent: Math.floor(((new Date().getDay() || 7) / 7) * 100) },
                ].map(p => (
                  <div key={p.label} className="hbp-item">
                    <div className="hbp-label mono"><span>{p.label}进度</span><span>{p.percent}%</span></div>
                    <div className="hbp-bar"><div className="hbp-fill" style={{ width: `${p.percent}%` }}></div></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 文章 / 项目 卡片列表 */}
          <section className="posts-section">
            <div className="posts-grid">
              {POSTS.map((post, i) => (
                <article key={i} className="post-card">
                  <a href={post.cardLink} className="post-cover-link">
                    <div className="post-cover">
                      <img src={post.cover} alt={post.title} loading="lazy" />
                      <div className="post-cover-overlay"></div>
                    </div>
                  </a>
                  <div className="post-body">
                    <div className="post-meta-top">
                      <a href={post.categoryHref} className="post-cat mono">{post.category}</a>
                      {post.updated && (
                        <a href={post.updatedLink} className="post-updated mono">· 已于 {post.updated} 更新</a>
                      )}
                    </div>
                    <a href={post.cardLink} className="post-title-link">
                      <h3 className="post-title">{post.title}</h3>
                    </a>
                    <p className="post-desc">{post.desc}</p>
                    <div className="post-tags">
                      {post.tags.map((tag, ti) => (
                        <a key={ti} href={post.tagsHref[ti]} className="post-tag mono">
                          #{tag}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="posts-pagination">
              <button className="pg-btn mono">下一页 →</button>
            </div>
          </section>

          {/* 技能详情区块 */}
          <section id="skills" className="section-block">
            <div className="section-header">
              <h2 className="section-title neon-text-purple">[ 技能栈详情 ]</h2>
              <span className="section-sub mono">// SKILL_MATRIX.exe</span>
            </div>
            <div className="skills-detail-grid">
              {['产品与研究', '数据与工具', '内容与运营'].map(cat => (
                <div key={cat} className="skill-column">
                  <div className="sc-header mono">{cat}</div>
                  {SKILLS.filter(s => s.cat === cat).map(s => (
                    <div key={s.name} className="sc-item">
                      <div className="sc-label-row">
                        <span className="sc-name">{s.name}</span>
                        <span className="sc-level mono">{s.level}%</span>
                      </div>
                      <div className="sc-bar">
                        <div className="sc-fill" style={{ width: `${s.level}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* 实习经历 */}
          <section id="experience" className="section-block">
            <div className="section-header">
              <h2 className="section-title neon-text-cyan">[ 实习 / 校园经历 ]</h2>
              <span className="section-sub mono">// EXPERIENCE_LOG.db</span>
            </div>
            <div className="timeline">
              {EXPERIENCES.map((ex, i) => (
                <div key={i} className="tl-item">
                  <div className="tl-marker"></div>
                  <div className="tl-card">
                    <div className="tl-top">
                      <h3 className="tl-title">{ex.title}</h3>
                      <span className="tl-time mono">{ex.time}</span>
                    </div>
                    <div className="tl-role mono">{ex.role}</div>
                    <ul className="tl-points">
                      {ex.points.map((p, pi) => (<li key={pi}>{p}</li>))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 教育背景 */}
          <section id="education" className="section-block">
            <div className="section-header">
              <h2 className="section-title neon-text-pink">[ 教育背景 ]</h2>
              <span className="section-sub mono">// EDUCATION_RECORD.dat</span>
            </div>
            <div className="edu-grid">
              {EDUCATIONS.map((ed, i) => (
                <div key={i} className="edu-card">
                  <div className="edu-top">
                    <div className="edu-degree-icon">🎓</div>
                    <div className="edu-top-text">
                      <h3 className="edu-school">{ed.school}</h3>
                      <div className="edu-degree mono">{ed.degree}</div>
                    </div>
                  </div>
                  <div className="edu-meta mono">
                    <span>📍 {ed.location}</span>
                    <span>📅 {ed.time}</span>
                  </div>
                  <div className="edu-courses">
                    <div className="ec-label mono">CORE COURSES:</div>
                    <div className="ec-list">
                      {ed.courses.map((c, ci) => (<span key={ci} className="ec-chip mono">{c}</span>))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 联系方式 */}
          <section id="contact" className="section-block">
            <div className="section-header">
              <h2 className="section-title neon-text-yellow">[ GET IN TOUCH ]</h2>
              <span className="section-sub mono">// CONTACT_CHANNELS.json</span>
            </div>
            <div className="contact-grid">
              {[
                { icon: '📧', label: 'EMAIL', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
                { icon: '📱', label: 'PHONE', value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, '')}` },
                { icon: '💻', label: 'GITHUB', value: PROFILE.github, href: `https://${PROFILE.github}` },
                { icon: '🎓', label: 'PAPER DOI', value: '10.61173/f7mj1943', href: 'https://doi.org/10.61173/f7mj1943' },
              ].map((c, i) => (
                <a key={i} href={c.href} className="contact-card">
                  <div className="cc-icon">{c.icon}</div>
                  <div className="cc-label mono">{c.label}</div>
                  <div className="cc-value">{c.value}</div>
                </a>
              ))}
            </div>
          </section>

          {/* About */}
          <section id="about" className="section-block">
            <div className="section-header">
              <h2 className="section-title neon-text-green">[ 关于我 ]</h2>
              <span className="section-sub mono">// ABOUT_ME.md</span>
            </div>
            <div className="about-card-large">
              <div className="acl-left">
                <div className="acl-avatar">
                  <div className="acl-avatar-ring"></div>
                  <div className="acl-avatar-inner">
                    <span className="avatar-emoji">{PROFILE.avatarEmoji}</span>
                  </div>
                </div>
              </div>
              <div className="acl-right">
                <div className="acl-name-row">
                  <h3 className="acl-name">{PROFILE.name}</h3>
                  <span className="acl-status mono">● STATUS: OPEN_TO_WORK</span>
                </div>
                <div className="acl-role">{PROFILE.subtitle}</div>
                <div className="acl-bio">
                  👋 你好！我是 <strong>{PROFILE.name}</strong>。曼彻斯特大学发展经济学政策硕士（在读），布里斯托大学经济学学士。
                  扎实的经济学训练让我擅长从数据中洞察商业价值，而 LinkUp AI 社交产品、小红书内容增长、Starbucks 品牌研究论文等实践，
                  则让我对「AI + 产品 + 用户」有了第一手落地经验。<br /><br />
                  🎯 2027 届校招目标：<strong>AI 产品 / 商业分析 / 海外业务 / 管理培训生</strong>方向的全职机会。
                  希望加入重视用户价值、鼓励创新的团队，和优秀的人一起做真正有影响力的产品！
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* 右侧作者面板 */}
        {rightPanel && (
          <aside className="right-panel">
            <button className="rp-close" onClick={() => setRightPanel(false)} title="收起">✕</button>

            <div className="rp-profile">
              <div className="rp-avatar-wrap">
                <div className="rp-avatar-ring"></div>
                <div className="rp-avatar">
                  <span className="rp-avatar-emoji">{PROFILE.avatarEmoji}</span>
                </div>
                <div className="rp-status-dot"></div>
              </div>
              <div className="rp-name">{PROFILE.name}</div>
              <div className="rp-sub mono">{PROFILE.subtitle}</div>
            </div>

            <div className="rp-social-links">
              <a href="#about" className="rp-sl" title="关于我"><span className="rp-sl-icon">👤</span><span>关于我</span></a>
              <a href={`https://${PROFILE.github}`} className="rp-sl" title="GitHub"><span className="rp-sl-icon">⌨</span><span>GitHub</span></a>
              <a href={`mailto:${PROFILE.email}`} className="rp-sl" title="Email"><span className="rp-sl-icon">✉</span><span>Email</span></a>
              <a href="#contact" className="rp-sl" title="联系方式"><span className="rp-sl-icon">⇲</span><span>了解更多</span></a>
            </div>

            <div className="rp-section rp-welcome">
              <div className="rp-section-title mono">// 欢迎消息</div>
              <p className="rp-welcome-text">
                欢迎来到我的赛博空间！这里是我的作品集主页，整理了我的项目、技能、经历与联系方式。
                有任何合作意向或只是想打个招呼，都欢迎随时联系！
              </p>
              <button className="rp-welcome-close mono" onClick={() => setRightPanel(false)}>[ 关闭欢迎提示 ]</button>
            </div>

            <div className="rp-section">
              <div className="rp-section-title mono">// 社交链接导航</div>
              <div className="rp-social-grid">
                <a href={`https://${PROFILE.github}`} className="rp-sg-item" title="GitHub">
                  <span className="rp-sg-icon">⌨</span><span className="rp-sg-label mono">博客</span>
                </a>
                <a href={`https://${PROFILE.github}`} className="rp-sg-item" title="GitHub">
                  <span className="rp-sg-icon">🐙</span><span className="rp-sg-label mono">GitHub</span>
                </a>
                <a href={`mailto:${PROFILE.email}`} className="rp-sg-item" title="Email">
                  <span className="rp-sg-icon">✉</span><span className="rp-sg-label mono">邮件</span>
                </a>
                <a href="#contact" className="rp-sg-item" title="联系方式">
                  <span className="rp-sg-icon">💬</span><span className="rp-sg-label mono">微信</span>
                </a>
              </div>
            </div>

            <div className="rp-section">
              <div className="rp-section-title mono">// 运行时间</div>
              <div className="rp-uptime mono">
                本站已经运行<br />
                <span className="ru-num">{uptime.days}</span> 天
                <span className="ru-num">{String(uptime.hours).padStart(2, '0')}</span> 时
                <span className="ru-num">{String(uptime.mins).padStart(2, '0')}</span> 分
                <span className="ru-num">{String(uptime.secs).padStart(2, '0')}</span> 秒
              </div>
            </div>

            <div className="rp-section">
              <div className="rp-section-title mono">// 地理位置</div>
              <div className="rp-location">
                {PROFILE.location}
              </div>
            </div>

            <div className="rp-section rp-ornament">
              <div className="ornament-row">
                {['🍀', '🌸', '⭐', '🌙', '🔮', '💫', '🦋', '🌌', '🎴', '🎐'].map((e, i) => (
                  <span key={i} className="ornament-item" style={{ animationDelay: `${i * 0.15}s` }}>{e}</span>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* 左下角音乐卡 */}
      <div className="bottom-music-card" onClick={() => { setMusicPanel(v => !v); setSettingsPanel(false) }}>
        <div className={`bmc-cover ${musicPlaying ? 'spin' : ''}`} style={{ background: `linear-gradient(135deg, hsl(${hue}, 70%, 30%), hsl(${(hue + 180) % 360}, 70%, 20%))` }}>
          <div className="bmc-vinyl-hole"></div>
        </div>
        <div className="bmc-info">
          <div className="bmc-title">{currentSong.title}</div>
          <div className="bmc-artist mono">{currentSong.artist} / {currentSong.album}</div>
        </div>
      </div>

      {/* 底部 */}
      <footer id="footer" className="site-footer">
        <div className="footer-inner">
          <div className="footer-section">
            <div className="fs-title mono">// CATEGORY_NAV</div>
            <div className="category-badges">
              {CATEGORY_BADGES.map(cb => (
                <a key={cb.name} href={`#${cb.name === '个人简介' ? 'about' : cb.name === '项目作品' ? 'projects' : cb.name === '技能栈' ? 'skills' : cb.name === '实习经历' ? 'experience' : 'education'}`} className={`cat-badge cat-badge-${cb.color}`}>
                  <span>{cb.name}</span>
                  <span className="cat-badge-count mono">{cb.count}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <div className="fs-title mono">// TAG_CLOUD</div>
            <div className="tag-cloud">
              {TAGS.map((t, i) => (
                <a key={t} href="#projects" className="tag-cloud-item mono" style={{
                  fontSize: `${11 + (i % 5) * 2}px`,
                  opacity: 0.55 + (i % 7) * 0.06,
                }}>#{t}</a>
              ))}
              <a href="#footer" className="tag-cloud-item tci-more mono">+ 更多</a>
            </div>
          </div>

          <div className="footer-section footer-bottom">
            <div className="fb-left">
              <div className="build-info mono">
                <button className="bi-toggle">[ 展开构建信息 ▾ ]</button>
              </div>
              <div className="fb-links">
                <a href="#home" className="fbl mono">博客</a>
                <a href={`https://${PROFILE.github}`} className="fbl mono">GitHub</a>
                <a href={`mailto:${PROFILE.email}`} className="fbl mono">Email</a>
                <a href="#footer" className="fbl mono">RSS</a>
                <a href="#footer" className="fbl mono">Sitemap</a>
                <a href="#footer" className="fbl mono">React + Vite</a>
              </div>
            </div>
            <div className="fb-right mono">
              © 2026 {PROFILE.name} · Crafted with <span className="heart">❤</span> + React + AIGC · Cyberpunk Edition
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
