import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function AboutMe() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // recruiter-focused data pulled from your portfolio
  const stats = [
    { number: "1+", label: "Years Experience" },
    { number: "10+", label: "Projects Completed" },
    { number: "15+", label: "Happy Clients" }
  ];

  const availability = [
    "Short Gigs",
    "Short to Long Term Contracts",
    "Fulltime"
  ];

  const services = [
    "Web Development — responsive websites & web apps",
    "Mobile Apps — cross-platform with React Native",
    "Desktop Applications — Electron (Windows, macOS, Linux)",
    "Backend & API Development — Django, .NET, RESTful APIs",
  ];

  const techStack = [
    "JavaScript", "React", "React Native", "Python Django",
    "C# .NET", "HTML5", "CSS3", "SQL Databases"
  ];

  const hostingPlatforms = ["AWS Amplify", "PythonAnywhere", "Contabo"];

  const featuredProjects = [
  
    {
      name: "Mobile Apps",
      summary:
        "Cross-platform mobile apps. Used react native, swift and koltin"
    },
    {
      name: "Websites",

      summary:
        "Websites, I have mantained dns, seo and domains"
    }
  ];

  // --- Canvas animation (unchanged except kept inside the same effect) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let nodes = [];
    let connections = [];
    const mouse = { x: 0, y: 0, active: false };

    const techSymbols = ['⚡', '🚀', '💻', '🔗', '🌐', '📱', '🔧', '🎯', '✨', '🌟'];

    class Node {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseSize = Math.random() * 6 + 4;
        this.size = this.baseSize;
        this.symbol = techSymbols[Math.floor(Math.random() * techSymbols.length)];
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.opacity = 0.1 + Math.random() * 0.2;
        this.hue = Math.random() * 60 + 200;
      }

      update() {
        this.size = this.baseSize + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 2;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 3
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, ${this.opacity * 0.3})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 70%, 60%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        if (Math.random() > 0.7) {
          ctx.fillStyle = `hsla(${this.hue}, 70%, 100%, ${this.opacity * 1.5})`;
          ctx.font = `${this.size * 1.2}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(this.symbol, this.x, this.y);
        }
      }
    }

    class Connection {
      constructor(node1, node2) {
        this.node1 = node1;
        this.node2 = node2;
        this.progress = Math.random() * Math.PI * 2;
        this.speed = 0.02 + Math.random() * 0.02;
        this.length = Math.sqrt(
          Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2)
        );
      }

      update() {
        this.progress += this.speed;
      }

      draw() {
        const alpha = (Math.sin(this.progress) + 1) * 0.3 + 0.2;

        const gradient = ctx.createLinearGradient(
          this.node1.x, this.node1.y,
          this.node2.x, this.node2.y
        );
        gradient.addColorStop(0, `hsla(${this.node1.hue}, 70%, 60%, ${alpha * 0.3})`);
        gradient.addColorStop(0.5, `hsla(${(this.node1.hue + this.node2.hue) / 2}, 80%, 70%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${this.node2.hue}, 70%, 60%, ${alpha * 0.3})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.lineDashOffset = -this.progress * 10;

        ctx.beginPath();
        ctx.moveTo(this.node1.x, this.node1.y);
        ctx.lineTo(this.node2.x, this.node2.y);
        ctx.stroke();

        ctx.setLineDash([]);
      }
    }

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const initNodes = () => {
      nodes = [];
      const nodeCount = Math.min(25, Math.floor((canvas.width * canvas.height) / 8000));

      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }
    };

    const updateConnections = () => {
      connections = [];
      const maxDistance = 150;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(nodes[j].x - nodes[i].x, 2) + Math.pow(nodes[j].y - nodes[i].y, 2)
          );

          if (distance < maxDistance && Math.random() > 0.3) {
            connections.push(new Connection(nodes[i], nodes[j]));
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.03)';
      ctx.lineWidth = 0.5;
      const gridSize = 40;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      connections.forEach(connection => {
        connection.update();
        connection.draw();
      });

      nodes.forEach(node => {
        if (mouse.active) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const force = (100 - distance) / 100;
            node.x -= dx * force * 0.02;
            node.y -= dy * force * 0.02;
          }
        }

        node.update();
        node.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const init = () => {
      resizeCanvas();
      initNodes();
      updateConnections();
      animate();
    };

    init();

    window.addEventListener('resize', () => {
      resizeCanvas();
      initNodes();
      updateConnections();
    });

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // --- Render UI ---
  return (
    <section ref={containerRef} style={styles.section} aria-labelledby="about-heading">
      <canvas ref={canvasRef} style={styles.canvas} aria-hidden="true" />

      <div style={styles.container}>
        <div style={styles.content}>
          {/* Left: richer text + recruiter info */}
          <motion.div
            style={styles.left}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.h2
              id="about-heading"
              style={styles.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              About Me
            </motion.h2>

            <motion.p
              style={styles.description}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              I'm a full-stack developer building modern web, mobile and desktop solutions.
              I deliver production-ready apps using JavaScript (React, React Native), Python Django, and C#/.NET.
              I've worked with 15+ clients and delivered 10+ projects across platforms — focusing on maintainability,
              clean APIs, and user-centered design.
            </motion.p>

            {/* Recruiter quick facts */}
            <div style={styles.quickFacts}>
              <div style={styles.factsLeft}>
                {stats.map((s, i) => (
                  <div key={i} style={styles.fact}>
                    <div style={styles.factNumber}>{s.number}</div>
                    <div style={styles.factLabel}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={styles.factsRight}>
                <h4 style={styles.smallTitle}>Availability</h4>
                <div style={styles.availabilityTags}>
                  {availability.map((a, idx) => (
                    <span key={idx} style={styles.availabilityTagSmall}>{a}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience */}
            <motion.div
              style={styles.sectionCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h3 style={styles.cardTitle}>Experience</h3>
              <div style={styles.experienceItem}>
                <div style={styles.experienceHeader}>
                  <strong>Freelance Full-Stack Developer</strong>
                  <span style={styles.experienceDate}>2024 - Present</span>
                </div>
                <ul style={styles.bullets}>
                  <li>Designed and delivered custom solutions for 15+ clients (mobile, desktop, websites)</li>
                  <li>Implemented backends with .NET Framework and Django; built RESTful APIs</li>
                  <li>Managed deployments, maintained client relationships and project timelines</li>
                </ul>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              style={styles.sectionCard}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <h3 style={styles.cardTitle}>Services</h3>
              <ul style={styles.serviceList}>
                {services.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </motion.div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 14, flexWrap: 'wrap' }}>

              <a
                href="mailto:mfundoknox@gmail.com"
                style={styles.ctaSecondary}
              >
                Contact — mfundoknox@gmail.com
              </a>

              <a
                href="https://github.com/Mfundo-code"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.ctaGhost}
              >
                View GitHub
              </a>
            </div>
          </motion.div>

          {/* Right: stats + tech + featured projects */}
          <motion.div
            style={styles.right}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  style={styles.statCard}
                  initial={{ opacity: 0, y: 30, rotateX: 90 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <motion.div
                    style={styles.statNumber}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.6 + index * 0.2,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <motion.div
                    style={styles.statLabel}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                  >
                    {stat.label}
                  </motion.div>

                  <motion.div
                    style={styles.cardAccent}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: 0.7 + index * 0.2 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Tech Stack */}
            <motion.div
              style={{ ...styles.sectionCard, marginTop: 20, width: '100%' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
            >
              <h4 style={styles.cardTitle}>Technical Expertise</h4>
              <div style={styles.stackGrid}>
                {techStack.map((t, i) => (
                  <div key={i} style={styles.techBadge}>{t}</div>
                ))}
              </div>

              <div style={{ marginTop: 12 }}>
                <strong>Hosting:</strong> {hostingPlatforms.join(" • ")}
              </div>
            </motion.div>

            {/* Featured Projects */}
            <motion.div
              style={{ ...styles.sectionCard, marginTop: 18, width: '100%' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
            >
              <h4 style={styles.cardTitle}>Featured Projects</h4>
              <div>
                {featuredProjects.map((p, i) => (
                  <div key={i} style={styles.projectItem}>
                    <a href={p.href} target="_blank" rel="noopener noreferrer" style={styles.projectLink}>
                      {p.name}
                    </a>
                    <div style={styles.projectSummary}>{p.summary}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick contact */}
            <div style={{ marginTop: 14, width: '100%', textAlign: 'center' }}>
              <small style={{ color: '#64748b' }}>
                Want a CV or full case studies? Reply here or email <a href="mailto:mfundoknox@gmail.com">mfundoknox@gmail.com</a>
              </small>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    borderRadius: '24px',
    margin: '20px',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.08)',
    minHeight: '420px',
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    opacity: 0.7,
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  content: {
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  left: {
    flex: '1 1 560px',
    minWidth: 300,
  },
  right: {
    flex: '1 1 420px',
    minWidth: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 'clamp(2rem, 4vw, 2.6rem)',
    fontWeight: 800,
    color: '#1e293b',
    margin: '0 0 12px 0',
    lineHeight: 1.05,
    background: 'linear-gradient(135deg, #1e293b 0%, #475569 50%, #6366f1 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 4px 30px rgba(99, 102, 241, 0.08)',
  },
  description: {
    fontSize: '1.05rem',
    lineHeight: 1.6,
    color: '#475569',
    margin: '0 0 18px 0',
    fontWeight: 400,
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    padding: '14px',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.8)',
  },
  quickFacts: {
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  factsLeft: {
    display: 'flex',
    gap: 12,
    alignItems: 'center',
  },
  fact: {
    textAlign: 'center',
    padding: '8px 12px',
    background: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    border: '1px solid rgba(0,0,0,0.03)',
    boxShadow: '0 8px 20px rgba(99, 102, 241, 0.04)'
  },
  factNumber: {
    fontSize: '1.25rem',
    fontWeight: 800,
    color: '#6366f1',
  },
  factLabel: {
    fontSize: '0.85rem',
    color: '#64748b',
    fontWeight: 600,
  },
  factsRight: {
    minWidth: 180,
  },
  smallTitle: {
    fontSize: '0.95rem',
    margin: '0 0 8px 0',
    color: '#1f2937',
    fontWeight: 700,
  },
  availabilityTags: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  },
  availabilityTagSmall: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    padding: '6px 10px',
    borderRadius: 14,
    fontSize: '0.78rem',
    fontWeight: 700,
  },
  sectionCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '14px',
    borderRadius: 12,
    marginTop: 12,
    border: '1px solid rgba(255,255,255,0.9)'
  },
  cardTitle: {
    margin: '0 0 8px 0',
    fontSize: '1rem',
    fontWeight: 800,
    color: '#0f172a'
  },
  experienceItem: {
    marginTop: 6,
  },
  experienceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  experienceDate: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: 600
  },
  bullets: {
    marginTop: 8,
    paddingLeft: 20
  },
  serviceList: {
    listStyle: 'disc',
    marginLeft: 18,
    paddingLeft: 6
  },
  ctaPrimary: {
    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    color: 'white',
    padding: '10px 16px',
    borderRadius: 10,
    fontWeight: 700,
    textDecoration: 'none'
  },
  ctaSecondary: {
    background: 'white',
    color: '#1f2937',
    padding: '10px 14px',
    borderRadius: 10,
    fontWeight: 700,
    border: '1px solid rgba(99,102,241,0.12)',
    textDecoration: 'none'
  },
  ctaGhost: {
    background: 'transparent',
    color: '#475569',
    padding: '10px 14px',
    borderRadius: 10,
    fontWeight: 700,
    textDecoration: 'none',
    border: '1px dashed rgba(99,102,241,0.12)'
  },
  statsGrid: {
    display: 'grid',
    gap: '14px',
    width: '100%',
    maxWidth: '360px',
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    padding: '18px',
    borderRadius: '12px',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.9)',
    boxShadow: '0 10px 28px rgba(0,0,0,0.06)',
    position: 'relative',
    overflow: 'hidden'
  },
  statNumber: {
    fontSize: '2rem',
    fontWeight: 900,
    color: '#6366f1',
    marginBottom: 6
  },
  statLabel: {
    fontSize: '0.95rem',
    color: '#64748b',
    fontWeight: 600
  },
  cardAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
    borderRadius: '0 0 12px 12px'
  },
  stackGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8
  },
  techBadge: {
    padding: '6px 8px',
    borderRadius: 10,
    background: 'rgba(99,102,241,0.06)',
    border: '1px solid rgba(99,102,241,0.08)',
    fontWeight: 700,
    fontSize: '0.85rem',
    color: '#334155'
  },
  projectItem: {
    marginTop: 10,
    paddingTop: 8,
    borderTop: '1px dashed rgba(15,23,42,0.04)'
  },
  projectLink: {
    fontWeight: 800,
    textDecoration: 'none',
    color: '#111827'
  },
  projectSummary: {
    fontSize: '0.92rem',
    color: '#475569',
    marginTop: 6
  }
};
