import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import ProductCard from '../products/ProductCard';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

// Hardcoded complementary palettes for the dynamic background
// If a product doesn't have a specific color, we fallback to these artisan tones
const productPalettes = [
  ['#B76E79', '#D4A5A9'], // Rose Gold / Berry
  ['#8A9E96', '#AEC2B9'], // Sage Green
  ['#E6B17E', '#F5CDA7'], // Warm Amber
  ['#C5A48A', '#E0C8B8'], // Dusty Sand
  ['#B29A8A', '#D0C2B6']  // Muted Taupe
];

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Mouse parallax for the active card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const currentColors = productPalettes[activeIndex % productPalettes.length];
  const primaryColor = currentColors[0];
  const secondaryColor = currentColors[1];

  function handleMouseMove(e) {
    if (isMobile) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2; // -1 to 1
    const y = (clientY / innerHeight - 0.5) * 2; // -1 to 1
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        background: '#FAF8F6',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '80px 0' : '100px 0'
      }}
    >
      {/* --- Dynamic Immersive Background --- */}
      <AnimatePresence>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            zIndex: 0,
            pointerEvents: 'none'
          }}
        >
          {/* Main Blobs */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 90, 0],
              x: ['0%', '5%', '0%']
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: '-15%',
              left: '-10%',
              width: '60vw',
              height: '60vw',
              background: `radial-gradient(circle, ${primaryColor}15 0%, transparent 60%)`,
              filter: 'blur(60px)'
            }}
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, -90, 0],
              y: ['0%', '10%', '0%']
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              bottom: '-20%',
              right: '-10%',
              width: '70vw',
              height: '70vw',
              background: `radial-gradient(circle, ${secondaryColor}15 0%, transparent 60%)`,
              filter: 'blur(80px)'
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', padding: '0 20px' }}>

        {/* Gen Z Artisan Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: isMobile ? '60px' : '80px' }}
        >
          <motion.div
            animate={{ color: [primaryColor, secondaryColor, primaryColor] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              display: 'inline-block',
              padding: '6px 20px',
              border: `1px solid ${primaryColor}40`,
              borderRadius: '50px',
              fontSize: '0.75rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '20px',
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(10px)'
            }}
          >
            Curated For You
          </motion.div>
          <h2 style={{
            fontSize: isMobile ? '3rem' : '4.5rem',
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 200,
            color: '#1A1A1A',
            lineHeight: 1,
            margin: 0,
            letterSpacing: '-0.02em'
          }}>
            Featured <span style={{ fontStyle: 'italic', fontWeight: 300, color: primaryColor, transition: 'color 1.5s ease' }}>Harvest</span>
          </h2>
        </motion.div>

        {/* 3D Coverflow Carousel */}
        <div style={{
          position: 'relative',
          height: isMobile ? '450px' : '550px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          perspective: '1200px', // Crucial for 3D depth
          transformStyle: 'preserve-3d'
        }}>
          {products.map((product, index) => {
            // Calculate relative position (-2 to +2 in view)
            let offset = index - activeIndex;
            // Handle wrap-around for infinite feel (basic implementation)
            if (offset > products.length / 2) offset -= products.length;
            if (offset < -products.length / 2) offset += products.length;

            const MathAbsOffset = Math.abs(offset);
            const isActive = offset === 0;

            // Only render cards that are somewhat close to the active index to save DOM nodes
            if (MathAbsOffset > 2 && !isMobile) return null;
            if (MathAbsOffset > 1 && isMobile) return null;

            // 3D Transforms based on offset
            const translateX = isMobile ? `${offset * 70}%` : `${offset * 120}px`;
            const translateZ = isActive ? '50px' : `${-MathAbsOffset * 100}px`;
            const rotateY = isActive ? 0 : offset > 0 ? -15 : 15;
            const opacity = isActive ? 1 : 1 - MathAbsOffset * 0.4;
            const zIndex = 10 - MathAbsOffset;
            const blur = isActive ? 'blur(0px)' : `blur(${MathAbsOffset * 3}px)`;

            // Parallax values for active card
            const rx = useTransform(mouseY, [-1, 1], [10, -10]);
            const ry = useTransform(mouseX, [-1, 1], [-10, 10]);

            return (
              <motion.div
                key={product.id || index}
                onClick={() => {
                  if (isActive) {
                    navigate(`/product/${product.slug}`);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  opacity: opacity,
                  filter: blur
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  mass: 0.8
                }}
                style={{
                  position: 'absolute',
                  zIndex: zIndex,
                  width: isMobile ? '280px' : '360px',
                  cursor: isActive ? 'pointer' : 'pointer',
                  // Only apply mouse parallax to active card
                  rotateX: isActive && !isMobile ? rx : 0,
                  rotateY: isActive && !isMobile ? ry : rotateY,
                }}
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -100 || offset.x < -50) handleNext();
                  else if (swipe > 100 || offset.x > 50) handlePrev();
                }}
              >
                {/* Wrap ProductCard to ensure it scales correctly inside our 3D container */}
                <div style={{
                  pointerEvents: isActive ? 'auto' : 'none',
                  boxShadow: isActive ? `0 20px 50px -15px ${primaryColor}50` : 'none',
                  borderRadius: '16px',
                  transition: 'box-shadow 0.4s ease',
                  background: 'white' // Ensure background is solid for coverflow masking
                }}>
                  <ProductCard product={product} compact={isMobile} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Navigation & Indicators */}
        <div style={{
          marginTop: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px'
        }}>
          {/* Arrow Controls (Desktop mainly) */}
          {!isMobile && (
            <div style={{ display: 'flex', gap: '20px' }}>
              <motion.button
                onClick={handlePrev}
                whileHover={{ x: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '50px', height: '50px',
                  borderRadius: '50%', border: `1px solid ${primaryColor}50`,
                  background: 'transparent', color: primaryColor,
                  cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  transition: 'border-color 0.4s ease, color 0.4s ease'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </motion.button>
              <motion.button
                onClick={handleNext}
                whileHover={{ x: 5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '50px', height: '50px',
                  borderRadius: '50%', border: `1px solid ${primaryColor}50`,
                  background: 'transparent', color: primaryColor,
                  cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  transition: 'border-color 0.4s ease, color 0.4s ease'
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </motion.button>
            </div>
          )}

          {/* Dots Indicator */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {products.map((_, idx) => (
              <motion.div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  width: idx === activeIndex ? '30px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: idx === activeIndex ? primaryColor : `${primaryColor}40`,
                  cursor: 'pointer',
                  transition: 'background 0.4s ease'
                }}
                animate={{ width: idx === activeIndex ? 30 : 8 }}
              />
            ))}
          </div>

          {/* Call to Action */}
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: `0 15px 30px -10px ${primaryColor}60` }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/products')}
            style={{
              marginTop: '10px',
              padding: '16px 40px',
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
              color: 'white',
              border: 'none',
              borderRadius: '100px',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 1.5s ease', // Smooth gradient color shift
              boxShadow: `0 10px 20px -8px ${primaryColor}40`
            }}
          >
            Explore All Harvest
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;