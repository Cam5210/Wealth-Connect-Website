/**
 * Wealth Connect - Main JavaScript
 * Handles navigation, animations, form handling, and interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ==========================================================================
  // Navigation
  // ==========================================================================
  
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  
  // Scroll effect for navigation
  function handleNavScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }
  
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll(); // Run on load
  
  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      
      // Animate hamburger to X
      const spans = navToggle.querySelectorAll('span');
      if (navLinks.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = navLinks.querySelectorAll('.nav__link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }
  
  // ==========================================================================
  // Scroll Reveal Animations
  // ==========================================================================
  
  const revealElements = document.querySelectorAll('.reveal');
  
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - revealPoint) {
        element.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Run on load
  
  // ==========================================================================
  // Portfolio Filtering
  // ==========================================================================
  
  const filterButtons = document.querySelectorAll('.portfolio-filter');
  const portfolioCards = document.querySelectorAll('.portfolio-card');
  
  if (filterButtons.length > 0 && portfolioCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.dataset.filter;
        
        // Filter cards
        portfolioCards.forEach(card => {
          const category = card.dataset.category;
          
          if (filter === 'all' || category === filter) {
            card.style.display = '';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  // ==========================================================================
  // Contact Form
  // ==========================================================================
  
  const contactForm = document.getElementById('contact-form');
  const formContent = document.getElementById('form-content');
  const successMessage = document.getElementById('success-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const data = {};
      formData.forEach((value, key) => {
        if (data[key]) {
          if (!Array.isArray(data[key])) {
            data[key] = [data[key]];
          }
          data[key].push(value);
        } else {
          data[key] = value;
        }
      });
      
      // Log form data (in production, this would send to a server)
      console.log('Form submitted:', data);
      
      // Show success message
      formContent.style.display = 'none';
      successMessage.classList.add('active');
      
      // Scroll to success message
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
  
  // ==========================================================================
  // URL Parameter Handling
  // ==========================================================================
  
  // Pre-select checkboxes based on URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  
  // Handle service parameter
  const serviceParam = urlParams.get('service');
  if (serviceParam) {
    const servicesCheckbox = document.querySelector('input[value="services"]');
    if (servicesCheckbox) {
      servicesCheckbox.checked = true;
    }
  }
  
  // Handle interest parameter
  const interestParam = urlParams.get('interest');
  if (interestParam === 'portfolio') {
    const portfolioCheckbox = document.querySelector('input[value="portfolio"]');
    if (portfolioCheckbox) {
      portfolioCheckbox.checked = true;
    }
  }
  
  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        const navHeight = nav.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ==========================================================================
  // Parallax Effect for Hero (subtle)
  // ==========================================================================
  
  const heroPattern = document.querySelector('.hero__pattern');
  
  if (heroPattern) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      heroPattern.style.transform = `translateY(${rate}px)`;
    });
  }
  
  // ==========================================================================
  // Number Animation for Stats (if any)
  // ==========================================================================
  
  function animateNumber(element, start, end, duration) {
    let startTime = null;
    
    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value.toLocaleString();
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  }
  
  // Observe number elements for animation
  const numberElements = document.querySelectorAll('[data-animate-number]');
  
  if (numberElements.length > 0) {
    const numberObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const endValue = parseInt(element.dataset.animateNumber, 10);
          animateNumber(element, 0, endValue, 2000);
          numberObserver.unobserve(element);
        }
      });
    }, { threshold: 0.5 });
    
    numberElements.forEach(el => numberObserver.observe(el));
  }
  
  // ==========================================================================
  // Accessibility: Reduce Motion
  // ==========================================================================
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  
  if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0ms');
    document.documentElement.style.setProperty('--transition-base', '0ms');
    document.documentElement.style.setProperty('--transition-slow', '0ms');
    
    // Immediately show all reveal elements
    revealElements.forEach(el => el.classList.add('active'));
  }
  
});

