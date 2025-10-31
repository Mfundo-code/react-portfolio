// src/GlobalComponents/Header.js
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaEnvelope, FaHome, FaUser, FaProjectDiagram, FaServicestack } from "react-icons/fa";
import LogoB from "../assets/images/LogoB.png";

export default function Header({ cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setMobileMenuOpen(s => !s);

  const scrollToFooter = () => {
    const footer = document.querySelector('footer');
    if (footer) footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      window.location.href = '/';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 880);
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Theme colors matching hero
  const ACCENT_A = '#00c9ff';
  const ACCENT_B = '#64ffda';

  // Base styles
  const filledStyle = {
    background: `linear-gradient(90deg, ${ACCENT_B}, ${ACCENT_A})`,
    color: '#071127',
    border: 'none',
    boxShadow: '0 10px 30px rgba(100,255,218,0.12)',
  };
  const transparentStyle = {
    background: 'transparent',
    color: '#dff7fb',
    border: `1px solid rgba(100,255,218,0.07)`,
    boxShadow: 'none',
  };

  // Slightly-dimmed variant for active state: almost same as filled but softer
  const activeSoftFilled = {
    background: `linear-gradient(90deg, ${ACCENT_B}, ${ACCENT_A})`,
    color: '#071127',
    border: 'none',
    boxShadow: '0 6px 18px rgba(100,255,218,0.08)', // softer shadow
    filter: 'brightness(0.95)', // tiny dim
    transform: 'translateY(0)', // keep stable
  };

  const styles = {
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 120,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '10px 20px',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      background: 'transparent',
      borderBottom: 'none',
      boxShadow: '0 6px 30px rgba(2,8,23,0.6)',
      alignSelf: 'stretch',
      minHeight: 64,
      fontFamily: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      cursor: 'pointer',
    },
    logoImage: {
      height: 44,
      width: 'auto',
      display: 'block',
      filter: 'drop-shadow(0 6px 18px rgba(0, 201, 255, 0.06))',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flex: '1 1 auto',
      justifyContent: 'center',
    },
    // navButton: non-active -> filled; active -> soft filled (only slightly different)
    navButton: (isActive) => ({
      textDecoration: 'none',
      padding: '10px 18px',
      borderRadius: 999,
      fontWeight: 600,
      fontSize: 15,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      transition: 'all 180ms cubic-bezier(.2,.9,.3,1)',
      ...(isActive ? activeSoftFilled : filledStyle),
    }),
    rightControls: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flex: '0 0 auto',
    },
    // Icon button: default filled look, toggled (e.g., menu open) gets slightly different (soft) filled
    iconButton: (toggled = false) => ({
      padding: 10,
      borderRadius: 12,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      minWidth: 44,
      minHeight: 44,
      transition: 'transform 160ms ease, box-shadow 160ms ease, filter 160ms ease',
      ...(toggled ? activeSoftFilled : {
        ...filledStyle,
      }),
    }),
    envelopeIcon: {
      fontSize: 18,
      color: '#071127', // keep readable over the filled button
    },
    cartBadge: {
      position: 'absolute',
      top: -6,
      right: -6,
      background: ACCENT_B,
      color: '#00121a',
      borderRadius: 99,
      width: 20,
      height: 20,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 12,
      fontWeight: 700,
      boxShadow: '0 6px 18px rgba(100,255,218,0.12)'
    },

    // Mobile
    mobileNav: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    mobileMenuOverlay: {
      position: 'fixed',
      inset: 0,
      background: 'linear-gradient(180deg, rgba(0,0,0,0.45), rgba(2,6,12,0.6))',
      zIndex: 200,
      display: 'flex',
      justifyContent: 'flex-end',
      transition: 'opacity 180ms ease',
    },
    mobileMenu: {
      width: 300,
      height: '100%',
      background: 'linear-gradient(180deg, rgba(10,14,22,0.95), rgba(6,8,12,0.95))',
      padding: 20,
      boxShadow: '-20px 0 60px rgba(2,8,23,0.6)'
    },
    // mobileMenuItem: active -> soft filled; else -> filled (same subtle difference as desktop)
    mobileMenuItem: (isActive) => ({
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      padding: '12px 14px',
      textDecoration: 'none',
      borderRadius: 10,
      fontWeight: 600,
      ...(isActive ? activeSoftFilled : { ...filledStyle, color: '#071127' }),
    }),
    mobileIcon: { fontSize: 18, color: ACCENT_B },
  };

  const links = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/about', label: 'About', icon: <FaUser /> },
    { to: '/services', label: 'Services', icon: <FaServicestack /> },
    { to: '/projects', label: 'Projects', icon: <FaProjectDiagram /> },
  ];

  return (
    <header style={styles.header} aria-label="Primary header">
      <div style={styles.logoContainer} onClick={handleLogoClick} role="button" tabIndex={0} aria-label="Go to home">
        <img src={LogoB} alt="Logo" style={styles.logoImage} />
      </div>

      {/* Desktop nav */}
      {!isMobile && (
        <nav style={styles.nav} role="navigation" aria-label="Primary navigation">
          {links.map((l) => {
            const isActive = location.pathname === l.to;
            return (
              <Link key={l.to} to={l.to} style={styles.navButton(isActive)}>
                {l.icon}
                <span>{l.label}</span>
              </Link>
            );
          })}
        </nav>
      )}

      <div style={styles.rightControls}>
        {!isMobile && (
          <button
            type="button"
            onClick={scrollToFooter}
            title="Contact"
            aria-label="Contact"
            style={{ ...styles.iconButton(false), position: 'relative' }}
          >
            <FaEnvelope style={styles.envelopeIcon} />
            {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
          </button>
        )}

        {/* Mobile controls */}
        {isMobile && (
          <div style={styles.mobileNav}>
            <button style={{ ...styles.iconButton(false), position: 'relative' }} onClick={scrollToFooter} aria-label="Contact">
              <FaEnvelope style={styles.envelopeIcon} />
              {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
            </button>

            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
              style={{ ...styles.iconButton(mobileMenuOpen) }}
            >
              {mobileMenuOpen ? <FaTimes style={{ fontSize: 18, color: '#071127' }} /> : <FaBars style={{ fontSize: 18, color: '#071127' }} />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && isMobile && (
        <div style={styles.mobileMenuOverlay} onClick={toggleMobileMenu}>
          <div style={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src={LogoB} alt="logo" style={{ height: 36 }} />
              </div>
              <button onClick={toggleMobileMenu} style={{ background: 'none', border: 'none', color: '#dff7fb', fontSize: 20 }} aria-label="Close menu"><FaTimes /></button>
            </div>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {links.map(l => {
                const isActive = location.pathname === l.to;
                return (
                  <Link key={l.to} to={l.to} style={styles.mobileMenuItem(isActive)} onClick={() => setMobileMenuOpen(false)}>
                    <span style={styles.mobileIcon}>{l.icon}</span>
                    <span>{l.label}</span>
                  </Link>
                );
              })}

              <button type="button" onClick={() => { scrollToFooter(); }} style={{ ...styles.mobileMenuItem(false), marginTop: 8 }}>
                <FaEnvelope style={styles.mobileIcon} /> <span> Contact Us</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}
