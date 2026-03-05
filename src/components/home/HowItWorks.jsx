import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

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
    description: 'Pick your favorite products from our freshmade collection.',
    detail: 'Curated selection',
    color: '#B76E79',
    gradient: 'linear-gradient(135deg, #B76E79 0%, #D4A5A9 100%)'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Prepare',
    description: 'Each batch is made with care and attention by our artisans.',
    detail: 'Small-batch magic',
    color: '#E6B17E',
    gradient: 'linear-gradient(135deg, #E6B17E 0%, #F5CDA7 100%)'
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
    description: 'Carefully packed to maintain freshness and peak hygiene.',
    detail: 'Eco-conscious wrap',
    color: '#8A9E96',
    gradient: 'linear-gradient(135deg, #8A9E96 0%, #AEC2B9 100%)'
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
    description: 'Sent to you fresh and ready to spark some joy in your day.',
    detail: 'Speedy arrival',
    color: '#C5A48A',
    gradient: 'linear-gradient(135deg, #C5A48A 0%, #E0C8B8 100%)'
  }
];

const Connector = ({ isLast, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const pathLength = useSpring(useTransform(scrollYProgress, [0.4, 0.6], [0, 1]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (isLast) return null;

  return (
    <div ref={ref} style={{
      position: 'absolute',
      left: '50%',
      top: '100%',
      height: '120px',
      width: '2px',
      transform: 'translateX(-50%)',
      zIndex: 1
    }}>
      <svg width="20" height="120" viewBox="0 0 20 120" fill="none" style={{ overflow: 'visible' }}>
        <motion.path
          d="M10 0V120"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="6 6"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="10" y1="0" x2="10" y2="120" gradientUnits="userSpaceOnUse">
            <stop stopColor={steps[index].color} />
            <stop offset="1" stopColor={steps[index + 1].color} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const StepCard = ({ step, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '80px 0',
        width: '100%',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
        whileHover={{ y: -10 }}
        style={{
          width: 'clamp(300px, 85vw, 500px)',
          padding: '48px',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: '40px',
          border: '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          cursor: 'default',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Step Number Background */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '20px',
          fontSize: '8rem',
          fontWeight: 900,
          color: `${step.color}08`,
          fontFamily: 'Inter, sans-serif',
          lineHeight: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: -1
        }}>
          {`0${index + 1}`}
        </div>

        <motion.div
          animate={isInView ? {
            y: [0, -12, 0],
            rotate: [0, 8, 0, -8, 0]
          } : {}}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: '90px',
            height: '90px',
            background: step.gradient,
            borderRadius: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            color: '#FFFFFF',
            boxShadow: `0 20px 40px -10px ${step.color}60`,
          }}
        >
          {step.icon}
        </motion.div>

        <span style={{
          fontSize: '0.7rem',
          letterSpacing: '0.4em',
          color: step.color,
          textTransform: 'uppercase',
          fontWeight: 700,
          marginBottom: '12px',
          opacity: 0.8
        }}>
          {step.detail}
        </span>

        <h3 style={{
          fontSize: '2.8rem',
          fontWeight: 300,
          color: '#1A1A1A',
          margin: '0 0 20px',
          fontFamily: 'Cormorant Garamond, serif',
          lineHeight: 1
        }}>
          {step.title}
        </h3>

        <p style={{
          fontSize: '1.05rem',
          color: '#555',
          lineHeight: 1.7,
          fontWeight: 300,
          maxWidth: '340px',
          margin: 0
        }}>
          {step.description}
        </p>

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '60px' }}
          style={{
            height: '2px',
            background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
            marginTop: '24px',
            borderRadius: '2px'
          }}
        />
      </motion.div>

      <Connector isLast={isLast} index={index} />
    </div>
  );
};

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const rotateBG = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#FAF8F6',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 24px'
      }}
    >
      {/* Gen Z Aesthetic Background Shapes */}
      <motion.div
        style={{
          position: 'absolute',
          top: '5%',
          left: '-10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, rgba(183, 110, 121, 0.08) 0%, transparent 70%)',
          y: backgroundY,
          rotate: rotateBG,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <motion.div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-10%',
          width: '70vw',
          height: '70vw',
          background: 'radial-gradient(circle, rgba(198, 169, 105, 0.08) 0%, transparent 70%)',
          y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]),
          rotate: useTransform(scrollYProgress, [0, 1], [0, -45]),
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: 'center',
            marginBottom: '120px'
          }}
        >
          <span style={{
            fontSize: '0.85rem',
            letterSpacing: '0.5em',
            color: '#B29A8A',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '20px',
            fontWeight: 600
          }}>
            OUR VIBE & PROCESS
          </span>

          <h2 style={{
            fontSize: 'clamp(3rem, 10vw, 6rem)',
            fontWeight: 200,
            color: '#1A1A1A',
            margin: '0',
            fontFamily: 'Cormorant Garamond, serif',
            lineHeight: 1,
            letterSpacing: '-0.02em'
          }}>
            Crafted <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#B76E79' }}>with Soul</span>
          </h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              fontSize: '1.2rem',
              color: '#666',
              marginTop: '24px',
              fontWeight: 300,
              maxWidth: '600px',
              margin: '24px auto 0'
            }}
          >
            The intersection of ancient wisdom and modern aesthetic.
            No filters, just pure process.
          </motion.p>
        </motion.div>

        {/* Storytelling List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px'
        }}>
          {steps.map((step, index) => (
            <StepCard
              key={step.title}
              step={step}
              index={index}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        {/* Floating Interactive Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            marginTop: '150px',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: '0 30px 60px -15px rgba(0,0,0,0.1)'
            }}
            style={{
              padding: '32px 64px',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderRadius: '100px',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', gap: '12px' }}>
              {steps.map(s => (
                <motion.div
                  key={s.color}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: steps.indexOf(s) * 0.5
                  }}
                  style={{ width: '10px', height: '10px', borderRadius: '50%', background: s.color }}
                />
              ))}
            </div>
            <span style={{
              fontSize: '1rem',
              fontWeight: 500,
              color: '#1A1A1A',
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}>
              Pure. Honest. Vedique.
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}