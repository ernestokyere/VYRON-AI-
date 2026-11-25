
"use strict";

/* =========================================
   VYRON AI - APPLICATION
   VERSION 1.0.0
========================================= */

(function (window, document) {

  const App = {

    renderDashboard() {

      const app = window.VYRON.elements.app;

      if (!app) return;

      app.innerHTML = `

        <section class="welcome-section">

          <div>
            <div class="eyebrow">
              YOUR CREATIVE WORKSPACE
            </div>

            <h1>Welcome to <span>VYRON AI.</span></h1>

            <p>
              Transform your imagination into cinematic experiences.
              Your creative journey starts here.
            </p>
          </div>

          <a href="#create" class="primary-button">
            <span>✧</span>
            Create a video
          </a>

        </section>

        <section class="quick-stats">

          <div class="stat-card">
            <div class="stat-icon">▣</div>
            <span>Total Videos</span>
            <strong>0</strong>
            <small>Your generated videos</small>
          </div>

          <div class="stat-card">
            <div class="stat-icon">✦</div>
            <span>Available Credits</span>
            <strong>0</strong>
            <small>Credits for AI generation</small>
          </div>

          <div class="stat-card">
            <div class="stat-icon">◈</div>
            <span>AI Models</span>
            <strong>0</strong>
            <small>Available generation models</small>
          </div>

        </section>

        <section class="creation-section">

          <div class="section-heading">
            <div>
              <h2>Start creating</h2>
              <p>Choose how you want to bring your ideas to life.</p>
            </div>
          </div>

          <div class="creation-grid">

            <a href="#create" class="creation-card">

              <div class="creation-visual text-visual">
                <span>✧</span>
              </div>

              <div class="creation-card-content">
                <h3>Text to Video</h3>
                <p>
                  Turn written descriptions into
                  cinematic video experiences.
                </p>
                <span class="creation-action">
                  Start creating →
                </span>
              </div>

            </a>

            <a href="#create" class="creation-card">

              <div class="creation-visual image-visual">
                <span>▧</span>
              </div>

              <div class="creation-card-content">
                <h3>Image to Video</h3>
                <p>
                  Transform static images into
                  dynamic video scenes.
                </p>
                <span class="creation-action">
                  Start creating →
                </span>
              </div>

            </a>

          </div>

        </section>

        <section class="recent-section">

          <div class="section-heading">
            <div>
              <h2>Recent creations</h2>
              <p>Your latest creative projects.</p>
            </div>

            <a href="#library" class="view-all">
              View library →
            </a>
          </div>

          <div class="empty-state">

            <div class="empty-state-icon">▧</div>

            <h3>No creations yet</h3>

            <p>
              Your generated videos will appear here
              once you start creating.
            </p>

            <a href="#create" class="primary-button">
              Create your first video
            </a>

          </div>

        </section>

      `;

    },

    renderPlaceholder(title, description, icon) {

      const app = window.VYRON.elements.app;

      if (!app) return;

      app.innerHTML = `

        <section class="placeholder-page">

          <div class="placeholder-icon">
            ${icon}
          </div>

          <div class="eyebrow">
            VYRON AI WORKSPACE
          </div>

          <h1>${title}</h1>

          <p>${description}</p>

          <div class="coming-soon">
            <span></span>
            DEVELOPMENT IN PROGRESS
          </div>

          <a href="#dashboard" class="secondary-button">
            ← Back to Overview
          </a>

        </section>

      `;

    },

    init() {

      window.VYRON.init();

      const mobileMenu = window.VYRON.elements.mobileMenu;
      const overlay = window.VYRON.elements.mobileOverlay;

      mobileMenu?.addEventListener("click", () => {
        window.VYRON.toggleMobileMenu();
      });

      overlay?.addEventListener("click", () => {
        window.VYRON.closeMobileMenu();
      });

      window.VYRON_ROUTER.init();

      console.info("VYRON AI application ready.");

    }

  };

  window.VYRON_APP = App;

  document.addEventListener("DOMContentLoaded", () => {
    App.init();
  });

})(window, document);
