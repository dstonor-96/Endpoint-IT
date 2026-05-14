(function () {
  'use strict';

  /* ===========================
     Mobile Navigation
     =========================== */
  function initMobileNav() {
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    // Create overlay element
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);

    function openMenu() {
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('open');
      overlay.classList.add('open');
      document.body.classList.add('nav-open');
    }

    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      overlay.classList.remove('open');
      document.body.classList.remove('nav-open');
    }

    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Close on nav link click
    var links = nav.querySelectorAll('.nav-link');
    links.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });
  }

  /* ===========================
     Sticky Header
     =========================== */
  function initStickyHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;

    var scrollThreshold = 50;

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

  /* ===========================
     Scroll Reveal (IntersectionObserver)
     =========================== */
  function initScrollReveal() {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var revealElements = document.querySelectorAll('[data-reveal], [data-reveal-stagger]');
    if (!revealElements.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ===========================
     Back to Top Button
     =========================== */
  function initBackToTop() {
    var btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '↑';
    document.body.appendChild(btn);

    var scrollThreshold = 300;

    function onScroll() {
      if (window.scrollY > scrollThreshold) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===========================
     Pricing Toggle
     =========================== */
  function initPricingToggle() {
    var toggleBtns = document.querySelectorAll('.pricing-toggle-btn');
    var sections = document.querySelectorAll('.pricing-section');
    if (!toggleBtns.length || !sections.length) return;

    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-target');

        // Update button states
        toggleBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        // Show target section, hide others
        sections.forEach(function (section) {
          if (section.id === target) {
            section.classList.add('active');
          } else {
            section.classList.remove('active');
          }
        });
      });
    });
  }

  /* ===========================
     Contact Form Validation
     =========================== */
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    form.setAttribute('novalidate', '');

    // Live validation — clear error on input
    form.addEventListener('input', function (e) {
      var el = e.target;
      if (el.classList.contains('error')) {
        el.classList.remove('error');
        var errorEl = el.closest('.form-group').querySelector('.form-error');
        if (errorEl) errorEl.classList.remove('visible');
      }
    });

    form.addEventListener('change', function (e) {
      var el = e.target;
      if (el.classList.contains('error')) {
        el.classList.remove('error');
        var errorEl = el.closest('.form-group').querySelector('.form-error');
        if (errorEl) errorEl.classList.remove('visible');
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;
      var firstErrorField = null;

      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(function (el) {
        el.classList.remove('visible');
      });
      form.querySelectorAll('.form-input, .form-textarea').forEach(function (el) {
        el.classList.remove('error');
      });
      form.querySelectorAll('.custom-select-wrapper').forEach(function (el) {
        el.classList.remove('error');
      });

      // Validate name
      var name = form.querySelector('#contact-name');
      if (name && !name.value.trim()) {
        showFieldError(name, 'name-error');
        if (!firstErrorField) firstErrorField = name;
        isValid = false;
      }

      // Validate email
      var email = form.querySelector('#contact-email');
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email && !emailPattern.test(email.value.trim())) {
        showFieldError(email, 'email-error');
        if (!firstErrorField) firstErrorField = email;
        isValid = false;
      }

      // Validate suburb
      var suburb = form.querySelector('#contact-suburb');
      if (suburb && !suburb.value) {
        showSelectError(suburb, 'suburb-error');
        if (!firstErrorField) firstErrorField = suburb.closest('.custom-select-wrapper').querySelector('.custom-select-trigger');
        isValid = false;
      }

      // Validate service
      var service = form.querySelector('#contact-service');
      if (service && !service.value) {
        showSelectError(service, 'service-error');
        if (!firstErrorField) firstErrorField = service.closest('.custom-select-wrapper').querySelector('.custom-select-trigger');
        isValid = false;
      }

      // Validate message
      var message = form.querySelector('#contact-message');
      if (message && !message.value.trim()) {
        showFieldError(message, 'message-error');
        if (!firstErrorField) firstErrorField = message;
        isValid = false;
      }

      if (isValid) {
        submitForm(form);
      } else if (firstErrorField) {
        firstErrorField.focus();
      }
    });

    function submitForm(form) {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending\u2026'; }

      var formData = new FormData(form);

      fetch(form.getAttribute('action') || window.location.pathname, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      })
      .then(function (res) {
        if (!res.ok) throw new Error('Network response was not ok');
        showToast('Message sent! I\u2019ll get back to you within one business day.', 'success');
        form.reset();
        resetCustomSelects(form);
      })
      .catch(function () {
        showToast('Something went wrong \u2014 please email contact@endpointit.com.au instead.', 'error');
      })
      .finally(function () {
        if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
      });
    }

    function resetCustomSelects(form) {
      form.querySelectorAll('.custom-select-wrapper').forEach(function (w) {
        var label = w.querySelector('.custom-select-label');
        var trigger = w.querySelector('.custom-select-trigger');
        var nativeSelect = w.querySelector('.form-select');
        if (label && nativeSelect) {
          var placeholder = nativeSelect.options[0] && nativeSelect.options[0].disabled ? nativeSelect.options[0].textContent : 'Select\u2026';
          label.textContent = placeholder;
          trigger.classList.remove('has-value');
        }
        w.querySelectorAll('.custom-select-option.selected').forEach(function (o) {
          o.classList.remove('selected');
        });
      });
    }

    function showFieldError(field, errorId) {
      field.classList.add('error');
      var errorEl = document.getElementById(errorId);
      if (errorEl) errorEl.classList.add('visible');
    }

    function showSelectError(select, errorId) {
      var wrapper = select.closest('.custom-select-wrapper');
      if (wrapper) wrapper.classList.add('error');
      var errorEl = document.getElementById(errorId);
      if (errorEl) errorEl.classList.add('visible');
    }
  }

  /* ===========================
     Active Nav Highlighting
     =========================== */
  function initActiveNav() {
    var path = window.location.pathname;
    var links = document.querySelectorAll('.nav-link');

    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;

      // Normalize both paths for comparison
      var linkPath = href.replace(/\.\.\//g, '').replace(/^\.\//, '');
      var currentPath = path.replace(/^\//, '');

      // Handle index page
      var isHome = linkPath === 'index.html' || linkPath === '';
      var isCurrentHome = currentPath === '' || currentPath === 'index.html' || currentPath.endsWith('/endpoint-it/') || currentPath.endsWith('/endpoint-it/index.html');

      if (isHome && isCurrentHome) {
        link.classList.add('active');
      } else if (!isHome && currentPath.indexOf(linkPath.replace(/^.*\//, '')) !== -1 && linkPath.indexOf('index') === -1) {
        link.classList.add('active');
      }
    });
  }

  /* ===========================
     Toast Notification
     =========================== */
  function showToast(message, type) {
    type = type || 'success';

    // Remove any existing toast
    var existing = document.querySelector('.toast');
    if (existing) existing.remove();

    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.classList.add('show');
      });
    });

    // Auto-remove
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () {
        if (toast.parentNode) toast.remove();
      }, 400);
    }, 4000);
  }

  // Expose showToast globally for potential use
  window.showToast = showToast;

  /* ===========================
     Custom Select Dropdowns
     =========================== */
  function initCustomSelects() {
    var selects = document.querySelectorAll('.form-select');
    selects.forEach(function (select) {
      buildCustomSelect(select);
    });

    // Close all dropdowns when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.custom-select-wrapper')) {
        closeAllDropdowns();
      }
    });
  }

  function buildCustomSelect(select) {
    var wrapper = document.createElement('div');
    wrapper.className = 'custom-select-wrapper';

    var trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'custom-select-trigger';
    trigger.setAttribute('role', 'combobox');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-label', select.previousElementSibling ? select.previousElementSibling.textContent.trim() : 'Select');

    var labelSpan = document.createElement('span');
    labelSpan.className = 'custom-select-label';
    var placeholder = select.options[0] && select.options[0].disabled ? select.options[0].textContent : 'Select...';
    labelSpan.textContent = placeholder;

    var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    arrow.setAttribute('class', 'custom-select-arrow');
    arrow.setAttribute('viewBox', '0 0 12 8');
    arrow.setAttribute('fill', 'none');
    arrow.setAttribute('aria-hidden', 'true');
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M1 1.5l5 5 5-5');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '1.5');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    arrow.appendChild(path);

    trigger.appendChild(labelSpan);
    trigger.appendChild(arrow);

    var dropdown = document.createElement('div');
    dropdown.className = 'custom-select-dropdown';
    dropdown.setAttribute('role', 'listbox');

    var focusedIndex = -1;
    var allOptions = [];

    // Build options from the native select
    Array.from(select.children).forEach(function (child) {
      if (child.tagName === 'OPTGROUP') {
        var group = document.createElement('div');
        group.className = 'custom-select-optgroup';
        var groupLabel = document.createElement('div');
        groupLabel.className = 'custom-select-optgroup-label';
        groupLabel.textContent = child.label;
        group.appendChild(groupLabel);

        Array.from(child.children).forEach(function (opt) {
          var optEl = createOption(opt);
          group.appendChild(optEl);
          allOptions.push(optEl);
        });
        dropdown.appendChild(group);
      } else if (child.tagName === 'OPTION' && !child.disabled) {
        var optEl = createOption(child);
        dropdown.appendChild(optEl);
        allOptions.push(optEl);
      }
    });

    function createOption(opt) {
      var el = document.createElement('div');
      el.className = 'custom-select-option';
      el.setAttribute('role', 'option');
      el.setAttribute('data-value', opt.value);
      el.textContent = opt.textContent;

      el.addEventListener('click', function (e) {
        e.stopPropagation();
        selectOption(opt.value, opt.textContent);
      });

      return el;
    }

    function selectOption(value, text) {
      select.value = value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      labelSpan.textContent = text;
      trigger.classList.add('has-value');
      closeDropdown();

      // Update selected state
      allOptions.forEach(function (o) {
        o.classList.toggle('selected', o.getAttribute('data-value') === value);
      });

      // Clear error state
      wrapper.classList.remove('error');
      var errorEl = wrapper.closest('.form-group').querySelector('.form-error');
      if (errorEl) errorEl.classList.remove('visible');
    }

    function openDropdown() {
      closeAllDropdowns();
      wrapper.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      focusedIndex = -1;

      // Scroll selected option into view
      var selected = dropdown.querySelector('.selected');
      if (selected) {
        selected.scrollIntoView({ block: 'nearest' });
      }
    }

    function closeDropdown() {
      wrapper.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
      focusedIndex = -1;
      clearFocus();
    }

    function clearFocus() {
      allOptions.forEach(function (o) { o.classList.remove('focused'); });
    }

    function focusOption(index) {
      clearFocus();
      if (index >= 0 && index < allOptions.length) {
        focusedIndex = index;
        allOptions[index].classList.add('focused');
        allOptions[index].scrollIntoView({ block: 'nearest' });
      }
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (wrapper.classList.contains('open')) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Keyboard navigation
    trigger.addEventListener('keydown', function (e) {
      var isOpen = wrapper.classList.contains('open');

      if (e.key === 'Escape') {
        closeDropdown();
        trigger.focus();
        e.preventDefault();
      } else if (e.key === 'ArrowDown' || e.key === 'Down') {
        e.preventDefault();
        if (!isOpen) { openDropdown(); }
        focusOption(Math.min(focusedIndex + 1, allOptions.length - 1));
      } else if (e.key === 'ArrowUp' || e.key === 'Up') {
        e.preventDefault();
        if (!isOpen) { openDropdown(); }
        focusOption(Math.max(focusedIndex - 1, 0));
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (isOpen && focusedIndex >= 0) {
          var opt = allOptions[focusedIndex];
          selectOption(opt.getAttribute('data-value'), opt.textContent);
        } else if (!isOpen) {
          openDropdown();
        }
      } else if (e.key === 'Tab') {
        closeDropdown();
      }
    });

    // Insert into DOM
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(trigger);
    wrapper.appendChild(dropdown);
    wrapper.appendChild(select);
  }

  function closeAllDropdowns() {
    document.querySelectorAll('.custom-select-wrapper.open').forEach(function (w) {
      w.classList.remove('open');
      var trig = w.querySelector('.custom-select-trigger');
      if (trig) trig.setAttribute('aria-expanded', 'false');
    });
  }

  /* ===========================
     Init
     =========================== */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initStickyHeader();
    initScrollReveal();
    initBackToTop();
    initPricingToggle();
    initCustomSelects();
    initContactForm();
    initActiveNav();
  });
})();
