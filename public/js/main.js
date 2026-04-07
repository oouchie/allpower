/* ==========================================================================
   ALL POWER CLEANING SERVICES - Main JavaScript
   ========================================================================== */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Page Loader - fade out on window load (minimal delay)
  // --------------------------------------------------------------------------
  function initPageLoader() {
    var loader = document.getElementById('page-loader');
    if (!loader) return;

    window.addEventListener('load', function () {
      loader.classList.add('is-hidden');
    });
  }

  // --------------------------------------------------------------------------
  // Announcement Bar - dismiss with persistence
  // --------------------------------------------------------------------------
  function initAnnouncementBar() {
    var bar = document.getElementById('announcement-bar');
    var closeBtn = document.getElementById('announcement-close');
    if (!bar || !closeBtn) return;

    if (sessionStorage.getItem('announcement-dismissed')) {
      bar.remove();
      return;
    }

    closeBtn.addEventListener('click', function () {
      bar.remove();
      sessionStorage.setItem('announcement-dismissed', '1');
    });
  }

  // --------------------------------------------------------------------------
  // Stat Counters - animate from 0 to target on scroll
  // --------------------------------------------------------------------------
  function initStatCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var animated = false;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(function (counter) {
            var target = parseInt(counter.getAttribute('data-count'), 10);
            var duration = 1500;
            var startTime = null;

            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              var eased = 1 - Math.pow(1 - progress, 3);
              counter.textContent = Math.floor(eased * target);
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                counter.textContent = target;
              }
            }

            requestAnimationFrame(step);
          });
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    var statsContainer = document.querySelector('.hero__stats');
    if (statsContainer) {
      observer.observe(statsContainer);
    }
  }

  // --------------------------------------------------------------------------
  // Floating Particles - create cyan dots in hero
  // --------------------------------------------------------------------------
  function initFloatingParticles() {
    var container = document.getElementById('hero-particles');
    if (!container) return;

    var particleCount = 20;

    for (var i = 0; i < particleCount; i++) {
      var particle = document.createElement('div');
      particle.className = 'hero__particle';

      var left = Math.random() * 100;
      var size = Math.random() * 2 + 2;
      var duration = Math.random() * 10 + 8;
      var delay = Math.random() * 10;
      var opacity = Math.random() * 0.4 + 0.2;

      particle.style.left = left + '%';
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.animationDuration = duration + 's';
      particle.style.animationDelay = delay + 's';
      particle.style.opacity = opacity;

      container.appendChild(particle);
    }
  }

  // --------------------------------------------------------------------------
  // Scroll-triggered animations (IntersectionObserver)
  // --------------------------------------------------------------------------
  function initScrollAnimations() {
    var animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (!animatedElements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --------------------------------------------------------------------------
  // Header scroll behavior (shadow on scroll)
  // --------------------------------------------------------------------------
  function initHeaderScroll() {
    var header = document.getElementById('header');
    if (!header) return;

    var scrollThreshold = 10;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --------------------------------------------------------------------------
  // Mobile navigation (with focus trap)
  // --------------------------------------------------------------------------
  function initMobileNav() {
    var toggleBtn = document.getElementById('menu-toggle');
    var closeBtn = document.getElementById('menu-close');
    var mobileNav = document.getElementById('mobile-nav');
    if (!toggleBtn || !closeBtn || !mobileNav) return;

    var panel = mobileNav.querySelector('.mobile-nav__panel');

    function getFocusableElements() {
      return panel.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])');
    }

    function openNav() {
      mobileNav.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Move focus to close button
      setTimeout(function () { closeBtn.focus(); }, 100);
    }

    function closeNav() {
      mobileNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggleBtn.focus();
    }

    toggleBtn.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);

    // Close on overlay click
    mobileNav.addEventListener('click', function (e) {
      if (e.target === mobileNav) closeNav();
    });

    // Close on link click
    var navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', closeNav);
    });

    // Close on Escape key + focus trap
    document.addEventListener('keydown', function (e) {
      if (!mobileNav.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        closeNav();
        return;
      }

      // Focus trap
      if (e.key === 'Tab') {
        var focusable = getFocusableElements();
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // Mobile sticky CTA bar
  // --------------------------------------------------------------------------
  function initMobileCTA() {
    var mobileCTA = document.getElementById('mobile-cta');
    var hero = document.getElementById('hero');
    if (!mobileCTA || !hero) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          mobileCTA.classList.remove('is-visible');
        } else {
          mobileCTA.classList.add('is-visible');
        }
      });
    }, {
      threshold: 0,
      rootMargin: '-100px 0px 0px 0px'
    });

    observer.observe(hero);
  }

  // --------------------------------------------------------------------------
  // Back to top button
  // --------------------------------------------------------------------------
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    function onScroll() {
      if (window.scrollY > 600) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --------------------------------------------------------------------------
  // FAQ accordion
  // --------------------------------------------------------------------------
  function initFAQ() {
    var faqItems = document.querySelectorAll('.faq__item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var questionBtn = item.querySelector('.faq__question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        // Close all other items
        faqItems.forEach(function (otherItem) {
          otherItem.classList.remove('is-open');
          var otherBtn = otherItem.querySelector('.faq__question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (!isOpen) {
          item.classList.add('is-open');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // Gallery filter (with race condition fix)
  // --------------------------------------------------------------------------
  function initGalleryFilter() {
    var filterBtns = document.querySelectorAll('.gallery__filter-btn');
    var galleryItems = document.querySelectorAll('.gallery__item');
    if (!filterBtns.length || !galleryItems.length) return;

    var currentFilter = 'all';

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        currentFilter = filter;

        // Update active button
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Filter items
        galleryItems.forEach(function (item) {
          var category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            // Force reflow before starting transition
            item.offsetHeight;
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = '1';
          } else {
            item.style.transition = 'opacity 0.3s ease';
            item.style.opacity = '0';
            var capturedFilter = currentFilter;
            setTimeout(function () {
              // Only hide if filter hasn't changed since
              if (currentFilter === capturedFilter) {
                item.style.display = 'none';
              }
            }, 300);
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // Inline form validation helper
  // --------------------------------------------------------------------------
  function showFieldError(input, message) {
    clearFieldError(input);
    var error = document.createElement('span');
    error.className = 'form-error';
    error.textContent = message;
    error.style.color = '#EF4444';
    error.style.fontSize = '0.75rem';
    error.style.marginTop = '0.25rem';
    error.style.display = 'block';
    input.style.borderColor = '#EF4444';
    input.parentNode.appendChild(error);
  }

  function clearFieldError(input) {
    input.style.borderColor = '';
    var existing = input.parentNode.querySelector('.form-error');
    if (existing) existing.remove();
  }

  function clearAllErrors(form) {
    var errors = form.querySelectorAll('.form-error');
    errors.forEach(function (e) { e.remove(); });
    var inputs = form.querySelectorAll('.form-input, .form-select');
    inputs.forEach(function (i) { i.style.borderColor = ''; });
  }

  // --------------------------------------------------------------------------
  // Form handling (inline validation, placeholder submit)
  // --------------------------------------------------------------------------
  function initForms() {
    var heroForm = document.getElementById('hero-form');
    if (!heroForm) return;

    // Clear errors on input
    heroForm.querySelectorAll('.form-input, .form-select').forEach(function (input) {
      input.addEventListener('input', function () { clearFieldError(input); });
      input.addEventListener('change', function () { clearFieldError(input); });
    });

    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearAllErrors(heroForm);

      var service = heroForm.querySelector('[name="service"]');
      var name = heroForm.querySelector('[name="name"]');
      var phone = heroForm.querySelector('[name="phone"]');

      var hasError = false;

      if (!service.value) {
        showFieldError(service, 'Please select a service.');
        hasError = true;
      }
      if (!name.value.trim()) {
        showFieldError(name, 'Please enter your name.');
        hasError = true;
      }

      var phoneClean = phone.value.replace(/\D/g, '');
      if (phoneClean.length < 10) {
        showFieldError(phone, 'Please enter a valid 10-digit phone number.');
        hasError = true;
      }

      if (hasError) {
        // Focus first error field
        var firstError = heroForm.querySelector('[style*="border-color"]');
        if (firstError) firstError.focus();
        return;
      }

      // Show loading state
      var submitBtn = heroForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;

      // Submit to Netlify Forms
      var formData = new FormData(heroForm);
      var encoded = new URLSearchParams(formData).toString();

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded
      })
      .then(function (response) {
        if (!response.ok) throw new Error('Status ' + response.status);
        // Success state
        submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Quote Requested!';
        submitBtn.classList.remove('btn--primary');
        submitBtn.style.cssText = 'background: #16A34A; border-color: #16A34A;';

        setTimeout(function () {
          heroForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.add('btn--primary');
          submitBtn.style.cssText = '';
        }, 3000);
      })
      .catch(function (err) {
        // Show error message instead of redirecting to broken page
        submitBtn.innerHTML = 'Error — Please Call 678.485.2303';
        submitBtn.style.cssText = 'background: #EF4444; border-color: #EF4444;';

        setTimeout(function () {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          submitBtn.style.cssText = '';
        }, 4000);
      });
    });
  }

  // --------------------------------------------------------------------------
  // Smooth scroll for anchor links
  // --------------------------------------------------------------------------
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href');
        if (href === '#') return;

        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var headerHeight = document.getElementById('header')
            ? document.getElementById('header').offsetHeight
            : 0;
          var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // Active nav link highlighting
  // --------------------------------------------------------------------------
  function initActiveNav() {
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.header__nav a');
    if (!sections.length || !navLinks.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '-80px 0px -60% 0px'
    });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  // --------------------------------------------------------------------------
  // Phone number formatting (auto-format as user types)
  // --------------------------------------------------------------------------
  function initPhoneFormatting() {
    var phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(function (input) {
      input.addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      });
    });
  }

  // --------------------------------------------------------------------------
  // Initialize everything on DOM ready
  // --------------------------------------------------------------------------
  function init() {
    initPageLoader();
    initAnnouncementBar();
    initFloatingParticles();
    initStatCounters();
    initScrollAnimations();
    initHeaderScroll();
    initMobileNav();
    initMobileCTA();
    initBackToTop();
    initFAQ();
    initGalleryFilter();
    initForms();
    initSmoothScroll();
    initActiveNav();
    initPhoneFormatting();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
