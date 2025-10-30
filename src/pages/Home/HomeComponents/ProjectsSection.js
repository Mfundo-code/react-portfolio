import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectsSection = () => {
  const [categories, setCategories] = useState([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from Django backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Try the main projects endpoint first
        const response = await fetch('http://127.0.0.1:8000/api/projects/');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Projects data:', data);
        
        // Transform the data to match your component's expected structure
        // Group projects by category
        const categoriesMap = {};
        
        data.forEach(project => {
          if (!categoriesMap[project.category]) {
            categoriesMap[project.category] = {
              id: project.category,
              name: project.category_name,
              projects: []
            };
          }
          categoriesMap[project.category].projects.push(project);
        });
        
        const categoriesArray = Object.values(categoriesMap);
        setCategories(categoriesArray);
        
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Auto-rotate categories
  useEffect(() => {
    if (categories.length > 1) {
      const interval = setInterval(() => {
        setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [categories.length]);

  const nextCategory = () => {
    setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
  };

  const prevCategory = () => {
    setCurrentCategoryIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const goToCategory = (index) => {
    setCurrentCategoryIndex(index);
  };

  // Helper function to get full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://127.0.0.1:8000${imagePath}`;
  };

  if (loading) {
    return (
      <section style={styles.section}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={styles.loadingText}>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section style={styles.section}>
        <div style={styles.errorContainer}>
          <h3 style={styles.errorTitle}>Unable to load projects</h3>
          <p style={styles.errorText}>{error}</p>
          <button 
            style={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <section style={styles.section}>
        <div style={styles.emptyContainer}>
          <h3 style={styles.emptyTitle}>No Projects Available</h3>
          <p style={styles.emptyText}>Check back later for new projects.</p>
        </div>
      </section>
    );
  }

  const currentCategory = categories[currentCategoryIndex];
  const projectsToShow = currentCategory?.projects?.slice(0, 3) || [];

  return (
    <section style={styles.section} aria-labelledby="projects-heading">
      <div style={styles.container}>
        <motion.h2 
          id="projects-heading"
          style={styles.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        {/* Category Navigation */}
        <div style={styles.categoryNav}>
          {categories.map((category, index) => (
            <button
              key={category.id}
              style={{
                ...styles.categoryButton,
                ...(index === currentCategoryIndex ? styles.activeCategoryButton : {})
              }}
              onClick={() => goToCategory(index)}
              aria-label={`Show ${category.name} projects`}
            >
              {category.name}
              <span style={styles.projectCount}>({category.projects?.length || 0})</span>
            </button>
          ))}
        </div>

        {/* Projects Display */}
        <div style={styles.carouselContainer}>
          <button
            style={styles.navButton}
            onClick={prevCategory}
            aria-label="Previous category"
            disabled={categories.length <= 1}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div style={styles.carouselContent}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCategoryIndex}
                style={styles.categorySection}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h3 style={styles.categoryTitle}>{currentCategory.name}</h3>

                <div style={styles.projectsGrid}>
                  {projectsToShow.map((project, index) => (
                    <motion.div
                      key={project.id}
                      style={styles.projectCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                    >
                      <div style={styles.imageContainer}>
                        {project.project_image ? (
                          <img 
                            src={getImageUrl(project.project_image)} 
                            alt={project.description}
                            style={styles.projectImage}
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div style={styles.imagePlaceholder}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                              <path
                                d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                              <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5"/>
                            </svg>
                          </div>
                        )}
                        
                        {/* Project Overlay */}
                        <div style={styles.projectOverlay}>
                          <div style={styles.projectActions}>
                            {project.repo_link && (
                              <a
                                href={project.repo_link}
                                style={styles.actionButton}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View code repository"
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                  <path
                                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </a>
                            )}
                            {project.live_link && (
                              <a
                                href={project.live_link}
                                style={styles.actionButton}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View live demo"
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                  <path
                                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <polyline points="15 3 21 3 21 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  <line x1="10" y1="14" x2="21" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div style={styles.projectContent}>
                        <p style={styles.projectDescription}>
                          {project.description && project.description.length > 120 
                            ? `${project.description.substring(0, 120)}...`
                            : project.description || 'No description available'
                          }
                        </p>
                        
                        <div style={styles.toolsContainer}>
                          {project.tools_list && project.tools_list.slice(0, 3).map((tool, toolIndex) => (
                            <span key={toolIndex} style={styles.toolTag}>
                              {tool}
                            </span>
                          ))}
                          {project.tools_list && project.tools_list.length > 3 && (
                            <span style={styles.moreTools}>
                              +{project.tools_list.length - 3} more
                            </span>
                          )}
                        </div>

                        <div style={styles.projectMeta}>
                          <span style={styles.projectDate}>
                            {project.created_at ? new Date(project.created_at).toLocaleDateString() : 'Unknown date'}
                          </span>
                          {project.featured && (
                            <span style={styles.featuredBadge}>Featured</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            style={styles.navButton}
            onClick={nextCategory}
            aria-label="Next category"
            disabled={categories.length <= 1}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Category Indicators */}
        <div style={styles.indicators}>
          {categories.map((_, index) => (
            <button
              key={index}
              style={{
                ...styles.indicator,
                ...(index === currentCategoryIndex ? styles.activeIndicator : {})
              }}
              onClick={() => goToCategory(index)}
              aria-label={`Go to category ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


const styles = {
  section: {
    padding: '10px 2px',
    background: '#ffffff',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    minHeight: 'auto',
  },
  container: {
    maxWidth: 1200,
    margin: '0 auto',
    position: 'relative',
  },
  title: {
    fontSize: 'clamp(2rem, 5vw, 3rem)',
    textAlign: 'center',
    margin: '0 0 16px 0',
    color: '#1a202c',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #4a5568 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    textAlign: 'center',
    color: '#4a5568',
    fontSize: '1.2rem',
    margin: '0 0 48px 0',
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 1.6,
  },
  categoryNav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '40px',
    flexWrap: 'wrap',
  },
  categoryButton: {
    padding: '12px 24px',
    border: '1px solid #e2e8f0',
    background: '#f7fafc',
    color: '#4a5568',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
  },
  activeCategoryButton: {
    background: 'linear-gradient(135deg, #3182ce 0%, #805ad5 100%)',
    color: '#ffffff',
    borderColor: 'transparent',
    boxShadow: '0 8px 25px rgba(49, 130, 206, 0.3)',
  },
  projectCount: {
    fontSize: '12px',
    opacity: 0.8,
    marginLeft: '4px',
  },
  carouselContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '10px', // Reduced from 40px
  },
  navButton: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    border: '1px solid #e2e8f0',
    background: '#ffffff',
    color: '#4a5568',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    flexShrink: 0,
  },
  carouselContent: {
    flex: 1,
    minHeight: '500px',
    position: 'relative',
  },
  categorySection: {
    width: '100%',
  },
  categoryTitle: {
    fontSize: '1.8rem',
    color: '#1a202c',
    margin: '0 0 8px 0',
    fontWeight: 700,
    textAlign: 'center',
  },
  categoryDescription: {
    color: '#718096',
    textAlign: 'center',
    margin: '0 0 40px 0',
    fontSize: '1rem',
    lineHeight: 1.6,
    maxWidth: 600,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  projectsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '24px',
    padding: '0 20px',
  },
  projectCard: {
    background: '#ffffff',
    borderRadius: '16px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    background: '#f7fafc',
  },
  projectImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#cbd5e0',
    background: '#f7fafc',
  },
  projectOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(26, 32, 44, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  projectActions: {
    display: 'flex',
    gap: '12px',
  },
  actionButton: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #3182ce 0%, #805ad5 100%)',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  projectContent: {
    padding: '20px',
  },
  projectDescription: {
    color: '#4a5568',
    fontSize: '14px',
    lineHeight: 1.6,
    margin: '0 0 16px 0',
  },
  toolsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '16px',
  },
  toolTag: {
    background: '#ebf8ff',
    color: '#3182ce',
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '11px',
    fontWeight: 600,
    border: '1px solid #bee3f8',
  },
  moreTools: {
    color: '#a0aec0',
    fontSize: '11px',
    fontStyle: 'italic',
  },
  projectMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '12px',
  },
  projectDate: {
    color: '#a0aec0',
  },
  featuredBadge: {
    background: 'linear-gradient(135deg, #e53e3e 0%, #dd6b20 100%)',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '10px',
    fontWeight: 700,
  },
  indicators: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '5px', // Reduced from 20px
  },
  indicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    background: '#e2e8f0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activeIndicator: {
    background: 'linear-gradient(135deg, #3182ce 0%, #805ad5 100%)',
    transform: 'scale(1.2)',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 10px',
    color: '#4a5568',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #e2e8f0',
    borderTop: '3px solid #3182ce',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px',
  },
  loadingText: {
    fontSize: '16px',
    margin: 0,
  },
  errorContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#4a5568',
    maxWidth: 600,
    margin: '0 auto',
  },
  errorTitle: {
    fontSize: '1.5rem',
    color: '#e53e3e',
    margin: '0 0 12px 0',
  },
  errorText: {
    fontSize: '1rem',
    margin: '0 0 8px 0',
    color: '#718096',
  },
  debugInfo: {
    background: '#f7fafc',
    padding: '20px',
    borderRadius: '8px',
    margin: '20px 0',
    textAlign: 'left',
  },
  stepsList: {
    margin: '10px 0',
    paddingLeft: '20px',
    color: '#4a5568',
  },
  retryButton: {
    background: 'linear-gradient(135deg, #3182ce 0%, #805ad5 100%)',
    color: '#ffffff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    boxShadow: '0 4px 15px rgba(49, 130, 206, 0.3)',
    marginTop: '16px',
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '40px 20px',
    color: '#4a5568',
  },
  emptyTitle: {
    fontSize: '1.5rem',
    margin: '0 0 12px 0',
  },
  emptyText: {
    fontSize: '1rem',
    margin: 0,
  },
};

// Add CSS for spinner animation
const spinnerStyle = document.createElement('style');
spinnerStyle.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(spinnerStyle);

export default ProjectsSection;