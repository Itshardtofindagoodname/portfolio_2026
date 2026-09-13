import { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppIcon from './AppIcon'
import AnimatedText from './AnimatedText'

gsap.registerPlugin(ScrollTrigger)

interface PhysicsCard {
  body: Matter.Body
  text: string
  subtext?: string
  width: number
  height: number
  bg: string
  textColor: string
  isPill?: boolean
}

export default function Reading() {
  const [pulledBook, setPulledBook] = useState<string | null>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const runnerRef = useRef<Matter.Runner | null>(null)

  const bgBooks = [
    { id: 'bg1', title: 'System Design', height: 300, bg: 'bg-[#0D1015]/30 text-white/40' },
    { id: 'bg2', title: 'Algorithms', height: 310, bg: 'bg-[#5C5268]/20 text-[#0D1015]/40' },
    { id: 'bg3', title: 'JavaScript Ninja', height: 270, bg: 'bg-[#0D1015]/30 text-white/40' },
    { id: 'bg4', title: 'Compiler Design', height: 290, bg: 'bg-[#5C5268]/30 text-[#0D1015]/40' },
    { id: 'bg5', title: 'Operating Systems', height: 320, bg: 'bg-[#0D1015]/35 text-white/40' },
    { id: 'bg6', title: 'Computer Networks', height: 280, bg: 'bg-[#5C5268]/20 text-[#0D1015]/40' },
    { id: 'bg7', title: 'Database Internals', height: 295, bg: 'bg-[#0D1015]/30 text-white/40' },
    { id: 'bg8', title: 'Distributed Algorithms', height: 315, bg: 'bg-[#5C5268]/25 text-[#0D1015]/40' },
    { id: 'bg9', title: 'High Performance Browser', height: 285, bg: 'bg-[#0D1015]/35 text-white/40' },
    { id: 'bg10', title: 'Linux Kernel Development', height: 325, bg: 'bg-[#5C5268]/30 text-[#0D1015]/40' },
    { id: 'bg11', title: 'Distributed Systems', height: 305, bg: 'bg-[#0D1015]/30 text-white/40' },
    { id: 'bg12', title: 'Crafting Interpreters', height: 290, bg: 'bg-[#5C5268]/20 text-[#0D1015]/40' },
    { id: 'bg13', title: 'Site Reliability Eng', height: 310, bg: 'bg-[#0D1015]/35 text-white/40' },
    { id: 'bg14', title: 'Computer Architecture', height: 330, bg: 'bg-[#5C5268]/30 text-[#0D1015]/40' },
    { id: 'bg15', title: 'TCP/IP Illustrated', height: 275, bg: 'bg-[#0D1015]/30 text-white/40' },
    { id: 'bg16', title: 'Rust Programming', height: 295, bg: 'bg-[#5C5268]/25 text-[#0D1015]/40' },
    { id: 'bg17', title: 'Concurrency in Go', height: 280, bg: 'bg-[#0D1015]/30 text-white/40' },
    { id: 'bg18', title: 'C++ Concurrency', height: 305, bg: 'bg-[#5C5268]/20 text-[#0D1015]/40' },
    { id: 'bg19', title: 'Type Theory', height: 315, bg: 'bg-[#0D1015]/35 text-white/40' },
    { id: 'bg20', title: 'Deep Learning', height: 325, bg: 'bg-[#5C5268]/30 text-[#0D1015]/40' },
    { id: 'bg21', title: 'Category Theory', height: 290, bg: 'bg-[#0D1015]/30 text-white/40' },
  ]

  const books = [
    { id: 'b1', title: 'The Pragmatic Programmer', height: 270, bg: 'bg-[#0D1015]', textStyle: 'font-headline-md text-[9px] text-[#F5F3EE]' },
    { id: 'b2', title: 'Clean Code', height: 280, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-mono text-[9px] font-bold' },
    { id: 'b3', title: 'Refactoring', height: 260, bg: 'bg-[#0D1015]', textStyle: 'font-body-md text-[10px] italic text-[#F5F3EE]' },
    { id: 'b4', title: 'Design Patterns', height: 300, bg: 'bg-[#0D1015] border-dashed', textStyle: 'font-label-caps text-[8px] font-bold text-[#F5F3EE]' },
    { id: 'f1', title: 'Deep Work', height: 250, bg: 'bg-[#0D1015]', textStyle: 'font-headline-md text-[10px] font-bold text-[#F5F3EE]' },
    { id: 'f2', title: 'The Lean Startup', height: 230, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-body-md text-[8px] tracking-wide' },
    { id: 'f3', title: 'The Phoenix Project', height: 270, bg: 'bg-[#0D1015]', textStyle: 'font-handwriting text-xs font-bold italic text-[#F5F3EE]' },
    { id: 'f4', title: 'Code Complete', height: 210, bg: 'bg-[#0D1015] border-dashed', textStyle: 'font-label-caps text-[8px] text-[#F5F3EE]' },
    { id: 'b5', title: 'Data-Intensive Apps', height: 290, bg: 'bg-[#0D1015]', textStyle: 'font-headline-md text-[9px] text-[#4AC5CB]' },
    { id: 'b6', title: 'SICP', height: 275, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-mono text-[9px] font-bold' },
    { id: 'b7', title: "You Don't Know JS", height: 245, bg: 'bg-[#0D1015]', textStyle: 'font-handwriting text-xs text-[#F5F3EE]' },
    { id: 'b8', title: 'Atomic Habits', height: 235, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-body-md text-[8px]' },
    { id: 'b9', title: 'Grokking Algorithms', height: 265, bg: 'bg-[#0D1015]', textStyle: 'font-label-caps text-[8px] text-[#F5F3EE]' },
    { id: 'b10', title: 'Building Microservices', height: 280, bg: 'bg-[#0D1015] border-dashed', textStyle: 'font-headline-md text-[9px] text-[#F5F3EE]' },
    { id: 'b11', title: 'Crafting Interpreters', height: 290, bg: 'bg-[#0D1015]', textStyle: 'font-mono text-[9px] text-[#4AC5CB]' },
    { id: 'b12', title: 'High Performance Networking', height: 275, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-headline-md text-[8px] font-bold' },
    { id: 'b13', title: 'Database Internals', height: 285, bg: 'bg-[#0D1015]', textStyle: 'font-body-md text-[9px] italic text-[#F5F3EE]' },
    { id: 'b14', title: 'Linux System Programming', height: 265, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-label-caps text-[8px]' },
    { id: 'b15', title: 'Domain-Driven Design', height: 295, bg: 'bg-[#0D1015] border-dashed', textStyle: 'font-headline-md text-[9px] text-[#F5F3EE]' },
    { id: 'b16', title: 'Site Reliability Engineering', height: 280, bg: 'bg-[#0D1015]', textStyle: 'font-mono text-[8px] text-[#F5F3EE]' },
    { id: 'b17', title: 'The Rust Programming Book', height: 270, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-handwriting text-xs font-bold' },
    { id: 'b18', title: 'Concurrency in Go', height: 250, bg: 'bg-[#0D1015]', textStyle: 'font-label-caps text-[8px] text-[#4AC5CB]' },
    { id: 'b19', title: 'Algorithms Unlocked', height: 240, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-body-md text-[8px]' },
    { id: 'b20', title: 'Structure and Interpretation', height: 300, bg: 'bg-[#0D1015]', textStyle: 'font-headline-md text-[9px] text-[#F5F3EE]' },
    { id: 'b21', title: 'The Art of Computer Programming', height: 310, bg: 'bg-[#0D1015] border-dashed', textStyle: 'font-mono text-[8px] text-[#4AC5CB]' },
    { id: 'b22', title: 'Understanding ECMAScript 6', height: 260, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-handwriting text-xs' },
    { id: 'b23', title: 'System Performance', height: 285, bg: 'bg-[#0D1015]', textStyle: 'font-headline-md text-[9px] text-[#F5F3EE]' },
    { id: 'b24', title: 'Designing Data-Intensive Systems', height: 295, bg: 'bg-[#0D1015]', textStyle: 'font-mono text-[8px] text-[#F5F3EE]' },
    { id: 'b25', title: 'Modern Operating Systems', height: 305, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-label-caps text-[8px]' },
    { id: 'b26', title: 'Computer Systems: Programmer Perspective', height: 315, bg: 'bg-[#0D1015]', textStyle: 'font-body-md text-[8px] text-[#F5F3EE]' },
    { id: 'b27', title: 'Anatomy of a Compiler', height: 275, bg: 'bg-[#0D1015] border-dashed', textStyle: 'font-headline-md text-[8px] text-[#4AC5CB]' },
    { id: 'b28', title: 'Introduction to Algorithms (CLRS)', height: 320, bg: 'bg-[#0D1015]', textStyle: 'font-mono text-[9px] font-bold text-[#F5F3EE]' },
    { id: 'b29', title: 'The Mythical Man-Month', height: 250, bg: 'bg-[#F5F3EE] text-[#0D1015] border-[#0D1015]', textStyle: 'font-handwriting text-xs' },
  ]

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const width = container.clientWidth
    const height = Math.max(420, container.clientHeight || 450)

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { Engine, World, Bodies, Mouse, MouseConstraint, Runner } = Matter

    const engine = Engine.create({
      gravity: { x: 0, y: -0.6, scale: 0.001 },
    })
    engineRef.current = engine
    const world = engine.world

    const wallOptions = { isStatic: true, restitution: 0.6, friction: 0.3 }
    const wallThickness = 100

    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2 - 10, width * 2, wallThickness, wallOptions)
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height * 3, wallOptions)
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height * 3, wallOptions)
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2 + 10, width * 2, wallThickness, wallOptions)

    World.add(world, [ground, leftWall, rightWall, ceiling])

    // Recruiter-Attracting Priorities Physics Cards
    const cardsData = [
      { text: 'RESPONSIVENESS', subtext: 'pixel-perfect across all viewports', width: 220, height: 70, bg: '#F5F3EE', textColor: '#0D1015' },
      { text: 'MOTION & ANIMATIONS', subtext: '60fps GSAP & physics feel', width: 230, height: 65, bg: '#0D1015', textColor: '#F5F3EE' },
      { text: 'ACCESSIBILITY (A11Y)', subtext: 'WCAG standards & screen readers', width: 240, height: 75, bg: '#4AC5CB', textColor: '#0D1015', isPill: true },
      { text: 'CORE WEB VITALS', subtext: 'Lighthouse 95+, 0 CLS, instant LCP', width: 230, height: 65, bg: '#F5F3EE', textColor: '#0D1015' },
      { text: 'SYSTEM ARCHITECTURE', subtext: 'clean TypeScript & modular APIs', width: 240, height: 65, bg: '#0D1015', textColor: '#F5F3EE' },
      { text: 'TACTILE UX', subtext: 'delightful micro-interactions', width: 210, height: 65, bg: '#F5F3EE', textColor: '#0D1015' },
    ]

    const physicsCards: PhysicsCard[] = []

    cardsData.forEach((item, index) => {
      const x = (width / (cardsData.length + 1)) * (index + 1) + (Math.random() * 20 - 10)
      const y = height - 100 - index * 40
      const body = Bodies.rectangle(x, y, item.width, item.height, {
        chamfer: { radius: item.isPill ? item.height / 2 : 4 },
        restitution: 0.5,
        friction: 0.2,
        frictionAir: 0.015,
        angle: (Math.random() - 0.5) * 0.4,
      })

      World.add(world, body)
      physicsCards.push({
        body,
        text: item.text,
        subtext: item.subtext,
        width: item.width,
        height: item.height,
        bg: item.bg,
        textColor: item.textColor,
        isPill: item.isPill,
      })
    })

    const mouse = Mouse.create(canvas)
    mouse.pixelRatio = dpr

    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    })

    World.add(world, mouseConstraint)

    let animId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)

      physicsCards.forEach((card) => {
        const { position, angle } = card.body
        ctx.save()
        ctx.translate(position.x, position.y)
        ctx.rotate(angle)

        const rx = -card.width / 2
        const ry = -card.height / 2

        ctx.fillStyle = 'rgba(13, 16, 21, 0.1)'
        if (card.isPill) {
          ctx.beginPath()
          ctx.roundRect(rx + 3, ry + 3, card.width, card.height, card.height / 2)
          ctx.fill()

          ctx.fillStyle = card.bg
          ctx.strokeStyle = '#0D1015'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.roundRect(rx, ry, card.width, card.height, card.height / 2)
          ctx.fill()
          ctx.stroke()
        } else {
          ctx.fillRect(rx + 3, ry + 3, card.width, card.height)

          ctx.fillStyle = card.bg
          ctx.strokeStyle = '#0D1015'
          ctx.lineWidth = 2
          ctx.fillRect(rx, ry, card.width, card.height)
          ctx.strokeRect(rx, ry, card.width, card.height)
        }

        ctx.fillStyle = card.textColor
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.font = `700 12px "Outfit", sans-serif`
        ctx.fillText(card.text, 0, card.subtext ? -6 : 0)

        if (card.subtext) {
          ctx.font = `italic 10px "HappyMonkey", cursive`
          ctx.fillStyle = card.textColor === '#F5F3EE' ? 'rgba(245, 243, 238, 0.7)' : '#5C5268'
          ctx.fillText(card.subtext, 0, 10)
        }

        ctx.restore()
      })

      ctx.restore()
      animId = requestAnimationFrame(render)
    }

    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine)
    render()

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => Runner.run(runner, engine),
      onLeave: () => Runner.stop(runner),
      onEnterBack: () => Runner.run(runner, engine),
      onLeaveBack: () => Runner.stop(runner),
    })

    return () => {
      cancelAnimationFrame(animId)
      trigger.kill()
      Runner.stop(runner)
      World.clear(world, false)
      Engine.clear(engine)
    }
  }, [])

  const [selectedBookNote, setSelectedBookNote] = useState<{ title: string; takeaway: string } | null>(null)

  const bookTakeaways: Record<string, string> = {
    'b1': 'Key Takeaway: Orthogonality in system design & automation as a force multiplier. Debarjun reads this to cultivate disciplined engineering habits.',
    'b2': 'Key Takeaway: Code is read 10x more than it is written. Focus on expressive variable naming, small pure functions, and refactoring ruthlessly.',
    'b3': 'Key Takeaway: Code smells are signals, not flaws. Refactoring incrementally under test coverage ensures continuous codebase evolution.',
    'b4': 'Key Takeaway: Decoupling object creation and behavior through GoF design patterns (Strategy, Factory, Observer, Decorator).',
    'f1': 'Key Takeaway: Deep work is the superpower of the 21st century. High-value engineering output requires uninterrupted focus blocks.',
    'f2': 'Key Takeaway: Build-Measure-Learn feedback loops for rapid software validation and MVP deployment.',
    'f3': 'Key Takeaway: DevOps integration, bottleneck theory (Theory of Constraints), and fast feedback loops in production deployment.',
    'f4': 'Key Takeaway: Pragmatic software construction principles, defensive programming, and rigorous debugging workflows.',
    'b5': 'Key Takeaway: Essential read for distributed systems, data replication, partitioning, consensus, and fault tolerance under scale.',
    'b6': 'Key Takeaway: Abstraction layers, functional paradigms, and metaprogramming fundamentals that shape computational thinking.',
    'b7': 'Key Takeaway: Mastering JavaScript closure scopes, engine event loop ticks, prototypal chains, and asynchronous execution.',
    'b8': 'Key Takeaway: 1% daily compounded improvements lead to massive long-term engineering mastery and workflow efficiency.',
    'b9': 'Key Takeaway: Visualizing graph traversal algorithms, dynamic programming, and space-time complexity tradeoffs intuitively.',
    'b10': 'Key Takeaway: Service boundaries, event-driven communications, saga patterns, and graceful degradation in distributed services.',
    'b11': 'Key Takeaway: Building bytecode VMs, AST parsers, garbage collectors, and lexers from scratch in C & Java.',
    'b12': 'Key Takeaway: HTTP/2 multiplexing, TLS handshakes, TCP slow-start tuning, and browser networking optimization.',
    'b13': 'Key Takeaway: B-Tree vs LSM-Tree storage engines, Write-Ahead Logging (WAL), and distributed consensus mechanisms.',
    'b14': 'Key Takeaway: Linux syscalls, epoll event loops, POSIX signals, file descriptor management, and process memory maps.',
    'b15': 'Key Takeaway: Ubiquitous language, bounded contexts, and domain model mapping for complex enterprise software.',
    'b16': 'Key Takeaway: SLO/SLA targets, error budgets, blameless postmortems, and automated monitoring for high availability.',
    'b17': 'Key Takeaway: Memory safety without GC through borrow checking, lifetime annotations, and fearless concurrency.',
    'b18': 'Key Takeaway: CSP channels, goroutine scheduling mechanics, mutex locking primitives, and sync package patterns.',
    'b19': 'Key Takeaway: Intuitive algorithmic concepts from page ranking to cryptography explained without dense formalism.',
    'b20': 'Key Takeaway: Lisp metacircular evaluators, lazy evaluation, and computational abstraction layers.',
    'b21': 'Key Takeaway: Knuth\'s foundational analysis of sorting, searching, and fundamental computer algorithms.',
    'b22': 'Key Takeaway: Promises, generators, proxies, and ES6 module internals under the hood.',
    'b23': 'Key Takeaway: CPU flame graphs, perf tracing, eBPF probes, and kernel-level bottleneck analysis.',
    'b24': 'Key Takeaway: Masterclass on database replication, partitioning, transactions, and linearizability.',
    'b25': 'Key Takeaway: Process scheduling, virtual memory paging, file systems, and hypervisor internals by Tanenbaum.',
    'b26': 'Key Takeaway: Linking, execution flows, cache hierarchies, and assembly language mechanics.',
    'b27': 'Key Takeaway: Lexical analysis, context-free grammars, SSA intermediate representations, and register allocation.',
    'b28': 'Key Takeaway: The definitive reference for graph theory, dynamic programming, divide-and-conquer, and greedy algorithms.',
    'b29': 'Key Takeaway: Brook\'s law: Adding manpower to a late software project makes it later. Essential software engineering management.',
  }

  const fieldJournalSections = [
    {
      id: 'sec-1',
      num: '01',
      title: '01. Core Frontend Philosophy',
      motto: 'Code as Craft: Build web software that feels tactile, instant, and delightful to interact with.',
      notes: [
        { label: 'Tactile Interfaces', detail: 'Web apps should never feel like static flat PDFs. Buttons respond dynamically, layouts react with physical inertia and spring weight.' },
        { label: 'Pixel Integrity', detail: 'Consistent typography, harmonious HSL color tokens, crisp ink borders, and responsive grid alignment across all screen sizes.' },
      ],
    },
    {
      id: 'sec-musings',
      num: '02',
      title: '02. Random Musings',
      motto: 'Intermittent showers of half-baked opinions and coffee-powered thoughts.',
      notes: [],
      isMusingBoard: true,
    },
    {
      id: 'sec-2',
      num: '03',
      title: '03. Production & Recruiter Priorities',
      motto: 'Production Rigor: Zero layout shifts, 95+ Core Web Vitals, and compliant accessible UX standards.',
      notes: [
        { label: 'Core Web Vitals', detail: 'Optimized asset delivery, minimal bundle size, fast LCP, zero CLS, and instant interaction response times under high load.' },
        { label: 'Accessibility (a11y)', detail: 'Fully navigable via keyboard, semantic HTML5 structure, ARIA landmarks, proper focus management, and screen-reader support.' },
      ],
    },
    {
      id: 'sec-3',
      num: '04',
      title: '04. Interactive Physics & Gravity Sandbox',
      motto: 'Things I Prioritize: Physical inertia, rigid-body mechanics, and recruiter-attracting quality metrics.',
      notes: [],
      isPhysicsCanvas: true,
    },
    {
      id: 'sec-4',
      num: '05',
      title: '05. AI Systems & Modern Architecture',
      motto: 'Engineering Depth: Combining full-stack TypeScript, streaming endpoints, and LLM orchestration.',
      notes: [
        { label: 'LLM Orchestration', detail: 'Integrating Groq API, LLaMA 3, Mixtral, and LangChain RAG pipelines for real-time AI capabilities.' },
        { label: 'Clean Code Architecture', detail: 'Decoupled component layers, strict TypeScript schemas, and maintainable state flow.' },
      ],
    },
    {
      id: 'sec-5',
      num: '06',
      title: '06. Books & Essential Reading Notes',
      motto: 'Continuous Learning: Architectural manuals, system design, and technical mastery books.',
      notes: [],
      isBookshelf: true,
    },
  ]

  return (
    <section id="reading" className="paper-cut-section relative bg-[#F5F3EE] text-[#0D1015] border-y-2 border-[#0D1015] py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        {/* Main Title Section */}
        <div className="mb-12 border-b-2 border-[#0D1015] pb-6">
          <h1 className="font-headline-xl text-5xl md:text-7xl uppercase leading-none tracking-normal text-[#0D1015]">
            <span className="inline-block">
              <AnimatedText text="READING &" stagger={0.08} />
            </span>
            <span className="block font-handwriting lowercase italic text-[#5C5268] ml-12 mt-4 text-2xl md:text-3xl font-normal">
              <AnimatedText text="musings" stagger={0.1} delay={0.35} />
            </span>
          </h1>
        </div>

        {/* SINGLE-PAGE OFF-WHITE FIELD JOURNAL (ENCOMPASSES EVERYTHING) */}
        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-label-caps text-xs text-[#4AC5CB] uppercase tracking-[0.2em]">
              FIELD JOURNAL // SYSTEM &amp; DESIGN PRINCIPLES
            </span>
            <div className="h-[2px] bg-[#0D1015]/20 flex-grow" />
          </div>

          {/* Single-Page Off-White Notebook Sheet */}
          <div className="relative bg-[#F9F8F5] border-2 border-[#0D1015] rounded-sm p-6 md:p-12 shadow-[8px_8px_0_0_#0D1015]">
            <div className="tape-effect tape-tr !w-20 opacity-80" />

            {/* Notebook Red Margin Line */}
            <div className="absolute left-6 md:left-10 top-0 bottom-0 w-[2px] bg-red-400/40 pointer-events-none" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b-2 border-[#0D1015] pb-4 mb-8 pl-4">
              <div>
                <h3 className="font-headline-md text-3xl md:text-4xl font-bold text-[#0D1015]">
                  Engineering Field Journal
                </h3>
                <p className="font-handwriting text-xl text-[#5C5268] mt-1">
                  Pinned principles on tactile UI, production performance, interactive physics, and foundational reading.
                </p>
              </div>
              <span className="font-mono text-xs px-3 py-1 bg-[#0D1015] text-[#F5F3EE] border border-[#0D1015] font-bold shrink-0 mt-2 sm:mt-0">
                COMPLETE MANIFESTO // 2026
              </span>
            </div>

            {/* All 5 Points Integrated on One Single Off-White Page */}
            <div className="space-y-10 pl-4">
              {fieldJournalSections.map((sec, idx) => (
                <div
                  key={sec.id}
                  className={`space-y-4 ${
                    idx !== fieldJournalSections.length - 1 ? 'border-b-2 border-dashed border-[#0D1015]/30 pb-10' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1">
                    <h4 className="font-headline-md text-2xl font-bold text-[#0D1015]">
                      {sec.title}
                    </h4>
                    <p className="font-handwriting text-xl text-[#4AC5CB] font-bold italic">
                      &quot;{sec.motto}&quot;
                    </p>
                  </div>

                  {/* Point 03: Physics Canvas */}
                  {sec.isPhysicsCanvas && (
                    <div className="mt-4">
                      <div ref={containerRef} className="relative border-2 border-[#0D1015] bg-[#F5F3EE] h-[380px] rounded-sm overflow-hidden shadow-md">
                        <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing block" />
                        <div className="absolute top-3 right-3 font-mono text-[10px] text-[#0D1015]/50 bg-[#F5F3EE] px-2 py-0.5 border border-[#0D1015]">
                          GRAVITY: INVERTED // DRAG &amp; TOSS CARDS
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Point 05: Bookshelf */}
                  {sec.isBookshelf && (
                    <div className="mt-4">
                      <div className="reading-shelf border-2 border-[#0D1015] bg-[#F5F3EE] h-[360px] px-3 pb-0 flex items-end justify-between relative select-none w-full overflow-hidden scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        {/* Back Row Layer of Books */}
                        <div className="absolute bottom-0 left-2 right-2 flex items-end justify-around opacity-40 pointer-events-none z-0">
                          {bgBooks.map((bgBook) => (
                            <div
                              key={bgBook.id}
                              className={`border border-[#0D1015] flex justify-center items-start pt-3 w-6 sm:w-8 ${bgBook.bg}`}
                              style={{ height: `${bgBook.height}px` }}
                            >
                              <span className="book-spine-label font-mono text-[8px] font-bold uppercase tracking-widest">
                                {bgBook.title}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Front Main Row of Books */}
                        <div className="relative z-10 flex items-end justify-between w-full gap-1">
                          {books.map((book) => {
                            const isPulled = pulledBook === book.id
                            return (
                              <div
                                key={book.id}
                                className={`book-spine border-2 border-[#0D1015] cursor-pointer transition-all duration-300 shadow-[2px_2px_0_0_rgba(13,16,21,0.15)] flex justify-center items-start pt-4 shrink-0 min-w-[28px] sm:min-w-[32px] max-w-[40px] ${book.bg}`}
                                style={{
                                  height: `${book.height}px`,
                                  transform: `translateY(${isPulled ? -30 : 0}px)`,
                                  zIndex: isPulled ? 40 : 10,
                                }}
                                onClick={() => {
                                  setSelectedBookNote({
                                    title: book.title,
                                    takeaway: bookTakeaways[book.id] || 'Key engineering concepts & practical systems architecture principles.',
                                  })
                                }}
                                onMouseEnter={() => setPulledBook(book.id)}
                                onMouseLeave={() => setPulledBook(null)}
                              >
                                <span className={`book-spine-label font-bold tracking-widest uppercase ${book.textStyle}`}>
                                  {book.title}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#0D1015] z-20" />
                      </div>
                      <p className="font-handwriting text-sm text-[#5C5268] mt-2 italic text-center">
                        * Click any book spine to view Debarjun&apos;s personal note &amp; takeaways.
                      </p>
                    </div>
                  )}

                  {/* Standard Notes Grid */}
                  {!sec.isPhysicsCanvas && !sec.isBookshelf && !sec.isMusingBoard && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-handwriting text-xl text-[#0D1015]">
                      {sec.notes.map((note) => (
                        <div key={note.label} className="p-4 border-l-4 border-[#0D1015] bg-[#F5F3EE]/80 space-y-1">
                          <div className="font-headline-md text-lg font-bold text-[#0D1015] flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#4AC5CB]" />
                            {note.label}
                          </div>
                          <p className="text-base text-[#5C5268] leading-normal">
                            {note.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Random Musings Board */}
                  {sec.isMusingBoard && (
                    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                      <div className="paper-scrap musing-scrap p-4 rotate-[-3deg] w-full">
                        <p className="font-handwriting text-base leading-snug text-[#0D1015]">
                          There are two hard things in computer science: cache invalidation, naming things, and
                          off-by-one errors.
                        </p>
                      </div>
                      <div className="paper-scrap musing-scrap p-4 rotate-[2deg] w-full">
                        <p className="font-handwriting text-base leading-snug text-[#0D1015]">
                          It&apos;s not a bug. It&apos;s an undocumented feature.
                        </p>
                      </div>
                      <div className="paper-scrap musing-scrap p-4 rotate-[-2deg] w-full">
                        <p className="font-handwriting text-base leading-snug text-[#0D1015]">
                          I love deadlines. I love the whooshing sound they make as they fly by.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-10 pt-4 border-t border-dashed border-[#0D1015]/40 flex justify-between items-center text-xs font-mono text-[#5C5268] pl-4">
              <span>DEBARJUN THAKUR // FIELD SKETCHBOOK</span>
              <span>ENGINEERING MANIFESTO (6 POINTS)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Book Takeaway Popover Modal */}
      {selectedBookNote && (
        <div
          className="fixed inset-0 bg-[#0D1015]/60 backdrop-blur-xs flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedBookNote(null)}
        >
          <div
            className="bg-[#F9F8F5] border-4 border-[#0D1015] p-6 md:p-8 max-w-md w-full shadow-[8px_8px_0_0_#4AC5CB] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="tape-effect tape-tr opacity-80" />
            <div className="flex items-start justify-between border-b-2 border-[#0D1015] pb-3 mb-4">
              <h4 className="font-headline-md text-2xl font-bold text-[#0D1015]">
                {selectedBookNote.title}
              </h4>
              <button
                onClick={() => setSelectedBookNote(null)}
                className="p-1 border border-[#0D1015] bg-[#F5F3EE] hover:bg-[#0D1015] hover:text-[#F5F3EE] transition-colors"
              >
                <AppIcon name="close" size={20} />
              </button>
            </div>

            <p className="font-handwriting text-xl text-[#0D1015] leading-relaxed mb-6">
              {selectedBookNote.takeaway}
            </p>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedBookNote(null)}
                className="px-4 py-2 bg-[#0D1015] text-[#F5F3EE] font-mono text-xs font-bold uppercase tracking-wider border border-[#0D1015] hover:bg-[#4AC5CB] hover:text-[#0D1015] transition-colors"
              >
                Close Note
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

