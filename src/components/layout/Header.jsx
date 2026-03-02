// Header.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { MenuOutlined, CloseOutlined, ShoppingOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { key: 'home', label: 'Home', path: '/' },
    { key: 'products', label: 'Our Products', path: '/products' },
    { key: 'about', label: 'Our Story', path: '/about' },
    { key: 'contact', label: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  // Faster animation variants
  const menuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { 
        type: 'tween',
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    exit: { 
      x: '100%',
      transition: { 
        type: 'tween',
        duration: 0.25,
        ease: 'easeInOut'
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.03,
        duration: 0.2
      }
    })
  };

  const headerStyles = {
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: scrolled ? '8px 0' : '16px 0',
      background: scrolled 
        ? 'rgba(255, 255, 255, 0.98)' 
        : 'rgba(245, 255, 240, 0.95)',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      borderBottom: '1px solid rgba(100, 150, 100, 0.15)',
      boxShadow: scrolled ? '0 4px 20px rgba(0, 30, 0, 0.1)' : 'none'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 clamp(16px, 5vw, 40px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logoContainer: {
      display: 'flex',
      flexDirection: 'column',
      textDecoration: 'none',
      flexShrink: 0
    },
    logoText: {
      fontSize: 'clamp(1.4rem, 4vw, 2rem)',
      fontWeight: 700,
      color: '#2c5e2c',
      letterSpacing: '0.5px',
      lineHeight: 1.2
    },
    logoTagline: {
      fontSize: 'clamp(0.55rem, 1.5vw, 0.7rem)',
      color: '#5a8f5a',
      letterSpacing: 'clamp(1px, 2vw, 3px)',
      textTransform: 'uppercase',
      whiteSpace: 'nowrap'
    },
    nav: {
      display: 'flex',
      gap: 'clamp(20px, 3vw, 40px)',
      margin: '0 clamp(10px, 2vw, 20px)'
    },
    navLink: {
      color: '#2c5e2c',
      textDecoration: 'none',
      fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
      fontWeight: 500,
      letterSpacing: '0.3px',
      padding: '6px 0',
      position: 'relative',
      whiteSpace: 'nowrap'
    },
    navLinkActive: {
      color: '#1e3e1e',
      fontWeight: 600
    },
    navUnderline: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      background: '#4caf4c',
      transform: 'scaleX(0)',
      transition: 'transform 0.3s ease',
      transformOrigin: 'right'
    },
    navUnderlineActive: {
      transform: 'scaleX(1)',
      transformOrigin: 'left'
    },
    actions: {
      display: 'flex',
      alignItems: 'center',
      gap: 'clamp(15px, 2vw, 25px)',
      flexShrink: 0
    },
    actionIcon: {
      color: '#2c5e2c',
      fontSize: 'clamp(1.1rem, 2vw, 1.2rem)',
      cursor: 'pointer',
      transition: 'color 0.2s ease'
    },
    cartBadge: {
      position: 'relative',
      display: 'inline-block'
    },
    cartCount: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      background: '#4caf4c',
      color: '#ffffff',
      fontSize: '0.65rem',
      fontWeight: 600,
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    // Mobile styles
    mobileHeader: {
      display: 'none',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    mobileMenuBtn: {
      background: 'none',
      border: 'none',
      color: '#2c5e2c',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'color 0.2s ease'
    },
    mobileMenuOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(30, 50, 30, 0.7)',
      backdropFilter: 'blur(5px)',
      zIndex: 1001
    },
    mobileMenu: {
      position: 'fixed',
      top: 0,
      right: 0,
      width: 'min(400px, 85%)',
      height: '100vh',
      background: '#ffffff',
      zIndex: 1002,
      padding: 'clamp(20px, 5vh, 30px)',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '-5px 0 25px rgba(0, 30, 0, 0.15)'
    },
    mobileMenuHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 'clamp(20px, 4vh, 30px)',
      paddingBottom: '15px',
      borderBottom: '1px solid rgba(100, 150, 100, 0.2)'
    },
    mobileMenuLogo: {
      display: 'flex',
      flexDirection: 'column',
      textDecoration: 'none'
    },
    mobileMenuLogoText: {
      fontSize: 'clamp(1.5rem, 5vw, 1.8rem)',
      fontWeight: 700,
      color: '#2c5e2c',
      lineHeight: 1.2
    },
    mobileMenuTagline: {
      fontSize: 'clamp(0.6rem, 2vw, 0.65rem)',
      color: '#5a8f5a',
      letterSpacing: '2px',
      textTransform: 'uppercase'
    },
    mobileMenuClose: {
      background: 'none',
      border: 'none',
      color: '#2c5e2c',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'color 0.2s ease',
      width: '40px',
      height: '40px'
    },
    mobileNav: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      overflowY: 'auto'
    },
    mobileNavLink: {
      color: '#2c5e2c',
      textDecoration: 'none',
      fontSize: 'clamp(1rem, 4vw, 1.1rem)',
      fontWeight: 500,
      padding: '15px 0',
      borderBottom: '1px solid rgba(100, 150, 100, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'color 0.2s ease'
    },
    mobileNavLinkActive: {
      color: '#1e3e1e',
      fontWeight: 600
    },
    mobileNavIcon: {
      color: '#4caf4c',
      fontSize: '1rem',
      opacity: 0.7
    },
    mobileActionIcons: {
      display: 'flex',
      gap: '25px',
      justifyContent: 'center',
      margin: '20px 0'
    },
    mobileMenuFooter: {
      marginTop: 'auto',
      paddingTop: '20px',
      borderTop: '1px solid rgba(100, 150, 100, 0.2)',
      textAlign: 'center'
    },
    mobileSocialLinks: {
      display: 'flex',
      gap: '25px',
      justifyContent: 'center',
      marginBottom: '15px'
    },
    mobileCopyright: {
      color: '#8aa88a',
      fontSize: 'clamp(0.7rem, 2vw, 0.75rem)',
      lineHeight: 1.6
    }
  };

  // Responsive CSS
  const mediaStyles = `
    /* Large Desktop (1200px+) */
    @media (min-width: 1200px) {
      .header-container {
        max-width: 1400px;
      }
    }

    /* Desktop (1025px - 1199px) */
    @media (min-width: 1025px) and (max-width: 1199px) {
      .desktop-nav {
        gap: 25px;
      }
    }

    /* Tablet and Mobile (below 1025px) */
    @media (max-width: 1024px) {
      .desktop-nav, 
      .desktop-actions {
        display: none !important;
      }
      
      .desktop-logo {
        display: none !important;
      }
      
      .mobile-header {
        display: flex !important;
      }
    }

    /* Tablet Landscape (768px - 1024px) */
    @media (min-width: 768px) and (max-width: 1024px) {
      .header-container {
        padding: 0 30px !important;
      }
    }

    /* Mobile (below 768px) */
    @media (max-width: 767px) {
      .header-container {
        padding: 0 20px !important;
      }
    }

    /* Small Mobile (below 480px) */
    @media (max-width: 480px) {
      .header {
        padding: 6px 0 !important;
      }
      .logo-text {
        font-size: 1.3rem !important;
      }
      .mobile-menu {
        width: 90% !important;
        padding: 20px 15px !important;
      }
      .mobile-action-icons {
        gap: 20px !important;
      }
      .mobile-social-links {
        gap: 20px !important;
      }
      .mobile-nav-link {
        padding: 12px 0 !important;
      }
    }

    /* Extra Small Mobile (below 360px) */
    @media (max-width: 360px) {
      .logo-text {
        font-size: 1.2rem !important;
      }
      .mobile-nav-link {
        font-size: 0.95rem !important;
        padding: 10px 0 !important;
      }
      .mobile-action-icons {
        gap: 15px !important;
      }
      .mobile-menu-close {
        font-size: 1.3rem !important;
        width: 35px !important;
        height: 35px !important;
      }
    }
  `;

  return (
    <>
      <style>{mediaStyles}</style>
      <motion.header
        style={headerStyles.header}
        className="header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div style={headerStyles.container} className="header-container">
          {/* Desktop Logo - Only visible on desktop */}
          <Link to="/" style={headerStyles.logoContainer} className="desktop-logo">
            <span style={headerStyles.logoText} className="logo-text">Vedique</span>
            <span style={headerStyles.logoTagline} className="logo-tagline">Nourish • Thrive • Glow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={headerStyles.nav} className="desktop-nav">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                style={{
                  ...headerStyles.navLink,
                  ...(isActive(item.path) ? headerStyles.navLinkActive : {})
                }}
              >
                {item.label}
                <span style={{
                  ...headerStyles.navUnderline,
                  ...(isActive(item.path) ? headerStyles.navUnderlineActive : {})
                }} />
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div style={headerStyles.actions} className="desktop-actions">
            <SearchOutlined style={headerStyles.actionIcon} />
            <UserOutlined style={headerStyles.actionIcon} />
            <div style={headerStyles.cartBadge}>
              <ShoppingOutlined style={headerStyles.actionIcon} />
              <span style={headerStyles.cartCount}>3</span>
            </div>
          </div>

          {/* Mobile Header - Only visible on mobile/tablet */}
          <div style={headerStyles.mobileHeader} className="mobile-header">
            <Link to="/" style={headerStyles.logoContainer}>
              <span style={headerStyles.logoText} className="logo-text">Vedique</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              style={headerStyles.mobileMenuBtn}
              aria-label="Open menu"
              onMouseEnter={(e) => e.currentTarget.style.color = '#1e3e1e'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#2c5e2c'}
            >
              <MenuOutlined />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {mobileMenuOpen && (
          <>
            <motion.div
              style={headerStyles.mobileMenuOverlay}
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={closeMenu}
            />
            <motion.div
              style={headerStyles.mobileMenu}
              className="mobile-menu"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div style={headerStyles.mobileMenuHeader}>
                <Link to="/" style={headerStyles.mobileMenuLogo} onClick={closeMenu}>
                  <span style={headerStyles.mobileMenuLogoText}>Vedique</span>
                  <span style={headerStyles.mobileMenuTagline}>Nourish • Thrive • Glow</span>
                </Link>
                <button
                  onClick={closeMenu}
                  style={headerStyles.mobileMenuClose}
                  className="mobile-menu-close"
                  aria-label="Close menu"
                  onMouseEnter={(e) => e.currentTarget.style.color = '#1e3e1e'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#2c5e2c'}
                >
                  <CloseOutlined />
                </button>
              </div>

              <nav style={headerStyles.mobileNav}>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.key}
                    custom={index}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link
                      to={item.path}
                      style={{
                        ...headerStyles.mobileNavLink,
                        ...(isActive(item.path) ? headerStyles.mobileNavLinkActive : {})
                      }}
                      onClick={closeMenu}
                    >
                      <span>{item.label}</span>
                      <span style={headerStyles.mobileNavIcon}>→</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div style={headerStyles.mobileActionIcons} className="mobile-action-icons">
                <SearchOutlined style={{...headerStyles.actionIcon, fontSize: '1.3rem'}} />
                <ShoppingOutlined style={{...headerStyles.actionIcon, fontSize: '1.3rem'}} />
              </div>

              <div style={headerStyles.mobileMenuFooter}>
                <div style={headerStyles.mobileSocialLinks} className="mobile-social-links">
                  <a 
                    href="https://www.instagram.com/vediqueproducts" 
                    style={{ color: "#5a8f5a", fontSize: "20px", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1e3e1e'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#5a8f5a'}
                  >
                    <FaInstagram />
                  </a>
                  <a 
                    href="https://www.youtube.com/@Vedique-products" 
                    style={{ color: "#5a8f5a", fontSize: "20px", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1e3e1e'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#5a8f5a'}
                  >
                    <FaYoutube />
                  </a>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61586468189630" 
                    style={{ color: "#5a8f5a", fontSize: "20px", transition: "color 0.2s ease" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#1e3e1e'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#5a8f5a'}
                  >
                    <FaFacebookF />
                  </a>
                </div>
                <p style={headerStyles.mobileCopyright}>
                  © {new Date().getFullYear()} Vedique<br />Healthy Mixers & Natural Foods
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