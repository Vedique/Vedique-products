import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Choose',
    description: 'Pick your favorite products from our freshmade collection.',
    detail: 'Freshly prepared',
    color: '#B76E79',
    lightColor: '#FDF6F5',
    gradient: 'linear-gradient(135deg, #B76E79 0%, #D4A5A9 100%)'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: 'Prepare',
    description: 'Each batch is made with care and attention.',
    detail: 'Small-batch production',
    color: '#E6B17E',
    lightColor: '#FEF7F0',
    gradient: 'linear-gradient(135deg, #E6B17E 0%, #F5CDA7 100%)'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2V7M12 2H9M12 2H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="4" y="7" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 12H16M8 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Pack',
    description: 'Carefully packed to maintain freshness and hygiene.',
    detail: 'Clean & secure packing',
    color: '#A7C7BC',
    lightColor: '#F4FAF7',
    gradient: 'linear-gradient(135deg, #A7C7BC 0%, #C9E0D9 100%)'
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9H21M7 13H11M13 13H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="2" y="9" width="20" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 19V21M8 19V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Deliver',
    description: 'Sent to you fresh and ready to enjoy.',
    detail: 'Made with care',
    color: '#C5A48A',
    lightColor: '#FCF7F2',
    gradient: 'linear-gradient(135deg, #C5A48A 0%, #E0C8B8 100%)'
  }
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section 
      ref={sectionRef} 
      style={{
        padding: isMobile ? '40px 16px' : isTablet ? '60px 24px' : '80px 32px',
        background: '#FDFBF9',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
        background: 'radial-gradient(circle at 50% 0%, rgba(230, 177, 126, 0.03) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ 
            textAlign: 'center', 
            marginBottom: isMobile ? '30px' : isTablet ? '40px' : '56px'
          }}
        >
          <span style={{
            fontSize: isMobile ? '0.7rem' : isTablet ? '0.75rem' : '0.8rem',
            letterSpacing: '0.2em',
            color: '#B29A8A',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: isMobile ? '8px' : '12px',
            fontWeight: 400
          }}>
            how we do it
          </span>
          
          <h2 style={{
            fontSize: isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.8rem',
            fontWeight: 350,
            color: '#2E2E2E',
            margin: '0 0 10px',
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            lineHeight: 1.2
          }}>
            Made{' '}
            <span style={{ 
              color: '#B76E79',
              fontStyle: 'italic',
              fontWeight: 340
            }}>
              with care
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: isMobile ? '0.85rem' : isTablet ? '0.9rem' : '1rem',
              color: '#6F6F6F',
              maxWidth: isMobile ? '280px' : '520px',
              margin: '0 auto',
              fontWeight: 300,
              lineHeight: 1.6,
              padding: isMobile ? '0 10px' : 0
            }}
          >
            Simple steps, honest work — from our kitchen to yours.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : (isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)'),
            gap: isMobile ? '12px' : (isTablet ? '16px' : '20px'),
            marginBottom: isMobile ? '32px' : (isTablet ? '48px' : '64px')
          }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              style={{
                background: step.lightColor,
                padding: isMobile ? '16px 14px' : (isTablet ? '20px 16px' : '24px 20px'),
                borderRadius: '20px',
                border: '1px solid rgba(0, 0, 0, 0.02)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                transition: 'box-shadow 0.2s ease',
                position: 'relative'
              }}
              onHoverStart={(e) => {
                e.currentTarget.style.boxShadow = `0 12px 20px -12px ${step.color}60`;
              }}
              onHoverEnd={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.02)';
              }}
            >
              <div style={{
                width: isMobile ? '48px' : (isTablet ? '56px' : '64px'),
                height: isMobile ? '48px' : (isTablet ? '56px' : '64px'),
                background: step.gradient,
                borderRadius: isMobile ? '14px' : (isTablet ? '16px' : '18px'),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: isMobile ? '12px' : (isTablet ? '16px' : '20px'),
                color: '#FFFFFF',
                boxShadow: `0 6px 12px -6px ${step.color}`,
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                {React.cloneElement(step.icon, { width: isMobile ? 20 : 24, height: isMobile ? 20 : 24 })}
              </div>

              <h3 style={{
                fontSize: isMobile ? '1.2rem' : (isTablet ? '1.4rem' : '1.5rem'),
                fontWeight: 430,
                color: '#2C2C2C',
                margin: '0 0 4px',
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                letterSpacing: '-0.01em'
              }}>
                {step.title}
              </h3>

              <p style={{
                fontSize: isMobile ? '0.8rem' : (isTablet ? '0.85rem' : '0.9rem'),
                color: '#5A5A5A',
                margin: '0 0 12px',
                lineHeight: 1.5,
                fontWeight: 350,
                opacity: 0.9
              }}>
                {step.description}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: isMobile ? '8px' : '12px',
                borderTop: `1px solid ${step.color}20`
              }}>
                <span style={{
                  fontSize: isMobile ? '0.7rem' : '0.75rem',
                  color: step.color,
                  fontWeight: 450,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase'
                }}>
                  {step.detail}
                </span>
                
                <div style={{
                  width: isMobile ? '20px' : '24px',
                  height: '1px',
                  background: `linear-gradient(90deg, ${step.color} 0%, transparent 100%)`
                }} />
              </div>

              <div style={{
                position: 'absolute',
                top: isMobile ? '12px' : '16px',
                right: isMobile ? '12px' : '16px',
                fontSize: isMobile ? '1.8rem' : (isTablet ? '2rem' : '2.2rem'),
                fontWeight: 300,
                color: `${step.color}15`,
                fontFamily: 'Cormorant Garamond, serif',
                lineHeight: 1
              }}>
                {(index + 1).toString().padStart(2, '0')}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '12px' : (isTablet ? '24px' : '36px'),
            padding: isMobile ? '16px 12px' : (isTablet ? '20px 16px' : '28px 24px'),
            background: '#FFFFFF',
            borderRadius: isMobile ? '20px' : '28px',
            boxShadow: '0 8px 20px -12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #F0E8E0',
            maxWidth: isMobile ? '90%' : '700px',
            margin: '0 auto',
            flexWrap: 'wrap'
          }}
        >
          {[
            { label: 'Made Fresh', color: '#B76E79' },
            { label: 'Carefully Selected Ingredients', color: '#E6B17E' },
            { label: 'Hygienic Packing', color: '#A7C7BC' }
          ].map((badge, index, array) => (
            <motion.div 
              key={badge.label}
              whileHover={{ y: -1 }}
              style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: isMobile ? '6px' : '10px'
              }}
            >
              <span style={{
                width: isMobile ? '4px' : '6px',
                height: isMobile ? '4px' : '6px',
                background: badge.color,
                borderRadius: '50%',
                opacity: 0.5
              }} />
              <span style={{
                fontSize: isMobile ? '0.75rem' : (isTablet ? '0.85rem' : '0.9rem'),
                color: '#4A4A4A',
                fontWeight: 380,
                letterSpacing: '0.01em',
                whiteSpace: isMobile ? 'normal' : 'nowrap',
                textAlign: 'center'
              }}>
                {badge.label}
              </span>
              {index < array.length - 1 && !isMobile && (
                <span style={{
                  width: '1px',
                  height: isTablet ? '16px' : '20px',
                  background: '#E0D9D2',
                  marginLeft: isTablet ? '8px' : '10px'
                }} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}