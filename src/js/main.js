/* ==========================================================================
   ALL POWER CLEANING SERVICES - Main JavaScript
   ========================================================================== */

(function () {
  'use strict';

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
  // Mobile navigation
  // --------------------------------------------------------------------------
  function initMobileNav() {
    var toggleBtn = document.getElementById('menu-toggle');
    var closeBtn = document.getElementById('menu-close');
    var mobileNav = document.getElementById('mobile-nav');
    if (!toggleBtn || !closeBtn || !mobileNav) return;

    function openNav() {
      mobileNav.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      mobileNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
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

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeNav();
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
  // Gallery filter
  // --------------------------------------------------------------------------
  function initGalleryFilter() {
    var filterBtns = document.querySelectorAll('.gallery__filter-btn');
    var galleryItems = document.querySelectorAll('.gallery__item');
    if (!filterBtns.length || !galleryItems.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        // Update active button
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Filter items
        galleryItems.forEach(function (item) {
          var category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.style.display = '';
            item.style.opacity = '0';
            requestAnimationFrame(function () {
              item.style.transition = 'opacity 0.3s ease';
              item.style.opacity = '1';
            });
          } else {
            item.style.opacity = '0';
            setTimeout(function () {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // Form handling
  // --------------------------------------------------------------------------
  function initForms() {
    var heroForm = document.getElementById('hero-form');
    if (!heroForm) return;

    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(heroForm);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      // Basic validation
      if (!data.service || !data.name || !data.phone || !data.zip) {
        alert('Please fill in all fields to get your free quote.');
        return;
      }

      // Phone number validation (basic)
      var phoneClean = data.phone.replace(/\D/g, '');
      if (phoneClean.length < 10) {
        alert('Please enter a valid phone number.');
        return;
      }

      // ZIP code validation
      if (!/^\d{5}$/.test(data.zip)) {
        alert('Please enter a valid 5-digit ZIP code.');
        return;
      }

      // Show success state
      var submitBtn = heroForm.querySelector('button[type="submit"]');
      var originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Quote Requested!';
      submitBtn.disabled = true;
      submitBtn.style.backgroundColor = '#16A34A';

      // In production, you would send this data to your backend/API
      // For now, log it and show confirmation
      console.log('Quote form submitted:', data);

      // Reset after 3 seconds
      setTimeout(function () {
        heroForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.backgroundColor = '';
      }, 3000);
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
