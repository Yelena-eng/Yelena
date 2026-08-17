import { useState, useEffect, useRef } from 'react'
import './App.css'

const ABOUT_DATA = {
  name: 'Yelena',
  role: '待填写 · 求职方向',
  greeting: '> SYSTEM INITIALIZING... WELCOME, VISITOR.',
  slogan: 'Code the Future, Design the Dream.',
  description: '这里放一段你的自我介绍，比如：你是一名充满热情的XX工程师，热爱技术与创新，擅长XXX。秋招正在寻找机会，希望能加入有创造力的团队！',
  info: [
    { label: 'LOCATION', value: '城市 · 中国' },
    { label: 'EDUCATION', value: 'XX大学 · 专业' },
    { label: 'STATUS', value: '🔥 秋招进行中' },
    { label: 'INTERESTS', value: '技术 / 设计 / AIGC' },
  ],
}

const SKILLS_DATA = [
  {
    category: '开发技能',
    skills: [
      { name: 'JavaScript / TypeScript', level: 80 },
      { name: 'React / Vue', level: 75 },
      { name: 'Node.js / Python', level: 70 },
      { name: 'HTML / CSS', level: 90 },
    ],
  },
  {
    category: '工具 & 其他',
    skills: [
      { name: 'Git / GitHub', level: 85 },
      { name: 'Figma / 设计', level: 65 },
      { name: 'AIGC 应用', level: 80 },
      { name: '项目管理', level: 70 },
    ],
  },
]

const PROJECTS_DATA = [
  {
    tag: 'WEB APP',
    title: '项目一名称',
    desc: '这里放项目的简短描述，说明你做了什么、用了什么技术、取得了什么成果（尽量量化）。',
    tech: ['React', 'Node.js', 'MongoDB', 'TailwindCSS'],
    stat1: { icon: '⭐', value: '50+ commits' },
    stat2: { icon: '👥', value: 'Team of 3' },
    placeholder: '🚀 PROJECT_01',
  },
  {
    tag: 'AIGC PROJECT',
    title: 'AI 相关项目',
    desc: '描述一下你的 AI 项目，比如：基于大模型的XX应用，集成了XX API，支持XX功能。突出你在 AIGC 方面的能力！',
    tech: ['Python', 'LangChain', 'OpenAI API', 'Next.js'],
    stat1: { icon: '🤖', value: 'AI Powered' },
    stat2: { icon: '📈', value: '95% 准确率' },
    placeholder: '🧠 AI_PROJECT',
  },
  {
    tag: 'OPEN SOURCE',
    title: 'LinkUp 项目',
    desc: '你之前做过的 LinkUp 项目！简单介绍一下：这是一个XX平台，实现了XX功能，用户可以XX。',
    tech: ['自选技术栈1', '自选技术栈2', '...'],
    stat1: { icon: '💾', value: 'Repo 私有' },
    stat2: { icon: '✅', value: '已完成' },
    placeholder: '🔗 LINK_UP',
  },
]

const CONTACT_DATA = [
  { icon: '📧', label: 'EMAIL', value: 'your.email@example.com' },
  { icon: '📱', label: 'WECHAT / PHONE', value: '+86 138 xxxx xxxx' },
  { icon: '💻', label: 'GITHUB', value: 'github.com/Yelena-eng' },
  { icon: '💼', label: 'LINKEDIN', value: 'linkedin.com/in/yourname' },
]

const CHAT_PRESET = [
  {
    from: 'ai',
    text: `你好！我是 Yelena 的 AI 数字分身 🤖\n\n你可以问我关于她的任何问题，比如：\n• "介绍一下你自己"\n• "你有什么项目经验？"\n• "你的技术栈是什么？"\n• "想找什么样的工作？"`,
  },
]

const CHAT_KNOWLEDGE = {
  default: '这是个好问题！你可以在作品集上方找到「下载简历」按钮获取更多详细信息，或者直接通过邮箱联系 Yelena 哦 💜',
  intro: `我叫${ABOUT_DATA.name}，是一名正在秋招的${ABOUT_DATA.role}。我热爱技术和创新，特别是 AIGC 方向！\n\n${ABOUT_DATA.description}`,
  project: `我做过不少项目，作品集里展示了 ${PROJECTS_DATA.length} 个代表作品：\n\n${PROJECTS_DATA.map((p, i) => `${i + 1}. 【${p.title}】- ${p.desc.slice(0, 40)}...`).join('\n')}\n\n每个项目卡片上都有链接可以查看详情哦！`,
  skill: `我的技术栈覆盖很广：\n\n💻 开发：JavaScript/TS, React/Vue, Node.js, Python\n🛠 工具：Git, Figma, 各种 AIGC 工具\n🎨 其他：项目管理、UI/UX 设计\n\n具体熟练度可以看「技能栈」部分的进度条！`,
  job: `秋招正在寻找【${ABOUT_DATA.role}相关】的全职工作机会！\n\n我希望加入一个重视创新、有技术氛围的团队，和优秀的人一起做有影响力的产品。\n\n如果你有岗位推荐，欢迎通过📧邮箱联系我！`,
  contact: `📧 邮箱：your.email@example.com\n💻 GitHub：github.com/Yelena-eng\n💼 LinkedIn：linkedin.com/in/yourname\n\n期待和你聊聊！✨`,
}

function matchIntent(text) {
  const t = text.toLowerCase()
  if (t.includes('介绍') || t.includes('自己') || t.includes('你是谁') || t.includes('who')) return CHAT_KNOWLEDGE.intro
  if (t.includes('项目') || t.includes('作品') || t.includes('经验') || t.includes('project')) return CHAT_KNOWLEDGE.project
  if (t.includes('技能') || t.includes('技术') || t.includes('栈') || t.includes('会什么') || t.includes('skill')) return CHAT_KNOWLEDGE.skill
  if (t.includes('工作') || t.includes('求职') || t.includes('找') || t.includes('机会') || t.includes('job')) return CHAT_KNOWLEDGE.job
  if (t.includes('联系') || t.includes('邮箱') || t.includes('contact') || t.includes('微信') || t.includes('电话')) return CHAT_KNOWLEDGE.contact
  return CHAT_KNOWLEDGE.default
}

function TypewriterText({ text, speed = 80 }) {
  const [displayed, setDisplayed] = useState('')
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    setDisplayed('')
    setIdx(0)
  }, [text])

  useEffect(() => {
    if (idx >= text.length) return
    const t = setTimeout(() => {
      setDisplayed((d) => d + text[idx])
      setIdx((i) => i + 1)
    }, speed)
    return () => clearTimeout(t)
  }, [idx, text, speed])

  return (
    <span>
      {displayed}
      <span style={{ opacity: idx >= text.length ? 1 : 1 }} className="neon-text-purple">
        _
      </span>
    </span>
  )
}

function Navbar({ onDownload, onMusicToggle, musicPlaying, themeMode, onToggleTheme }) {
  const links = [
    { href: '#hero', label: 'HOME' },
    { href: '#about', label: 'ABOUT' },
    { href: '#skills', label: 'SKILLS' },
    { href: '#projects', label: 'PROJECTS' },
    { href: '#contact', label: 'CONTACT' },
  ]
  return (
    <nav className="navbar navbar-v2">
      <div className="navbar-v2-inner">
        <div className="navbar-v2-left">
          <button className="theme-toggle-v2" onClick={onToggleTheme}>
            {themeMode === 'cyber' ? (
              <>
              <span className="tt-icon">🌃</span>
              <span className="tt-label">CYBER</span>
            </>
            ) : (
              <>
              <span className="tt-icon">🔍</span>
              <span className="tt-label">CLEAN</span>
            </>
            )}
          </button>
          <button
            className={`music-btn music-btn-v2 ${musicPlaying ? 'playing' : ''}`}
            onClick={onMusicToggle}
            title={musicPlaying ? '暂停音乐' : '播放背景音乐'}
          >
            {musicPlaying ? '♪' : '♩'}
          </button>
        </div>

        <div className="navbar-v2-center">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="nav-link-v2">{l.label}</a>
          ))}
        </div>

        <div className="navbar-v2-right">
          <button className="btn-cyber btn-cyber-sm" onClick={onDownload}>
            <span className="btn-icon">↓</span>
            <span>RESUME</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

function HeroSectionV2() {
  return (
    <section id="hero" className="hero-v2">
      <div className="hero-v2-bg">
        <div className="hero-v2-img-wrap">
          <img
            src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cyberpunk%20fashion%20portrait%20of%20a%20cool%20asian%20girl%20in%20prison%20orange%20jumpsuit%20holding%20mugshot%20sign%20neon%20lights%20dark%20mood%20cinematic&image_size=portrait_4_3"
            alt="Yelena Portrait"
            className="hero-v2-img"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="hero-v2-img-fallback">
            <div className="fallback-pattern"></div>
            <div className="fallback-text mono">
              ╔══════════════════╗<br/>
              ║   ADD YOUR PHOTO ║<br/>
              ║   PLACE: /public/me.jpg<br/>
              ╚══════════════════╝
            </div>
          </div>
          <div className="hero-v2-overlay-v"></div>
          <div className="hero-v2-grid"></div>
          <div className="hero-v2-scan"></div>
          <div className="hero-v2-vignette"></div>
        </div>
      </div>

      <div className="hero-v2-content">
        <div className="hero-v2-info">
          <div className="info-card-top">
            <div className="info-avatar-wrap">
              <div className="info-avatar-ring"></div>
              <div className="info-avatar">
                <span className="avatar-emoji">👤</span>
              </div>
              <span className="status-dot"></span>
            </div>
            <div className="info-name-block">
              <div className="info-name-tag mono">// NAME_</div>
              <h1 className="info-name glitch-hover">
                {ABOUT_DATA.name.split('').map((c, i) => (
                  <span key={i} style={{ animationDelay: `${i * 0.08}s` }} className="glitch-char">{c}</span>
                ))}
              </h1>
            </div>
          </div>

          <div className="info-card-divider"></div>

          <div className="info-role-block">
            <div className="info-label mono">ROLE / TITLE</div>
            <div className="info-role neon-text-cyan">
              <TypewriterText text={ABOUT_DATA.role} speed={90} />
            </div>
          </div>

          <div className="info-slogan-block">
            <div className="info-label mono">SLOGAN_</div>
            <p className="info-slogan">"{ABOUT_DATA.slogan}"</p>
          </div>

          <div className="info-card-divider"></div>

          <div className="info-contact-list">
            {CONTACT_DATA.slice(0, 3).map((c) => (
              <div key={c.label} className="info-contact-item">
                <span className="contact-icon">{c.icon}</span>
                <div className="contact-meta">
                  <span className="contact-label mono">{c.label}</span>
                  <span className="contact-value">{c.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="info-card-divider"></div>

          <div className="info-cta-row">
            <a href="#projects" className="btn-cyber btn-cyber-full">
              <span>EXPLORE WORK</span>
              <span className="btn-arrow">→</span>
            </a>
            <a href="#contact" className="btn-cyber btn-cyber-full btn-cyber-secondary">
              <span>GET IN TOUCH</span>
              <span className="btn-arrow">✉</span>
            </a>
          </div>

          <div className="info-nav-row">
            {['ABOUT', 'SKILLS', 'PROJECTS'].map((label) => (
              <a key={label} href={`#${label.toLowerCase()}`} className="info-nav-chip mono">
                {label} ↓
              </a>
            ))}
          </div>
        </div>

        <div className="hero-v2-hud-top-right mono">
          <div className="hud-line">
          <span className="hud-key">SYS</span>
          <span className="hud-val hud-ok">ONLINE</span>
        </div>
          <div className="hud-line">
          <span className="hud-key">MODE</span>
          <span className="hud-val hud-cyber">CYBER_2.0</span>
        </div>
          <div className="hud-line">
          <span className="hud-key">USER</span>
          <span className="hud-val">YELENA_001</span>
        </div>
        </div>

        <div className="hero-v2-hud-bottom-left mono">
          <div className="hud-line small">
            <span className="hud-key">LAT</span><span className="hud-val">53.4808°N</span>
          </div>
          <div className="hud-line small">
            <span className="hud-key">LON</span><span className="hud-val">2.2426°W</span>
          </div>
          <div className="hud-line small">
            <span className="hud-key">STATUS</span><span className="hud-val hud-ok">● AVAILABLE</span>
          </div>
        </div>
      </div>

      <div className="hero-v2-scroll-indicator mono">
        <span>SCROLL</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title neon-text-cyan">{'< ABOUT_ME />'}</h2>
        <div className="about-card neon-border">
          <div className="about-content">
            <p className="about-text">
              👋 你好！我是 <strong>{ABOUT_DATA.name}</strong>，一名 <strong>{ABOUT_DATA.role}</strong>。
              热爱用技术创造有温度的产品，对 AIGC 和人机交互充满好奇。
            </p>
            <p className="about-text">
              💡 我相信 <strong>创意 + 技术 = 无限可能</strong>。无论是前端的酷炫交互，
              还是后端的稳定架构，亦或是用 AI 让产品变得更聪明，都是我乐于探索的领域。
            </p>
            <p className="about-text">
              🎯 秋招目标：<strong>找到志同道合的团队</strong>，一起做真正有价值的产品！
            </p>

            <div className="about-info-grid">
              {ABOUT_DATA.info.map((item) => (
                <div key={item.label} className="info-item">
                  <div className="info-label">{item.label}</div>
                  <div className="info-value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title neon-text-purple">{'< SKILLS />'}</h2>
        <div className="skills-section">
          {SKILLS_DATA.map((cat) => (
            <div key={cat.category} className="skills-category">
              <h3 className="skills-category-title">{cat.category.toUpperCase()}</h3>
              <div className="skills-grid">
                {cat.skills.map((s) => (
                  <div key={s.name} className="skill-bar">
                    <div className="skill-header">
                      <span className="skill-name">{s.name}</span>
                      <span className="skill-level mono">{s.level}%</span>
                    </div>
                    <div className="skill-progress">
                      <div
                        className="skill-progress-fill"
                        style={{ width: `${s.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section-title neon-text-pink">{'< PROJECTS />'}</h2>
        <div className="projects-grid">
          {PROJECTS_DATA.map((p, i) => (
            <article key={i} className="project-card neon-border">
              <div className="project-image">
                <div className="project-image-placeholder">
                  {p.placeholder}
                </div>
                <div className="project-overlay">
                  <a href="#" className="btn-cyber" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
                    🔗 Live
                  </a>
                  <a href="#" className="btn-cyber btn-cyber-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
                    💻 Code
                  </a>
                </div>
              </div>
              <div className="project-body">
                <span className="project-tag mono">{p.tag}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-chip mono">{t}</span>
                  ))}
                </div>
                <div className="project-stats">
                  <div className="project-stat">
                    <span className="project-stat-icon">{p.stat1.icon}</span>
                    <span>{p.stat1.value}</span>
                  </div>
                  <div className="project-stat">
                    <span className="project-stat-icon">{p.stat2.icon}</span>
                    <span>{p.stat2.value}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection({ onOpenChat }) {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title neon-text-cyan">{'< CONTACT />'}</h2>
        <div className="contact-section">
          <p className="contact-intro">
            看完了我的作品集，有合作意向？<br />
            或者就是想打个招呼聊聊天？<br />
            <span className="neon-text-purple" style={{ fontWeight: 600 }}>
              我随时欢迎，期待和你的相遇！
            </span>
          </p>

          <div className="contact-cards">
            {CONTACT_DATA.map((c) => (
              <div key={c.label} className="contact-card">
                <div className="contact-icon">{c.icon}</div>
                <div className="contact-label mono">{c.label}</div>
                <div className="contact-value">{c.value}</div>
              </div>
            ))}
          </div>

          <div className="contact-cta">
            <a href="mailto:your.email@example.com" className="btn-cyber">
              📧 发邮件给我
            </a>
            <button className="btn-cyber btn-cyber-secondary" onClick={onOpenChat}>
              🤖 和 AI 我聊聊
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ onTriggerEgg }) {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text mono">
          © 2026 {ABOUT_DATA.name} · Crafted with <span className="footer-heart">❤</span> + React + AIGC
        </p>
        <p className="footer-text mono" style={{ marginTop: '8px', fontSize: '0.75rem', opacity: 0.6 }}>
          {'< END_OF_FILE />'}
        </p>
        <div className="easter-egg-hint" onClick={onTriggerEgg}>
          [ 长按技能条 3 秒 · 触发彩蛋 ? ]
        </div>
      </div>
    </footer>
  )
}

function ChatModal({ open, onClose }) {
  const [messages, setMessages] = useState(CHAT_PRESET)
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, open])

  const send = () => {
    const text = input.trim()
    if (!text) return
    const userMsg = { from: 'user', text }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setTimeout(() => {
      const reply = matchIntent(text)
      setMessages((m) => [...m, { from: 'ai', text: reply }])
    }, 600)
  }

  return (
    <div className={`chat-modal ${open ? 'open' : ''}`}>
      <div className="chat-header">
        <div className="chat-title">
          <span className="status"></span>
          AI_YELENA · ONLINE
        </div>
        <button className="chat-close" onClick={onClose}>✕</button>
      </div>
      <div className="chat-messages" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`chat-msg ${m.from}`}>
            {m.text.split('\n').map((line, j) => (
              <div key={j}>{line}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="chat-input-wrap">
        <input
          className="chat-input"
          placeholder="问点什么..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button className="chat-send" onClick={send}>SEND</button>
      </div>
    </div>
  )
}

function ThemeToggle({ mode, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle}>
      {mode === 'cyber' ? '🔍 正经模式' : '🌃 赛博模式'}
    </button>
  )
}

function App() {
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [themeMode, setThemeMode] = useState('cyber')

  const handleDownload = () => {
    alert('📄 提示：请把简历 PDF 文件放到 /public 目录下，命名为 resume.pdf，然后我帮你接上下载链接！')
  }

  const handleMusicToggle = () => {
    setMusicPlaying((p) => {
      const next = !p
      if (next) {
        alert('🎵 音乐即将响起！\n\n小提示：把你喜欢的 MP3 放到 /public/music.mp3，然后我帮你用代码接入自动播放功能。\n\n建议音乐选 chill 的 synthwave 风格（比如 The Midnight / FM-84 的作品）！')
      }
      return next
    })
  }

  const triggerEgg = () => {
    setChatOpen(true)
    setTimeout(() => {
      alert('🎉 恭喜触发彩蛋！AI 聊天窗口已打开～\n\n（以后这里可以加更酷的：比如全屏故障特效、随机生成你的 AI 画像等）')
    }, 300)
  }

  const toggleTheme = () => {
    setThemeMode((m) => {
      const next = m === 'cyber' ? 'clean' : 'cyber'
      if (next === 'clean') {
        document.documentElement.style.setProperty('--cyber-bg', '#FAFAFA')
        document.documentElement.style.setProperty('--cyber-bg-alt', '#F5F5F5')
        document.documentElement.style.setProperty('--cyber-text', '#1A1A1A')
        document.documentElement.style.setProperty('--cyber-text-dim', '#555')
        document.documentElement.style.setProperty('--cyber-purple', '#7C3AED')
        document.documentElement.style.setProperty('--cyber-cyan', '#0891B2')
        document.body.style.background = '#FAFAFA'
        alert('🔍 已切换到「正经模式」！\n适合面试时展示，简洁干净不花哨。\n再点一次切回炫酷赛博风～')
      } else {
        document.documentElement.style.setProperty('--cyber-bg', '#0A0A0F')
        document.documentElement.style.setProperty('--cyber-bg-alt', '#120F1F')
        document.documentElement.style.setProperty('--cyber-text', '#E2E8F0')
        document.documentElement.style.setProperty('--cyber-text-dim', '#94A3B8')
        document.documentElement.style.setProperty('--cyber-purple', '#A855F7')
        document.documentElement.style.setProperty('--cyber-cyan', '#06B6D4')
        document.body.style.background = ''
      }
      return next
    })
  }

  return (
    <div className={`app-theme-${themeMode}`}>
      <Navbar
        onDownload={handleDownload}
        onMusicToggle={handleMusicToggle}
        musicPlaying={musicPlaying}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
      />
      <HeroSectionV2 />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection onOpenChat={() => setChatOpen(true)} />
      <Footer onTriggerEgg={triggerEgg} />
      <ChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  )
}

export default App
