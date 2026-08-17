import { useState, useEffect, useRef } from 'react'
import './App.css'

const ABOUT_DATA = {
  name: '李宜晓',
  role: 'AI 产品 · 商业分析 · 海外业务 · 管培生',
  greeting: '> SYSTEM INITIALIZING... WELCOME, VISITOR.',
  slogan: 'Bridge the Gap Between AI, Business & People.',
  description: '你好！我是李宜晓，一名兼具经济学学术背景与 AIGC 产品实践经验的求职者。从英国曼彻斯特大学发展经济学政策硕士，到布里斯托大学经济学学士，我热衷于用产品思维连接技术与商业价值，尤其对 AI 产品、用户体验设计与海外市场有浓厚兴趣。从 LinkUp AI 社交工具的 MVP 落地，到小红书单篇 8.8k+ 浏览的内容增长实践，我坚信「以用户为中心 + 数据驱动」能创造真正有价值的产品。',
  info: [
    { label: 'LOCATION', value: '英国 / 中国 · 全球可及' },
    { label: 'EDUCATION', value: '曼彻斯特大学 · 发展经济学硕士' },
    { label: 'STATUS', value: '🔥 2027 届校招进行中' },
    { label: 'INTERESTS', value: 'AI 产品 / 用户研究 / 内容增长' },
  ],
}

const SKILLS_DATA = [
  {
    category: '产品与研究',
    skills: [
      { name: '产品需求梳理 · PRD', level: 88 },
      { name: '用户研究 · 消费者分析', level: 90 },
      { name: '竞品分析 · 市场研究', level: 85 },
      { name: 'AIGC 产品应用与设计', level: 88 },
    ],
  },
  {
    category: '数据与工具',
    skills: [
      { name: 'Excel · PPT · Word', level: 92 },
      { name: 'Figma · 产品原型设计', level: 78 },
      { name: 'Stata · R 数据分析', level: 72 },
      { name: 'Codex · Trae · AI 提效', level: 90 },
    ],
  },
  {
    category: '内容与运营',
    skills: [
      { name: '小红书内容策划与增长', level: 88 },
      { name: '文案撰写 · 产品价值表达', level: 85 },
      { name: '问卷设计 · 访谈整理', level: 80 },
      { name: '英语 · 中英双语写作', level: 90 },
    ],
  },
]

const PROJECTS_DATA = [
  {
    tag: 'AIGC · PRODUCT',
    title: 'LinkUp AI 社交连接工具',
    desc: '围绕课程组队、项目协作等短期合作场景，梳理用户痛点并定义"房间加入—轻量问答—同频地图—留灯连接"核心路径。参与 AIGC 破冰场景设计，使用 Codex / Trae 辅助完成页面搭建与交互优化，协同团队将早期构想转化为可交互 MVP 与产品展示页，通过 GitHub 开展团队协作及线上部署。',
    tech: ['产品策划', 'AIGC 应用', 'Codex / Trae', 'React', 'GitHub'],
    stat1: { icon: '🚀', value: 'MVP 已上线' },
    stat2: { icon: '👥', value: '团队项目' },
    placeholder: '🔗 LINKUP_AI',
  },
  {
    tag: 'CONTENT · GROWTH',
    title: 'AI 产品内容增长实践 · 小红书',
    desc: '围绕 fancyJobs 等 AI 初创产品，独立完成用户分析、内容策划及小红书发布，使用 AIGC 工具辅助选题研究与文案优化。单篇 fancyJobs 主题内容获得 8,834 次浏览、795 次点赞、541 次收藏、117 次分享及 20 条评论，超越 500 赞目标。复盘海外求职用户对 AI 求职、信息差的核心关注点。',
    tech: ['小红书运营', 'AIGC 文案', '用户分析', '内容增长', '数据复盘'],
    stat1: { icon: '👀', value: '8.8k+ 浏览' },
    stat2: { icon: '❤️', value: '795 点赞' },
    placeholder: '📕 XHS_GROWTH',
  },
  {
    tag: 'RESEARCH · PAPER',
    title: 'Starbucks Third Place 品牌策略研究',
    desc: '独立完成英文论文并发表于 Finance & Economics (2024)。围绕星巴克"第三空间"策略、社交属性与品牌认同开展消费者洞察与案例研究，通过调研问卷与用户反馈，提出提升年轻用户黏性、空间体验及品牌沟通的策略建议。',
    tech: ['消费者研究', '品牌策略', '问卷与访谈', '案例分析', '英文学术写作'],
    stat1: { icon: '📄', value: '论文已发表' },
    stat2: { icon: '🔗', value: 'DOI: 10.61173/f7mj1943' },
    placeholder: '☕ SBUX_RESEARCH',
  },
]

const CONTACT_DATA = [
  { icon: '📧', label: 'EMAIL', value: 'liyixiao2022@126.com' },
  { icon: '📱', label: 'PHONE', value: '+86 199 3978 0007' },
  { icon: '💻', label: 'GITHUB', value: 'github.com/Yelena-eng' },
  { icon: '🎓', label: 'RESEARCHGATE', value: 'DOI: 10.61173/f7mj1943' },
]

const CHAT_PRESET = [
  {
    from: 'ai',
    text: `你好！我是李宜晓的 AI 数字分身 🤖\n\n你可以问我关于她的任何问题，比如：\n• "介绍一下你自己"\n• "你有什么项目经验？"\n• "你的核心能力是什么？"\n• "想找什么样的工作？"`,
  },
]

const CHAT_KNOWLEDGE = {
  default: '这是个好问题！你可以在作品集上方找到「下载简历」按钮获取更多详细信息，或者直接通过邮箱联系宜晓哦 💜',
  intro: `我叫${ABOUT_DATA.name}，是一名正在求职的${ABOUT_DATA.role}。\n\n🎓 曼彻斯特大学发展经济学政策硕士在读（2025-2026），布里斯托大学经济学学士（2022-2025）。\n\n💡 我兼具经济学学术背景与 AIGC 产品实践经验，热爱用产品思维连接技术与商业价值，尤其关注 AI 产品、用户体验与海外市场。\n\n🚀 从 LinkUp AI 社交工具的 MVP 落地，到小红书单篇 8.8k+ 浏览的内容增长，我坚信「以用户为中心 + 数据驱动」能创造真正有价值的产品！`,
  project: `作品集里展示了 ${PROJECTS_DATA.length} 个代表作品：\n\n${PROJECTS_DATA.map((p, i) => `${i + 1}. 【${p.title}】\n   ${p.desc.slice(0, 60)}...`).join('\n')}\n\n每个项目卡片上都有详细的项目描述与技术栈哦！`,
  skill: `我的核心能力覆盖三大维度：\n\n📊 产品与研究：产品需求梳理(88%)、用户研究(90%)、竞品分析(85%)、AIGC产品设计(88%)\n💻 数据与工具：Excel/PPT(92%)、Figma(78%)、Stata/R(72%)、AI提效(90%)\n📝 内容与运营：小红书增长(88%)、产品文案(85%)、问卷访谈(80%)、中英双语(90%)\n\n具体熟练度可以看「技能栈」部分的进度条！`,
  job: `2027届校招正在寻找【${ABOUT_DATA.role}】相关的全职工作机会！\n\n理想方向包括但不限于：\n🧠 AI 产品经理 / AIGC 产品策划\n📊 商业分析 / 战略分析\n🌍 海外业务 / 国际化产品\n🎓 管理培训生\n\n我希望加入一个重视用户价值、鼓励创新的团队，和优秀的人一起做有影响力的产品。\n\n如果你有岗位推荐，欢迎通过📧邮箱联系我！`,
  contact: `📧 邮箱：liyixiao2022@126.com\n📱 电话：+86 199 3978 0007\n💻 GitHub：github.com/Yelena-eng\n🎓 ResearchGate：DOI: 10.61173/f7mj1943\n\n期待和你聊聊！✨`,
  education: `🎓 教育背景：\n\n🇬🇧 曼彻斯特大学｜发展经济学与政策 硕士 (2025.09-2026.11)\n   核心课程：发展微观/宏观经济学、应用发展经济学、公共部门经济分析\n\n🇬🇧 布里斯托大学｜经济学 学士 (2022.09-2025.06)\n   核心课程：中级微观/宏观经济学、计量经济学、运营管理、统计学`,
  experience: `另外还有两段银行实习经历 + 校园经历：\n\n🏦 中国光大银行郑州分行｜零售实习生 (2024.06-07)\n   协助客户信息核对、金融产品推广、市场调研与业务数据整理\n\n🏦 中国银行河南省分行｜大堂经理助理 (2023.06-07)\n   客户接待、业务引导、信用卡推广执行与反馈整理\n\n🎭 布里斯托大学中国学联｜学习部干事 + 辩论社副主席 (2022-2023)\n   组织学术讲座、辩论赛、对接熊猫外卖等商家合作`,
}

function matchIntent(text) {
  const t = text.toLowerCase()
  if (t.includes('介绍') || t.includes('自己') || t.includes('你是谁') || t.includes('who') || t.includes('个人')) return CHAT_KNOWLEDGE.intro
  if (t.includes('项目') || t.includes('作品') || t.includes('经验') || t.includes('project')) return CHAT_KNOWLEDGE.project
  if (t.includes('技能') || t.includes('技术') || t.includes('栈') || t.includes('会什么') || t.includes('skill') || t.includes('能力')) return CHAT_KNOWLEDGE.skill
  if (t.includes('工作') || t.includes('求职') || t.includes('找') || t.includes('机会') || t.includes('job') || t.includes('意向') || t.includes('方向')) return CHAT_KNOWLEDGE.job
  if (t.includes('联系') || t.includes('邮箱') || t.includes('contact') || t.includes('微信') || t.includes('电话') || t.includes('怎么找')) return CHAT_KNOWLEDGE.contact
  if (t.includes('教育') || t.includes('学校') || t.includes('学历') || t.includes('专业') || t.includes('education') || t.includes('硕士') || t.includes('学士') || t.includes('大学')) return CHAT_KNOWLEDGE.education
  if (t.includes('实习') || t.includes('经历') || t.includes('校园') || t.includes('学联') || t.includes('银行') || t.includes('experience')) return CHAT_KNOWLEDGE.experience
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
            src="https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=cyberpunk%20fashion%20portrait%20of%20a%20confident%20young%20asian%20woman%2C%20neon%20purple%20and%20cyan%20lighting%2C%20futuristic%20tech%20jacket%2C%20holographic%20accessories%2C%20tokyo%20street%20background%2C%20dark%20mood%20cinematic%20lighting%2C%20high%20detail%20professional&image_size=portrait_4_3"
            alt="李宜晓 Portrait"
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
          <span className="hud-val">YIXIAO_LI_001</span>
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
              👋 你好！我是 <strong>{ABOUT_DATA.name}</strong>，一名专注于 <strong>{ABOUT_DATA.role}</strong> 的 2027 届求职者。
            </p>
            <p className="about-text">
              🎓 <strong>教育背景</strong>：曼彻斯特大学发展经济学与政策硕士（在读），布里斯托大学经济学学士。
              扎实的经济学训练让我擅长从数据中洞察商业价值，而 AIGC 产品实践则让我对「AI + 产品」的结合有了第一手落地经验。
            </p>
            <p className="about-text">
              💡 <strong>产品思维</strong>：从 LinkUp AI 社交工具的 MVP 从 0 到 1，
              到小红书单篇 8,834 浏览的内容增长实战；从独立发表英文消费者研究论文，
              到两段银行实习中对用户需求的近距离观察——我相信 <strong>「以用户为中心 + 数据驱动」</strong> 是产品成功的关键。
            </p>
            <p className="about-text">
              🎯 <strong>求职目标</strong>：希望加入重视用户价值、鼓励创新的团队，
              在 <strong>AI 产品 / 商业分析 / 海外业务 / 管培生</strong> 方向贡献力量，一起做真正有影响力的产品！
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
            <a href="mailto:liyixiao2022@126.com" className="btn-cyber">
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
