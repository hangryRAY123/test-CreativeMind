import { iosVhFix } from "./utils/ios-vh-fix";
import { initModals } from "./modules/modals/init-modals";
import { Form } from "./modules/form-validate/form";
import Swiper from "./vendor/swiper";
import { gsap } from "./vendor/gsap/gsap.min.js";
import { ScrollTrigger } from "./vendor/gsap/ScrollTrigger.min.js";
import { ScrollToPlugin } from "./vendor/gsap/ScrollToPlugin.min.js";

// ---------------------------------

window.addEventListener("DOMContentLoaded", () => {
  if (window.matchMedia("(min-width: 1440px)").matches) {
    let intro = document.querySelector(".intro");
    let about = document.querySelector(".about");
    let team = document.querySelector(".team");

    document.addEventListener("scroll", () => {
      if (window.visualViewport.pageTop > 350) {
        intro.classList.add("opacity");
        about.classList.remove("opacity");
      } else {
        intro.classList.remove("opacity");
        about.classList.add("opacity");
      }

      if (window.visualViewport.pageTop > 1000) {
        team.classList.remove("opacity");
        about.classList.add("opacity");
      } else {
        team.classList.add("opacity");
      }
    });

    // horizontal scroll

    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".horizontal-wrapper section"),
      nav = gsap.utils.toArray(".header__nav li"),
      getMaxWidth = () =>
        sections.reduce((val, section) => val + section.offsetWidth + 7, 1),
      maxWidth = getMaxWidth(),
      scrollSpeed = 4,
      snapProgress,
      lastScrollTween = Date.now(),
      tl = gsap.timeline();

    tl.to(sections, {
      x: () => window.innerWidth - maxWidth,
      duration: 1,
      ease: "none",
    });

    ScrollTrigger.create({
      animation: tl,
      trigger: ".horizontal-wrapper",
      pin: true,
      scrub: 1,
      snap: { snapTo: directionalSnap(tl), duration: 0.5 },
      end: () => "+=" + maxWidth / scrollSpeed,
      invalidateOnRefresh: true,
    });

    function init() {
      gsap.set(sections, { x: 0 });
      maxWidth = getMaxWidth();
      let position = 0,
        distance = maxWidth - window.innerWidth;
      // add a label for each section to the timeline (for "labelsDirectional" functionality):
      tl.add("label0", 0);
      sections.forEach((section, i) => {
        let progress = position;
        position += section.offsetWidth / distance;
        tl.add("label" + (i + 1), position);
      });
    }

    init();
    ScrollTrigger.addEventListener("refreshInit", init); // on resize, things must be recalculated

    function directionalSnap(timeline) {
      return (value, st) => {
        if (Date.now() - lastScrollTween < 1650) {
          // recently finished doing a tweened scroll (clicked link), so don't do any snapping.
          return snapProgress;
        }
        let a = [],
          labels = timeline.labels,
          duration = timeline.duration(),
          p,
          i;
        for (p in labels) {
          a.push(labels[p] / duration);
        }
        a.sort((a, b) => a - b);
        if (st.direction > 0) {
          for (i = 0; i < a.length; i++) {
            if (a[i] >= value) {
              return a[i];
            }
          }
          return a.pop();
        } else {
          i = a.length;
          while (i--) {
            if (a[i] <= value) {
              return a[i];
            }
          }
        }
        return a[0];
      };
    }

    // scroll to anchor

    function getSamePageAnchor(link) {
      if (
        link.protocol !== window.location.protocol ||
        link.host !== window.location.host ||
        link.pathname !== window.location.pathname ||
        link.search !== window.location.search
      ) {
        return false;
      }

      return link.hash;
    }

    function scrollToHash(hash, e) {
      const elem = hash ? document.querySelector(hash) : false;
      if (elem) {
        if (e) e.preventDefault();
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: elem,
            offsetY: 100,
            onEnter: (e) => {
              if (elem.id == "products" || elem.id == "footer") {
                header.classList.add("fill");
              } else {
                header.classList.remove("fill");
              }
            },
          },
        });
      }
    }

    document.querySelectorAll(".header__nav-link[href]").forEach((a) => {
      a.addEventListener("click", (e) => {
        scrollToHash(getSamePageAnchor(a), e);
      });
    });

    scrollToHash(window.location.hash);

    // transform footer

    const footerTimeline = gsap.timeline({ paused: true });

    footerTimeline.fromTo(
      ".footer",
      { yPercent: -75, duration: 3, ease: "power2.out" },
      { yPercent: 0, duration: 3, ease: "power2.out" }
    );
    ScrollTrigger.create({
      animation: footerTimeline,
      scrub: 1,
      trigger: ".products",
      start: "top",
      end: "center -130",
    });

    // other

    const panels = gsap.utils.toArray("section");
    const header = document.querySelector(".header");
    panels.forEach((panel, i) => {
      const tlSnapIn = gsap.timeline();
      tlSnapIn.to(panel, {
        duration: 1,
        scrollTrigger: {
          trigger: panel,
          onEnter: (e) => {
            if (panel.id == "products") {
              header.classList.add("fill");
            } else {
              header.classList.remove("fill");
            }
          },
          onEnterBack: (e) => {
            if (panel.id == "products") {
              header.classList.add("fill");
            } else {
              header.classList.remove("fill");
            }
          },
        },
      });
    });
  }

  if (
    window.matchMedia("(min-width: 1024px)").matches &&
    window.matchMedia("(max-width: 1439px)").matches
  ) {
    let intro = document.querySelector(".intro");
    let about = document.querySelector(".about");
    let team = document.querySelector(".team");

    document.addEventListener("scroll", () => {
      if (window.visualViewport.pageTop > 200) {
        intro.classList.add("opacity");
        about.classList.remove("opacity");
      } else {
        intro.classList.remove("opacity");
        about.classList.add("opacity");
      }

      if (window.visualViewport.pageTop > 750) {
        team.classList.remove("opacity");
        about.classList.add("opacity");
      } else {
        team.classList.add("opacity");
      }
    });

    // horizontal scroll

    gsap.registerPlugin(ScrollTrigger);

    let sections = gsap.utils.toArray(".horizontal-wrapper section"),
      nav = gsap.utils.toArray(".header__nav li"),
      getMaxWidth = () =>
        sections.reduce((val, section) => val + section.offsetWidth + 6, 1),
      maxWidth = getMaxWidth(),
      scrollSpeed = 4,
      snapProgress,
      lastScrollTween = Date.now(),
      tl = gsap.timeline();

    tl.to(sections, {
      x: () => window.innerWidth - maxWidth,
      duration: 1,
      ease: "none",
    });

    ScrollTrigger.create({
      animation: tl,
      trigger: ".horizontal-wrapper",
      pin: true,
      scrub: 1,
      snap: { snapTo: directionalSnap(tl), duration: 0.5 },
      end: () => "+=" + maxWidth / scrollSpeed,
      invalidateOnRefresh: true,
    });

    function init() {
      gsap.set(sections, { x: 0 });
      maxWidth = getMaxWidth();
      let position = 0,
        distance = maxWidth - window.innerWidth;
      // add a label for each section to the timeline (for "labelsDirectional" functionality):
      tl.add("label0", 0);
      sections.forEach((section, i) => {
        let progress = position;
        position += section.offsetWidth / distance;
        tl.add("label" + (i + 1), position);
      });
    }

    init();
    ScrollTrigger.addEventListener("refreshInit", init); // on resize, things must be recalculated

    function directionalSnap(timeline) {
      return (value, st) => {
        if (Date.now() - lastScrollTween < 1650) {
          // recently finished doing a tweened scroll (clicked link), so don't do any snapping.
          return snapProgress;
        }
        let a = [],
          labels = timeline.labels,
          duration = timeline.duration(),
          p,
          i;
        for (p in labels) {
          a.push(labels[p] / duration);
        }
        a.sort((a, b) => a - b);
        if (st.direction > 0) {
          for (i = 0; i < a.length; i++) {
            if (a[i] >= value) {
              return a[i];
            }
          }
          return a.pop();
        } else {
          i = a.length;
          while (i--) {
            if (a[i] <= value) {
              return a[i];
            }
          }
        }
        return a[0];
      };
    }

    // scroll to anchor

    function getSamePageAnchor(link) {
      if (
        link.protocol !== window.location.protocol ||
        link.host !== window.location.host ||
        link.pathname !== window.location.pathname ||
        link.search !== window.location.search
      ) {
        return false;
      }

      return link.hash;
    }

    function scrollToHash(hash, e) {
      const elem = hash ? document.querySelector(hash) : false;
      if (elem) {
        if (e) e.preventDefault();
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: elem,
            offsetY: 100,
            onEnter: (e) => {
              if (elem.id == "products" || elem.id == "footer") {
                header.classList.add("fill");
              } else {
                header.classList.remove("fill");
              }
            },
          },
        });
      }
    }

    document.querySelectorAll(".header__nav-link[href]").forEach((a) => {
      a.addEventListener("click", (e) => {
        scrollToHash(getSamePageAnchor(a), e);
      });
    });

    scrollToHash(window.location.hash);

    // transform footer

    const footerTimeline = gsap.timeline({ paused: true });

    footerTimeline.fromTo(
      ".footer",
      { yPercent: -75, duration: 3, ease: "power2.out" },
      { yPercent: 0, duration: 3, ease: "power2.out" }
    );
    ScrollTrigger.create({
      animation: footerTimeline,
      scrub: 1,
      trigger: ".products",
      start: "top",
      end: "center -130",
    });

    // other

    const panels = gsap.utils.toArray("section");
    const header = document.querySelector(".header");
    panels.forEach((panel, i) => {
      const tlSnapIn = gsap.timeline();
      tlSnapIn.to(panel, {
        duration: 1,
        scrollTrigger: {
          trigger: panel,
          onEnter: (e) => {
            if (panel.id == "products") {
              header.classList.add("fill");
            } else {
              header.classList.remove("fill");
            }
          },
          onEnterBack: (e) => {
            if (panel.id == "products") {
              header.classList.add("fill");
            } else {
              header.classList.remove("fill");
            }
          },
        },
      });
    });
  }

  if (window.matchMedia("(max-width: 1023px)").matches) {
    const section = document.querySelectorAll("section");
    section.forEach((e) => {
      e.classList.remove("opacity");
    });
  }

  const wrapper = document.querySelector(".wrapper");
  const body = document.querySelector("body");
  const headerNav = document.querySelector(".header__nav");
  const toggle = document.querySelector(".header__toggle");
  toggle.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");
    headerNav.classList.toggle("active");
    body.classList.toggle("overflow");
    wrapper.classList.toggle("overflow");
  });

  // scroll to anchor

  if (
    window.matchMedia("(min-width: 768px)").matches &&
    window.matchMedia("(max-width: 1023px)").matches
  ) {
    function getSamePageAnchor(link) {
      if (
        link.protocol !== window.location.protocol ||
        link.host !== window.location.host ||
        link.pathname !== window.location.pathname ||
        link.search !== window.location.search
      ) {
        return false;
      }

      return link.hash;
    }

    function scrollToHash(hash, e) {
      const elem = hash ? document.querySelector(hash) : false;
      if (elem) {
        if (e) e.preventDefault();
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: elem,
            offsetY: 100,
            onEnter: (e) => {
              toggle.classList.remove("active");
              headerNav.classList.remove("active");
              body.classList.remove("overflow");
              wrapper.classList.remove("overflow");
            },
          },
        });
      }
    }

    document.querySelectorAll(".header__nav-link[href]").forEach((a) => {
      a.addEventListener("click", (e) => {
        scrollToHash(getSamePageAnchor(a), e);
      });
    });

    scrollToHash(window.location.hash);
  }

  if (window.matchMedia("(max-width: 767px)").matches) {
    function getSamePageAnchor(link) {
      if (
        link.protocol !== window.location.protocol ||
        link.host !== window.location.host ||
        link.pathname !== window.location.pathname ||
        link.search !== window.location.search
      ) {
        return false;
      }

      return link.hash;
    }

    function scrollToHash(hash, e) {
      const elem = hash ? document.querySelector(hash) : false;
      if (elem) {
        if (e) e.preventDefault();
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: elem,
            offsetY: 56,
            onEnter: (e) => {
              toggle.classList.remove("active");
              headerNav.classList.remove("active");
              body.classList.remove("overflow");
              wrapper.classList.remove("overflow");
            },
          },
        });
      }
    }

    document.querySelectorAll(".header__nav-link[href]").forEach((a) => {
      a.addEventListener("click", (e) => {
        scrollToHash(getSamePageAnchor(a), e);
      });
    });

    scrollToHash(window.location.hash);
  }

  const swiper = new Swiper(".swiper", {
    spaceBetween: 12,
    slidesPerView: 1.1,

    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      500: {
        slidesPerView: 2.1,
        spaceBetween: 12,
      },
    },

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  class ItcAccordion {
    constructor(target, config) {
      this._el =
        typeof target === "string" ? document.querySelector(target) : target;
      const defaultConfig = {
        alwaysOpen: true,
        duration: 350,
      };
      this._config = Object.assign(defaultConfig, config);
      this.addEventListener();
    }
    addEventListener() {
      this._el.addEventListener("click", (e) => {
        const elHeader = e.target.closest(".accordion__header");

        if (!elHeader) {
          return;
        }
        if (!this._config.alwaysOpen) {
          const elOpenItem = this._el.querySelector(".accordion__item_show");
          if (elOpenItem) {
            elOpenItem !== elHeader.parentElement
              ? this.toggle(elOpenItem)
              : null;
          }
        }
        this.toggle(elHeader.parentElement);
      });
    }
    show(el) {
      const elBody = el.querySelector(".accordion__body");
      if (
        elBody.classList.contains("collapsing") ||
        el.classList.contains("accordion__item_show")
      ) {
        return;
      }
      elBody.style.display = "block";
      const height = elBody.offsetHeight;
      elBody.style.height = 0;
      elBody.style.overflow = "hidden";
      elBody.style.transition = `height ${this._config.duration}ms ease`;
      elBody.classList.add("collapsing");
      el.classList.add("accordion__item_slidedown");
      elBody.offsetHeight;
      elBody.style.height = `${height}px`;
      window.setTimeout(() => {
        elBody.classList.remove("collapsing");
        el.classList.remove("accordion__item_slidedown");
        elBody.classList.add("collapse");
        el.classList.add("accordion__item_show");
        elBody.style.display = "";
        elBody.style.height = "";
        elBody.style.transition = "";
        elBody.style.overflow = "";
      }, this._config.duration);
    }
    hide(el) {
      const elBody = el.querySelector(".accordion__body");
      if (
        elBody.classList.contains("collapsing") ||
        !el.classList.contains("accordion__item_show")
      ) {
        return;
      }
      elBody.style.height = `${elBody.offsetHeight}px`;
      elBody.offsetHeight;
      elBody.style.display = "block";
      elBody.style.height = 0;
      elBody.style.overflow = "hidden";
      elBody.style.transition = `height ${this._config.duration}ms ease`;
      elBody.classList.remove("collapse");
      el.classList.remove("accordion__item_show");
      elBody.classList.add("collapsing");
      window.setTimeout(() => {
        elBody.classList.remove("collapsing");
        elBody.classList.add("collapse");
        elBody.style.display = "";
        elBody.style.height = "";
        elBody.style.transition = "";
        elBody.style.overflow = "";
      }, this._config.duration);
    }
    toggle(el) {
      el.classList.contains("accordion__item_show")
        ? this.hide(el)
        : this.show(el);
    }
  }

  if (document.querySelector(".accordion")) {
    new ItcAccordion(document.querySelector(".accordion"), {
      alwaysOpen: false,
    });
  }

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener("load", () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
