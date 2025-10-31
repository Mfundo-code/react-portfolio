// ServicesComponents/TechSkills.js
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function TechSkills() {
  const [activeCategory, setActiveCategory] = useState("fullstack");
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  const skillCategories = {
    fullstack: {
      title: "Full-Stack Development",
      icon: "🚀",
      color: "#6366f1",
      skills: [
        {
          name: "Frontend",
          level: 92,
          description: "Building modern, scalable web applications with React, Vue, and TypeScript",
          projects: ["Deployed projects", "E-commerce Platforms", "Admin Dashboards"],
          tools: ["Vue", "TypeScript", "Tailwind CSS", "React"]
        },
        {
          name: "Backend",
          level: 88,
          description: "RESTful APIs, server-side rendering, and database management",
          projects: ["Custom APIs", "Authentication Systems", "Real-time Features"],
          tools: [".NET", "Django", "SQLs", "Rest Framework"]
        },
        {
          name: "Database Management",
          level: 90,
          description: "Worked on databases to store, organize and manage data using sql commands",
          projects: ["Design Tables and connect databases", "Handling user data and logins",],
          tools: ["My SQL", "PostgreSQL", "SQLite", "NoSQL databases"]
        }
      ]
    },
    mobile: {
      title: "Mobile Development",
      icon: "📱",
      color: "#6366f1",
      skills: [
        {
          name: "React Native",
          level: 88,
          description: "Cross-platform mobile apps with native performance and animations",
          projects: ["E-commerce Apps", "Social Media Apps", "Productivity Tools"],
          tools: ["React Native CLI", "Expo", "Native Wind", "React Navigation"]
        },
        {
          name: "Kotlin & Swift",
          level: 60,
          description: "Cross-platform mobile apps with reactt native. I use swift and kolten mainly for native configuration and intergration when needed. Or on heavy apps",
          projects: ["Performance-focused Apps", "Handling system permitions"],
          tools: ["Kotlin", "Swift", "Android Studio", "Gradle"]
        },
        {
          name: "Mobile Debugging",
          level: 85,
          description: "Advanced debugging, performance optimization, and crash analytics",
          projects: ["Memory Optimization", "Performance Tuning", "Crash Reporting"],
          tools: ["React Native Debugger", "SDK tools"]
        }
      ]
    },
    devops: {
      title: "DevOps & Infrastructure",
      icon: "⚙️",
      color: "#6366f1",
      skills: [
        {
          name: "VPS Management",
          level: 87,
          description: "Full server setup, maintenance, and optimization on Contabo VPS",
          projects: ["Wabsites Deployment", "Server Security", "Hosting Domian For mailcow"],
          tools: ["Ubuntu 22.04", "SSH", "Systemd", "Firewall Configuration"]
        },
        {
          name: "Nginx & Reverse Proxy",
          level: 85,
          description: "Web server configuration, SSL termination, and load balancing",
          projects: ["Domain Routing", "SSL Setup"],
          tools: ["Nginx", "SSL Certificates", "Reverse Proxy"]
        },
        {
          name: "DNS & Domain Management",
          level: 90,
          description: "Complete DNS configuration and domain management for multiple services",
          projects: ["DNS set up", "Domain Setup", "Email Records"],
          tools: ["DNS adress", "DNS Records", "DNS Configuration"]
        }
      ]
    },
    email: {
      title: "Email & Security",
      icon: "📧",
      color: "#6366f1",
      skills: [
        {
          name: "Mail Server Setup",
          level: 84,
          description: "Self-hosted professional email with Mailcow and proper security",
          projects: ["mail.mfundodev.com", "Professional Email", "Spam Protection"],
          tools: ["Mailcow", "Mail Hosting Setvices"]
        },
        {
          name: "Email Security",
          level: 82,
          description: "SPF, DKIM, DMARC configuration and email deliverability optimization",
          projects: ["Email Authentication", "Security Headers", "Delivery Rates"],
          tools: ["SPF Records", "DKIM Keys", "DMARC Policies", "TLS Encryption"]
        },
        {
          name: "SSL & Security",
          level: 86,
          description: "SSL certificate management and server security hardening",
          projects: ["HTTPS Enforcement", "Security Headers", "Vulnerability Scanning"],
          tools: ["Let's Encrypt", "Certbot", "SSL Labs"]
        }
      ]
    },
    tools: {
      title: "Tools & Technologies",
      icon: "🛠️",
      color: "#6366f1",
      skills: [
        {
          name: "Animation & UI",
          level: 85,
          description: "Beautiful interfaces with smooth animations and micro-interactions",
          projects: ["Interactive UIs", "Animated Components", "User Experience"],
          tools: ["Framer Motion", "CSS Animations", "Canvas API",]
        },
        {
          name: "Design & Prototyping",
          level: 78,
          description: "UI/UX design, prototyping, and design system implementation",
          projects: ["Design Systems", "Prototypes", "User Testing"],
          tools: ["Figma", "Canva", "Adobe XD", "Prototype Tools"]
        },
        {
          name: "Development Tools",
          level: 90,
          description: "Comprehensive development environment and workflow optimization",
          projects: ["CI/CD Setup", "Development Workflow", "Code Quality"],
          tools: ["Git", "VS Code"]
        }
      ]
    }
  };

  // Neural Network Background Animation (same as AboutMe)
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

      // Draw subtle background grid
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

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
      minHeight: '600px',
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
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    title: {
      fontSize: "clamp(2rem, 4vw, 3rem)",
      fontWeight: 800,
      background: "linear-gradient(135deg, #1e293b 0%, #475569 50%, #6366f1 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      margin: "0 0 16px 0",
      textShadow: "0 4px 30px rgba(99, 102, 241, 0.1)",
    },
    subtitle: {
      fontSize: "1.1rem",
      color: "#475569",
      maxWidth: 600,
      margin: "0 auto",
      lineHeight: 1.6,
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(10px)",
      padding: "16px",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.8)",
    },
    categories: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "40px",
    },
    categoryButton: (isActive, color) => ({
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "12px 20px",
      borderRadius: "50px",
      border: "none",
      background: isActive 
        ? `linear-gradient(135deg, ${color} 0%, #8b5cf6 100%)` 
        : "rgba(255, 255, 255, 0.8)",
      color: isActive ? "white" : "#475569",
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontWeight: 600,
      fontSize: "0.95rem",
      backdropFilter: "blur(10px)",
      border: `1px solid ${isActive ? color : 'rgba(255,255,255,0.9)'}`,
      transform: isActive ? "scale(1.05)" : "scale(1)",
      boxShadow: isActive 
        ? `0 8px 25px ${color}40, 0 0 0 1px ${color}20` 
        : "0 4px 15px rgba(0,0,0,0.08)",
    }),
    skillsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "24px",
    },
    skillCard: (color) => ({
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(15px)",
      border: "1px solid rgba(255,255,255,0.9)",
      borderRadius: "16px",
      padding: "28px",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    }),
    skillHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "16px",
    },
    skillName: (color) => ({
      fontSize: "1.3rem",
      fontWeight: 700,
      margin: "0 0 8px 0",
      color: color,
    }),
    skillLevel: {
      fontSize: "0.9rem",
      color: "#64748b",
      fontWeight: 600,
    },
    skillDescription: {
      color: "#475569",
      fontSize: "0.95rem",
      lineHeight: 1.5,
      marginBottom: "20px",
    },
    progressBar: {
      height: "6px",
      background: "rgba(0,0,0,0.1)",
      borderRadius: "3px",
      overflow: "hidden",
      marginBottom: "20px",
    },
    progressFill: (level, color) => ({
      height: "100%",
      width: `${level}%`,
      background: `linear-gradient(90deg, ${color}, #8b5cf6)`,
      borderRadius: "3px",
      transition: "width 1s ease-in-out",
    }),
    projectsSection: {
      marginTop: "20px",
    },
    sectionTitle: {
      fontSize: "0.9rem",
      fontWeight: 600,
      color: "#334155",
      margin: "0 0 12px 0",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    tags: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
    },
    tag: (color) => ({
      padding: "6px 12px",
      background: `linear-gradient(135deg, ${color}20, ${color}10)`,
      border: `1px solid ${color}30`,
      borderRadius: "20px",
      fontSize: "0.8rem",
      color: color,
      fontWeight: 500,
    }),
  };

  return (
    <section ref={containerRef} style={styles.section} aria-labelledby="skills-heading">
      {/* Neural Network Animation Background */}
      <canvas 
        ref={canvasRef} 
        style={styles.canvas}
        aria-hidden="true"
      />

      <div style={styles.container}>
        <motion.div 
          style={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="skills-heading" style={styles.title}>
            Technical Expertise
          </h2>
          <p style={styles.subtitle}>
            From full-stack development to server infrastructure and mobile apps - 
            comprehensive skills honed through real-world projects and continuous learning
          </p>
        </motion.div>

        <motion.div 
          style={styles.categories}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {Object.entries(skillCategories).map(([key, category]) => (
            <motion.button
              key={key}
              style={styles.categoryButton(
                activeCategory === key,
                category.color
              )}
              onClick={() => setActiveCategory(key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category.icon}</span>
              {category.title}
            </motion.button>
          ))}
        </motion.div>

        <motion.div
          style={styles.skillsGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          key={activeCategory}
        >
          {skillCategories[activeCategory].skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              style={styles.skillCard(skillCategories[activeCategory].color)}
              variants={itemVariants}
              whileHover={{ 
                y: -5,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)"
              }}
            >
              <div style={styles.skillHeader}>
                <div>
                  <h3 style={styles.skillName(skillCategories[activeCategory].color)}>
                    {skill.name}
                  </h3>
                  <div style={styles.skillLevel}>
                    {skill.level}% Proficiency
                  </div>
                </div>
              </div>

              <p style={styles.skillDescription}>
                {skill.description}
              </p>

              <div style={styles.progressBar}>
                <motion.div 
                  style={styles.progressFill(skill.level, skillCategories[activeCategory].color)}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>

              <div style={styles.projectsSection}>
                <h4 style={styles.sectionTitle}>Project Experience</h4>
                <div style={styles.tags}>
                  {skill.projects.map(project => (
                    <span key={project} style={styles.tag(skillCategories[activeCategory].color)}>
                      {project}
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.projectsSection}>
                <h4 style={styles.sectionTitle}>Tools & Technologies</h4>
                <div style={styles.tags}>
                  {skill.tools.map(tool => (
                    <span key={tool} style={styles.tag(skillCategories[activeCategory].color)}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}