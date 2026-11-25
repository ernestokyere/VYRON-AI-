
"use strict";

/* =========================================
   VYRON AI - CORE APPLICATION
   VERSION 1.0.0
========================================= */

(function (window, document) {

  const VYRON = {

    version: "1.0.0",

    initialized: false,

    currentRoute: "dashboard",

    user: null,

    credits: 0,

    config: {
      brand: "VYRON AI",
      defaultRoute: "dashboard"
    },

    elements: {},

    init() {

      if (this.initialized) return;

      this.elements = {
        app: document.getElementById("app"),
        sidebar: document.getElementById("sidebar"),
        mobileMenu: document.getElementById("mobileMenu"),
        mobileOverlay: document.getElementById("mobileOverlay"),
        pageTitle: document.getElementById("pageTitle"),
        creditCount: document.getElementById("creditCount")
      };

      this.initialized = true;

      console.info(
        "VYRON AI initialized successfully.",
        "Version:",
        this.version
      );

    },

    setTitle(title) {

      if (this.elements.pageTitle) {
        this.elements.pageTitle.textContent = title;
      }

      document.title = title + " | VYRON AI";

    },

    closeMobileMenu() {

      this.elements.sidebar?.classList.remove("open");

      this.elements.mobileOverlay?.classList.remove("active");

      this.elements.mobileMenu?.setAttribute(
        "aria-expanded",
        "false"
      );

    },

    toggleMobileMenu() {

      const isOpen =
        this.elements.sidebar?.classList.toggle("open");

      this.elements.mobileOverlay?.classList.toggle(
        "active",
        Boolean(isOpen)
      );

      this.elements.mobileMenu?.setAttribute(
        "aria-expanded",
        String(Boolean(isOpen))
      );

    }

  };

  window.VYRON = VYRON;

})(window, document);
