// src/GlobalComponents/Header.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaProjectDiagram,
  FaBlog,
  FaServicestack,
} from "react-icons/fa";
import LogoB from "../assets/images/LogoB.png";

const Header = ({ cartCount = 0 }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setShowDropdown((s) => !s);
  const toggleMobileMenu = () => setMobileMenuOpen((s) => !s);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img
          src={LogoB}
          alt="Mahlaku Apparel Logo"
          style={styles.logoImage}
          onClick={() => navigate("/")}
        />
      </div>

      {/* Desktop Navigation */}
      {!isMobile && (
        <nav style={styles.nav} aria-label="Primary">
          <Link to="/" style={styles.navButton}>
            Home
          </Link>

          <Link to="/about" style={styles.navButton}>
            About
          </Link>

          <Link to="/services" style={styles.navButton}>
            Services
          </Link>

          <Link to="/projects" style={styles.navButton}>
            Projects
          </Link>

          <Link to="/blog" style={styles.navButton}>
            Blog
          </Link>

          <div style={styles.dropdownContainer}>
            <button
              type="button"
              style={styles.iconButton}
              onClick={toggleDropdown}
              aria-expanded={showDropdown}
              aria-label="More options"
            >
              <FaInfoCircle style={styles.largeIcon} />
            </button>

            {showDropdown && (
              <div style={styles.dropdownMenu} role="menu">
                <Link to="/about" style={styles.dropdownItem} role="menuitem">
                  About Us
                </Link>
                <Link
                  to="/contacts"
                  style={styles.dropdownItem}
                  role="menuitem"
                >
                  Contact Us
                </Link>
              </div>
            )}
          </div>

          <button
            type="button"
            style={styles.iconButton}
            onClick={() => navigate("/contacts")}
            aria-label="Contact"
          >
            <FaEnvelope style={styles.largeIcon} />
            {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
          </button>
        </nav>
      )}

      {/* Mobile Navigation */}
      {isMobile && (
        <div style={styles.mobileNav}>
          <button
            type="button"
            style={styles.mobileCommunicationButton}
            onClick={() => navigate("/contacts")}
            aria-label="Communication"
          >
            <FaEnvelope style={styles.largeIcon} />
            {cartCount > 0 && (
              <span style={styles.mobileCartBadge}>{cartCount}</span>
            )}
          </button>

          <button
            type="button"
            style={styles.mobileMenuButton}
            onClick={toggleMobileMenu}
            aria-label="Menu"
          >
            {mobileMenuOpen ? (
              <FaTimes style={styles.largeIcon} />
            ) : (
              <FaBars style={styles.largeIcon} />
            )}
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && isMobile && (
        <div style={styles.mobileMenuOverlay} onClick={toggleMobileMenu}>
          <div style={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              style={styles.closeButton}
              onClick={toggleMobileMenu}
              aria-label="Close menu"
            >
              <FaTimes style={styles.largeIcon} />
            </button>

            <div style={styles.mobileMenuItems}>
              <Link to="/" style={styles.mobileMenuItem} onClick={toggleMobileMenu}>
                <FaHome style={styles.mobileIcon} /> Home
              </Link>

              <Link
                to="/about"
                style={styles.mobileMenuItem}
                onClick={toggleMobileMenu}
              >
                <FaInfoCircle style={styles.mobileIcon} /> About
              </Link>

              <Link
                to="/services"
                style={styles.mobileMenuItem}
                onClick={toggleMobileMenu}
              >
                <FaServicestack style={styles.mobileIcon} /> Services
              </Link>

              <Link
                to="/projects"
                style={styles.mobileMenuItem}
                onClick={toggleMobileMenu}
              >
                <FaProjectDiagram style={styles.mobileIcon} /> Projects
              </Link>

              <Link
                to="/blog"
                style={styles.mobileMenuItem}
                onClick={toggleMobileMenu}
              >
                <FaBlog style={styles.mobileIcon} /> Blog
              </Link>

              <Link
                to="/contacts"
                style={styles.mobileMenuItem}
                onClick={toggleMobileMenu}
              >
                <FaEnvelope style={styles.mobileIcon} /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const styles = {
  header: {
    background: "linear-gradient(to right, #e6f7ff, #ffffff)",
    color: "#2c3e50",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 100,
    height: "60px",
    borderBottom: "1px solid #d1e8ff",
  },
  logoContainer: {
    flex: 1,
    display: "flex",
    alignItems: "center",
  },
  logoImage: {
    height: "40px",
    cursor: "pointer",
    maxWidth: "100%",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  navButton: {
    backgroundColor: "#4e73df",
    color: "white",
    textDecoration: "none",
    borderRadius: "30px",
    padding: "8px 18px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  iconButton: {
    background: "none",
    border: "none",
    color: "#4e73df",
    padding: "8px",
    borderRadius: "50%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    transition: "all 0.3s ease",
    fontSize: "24px",
    width: "40px",
    height: "40px",
  },
  largeIcon: {
    fontSize: "24px",
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdownMenu: {
    position: "absolute",
    top: "100%",
    right: 0,
    backgroundColor: "white",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    minWidth: "180px",
    zIndex: 100,
    padding: "10px 0",
    border: "1px solid #e3e6f0",
  },
  dropdownItem: {
    display: "block",
    padding: "10px 20px",
    textDecoration: "none",
    color: "#4e73df",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  cartBadge: {
    backgroundColor: "#e74a3b",
    color: "white",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    position: "absolute",
    top: "-5px",
    right: "-5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  mobileNav: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  mobileMenuButton: {
    background: "none",
    border: "none",
    color: "#4e73df",
    cursor: "pointer",
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    transition: "all 0.3s ease",
  },
  mobileCommunicationButton: {
    background: "none",
    border: "none",
    color: "#4e73df",
    cursor: "pointer",
    padding: "8px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    transition: "all 0.3s ease",
  },
  mobileCartBadge: {
    backgroundColor: "#e74a3b",
    color: "white",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "10px",
    position: "absolute",
    top: "-5px",
    right: "-5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  },
  mobileMenuOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 99,
    display: "flex",
    justifyContent: "flex-end",
  },
  mobileMenu: {
    width: "280px",
    height: "100%",
    backgroundColor: "white",
    boxShadow: "-2px 0 15px rgba(0,0,0,0.1)",
    padding: "20px",
    position: "relative",
    overflowY: "auto",
  },
  closeButton: {
    background: "none",
    border: "none",
    color: "#4e73df",
    cursor: "pointer",
    position: "absolute",
    top: "15px",
    right: "15px",
    fontSize: "24px",
  },
  mobileMenuItems: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "40px",
  },
  mobileMenuItem: {
    padding: "15px 20px",
    textDecoration: "none",
    color: "#4e73df",
    display: "flex",
    alignItems: "center",
    borderRadius: "8px",
    transition: "all 0.3s",
    fontWeight: "500",
    backgroundColor: "#f8f9fc",
  },
  mobileIcon: {
    marginRight: "15px",
    fontSize: "20px",
    color: "#4e73df",
    width: "24px",
    textAlign: "center",
  },
};

export default Header;
