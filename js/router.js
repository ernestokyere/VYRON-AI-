
"use strict";

/* =========================================
   VYRON AI - ROUTER
   VERSION 1.0.0
========================================= */

(function (window) {

  const routes = {

    dashboard: {
      title: "Overview",
      render: () => window.VYRON_APP.renderDashboard()
    },

    create: {
      title: "Create Video",
      render: () => window.VYRON_APP.renderPlaceholder(
        "Create Video",
        "Your AI video creation workspace will be developed here.",
        "✧"
      )
    },

    library: {
      title: "My Library",
      render: () => window.VYRON_APP.renderPlaceholder(
        "My Library",
        "Your generated videos and saved projects will appear here.",
        "▤"
      )
    },

    models: {
      title: "AI Models",
      render: () => window.VYRON_APP.renderPlaceholder(
        "AI Models",
        "Explore the artificial intelligence models powering VYRON AI.",
        "◈"
      )
    },

    explore: {
      title: "Explore",
      render: () => window.VYRON_APP.renderPlaceholder(
        "Explore",
        "Discover creative video inspiration and community projects.",
        "◎"
      )
    },

    settings: {
      title: "Settings",
      render: () => window.VYRON_APP.renderPlaceholder(
        "Settings",
        "Manage your account and application preferences.",
        "⚙"
      )
    },

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

    handleRoute() {

      let route = window.location.hash.replace("#", "");

      if (!routes[route]) {
        route = "dashboard";
      }

      window.VYRON.currentRoute = route;

      const page = routes[route];

      window.VYRON.setTitle(page.title);

      document.querySelectorAll("[data-route]").forEach(link => {

        const active = link.dataset.route === route;

        link.classList.toggle("active", active);

        if (active) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }

      });

      page.render();

      window.VYRON.closeMobileMenu();

    },

    init() {

      window.addEventListener(
        "hashchange",
        () => this.handleRoute()
      );

      document.addEventListener("click", event => {

        const link = event.target.closest(
          'a[href^="#"]'
        );

        if (!link) return;

        const route = link.getAttribute("href").slice(1);

        if (routes[route]) {
          event.preventDefault();
          this.navigate(route);
        }

      });

      this.handleRoute();

    }

  };

  window.VYRON_ROUTER = Router;

})(window);
