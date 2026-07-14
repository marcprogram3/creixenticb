document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  var overlay = document.querySelector(".nav-overlay");

  function openNav() {
    nav.classList.add("open");
    toggle.classList.add("active");
    if (overlay) overlay.classList.add("visible");
    document.body.classList.add("nav-locked");
  }

  function closeNav() {
    nav.classList.remove("open");
    toggle.classList.remove("active");
    if (overlay) overlay.classList.remove("visible");
    document.body.classList.remove("nav-locked");
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      if (nav.classList.contains("open")) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (overlay) overlay.addEventListener("click", closeNav);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }

    // Safety net: guarantee content is never left permanently hidden.
    setTimeout(function () {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 2500);
  }

  var form = document.querySelector(".contact-form form");
  var successMsg = document.querySelector(".form-success");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.reset();
      if (successMsg) {
        successMsg.classList.add("visible");
        successMsg.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }
});
