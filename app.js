// main.js — Portfolio Website JavaScript ✅ Optimized

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
    this.setupModal();
    this.loadSampleBlogPosts();
    this.setupScrollEffects();
    this.setupContactForm(); // Includes WhatsApp
  }

  // ✅ Navigation with smooth scroll
  setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (!target) return;
        const offset = document.querySelector('.navbar')?.offsetHeight || 60;
        const scrollTop = target.offsetTop - offset;
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });

        // Toggle active class
        navLinks.forEach(nav => nav.classList.remove('active'));
        link.classList.add('active');
      });
    });

    window.addEventListener('scroll', () => this.updateActiveNavLink());
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;
    let current = '';
    for (const section of sections) {
      const offset = section.offsetTop - 150;
      if (scrollY >= offset) current = section.id;
    }

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // ✅ Mobile Navbar
  setupMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      menu.classList.toggle('active');
    });
  }

  // ✅ Animated Numbers
  setupAnimatedCounters() {
    const counterSection = document.querySelector('.stats');
    if (!counterSection) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          this.animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });

    observer.observe(counterSection);
  }

  animateCounters() {
    document.querySelectorAll('.stat-number').forEach(counter => {
      const target = parseInt(counter.dataset.target || 0);
      let value = 0;
      const step = target / 30;
      function update() {
        value += step;
        if (value < target) {
          counter.textContent = Math.floor(value);
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      }
      update();
    });
  }

  // ✅ WhatsApp Integrated Contact Form
  setupContactForm() {
    const waForm = document.getElementById('whatsapp-form');
    if (!waForm) return;

    waForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('user-name')?.value.trim();
      const message = document.getElementById('user-message')?.value.trim();

      if (!name || !message) {
        alert("Please fill in both fields.");
        return;
      }

      const phone = '919044510566'; // ✅ Your WhatsApp number (no +)
      const msg = `Hello, my name is ${name} 👋\n\n${message}`;
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

      window.open(url, '_blank');
    });
  }

  // ✅ Blog Modal Handling (custom blogging)
  setupBlogFunctionality() {
    const btn = document.getElementById('addBlogBtn');
    if (btn) {
      btn.addEventListener('click', e => {
        e.preventDefault();
        this.openBlogModal();
      });
    }
  }

  openBlogModal() {
    const modal = document.getElementById('blogModal');
    const form = document.getElementById('blogForm');
    if (!modal || !form) return;

    form.reset();
    modal.style.display = 'flex';
    modal.style.opacity = '1';

    const firstInput = form.querySelector('input');
    setTimeout(() => firstInput?.focus(), 100);
  }

  closeBlogModal() {
    const modal = document.getElementById('blogModal');
    if (!modal) return;
    modal.style.opacity = '0';
    setTimeout(() => modal.style.display = 'none', 300);
  }

  // ✅ Dummy Blog Data
  loadSampleBlogPosts() {
    this.blogPosts = [
      {
        id: 1,
        title: "Advanced VAPT Methodologies",
        excerpt: "Exploring next-gen penetration testing approaches.",
        content: "Full post content here...",
        date: "2025-07-20",
        tags: ["VAPT", "Security"],
        readTime: "8 min read"
      }
    ];
    this.renderBlogPosts();
  }

  renderBlogPosts(posts = this.blogPosts) {
    const container = document.getElementById('blogGrid');
    if (!container) return;
    container.innerHTML = '';

    if (posts.length === 0) {
      container.innerHTML = '<p style="color:#888">No blog posts found.</p>';
      return;
    }

    posts.forEach(p => {
      const postEl = document.createElement('article');
      postEl.className = 'blog-post';
      postEl.innerHTML = `
        <div><h3>${p.title}</h3><small>${p.date} • ${p.readTime}</small></div>
        <p>${p.excerpt}</p>
        <div>${p.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join(' ')}</div>
      `;
      container.appendChild(postEl);
    });
  }

  // ✅ Aesthetic effects
  setupScrollEffects() {
    // Scroll progress
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = (scrollTop / docHeight) * 100;
      bar.style.width = `${percent}%`;
    });

    // Optional parallax or fade-in could go here
  }
}

// ✅ Initialize App
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
  // AOS already handled via HTML
});
