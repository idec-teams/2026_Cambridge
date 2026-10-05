(function () {
  "use strict";

  function initialiseSectionReveal() {
    var sections = document.querySelectorAll(
      ".home-page > section:not(.hero)"
    );

    if (!sections.length) {
      return;
    }

    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      sections.forEach(function (section) {
        section.classList.add("is-visible");
      });
      return;
    }

    sections.forEach(function (section) {
      section.classList.add("js-reveal");
    });

    var observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseSectionReveal);
  } else {
    initialiseSectionReveal();
  }
})();

