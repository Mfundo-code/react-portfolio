// ServicesComponents/ServicesHero.js
import React from "react";
import { motion } from "framer-motion";

export default function ServicesHero() {
  return (
    <section style={styles.heroSection}>
      {/* Animated background with code particles */}
      <div style={styles.animatedBackground}>
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            style={styles.codeParticle}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {['</>', '{ }', '=>', '()', '[]', '/*', 'npm', 'git', 'ssh', 'db'][i % 10]}
          </motion.div>
        ))}
      </div>

      <div style={styles.container}>
        <motion.div
          style={styles.content}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            style={styles.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Explore My Projects!
          </motion.h1>
          
          <motion.p 
            style={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From concept to production — I build scalable web & mobile applications 
            with robust infrastructure, security, and performance optimization.
          </motion.p>
        </motion.div>

        {/* Server visualization */}
        <motion.div 
          style={styles.serverVisualization}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div style={styles.server}>
            <div style={styles.serverLights}>
              <div style={styles.light}></div>
              <div style={styles.light}></div>
              <div style={styles.light}></div>
            </div>
            <div style={styles.serverActivity}>
              <motion.div 
                style={styles.activityBar}
                animate={{ height: ['20%', '80%', '20%'] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                style={styles.activityBar}
                animate={{ height: ['40%', '90%', '40%'] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                style={styles.activityBar}
                animate={{ height: ['60%', '95%', '60%'] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
            </div>
          </div>
          <div style={styles.serverLabel}>Live Server Monitoring</div>
        </motion.div>
      </div>
    </section>
  );
}

const styles = {
  heroSection: {
    background: "linear-gradient(135deg, #0a0f1c 0%, #0c1220 50%, #090d18 100%)",
    color: "#ffffff",
    padding: "100px 20px 80px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: "relative",
    overflow: "hidden",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
  },
  animatedBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
  },
  codeParticle: {
    position: "absolute",
    color: "rgba(100, 255, 218, 0.4)",
    fontSize: "14px",
    fontFamily: "'Fira Code', monospace",
    fontWeight: "bold",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: "60px",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 2,
  },
  content: {
    flex: "1 1 600px",
    minWidth: 300,
  },
  title: {
    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
    fontWeight: 800,
    lineHeight: 1.1,
    margin: "0 0 24px 0",
    background: "linear-gradient(135deg, #ffffff 0%, #64ffda 30%, #00c9ff 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 4px 30px rgba(100, 255, 218, 0.3)",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
    lineHeight: 1.6,
    color: "rgba(240, 246, 255, 0.85)",
    margin: "0 0 40px 0",
    maxWidth: 600,
  },
  serverVisualization: {
    flex: "0 1 300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  server: {
    width: "120px",
    height: "200px",
    background: "linear-gradient(135deg, #1a1f2e 0%, #151925 100%)",
    borderRadius: "12px",
    border: "1px solid rgba(100, 255, 218, 0.2)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
  serverLights: {
    display: "flex",
    gap: "8px",
  },
  light: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#64ffda",
    boxShadow: "0 0 10px rgba(100, 255, 218, 0.5)",
  },
  serverActivity: {
    display: "flex",
    gap: "8px",
    alignItems: "flex-end",
    height: "120px",
  },
  activityBar: {
    width: "20px",
    background: "linear-gradient(to top, #64ffda, #00c9ff)",
    borderRadius: "4px 4px 0 0",
    opacity: 0.8,
  },
  serverLabel: {
    color: "rgba(240, 246, 255, 0.7)",
    fontSize: "0.9rem",
    fontWeight: 500,
  },
};