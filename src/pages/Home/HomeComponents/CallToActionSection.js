import React from "react";
import { motion } from "framer-motion";

export default function CallToActionSection() {
  return (
    <section style={styles.section} aria-labelledby="cta-heading">
      {/* Tech-themed background with code particles */}
      <div style={styles.techBackground}>
        <motion.svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          style={styles.circuitSvg}
          animate={{
            x: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <defs>
            <linearGradient id="circuitGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#64ffda" />
              <stop offset="50%" stopColor="#00c9ff" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(100,255,218,0.1)" strokeWidth="0.5"/>
            </pattern>
          </defs>

          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Circuit lines */}
          <motion.path
            d="M0,60 Q300,30 600,60 T1200,60"
            fill="none"
            stroke="url(#circuitGradient)"
            strokeWidth="2"
            strokeOpacity="0.3"
            animate={{
              d: [
                "M0,60 Q300,30 600,60 T1200,60",
                "M0,50 Q300,80 600,50 T1200,50",
                "M0,70 Q300,40 600,70 T1200,70",
                "M0,60 Q300,30 600,60 T1200,60"
              ]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.svg>

        {/* Code particles */}
        {[10, 25, 40, 60, 75, 90].map((left, index) => (
          <motion.div
            key={index}
            style={{ ...styles.codeParticle, left: `${left}%` }}
            animate={{ 
              y: [0, -60, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.6,
              ease: "easeOut"
            }}
          >
            {['</>', '{ }', '=>', '()', '[]', '/*'][index]}
          </motion.div>
        ))}

        {/* Binary rain effect */}
        <div style={styles.binaryRain}>
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                ...styles.binaryDigit,
                left: `${(i * 5) + Math.random() * 5}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
              animate={{
                y: [0, 300],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.div>
          ))}
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.left}>
          <motion.h2 
            id="cta-heading" 
            style={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Let's Build Something Amazing Together
          </motion.h2>

          <motion.p 
            style={styles.description}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            I specialize in creating scalable web applications with modern technologies. 
            Whether you need a full-stack application, API integration, or performance optimization — 
            I deliver clean, efficient code that solves real problems.
          </motion.p>

          <motion.div 
            style={styles.actions}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.button
              style={styles.primaryBtn}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 15px 30px rgba(100, 255, 218, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                window.open("https://github.com/Mfundo-code", "_blank");
              }}
              aria-label="Visit my GitHub profile"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ marginRight: 10 }}>
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  fill="currentColor"
                />
              </svg>
              Visit my GitHub
            </motion.button>
          </motion.div>
        </div>

        <motion.div 
          style={styles.right}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            style={styles.contactCard} 
            role="region" 
            aria-label="Contact information"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div style={styles.codeIconWrap}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M16 18l6-6-6-6M8 6l-6 6 6 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div style={styles.contactContent}>
              <div style={styles.contactText}>Get in touch</div>
              <a href="mailto:mfundoknox@gmail.com" style={styles.email} aria-label="Send email">
                mfundoknox@gmail.com
              </a>
              <div style={styles.small}>Fast response — Let's discuss your project</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    position: "relative",
    overflow: "hidden",
    background: "linear-gradient(135deg, #0a0f1c 0%, #0c1220 50%, #090d18 100%)",
    padding: "60px 20px",
    fontFamily: "'Inter', 'Fira Code', 'JetBrains Mono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, monospace",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  },
  techBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    background: "radial-gradient(circle at 20% 80%, rgba(100, 255, 218, 0.05) 0%, transparent 50%)",
  },
  circuitSvg: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },
  codeParticle: {
    position: "absolute",
    bottom: "10%",
    color: "rgba(100, 255, 218, 0.7)",
    fontSize: "12px",
    fontWeight: "bold",
    fontFamily: "'Fira Code', monospace",
  },
  binaryRain: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  binaryDigit: {
    position: "absolute",
    color: "rgba(100, 255, 218, 0.3)",
    fontSize: "10px",
    fontFamily: "'Fira Code', monospace",
    fontWeight: "bold",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    gap: "30px",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 2,
  },
  left: {
    flex: "1 1 520px",
    minWidth: 280,
  },
  title: {
    fontSize: "clamp(1.8rem, 4vw, 2.2rem)",
    margin: 0,
    color: "#ffffff",
    lineHeight: 1.15,
    fontWeight: 700,
    background: "linear-gradient(135deg, #ffffff 0%, #64ffda 50%, #00c9ff 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 4px 30px rgba(100, 255, 218, 0.3)",
    letterSpacing: "-0.01em",
    marginBottom: "1rem",
    fontFeatureSettings: "'calt' 1, 'ss01' 1",
  },
  description: {
    marginTop: 0,
    color: "rgba(240, 246, 255, 0.85)",
    fontSize: "clamp(0.9rem, 1.8vw, 1rem)",
    maxWidth: 640,
    lineHeight: 1.5,
    fontWeight: 400,
    textShadow: "0 2px 20px rgba(0,0,0,0.3)",
    marginBottom: "1.5rem",
    letterSpacing: "0.01em",
  },
  actions: {
    marginTop: 0,
    display: "flex",
    gap: "0.8rem",
    flexWrap: "wrap",
    alignItems: "center",
  },
  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "14px 28px",
    borderRadius: "50px",
    background: "linear-gradient(135deg, #00c9ff 0%, #64ffda 100%)",
    color: "#0a1128",
    border: "none",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: "0.95rem",
    boxShadow: "0 8px 25px rgba(100, 255, 218, 0.3), 0 0 0 1px rgba(100, 255, 218, 0.1)",
    transition: "all 0.3s ease",
    letterSpacing: "0.01em",
    cursor: "pointer",
    fontFamily: "'Inter', sans-serif",
  },
  right: {
    flex: "0 0 300px",
    minWidth: 260,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    alignItems: "flex-end",
  },
  contactCard: {
    display: "flex",
    gap: "0.8rem",
    alignItems: "center",
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    padding: "16px",
    borderRadius: "16px",
    boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
  },
  codeIconWrap: {
    width: "50px",
    height: "50px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #00c9ff 0%, #64ffda 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 4px 15px rgba(100, 255, 218, 0.3)",
  },
  contactContent: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
    alignItems: "flex-start",
  },
  contactText: {
    fontSize: "0.8rem",
    opacity: 0.95,
    fontWeight: 600,
    color: "rgba(240, 246, 255, 0.9)",
  },
  email: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#64ffda",
    textDecoration: "none",
    lineHeight: 1,
  },
  small: {
    fontSize: "0.75rem",
    opacity: 0.8,
    color: "rgba(240, 246, 255, 0.7)",
  }
};