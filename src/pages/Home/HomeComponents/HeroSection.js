// HeroSection.js
import React, { useEffect, useRef, useState } from "react";
import about from "../../../assets/images/about.png";


export default function HeroSection({
  imageUrl = about,
  title = "Hi — I'm Your Name",
  subtitle = "I design and build scalable web & mobile apps. I like clean code, good UX and fast coffee.",
  primaryLabel = "View Portfolio",
  secondaryLabel = "Contact Me",
  onPrimary = () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),
  onSecondary = () => (window.location.href = "mailto:you@example.com"),
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    /* --------------------------
       OPTIMIZED DENSITY code block background
       --------------------------*/
    const canvas = canvasRef.current;
    let rafId;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let width = 0;
      let height = 0;
      const DPR = Math.max(window.devicePixelRatio || 1, 1);

      // Code snippets for the background
      const codeSnippets = [
        `// React component with hooks\nfunction UserProfile({ userId }) {\n  const [user, setUser] = useState(null);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetchUser(userId).then(data => {\n      setUser(data);\n      setLoading(false);\n    });\n  }, [userId]);\n\n  if (loading) return <Spinner />;\n  return <div>{user.name}</div>;\n}`,

        `// API service layer\nclass ApiService {\n  constructor(baseURL) {\n    this.baseURL = baseURL;\n    this.cache = new Map();\n  }\n\n  async get(endpoint) {\n    if (this.cache.has(endpoint)) {\n      return this.cache.get(endpoint);\n    }\n\n    const response = await fetch(\n      \`\${this.baseURL}/\${endpoint}\`\n    );\n    const data = await response.json();\n    this.cache.set(endpoint, data);\n    return data;\n  }\n\n  async post(endpoint, payload) {\n    const response = await fetch(\n      \`\${this.baseURL}/\${endpoint}\`, {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify(payload)\n      }\n    );\n    return response.json();\n  }\n}`,

        `// Database schema and queries\n-- Users table\nCREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  name VARCHAR(100) NOT NULL,\n  created_at TIMESTAMP DEFAULT NOW(),\n  updated_at TIMESTAMP DEFAULT NOW()\n);\n\n-- Get active users with posts\nSELECT u.name, u.email, COUNT(p.id) as post_count\nFROM users u\nLEFT JOIN posts p ON u.id = p.user_id\nWHERE u.active = true\nGROUP BY u.id, u.name, u.email\nORDER BY post_count DESC\nLIMIT 50;`,

        `// Docker compose for full stack app\nversion: '3.8'\nservices:\n  frontend:\n    build: ./frontend\n    ports:\n      - "3000:3000"\n    environment:\n      - REACT_APP_API_URL=http://localhost:8000\n    depends_on:\n      - backend\n\n  backend:\n    build: ./backend\n    ports:\n      - "8000:8000"\n    environment:\n      - DATABASE_URL=postgresql://user:pass@db:5432/app\n    depends_on:\n      - db\n\n  db:\n    image: postgres:14\n    environment:\n      - POSTGRES_DB=app\n      - POSTGRES_USER=user\n      - POSTGRES_PASSWORD=pass\n    volumes:\n      - postgres_data:/var/lib/postgresql/data\n\nvolumes:\n  postgres_data:`,

        `// Python Flask REST API\nfrom flask import Flask, request, jsonify\nfrom flask_sqlalchemy import SQLAlchemy\nfrom datetime import datetime\n\napp = Flask(__name__)\napp.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'\ndb = SQLAlchemy(app)\n\nclass User(db.Model):\n    id = db.Column(db.Integer, primary_key=True)\n    username = db.Column(db.String(80), unique=True)\n    email = db.Column(db.String(120), unique=True)\n    created_at = db.Column(db.DateTime, default=datetime.utcnow)\n\n    def to_dict(self):\n        return {\n            'id': self.id,\n            'username': self.username,\n            'email': self.email,\n            'created_at': self.created_at.isoformat()\n        }\n\n@app.route('/api/users', methods=['GET'])\ndef get_users():\n    users = User.query.all()\n    return jsonify([user.to_dict() for user in users])\n\n@app.route('/api/users', methods=['POST'])\ndef create_user():\n    data = request.get_json()\n    user = User(username=data['username'], email=data['email'])\n    db.session.add(user)\n    db.session.commit()\n    return jsonify(user.to_dict()), 201`,

        `// React hook for data fetching\nimport { useState, useEffect } from 'react';\n\nexport function useApi(endpoint, options = {}) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const fetchData = async () => {\n      try {\n        setLoading(true);\n        const response = await fetch(\n          \`\${process.env.REACT_APP_API_URL}/\${endpoint}\`,\n          {\n            headers: {\n              'Content-Type': 'application/json',\n              ...options.headers,\n            },\n            ...options,\n          }\n        );\n\n        if (!response.ok) {\n          throw new Error(\`HTTP error! status: \${response.status}\`);\n        }\n\n        const result = await response.json();\n        setData(result);\n      } catch (err) {\n        setError(err.message);\n      } finally {\n        setLoading(false);\n      }\n    };\n\n    fetchData();\n  }, [endpoint, JSON.stringify(options)]);\n\n  return { data, loading, error };\n}`,

        `// TypeScript interface and component\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  role: 'admin' | 'user' | 'moderator';\n  createdAt: Date;\n}\n\ninterface UserCardProps {\n  user: User;\n  onEdit: (user: User) => void;\n  onDelete: (userId: number) => void;\n  isAdmin?: boolean;\n}\n\nconst UserCard: React.FC<UserCardProps> = ({\n  user,\n  onEdit,\n  onDelete,\n  isAdmin = false\n}) => {\n  const [isHovered, setIsHovered] = useState(false);\n\n  const handleEdit = () => {\n    onEdit(user);\n  };\n\n  const handleDelete = () => {\n    if (window.confirm('Delete this user?')) {\n      onDelete(user.id);\n    }\n  };\n\n  return (\n    <div \n      className={\`user-card \${isHovered ? 'hovered' : ''}\`}\n      onMouseEnter={() => setIsHovered(true)}\n      onMouseLeave={() => setIsHovered(false)}\n    >\n      <h3>{user.name}</h3>\n      <p>{user.email}</p>\n      <span className={\`role-tag \${user.role}\`}>\n        {user.role}\n      </span>\n      {isAdmin && (\n        <div className="actions">\n          <button onClick={handleEdit}>Edit</button>\n          <button onClick={handleDelete}>Delete</button>\n        </div>\n      )}\n    </div>\n  );\n};`,

        `// Node.js Express server with middleware\nconst express = require('express');\nconst cors = require('cors');\nconst helmet = require('helmet');\nconst rateLimit = require('express-rate-limit');\n\nconst app = express();\n\n// Security middleware\napp.use(helmet());\napp.use(cors({\n  origin: process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:3000'\n}));\n\n// Rate limiting\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100 // limit each IP to 100 requests per windowMs\n});\napp.use(limiter);\n\n// Body parsing middleware\napp.use(express.json({ limit: '10mb' }));\napp.use(express.urlencoded({ extended: true }));\n\n// Routes\napp.use('/api/auth', require('./routes/auth'));\napp.use('/api/users', require('./routes/users'));\napp.use('/api/posts', require('./routes/posts'));\n\n// Error handling middleware\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({\n    error: 'Something went wrong!',\n    message: process.env.NODE_ENV === 'development' ? err.message : undefined\n  });\n});\n\n// 404 handler\napp.use('*', (req, res) => {\n  res.status(404).json({ error: 'Route not found' });\n});\n\nconst PORT = process.env.PORT || 5000;\napp.listen(PORT, () => {\n  console.log(\`Server running on port \${PORT}\`);\n});`,

        `// Redux toolkit slice for auth\nimport { createSlice, createAsyncThunk } from '@reduxjs/toolkit';\nimport authAPI from '../api/authAPI';\n\n// Async thunks\nexport const loginUser = createAsyncThunk(\n  'auth/login',\n  async ({ email, password }, { rejectWithValue }) => {\n    try {\n      const response = await authAPI.login(email, password);\n      localStorage.setItem('token', response.data.token);\n      return response.data.user;\n    } catch (error) {\n      return rejectWithValue(error.response.data);\n    }\n  }\n);\n\nexport const registerUser = createAsyncThunk(\n  'auth/register',\n  async (userData, { rejectWithValue }) => {\n    try {\n      const response = await authAPI.register(userData);\n      localStorage.setItem('token', response.data.token);\n      return response.data.user;\n    } catch (error) {\n      return rejectWithValue(error.response.data);\n    }\n  }\n);\n\nconst authSlice = createSlice({\n  name: 'auth',\n  initialState: {\n    user: null,\n    loading: false,\n    error: null,\n    isAuthenticated: false\n  },\n  reducers: {\n    logout: (state) => {\n      state.user = null;\n      state.isAuthenticated = false;\n      localStorage.removeItem('token');\n    },\n    clearError: (state) => {\n      state.error = null;\n    }\n  },\n  extraReducers: (builder) => {\n    builder\n      .addCase(loginUser.pending, (state) => {\n        state.loading = true;\n        state.error = null;\n      })\n      .addCase(loginUser.fulfilled, (state, action) => {\n        state.loading = false;\n        state.user = action.payload;\n        state.isAuthenticated = true;\n      })\n      .addCase(loginUser.rejected, (state, action) => {\n        state.loading = false;\n        state.error = action.payload;\n      });\n  }\n});\n\nexport const { logout, clearError } = authSlice.actions;\nexport default authSlice.reducer;`,

        `// Git workflow for feature development\n# Start new feature branch from main\ngit checkout main\ngit pull origin main\ngit checkout -b feature/user-authentication\n\n# Make changes and commit with conventional commits\ngit add .\ngit commit -m "feat: add user login functionality\n\n- Implement JWT authentication\n- Add login form component\n- Create protected route wrapper\n- Write authentication tests"\n\n# Push branch and create PR\ngit push -u origin feature/user-authentication\n\n# After review, squash and merge via GitHub\n# Then cleanup local branch\ngit checkout main\ngit pull origin main\ngit branch -d feature/user-authentication\n\n# Update local main and prune stale branches\ngit fetch --prune`
      ];

      let codeBlocks = [];

      function resize() {
        const rect = containerRef.current.getBoundingClientRect();
        width = Math.max(300, Math.floor(rect.width));
        height = Math.max(200, Math.floor(rect.height));
        canvas.width = Math.floor(width * DPR);
        canvas.height = Math.floor(height * DPR);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

        // OPTIMIZED DENSITY - More blocks than balanced but not overwhelming
        codeBlocks = [];
        const blockCount = Math.floor(width / 180) * 2; // Increased density from 250 to 180
        
        for (let i = 0; i < blockCount; i++) {
          codeBlocks.push({
            x: Math.random() * width,
            y: Math.random() * height,
            width: 260 + Math.random() * 100,
            height: 150 + Math.random() * 90,
            speed: 0.25 + Math.random() * 0.5, // Slightly faster
            code: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
            opacity: 0.09 + Math.random() * 0.08, // Slightly more visible
            hue: Math.random() * 60 - 30
          });
        }

        // Add a small layer of medium blocks for better coverage
        const mediumBlockCount = Math.floor(width / 350);
        for (let i = 0; i < mediumBlockCount; i++) {
          codeBlocks.push({
            x: Math.random() * width,
            y: Math.random() * height,
            width: 180 + Math.random() * 80,
            height: 100 + Math.random() * 60,
            speed: 0.3 + Math.random() * 0.6,
            code: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
            opacity: 0.06 + Math.random() * 0.05,
            hue: Math.random() * 60 - 30
          });
        }
      }

      function drawCodeBlock(block) {
        const { x, y, width, height, code, opacity, hue } = block;
        
        // Draw code block background
        ctx.fillStyle = `hsla(${200 + hue}, 70%, 8%, ${opacity})`;
        ctx.fillRect(x, y, width, height);
        
        // Draw border
        ctx.strokeStyle = `hsla(${200 + hue}, 60%, 40%, ${opacity * 0.8})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);
        
        // Draw header bar
        ctx.fillStyle = `hsla(${200 + hue}, 60%, 15%, ${opacity * 1.2})`;
        ctx.fillRect(x, y, width, 24);
        
        // Draw window controls
        ctx.fillStyle = `hsla(${200 + hue}, 60%, 60%, ${opacity * 1.5})`;
        ctx.beginPath();
        ctx.arc(x + 12, y + 12, 4, 0, Math.PI * 2);
        ctx.arc(x + 26, y + 12, 4, 0, Math.PI * 2);
        ctx.arc(x + 40, y + 12, 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw file name in header
        ctx.font = '10px "Fira Code", "JetBrains Mono", monospace';
        ctx.fillStyle = `hsla(${200 + hue}, 60%, 70%, ${opacity * 1.3})`;
        const fileNames = ['api.js', 'component.tsx', 'schema.sql', 'docker-compose.yml', 'app.py', 'hook.js', 'server.js', 'slice.js', 'workflow.md'];
        const fileName = fileNames[Math.floor(Math.random() * fileNames.length)];
        ctx.fillText(fileName, x + 60, y + 16);
        
        // Draw code text with original font size
        ctx.font = '9px "Fira Code", "JetBrains Mono", monospace';
        const lines = code.split('\n');
        const maxLines = Math.floor((height - 30) / 11);
        
        lines.slice(0, maxLines).forEach((line, index) => {
          // Enhanced syntax highlighting
          if (line.includes('function') || line.includes('class') || line.includes('interface')) {
            ctx.fillStyle = `hsla(${300 + hue}, 80%, 75%, ${opacity * 1.6})`;
          } else if (line.includes('const') || line.includes('let') || line.includes('var')) {
            ctx.fillStyle = `hsla(${280 + hue}, 70%, 70%, ${opacity * 1.5})`;
          } else if (line.includes('//') || line.includes('/*') || line.includes('#') || line.includes('--')) {
            ctx.fillStyle = `hsla(${100 + hue}, 60%, 65%, ${opacity * 1.2})`;
          } else if (line.includes('import') || line.includes('from') || line.includes('require') || line.includes('export')) {
            ctx.fillStyle = `hsla(${40 + hue}, 80%, 75%, ${opacity * 1.5})`;
          } else if (line.match(/\d+/) || line.includes('true') || line.includes('false')) {
            ctx.fillStyle = `hsla(${350 + hue}, 80%, 75%, ${opacity * 1.5})`;
          } else if (line.includes('if') || line.includes('else') || line.includes('return') || line.includes('async')) {
            ctx.fillStyle = `hsla(${200 + hue}, 80%, 75%, ${opacity * 1.5})`;
          } else {
            ctx.fillStyle = `hsla(${180 + hue}, 70%, 80%, ${opacity * 1.3})`;
          }
          
          // Trim line if too long for block width
          let displayLine = line;
          const maxChars = Math.floor((width - 20) / 5.5);
          if (displayLine.length > maxChars) {
            displayLine = displayLine.substring(0, maxChars - 3) + '...';
          }
          
          ctx.fillText(displayLine, x + 10, y + 40 + index * 11);
        });

        // Show ellipsis if code is truncated
        if (lines.length > maxLines) {
          ctx.fillStyle = `hsla(${200 + hue}, 60%, 60%, ${opacity * 1.2})`;
          ctx.fillText('...', x + 10, y + 40 + maxLines * 11);
        }
      }

      function draw() {
        // Clear with dark tech gradient
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#0a0f1c');
        gradient.addColorStop(0.5, '#0c1220');
        gradient.addColorStop(1, '#090d18');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // Draw very subtle grid lines for depth
        ctx.strokeStyle = 'rgba(56, 178, 172, 0.02)';
        ctx.lineWidth = 0.5;
        const gridSize = 50;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Draw and update code blocks
        codeBlocks.forEach(block => {
          drawCodeBlock(block);
          block.y -= block.speed;
          
          // Reset block when it goes off screen
          if (block.y + block.height < -20) {
            block.y = height + Math.random() * 50;
            block.x = Math.random() * width;
            block.code = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
          }
        });

        rafId = requestAnimationFrame(draw);
      }

      resize();
      window.addEventListener("resize", resize);
      rafId = requestAnimationFrame(draw);

      const cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", resize);
      };

      canvas._cleanup = cleanup;
    }

    return () => {
      if (canvas && canvas._cleanup) canvas._cleanup();
    };
  }, []);

  /* --------------------------
     Enhanced style object with tech theme
     --------------------------*/
  const styles = {
    section: {
      position: "relative",
      overflow: "hidden",
      color: "#f0f6ff",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      borderRadius: 24,
      padding: "64px 32px",
      boxSizing: "border-box",
      background: "linear-gradient(135deg, #0a0f1c 0%, #0c1220 50%, #090d18 100%)",
      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1), 0 20px 40px rgba(0,0,0,0.4)",
      border: "1px solid rgba(255,255,255,0.05)",
    },
    canvas: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      opacity: 0.75, // Slightly increased for better code visibility
    },
    contentWrap: {
      position: "relative",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "48px",
      maxWidth: 1200,
      margin: "0 auto",
    },
    left: {
      flex: "0 1 380px",
      display: "flex",
      justifyContent: "center",
      minWidth: 280,
    },
    imageWrapper: {
      width: 360,
      maxWidth: "100%",
      height: 360,
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: `
        0 25px 50px rgba(2, 8, 23, 0.8),
        0 0 0 1px rgba(255,255,255,0.03),
        inset 0 1px 0 rgba(255,255,255,0.1)
      `,
      background: "linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
      transform: "perspective(1000px) rotateX(5deg) rotateY(-5deg)",
      transition: "all 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
      position: "relative",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center 5%", // Changed from "center 70%" to "center 30%" to push image up
      display: "block",
      transform: imageLoaded ? "scale(1.05)" : "scale(1)",
      filter: imageLoaded ? "grayscale(0.3) contrast(1.1)" : "grayscale(1) contrast(1)",
      transition: "all 1.2s cubic-bezier(0.23, 1, 0.32, 1)",
      opacity: imageLoaded ? 1 : 0,
    },
    imageGlow: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(circle at center, rgba(100,255,218,0.15) 0%, transparent 70%)",
      opacity: 0,
      transition: "opacity 0.6s ease",
      mixBlendMode: "overlay",
    },
    right: {
      flex: "1 1 500px",
      minWidth: 300,
    },
    title: {
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      lineHeight: 1.1,
      margin: 0,
      fontWeight: 800,
      background: "linear-gradient(135deg, #ffffff 0%, #64ffda 30%, #00c9ff 100%)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textShadow: "0 4px 30px rgba(100, 255, 218, 0.3)",
      letterSpacing: "-0.02em",
      fontFeatureSettings: "'calt' 1, 'ss01' 1",
    },
    subtitle: {
      marginTop: 24,
      color: "rgba(240, 246, 255, 0.85)",
      maxWidth: 720,
      fontSize: "clamp(1rem, 2vw, 1.2rem)",
      lineHeight: 1.7,
      fontWeight: 400,
      textShadow: "0 2px 20px rgba(0,0,0,0.3)",
    },
    buttonsRow: {
      marginTop: 32,
      display: "flex",
      gap: 16,
      alignItems: "center",
      flexWrap: "wrap",
    },
    primaryBtn: (hover) => ({
      cursor: "pointer",
      userSelect: "none",
      borderRadius: 16,
      padding: "16px 32px",
      fontWeight: 700,
      fontSize: "1rem",
      letterSpacing: 0.3,
      border: "none",
      background: hover 
        ? "linear-gradient(135deg, #64ffda 0%, #00c9ff 100%)"
        : "linear-gradient(135deg, #00c9ff 0%, #64ffda 100%)",
      color: "#0a1128",
      transform: hover ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
      transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
      boxShadow: hover 
        ? "0 12px 40px rgba(100, 255, 218, 0.4), 0 0 0 1px rgba(100, 255, 218, 0.1)"
        : "0 8px 30px rgba(100, 255, 218, 0.3), 0 0 0 1px rgba(100, 255, 218, 0.05)",
      position: "relative",
      overflow: "hidden",
    }),
    secondaryBtn: (hover) => ({
      cursor: "pointer",
      userSelect: "none",
      borderRadius: 16,
      padding: "14px 30px",
      fontWeight: 600,
      fontSize: "1rem",
      background: hover ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
      color: hover ? "#ffffff" : "rgba(240, 246, 255, 0.9)",
      border: "1px solid rgba(255,255,255,0.15)",
      backdropFilter: "blur(10px)",
      transform: hover ? "translateY(-2px)" : "translateY(0)",
      transition: "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
      boxShadow: hover 
        ? "0 12px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)"
        : "0 8px 30px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05)",
    }),
    tip: {
      marginTop: 20,
      color: "rgba(198,214,230,0.6)",
      fontSize: 14,
      fontStyle: "italic",
      fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
    },
  };

  return (
    <section ref={containerRef} style={styles.section} aria-labelledby="hero-heading">
      {/* OPTIMIZED DENSITY tech-themed code blocks background */}
      <canvas ref={canvasRef} style={styles.canvas} aria-hidden="true" />

      <div style={styles.contentWrap}>
        {/* LEFT image with enhanced effects */}
        <div style={styles.left}>
          <div
            style={styles.imageWrapper}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.05)";
              e.currentTarget.querySelector('[data-glow]').style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "perspective(1000px) rotateX(5deg) rotateY(-5deg) scale(1)";
              e.currentTarget.querySelector('[data-glow]').style.opacity = "0";
            }}
          >
            <img 
              ref={imageRef}
              src={imageUrl} 
              alt="Profile" 
              style={styles.image}
              onLoad={() => setImageLoaded(true)}
            />
            <div data-glow style={styles.imageGlow} />
          </div>
        </div>

        {/* RIGHT text + buttons */}
        <div style={styles.right}>
          <h1 id="hero-heading" style={styles.title}>
            {title}
          </h1>
          <p style={styles.subtitle}>{subtitle}</p>

          <div style={styles.buttonsRow}>
            <div
              role="button"
              tabIndex={0}
              onClick={onPrimary}
              onKeyDown={(e) => e.key === "Enter" && onPrimary()}
              onMouseEnter={() => setPrimaryHover(true)}
              onMouseLeave={() => setPrimaryHover(false)}
              style={styles.primaryBtn(primaryHover)}
              aria-label={primaryLabel}
            >
              {primaryLabel}
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={onSecondary}
              onKeyDown={(e) => e.key === "Enter" && onSecondary()}
              onMouseEnter={() => setSecondaryHover(true)}
              onMouseLeave={() => setSecondaryHover(false)}
              style={styles.secondaryBtn(secondaryHover)}
              aria-label={secondaryLabel}
            >
              {secondaryLabel}
            </div>
          </div>

          <div style={styles.tip}>// Built with React & modern web technologies</div>
        </div>
      </div>
    </section>
  );
}