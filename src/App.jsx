import { useState, useEffect, useRef } from 'react'
import './App.css'
import cover01LinkUp from './assets/project-01-linkup-real.png'
import cover02Xhs from './assets/project-02-xhs-34016-8838-ctr26.jpg'
import cover03Starbucks from './assets/project-03-starbucks-cover.png'

/* LinkUp 产品封面：用户提供的真实首页产品截图（AI产品Tab）
 * 小红书封面：用户提供的真实数据详情截图（34016曝光/8838观看/26.3%点击率）
 * 如果以后想替换：直接覆盖 src/assets/project-01/02/03 文件即可，代码不用改 */

/* ============================================================
   PORTFOLIO 2.1 — Premium + Interaction Edition
   Design: Brittany Chiang x Minimal Gallery x Godly
   新增 5 个差异化交互巧思:
   1. Custom Cursor Glow (光标光晕追踪)
   2. 3D Tilt Project Cards (视差悬浮卡片)
   3. Hero Typewriter (副标题打字机)
   4. Reveal on Scroll (滚动揭示 + 渐入上移)
   5. Magnetic Buttons (磁性吸附按钮)
   ============================================================ */

const PROFILE = {
  name: '李宜晓',
  enName: 'Yelena Li',
  tagline: 'AI Product · Business Analytics',
  subtitle:
    '以用户洞察为锚，数据驱动为帆，连接前沿技术与真实商业价值。',
  location: 'Manchester, UK · Zhengzhou, CN',
  email: 'liyixiao2022@126.com',
  phone: '+86 199 3978 0007',
  github: 'Yelena-eng',
  status: '2027 届校招进行中 · 全职可内推',
  heroNumber: '03',
  heroLabel: '精选标杆项目',
  typewriterPhrases: [
    '用户洞察 × 商业分析',
    '经济学思维 × AI 产品',
    '0→1 落地 × 数据驱动',
    '英文写作 × 中英双语',
  ],
}

const NAV = [
  { id: 'home', label: '首页', index: '01' },
  { id: 'about', label: '关于', index: '02' },
  { id: 'projects', label: '项目', index: '03' },
  { id: 'skills', label: '能力', index: '04' },
  { id: 'experience', label: '经历', index: '05' },
  { id: 'education', label: '教育', index: '06' },
  { id: 'contact', label: '联系', index: '07' },
]

const STACKS = [
  { name: 'Product', label: '产品与研究', items: ['用户研究', 'PRD 撰写', '竞品分析', 'AIGC 场景设计'] },
  { name: 'Data', label: '数据与工具', items: ['Excel · PPT', 'Figma', 'Stata / R', 'AI 工作流 (Trae/Codex)'] },
  { name: 'Content', label: '内容与运营', items: ['小红书运营', '中英双语写作', '文案策划', '问卷/访谈'] },
]

const SKILLS = [
  { name: '用户研究 · 消费者洞察', pct: 90, cat: 0 },
  { name: '产品需求 · PRD / 原型', pct: 88, cat: 0 },
  { name: '竞品分析 · 市场研究', pct: 85, cat: 0 },
  { name: 'AIGC 场景设计 · 工作流', pct: 88, cat: 0 },
  { name: 'Office 办公 · 数据可视化', pct: 92, cat: 1 },
  { name: 'AI 提效 · Codex / Trae', pct: 90, cat: 1 },
  { name: 'Figma · 产品原型', pct: 78, cat: 1 },
  { name: 'Stata / R · 统计分析', pct: 72, cat: 1 },
  { name: '中英双语 · 英文学术写作', pct: 90, cat: 2 },
  { name: '小红书运营 · 内容增长', pct: 88, cat: 2 },
  { name: '文案策划 · 价值表达', pct: 85, cat: 2 },
  { name: '问卷设计 · 访谈整理', pct: 80, cat: 2 },
]

const PROJECT_FILTERS = [
  { key: 'all', label: '全部', count: 3 },
  { key: 'ai', label: 'AI 产品', count: 1 },
  { key: 'growth', label: '内容增长', count: 1 },
  { key: 'research', label: '研究论文', count: 1 },
]

const PROJECTS = [
  {
    id: 'linkup',
    filter: 'ai',
    index: '01',
    year: '2026',
    category: 'AI 产品 · MVP',
    title: 'LinkUp AI 社交连接工具',
    subtitle: '面向课程组队与短期协作的 AI 破冰产品',
    cover: cover01LinkUp,
    problem:
      '海外高校课程组队 / 项目协作场景中，中国学生与本地学生破冰难、兴趣匹配效率低；传统随机分组常导致沟通成本高、产出质量差。',
    role: '核心产品成员 · 负责用户路径与 AIGC 场景设计',
    duration: '2026.07 – 2026.08 · 6 周',
    team: '6 人跨职能团队（产品+设计+工程）',
    stack: ['用户研究', 'Figma 原型', 'Codex/Trae 提效', 'MVP 迭代'],
    kpis: [
      { label: '核心路径设计', value: '4 步', sub: '房间加入 → 轻量问答 → 同频地图 → 留灯连接' },
      { label: 'MVP 页面完成度', value: '90%+', sub: '从 0 到 1 完成产品 Demo' },
      { label: 'AIGC 场景提案', value: '3 套', sub: '智能破冰、画像匹配、兴趣联想' },
    ],
    bullets: [
      '围绕课程组队痛点梳理真实用户旅程，定义 4 步极简核心路径，比传统分组效率提升 60%+。',
      '参与 AIGC 破冰场景设计，提出基于用户画像 + 兴趣标签的智能匹配方案，产出完整 PRD 与交互 Demo。',
      '使用 Trae / Codex 实现原型到代码的快速迭代，通过 GitHub 完成团队协作与版本管理。',
    ],
    result:
      '将概念从早期构想落地为可交互 MVP，验证了「AI 破冰 + 同频可视化」的核心假设，为后续高校试点与用户测试奠定基础。',
    tags: ['AI 产品', 'MVP', '0→1', '社交产品', 'AIGC 设计'],
    highlights: ['0→1 完整产品', 'AIGC 场景落地', '跨团队协作'],
  },
  {
    id: 'xhs',
    filter: 'growth',
    index: '02',
    year: '2026',
    category: '内容增长 · 小红书运营',
    title: 'AI 求职内容增长实战',
    subtitle: '3.4万+ 曝光的海外求职用户洞察（8,838 观看 / 26.3% 点击率）',
    cover: cover02Xhs,
    problem:
      'AI 求职类初创 fancyJobs 缺少面向海外留学生的精准内容策略；用户对 AI 工具的认知停留在「通用聊天」，未感知到求职场景的真实价值。',
    role: '独立内容策划 & 发布 · 从 0 到 1 完成内容增长闭环',
    duration: '2026.03 – 2026.05 · 8 周',
    team: '独立完成',
    stack: ['用户画像', '选题策划', '小红书平台规则', '数据复盘'],
    kpis: [
      { label: '笔记曝光数', value: '34,016', sub: '数据更新至 2026-07-30' },
      { label: '观看数 · 实时', value: '8,838', sub: '粉丝占比 1.1%' },
      { label: '封面点击率', value: '26.3%', sub: '粉丝占比 47.9%，强转化' },
    ],
    bullets: [
      '独立完成 fancyJobs 等 AI 产品的用户分析：定位海外求职留学生群体，拆解 5 大高潜内容主题。',
      '完成 10+ 篇内容策划、撰写与发布，单篇 3.4万+ 曝光 / 8,838 观看，跑通「选题 → 发布 → 复盘」完整闭环。',
      '复盘数据沉淀出海外求职用户对 AI 的核心关注点：自动化简历 → 模拟面试 → 岗位匹配 三类。',
    ],
    result:
      '内容验证了海外求职人群对 AI 产品的付费心智，为后续商业化投放与用户增长路径提供了真实数据支撑。',
    tags: ['小红书', '内容增长', '数据驱动', '用户洞察', '0→1'],
    highlights: ['3.4万+ 曝光', '26.3% 点击率', '用户洞察沉淀'],
  },
  {
    id: 'starbucks',
    filter: 'research',
    index: '03',
    year: '2024',
    category: '研究论文 · 消费者洞察',
    title: 'Starbucks「第三空间」策略研究',
    subtitle: '论文发表于 Finance & Economics (2024)',
    cover: cover03Starbucks,
    problem:
      '年轻用户对星巴克实体空间的使用偏好迁移；原有「第三空间」定位在 Z 世代、远程办公、精品咖啡崛起背景下需要新的策略依据。',
    role: '独立作者 · 完成从选题、调研、论文到发表全流程',
    duration: '2024.02 – 2024.06 · 4 个月',
    team: '独立完成',
    stack: ['消费者调研', '案例研究', '学术写作 (英文)', '品牌策略'],
    kpis: [
      { label: '论文发表', value: 'DOI 可检索', sub: '10.61173/f7mj1943' },
      { label: '期刊', value: 'Finance & Economics', sub: '2024 年度发表' },
      { label: '策略建议', value: '3 大方向', sub: '黏性 · 空间 · 品牌沟通' },
    ],
    bullets: [
      '独立完成全英文论文撰写与发表：围绕星巴克第三空间策略开展消费者调研、案例研究、竞品横向对比。',
      '通过一手与二手数据结合，将用户反馈转化为「提升年轻用户黏性、空间体验分层、场景化品牌沟通」三大可落地策略。',
      '训练了经济学学术写作、数据引用规范性、长文结构化论证能力。',
    ],
    result:
      '论文成功发表，研究框架同时被复用在 LinkUp 项目的用户洞察阶段，形成从学术研究 → 真实产品落地的可迁移方法论。',
    tags: ['论文发表', '消费者洞察', '品牌策略', '英文写作', '学术研究'],
    highlights: ['正式期刊发表', '完整研究闭环', '策略可落地'],
  },
]

const EXPERIENCES = [
  {
    role: '产品策划 · AI 社交 MVP',
    company: 'LinkUp 团队项目',
    period: '2026.07 – 2026.08',
    loc: '英国 · 曼彻斯特',
    points: [
      '定义 4 步核心用户路径（房间加入→问答→同频地图→留灯连接），产出 PRD 与高保真原型。',
      '主导 AIGC 破冰场景设计：基于画像+兴趣标签的智能匹配方案，3 套设计提案中选 1。',
      '用 Trae / Codex 辅助实现 MVP，完成从 0 到 1 可交互 Demo。',
    ],
  },
  {
    role: '零售实习生',
    company: '光大银行郑州分行',
    period: '2024.06 – 2024.07',
    loc: '中国 · 郑州',
    points: [
      '协助客户信息核对、产品推广、用户沟通，观察理财/储蓄用户的真实痛点与偏好。',
      '参与市场调研与业务数据整理，辅助周报数据汇总与业务沟通。',
    ],
  },
  {
    role: '大堂经理助理',
    company: '中国银行河南省分行',
    period: '2023.06 – 2023.07',
    loc: '中国 · 郑州',
    points: [
      '客户接待、业务引导、信用卡推广执行，沉淀账户/转账/信用卡等业务的常见需求列表。',
      '完成用户分流与业务登记流程的实践，初步理解零售银行的服务蓝图。',
    ],
  },
  {
    role: '学习部干事 · 辩论社副主席',
    company: '布里斯托大学中国学联',
    period: '2022.09 – 2023.05',
    loc: '英国 · 布里斯托',
    points: [
      '独立策划并执行学术讲座、辩论赛等校园活动，完成 5+ 场活动的策划→宣传→落地全流程。',
      '协助外联部对接熊猫外卖等本地商家，沟通宣传资源与学生折扣合作权益。',
    ],
  },
]

const EDUCATIONS = [
  {
    school: 'The University of Manchester',
    zhSchool: '曼彻斯特大学',
    degree: 'MSc Development Economics and Policy',
    zhDegree: '发展经济学与政策 · 硕士',
    period: '2025.09 – 2026.11',
    loc: '英国 · 曼彻斯特',
    courses: ['发展微观经济学', '发展宏观经济学', '应用发展经济学', '公共部门经济分析'],
  },
  {
    school: 'University of Bristol',
    zhSchool: '布里斯托大学',
    degree: 'BSc Economics',
    zhDegree: '经济学 · 学士',
    period: '2022.09 – 2025.06',
    loc: '英国 · 布里斯托',
    courses: ['中级微观经济学', '中级宏观经济学', '计量经济学', '运营管理', '统计学'],
  },
]

const CONTACTS = [
  { icon: 'mail', label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { icon: 'github', label: 'GitHub', value: `github.com/${PROFILE.github}`, href: `https://github.com/${PROFILE.github}` },
  { icon: 'phone', label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, '')}` },
  { icon: 'paper', label: '论文 DOI', value: '10.61173/f7mj1943', href: 'https://doi.org/10.61173/f7mj1943' },
]

const SOCIALS = [
  { name: 'Email', href: `mailto:${PROFILE.email}`, char: 'E' },
  { name: 'GitHub', href: `https://github.com/${PROFILE.github}`, char: 'G' },
  { name: 'LinkedIn', href: '#contact', char: 'in' },
  { name: 'Phone', href: `tel:${PROFILE.phone.replace(/\s/g, '')}`, char: 'T' },
]

function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const handler = () => {
      const offsets = NAV.map(n => {
        const el = document.getElementById(n.id)
        if (!el) return { id: n.id, top: Infinity }
        const r = el.getBoundingClientRect()
        return { id: n.id, top: Math.abs(r.top - 120) }
      })
      offsets.sort((a, b) => a.top - b.top)
      if (offsets[0]) setActive(offsets[0].id)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])
  return active
}

function useTypewriter(words, speed = 80, pause = 1600) {
  const [text, setText] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    if (!words || words.length === 0) return
    const current = words[wordIdx % words.length]
    const t = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1)
        setText(next)
        if (next === current) setTimeout(() => setDeleting(true), pause)
      } else {
        const next = current.slice(0, text.length - 1)
        setText(next)
        if (next === '') { setDeleting(false); setWordIdx(i => i + 1) }
      }
    }, deleting ? speed / 2 : speed)
    return () => clearTimeout(t)
  }, [text, deleting, wordIdx, words, speed, pause])
  return text
}

/* ① Scroll Progress Bar 组件（顶部渐变进度） */
function ScrollProgressBar() {
  const ref = useRef(null)
  useEffect(() => {
    const r = ref.current
    if (!r) return
    const onScroll = () => {
      const h = document.documentElement
      const total = h.scrollHeight - h.clientHeight
      const pct = total <= 0 ? 0 : (h.scrollTop / total) * 100
      r.style.transform = `scaleX(${pct / 100})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
  return <div className="pf-scroll-bar" ref={ref} aria-hidden="true" />
}

/* ② Particle Layer 组件（鼠标粒子拖尾，8~10 个柔和陶土色粒子） */
function ParticleLayer() {
  const layerRef = useRef(null)
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return
    const layer = layerRef.current
    if (!layer) return
    const pool = Array.from({ length: 14 }).map(() => {
      const el = document.createElement('span')
      el.className = 'pp-particle'
      el.style.cssText = 'opacity:0;transform:translate3d(-9999px,-9999px,0) scale(0);position:absolute;'
      layer.appendChild(el)
      return { el, life: 0, x: 0, y: 0, vx: 0, vy: 0, sz: 0 }
    })
    let raf, last = 0
    const emit = (x, y) => {
      const p = pool.find(p => p.life <= 0)
      if (!p) return
      p.life = 1
      p.x = x + (Math.random() - 0.5) * 10
      p.y = y + (Math.random() - 0.5) * 10
      const ang = Math.random() * Math.PI * 2
      const sp = 0.4 + Math.random() * 0.9
      p.vx = Math.cos(ang) * sp
      p.vy = Math.sin(ang) * sp - 0.2
      p.sz = 3 + Math.random() * 5
    }
    const tick = (t) => {
      const dt = last ? Math.min(32, t - last) : 16; last = t
      pool.forEach(p => {
        if (p.life <= 0) return
        p.life -= dt / 900
        if (p.life <= 0) {
          p.el.style.opacity = '0'
          return
        }
        p.x += p.vx * (dt / 16)
        p.y += p.vy * (dt / 16)
        p.vy += 0.012 * (dt / 16)
        const e = Math.max(0, p.life)
        p.el.style.cssText = `position:absolute;left:0;top:0;opacity:${(e * 0.85).toFixed(2)};transform:translate3d(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px,0) scale(${e.toFixed(2)});width:${p.sz.toFixed(1)}px;height:${p.sz.toFixed(1)}px;border-radius:999px;background:#B9684A;mix-blend-mode:multiply;pointer-events:none;filter:blur(.2px);`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    let throttle = 0
    const move = e => {
      const now = performance.now()
      if (now - throttle < 45) return
      throttle = now
      emit(e.clientX, e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      pool.forEach(p => p.el.remove())
    }
  }, [])
  return <div ref={layerRef} className="pf-particles" aria-hidden="true" />
}

/* ③ CountUp 数字滚动 hook（0 → target） */
function useCountUp(target, { duration = 1400, decimals = 0, suffix = '', prefix = '', triggerRef = null } = {}) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (target == null) return
    const start = () => {
      const t0 = performance.now()
      let raf
      const easeOut = (t) => 1 - Math.pow(1 - t, 3)
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / duration)
        const v = target * easeOut(p)
        setVal(decimals ? +v.toFixed(decimals) : Math.round(v))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
      return () => cancelAnimationFrame(raf)
    }
    if (triggerRef && triggerRef.current) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(en => {
          if (en.isIntersecting) { start(); io.disconnect() }
        })
      }, { threshold: 0.3 })
      io.observe(triggerRef.current)
      return () => io.disconnect()
    } else {
      return start()
    }
  }, [target, duration, decimals, triggerRef])
  return `${prefix}${typeof target === 'number' && !Number.isFinite(val) ? 0 : val}${suffix}`
}

/* ③-b 简易数字显示组件：自动解析 "90%+"、"4 步" 这种混合字符串里的数字滚动 */
function CountText({ text, className }) {
  const ref = useRef(null)
  const [rendered, setRendered] = useState(text)
  useEffect(() => {
    const m = /(\d+(?:\.\d+)?)/.exec(text)
    if (!m) return
    const rawTarget = +m[0]
    const prefix = text.slice(0, m.index)
    const suffix = text.slice(m.index + m[0].length)
    const hasDec = m[0].includes('.')
    const dec = hasDec ? (m[0].split('.')[1] || '').length : 0

    let raf, t0
    const start = () => {
      t0 = performance.now()
      const ease = t => 1 - Math.pow(1 - t, 3)
      const dur = 1500
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur)
        const v = rawTarget * ease(p)
        const fv = hasDec ? v.toFixed(dec) : Math.round(v)
        setRendered(prefix + fv + suffix)
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { start(); io.disconnect() }
      })
    }, { threshold: 0.2 })
    if (ref.current) io.observe(ref.current)
    return () => { cancelAnimationFrame(raf); io.disconnect() }
  }, [text])
  return <span ref={ref} className={className}>{rendered}</span>
}

export default function App() {
  const active = useActiveSection()
  const [filter, setFilter] = useState('all')
  const [activeProj, setActiveProj] = useState(PROJECTS[0].id)
  const [menuOpen, setMenuOpen] = useState(false)
  const appRef = useRef(null)
  const typed = useTypewriter(PROFILE.typewriterPhrases)
  const [cursor, setCursor] = useState({ x: -100, y: -100, show: false })

  /* ======= Desk Pet Avatar (桌宠小人) state ======= */
  const PET_EMOJIS = ['✨', '�', '☕️', '📚', '💻', '🎯', '💫', '🍀']
  const [petEmoji, setPetEmoji] = useState('✨')
  const [petGaze, setPetGaze] = useState({ x: 0, y: 0 })
  const avatarRef = useRef(null)

  /* 桌宠：眼睛跟随鼠标移动 */
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return
    let rafId = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    const onMove = (e) => {
      const face = avatarRef.current?.querySelector?.('.ava-face')
      if (!face) { tx = 0; ty = 0; return }
      const r = face.getBoundingClientRect()
      const fx = r.left + r.width / 2
      const fy = r.top + r.height * 0.42
      const dx = e.clientX - fx
      const dy = e.clientY - fy
      const dist = Math.min(1, Math.sqrt(dx * dx + dy * dy) / 360)
      tx = (dx / 360) * 2.6 * dist
      ty = (dy / 360) * 2.2 * dist
    }
    const tick = () => {
      cx += (tx - cx) * 0.14
      cy += (ty - cy) * 0.14
      setPetGaze({ x: cx, y: cy })
      rafId = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  /* 桌宠：emoji 每 4.8s 自动切换 */
  useEffect(() => {
    const id = setInterval(() => {
      setPetEmoji(prev => {
        let nxt = PET_EMOJIS[Math.floor(Math.random() * PET_EMOJIS.length)]
        if (nxt === prev) nxt = PET_EMOJIS[(PET_EMOJIS.indexOf(prev) + 1) % PET_EMOJIS.length]
        return nxt
      })
    }, 4800)
    return () => clearInterval(id)
  }, [])
  /* Custom cursor glow */
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) return
    const move = e => setCursor({ x: e.clientX, y: e.clientY, show: true })
    const over = e => {
      const t = e.target.closest('[data-magnetic], .pf-btn, .pf-project-card, .pf-stack-chip, .pf-edu-card, .pf-tl-card, .pf-contact-card, .pf-social-chip, .pf-filter-btn')
      document.documentElement.classList.toggle('cursor-hover', !!t)
    }
    const leave = () => setCursor(c => ({ ...c, show: false }))
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('mouseleave', leave)
    }
  }, [])

  /* Reveal on scroll */
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('is-revealed')
          io.unobserve(en.target)
        }
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [activeProj, filter])

  /* 3D Tilt (mouse-follow on project cards) */
  const applyTilt = (e) => {
    const card = e.currentTarget
    const r = card.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    card.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`)
    card.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`)
    card.style.setProperty('--mx', `${(x * 100).toFixed(0)}%`)
    card.style.setProperty('--my', `${(y * 100).toFixed(0)}%`)
  }
  const resetTilt = (e) => {
    const c = e.currentTarget
    c.style.setProperty('--rx', '0deg')
    c.style.setProperty('--ry', '0deg')
  }

  /* Magnetic button effect */
  const applyMagnetic = (e) => {
    const b = e.currentTarget
    const r = b.getBoundingClientRect()
    const x = (e.clientX - (r.left + r.width / 2)) * 0.35
    const y = (e.clientY - (r.top + r.height / 2)) * 0.35
    b.style.transform = `translate(${x}px, ${y}px)`
  }
  const resetMagnetic = (e) => { e.currentTarget.style.transform = '' }

  /* ④ Letter Hover 涟漪效果：data-letters 元素 hover 时，字母逐个上浮变色 */
  useEffect(() => {
    const targets = document.querySelectorAll('[data-letters], [data-letter-hover]')
    const originals = new Map()
    const wrap = (el) => {
      const orig = el.textContent
      originals.set(el, orig)
      el.innerHTML = ''
      let nonLetter = ''
      Array.from(orig).forEach((ch, i) => {
        if (/\s/.test(ch)) { nonLetter += ch; return }
        if (nonLetter) { el.appendChild(document.createTextNode(nonLetter)); nonLetter = '' }
        const s = document.createElement('span')
        s.className = 'letter'
        s.textContent = ch
        s.style.setProperty('--i', i)
        el.appendChild(s)
      })
      if (nonLetter) el.appendChild(document.createTextNode(nonLetter))
    }
    targets.forEach(wrap)
    const io = new MutationObserver(() => {
      document.querySelectorAll('[data-letters], [data-letter-hover]').forEach(el => {
        if (!originals.has(el)) wrap(el)
      })
    })
    io.observe(document.body, { childList: true, subtree: true })
    return () => io.disconnect()
  }, [])

  const visibleProjects = PROJECTS.filter(p => filter === 'all' || p.filter === filter)
  const current = PROJECTS.find(p => p.id === activeProj) || PROJECTS[0]

  return (
    <div className="pf-app" id="top" ref={appRef}>
      {/* ① Scroll Progress Bar (滚动进度条) */}
      <ScrollProgressBar />

      {/* ② Particle Trail Layer (粒子拖尾层) */}
      <ParticleLayer />

      {/* Custom Cursor Glow */}
      <div
        className="cursor-glow"
        aria-hidden="true"
        style={{
          transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
          opacity: cursor.show ? 1 : 0,
        }}
      />
      <div
        className="cursor-dot"
        aria-hidden="true"
        style={{
          transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)`,
          opacity: cursor.show ? 1 : 0,
        }}
      />
      {/* Skip Link */}
      <a href="#home" className="skip-link">跳到主内容</a>

      {/* NAV */}
      <header className="pf-nav" role="banner">
        <a href="#top" className="pf-brand" aria-label="回到顶部">
          <span className="pf-brand-mark" data-letters>YL</span>
          <span className="pf-brand-text">
            <strong data-letters>{PROFILE.enName}</strong>
            <em> / Portfolio 2026</em>
          </span>
        </a>

        <button
          className="pf-nav-toggle"
          aria-label="切换导航"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span></span><span></span><span></span>
        </button>

        <nav className={`pf-nav-links ${menuOpen ? 'open' : ''}`} role="navigation" aria-label="主导航">
          {NAV.map(n => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={`pf-nav-link ${active === n.id ? 'is-active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="pf-nav-idx mono">{n.index}</span>
              <span>{n.label}</span>
            </a>
          ))}
          <a
            href={`mailto:${PROFILE.email}`}
            className="pf-nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            联系我 →
          </a>
        </nav>
      </header>

      <main id="home" role="main">
        {/* =============== HERO =============== */}
        <section className="pf-hero" aria-label="介绍">
          <div className="pf-hero-grid">
            <aside className="pf-hero-meta mono" aria-hidden="true">
              <div>
                <span className="ph-label">STATUS /</span>
                <span className="ph-status-dot"></span>
                <span>{PROFILE.status}</span>
              </div>
              <div>
                <span className="ph-label">TODAY /</span>
                <span>{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
              </div>
              <div>
                <span className="ph-label">SEEKING /</span>
                <span>Product · BA · PM</span>
              </div>
            </aside>

            <div className="pf-hero-center">
              <p className="pf-eyebrow mono reveal">
                <span className="eb-num serif">3 / 3</span>
                <span className="eb-line"></span>
                <span>精选标杆项目 · {PROFILE.tagline}</span>
              </p>

              <h1 className="pf-display serif reveal">
                <span className="pf-d-line" data-letter-hover>{PROFILE.name}</span>
                <span className="pf-d-line italic serif">
                  {typed || '\u00A0'}
                  <span className="tw-caret" aria-hidden="true">|</span>
                </span>
              </h1>

              <p className="pf-lead reveal">
                {PROFILE.subtitle} 曼彻斯特大学发展经济学硕士在读，聚焦
                <strong>AI 产品 · 商业分析</strong>方向，
                用经济学训练的结构化思考 + AIGC 时代的产品落地能力，
                在 2027 校招中寻找与优秀团队共创的机会。
              </p>

              <div className="pf-hero-ctas reveal">
                <a href="#projects" className="pf-btn pf-btn-primary" data-magnetic onMouseMove={applyMagnetic} onMouseLeave={resetMagnetic}>
                  查看标杆项目
                  <span className="pf-btn-arrow" aria-hidden="true">→</span>
                </a>
                <a href="#contact" className="pf-btn pf-btn-ghost" data-magnetic onMouseMove={applyMagnetic} onMouseLeave={resetMagnetic}>
                  简历 · 联系方式
                </a>
              </div>

              <ul className="pf-hero-socials reveal" aria-label="社交链接">
                {SOCIALS.map(s => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pf-social-chip mono"
                      title={s.name}
                      aria-label={s.name}
                    >
                      {s.char}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* =========== 右侧 桌宠小人 Desk Pet =========== */}
            <aside className="pf-avatar reveal" ref={avatarRef}>
              <div className="ava-card ava-card--pet" aria-label="桌宠小人">
                {/* 浮动 emoji 气泡（在小人头上漂） */}
                <div className="ava-mood" aria-hidden="true">
                  <span className="am-bubble"></span>
                  <span className="am-emoji">{petEmoji}</span>
                </div>

                {/* 桌宠脸 + 脖子 + 领子 */}
                <div className="ava-face ava-face--pet">
                  <span className="ava-hair"></span>
                  <span className="ava-face-inner">
                    <span
                      className="ava-eye left"
                      style={{ transform: `translate(${petGaze.x}px, ${petGaze.y}px)` }}
                    ></span>
                    <span
                      className="ava-eye right"
                      style={{ transform: `translate(${petGaze.x}px, ${petGaze.y}px)` }}
                    ></span>
                    <span className="ava-cheek left"></span>
                    <span className="ava-cheek right"></span>
                    <span className="ava-mouth"></span>
                  </span>
                  <span className="ava-neck"></span>
                  <span className="ava-collar left"></span>
                  <span className="ava-collar right"></span>
                </div>

                {/* 底部署名 + 在线状态 */}
                <div className="ava-pet-bar">
                  <div className="ava-name serif">{PROFILE.name}</div>
                  <div className="ava-online mono">
                    <span className="ava-dot"></span>
                    <span>桌宠中 · 跟随鼠标</span>
                  </div>
                </div>
              </div>

              <div className="ava-hint mono">
                <span>◉ 移动鼠标看我的眼神 · 4.8s 换一个心情表情</span>
              </div>
            </aside>
          </div>

          <div className="pf-scroll-cue mono" aria-hidden="true">
            <span>SCROLL</span>
            <span className="pf-sc-line"></span>
            <span>01 / 07</span>
          </div>
        </section>

        {/* =============== ABOUT =============== */}
        <section id="about" className="pf-section" aria-label="关于">
          <header className="pf-section-head">
            <span className="pf-sec-idx mono">02 — About</span>
            <h2 className="pf-sec-title serif">经济学训练 × AI 产品实践，<br />以结构化思考连接技术与商业。</h2>
          </header>

          <div className="pf-about-grid">
            <div className="pf-about-intro">
              <p className="pf-about-lead">
                你好，我是 <strong>{PROFILE.name}</strong>。
                从布里斯托到曼彻斯特，我的经济学训练让我习惯从「<strong>数据 → 洞察 → 策略</strong>」的结构思考问题；
                而 LinkUp 社交产品、小红书内容增长、Starbucks 品牌研究论文这三类实践，
                让我真正把结构化思考落地为 <strong>0→1 的产品、可量化的增长、可发表的研究</strong>。
              </p>
              <p className="pf-about-body">
                我特别擅长在<strong>信息不完整的早期阶段</strong>，通过用户研究 + 竞品拆解 + 快速 MVP 验证核心假设；
                也享受把复杂的 AI 能力翻译成用户能感知的真实场景价值。
                如果你在寻找一位「<strong>懂数据、会表达、能落地</strong>」的产品 / 商分同学，
                我非常期待和你聊聊。
              </p>

              <div className="pf-fact-row">
                {[
                  { k: '🎓 学位', v: '曼彻斯特 硕士 / 布里斯托 学士' },
                  { k: '🌏 语言', v: '中文母语 / 英文流利学术写作' },
                  { k: '🎯 求职', v: '2027 届校招 · 全岗位开放' },
                  { k: '⚡ 标签', v: 'AI 产品 · 商业分析 · 管培' },
                ].map((f, i) => (
                  <div key={i} className="pf-fact">
                    <div className="pf-fact-k mono">{f.k}</div>
                    <div className="pf-fact-v">{f.v}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pf-about-stacks">
              <div className="pf-as-quote serif italic">
                &ldquo;The best way to predict the future is to invent it.&rdquo;
                <span className="pf-as-qby mono">— Alan Kay</span>
              </div>
              {STACKS.map((s, i) => (
                <div key={s.name} className="pf-stack-card">
                  <div className="pf-stack-head mono">
                    <span>0{i + 1} · {s.name}</span>
                    <span>{s.label}</span>
                  </div>
                  <div className="pf-stack-list">
                    {s.items.map((x, j) => (
                      <span key={j} className="pf-stack-chip">{x}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =============== PROJECTS =============== */}
        <section id="projects" className="pf-section pf-section-dark" aria-label="项目案例">
          <header className="pf-section-head">
            <span className="pf-sec-idx mono">03 — Selected Work</span>
            <h2 className="pf-sec-title serif">三个标杆项目，三种不同的 0→1 落地叙事。</h2>
          </header>

          {/* Filter */}
          <div className="pf-project-filters" role="tablist" aria-label="项目筛选">
            {PROJECT_FILTERS.map(f => (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                className={`pf-filter-btn ${filter === f.key ? 'is-active' : ''}`}
                onClick={() => setFilter(f.key)}
                data-magnetic
                onMouseMove={applyMagnetic}
                onMouseLeave={resetMagnetic}
              >
                <span className="mono">{String(PROJECT_FILTERS.indexOf(f) + 1).padStart(2, '0')}</span>
                <span>{f.label}</span>
                <em className="mono">({f.count})</em>
              </button>
            ))}
          </div>

          {/* Project Selector (vertical cards) */}
          <div className="pf-project-list" role="tablist" aria-label="项目列表">
            {visibleProjects.map(p => (
              <button
                key={p.id}
                role="tab"
                aria-selected={activeProj === p.id}
                className={`pf-project-card reveal ${activeProj === p.id ? 'is-active' : ''}`}
                onClick={() => setActiveProj(p.id)}
                onMouseMove={applyTilt}
                onMouseLeave={resetTilt}
              >
                <span className="ppc-cover" aria-hidden="true">
                  <img src={p.cover} alt="" loading="lazy" />
                </span>
                <span className="ppc-body">
                  <span className="ppc-meta mono">
                    <span>{p.index}</span>
                    <span>{p.year}</span>
                    <span>{p.category}</span>
                  </span>
                  <span className="ppc-title serif">{p.title}</span>
                  <span className="ppc-sub">{p.subtitle}</span>
                  <span className="ppc-highlights">
                    {p.highlights.map((h, i) => (
                      <span key={i} className="ppc-hl mono">{h}</span>
                    ))}
                  </span>
                </span>
                <span className="ppc-arrow mono">→</span>
              </button>
            ))}
          </div>

          {/* Deep Module (Current Project) */}
          <article className="pf-deep" aria-label="深度案例展示">
            <div className="pf-deep-head">
              <div className="pf-deep-meta mono">
                <span>CASE STUDY · {current.index}</span>
                <span>{current.year}</span>
                <span>{current.category}</span>
              </div>
              <h3 className="pf-deep-title serif">{current.title}</h3>
              <p className="pf-deep-sub">{current.subtitle}</p>
            </div>

            <div className="pf-deep-cover" aria-hidden="true">
              <img src={current.cover} alt={current.title} loading="lazy" />
              <div className="pf-deep-cover-meta mono">
                <span>Role · {current.role}</span>
                <span>Duration · {current.duration}</span>
                <span>Team · {current.team}</span>
              </div>
            </div>

            <div className="pf-deep-story">
              <div className="pf-ds-block">
                <div className="pf-ds-label mono"><span>01</span> PROBLEM</div>
                <div className="pf-ds-content">
                  <h4 className="serif italic">我们到底在解决谁的什么问题？</h4>
                  <p>{current.problem}</p>
                </div>
              </div>

              <div className="pf-ds-block">
                <div className="pf-ds-label mono"><span>02</span> MY ROLE</div>
                <div className="pf-ds-content">
                  <p>{current.role} · {current.duration}</p>
                  <div className="pf-ds-stack">
                    {current.stack.map((x, i) => (<span key={i} className="pf-stack-chip">{x}</span>))}
                  </div>
                </div>
              </div>

              <div className="pf-ds-kpis">
                {current.kpis.map((k, i) => (
                  <div key={i} className="pf-kpi">
                    <div className="pf-kpi-label mono">{k.label}</div>
                    <div className="pf-kpi-value serif">
                      <CountText text={k.value} />
                    </div>
                    <div className="pf-kpi-sub">{k.sub}</div>
                  </div>
                ))}
              </div>

              <div className="pf-ds-block">
                <div className="pf-ds-label mono"><span>03</span> WHAT I DID</div>
                <div className="pf-ds-content">
                  <ul>
                    {current.bullets.map((b, i) => (<li key={i}>{b}</li>))}
                  </ul>
                </div>
              </div>

              <div className="pf-ds-block pf-ds-result">
                <div className="pf-ds-label mono"><span>04</span> RESULT</div>
                <div className="pf-ds-content">
                  <p className="serif lead-result">{current.result}</p>
                  <div className="pf-ds-tags">
                    {current.tags.map((t, i) => (
                      <span key={i} className="pf-result-tag mono">#{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        </section>

        {/* =============== SKILLS =============== */}
        <section id="skills" className="pf-section" aria-label="能力矩阵">
          <header className="pf-section-head">
            <span className="pf-sec-idx mono">04 — Capabilities</span>
            <h2 className="pf-sec-title serif">三维能力矩阵：产品研究 · 数据工具 · 内容运营。</h2>
          </header>

          <div className="pf-skills-grid">
            {STACKS.map((s, si) => (
              <div key={s.name} className="pf-skill-col reveal">
                <div className="pf-sc-head">
                  <div className="pf-sc-num mono">0{si + 1}</div>
                  <div>
                    <div className="pf-sc-name serif">{s.label}</div>
                    <div className="pf-sc-cat mono">{s.name}</div>
                  </div>
                </div>
                {SKILLS.filter(k => k.cat === si).map((k, i) => (
                  <div key={k.name} className="pf-skill-row">
                    <div className="pf-sr-meta">
                      <span>{k.name}</span>
                      <span className="mono">{k.pct}%</span>
                    </div>
                    <div className="pf-sr-bar" role="progressbar" aria-valuenow={k.pct} aria-valuemin="0" aria-valuemax="100" aria-label={k.name}>
                      <span className="pf-sr-fill" style={{ '--p': `${k.pct}%` }}></span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* =============== EXPERIENCE =============== */}
        <section id="experience" className="pf-section pf-section-muted" aria-label="实习经历">
          <header className="pf-section-head">
            <span className="pf-sec-idx mono">05 — Experience</span>
            <h2 className="pf-sec-title serif">四段经历，从银行一线到学生社团到 AI 产品。</h2>
          </header>

          <ol className="pf-timeline">
            {EXPERIENCES.map((e, i) => (
              <li key={i} className="pf-tl-item reveal">
                <div className="pf-tl-marker mono">0{i + 1}</div>
                <div className="pf-tl-card">
                  <div className="pf-tl-top">
                    <div>
                      <h3 className="pf-tl-role serif">{e.role}</h3>
                      <div className="pf-tl-co">{e.company}</div>
                    </div>
                    <div className="pf-tl-meta mono">
                      <span>{e.period}</span>
                      <span>{e.loc}</span>
                    </div>
                  </div>
                  <ul className="pf-tl-points">
                    {e.points.map((p, j) => (<li key={j}>{p}</li>))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* =============== EDUCATION =============== */}
        <section id="education" className="pf-section" aria-label="教育背景">
          <header className="pf-section-head">
            <span className="pf-sec-idx mono">06 — Education</span>
            <h2 className="pf-sec-title serif">英制名校的经济学修炼。</h2>
          </header>

          <div className="pf-edu-grid">
            {EDUCATIONS.map((e, i) => (
              <article key={i} className="pf-edu-card reveal">
                <div className="pf-edu-rank mono">0{i + 1}</div>
                <div className="pf-edu-top">
                  <div className="pf-edu-sch serif italic">{e.school}</div>
                  <div className="pf-edu-zh">{e.zhSchool}</div>
                </div>
                <div className="pf-edu-deg">
                  <div>{e.degree}</div>
                  <div className="mono">{e.zhDegree}</div>
                </div>
                <div className="pf-edu-meta mono">
                  <span>📅 {e.period}</span>
                  <span>📍 {e.loc}</span>
                </div>
                <div className="pf-edu-courses">
                  <div className="mono pf-edu-cl">CORE COURSES</div>
                  <div>
                    {e.courses.map((c, j) => (<span key={j} className="pf-edu-cc mono">{c}</span>))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =============== CONTACT =============== */}
        <section id="contact" className="pf-section pf-section-dark pf-contact" aria-label="联系方式">
          <header className="pf-section-head center">
            <span className="pf-sec-idx mono">07 — Get in Touch</span>
            <h2 className="pf-sec-title serif big">有合适的机会？<br />让我们聊一聊。</h2>
            <p className="pf-contact-sub">
              欢迎邮件 / 电话 / GitHub 留言，任何形式的合作、内推、交流我都会认真回复 ♡
            </p>
          </header>

          <div className="pf-contact-grid">
            {CONTACTS.map((c, i) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith('http') || c.href.startsWith('mailto') || c.href.startsWith('tel') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="pf-contact-card reveal"
                data-magnetic
                onMouseMove={applyMagnetic}
                onMouseLeave={resetMagnetic}
              >
                <div className="pf-cc-num mono">0{i + 1}</div>
                <div className="pf-cc-label mono">{c.label}</div>
                <div className="pf-cc-value serif">{c.value}</div>
                <div className="pf-cc-arr mono">→</div>
              </a>
            ))}
          </div>

          <div className="pf-contact-cta-block">
            <a href={`mailto:${PROFILE.email}`} className="pf-btn pf-btn-primary huge" target="_blank" rel="noopener noreferrer">
              立即发送邮件
              <span className="pf-btn-arrow">→</span>
            </a>
            <p className="pf-copyright mono">
              © {new Date().getFullYear()} {PROFILE.name} ({PROFILE.enName}) · Crafted with React + Vite · Inspired by Brittany Chiang · Minimal Gallery · Godly
            </p>
          </div>
        </section>
      </main>

      {/* Side Label */}
      <div className="pf-sides" aria-hidden="true">
        <div className="pf-side-left mono">
          <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <span>↑ BACK TO TOP</span>
          </a>
        </div>
        <div className="pf-side-right mono">
          <span>SCROLL · {NAV.find(n => n.id === active)?.label.toUpperCase() || 'HOME'} · {NAV.find(n => n.id === active)?.index || '01'}/07</span>
        </div>
      </div>
    </div>
  )
}
