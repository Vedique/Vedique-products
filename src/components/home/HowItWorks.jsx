import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const steps = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Choose',
    description: 'Pick your favorites from our artisan collection.',
    detail: 'Step 01',
    color: '#E8A0A8',
    glow: 'rgba(232,160,168,0.35)',
    glowSoft: 'rgba(232,160,168,0.12)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Prepare',
    description: 'Freshly made with ancient wisdom & soul.',
    detail: 'Step 02',
    color: '#E8C090',
    glow: 'rgba(232,192,144,0.35)',
    glowSoft: 'rgba(232,192,144,0.12)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2V7M12 2H9M12 2H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="4" y="7" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12H16M8 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Pack',
    description: 'Eco-conscious wrap for peak hygiene.',
    detail: 'Step 03',
    color: '#90C4B4',
    glow: 'rgba(144,196,180,0.35)',
    glowSoft: 'rgba(144,196,180,0.12)',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 9H21M7 13H11M13 13H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="2" y="9" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 19V21M8 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Deliver',
    description: 'Straight to you, fresh and full of life.',
    detail: 'Step 04',
    color: '#C4A882',
    glow: 'rgba(196,168,130,0.35)',
    glowSoft: 'rgba(196,168,130,0.12)',
  },
];

// ── Tiny leaf sprout ──────────────────────────────────────────────────────────
function Sprout({ cx, cy, angle, size, color, progress, revealAt }) {
  const opacity = useTransform(progress, [revealAt, revealAt + 0.07], [0, 0.7]);
  const scale = useTransform(progress, [revealAt, revealAt + 0.08], [0, 1]);
  const rad = (angle * Math.PI) / 180;
  const tx = cx + Math.cos(rad) * size;
  const ty = cy + Math.sin(rad) * size;
  const c1x = cx + Math.cos(rad - 0.65) * size * 0.55;
  const c1y = cy + Math.sin(rad - 0.65) * size * 0.55;
  const c2x = cx + Math.cos(rad + 0.65) * size * 0.55;
  const c2y = cy + Math.sin(rad + 0.65) * size * 0.55;
  return (
    <motion.path
      d={`M ${cx} ${cy} Q ${c1x} ${c1y} ${tx} ${ty} Q ${c2x} ${c2y} ${cx} ${cy} Z`}
      fill={color}
      style={{ opacity, scale, transformOrigin: `${cx}px ${cy}px` }}
    />
  );
}

// ── Glowing node ──────────────────────────────────────────────────────────────
function VineNode({ cx, cy, color, progress, revealAt }) {
  const opacity = useTransform(progress, [revealAt, revealAt + 0.08], [0, 1]);
  const scale = useTransform(progress, [revealAt, revealAt + 0.08], [0, 1]);
  return (
    <motion.g style={{ opacity }}>
      <motion.circle cx={cx} cy={cy} r={10}
        fill="none" stroke={color} strokeWidth={1}
        animate={{ r: [8, 18, 8], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <circle cx={cx} cy={cy} r={5.5} fill="none" stroke={color} strokeWidth={1} opacity={0.3} />
      <motion.circle cx={cx} cy={cy} r={3.5}
        fill={color} stroke="#1E2622" strokeWidth={2}
        style={{ scale, transformOrigin: `${cx}px ${cy}px`, filter: `drop-shadow(0 0 7px ${color})` }}
      />
    </motion.g>
  );
}

// ── Floating step ─────────────────────────────────────────────────────────────
const FloatingStep = ({ step, index, isMobile, vineProgress, spread, padding }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const rotX = useSpring(useTransform(mouseY, [-150, 150], [6, -6]), { stiffness: 120, damping: 30 });
  const rotY = useSpring(useTransform(mouseX, [-150, 150], [-6, 6]), { stiffness: 120, damping: 30 });

  function onMove(e) {
    if (!ref.current || isMobile) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - r.left - r.width / 2);
    mouseY.set(e.clientY - r.top - r.height / 2);
  }
  function onLeave() { mouseX.set(0); mouseY.set(0); }

  const bloomStart = 0.05 + index * 0.23;
  const bloomEnd = bloomStart + 0.11;
  const opacity = useTransform(vineProgress, [bloomStart, bloomEnd], [0, 1]);
  const yOffset = useTransform(vineProgress, [bloomStart, bloomEnd], [35, 0]);
  const blurVal = useTransform(vineProgress, [bloomStart, bloomEnd], [8, 0]);
  const filter = useTransform(blurVal, v => `blur(${v}px)`);

  const isLeft = index % 2 === 0;
  const tops = [12.5, 37.5, 62.5, 87.5];
  const width = isMobile ? `calc(50vw - ${spread + padding - 6}px)` : '280px';

  return (
    <div style={{
      position: 'absolute',
      top: `${tops[index]}%`,
      transform: 'translateY(-50%)',
      width,
      left: isLeft ? 'auto' : `calc(50% + ${spread + padding}px)`,
      right: isLeft ? `calc(50% + ${spread + padding}px)` : 'auto',
      zIndex: 5,
      perspective: '800px',
    }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        style={{
          opacity, y: yOffset, filter,
          rotateX: isMobile ? 0 : rotX,
          rotateY: isMobile ? 0 : rotY,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Glow halo behind content — blooms on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.6 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '50%', left: isLeft ? 'auto' : '-20px',
            right: isLeft ? '-20px' : 'auto',
            transform: 'translateY(-50%)',
            width: '160px', height: '160px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${step.glow} 0%, transparent 70%)`,
            filter: 'blur(20px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Floating content — no card, no border */}
        <div style={{
          position: 'relative', zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : (isLeft ? 'flex-end' : 'flex-start'),
          textAlign: isMobile ? 'center' : (isLeft ? 'right' : 'left'),
          padding: isMobile ? '0 4px' : '0',
          gap: isMobile ? '6px' : '10px',
        }}>

          {/* Icon — glowing circle */}
          <motion.div
            animate={{
              boxShadow: hovered
                ? `0 0 0 1px ${step.color}40, 0 0 24px 4px ${step.glow}, 0 0 48px 8px ${step.glowSoft}`
                : `0 0 0 1px ${step.color}25, 0 0 12px 2px ${step.glowSoft}`,
            }}
            transition={{ duration: 0.45 }}
            style={{
              width: isMobile ? '38px' : '48px',
              height: isMobile ? '38px' : '48px',
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${step.color}30, #1E2622 80%)`,
              border: `1px solid ${step.color}50`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: step.color,
              flexShrink: 0,
            }}
          >
            {step.icon}
          </motion.div>

          {/* Step label */}
          <span style={{
            fontSize: isMobile ? '0.5rem' : '0.6rem',
            letterSpacing: '0.3em',
            color: step.color,
            fontWeight: 700,
            fontFamily: 'Cormorant Garamond, serif',
            textTransform: 'uppercase',
            opacity: 0.7,
            display: 'block',
          }}>
            {step.detail}
          </span>

          {/* Title */}
          <motion.h3
            animate={{ color: hovered ? '#ffffff' : '#d8d0c8' }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: isMobile ? '1.5rem' : '2.2rem',
              fontFamily: 'Cormorant Garamond, serif',
              fontWeight: 300,
              fontStyle: 'italic',
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-0.01em',
            }}
          >
            {step.title}
          </motion.h3>

          {/* Thin divider line */}
          <motion.div
            animate={{ width: hovered ? '100%' : '30%', opacity: hovered ? 0.5 : 0.2 }}
            transition={{ duration: 0.4 }}
            style={{
              height: '1px',
              background: `linear-gradient(${isLeft ? '270deg' : '90deg'}, ${step.color}, transparent)`,
              alignSelf: isLeft ? 'flex-end' : 'flex-start',
              maxWidth: isMobile ? '80px' : '140px',
              minWidth: '30px',
            }}
          />

          {/* Description */}
          <motion.p
            animate={{ opacity: hovered ? 0.75 : 0.45 }}
            transition={{ duration: 0.35 }}
            style={{
              fontSize: isMobile ? '0.72rem' : '0.88rem',
              color: '#b8b0a8',
              lineHeight: 1.65,
              margin: 0,
              fontWeight: 300,
              fontFamily: 'Cormorant Garamond, serif',
            }}
          >
            {step.description}
          </motion.p>

        </div>
      </motion.div>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end end'],
  });

  const vineProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const vineHeight = isMobile ? 820 : 1240;
  const spread = isMobile ? 40 : 82;
  const padding = isMobile ? 4 : 20;

  const n1y = vineHeight * 0.125;
  const n2y = vineHeight * 0.375;
  const n3y = vineHeight * 0.625;
  const n4y = vineHeight * 0.875;

  const pathData = `
    M 0 0
    C 0 ${n1y * 0.4}, ${-spread} ${n1y * 0.55}, ${-spread} ${n1y}
    C ${-spread} ${n1y + (n2y - n1y) * 0.45}, ${spread} ${n1y + (n2y - n1y) * 0.55}, ${spread} ${n2y}
    C ${spread} ${n2y + (n3y - n2y) * 0.45}, ${-spread} ${n2y + (n3y - n2y) * 0.55}, ${-spread} ${n3y}
    C ${-spread} ${n3y + (n4y - n3y) * 0.45}, ${spread} ${n3y + (n4y - n3y) * 0.55}, ${spread} ${n4y}
  `;

  const sprouts = [
    { cx: -spread * 0.75, cy: vineHeight * 0.068, angle: -130, size: isMobile ? 9 : 16, color: steps[0].color, at: 0.05 },
    { cx: -spread * 0.90, cy: vineHeight * 0.100, angle: 155, size: isMobile ? 7 : 12, color: steps[0].color, at: 0.07 },
    { cx: spread * 0.82, cy: vineHeight * 0.262, angle: -38, size: isMobile ? 9 : 15, color: steps[1].color, at: 0.21 },
    { cx: spread * 0.90, cy: vineHeight * 0.310, angle: 22, size: isMobile ? 7 : 11, color: steps[1].color, at: 0.24 },
    { cx: -spread * 0.78, cy: vineHeight * 0.512, angle: -138, size: isMobile ? 9 : 16, color: steps[2].color, at: 0.44 },
    { cx: -spread * 0.92, cy: vineHeight * 0.548, angle: 162, size: isMobile ? 7 : 11, color: steps[2].color, at: 0.47 },
    { cx: spread * 0.80, cy: vineHeight * 0.760, angle: -42, size: isMobile ? 9 : 15, color: steps[3].color, at: 0.66 },
    { cx: spread * 0.92, cy: vineHeight * 0.804, angle: 20, size: isMobile ? 7 : 11, color: steps[3].color, at: 0.69 },
  ];

  const nodes = [
    { cx: -spread, cy: n1y, color: steps[0].color, at: 0.10 },
    { cx: spread, cy: n2y, color: steps[1].color, at: 0.32 },
    { cx: -spread, cy: n3y, color: steps[2].color, at: 0.55 },
    { cx: spread, cy: n4y, color: steps[3].color, at: 0.77 },
  ];

  const svgViewW = spread * 3;
  const bgParallax = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#1E2622',
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '80px 0 90px' : '100px 0 120px',
      }}
    >
      {/* Subtle starfield-like dots */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Ambient color blobs removed */}

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 5, padding: '0 12px' }}>

        {/* ── HEADING ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '60px' : '96px' }}
        >
          <span style={{
            fontSize: '0.7rem', letterSpacing: '0.42em',
            color: '#6A8A80', textTransform: 'uppercase',
            display: 'block', marginBottom: '14px',
            fontWeight: 600, fontFamily: 'Cormorant Garamond, serif',
          }}>
            the root of it all
          </span>
          <h2 style={{
            fontSize: isMobile ? '2.6rem' : '4.2rem',
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 200, lineHeight: 1,
            margin: 0, letterSpacing: '-0.01em',
            color: '#e8e0d5',
          }}>
            Grows with{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#8AB8A8', position: 'relative' }}>
              Nature
              <motion.svg viewBox="0 0 130 8" width={isMobile ? '90' : '148'}
                style={{ position: 'absolute', bottom: '-4px', left: 0, overflow: 'visible', display: 'block' }}
              >
                <motion.path d="M 2 6 C 30 1, 80 8, 128 4"
                  stroke="#8AB8A8" strokeWidth="1.2" fill="none" strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.5 }}
                />
              </motion.svg>
            </span>
          </h2>
        </motion.div>

        {/* ── VINE + STEPS ── */}
        <div style={{ position: 'relative', width: '100%', height: `${vineHeight}px` }}>

          {/* SVG vine */}
          <div style={{
            position: 'absolute', top: 0, left: '50%',
            height: `${vineHeight}px`, transform: 'translateX(-50%)',
            zIndex: 1, pointerEvents: 'none',
          }}>
            <svg
              width={svgViewW} height={vineHeight}
              viewBox={`${-svgViewW / 2} 0 ${svgViewW} ${vineHeight}`}
              style={{ overflow: 'visible', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
            >
              <defs>
                <linearGradient id="rootGrad" x1="0" y1="0" x2="0" y2={vineHeight} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#6A8A80" />
                  <stop offset="28%" stopColor="#E8A0A8" />
                  <stop offset="55%" stopColor="#E8C090" />
                  <stop offset="78%" stopColor="#90C4B4" />
                  <stop offset="100%" stopColor="#C4A882" />
                </linearGradient>
                <linearGradient id="rootGlow" x1="0" y1="0" x2="0" y2={vineHeight} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#6A8A80" stopOpacity="0.8" />
                  <stop offset="28%" stopColor="#E8A0A8" stopOpacity="0.8" />
                  <stop offset="55%" stopColor="#E8C090" stopOpacity="0.8" />
                  <stop offset="78%" stopColor="#90C4B4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#C4A882" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Ghost dashed track */}
              <path d={pathData}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={isMobile ? 2 : 2.5}
                strokeLinecap="round" strokeDasharray="4 10" fill="none"
              />

              {/* Outer glow bloom */}
              <motion.path d={pathData}
                stroke="url(#rootGlow)"
                strokeWidth={isMobile ? 16 : 26}
                strokeLinecap="round" fill="none"
                style={{ pathLength: vineProgress, filter: 'blur(14px)', opacity: 0.25 }}
              />

              {/* Mid halo */}
              <motion.path d={pathData}
                stroke="url(#rootGlow)"
                strokeWidth={isMobile ? 7 : 11}
                strokeLinecap="round" fill="none"
                style={{ pathLength: vineProgress, filter: 'blur(4px)', opacity: 0.45 }}
              />

              {/* Crisp core */}
              <motion.path d={pathData}
                stroke="url(#rootGrad)"
                strokeWidth={isMobile ? 2 : 3}
                strokeLinecap="round" fill="none"
                style={{ pathLength: vineProgress }}
              />

              {/* Sprouts */}
              {sprouts.map((s, i) => (
                <Sprout key={i} {...s} progress={vineProgress} revealAt={s.at} />
              ))}

              {/* Nodes */}
              {nodes.map((n, i) => (
                <VineNode key={i} cx={n.cx} cy={n.cy} color={n.color} progress={vineProgress} revealAt={n.at} />
              ))}

              {/* Travelling orb */}
              <motion.circle
                r={isMobile ? 5 : 6.5}
                fill="#1E2622"
                stroke="url(#rootGrad)"
                strokeWidth={2.5}
                style={{
                  offsetPath: `path("${pathData}")`,
                  offsetDistance: useTransform(vineProgress, [0, 1], ['0%', '100%']),
                  filter: 'drop-shadow(0 0 10px rgba(144,196,180,0.9))',
                }}
              />
              <motion.circle
                r={isMobile ? 2 : 2.5}
                fill="#90C4B4"
                style={{
                  offsetPath: `path("${pathData}")`,
                  offsetDistance: useTransform(vineProgress, [0, 1], ['0%', '100%']),
                }}
              />
            </svg>
          </div>

          {/* Floating steps */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
            {steps.map((step, i) => (
              <FloatingStep
                key={step.title}
                step={step} index={i}
                isMobile={isMobile}
                vineProgress={vineProgress}
                spread={spread} padding={padding}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}