import React, { useState, useEffect } from "react";

const FloatingButtons = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Check scroll position for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const openWhatsApp = () => {
    const message = `🚀 *Website Inquiry - Software Services*

Hello! I visited your website and I'm interested in:

🔹 Mobile Apps
🔹 Commercial Solutions  
🔹 Websites
🔹 DNS management
🔹 Professional Emails
🔹 E-cormmerce Platforms

*Chat started from: mfundodev.com*

Please provide me with more information about your services and pricing. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/27761353762?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div style={styles.whatsappContainer}>
        {/* Animated Arrow - Always visible and playing */}
        <div style={styles.arrowContainer}>
          <div style={styles.arrowBubble}>
            <span style={styles.arrowText}>WhatsApp! 👇</span>
          </div>
          <div style={styles.arrowPointer}></div>
        </div>
        
        <button 
          style={styles.whatsappButton}
          onClick={openWhatsApp}
          title="Click to start chatting on WhatsApp"
        >
          <svg style={styles.whatsappIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893c0-3.18-1.24-6.169-3.495-8.418"/>
          </svg>
        </button>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          style={styles.scrollTopButton}
          onClick={scrollToTop}
          title="Scroll to top"
        >
          <svg style={styles.scrollTopIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 15l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </>
  );
};

const styles = {
  whatsappContainer: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    zIndex: 1000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  
  arrowContainer: {
    position: "relative",
    marginBottom: "15px",
    animation: "bounce 2s infinite, fadeIn 0.5s ease-in",
  },
  
  arrowBubble: {
    background: "#25D366",
    color: "white",
    padding: "8px 12px",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
    position: "relative",
  },
  
  arrowPointer: {
    position: "absolute",
    bottom: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "0",
    height: "0",
    borderLeft: "8px solid transparent",
    borderRight: "8px solid transparent",
    borderTop: "8px solid #25D366",
  },
  
  arrowText: {
    fontSize: "12px",
    fontWeight: "600",
  },
  
  whatsappButton: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "#25D366",
    border: "none",
    boxShadow: "0 4px 20px rgba(37, 211, 102, 0.4)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    animation: "pulse 2s infinite, wiggle 3s infinite",
  },
  
  whatsappIcon: {
    width: "30px",
    height: "30px",
    color: "white",
  },
  
  scrollTopButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "#3498db",
    border: "none",
    boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease",
    zIndex: 1000,
  },
  
  scrollTopIcon: {
    width: "24px",
    height: "24px",
    color: "white",
  },
};

// Add CSS animations
const styleElement = document.createElement('style');
styleElement.textContent = `
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
    }
    70% {
      box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
    }
  }

  @keyframes wiggle {
    0%, 7% {
      transform: rotate(0);
    }
    2% {
      transform: rotate(-5deg);
    }
    4% {
      transform: rotate(5deg);
    }
    6% {
      transform: rotate(0);
    }
  }

  .whatsapp-btn:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
    animation: none;
  }

  .scroll-top-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
    background: #2980b9;
  }

  @media (max-width: 768px) {
    .whatsapp-btn {
      width: 55px;
      height: 55px;
      bottom: 15px;
      left: 15px;
    }
    
    .whatsapp-icon {
      width: 28px;
      height: 28px;
    }
    
    .scroll-top-btn {
      width: 45px;
      height: 45px;
      bottom: 15px;
      right: 15px;
    }
    
    .scroll-top-icon {
      width: 22px;
      height: 22px;
    }
    
    .arrow-bubble {
      font-size: 12px;
      padding: 6px 10px;
    }
  }

  @media (max-width: 480px) {
    .whatsapp-btn {
      width: 50px;
      height: 50px;
      bottom: 10px;
      left: 10px;
    }
    
    .whatsapp-icon {
      width: 25px;
      height: 25px;
    }
    
    .scroll-top-btn {
      width: 40px;
      height: 40px;
      bottom: 10px;
      right: 10px;
    }
    
    .scroll-top-icon {
      width: 20px;
      height: 20px;
    }
    
    .arrow-bubble {
      font-size: 11px;
      padding: 5px 8px;
    }
    
    .arrow-text {
      font-size: 10px;
    }
  }
`;

// Add class names for hover effects
if (typeof document !== 'undefined') {
  document.head.appendChild(styleElement);
  
  // Add class names after component mounts
  setTimeout(() => {
    const whatsappBtn = document.querySelector('[title="Click to start chatting on WhatsApp"]');
    if (whatsappBtn) whatsappBtn.classList.add('whatsapp-btn');
    
    const scrollTopBtn = document.querySelector('[title="Scroll to top"]');
    if (scrollTopBtn) scrollTopBtn.classList.add('scroll-top-btn');
    
    const arrowBubble = document.querySelector('[style*="background: #25D366"]');
    if (arrowBubble) arrowBubble.classList.add('arrow-bubble');
  }, 100);
}

export default FloatingButtons;