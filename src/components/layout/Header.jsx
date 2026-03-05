// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
} from 'framer-motion';
import { FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';
import {
  MenuOutlined,
  CloseOutlined,
  ShoppingOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { scrollY } = useScroll();

  const springConfig = { stiffness: 200, damping: 30, mass: 0.5 };

  // ── Scroll-driven transforms ──────────────────────────────────────────────
  const widthVal = useTransform(scrollY, [0, 100], [100, 94]);
  const topValNum = useTransform(scrollY, [0, 100], [0, 16]);
  const radiusNum = useTransform(scrollY, [0, 100], [0, 40]);
  const paddingNum = useTransform(scrollY, [0, 100], [22, 10]);
  const alphaNum = useTransform(scrollY, [0, 60], [1, 0.94]);
  const shadowNum = useTransform(scrollY, [20, 100], [0, 0.15]);
  const blurNum = useTransform(scrollY, [0, 80], [0, 16]);
  const scaleNum = useTransform(scrollY, [0, 100], [1, 0.98]);

  // Apply individual springs for ultra-smooth property-level animation
  const widthSpring = useSpring(widthVal, springConfig);
  const topSpring = useSpring(topValNum, springConfig);
  const radiusSpring = useSpring(radiusNum, springConfig);
  const paddingSpring = useSpring(paddingNum, springConfig);
  const alphaSpring = useSpring(alphaNum, springConfig);
  const shadowSpring = useSpring(shadowNum, springConfig);
  const blurSpring = useSpring(blurNum, springConfig);
  const scaleSpring = useSpring(scaleNum, springConfig);

  const width = useMotionTemplate`${widthSpring}%`;
  const topVal = useMotionTemplate`${topSpring}px`;
  const borderRadius = useMotionTemplate`${radiusSpring}px`;
  const paddingY = useMotionTemplate`${paddingSpring}px`;
  const bgAlpha = alphaSpring;
  const shadowAlpha = shadowSpring;
  const blur = blurSpring;
  const scale = scaleSpring;

  // Template strings for CSS values
  const background = useMotionTemplate`rgba(246,241,232,${bgAlpha})`;
  const boxShadow = useMotionTemplate`0 8px 45px rgba(20,45,20,${shadowAlpha}), 0 2px 12px rgba(0,0,0,0.06)`;
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;
  const padding = useMotionTemplate`${paddingY} clamp(20px, 4vw, 40px)`;

  // Determine mobile status for layout tweaks
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const checkSize = () => setIsSmallScreen(window.innerWidth < 1025);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  const menuItems = [
    { key: 'home', label: 'Home', path: '/' },
    { key: 'products', label: 'Our Products', path: '/products' },
    { key: 'about', label: 'Our Story', path: '/about' },
    { key: 'contact', label: 'Contact', path: '/contact' },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const closeMenu = () => setMobileMenuOpen(false);

  // ── Animation variants ────────────────────────────────────────────────────

  // Backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  // Top-anchored floating card (drops from header)
  const mobileMenuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 350, damping: 30 },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -15,
      transition: { duration: 0.2 },
    },
  };

  // Staggered nav items
  const navContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
    exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 250, damping: 25 } },
    exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
  };

  // ── Responsive CSS ────────────────────────────────────────────────────────
  const mediaStyles = `
    /* Desktop (>1024px): show desktop layout */
    @media (min-width: 1025px) {
      .hdr-mobile { display: none !important; }
    }
    /* Mobile/Tablet (<1025px): hide desktop layout */
    @media (max-width: 1024px) {
      .hdr-desktop-nav,
      .hdr-desktop-actions,
      .hdr-desktop-logo { display: none !important; }
      .hdr-mobile { display: flex !important; }
    }

    /* Nav link hover underline */
    .hdr-nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0;
      width: 100%; height: 2px;
      // background: linear-gradient(90deg, #2c5f2d, #4caf4c);
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.3s ease;
      border-radius: 2px;
    }
    .hdr-nav-link:hover::after,
    .hdr-nav-link.active::after {
      transform: scaleX(1);
      transform-origin: left;
    }

    /* Mobile nav link hover */
    .mob-nav-item:hover .mob-nav-label { color: #2c5f2d; }
    .mob-nav-item:hover .mob-nav-arrow { transform: translateX(5px); color: #2c5f2d; }
    .mob-nav-arrow { transition: transform 0.2s ease, color 0.2s ease; }

    /* Floating card glow pulse when open */
    @keyframes cardGlow {
      0%, 100% { box-shadow: 0 20px 60px rgba(44,95,45,0.18), 0 0 0 1px rgba(255,255,255,0.4); }
      50%       { box-shadow: 0 24px 70px rgba(44,95,45,0.24), 0 0 0 1px rgba(255,255,255,0.5); }
    }
    .mob-menu-card { animation: cardGlow 3s ease-in-out infinite; }
  `;

  return (
    <>
      <style>{mediaStyles}</style>

      {/* ── HEADER BAR ── */}
      <motion.header
        style={{
          position: 'fixed',
          top: topVal,
          left: '50%',
          x: '-50%',
          width,
          scale,
          zIndex: 1000,
          borderRadius,
          background,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          boxShadow,
          padding,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: 'none',
          border: '1px solid rgba(44,95,45,0.08)',
          overflow: 'hidden',
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            to="/"
            className="hdr-desktop-logo"
            style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', flexShrink: 0 }}
          >
            <motion.span
              style={{
                fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
                fontWeight: 700,
                color: '#2c5f2d',
                letterSpacing: '0.5px',
                lineHeight: 1.2,
              }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              Vedique
            </motion.span>
            <span style={{
              fontSize: 'clamp(0.5rem, 1.2vw, 0.68rem)',
              color: '#5a8f5a',
              letterSpacing: 'clamp(1px, 1.5vw, 3px)',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              Nourish • Thrive • Glow
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hdr-desktop-nav" style={{ display: 'flex', gap: 'clamp(20px, 3vw, 40px)' }}>
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`hdr-nav-link${isActive(item.path) ? ' active' : ''}`}
                style={{
                  color: isActive(item.path) ? '#1e4d20' : '#2c5f2d',
                  textDecoration: 'none',
                  fontSize: 'clamp(0.82rem, 1.4vw, 0.95rem)',
                  fontWeight: isActive(item.path) ? 600 : 500,
                  letterSpacing: '0.3px',
                  padding: '6px 0',
                  position: 'relative',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div
            className="hdr-desktop-actions"
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 2vw, 24px)', flexShrink: 0 }}
          >
            {[SearchOutlined, UserOutlined].map((Icon, i) => (
              <motion.span key={i} whileHover={{ scale: 1.2, color: '#1e4d20' }} style={{ cursor: 'pointer' }}>
                <Icon style={{ color: '#2c5f2d', fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)' }} />
              </motion.span>
            ))}
            <motion.div
              style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
              whileHover={{ scale: 1.2 }}
            >
              <ShoppingOutlined style={{ color: '#2c5f2d', fontSize: 'clamp(1.05rem, 1.8vw, 1.2rem)' }} />
              <span style={{
                position: 'absolute', top: '-8px', right: '-8px',
                background: 'linear-gradient(135deg, #2c5f2d, #4caf4c)',
                color: '#fff', fontSize: '0.62rem', fontWeight: 700,
                width: '17px', height: '17px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>3</span>
            </motion.div>
          </div>

          {/* Mobile Header Row */}
          <div
            className="hdr-mobile"
            style={{ display: 'none', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Link to="/" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
              <span style={{ fontSize: 'clamp(1.3rem, 5vw, 1.7rem)', fontWeight: 700, color: '#2c5f2d', lineHeight: 1.2 }}>
                Vedique
              </span>
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Cart badge */}
              <div style={{ position: 'relative', cursor: 'pointer' }}>
                <ShoppingOutlined style={{ color: '#2c5f2d', fontSize: '1.2rem' }} />
                <span style={{
                  position: 'absolute', top: '-6px', right: '-6px',
                  background: 'linear-gradient(135deg, #2c5f2d, #4caf4c)',
                  color: '#fff', fontSize: '0.58rem', fontWeight: 700,
                  width: '15px', height: '15px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>3</span>
              </div>

              <motion.button
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  background: 'rgba(44,95,45,0.08)',
                  border: '1px solid rgba(44,95,45,0.15)',
                  color: '#2c5f2d',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  padding: '7px 10px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={{ scale: 1.08, background: 'rgba(44,95,45,0.14)' }}
                whileTap={{ scale: 0.94 }}
                aria-label="Open menu"
              >
                <MenuOutlined />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMenu}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(20, 40, 20, 0.55)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 1090,
              }}
            />

            {/* Anchored floating card */}
            <motion.div
              className="mob-menu-card"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              style={{
                position: 'fixed',
                top: '104px',
                left: '2.5vw',
                right: '2.5vw',
                margin: '0 auto',
                width: 'min(420px, 95vw)',
                maxHeight: '82vh',
                zIndex: 1100,
                background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(246,241,232,0.98) 100%)',
                borderRadius: '24px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 25px 60px -15px rgba(0,0,0,0.2)',
              }}
            >
              {/* Card Header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '22px 26px 18px',
                borderBottom: '1px solid rgba(44,95,45,0.1)',
                background: 'linear-gradient(135deg, rgba(44,95,45,0.04) 0%, rgba(184,134,11,0.03) 100%)',
              }}>
                <Link to="/" style={{ textDecoration: 'none' }} onClick={closeMenu}>
                  <div>
                    <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#2c5f2d', lineHeight: 1.1 }}>
                      Vedique
                    </div>
                    <div style={{ fontSize: '0.6rem', color: '#5a8f5a', letterSpacing: '2.5px', textTransform: 'uppercase', marginTop: '2px' }}>
                      Nourish • Thrive • Glow
                    </div>
                  </div>
                </Link>

                <motion.button
                  onClick={closeMenu}
                  style={{
                    background: 'rgba(44,95,45,0.08)',
                    border: '1px solid rgba(44,95,45,0.14)',
                    color: '#2c5f2d',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    width: '38px', height: '38px',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                  whileHover={{ scale: 1.12, background: 'rgba(44,95,45,0.15)', rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  aria-label="Close menu"
                >
                  <CloseOutlined />
                </motion.button>
              </div>

              {/* Nav Items */}
              <motion.nav
                variants={navContainerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ overflowY: 'auto', padding: '12px 20px', flex: 1 }}
              >
                {menuItems.map((item, index) => {
                  const active = isActive(item.path);
                  return (
                    <motion.div key={item.key} variants={navItemVariants}>
                      <Link
                        to={item.path}
                        onClick={closeMenu}
                        className="mob-nav-item"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '14px 16px',
                          marginBottom: '6px',
                          borderRadius: '14px',
                          textDecoration: 'none',
                          background: active
                            ? 'linear-gradient(135deg, rgba(44,95,45,0.1) 0%, rgba(76,175,76,0.07) 100%)'
                            : 'transparent',
                          border: active
                            ? '1px solid rgba(44,95,45,0.15)'
                            : '1px solid transparent',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: active
                              ? 'linear-gradient(135deg, #2c5f2d, #4caf4c)'
                              : 'rgba(44,95,45,0.25)',
                            flexShrink: 0,
                            transition: 'background 0.2s ease',
                          }} />
                          <span
                            className="mob-nav-label"
                            style={{
                              fontSize: '1rem', fontWeight: active ? 600 : 500,
                              color: active ? '#1e4d20' : '#2c5f2d',
                              letterSpacing: '0.2px',
                              transition: 'color 0.2s ease',
                            }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span
                          className="mob-nav-arrow"
                          style={{
                            color: active ? '#2c5f2d' : '#9abf9a',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                          }}
                        >→</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.nav>

              {/* Action Icons Row */}
              <div style={{
                display: 'flex', gap: '14px', justifyContent: 'center',
                padding: '14px 20px 10px',
                borderTop: '1px solid rgba(44,95,45,0.08)',
              }}>
                {[
                  { Icon: SearchOutlined, label: 'Search' },
                  { Icon: UserOutlined, label: 'Account' },
                  { Icon: ShoppingOutlined, label: 'Cart' },
                ].map(({ Icon, label }) => (
                  <motion.button
                    key={label}
                    style={{
                      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px',
                      background: 'rgba(44,95,45,0.05)',
                      border: '1px solid rgba(44,95,45,0.1)',
                      borderRadius: '12px', padding: '10px 8px',
                      cursor: 'pointer', color: '#2c5f2d',
                    }}
                    whileHover={{ scale: 1.06, background: 'rgba(44,95,45,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon style={{ fontSize: '1.15rem' }} />
                    <span style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      {label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Footer — Social + Copyright */}
              <div style={{
                padding: '14px 20px 20px',
                borderTop: '1px solid rgba(44,95,45,0.08)',
                textAlign: 'center',
              }}>
                <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '12px' }}>
                  {[
                    { href: 'https://www.instagram.com/vediqueproducts', Icon: FaInstagram },
                    { href: 'https://www.youtube.com/@Vedique-products', Icon: FaYoutube },
                    { href: 'https://www.facebook.com/profile.php?id=61586468189630', Icon: FaFacebookF },
                  ].map(({ href, Icon }) => (
                    <motion.a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#5a8f5a', fontSize: '18px', display: 'flex' }}
                      whileHover={{ scale: 1.25, color: '#2c5f2d' }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 350 }}
                    >
                      <Icon />
                    </motion.a>
                  ))}
                </div>
                <p style={{ color: '#9abf9a', fontSize: '0.68rem', lineHeight: 1.6, margin: 0 }}>
                  © {new Date().getFullYear()} Vedique · Healthy Mixers & Natural Foods
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;