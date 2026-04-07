/**
 * Final Project - Interactive Personal Profile Website
 * JavaScript Implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Data for Dynamic Content ---
  const skills = [
    { name: 'PHP', icon: 'fab fa-php' },
    { name: 'Laravel', icon: 'fab fa-laravel' },
    { name: 'Linux', icon: 'fab fa-linux' },
    { name: 'Server Admin', icon: 'fas fa-server' },
    { name: 'AWS', icon: 'fab fa-aws' },
    { name: 'GitHub', icon: 'fab fa-github' },
    { name: 'Cybersecurity', icon: 'fas fa-shield-alt' },
    { name: 'SQL', icon: 'fas fa-database' }
  ];

  const portfolioItems = [
    {
      title: 'Sistem Informasi Daerah',
      category: 'web',
      image: 'fa-city',
      description: 'Pengembangan sistem informasi terintegrasi untuk pelayanan publik di Kabupaten Sekadau.',
      link: 'https://github.com/halimdirgantara'
    },
    {
      title: 'Laravel Spatie Automate',
      category: 'web',
      image: 'fa-vial',
      description: 'Script otomatisasi untuk manajemen permission menggunakan Spatie Laravel-permissions.',
      link: 'https://dev.to/halimdirgantara'
    },
    {
      title: 'Server Setup Script',
      category: 'server',
      image: 'fa-terminal',
      description: 'Automated bash script untuk hardening server Linux dan deployment environment Laravel.',
      link: '#'
    },
    {
      title: 'Government Cloud Config',
      category: 'server',
      image: 'fa-cloud',
      description: 'Konfigurasi infrastruktur cloud (AWS/Lokal) untuk hosting aplikasi pemerintah daerah.',
      link: '#'
    },
    {
      title: 'Cybersecurity Audit',
      category: 'security',
      image: 'fa-user-shield',
      description: 'Analisis keamanan sistem dan penerapan standar keamanan pada transaksi finansial daerah.',
      link: '#'
    },
    {
      title: 'Technical Blog',
      category: 'web',
      image: 'fa-blog',
      description: 'Berbagi wawasan teknis seputar Laravel dan DevOps melalui platform DEV Community.',
      link: 'https://dev.to/halimdirgantara'
    }
  ];

  // --- Initialize Components ---
  initDarkMode();
  initNavigation();
  initDynamicContent();
  initPortfolioFilter();
  initFormValidation();
  initScrollAnimations();

  // --- 3.1 Dark Mode Toggle ---
  function initDarkMode() {
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const icon = toggleBtn.querySelector('i');

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      body.setAttribute('data-theme', 'dark');
      icon.className = 'fas fa-sun';
    }

    toggleBtn.addEventListener('click', () => {
      if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        icon.className = 'fas fa-moon';
      } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        icon.className = 'fas fa-sun';
      }
    });
  }

  // --- 3.2 Mobile Navigation ---
  function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // Toggle Mobile Menu
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        // Handle active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = 'var(--shadow)';
      } else {
        navbar.style.padding = '0';
        navbar.style.boxShadow = 'none';
      }
      
      // Highlight active link on scroll
      updateActiveLinkOnScroll();
    });

    function updateActiveLinkOnScroll() {
      const sections = document.querySelectorAll('section');
      let current = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
  }

  // --- Dynamic Content Generation ---
  function initDynamicContent() {
    // Render Skills
    const skillsGrid = document.querySelector('.skills-grid');
    skills.forEach(skill => {
      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item reveal';
      skillItem.innerHTML = `
        <i class="${skill.icon}"></i>
        <span>${skill.name}</span>
      `;
      skillsGrid.appendChild(skillItem);
    });

    // Render Portfolio
    renderPortfolio('all');
  }

  function renderPortfolio(filter) {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    portfolioGrid.innerHTML = ''; // Clear existing items

    const filteredItems = filter === 'all' 
      ? portfolioItems 
      : portfolioItems.filter(item => item.category === filter);

    filteredItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'portfolio-item reveal';
      card.innerHTML = `
        <div class="portfolio-img">
          <i class="fas ${item.image}"></i>
        </div>
        <div class="portfolio-info">
          <span class="portfolio-category">${item.category}</span>
          <h3 class="portfolio-title">${item.title}</h3>
          <p>${item.description}</p>
          <a href="${item.link}" class="portfolio-link">
            Lihat Project <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      `;
      portfolioGrid.appendChild(card);
    });
  }

  // --- 3.4 Portfolio Filtering ---
  function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Filter items
        const filter = btn.getAttribute('data-filter');
        renderPortfolio(filter);
        
        // Trigger reveal for new items
        setTimeout(initScrollAnimations, 100);
      });
    });
  }

  // --- 3.3 Form Validation & Submission ---
  function initFormValidation() {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input, textarea');

    // Real-time validation
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        validateInput(input);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      inputs.forEach(input => {
        if (!validateInput(input)) {
          isValid = false;
        }
      });

      if (isValid) {
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        submitBtn.disabled = true;
        submitBtn.innerText = 'Mengirim...';

        setTimeout(() => {
          showToast('Pesan berhasil dikirim!');
          form.reset();
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }, 1500);
      }
    });

    function validateInput(input) {
      const errorSpan = document.getElementById(`${input.id}-error`);
      let valid = true;
      let message = '';

      if (input.required && !input.value.trim()) {
        valid = false;
        message = 'Field ini wajib diisi';
      } else if (input.type === 'email' && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          valid = false;
          message = 'Format email tidak valid';
        }
      }

      if (!valid) {
        errorSpan.innerText = message;
        input.style.borderColor = '#ef4444';
      } else {
        errorSpan.innerText = '';
        input.style.borderColor = 'var(--border-color)';
      }

      return valid;
    }
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = toast.querySelector('.toast-message');
    
    toastMsg.innerText = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // --- 3.5 Scroll Animations ---
  function initScrollAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observerOptions = {
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    reveals.forEach(reveal => {
      observer.observe(reveal);
    });

    // Also add reveal to section titles
    document.querySelectorAll('.section-title').forEach(title => {
      title.classList.add('reveal');
      observer.observe(title);
    });
  }
});
