// Portfolio Website JavaScript
class PortfolioApp {
  constructor() {
    this.blogPosts = [];
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupAnimatedCounters();
    this.setupBlogFunctionality();
    this.setupContactForm();
    this.setupModal();
    this.loadSampleBlogPosts();
    this.setupScrollEffects();
  }

  // Navigation and smooth scrolling
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          const offsetTop = targetSection.offsetTop - navbarHeight - 20;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
        
        // Close mobile menu if open
        this.closeMobileMenu();
        
        // Update active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
      this.updateActiveNavLink();
    });
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Mobile menu functionality
  setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }
  }

  closeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }

  // Animated counters
  setupAnimatedCounters() {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  }

  // Blog functionality
  setupBlogFunctionality() {
    const addBlogBtn = document.getElementById('addBlogBtn');
    const blogSearch = document.getElementById('blogSearch');
    const blogFilter = document.getElementById('blogFilter');

    if (addBlogBtn) {
      addBlogBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openBlogModal();
      });
    }

    if (blogSearch) {
      blogSearch.addEventListener('input', (e) => {
        this.filterBlogPosts(e.target.value, blogFilter ? blogFilter.value : 'all');
      });
    }

    if (blogFilter) {
      blogFilter.addEventListener('change', (e) => {
        this.filterBlogPosts(blogSearch ? blogSearch.value : '', e.target.value);
      });
    }
  }

  loadSampleBlogPosts() {
    const samplePosts = [
      {
        id: 1,
        title: "Advanced VAPT Methodologies for Enterprise Security",
        excerpt: "Exploring cutting-edge vulnerability assessment and penetration testing techniques for modern enterprise environments. Learn about the latest tools and methodologies used by security professionals.",
        content: "In today's rapidly evolving cybersecurity landscape, traditional VAPT approaches are no longer sufficient. This comprehensive guide explores advanced methodologies including automated vulnerability scanning, manual testing techniques, and the integration of AI-powered security tools. We'll cover the complete VAPT lifecycle, from reconnaissance to reporting, with real-world case studies and practical examples.",
        date: "2025-07-15",
        tags: ["VAPT", "Enterprise Security", "Penetration Testing"],
        readTime: "8 min read"
      },
      {
        id: 2,
        title: "Red Team vs Blue Team: Understanding Offensive Security",
        excerpt: "A comprehensive guide to understanding the roles and methodologies of red team operations in cybersecurity. Discover how offensive security practices strengthen overall defense posture.",
        content: "Red team operations simulate real-world attacks to test an organization's defensive capabilities. This article delves deep into red team methodologies, tactics, techniques, and procedures (TTPs), and how they complement blue team defensive strategies. Learn about the tools, frameworks, and mindset required for effective red team operations.",
        date: "2025-07-10",
        tags: ["Red Team", "Blue Team", "Offensive Security"],
        readTime: "6 min read"
      },
      {
        id: 3,
        title: "Mobile Forensics in Modern Cybersecurity Investigations",
        excerpt: "Techniques and tools for effective mobile device forensics in cybersecurity incident response. Understanding the challenges and solutions in mobile security investigations.",
        content: "Mobile devices contain a wealth of information crucial for cybersecurity investigations. This article covers the latest mobile forensics techniques, tools like Autopsy and Sleuth Kit, and the legal and technical challenges faced by investigators. We'll explore iOS and Android forensics, data recovery methods, and best practices for evidence preservation.",
        date: "2025-07-05",
        tags: ["Mobile Forensics", "Digital Forensics", "Incident Response"],
        readTime: "10 min read"
      },
      {
        id: 4,
        title: "Zero Trust Architecture: Implementation Strategies",
        excerpt: "Best practices for implementing zero trust security models in government and enterprise environments. A practical approach to modern security architecture.",
        content: "Zero Trust Architecture represents a paradigm shift from traditional perimeter-based security. This comprehensive guide covers implementation strategies, technology requirements, and organizational changes needed for successful Zero Trust adoption. Learn from real-world case studies and understand the challenges and benefits of this security model.",
        date: "2025-06-28",
        tags: ["Zero Trust", "Network Security", "Architecture"],
        readTime: "12 min read"
      }
    ];

    this.blogPosts = [...samplePosts];
    this.renderBlogPosts();
  }

  openBlogModal() {
    const modal = document.getElementById('blogModal');
    const blogForm = document.getElementById('blogForm');
    
    if (modal && blogForm) {
      // Reset form
      blogForm.reset();
      
      modal.style.display = 'flex';
      // Force reflow to ensure display change is registered
      modal.offsetHeight;
      modal.style.opacity = '1';
      
      // Focus on first input
      const firstInput = modal.querySelector('input');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }

  closeBlogModal() {
    const modal = document.getElementById('blogModal');
    if (modal) {
      modal.style.opacity = '0';
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
    }
  }

  addBlogPost(postData) {
    const newPost = {
      id: Date.now(),
      title: postData.title,
      excerpt: postData.excerpt,
      content: postData.content,
      date: new Date().toISOString().split('T')[0],
      tags: postData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      readTime: this.calculateReadTime(postData.content)
    };

    this.blogPosts.unshift(newPost);
    this.renderBlogPosts();
    this.closeBlogModal();
    
    // Show success message
    this.showNotification('Blog post published successfully!', 'success');
  }

  calculateReadTime(content) {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  }

  filterBlogPosts(searchTerm = '', category = 'all') {
    const filteredPosts = this.blogPosts.filter(post => {
      const matchesSearch = !searchTerm || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = category === 'all' || 
        post.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()));
      
      return matchesSearch && matchesCategory;
    });

    this.renderBlogPosts(filteredPosts);
    
    // Show filter results
    if (searchTerm || category !== 'all') {
      const resultsMessage = `${filteredPosts.length} post(s) found`;
      this.showFilterResults(resultsMessage);
    }
  }

  showFilterResults(message) {
    const blogGrid = document.getElementById('blogGrid');
    if (blogGrid) {
      let resultsDiv = blogGrid.querySelector('.filter-results');
      if (!resultsDiv) {
        resultsDiv = document.createElement('div');
        resultsDiv.className = 'filter-results';
        resultsDiv.style.cssText = `
          grid-column: 1 / -1;
          text-align: center;
          padding: 1rem;
          color: var(--cyber-text-secondary);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        `;
        blogGrid.insertBefore(resultsDiv, blogGrid.firstChild);
      }
      resultsDiv.textContent = message;
      
      // Remove after 3 seconds
      setTimeout(() => {
        if (resultsDiv.parentNode) {
          resultsDiv.remove();
        }
      }, 3000);
    }
  }

  renderBlogPosts(posts = this.blogPosts) {
    const blogGrid = document.getElementById('blogGrid');
    
    if (!blogGrid) return;

    // Remove existing filter results
    const existingResults = blogGrid.querySelector('.filter-results');
    if (existingResults) {
      existingResults.remove();
    }
    
    if (posts.length === 0) {
      blogGrid.innerHTML = `
        <div class="no-posts" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--cyber-text-secondary);">
          <h3>No blog posts found</h3>
          <p>Try adjusting your search criteria or check back later for new content.</p>
        </div>
      `;
      return;
    }

    blogGrid.innerHTML = posts.map(post => `
      <article class="blog-post" data-post-id="${post.id}" style="cursor: pointer;">
        <div class="blog-post-content">
          <div class="blog-post-meta">
            <span>${this.formatDate(post.date)}</span>
            <span>${post.readTime}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <div class="blog-tags">
            ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
          </div>
        </div>
      </article>
    `).join('');

    // Add click handlers for blog posts
    const blogPostElements = blogGrid.querySelectorAll('.blog-post');
    blogPostElements.forEach(post => {
      post.addEventListener('click', () => {
        const postId = parseInt(post.getAttribute('data-post-id'));
        this.openBlogPostModal(postId);
      });
    });
  }

  openBlogPostModal(postId) {
    const post = this.blogPosts.find(p => p.id === postId);
    if (!post) return;

    // Create and show blog post modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 800px;">
        <div class="modal-header">
          <h3>${post.title}</h3>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="blog-post-meta" style="margin-bottom: 2rem;">
            <span>${this.formatDate(post.date)}</span>
            <span>${post.readTime}</span>
          </div>
          <div class="blog-tags" style="margin-bottom: 2rem;">
            ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
          </div>
          <div style="line-height: 1.8; color: var(--cyber-text-secondary);">
            ${post.content.split('\n').map(p => `<p style="margin-bottom: 1rem;">${p}</p>`).join('')}
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close modal handlers
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });
  }

  formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  }

  // Modal functionality
  setupModal() {
    const modal = document.getElementById('blogModal');
    const closeBtn = document.getElementById('modalClose');
    const cancelBtn = document.getElementById('modalCancel');
    const blogForm = document.getElementById('blogForm');

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeBlogModal();
      });
    }

    if (cancelBtn) {
      cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.closeBlogModal();
      });
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeBlogModal();
        }
      });
    }

    if (blogForm) {
      blogForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const postData = {
          title: document.getElementById('postTitle').value,
          excerpt: document.getElementById('postExcerpt').value,
          content: document.getElementById('postContent').value,
          tags: document.getElementById('postTags').value
        };

        if (this.validateBlogForm(postData)) {
          this.addBlogPost(postData);
        }
      });
    }
  }

  validateBlogForm(postData) {
    const errors = [];

    if (!postData.title.trim()) errors.push('Title is required');
    if (!postData.excerpt.trim()) errors.push('Excerpt is required');
    if (!postData.content.trim()) errors.push('Content is required');

    if (errors.length > 0) {
      this.showNotification(errors.join(', '), 'error');
      return false;
    }

    return true;
  }

  // Contact form functionality
  setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
          name: document.getElementById('contactName').value,
          email: document.getElementById('contactEmail').value,
          subject: document.getElementById('contactSubject').value,
          message: document.getElementById('contactMessage').value
        };

        if (this.validateContactForm(formData)) {
          this.handleContactSubmission(formData);
        }
      });
    }
  }

  validateContactForm(formData) {
    const errors = [];

    if (!formData.name.trim()) errors.push('Name is required');
    if (!formData.email.trim()) errors.push('Email is required');
    if (!this.isValidEmail(formData.email)) errors.push('Valid email is required');
    if (!formData.subject.trim()) errors.push('Subject is required');
    if (!formData.message.trim()) errors.push('Message is required');

    if (errors.length > 0) {
      this.showNotification(errors.join(', '), 'error');
      return false;
    }

    return true;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  handleContactSubmission(formData) {
    // Show loading state
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission delay
    setTimeout(() => {
      // Restore button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Show success message
      this.showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
      
      // Reset form
      document.getElementById('contactForm').reset();
      
      // In a real application, you would send this data to a server
      console.log('Contact form submitted:', formData);
    }, 1500);
  }

  // Scroll effects
  setupScrollEffects() {
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: linear-gradient(90deg, var(--cyber-primary), var(--cyber-secondary));
      z-index: 9999;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      progressBar.style.width = `${Math.min(scrolled, 100)}%`;
    });

    // Add parallax effect to hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
      window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.3;
        heroBackground.style.transform = `translateY(${rate}px)`;
      });
    }

    // Add intersection observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Add fade-in animation to sections
    setTimeout(() => {
      const animateElements = document.querySelectorAll('.skill-card, .timeline-item, .blog-post, .stat-item');
      animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
      });
    }, 500);
  }

  // Utility functions
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 1rem 2rem;
      background: var(--cyber-surface);
      border: 1px solid var(--cyber-border);
      border-radius: 8px;
      color: var(--cyber-text-primary);
      z-index: 3000;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s ease;
      max-width: 400px;
      box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
      font-weight: 500;
    `;
    
    if (type === 'success') {
      notification.style.borderColor = 'var(--cyber-primary)';
      notification.style.background = 'rgba(0, 255, 65, 0.1)';
    } else if (type === 'error') {
      notification.style.borderColor = '#ff0040';
      notification.style.background = 'rgba(255, 0, 64, 0.1)';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  
  // Additional setup after app initialization
  setTimeout(() => {
    // Add typing effect to hero title
    const heroName = document.querySelector('.hero-name');
    if (heroName && !heroName.dataset.typed) {
      heroName.dataset.typed = 'true';
      const text = 'Rajat Srivastava';
      heroName.textContent = '';
      let i = 0;
      
      const typeWriter = () => {
        if (i < text.length) {
          heroName.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      // Start typing effect after a short delay
      setTimeout(typeWriter, 500);
    }

    // Add hover effects to interactive elements
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
    
  }, 1000);
});

# WhatsApp integration

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('whatsapp-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('user-name').value.trim();
    const message = document.getElementById('user-message').value.trim();

    if (!name || !message) {
      alert("Please fill in both fields.");
      return;
    }

    const phoneNumber = "919044510566"; // 🔁 Replace with your full WhatsApp number (with country code, no +)
    const fullMessage = `Hello, my name is ${name}. 👋\n\n${message}`;

    const encodedMessage = encodeURIComponent(fullMessage);

    // Web WhatsApp link
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open in new tab
    window.open(whatsappURL, '_blank');
  });
});
