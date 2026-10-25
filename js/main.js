/* =============================================================
   SAMPLE GYM — main JavaScript
   Small, dependency-free enhancements:
   - Mobile navigation
   - Header state + active nav link
   - Scroll reveal animations
   - Membership plan prefill
   - Demo contact form validation
   ============================================================= */
(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var nav = document.getElementById("primary-nav");
  var navToggle = document.getElementById("nav-toggle");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav__link"));
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* -----------------------------------------------------------
     Mobile navigation
     ----------------------------------------------------------- */
  function closeMenu(returnFocus) {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("menu-open");
    header.classList.remove("is-menu-open");
    if (returnFocus) navToggle.focus();
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu(false);
        return;
      }
      nav.classList.add("is-open");
      navToggle.setAttribute("aria-expanded", "true");
      navToggle.setAttribute("aria-label", "Close menu");
      document.body.classList.add("menu-open");
      header.classList.add("is-menu-open");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu(true);
      }
    });

    document.addEventListener("click", function (event) {
      if (
        nav.classList.contains("is-open") &&
        !nav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        closeMenu(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 960 && nav.classList.contains("is-open")) {
        closeMenu(false);
      }
    });
  }

  /* -----------------------------------------------------------
     Header background + scrollspy
     ----------------------------------------------------------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var ticking = false;

  function updateOnScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (header) header.classList.toggle("is-scrolled", y > 12);

    if (sections.length && navLinks.length) {
      var offset = y + (header ? header.offsetHeight : 0) + 120;
      var currentId = sections[0].id;

      sections.forEach(function (section) {
        if (section.offsetTop <= offset) currentId = section.id;
      });

      navLinks.forEach(function (link) {
        var isActive = link.getAttribute("href") === "#" + currentId;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    ticking = false;
  }

  function requestScrollUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(updateOnScroll);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", requestScrollUpdate);
  updateOnScroll();

  /* -----------------------------------------------------------
     Scroll reveal (skipped for reduced-motion users)
     ----------------------------------------------------------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reveals.length) {
    var revealAll = function () {
      reveals.forEach(function (el) {
        el.classList.add("is-visible");
      });
    };

    if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
      revealAll();
    } else {
      // Only hide elements once we know the observer is ready to reveal them.
      // If this script fails to load, all content stays visible.
      document.documentElement.classList.add("js");

      var revealObserver = new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      reveals.forEach(function (el) {
        revealObserver.observe(el);
      });

      // Ensure content is never left hidden if motion preferences change.
      if (typeof prefersReducedMotion.addEventListener === "function") {
        prefersReducedMotion.addEventListener("change", function (event) {
          if (event.matches) revealAll();
        });
      }
    }
  }

  /* -----------------------------------------------------------
     Membership plan → prefill the contact message
     ----------------------------------------------------------- */
  var messageField = document.getElementById("message");

  document.querySelectorAll("[data-plan]").forEach(function (link) {
    link.addEventListener("click", function () {
      if (!messageField) return;

      var plan = link.getAttribute("data-plan");
      messageField.value =
        "Hi SAMPLE GYM, I'm interested in the " +
        plan +
        " membership plan. Please share more details.";

      messageField.removeAttribute("aria-invalid");
      var messageError = document.getElementById("message-error");
      if (messageError) messageError.textContent = "";

      var success = document.getElementById("form-success");
      if (success) success.hidden = true;
    });
  });

  /* -----------------------------------------------------------
     Contact form validation (demo only — no backend)
     ----------------------------------------------------------- */
  var form = document.getElementById("contact-form");

  if (form) {
    var fields = {
      name: form.elements.name,
      phone: form.elements.phone,
      email: form.elements.email,
      message: form.elements.message
    };

    var validators = {
      name: function (value) {
        return value.trim().length >= 2 ? "" : "Please enter your name (at least 2 characters).";
      },
      phone: function (value) {
        var trimmed = value.trim();
        var digits = trimmed.replace(/\D/g, "");
        var allowedCharacters = /^[+()\d\s-]+$/.test(trimmed);
        return digits.length >= 7 && digits.length <= 15 && allowedCharacters
          ? ""
          : "Please enter a valid phone number (7–15 digits).";
      },
      email: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
          ? ""
          : "Please enter a valid email address.";
      },
      message: function (value) {
        return value.trim().length >= 10
          ? ""
          : "Please add a short message (at least 10 characters).";
      }
    };

    var successBox = document.getElementById("form-success");
    var successName = document.getElementById("success-name");

    function setFieldError(name, message) {
      var field = fields[name];
      var error = document.getElementById(name + "-error");
      if (!field) return;

      if (message) {
        field.setAttribute("aria-invalid", "true");
      } else {
        field.removeAttribute("aria-invalid");
      }

      if (error) error.textContent = message;
    }

    Object.keys(validators).forEach(function (name) {
      var field = fields[name];
      if (!field) return;

      field.addEventListener("blur", function () {
        setFieldError(name, validators[name](field.value));
      });

      field.addEventListener("input", function () {
        if (successBox) successBox.hidden = true;

        if (field.getAttribute("aria-invalid") === "true") {
          setFieldError(name, validators[name](field.value));
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (successBox) successBox.hidden = true;

      var firstInvalid = null;

      Object.keys(validators).forEach(function (name) {
        var field = fields[name];
        if (!field) return;

        var message = validators[name](field.value);
        setFieldError(name, message);

        if (message && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      if (successName) {
        var firstName = fields.name.value.trim().split(/\s+/)[0];
        successName.textContent = firstName || "friend";
      }

      form.reset();
      Object.keys(validators).forEach(function (name) {
        setFieldError(name, "");
      });

      if (successBox) {
        successBox.hidden = false;
        successBox.focus();
      }
    });
  }

  /* -----------------------------------------------------------
     Footer year
     ----------------------------------------------------------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
