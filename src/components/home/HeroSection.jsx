// HeroSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const canvasRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const scrollToWatch = () => {
    const watchSection = document.getElementById('watch-section');
    watchSection?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    let animationFrameId;

    canvas.width = width;
    canvas.height = height;

    const particleCount = width < 768 ? 25 : 50;

    // Create floating particles (herbs, leaves, grains)
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 3 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.15;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.opacity = Math.random() * 0.2 + 0.05;
        this.shape = Math.random() > 0.6 ? 'leaf' : 'circle';
        this.color = `rgba(${Math.random() * 50 + 150}, ${Math.random() * 100 + 100}, ${Math.random() * 50 + 50}, ${this.opacity})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > width) this.speedX *= -1;
        if (this.y < 0 || this.y > height) this.speedY *= -1;
      }

      draw(ctx) {
        if (this.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
        } else {
          // Simple leaf shape
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.speedX * 5);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.quadraticCurveTo(this.size * 2, -this.size, 0, -this.size * 2);
          ctx.quadraticCurveTo(-this.size * 2, -this.size, 0, 0);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.restore();
        }
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      // Reinitialize particles for new size
      particles = [];
      const newParticleCount = width < 768 ? 25 : 50;
      for (let i = 0; i < newParticleCount; i++) {
        particles.push(new Particle());
      }
    };

    window.addEventListener('resize', handleResizeCanvas);

    return () => {
      window.removeEventListener('resize', handleResizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const scrollToProducts = () => {
    const productsSection = document.getElementById('featured-products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const styles = {
    section: {
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'radial-gradient(circle at 10% 20%, #1a3f2c, #0b2f1a 40%, #1e4d2e 70%, #2d5a3a)',
      paddingTop: isMobile ? '0px' : '80px',
    },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 2,
      pointerEvents: 'none'
    },
    gradientOverlay: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle at 80% 30%, rgba(255, 215, 150, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(160, 210, 120, 0.2) 0%, transparent 50%)',
      zIndex: 3
    },
    lightLeak: {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '30%',
      background: 'linear-gradient(180deg, rgba(255, 240, 200, 0.2) 0%, transparent 100%)',
      zIndex: 4
    },
    contentWrapper: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '1400px',
      width: '100%',
      padding: isMobile ? '0 20px' : '0 40px',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : (isTablet ? '1fr' : '1fr 1fr'),
      gap: isMobile ? '30px' : (isTablet ? '40px' : '60px'),
      alignItems: 'center'
    },
    leftContent: {
      color: '#fff',
      textAlign: isMobile ? 'center' : 'left'
    },
    title: {
      fontSize: isMobile ? 'clamp(2.2rem, 7vw, 2.8rem)' : 'clamp(3rem, 5vw, 4.5rem)',
      fontWeight: 300,
      lineHeight: 1.2,
      marginTop: isMobile ? '-6px' : '-10px',
      marginBottom: isMobile ? '15px' : '25px'
    },
    titleLine1: {
      display: 'block',
      fontWeight: 200,
      letterSpacing: '-0.02em'
    },
    titleLine2: {
      display: 'block',
      fontWeight: 600,
      background: 'linear-gradient(120deg, #ffffff, #ffd796, #b5e3a0)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontSize: isMobile ? 'clamp(2.5rem, 8vw, 3.2rem)' : 'clamp(3.5rem, 6vw, 5rem)',
      marginTop: isMobile ? '5px' : '10px'
    },
    description: {
      fontSize: isMobile ? '0.95rem' : '1.2rem',
      lineHeight: isMobile ? 1.5 : 1.8,
      marginBottom: isMobile ? '25px' : '40px',
      color: 'rgba(255, 255, 255, 0.8)',
      maxWidth: isMobile ? '100%' : '500px',
      marginLeft: isMobile ? 'auto' : '0',
      marginRight: isMobile ? 'auto' : '0',
      padding: isMobile ? '0 5px' : '0'
    },
    ctaContainer: {
      display: 'flex',
      gap: isMobile ? '12px' : '20px',
      marginBottom: isMobile ? '30px' : '50px',
      justifyContent: isMobile ? 'center' : 'flex-start',
      flexWrap: isMobile ? 'wrap' : 'nowrap'
    },
    primaryButton: {
      background: '#ffd796',
      border: 'none',
      color: '#0b2f1a',
      padding: isMobile ? '12px 24px' : '16px 40px',
      height: 'auto',
      fontSize: isMobile ? '0.85rem' : '1rem',
      fontWeight: 600,
      letterSpacing: '1px',
      borderRadius: '0',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      boxShadow: '0 10px 30px -5px rgba(255, 215, 150, 0.3)',
      flex: isMobile ? '1' : 'none',
      minWidth: isMobile ? '130px' : 'auto'
    },
    secondaryButton: {
      background: 'transparent',
      border: '1px solid rgba(255, 215, 150, 0.5)',
      color: '#ffffff',
      padding: isMobile ? '12px 24px' : '16px 40px',
      height: 'auto',
      fontSize: isMobile ? '0.85rem' : '1rem',
      fontWeight: 400,
      letterSpacing: '1px',
      borderRadius: '0',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      flex: isMobile ? '1' : 'none',
      minWidth: isMobile ? '130px' : 'auto'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: isMobile ? '10px' : '30px',
      maxWidth: isMobile ? '100%' : 'none'
    },
    statItem: {
      borderLeft: '2px solid rgba(255, 215, 150, 0.3)',
      paddingLeft: isMobile ? '8px' : '20px',
      textAlign: 'left'
    },
    statNumber: {
      fontSize: isMobile ? '.8rem' : '1rem',
      fontWeight: 600,
      color: '#ffd796',
      marginBottom: '3px'
    },
    statLabel: {
      fontSize: isMobile ? '0.65rem' : '0.9rem',
      color: 'rgba(255, 255, 255, 0.7)',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      lineHeight: isMobile ? 1.2 : 1.5
    },
    rightContent: {
      position: 'relative',
      height: isMobile ? '0' : (isTablet ? '400px' : '600px'),
      display: isMobile ? 'none' : 'block'
    },
    showcaseCard: {
      position: 'absolute',
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 215, 150, 0.15)',
      borderRadius: '20px',
      padding: isTablet ? '15px' : '25px',
      width: isTablet ? '180px' : '250px',
      boxShadow: '0 30px 50px -20px rgba(0, 0, 0, 0.5)'
    },
    card1: {
      top: isTablet ? '10%' : '20%',
      right: isTablet ? '0%' : '5%',
      transform: 'rotate(5deg)',
      animation: 'floatCard1 8s infinite ease-in-out'
    },
    card2: {
      bottom: isTablet ? '10%' : '15%',
      left: isTablet ? '0%' : '5%',
      transform: 'rotate(-8deg)',
      animation: 'floatCard2 10s infinite ease-in-out'
    },
    card3: {
      top: isTablet ? '30%' : '35%',
      left: isTablet ? '15%' : '20%',
      transform: 'rotate(3deg)',
      animation: 'floatCard3 7s infinite ease-in-out'
    },
    cardImage: {
      width: '100%',
      height: isTablet ? '100px' : '140px',
      background: 'linear-gradient(135deg, #2d5a3a, #1e4d2e)',
      borderRadius: '12px',
      marginBottom: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isTablet ? '2rem' : '2.5rem'
    },
    cardTitle: {
      fontSize: isTablet ? '0.9rem' : '1.1rem',
      fontWeight: 500,
      color: '#ffd796',
      marginBottom: '4px'
    },
    cardSubtitle: {
      fontSize: isTablet ? '0.7rem' : '0.85rem',
      color: 'rgba(255, 255, 255, 0.6)'
    },
    scrollIndicator: {
      position: 'absolute',
      bottom: isMobile ? '10px' : '30px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      display: isMobile ? 'none' : 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '0.8rem',
      letterSpacing: '2px',
      textTransform: 'uppercase'
    },
    scrollLine: {
      width: '1px',
      height: isMobile ? '30px' : '50px',
      background: 'linear-gradient(180deg, #ffd796 0%, transparent 100%)',
      animation: 'scrollPulse 2s infinite'
    },
    mobileCards: {
      display: isMobile ? 'grid' : 'none',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '8px',
      marginTop: '25px'
    },
    mobileCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 215, 150, 0.15)',
      borderRadius: '12px',
      padding: '12px 5px',
      textAlign: 'center'
    },
    mobileCardEmoji: {
      fontSize: '1.8rem',
      marginBottom: '4px'
    },
    mobileCardTitle: {
      fontSize: '0.75rem',
      color: '#ffd796',
      fontWeight: 500,
      marginBottom: '2px'
    },
    mobileCardSubtitle: {
      fontSize: '0.6rem',
      color: 'rgba(255, 255, 255, 0.5)'
    }
  };

  const keyframes = `
    @keyframes floatCard1 {
      0%, 100% { transform: translateY(0) rotate(5deg); }
      50% { transform: translateY(-15px) rotate(3deg); }
    }
    @keyframes floatCard2 {
      0%, 100% { transform: translateY(0) rotate(-8deg); }
      50% { transform: translateY(15px) rotate(-10deg); }
    }
    @keyframes floatCard3 {
      0%, 100% { transform: translateY(0) rotate(3deg); }
      50% { transform: translateY(-10px) rotate(5deg); }
    }
    @keyframes scrollPulse {
      0%, 100% { opacity: 0.3; transform: scaleY(0.5); }
      50% { opacity: 1; transform: scaleY(1); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <section style={styles.section}>
        <canvas ref={canvasRef} style={styles.canvas} />
        <div style={styles.gradientOverlay} />
        <div style={styles.lightLeak} />

        <div style={styles.contentWrapper}>
          <motion.div
            style={styles.leftContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 style={styles.title}>
              <span style={styles.titleLine1}>Raw</span>
              <span style={styles.titleLine2}>Earth Made</span>
            </h1>

            <p style={styles.description}>
              {isMobile
                ? "Experience real homemade flavors, crafted in small batches and made fresh without the extra hype"
                : "Experience real homemade flavors, crafted in small batches and made fresh without the extra hype"}
            </p>

            <div style={styles.ctaContainer}>
              <Button
                size="large"
                onClick={scrollToProducts}
                style={styles.primaryButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#ffe4b5';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 15px 35px -5px #ffd796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#ffd796';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(255, 215, 150, 0.3)';
                }}
              >
                {isMobile ? 'Shop Now' : 'Explore Collection'}
              </Button>

              <Button
                size="large"
                onClick={scrollToWatch} // Add this line
                style={styles.secondaryButton}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 215, 150, 0.1)';
                  e.currentTarget.style.borderColor = '#ffd796';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 150, 0.5)';
                }}
              >
                {isMobile ? 'Watch' : 'Watch Video'}
              </Button>
            </div>

            <div style={styles.statsGrid}>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>No Factory Vibes</div>
                <div style={styles.statLabel}>{isMobile ? 'Farms' : 'Big Flavor Mood'}</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>No Fake Claims</div>
                <div style={styles.statLabel}>{isMobile ? 'Products' : 'Just Real Effort'}</div>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statNumber}>Zero Shortcuts</div>
                <div style={styles.statLabel}>{isMobile ? 'Families' : 'Just Made Fresh'}</div>
              </div>
            </div>

            {/* Mobile Product Cards */}
            <div style={styles.mobileCards}>
              <div style={styles.mobileCard}>
                <div style={styles.mobileCardEmoji}></div>
                <div style={styles.mobileCardTitle}>Natural sweet and taste</div>
                {/* <div style={styles.mobileCardSubtitle}>Healthy fats</div> */}
              </div>
              <div style={styles.mobileCard}>
                <div style={styles.mobileCardEmoji}></div>
                <div style={styles.mobileCardTitle}>Fresh and full of flavor</div>
                {/* <div style={styles.mobileCardSubtitle}>Antioxidants</div> */}
              </div>
              <div style={styles.mobileCard}>
                <div style={styles.mobileCardEmoji}></div>
                <div style={styles.mobileCardTitle}>Rich and wholesome</div>
                {/* <div style={styles.mobileCardSubtitle}>Farm-fresh</div> */}
              </div>
            </div>
          </motion.div>

          <motion.div
            style={styles.rightContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ ...styles.showcaseCard, ...styles.card1 }}>
              <div style={styles.cardImage}></div>
              {/* <div style={styles.cardTitle}>Fresh Avocados</div> */}
              <div style={styles.cardSubtitle}>Natural sweet and taste</div>
            </div>

            <div style={{ ...styles.showcaseCard, ...styles.card2 }}>
              <div style={styles.cardImage}></div>
              {/* <div style={styles.cardTitle}>Organic Berries</div> */}
              <div style={styles.cardSubtitle}>Fresh and full of flavor</div>
            </div>

            <div style={{ ...styles.showcaseCard, ...styles.card3 }}>
              <div style={styles.cardImage}></div>
              {/* <div style={styles.cardTitle}>Kale & Greens</div> */}
              <div style={styles.cardSubtitle}>Rich and wholesome</div>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={styles.scrollIndicator}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Scroll</span>
          <div style={styles.scrollLine} />
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;
