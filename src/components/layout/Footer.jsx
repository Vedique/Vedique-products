// Footer.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MailOutlined,
  InstagramOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  HeartOutlined
} from '@ant-design/icons'

const Footer = () => {
  const year = new Date().getFullYear()

  const socialLinks = [
    { key: 'instagram', icon: <InstagramOutlined />, href: 'https://www.instagram.com/vediqueproducts', label: 'Instagram' },
    { key: 'youtube', icon: <YoutubeOutlined />, href: 'https://www.youtube.com/@Vedique-products', label: 'YouTube' },
    { key: 'facebook', icon: <FacebookOutlined />, href: 'https://www.facebook.com/profile.php?id=61586468189630', label: 'Facebook' },
  ]

  const quickLinks = [
    { key: 'home', label: 'Home', path: '/' },
    { key: 'products', label: 'Products', path: '/products' },
    { key: 'about', label: 'Our Story', path: '/about' },
    { key: 'contact', label: 'Contact', path: '/contact' },
  ]

  const footerStyles = {
    footer: {
      background: 'linear-gradient(180deg, #1a2f1a 0%, #0f240f 100%)',
      color: '#ecf6e8',
      borderTop: '1px solid rgba(130, 180, 130, 0.15)',
      width: '100%'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '50px 40px 25px',
      '@media (max-width: 768px)': {
        padding: '40px 20px 20px'
      }
    },
    mainRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '40px',
      marginBottom: '40px',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '35px',
        marginBottom: '30px'
      }
    },
    brandColumn: {
      gridColumn: 'span 1',
      '@media (max-width: 768px)': {
        textAlign: 'left',
        width: '100%'
      }
    },
    linksColumn: {
      gridColumn: 'span 1',
      '@media (max-width: 768px)': {
        textAlign: 'left',
        width: '100%'
      }
    },
    brandName: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#ffffff',
      letterSpacing: '0.5px',
      marginBottom: '8px',
      lineHeight: 1.2,
      '@media (max-width: 768px)': {
        fontSize: '1.8rem',
        marginBottom: '5px'
      }
    },
    brandTagline: {
      fontSize: '0.75rem',
      color: '#9bba9b',
      letterSpacing: '3px',
      textTransform: 'uppercase',
      marginBottom: '15px',
      '@media (max-width: 768px)': {
        fontSize: '0.7rem',
        letterSpacing: '2px',
        marginBottom: '12px'
      }
    },
    brandDescription: {
      fontSize: '0.9rem',
      lineHeight: 1.6,
      color: '#c0d4c0',
      maxWidth: '300px',
      margin: '0',
      '@media (max-width: 768px)': {
        fontSize: '0.85rem',
        maxWidth: '100%',
        margin: '0'
      }
    },
    sectionTitle: {
      fontSize: '0.8rem',
      fontWeight: 600,
      color: '#b8d8b8',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: '20px',
      '@media (max-width: 768px)': {
        fontSize: '0.75rem',
        marginBottom: '15px',
        textAlign: 'left'
      }
    },
    linksList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      '@media (max-width: 768px)': {
        gap: '10px',
        alignItems: 'flex-start'
      }
    },
    link: {
      color: '#c0d4c0',
      textDecoration: 'none',
      fontSize: '0.9rem',
      transition: 'color 0.2s ease',
      display: 'inline-block',
      '@media (max-width: 768px)': {
        fontSize: '0.85rem',
        padding: '2px 0'
      }
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: '#c0d4c0',
      textDecoration: 'none',
      fontSize: '0.9rem',
      marginBottom: '15px',
      flexWrap: 'wrap',
      wordBreak: 'break-all',
      '@media (max-width: 768px)': {
        fontSize: '0.85rem',
        marginBottom: '12px',
        justifyContent: 'flex-start'
      }
    },
    socialLinks: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      marginTop: '10px',
      '@media (max-width: 768px)': {
        gap: '10px',
        justifyContent: 'flex-start'
      }
    },
    socialLink: {
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(130, 180, 130, 0.1)',
      border: '1px solid rgba(130, 180, 130, 0.2)',
      borderRadius: '50%',
      color: '#c0dcc0',
      fontSize: '1.1rem',
      transition: 'all 0.2s ease',
      '@media (max-width: 768px)': {
        width: '38px',
        height: '38px',
        fontSize: '1rem'
      }
    },
    bottomBar: {
      borderTop: '1px solid rgba(130, 180, 130, 0.15)',
      paddingTop: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '15px',
      fontSize: '0.8rem',
      color: '#8fb08f',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '10px',
        paddingTop: '15px'
      }
    },
    copyright: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      flexWrap: 'wrap',
      '@media (max-width: 768px)': {
        justifyContent: 'center'
      }
    },
    heartIcon: {
      color: '#ff8a8a',
      fontSize: '0.9rem'
    }
  }

  // Convert style objects with media queries to CSS
  const generateCSS = () => {
    let css = `
      /* Base styles */
      .footer-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 50px 40px 25px;
      }
      
      .footer-main-row {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 40px;
        margin-bottom: 40px;
      }
      
      .brand-column {
        grid-column: span 1;
      }
      
      .links-column {
        grid-column: span 1;
      }
      
      .brand-name {
        font-size: 2rem;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
        line-height: 1.2;
      }
      
      .brand-tagline {
        font-size: 0.75rem;
        color: #9bba9b;
        letter-spacing: 3px;
        text-transform: uppercase;
        margin-bottom: 15px;
      }
      
      .brand-description {
        font-size: 0.9rem;
        line-height: 1.6;
        color: #c0d4c0;
        max-width: 300px;
        margin: 0;
      }
      
      .section-title {
        font-size: 0.8rem;
        font-weight: 600;
        color: #b8d8b8;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin-bottom: 20px;
      }
      
      .links-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .footer-link {
        color: #c0d4c0;
        text-decoration: none;
        font-size: 0.9rem;
        transition: color 0.2s ease;
        display: inline-block;
      }
      
      .footer-link:hover {
        color: #9be19b;
      }
      
      .contact-item {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #c0d4c0;
        text-decoration: none;
        font-size: 0.9rem;
        margin-bottom: 15px;
        flex-wrap: wrap;
        word-break: break-all;
      }
      
      .contact-item:hover {
        color: #9be19b;
      }
      
      .social-links {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-top: 10px;
      }
      
      .social-link {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(130, 180, 130, 0.1);
        border: 1px solid rgba(130, 180, 130, 0.2);
        border-radius: 50%;
        color: #c0dcc0;
        font-size: 1.1rem;
        transition: all 0.2s ease;
      }
      
      .bottom-bar {
        border-top: 1px solid rgba(130, 180, 130, 0.15);
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
        font-size: 0.8rem;
        color: #8fb08f;
      }
      
      .copyright {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-wrap: wrap;
      }
      
      .heart-icon {
        color: #ff8a8a;
        font-size: 0.9rem;
      }

      /* Tablet Styles */
      @media (min-width: 769px) and (max-width: 1024px) {
        .footer-container {
          padding: 45px 30px 25px;
        }
        
        .footer-main-row {
          gap: 30px;
        }
        
        .brand-description {
          max-width: 250px;
        }
      }

      /* Mobile Styles */
      @media (max-width: 768px) {
        .footer-container {
          padding: 40px 20px 20px;
        }
        
        .footer-main-row {
          grid-template-columns: 1fr;
          gap: 35px;
          margin-bottom: 30px;
        }
        
        .brand-column,
        .links-column {
          text-align: left;
          width: 100%;
        }
        
        .brand-name {
          font-size: 1.8rem;
          margin-bottom: 5px;
        }
        
        .brand-tagline {
          font-size: 0.7rem;
          letter-spacing: 2px;
          margin-bottom: 12px;
        }
        
        .brand-description {
          font-size: 0.85rem;
          max-width: 100%;
          margin: 0;
        }
        
        .section-title {
          font-size: 0.75rem;
          margin-bottom: 15px;
          text-align: left;
        }
        
        .links-list {
          gap: 10px;
          align-items: flex-start;
        }
        
        .footer-link {
          font-size: 0.85rem;
          padding: 2px 0;
        }
        
        .contact-item {
          font-size: 0.85rem;
          margin-bottom: 12px;
          justify-content: flex-start;
        }
        
        .social-links {
          gap: 10px;
          justify-content: flex-start;
        }
        
        .social-link {
          width: 38px;
          height: 38px;
          font-size: 1rem;
        }
        
        .bottom-bar {
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          padding-top: 15px;
        }
        
        .copyright {
          justify-content: center;
        }
      }

      /* Small Mobile Styles */
      @media (max-width: 480px) {
        .footer-container {
          padding: 35px 15px 15px;
        }
        
        .footer-main-row {
          gap: 30px;
        }
        
        .brand-name {
          font-size: 1.6rem;
        }
        
        .brand-tagline {
          font-size: 0.65rem;
          letter-spacing: 1.5px;
        }
        
        .brand-description {
          font-size: 0.8rem;
        }
        
        .section-title {
          font-size: 0.7rem;
          margin-bottom: 12px;
        }
        
        .links-list {
          gap: 8px;
        }
        
        .footer-link {
          font-size: 0.8rem;
        }
        
        .contact-item {
          font-size: 0.8rem;
          gap: 8px;
        }
        
        .social-link {
          width: 36px;
          height: 36px;
          font-size: 0.95rem;
        }
        
        .bottom-bar {
          font-size: 0.75rem;
        }
      }

      /* Extra Small Mobile */
      @media (max-width: 360px) {
        .footer-container {
          padding: 30px 12px 12px;
        }
        
        .brand-name {
          font-size: 1.5rem;
        }
        
        .brand-tagline {
          font-size: 0.6rem;
          letter-spacing: 1px;
        }
        
        .social-link {
          width: 34px;
          height: 34px;
          font-size: 0.9rem;
        }
        
        .contact-item {
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }
      }
    `;
    
    return css;
  }

  return (
    <>
      <style>{generateCSS()}</style>
      <motion.footer
        style={footerStyles.footer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="footer-container">
          {/* Main Grid Layout */}
          <div className="footer-main-row">
            {/* Brand Column */}
            <motion.div
              className="brand-column"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="brand-name">Vedique</div>
              <div className="brand-tagline">Nourish • Thrive • Glow</div>
              <p className="brand-description">
                Clean everyday nutrition inspired by natural ingredients and mindful living.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              className="links-column"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              <h4 className="section-title">Explore</h4>
              <nav className="links-list">
                {quickLinks.map((link) => (
                  <Link
                    key={link.key}
                    to={link.path}
                    className="footer-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* Connect Column */}
            <motion.div
              className="links-column"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="section-title">Connect</h4>
              <a
                href="mailto:vediqueproducts@gmail.com"
                className="contact-item"
              >
                <MailOutlined style={{ fontSize: '1rem' }} />
                <span>vediqueproducts@gmail.com</span>
              </a>
              
              {/* Social Icons */}
              <div className="social-links">
                {socialLinks.map((item) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    aria-label={item.label}
                    className="social-link"
                    whileHover={{ 
                      y: -3,
                      background: 'rgba(130, 180, 130, 0.2)',
                      borderColor: '#8fc98f'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="bottom-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="copyright">
              <span>© {year} Vedique. All rights reserved.</span>
            </div>
            <div className="copyright">
              <span>Made with</span>
              <HeartOutlined className="heart-icon" />
              <span>in India</span>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </>
  )
}

export default Footer