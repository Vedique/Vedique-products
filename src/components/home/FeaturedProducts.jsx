import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../products/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const featuredProduct = products[activeIndex];

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex(prev => prev === 0 ? products.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex(prev => prev === products.length - 1 ? 0 : prev + 1);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 14
      }
    }
  };

  const cardVariants = {
    enter: direction => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: direction => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
      }
    })
  };

  const floatingElements = [
    { icon: '🌿', style: { top: '12%', left: '5%' } },
    { icon: '🍃', style: { bottom: '15%', right: '3%' } },
    { icon: '🌱', style: { top: '30%', right: '8%' } },
    { icon: '🍂', style: { bottom: '25%', left: '7%' } },
    { icon: '🌻', style: { top: '60%', left: '12%' } },
    { icon: '🍎', style: { bottom: '40%', right: '10%' } },
  ];

  const keyframes = `
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(5deg); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes softPulse {
      0%, 100% { box-shadow: 0 15px 35px -12px rgba(184, 134, 11, 0.2); }
      50% { box-shadow: 0 25px 45px -12px rgba(184, 134, 11, 0.3); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <motion.section
        id="featured-products"
        className="section-padding"
        style={{
          position: 'relative',
          background: 'linear-gradient(145deg, #fcf9f5 0%, #f9f4ec 40%, #f4ede3 100%)',
          overflow: 'hidden',
          minHeight: isMobile ? 'auto' : '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '1.6rem 0' : '2rem 0'
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: "-50px" }}
        variants={containerVariants}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 215, 150, 0.08) 0%, transparent 30%),
            radial-gradient(circle at 80% 70%, rgba(160, 210, 120, 0.08) 0%, transparent 30%),
            repeating-linear-gradient(45deg, rgba(184, 134, 11, 0.02) 0px, rgba(184, 134, 11, 0.02) 2px, transparent 2px, transparent 8px)
          `,
          pointerEvents: 'none'
        }} />

        {floatingElements.map((el, idx) => (
          <motion.div
            key={idx}
            style={{
              position: 'absolute',
              fontSize: isMobile ? '1.76rem' : '3.2rem',
              opacity: 0.12,
              pointerEvents: 'none',
              zIndex: 1,
              filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.05))',
              ...el.style
            }}
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
            transition={{
              duration: 8 + idx * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.5
            }}
          >
            {el.icon}
          </motion.div>
        ))}

        <div className="container-custom" style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: isMobile ? '0.4rem 1.2rem' : '1rem 2.5rem'
        }}>
          <motion.div
            variants={itemVariants}
            style={{
              textAlign: 'center',
              marginBottom: isMobile ? '0.8rem' : '1.5rem',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}
          >
            <motion.div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.3rem 1.5rem',
                background: 'rgba(184, 134, 11, 0.06)',
                borderRadius: '50px',
                color: '#b8860b',
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '2px',
                marginBottom: '0.6rem',
                border: '1px solid rgba(184, 134, 11, 0.15)',
                backdropFilter: 'blur(8px)',
                textTransform: 'uppercase',
                boxShadow: '0 4px 20px rgba(184, 134, 11, 0.05)'
              }}
              whileHover={{
                scale: 1.03,
                background: 'rgba(184, 134, 11, 0.1)',
                borderColor: 'rgba(184, 134, 11, 0.25)'
              }}
            >
              <span style={{ fontSize: '1rem' }}>🌱</span>
              Farm Selection
            </motion.div>

            <motion.h2
              style={{
                fontSize: isMobile ? '1.6rem' : '3rem',
                fontWeight: 300,
                marginBottom: '0.4rem',
                lineHeight: 1.1,
                textAlign: 'center',
                letterSpacing: '-0.02em'
              }}
              variants={itemVariants}
            >
              <span style={{ color: '#2c5f2d' }}>Featured </span>
              <span style={{
                background: 'linear-gradient(145deg, #b8860b 0%, #daa520 40%, #c68b17 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontWeight: 400,
                fontSize: isMobile ? '1.8rem' : '3.4rem',
                display: 'inline-block'
              }}>
                Harvest
              </span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              style={{
                color: '#5c5c5c',
                maxWidth: '600px',
                margin: '0.6rem auto 0',
                fontSize: isMobile ? '0.75rem' : '1rem',
                lineHeight: 1.5,
                fontWeight: 300,
                fontStyle: 'italic',
                borderLeft: '3px solid rgba(184, 134, 11, 0.2)',
                paddingLeft: '1.2rem'
              }}
            >
              "Each week we spotlight our finest organic produce,
              harvested at peak perfection from local family farms."
            </motion.p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: isMobile ? '0.3rem' : '1rem',
              margin: '0 auto',
              width: '100%',
              position: 'relative'
            }}
          >
            {products.length > 1 && !isMobile && (
              <motion.button
                onClick={handlePrev}
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(184, 134, 11, 0.25)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#b8860b',
                  fontSize: '1rem',
                  flexShrink: 0,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.2s ease',
                  zIndex: 10
                }}
                whileHover={{
                  scale: 1.12,
                  background: '#ffffff',
                  boxShadow: '0 12px 28px rgba(184,134,11,0.2)',
                  borderColor: 'rgba(184, 134, 11, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <LeftOutlined />
              </motion.button>
            )}

            <div style={{
              flex: 1,
              maxWidth: isMobile ? '100%' : '650px',
              position: 'relative',
              minHeight: isMobile ? 'auto' : '420px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={cardVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag={isMobile ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = Math.abs(offset.x) * velocity.x;
                    if (swipe < -5000 || offset.x < -60) handleNext();
                    else if (swipe > 5000 || offset.x > 60) handlePrev();
                  }}
                  style={{
                    width: '100%',
                    position: 'relative',
                    zIndex: 5,
                    cursor: isMobile ? 'grab' : 'pointer',
                    touchAction: 'pan-y'
                  }}
                  whileHover={!isMobile ? {
                    y: -6,
                    transition: { type: "spring", stiffness: 250, damping: 20 }
                  } : {}}
                  onClick={() => navigate(`/product/${featuredProduct.slug}`)}
                >
                  <div style={{
                    width: '100%',
                    margin: isMobile ? '0.3rem 0' : '0.5rem 0',
                    filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.08))',
                    animation: 'softPulse 4s ease-in-out infinite',
                    transform: 'translateZ(0)'
                  }}>
                    <ProductCard
                      product={featuredProduct}
                      index={0}
                      compact
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {products.length > 1 && !isMobile && (
              <motion.button
                onClick={handleNext}
                style={{
                  background: 'rgba(255,255,255,0.9)',
                  border: '1px solid rgba(184, 134, 11, 0.25)',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#b8860b',
                  fontSize: '1rem',
                  flexShrink: 0,
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.2s ease',
                  zIndex: 10
                }}
                whileHover={{
                  scale: 1.12,
                  background: '#ffffff',
                  boxShadow: '0 12px 28px rgba(184,134,11,0.2)',
                  borderColor: 'rgba(184, 134, 11, 0.4)'
                }}
                whileTap={{ scale: 0.95 }}
              >
                <RightOutlined />
              </motion.button>
            )}
          </motion.div>

          {products.length > 1 && (
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.3rem',
                marginTop: '1rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                {products.map((_, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > activeIndex ? 1 : -1);
                      setActiveIndex(idx);
                    }}
                    style={{
                      width: idx === activeIndex ? '28px' : '8px',
                      height: '8px',
                      borderRadius: idx === activeIndex ? '20px' : '50%',
                      background: idx === activeIndex
                        ? 'linear-gradient(90deg, #b8860b, #daa520)'
                        : 'rgba(184, 134, 11, 0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0
                    }}
                    whileHover={{
                      scale: 1.2,
                      background: idx === activeIndex ? '#daa520' : 'rgba(184, 134, 11, 0.3)'
                    }}
                  />
                ))}
              </div>
              {isMobile && (
                <p style={{
                  fontSize: '0.65rem',
                  color: '#b8a898',
                  letterSpacing: '0.08em',
                  margin: 0,
                }}>
                  ← swipe to browse →
                </p>
              )}
            </motion.div>
          )}

          <motion.div
            variants={itemVariants}
            style={{
              textAlign: 'center',
              marginTop: isMobile ? '1.6rem' : '2rem'
            }}
          >
            <motion.button
              style={{
                background: 'linear-gradient(145deg, #2c5f2d 0%, #1e4d2e 100%)',
                color: 'white',
                padding: isMobile ? '0.6rem 1.6rem' : '0.9rem 3rem',
                fontSize: isMobile ? '0.7rem' : '0.95rem',
                fontWeight: 600,
                letterSpacing: '2px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '40px',
                boxShadow: '0 15px 25px -10px rgba(44, 95, 45, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              whileHover={{
                scale: 1.05,
                boxShadow: '0 20px 30px -10px rgba(44, 95, 45, 0.4)',
                background: 'linear-gradient(145deg, #2c5f2d 0%, #23633a 100%)'
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/products')}
            >
              <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                EXPLORE FULL COLLECTION
                <RightOutlined style={{ fontSize: '0.8rem' }} />
              </span>
              <motion.div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), transparent)',
                  transform: 'translateX(-100%)'
                }}
                animate={{ transform: ['translateX(-100%)', 'translateX(100%)'] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 0.8
                }}
              />
            </motion.button>

            <motion.div
              style={{
                marginTop: '1.2rem',
                display: 'flex',
                justifyContent: 'center',
                gap: isMobile ? '0.8rem' : '1.5rem',
                color: '#6b6b6b',
                fontSize: '0.8rem',
                letterSpacing: '0.5px',
                flexWrap: 'wrap'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {[
                // { icon: '✨', text: 'Free shipping over $50' },
                // { icon: '🌱', text: '100% Organic' },
                // { icon: '🚚', text: 'Same-day delivery' },
                // { icon: '⭐', text: '4.9/5 Rating' }
              ].map((item, idx) => (
                <motion.span
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    background: 'rgba(255,255,255,0.6)',
                    padding: '0.3rem 1rem',
                    borderRadius: '30px',
                    backdropFilter: 'blur(5px)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                  }}
                  whileHover={{ y: -2, background: 'white' }}
                >
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                  {item.text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '80px',
          background: 'linear-gradient(180deg, transparent, rgba(244, 237, 227, 0.7))',
          pointerEvents: 'none',
          zIndex: 1
        }} />
      </motion.section>
    </>
  );
};

export default FeaturedProducts;