/* ==========================================================================
   Chamod Senarathne — Portfolio Scripts & Interactions
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // Set Current Year in Footer
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Loading Screen Handler
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
      }, 400);
    });
    // Fallback hide after 1.5s if load event fired earlier
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 1500);
  }

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking nav links
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Sticky Header Effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Back to Top Button
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Active Navigation ScrollSpy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  function scrollSpy() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', scrollSpy);

  // Smooth Scroll for Internal Anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Background Particles Generation
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    function createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${Math.random() * 6 + 4}s`;
      particle.style.animationDelay = `${Math.random() * 2}s`;
      
      particlesContainer.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 10000);
    }

    // Initial batch of particles
    for (let i = 0; i < 25; i++) {
      setTimeout(createParticle, i * 150);
    }

    // Continuous creation
    setInterval(createParticle, 400);
  }

  // Toast Notification System
  const toast = document.getElementById('notificationToast');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(message, isError = false) {
    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    const icon = toast.querySelector('i');
    
    if (isError) {
      toast.style.borderColor = '#ef4444';
      if (icon) {
        icon.className = 'fas fa-exclamation-circle';
        icon.style.color = '#ef4444';
      }
    } else {
      toast.style.borderColor = 'var(--border-glow)';
      if (icon) {
        icon.className = 'fas fa-check-circle';
        icon.style.color = '#10b981';
      }
    }

    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Contact Form Submission Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        showToast('Please fill in all fields before sending.', true);
        return;
      }

      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Please enter a valid email address.', true);
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate network request
      setTimeout(() => {
        showToast('Thank you! Your message has been sent successfully.');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

});