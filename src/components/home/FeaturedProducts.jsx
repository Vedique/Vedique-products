import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { motion } from 'framer-motion';

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Featured = first 5 products
  const [hero, ...grid] = products.slice(0, 5);

  return (
    <section style={{
      background: '#f4f0e8',
      padding: isMobile ? '48px 16px 52px' : '64px 32px 72px',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Subtle grain */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}>
        <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" /><feColorMatrix type="saturate" values="0" /></filter>
        <rect width="100%" height="100%" filter="url(#g)" />
      </svg>

      {/* Section header */}
      <div style={{ maxWidth: 960, margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ marginBottom: isMobile ? 28 : 36, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{
              margin: '0 0 6px',
              fontSize: '0.58rem', fontWeight: 700,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#9e8464', fontFamily: 'system-ui',
            }}>
              ✦ &nbsp; Handpicked For You
            </p>
            <h2 style={{
              margin: 0,
              fontSize: isMobile ? 'clamp(1.8rem, 6vw, 2.2rem)' : '2.6rem',
              fontWeight: 300, color: '#1c2b1e',
              fontFamily: 'Georgia, serif', lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}>
              Featured <em style={{ fontWeight: 600, fontStyle: 'italic', color: '#2d5a3a' }}>Products</em>
            </h2>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/products')}
            style={{
              padding: '10px 22px',
              background: 'transparent',
              border: '1px solid rgba(45,90,58,0.35)',
              fontSize: '0.65rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: '#2d5a3a', cursor: 'pointer',
              fontFamily: 'system-ui', borderRadius: 0,
            }}
          >
            View All →
          </motion.button>
        </div>

        {/* ── GRID LAYOUT ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr 1fr' : '1.6fr 1fr 1fr',
          gridTemplateRows: isMobile ? 'auto' : 'auto auto',
          gap: isMobile ? 10 : 14,
        }}>

          {/* HERO CARD — spans 2 rows on desktop, full width row on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -3 }}
            onClick={() => navigate(`/product/${hero.id}`)}
            style={{
              gridRow: isMobile ? 'auto' : '1 / 3',
              gridColumn: isMobile ? '1 / 3' : '1',
              background: '#fff',
              borderRadius: 16,
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 4px 24px -4px rgba(28,43,30,0.12)',
              border: '1px solid rgba(28,43,30,0.06)',
              position: 'relative',
            }}
          >
            {/* Product image */}
            <div style={{
              height: isMobile ? 220 : 320,
              background: 'linear-gradient(135deg, #e8f0e4, #d4e4cc)',
              position: 'relative', overflow: 'hidden',
            }}>
              {hero.image && (
                <img
                  src={hero.image}
                  alt={hero.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              )}
              {/* Featured badge */}
              <div style={{
                position: 'absolute', top: 14, left: 14,
                background: '#2d5a3a', color: '#c8a96e',
                fontSize: '0.55rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                padding: '5px 11px', fontFamily: 'system-ui',
              }}>
                Best Pick
              </div>
              {/* Like */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={(e) => toggleLike(hero.id, e)}
                style={{
                  position: 'absolute', top: 12, right: 12,
                  width: 34, height: 34, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.9rem',
                }}
              >
                {liked[hero.id] ? '❤️' : '🤍'}
              </motion.button>
            </div>

            {/* Info */}
            <div style={{ padding: isMobile ? '14px 16px 18px' : '18px 22px 22px' }}>
              <p style={{
                margin: '0 0 4px',
                fontSize: '0.58rem', fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                color: '#9e8464', fontFamily: 'system-ui',
              }}>
                {hero.category}
              </p>
              <h3 style={{
                margin: '0 0 6px',
                fontSize: isMobile ? '1.15rem' : '1.4rem',
                fontWeight: 400, color: '#1c2b1e',
                fontFamily: 'Georgia, serif', lineHeight: 1.2,
              }}>
                {hero.name}
              </h3>
              <p style={{
                margin: '0 0 14px',
                fontSize: '0.78rem', color: '#7a7060',
                fontFamily: 'system-ui', fontWeight: 300,
                lineHeight: 1.55,
              }}>
                {hero.description?.substring(0, isMobile ? 60 : 90)}…
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: '#2d5a3a', fontFamily: 'Georgia, serif' }}>
                    ₹{hero.price}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#bbb', textDecoration: 'line-through', fontFamily: 'system-ui' }}>
                    ₹{Math.round(hero.price * 1.15)}
                  </span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={(e) => { e.stopPropagation(); navigate(`/product/${hero.id}`); }}
                  style={{
                    padding: '9px 18px',
                    background: '#2d5a3a', color: '#c8a96e',
                    border: 'none', borderRadius: 0,
                    fontSize: '0.62rem', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    cursor: 'pointer', fontFamily: 'system-ui',
                  }}
                >
                  Shop
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* GRID CARDS */}
          {grid.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -3 }}
              onClick={() => navigate(`/product/${product.id}`)}
              style={{
                background: '#fff',
                borderRadius: 14,
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 2px 16px -4px rgba(28,43,30,0.1)',
                border: '1px solid rgba(28,43,30,0.05)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Image */}
              <div style={{
                height: isMobile ? 130 : 160,
                background: i % 3 === 0
                  ? 'linear-gradient(135deg, #f0ede4, #e4ddd0)'
                  : i % 3 === 1
                    ? 'linear-gradient(135deg, #e4ede4, #d0e4d8)'
                    : 'linear-gradient(135deg, #ede8e0, #e0d8cc)',
                position: 'relative', overflow: 'hidden', flexShrink: 0,
              }}>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
                <motion.button
                  whileTap={{ scale: 0.75 }}
                  onClick={(e) => toggleLike(product.id, e)}
                  style={{
                    position: 'absolute', top: 8, right: 8,
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.75rem',
                  }}
                >
                  {liked[product.id] ? '❤️' : '🤍'}
                </motion.button>
              </div>

              {/* Info */}
              <div style={{ padding: '11px 13px 13px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <p style={{
                    margin: '0 0 2px',
                    fontSize: '0.52rem', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: '#9e8464', fontFamily: 'system-ui',
                  }}>
                    {product.category}
                  </p>
                  <h4 style={{
                    margin: '0 0 8px',
                    fontSize: isMobile ? '0.82rem' : '0.92rem',
                    fontWeight: 400, color: '#1c2b1e',
                    fontFamily: 'Georgia, serif', lineHeight: 1.25,
                  }}>
                    {product.name}
                  </h4>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2d5a3a', fontFamily: 'Georgia, serif' }}>
                    ₹{product.price}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                    style={{
                      padding: '6px 12px',
                      background: 'transparent',
                      border: '1px solid rgba(45,90,58,0.3)',
                      borderRadius: 0,
                      fontSize: '0.58rem', fontWeight: 600,
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      color: '#2d5a3a', cursor: 'pointer', fontFamily: 'system-ui',
                    }}
                  >
                    Add
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom strip */}
        <div style={{
          marginTop: isMobile ? 24 : 32,
          padding: isMobile ? '16px 20px' : '18px 28px',
          background: '#2d5a3a',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.72rem', color: 'rgba(200,169,110,0.85)',
            fontFamily: 'Georgia, serif', fontWeight: 300,
            fontStyle: 'italic',
          }}>
            Small batch · Made fresh · No shortcuts
          </p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/products')}
            style={{
              padding: '9px 22px',
              background: '#c8a96e', border: 'none',
              borderRadius: 0, color: '#1c2b1e',
              fontSize: '0.62rem', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              cursor: 'pointer', fontFamily: 'system-ui',
            }}
          >
            Shop All Products
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;