import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // API Configuration - Change this for testing
  const API_URL = process.env.NODE_ENV === 'development' 
    ? 'http://127.0.0.1:8000/api/contact/'
    : 'https://www.mfundodev.com/api/contact/';

  useEffect(() => {
    function checkMobile() {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    }
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const fastLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Tech-Expertise", path: "/services" }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/Mfundo-code",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" 
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mfundo-dlamini-b95028302",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" 
                stroke="currentColor" strokeWidth="2"/>
          <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2"/>
          <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/profile.php?id=61550078235370",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" 
                stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/27761353762",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" 
                fill="currentColor"/>
        </svg>
      )
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all fields.' });
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address.' });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting to:', API_URL);
      
      const csrfToken = getCookie('csrftoken');
      console.log('CSRF Token:', csrfToken ? 'Found' : 'Not found');

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      };

      // Only add CSRF token if it exists
      if (csrfToken) {
        requestOptions.headers['X-CSRFToken'] = csrfToken;
      }

      const response = await fetch(API_URL, requestOptions);
      
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: 'Thank you for your message! I have received it and will respond to you personally soon.' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Server error:', response.status, errorData);
        
        let errorMessage = 'There was an error sending your message. Please try again.';
        
        if (response.status === 403) {
          errorMessage = 'CSRF verification failed. Please refresh the page and try again.';
        } else if (response.status === 400) {
          errorMessage = 'Please check your input and try again.';
          if (errorData.email) {
            errorMessage = `Email error: ${errorData.email[0]}`;
          }
        } else if (response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (response.status === 0 || !response.status) {
          errorMessage = 'Cannot connect to server. Please check your internet connection.';
        }
        
        setSubmitStatus({ type: 'error', message: errorMessage });
      }
    } catch (error) {
      console.error('Network error:', error);
      
      let errorMessage = 'There was a network error. Please check your connection and try again.';
      
      if (error.message.includes('CORS')) {
        errorMessage = 'Connection blocked by browser security. Please contact support.';
      }
      
      setSubmitStatus({ type: 'error', message: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Canvas animation
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
        this.baseSize = Math.random() * 8 + 4;
        this.size = this.baseSize;
        this.symbol = techSymbols[Math.floor(Math.random() * techSymbols.length)];
        this.pulseSpeed = 0.03 + Math.random() * 0.03;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.opacity = 0.2 + Math.random() * 0.3;
        this.hue = Math.random() * 60 + 200;
        this.glowIntensity = 0.5 + Math.random() * 0.5;
      }

      update() {
        this.size = this.baseSize + Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 3;
        
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
          this.x, this.y, this.size * 4
        );
        gradient.addColorStop(0, `hsla(${this.hue}, 80%, 70%, ${this.opacity * this.glowIntensity})`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 80%, 70%, ${this.opacity * this.glowIntensity * 0.5})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 80%, 70%, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${this.hue}, 80%, 70%, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        if (Math.random() > 0.5) {
          ctx.fillStyle = `hsla(${this.hue}, 100%, 95%, ${this.opacity * 1.5})`;
          ctx.font = `${this.size * 1.4}px Arial`;
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
        this.speed = 0.03 + Math.random() * 0.03;
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
        gradient.addColorStop(0, `hsla(${this.node1.hue}, 80%, 70%, ${alpha * 0.6})`);
        gradient.addColorStop(0.5, `hsla(${(this.node1.hue + this.node2.hue) / 2}, 90%, 80%, ${alpha * 0.8})`);
        gradient.addColorStop(1, `hsla(${this.node2.hue}, 80%, 70%, ${alpha * 0.6})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.lineDashOffset = -this.progress * 15;

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
      const nodeCount = Math.min(35, Math.floor((canvas.width * canvas.height) / 5000));
      
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node(
          Math.random() * canvas.width,
          Math.random() * canvas.height
        ));
      }
    };

    const updateConnections = () => {
      connections = [];
      const maxDistance = 180;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const distance = Math.sqrt(
            Math.pow(nodes[j].x - nodes[i].x, 2) + Math.pow(nodes[j].y - nodes[i].y, 2)
          );
          
          if (distance < maxDistance && Math.random() > 0.2) {
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

      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)';
      ctx.lineWidth = 0.8;
      const gridSize = 50;

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
          
          if (distance < 120) {
            const force = (120 - distance) / 120;
            node.x -= dx * force * 0.02;
            node.y -= dy * force * 0.02;
            node.opacity = Math.min(0.8, node.opacity + 0.02);
          } else {
            node.opacity = Math.max(0.2, node.opacity - 0.01);
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

  const styles = {
    container: {
      background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%)",
      color: "#1a1a1a",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      borderTop: "1px solid rgba(0, 0, 0, 0.1)",
      position: "relative",
      paddingTop: isMobile ? "120px" : "200px",
      overflow: "hidden",
      borderRadius: "24px 24px 0 0",
      margin: isMobile ? "10px 10px 0 10px" : "20px 20px 0 20px",
      border: "1px solid rgba(255, 255, 255, 0.9)",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.08)",
    },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      opacity: 0.9,
    },
    mainContent: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "30% 1fr",
      gap: isMobile ? "40px" : "60px",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile ? "0 20px 40px" : "0 40px 60px",
      position: "relative",
      zIndex: 2,
    },
    contactSection: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      position: isMobile ? "relative" : "absolute",
      top: isMobile ? "0" : "-200px",
      left: isMobile ? "0" : "40px",
      width: isMobile ? "100%" : "calc(30% - 70px)",
      maxWidth: isMobile ? "100%" : "380px",
      zIndex: 10,
      alignItems: "center",
    },
    formSpacer: {
      minHeight: isMobile ? "0" : "1px",
      display: isMobile ? "none" : "block",
    },
    sectionTitle: {
      fontSize: isMobile ? "1.1rem" : "1.3rem",
      fontWeight: "700",
      margin: "0 0 15px 0",
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textAlign: "center",
      width: "100%",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      background: "linear-gradient(135deg, rgba(248, 249, 255, 0.95) 0%, rgba(255, 255, 255, 0.98) 100%)",
      backdropFilter: "blur(15px)",
      padding: isMobile ? "20px" : "24px",
      borderRadius: "20px",
      boxShadow: "0 20px 60px rgba(99, 102, 241, 0.2), 0 10px 30px rgba(0, 0, 0, 0.15)",
      border: "1px solid rgba(99, 102, 241, 0.2)",
      width: "100%",
    },
    input: {
      padding: isMobile ? "10px 12px" : "12px 14px",
      borderRadius: "10px",
      border: "1px solid #e1e5e9",
      backgroundColor: "#ffffff",
      color: "#333333",
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      fontFamily: "inherit",
      transition: "all 0.3s ease",
      outline: "none",
    },
    textarea: {
      padding: isMobile ? "10px 12px" : "12px 14px",
      borderRadius: "10px",
      border: "1px solid #e1e5e9",
      backgroundColor: "#ffffff",
      color: "#333333",
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      fontFamily: "inherit",
      transition: "all 0.3s ease",
      outline: "none",
      resize: "vertical",
      minHeight: "100px",
    },
    submitButton: {
      padding: isMobile ? "10px 20px" : "12px 24px",
      border: "none",
      borderRadius: "10px",
      background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      color: "#ffffff",
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      fontWeight: "700",
      cursor: "pointer",
      fontFamily: "inherit",
      transition: "all 0.3s ease",
      boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
      marginTop: "6px",
      opacity: isSubmitting ? 0.7 : 1,
      pointerEvents: isSubmitting ? "none" : "auto",
    },
    statusMessage: {
      padding: "10px",
      borderRadius: "8px",
      textAlign: "center",
      fontSize: "0.85rem",
      fontWeight: "600",
      marginTop: "10px",
      background: submitStatus?.type === 'success' ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
      color: submitStatus?.type === 'success' ? "#16a34a" : "#dc2626",
      border: `1px solid ${submitStatus?.type === 'success' ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)"}`,
    },
    socialContainer: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
    },
    socialLinks: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    socialLink: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: isMobile ? "36px" : "40px",
      height: isMobile ? "36px" : "40px",
      borderRadius: "10px",
      background: "rgba(99, 102, 241, 0.15)",
      backdropFilter: "blur(15px)",
      border: "1px solid rgba(99, 102, 241, 0.25)",
      color: "#6366f1",
      textDecoration: "none",
      transition: "all 0.3s ease",
    },
    rightSection: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
      gap: isMobile ? "40px" : "60px",
      paddingTop: isMobile ? "0" : "20px",
    },
    linksColumn: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    linksList: {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    linkButton: {
      display: "block",
      padding: "13.5px 16px",
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(15px)",
      borderRadius: "10px",
      border: "1px solid rgba(99, 102, 241, 0.15)",
      textDecoration: "none",
      color: "#1a1a1a",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    linkButtonContent: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },
    linkButtonText: {
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      fontWeight: "600",
      color: "#1a1a1a",
    },
    linkButtonIcon: {
      color: "#6366f1",
      flexShrink: 0,
    },
    contactColumn: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    contactItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "12px",
      padding: isMobile ? "10px" : "12px",
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(15px)",
      borderRadius: "10px",
      border: "1px solid rgba(99, 102, 241, 0.15)",
    },
    contactIcon: {
      color: "#6366f1",
      flexShrink: 0,
      marginTop: "2px",
    },
    contactLabel: {
      fontSize: isMobile ? "0.7rem" : "0.75rem",
      color: "rgba(26, 26, 26, 0.6)",
      margin: "0 0 3px 0",
    },
    contactValue: {
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      fontWeight: "600",
      color: "#1a1a1a",
      textDecoration: "none",
      transition: "color 0.3s ease",
    },
    bottomBar: {
      borderTop: "4px solid",
      borderImage: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%) 1",
      background: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(15px)",
      padding: isMobile ? "20px" : "25px 40px",
      textAlign: "center",
      position: "relative",
      zIndex: 2,
    },
    copyright: {
      margin: "0",
      color: "rgba(26, 26, 26, 0.7)",
      fontSize: isMobile ? "0.8rem" : "0.9rem",
    },
  };

  return (
    <footer ref={containerRef} style={styles.container}>
      <canvas 
        ref={canvasRef} 
        style={styles.canvas}
        aria-hidden="true"
      />

      <div style={styles.mainContent}>
        <motion.div 
          style={styles.contactSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={styles.sectionTitle}>Get In Touch</h3>
          
          <div style={styles.form}>
            <motion.input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              style={styles.input}
              required
              disabled={isSubmitting}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              style={styles.input}
              required
              disabled={isSubmitting}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleInputChange}
              style={styles.textarea}
              rows="6"
              required
              disabled={isSubmitting}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.button
              type="button"
              onClick={handleSubmit}
              style={styles.submitButton}
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
              whileTap={!isSubmitting ? { scale: 0.95 } : {}}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>

            {submitStatus && (
              <motion.div
                style={styles.statusMessage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {submitStatus.message}
              </motion.div>
            )}
          </div>

          <div style={styles.socialContainer}>
            <div style={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  style={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my ${social.name}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <div style={styles.formSpacer}></div>

        <motion.div 
          style={styles.rightSection}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div style={styles.linksColumn}>
            <h3 style={styles.sectionTitle}>Quick Links</h3>
            <nav style={styles.linksList}>
              {fastLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.path}
                  style={styles.linkButton}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div style={styles.linkButtonContent}>
                    <span style={styles.linkButtonText}>{link.name}</span>
                    <motion.svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      style={styles.linkButtonIcon}
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <path 
                        d="M5 12h14m-7-7l7 7-7 7" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </div>
                </motion.a>
              ))}
            </nav>
          </div>

          <div style={styles.contactColumn}>
            <h3 style={styles.sectionTitle}>Contact Info</h3>
            <div style={styles.contactItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={styles.contactIcon}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p style={styles.contactLabel}>Phone</p>
                <a href="tel:+27761353762" style={styles.contactValue}>+27 76 135 3762</a>
              </div>
            </div>
            
            <div style={styles.contactItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={styles.contactIcon}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" 
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div>
                <p style={styles.contactLabel}>Email</p>
                <a href="mailto:mfundoknox@gmail.com" style={styles.contactValue}>mfundoknox@gmail.com</a>
              </div>
            </div>

            <div style={styles.contactItem}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={styles.contactIcon}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" 
                      fill="currentColor"/>
              </svg>
              <div>
                <p style={styles.contactLabel}>WhatsApp</p>
                <a href="https://wa.me/27761353762" style={styles.contactValue}>+27 76 135 3762</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={styles.bottomBar}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p style={styles.copyright}>
          © {currentYear} Mfundo Dlamini. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;