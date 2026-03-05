import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

const steps = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Choose',
    description: 'Pick your favorites from our artisan collection.',
    detail: 'Step 01',
    color: '#B76E79',
    gradient: 'linear-gradient(135deg, #B76E79 0%, #D4A5A9 100%)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Prepare',
    description: 'Freshly made with ancient wisdom & soul.',
    detail: 'Step 02',
    color: '#E6B17E',
    gradient: 'linear-gradient(135deg, #E6B17E 0%, #F5CDA7 100%)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V7M12 2H9M12 2H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="4" y="7" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 12H16M8 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Pack',
    description: 'Eco-conscious wrap for peak hygiene.',
    detail: 'Step 03',
    color: '#8A9E96',
    gradient: 'linear-gradient(135deg, #8A9E96 0%, #AEC2B9 100%)',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9H21M7 13H11M13 13H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="2" y="9" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M16 19V21M8 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Deliver',
    description: 'Straight to you, fresh and full of life.',
    detail: 'Step 04',
    color: '#C5A48A',
    gradient: 'linear-gradient(135deg, #C5A48A 0%, #E0C8B8 100%)',
  }
];

const BloomingCard = ({ step, index, isMobile, containerScrollY, spread, padding }) => {
  const ref = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [isFlipped, setIsFlipped] = useState(false);

  // Maintain magnetic hover for desktop
  const springRotateX = useSpring(useTransform(mouseY, [-200, 200], [10, -10]), { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), { stiffness: 100, damping: 30 });

  function handleMouse(e) {
    if (!ref.current || isMobile) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const bloomStart = 0.05 + (index * 0.25);
  const bloomEnd = bloomStart + 0.1;

  const opacity = useTransform(containerScrollY, [bloomStart, bloomEnd], [0, 1]);
  const scale = useTransform(containerScrollY, [bloomStart, bloomEnd], [0.5, 1]);
  const yOffset = useTransform(containerScrollY, [bloomStart, bloomEnd], [50, 0]);

  const isLeft = index % 2 === 0;
  const topPercentages = [12.5, 37.5, 62.5, 87.5];

  return (
    <div
      style={{
        position: 'absolute',
        top: `${topPercentages[index]}%`,
        transform: 'translateY(-50%)',
        width: isMobile ? `calc(50vw - ${(spread + padding) - 10}px)` : '300px',
        left: isLeft ? 'auto' : `calc(50% + ${spread + padding}px)`,
        right: isLeft ? `calc(50% + ${spread + padding}px)` : 'auto',
        zIndex: 5,
        perspective: '1000px' // For 3D Flip
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        animate={{
          rotateY: isFlipped ? 180 : 0
        }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        style={{
          opacity,
          scale,
          y: yOffset,
          width: '100%',
          height: isMobile ? '135px' : '220px',
          rotateX: isMobile ? 0 : springRotateX,
          // If desktop, apply magnetic Y unless flipped
          rotateZ: 0, // Prevent weird axis flipping when combining Y arrays
          transformStyle: 'preserve-3d',
          cursor: 'pointer',
          position: 'relative'
        }}
        whileHover={{ scale: 1.05 }}
      >
        {/* FRONT FACE */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          padding: isMobile ? '16px 12px' : '30px',
          background: 'rgba(255, 255, 255, 0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: isMobile ? '16px' : '24px',
          border: '1px solid rgba(255, 255, 255, 0.9)',
          boxShadow: `0 15px 35px -10px ${step.color}30`,
          textAlign: isMobile ? 'center' : (isLeft ? 'right' : 'left'),
          display: 'flex',
          flexDirection: 'column',
          alignItems: isMobile ? 'center' : (isLeft ? 'flex-end' : 'flex-start'),
          justifyContent: 'center'
        }}>
          <div style={{
            width: isMobile ? '36px' : '44px',
            height: isMobile ? '36px' : '44px',
            background: step.gradient,
            borderRadius: isMobile ? '10px' : '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: isMobile ? '8px' : '15px',
            color: '#FFF',
            boxShadow: `0 8px 20px -5px ${step.color}80`
          }}>
            {React.cloneElement(step.icon, { width: isMobile ? 18 : 22, height: isMobile ? 18 : 22 })}
          </div>

          <span style={{
            fontSize: isMobile ? '0.55rem' : '0.65rem',
            letterSpacing: '0.2em',
            color: step.color,
            fontWeight: 800,
            display: 'block',
            marginBottom: '4px'
          }}>
            {step.detail}
          </span>

          <h3 style={{
            fontSize: isMobile ? '1.3rem' : '2rem',
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 300,
            margin: 0,
            color: '#1A1A1A',
            lineHeight: 1.1
          }}>
            {step.title}
          </h3>

          {!isMobile && (
            <p style={{
              fontSize: '0.9rem',
              color: '#555',
              lineHeight: 1.5,
              margin: '10px 0 0 0',
              fontWeight: 300
            }}>
              {step.description}
            </p>
          )}

          {/* Flying "Tap Me" Message */}
          {!isFlipped && (
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              style={{
                position: 'absolute',
                bottom: isMobile ? '-14px' : '-16px',
                right: isLeft || isMobile ? 'auto' : '20px',
                left: isMobile ? '50%' : (isLeft ? '20px' : 'auto'),
                transform: isMobile ? 'translateX(-50%)' : 'none',
                background: step.color,
                color: 'white',
                padding: isMobile ? '2px 8px' : '4px 12px',
                borderRadius: '20px',
                fontSize: isMobile ? '0.5rem' : '0.65rem',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                boxShadow: `0 4px 10px ${step.color}60`,
                letterSpacing: '0.5px'
              }}
            >
              Tap to read ✨
            </motion.div>
          )}
        </div>

        {/* BACK FACE */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)', // Flips it natively
          padding: isMobile ? '16px' : '30px',
          background: step.gradient,
          borderRadius: isMobile ? '16px' : '24px',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          boxShadow: `0 15px 35px -10px ${step.color}60`,
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: isMobile ? '1.1rem' : '1.5rem', fontFamily: 'Cormorant Garamond, serif' }}>
            {step.title}
          </h4>
          <p style={{
            fontSize: isMobile ? '0.75rem' : '1rem',
            lineHeight: 1.6,
            margin: 0,
            opacity: 0.9,
            fontWeight: 300
          }}>
            {step.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end end"]
  });

  const vineProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 25 });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Use a precise matching height mapped to the space taken by the 4 cards.
  const vineHeight = isMobile ? 800 : 1200;

  // The mathematical spread exactly touches the boundary of the cards.
  // We INCREASED spread on Mobile (from 20 to 38) to make it dramatically more curved!
  const spread = isMobile ? 38 : 80;
  const padding = isMobile ? 4 : 20;

  const pathData = `
    M 0 0 
    C 0 ${vineHeight * 0.05}, -${spread} ${vineHeight * 0.05}, -${spread} ${vineHeight * 0.125}
    C -${spread} ${vineHeight * 0.25}, ${spread} ${vineHeight * 0.25}, ${spread} ${vineHeight * 0.375}
    C ${spread}  ${vineHeight * 0.50}, -${spread} ${vineHeight * 0.50}, -${spread} ${vineHeight * 0.625}
    C -${spread} ${vineHeight * 0.75}, ${spread} ${vineHeight * 0.75}, ${spread} ${vineHeight * 0.875}
  `;

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#FAF8F6',
        position: 'relative',
        overflow: 'hidden',
        padding: isMobile ? '80px 0 80px 0' : '100px 0 120px 0',
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '0%', left: '-10%', width: '100vw', height: '100vw',
          background: 'radial-gradient(circle, rgba(138, 158, 150, 0.05) 0%, transparent 60%)',
          y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]),
          pointerEvents: 'none', zIndex: 0
        }}
      />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 5, padding: '0 10px' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '60px' : '100px' }}
        >
          <span style={{ fontSize: '0.75rem', letterSpacing: '0.4em', color: '#8A9E96', textTransform: 'uppercase', display: 'block', marginBottom: '10px', fontWeight: 600 }}>
            the root of it all
          </span>
          <h2 style={{ fontSize: isMobile ? '2.5rem' : '4rem', fontFamily: 'Cormorant Garamond, serif', fontWeight: 200, color: '#1A1A1A', lineHeight: 1 }}>
            Grows with <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#8A9E96' }}>Nature</span>
          </h2>
        </motion.div>

        {/* The Exact Container mapping height to vineHeight */}
        <div style={{ position: 'relative', width: '100%', height: `${vineHeight}px` }}>

          <div style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            height: `${vineHeight}px`,
            width: '4px',
            zIndex: 1,
            pointerEvents: 'none',
            transform: 'translateX(-50%)'
          }}>
            <svg
              width={spread * 3}
              height={vineHeight}
              viewBox={`${-spread * 1.5} 0 ${spread * 3} ${vineHeight}`}
              style={{ overflow: 'visible', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}
            >
              <path
                d={pathData}
                stroke="rgba(138, 158, 150, 0.15)"
                strokeWidth={isMobile ? "2" : "4"}
                strokeLinecap="round"
                strokeDasharray="4 8"
                fill="none"
              />
              <motion.path
                d={pathData}
                stroke="url(#vineGradient)"
                strokeWidth={isMobile ? "4" : "6"}
                strokeLinecap="round"
                fill="none"
                style={{ pathLength: vineProgress }}
              />
              <motion.path
                d={pathData}
                stroke="rgba(138, 158, 150, 0.4)"
                strokeWidth={isMobile ? "8" : "12"}
                strokeLinecap="round"
                fill="none"
                style={{ pathLength: vineProgress, filter: 'blur(6px)' }}
              />
              <motion.circle
                r={isMobile ? "4" : "6"}
                fill="#8A9E96"
                stroke="#FFFFFF"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(138, 158, 150, 0.8))',
                  offsetPath: `path("${pathData}")`,
                }}
                animate={{
                  offsetDistance: useTransform(vineProgress, [0, 1], ["0%", "100%"]),
                }}
              />
              <defs>
                <linearGradient id="vineGradient" x1="0" y1="0" x2="0" y2={vineHeight} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8A9E96" />
                  <stop offset="33%" stopColor="#B76E79" />
                  <stop offset="66%" stopColor="#E6B17E" />
                  <stop offset="100%" stopColor="#C5A48A" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 10, top: 0, left: 0 }}>
            {steps.map((step, index) => (
              <BloomingCard
                key={step.title}
                step={step}
                index={index}
                isMobile={isMobile}
                containerScrollY={vineProgress}
                spread={spread}
                padding={padding}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}