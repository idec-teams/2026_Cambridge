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

  function initialiseArchiveTimeline() {
    var timeline = document.querySelector(".archive-timeline");

    if (
      !timeline ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    var items = timeline.querySelectorAll(".archive-timeline__item");
    var observer = new IntersectionObserver(
      function (entries, currentObserver) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    timeline.classList.add("is-timeline-ready");
    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function initialiseScrollToTop() {
    var button = document.querySelector(".scroll-to-top");

    if (!button) {
      return;
    }

    function updateVisibility() {
      button.hidden = window.scrollY < 400;
    }

    button.addEventListener("click", function () {
      var reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    });

    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();
  }

  function initialiseSite() {
    initialiseSectionReveal();
    initialiseArchiveTimeline();
    initialiseScrollToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialiseSite);
  } else {
    initialiseSite();
  }
})();
