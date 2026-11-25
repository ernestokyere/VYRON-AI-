
"use strict";

/* =========================================
   VYRON AI - ROUTER
   VERSION 2.1.0
========================================= */

(function (window, document) {

  const routes = {

    /* =====================================
       DASHBOARD
    ===================================== */

    dashboard: {
      title: "Overview",
      render: () => window.VYRON_APP.renderDashboard()
    },

    /* =====================================
       COMBINED CREATION WORKSPACE
    ===================================== */

    create: {
      title: "Create Video",
      render: () => window.VYRON_APP.renderCreateWorkspace()
    },

    /* =====================================
       MY LIBRARY
    ===================================== */

    library: {
      title: "My Library",
      render: () => window.VYRON_APP.renderLibrary()
    },

    /* =====================================
       AI MODELS
    ===================================== */

    models: {
      title: "AI Models",
      render: () => window.VYRON_APP.renderPlaceholder(
        "AI Models",
        "Explore the artificial intelligence models powering VYRON AI.",
        "◈"
      )
    },

    /* =====================================
       EXPLORE
    ===================================== */

    explore: {
      title: "Explore",
      render: () => window.VYRON_APP.renderPlaceholder(
        "Explore",
        "Discover creative video inspiration and community projects.",
        "◎"
      )
    },

    /* =====================================
       SETTINGS
    ===================================== */

    settings: {
      title: "Settings",
      render: () => window.VYRON_APP.renderPlaceholder(
        "Settings",
        "Manage your account and application preferences.",
        "⚙"
      )
    },

    /* =====================================
       PREMIUM PLANS
    ===================================== */

    pricing: {
      title: "Premium Plans",
      render: () => window.VYRON_APP.renderPlaceholder(
        "Premium Plans",
        "Subscription plans and premium features will be introduced later.",
        "✦"
      )
    }

  };

  const Router = {

    routes,

    /* =====================================
       NAVIGATE
    ===================================== */

    navigate(route) {

      if (!routes[route]) {
        route = "dashboard";
      }

      if (window.location.hash !== "#" + route) {

        window.location.hash = route;

        return;

      }

      this.handleRoute();

    },

    /* =====================================
       HANDLE CURRENT ROUTE
    ===================================== */

    handleRoute() {

      let route = window.location.hash.replace("#", "");

      if (!routes[route]) {
        route = "dashboard";
      }

      window.VYRON.currentRoute = route;

      const page = routes[route];

      window.VYRON.setTitle(page.title);

      /* Update active navigation links */

      document.querySelectorAll("[data-route]").forEach(link => {

        const active = link.dataset.route === route;

        link.classList.toggle("active", active);

        if (active) {

          link.setAttribute("aria-current", "page");

        } else {

          link.removeAttribute("aria-current");

        }

      });

      /* Render selected page */

      page.render();

      /* Close mobile navigation */

      window.VYRON.closeMobileMenu();

    },

    /* =====================================
       INITIALIZE ROUTER
    ===================================== */

    init() {

      /* Browser back and forward support */

      window.addEventListener("hashchange", () => {
        this.handleRoute();
      });

      /* Handle internal navigation links */

      document.addEventListener("click", event => {

        const target = event.target;

        if (!(target instanceof Element)) return;

        const link = target.closest('a[href^="#"]');

        if (!link) return;

        const route = link.getAttribute("href").slice(1);

        if (routes[route]) {

          event.preventDefault();

          this.navigate(route);

        }

      });

      /* Load initial page */

      this.handleRoute();

    }

  };

  window.VYRON_ROUTER = Router;

})(window, document);
