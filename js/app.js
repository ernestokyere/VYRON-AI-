
"use strict";

/* =========================================
   VYRON AI - APPLICATION
   VERSION 2.2.0
========================================= */

(function (window, document) {

  const App = {

    createMode: "text",
    createPrompt: "",
    selectedImageUrl: null,

    escapeHTML(value) {
      return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[character]);
    },

    /* =====================================
       DASHBOARD
    ===================================== */

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
            <strong>${Number(window.VYRON.credits) || 0}</strong>
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

    /* =====================================
       COMBINED VIDEO CREATION WORKSPACE
    ===================================== */

    renderCreateWorkspace() {

      const app = window.VYRON.elements.app;

      if (!app) return;

      const isTextMode = this.createMode === "text";

      const prompt = this.escapeHTML(this.createPrompt);

      const imagePreview = this.selectedImageUrl
        ? `
          <div class="upload-preview">
            <img
              src="${this.selectedImageUrl}"
              alt="Selected image preview"
            />
            <button
              type="button"
              class="secondary-button"
              data-remove-image
            >
              Remove image
            </button>
          </div>
        `
        : `
          <label class="upload-dropzone" for="videoImageInput">
            <span class="upload-icon">▧</span>
            <strong>Upload an image</strong>
            <span>Choose an image from your device</span>
            <small>Supported formats: JPG, PNG, WEBP</small>
          </label>
        `;

      app.innerHTML = `

        <section class="workspace-header">

          <div>
            <div class="eyebrow">VYRON AI STUDIO</div>
            <h1>Create your video</h1>
            <p>
              Turn your ideas and images into cinematic experiences.
            </p>
          </div>

          <div class="workspace-status">
            <span></span>
            Creation workspace
          </div>

        </section>

        <section class="video-workspace">

          <div class="workspace-main">

            <div class="workspace-mode-selector">

              <button
                type="button"
                class="mode-tab ${isTextMode ? "active" : ""}"
                data-create-mode="text"
                aria-pressed="${isTextMode}"
              >
                <span>✧</span>
                Text to Video
              </button>

              <button
                type="button"
                class="mode-tab ${!isTextMode ? "active" : ""}"
                data-create-mode="image"
                aria-pressed="${!isTextMode}"
              >
                <span>▧</span>
                Image to Video
              </button>

            </div>

            <div class="workspace-panel">

              ${
                isTextMode
                  ? `
                    <div class="field-heading">
                      <label for="videoPrompt">Describe your video</label>
                      <span>CREATIVE PROMPT</span>
                    </div>

                    <textarea
                      id="videoPrompt"
                      class="prompt-input"
                      placeholder="Describe the video you want to create. Include the scene, subjects, movement, lighting and visual style..."
                      maxlength="2000"
                    >${prompt}</textarea>

                    <div class="prompt-footer">
                      <span>Be descriptive for better creative direction.</span>
                      <span id="promptCounter">
                        ${this.createPrompt.length}/2000
                      </span>
                    </div>
                  `
                  : `
                    <div class="field-heading">
                      <label>Starting image</label>
                      <span>IMAGE INPUT</span>
                    </div>

                    ${imagePreview}

                    <div class="field-heading image-prompt-heading">
                      <label for="videoPrompt">Describe the movement</label>
                      <span>ANIMATION PROMPT</span>
                    </div>

                    <textarea
                      id="videoPrompt"
                      class="prompt-input"
                      placeholder="Describe how you want the image to move, what should happen in the scene, and the camera movement..."
                      maxlength="2000"
                    >${prompt}</textarea>

                    <div class="prompt-footer">
                      <span>Explain how your image should come to life.</span>
                      <span id="promptCounter">
                        ${this.createPrompt.length}/2000
                      </span>
                    </div>
                  `
              }

              <div class="generation-settings">

                <div class="field-heading">
                  <h3>Generation settings</h3>
                  <span>VIDEO CONFIGURATION</span>
                </div>

                <div class="settings-grid">

                  <div class="setting-field">
                    <label for="videoModel">AI Model</label>
                    <select id="videoModel" disabled>
                      <option>AI models coming soon</option>
                    </select>
                  </div>

                  <div class="setting-field">
                    <label for="videoRatio">Aspect ratio</label>
                    <select id="videoRatio">
                      <option value="16:9">16:9 — Landscape</option>
                      <option value="9:16">9:16 — Portrait</option>
                      <option value="1:1">1:1 — Square</option>
                    </select>
                  </div>

                  <div class="setting-field">
                    <label for="videoDuration">Duration</label>
                    <select id="videoDuration">
                      <option value="5">5 seconds</option>
                      <option value="10">10 seconds</option>
                      <option value="15">15 seconds</option>
                    </select>
                  </div>

                </div>

              </div>

              <div class="generation-footer">

                <div class="generation-cost">
                  <span>Estimated cost</span>
                  <strong>Pending model integration</strong>
                </div>

                <button
                  type="button"
                  class="primary-button generate-button"
                  disabled
                  title="Video generation will be enabled after AI integration."
                >
                  ✧ Generate Video
                </button>

              </div>

              <p class="integration-notice">
                AI generation is not connected yet.
                Your settings and creative input are being prepared.
              </p>

            </div>

          </div>

          <aside class="workspace-preview">

            <div class="preview-heading">
              <h2>Video preview</h2>
              <span>PREVIEW AREA</span>
            </div>

            <div class="preview-screen">

              <div class="preview-placeholder">
                <span>✧</span>
                <h3>Your video will appear here</h3>
                <p>
                  Configure your creation and connect an AI model
                  to generate your first video.
                </p>
              </div>

            </div>

            <div class="preview-information">
              <span>OUTPUT FORMAT</span>
              <strong id="previewRatio">16:9 Landscape</strong>
            </div>

            <div class="preview-information">
              <span>GENERATION STATUS</span>
              <strong>Waiting for AI integration</strong>
            </div>

          </aside>

        </section>

        <input
          type="file"
          id="videoImageInput"
          accept="image/jpeg,image/png,image/webp"
          hidden
        />

      `;

      this.updatePreviewRatio();

    },

    /* =====================================
       STAGE 02.5.1 - MY LIBRARY
    ===================================== */

    renderLibrary() {

      const app = window.VYRON.elements.app;

      if (!app) return;

      app.innerHTML = `

        <section class="library-page">

          <div class="library-header">

            <div>
              <div class="eyebrow">
                YOUR CREATIVE COLLECTION
              </div>

              <h1>My Library</h1>

              <p>
                Manage and organize your generated video projects.
              </p>
            </div>

            <a href="#create" class="primary-button">
              ✧ Create video
            </a>

          </div>

          <div class="library-overview">

            <div class="library-stat">
              <span>Total videos</span>
              <strong>0</strong>
            </div>

            <div class="library-stat">
              <span>Saved projects</span>
              <strong>0</strong>
            </div>

            <div class="library-stat">
              <span>Storage used</span>
              <strong>0 MB</strong>
            </div>

          </div>

          <div class="library-toolbar">

            <div class="library-search">

              <span>⌕</span>

              <input
                type="search"
                placeholder="Search your creations..."
                disabled
                aria-label="Search your creations"
              />

            </div>

            <div class="library-filter">

              <select disabled aria-label="Filter videos">
                <option>All videos</option>
              </select>

              <select disabled aria-label="Sort videos">
                <option>Recently created</option>
              </select>

            </div>

          </div>

          <section class="library-content">

            <div class="library-empty">

              <div class="library-empty-icon">▤</div>

              <h2>Your creative library is empty</h2>

              <p>
                Your generated videos and saved projects
                will appear here when video generation
                and storage become available.
              </p>

              <a href="#create" class="primary-button">
                ✧ Start creating
              </a>

            </div>

          </section>

        </section>

      `;

    },

    /* =====================================
       STAGE 02.6.1 - AI MODELS
    ===================================== */

    renderModels() {

      const app = window.VYRON.elements.app;

      if (!app) return;

      app.innerHTML = `

        <section class="models-page">

          <div class="models-header">

            <div>
              <div class="eyebrow">
                VYRON AI INTELLIGENCE
              </div>

              <h1>AI Models</h1>

              <p>
                Discover the AI technologies that will power
                your next creative video experience.
              </p>
            </div>

            <div class="models-status">
              <span></span>
              Model integration pending
            </div>

          </div>

          <section class="models-hero">

            <div class="models-hero-content">

              <div class="models-hero-label">
                <span>✦</span>
                CREATIVE INTELLIGENCE
              </div>

              <h2>
                Find the right intelligence
                for your creativity.
              </h2>

              <p>
                Explore the generation technologies
                being prepared for the VYRON AI studio.
              </p>

              <a href="#create" class="primary-button">
                ✧ Open Creation Studio
              </a>

            </div>

            <div class="models-hero-visual">
              <div class="models-orbit orbit-one"></div>
              <div class="models-orbit orbit-two"></div>
              <div class="models-core">V</div>
            </div>

          </section>

          <div class="models-section-heading">

            <div>
              <h2>Generation categories</h2>
              <p>Explore the planned model capabilities.</p>
            </div>

          </div>

          <div class="models-grid">

            <article class="model-card">

              <div class="model-card-top">

                <div class="model-icon text-model-icon">
                  ✧
                </div>

                <span class="model-status">
                  Coming soon
                </span>

              </div>

              <div class="model-category">
                TEXT GENERATION
              </div>

              <h3>Text to Video</h3>

              <p>
                Transform written prompts into cinematic
                video scenes with AI-powered generation.
              </p>

              <div class="model-capabilities">
                <span>Prompt-based creation</span>
                <span>Cinematic scenes</span>
                <span>Creative direction</span>
              </div>

              <a href="#create" class="model-action">
                Open creation studio →
              </a>

            </article>

            <article class="model-card">

              <div class="model-card-top">

                <div class="model-icon image-model-icon">
                  ▧
                </div>

                <span class="model-status">
                  Coming soon
                </span>

              </div>

              <div class="model-category">
                IMAGE GENERATION
              </div>

              <h3>Image to Video</h3>

              <p>
                Bring still images to life through
                AI-powered animation and motion.
              </p>

              <div class="model-capabilities">
                <span>Image-based creation</span>
                <span>Scene animation</span>
                <span>Motion direction</span>
              </div>

              <a href="#create" class="model-action">
                Open creation studio →
              </a>

            </article>

          </div>

          <section class="models-information">

            <div class="models-information-icon">
              ◈
            </div>

            <div>
              <h3>More AI technologies are on the way</h3>

              <p>
                VYRON AI will support selected third-party
                video-generation providers as integrations
                are developed and tested.
              </p>
            </div>

          </section>

        </section>

      `;

    },

    /* =====================================
       WORKSPACE INTERACTIONS
    ===================================== */

    handleWorkspaceClick(event) {

      const modeButton = event.target.closest("[data-create-mode]");

      if (modeButton) {

        this.createMode = modeButton.dataset.createMode;

        this.renderCreateWorkspace();

        return;

      }

      if (event.target.closest("[data-remove-image]")) {

        this.clearSelectedImage();

        this.renderCreateWorkspace();

      }

    },

    handleWorkspaceInput(event) {

      if (event.target.id === "videoPrompt") {

        this.createPrompt = event.target.value;

        const counter = document.getElementById("promptCounter");

        if (counter) {
          counter.textContent = `${this.createPrompt.length}/2000`;
        }

      }

      if (event.target.id === "videoRatio") {

        this.updatePreviewRatio();

      }

    },

    handleImageSelection(event) {

      const input = event.target;

      if (input.id !== "videoImageInput") return;

      const file = input.files && input.files[0];

      if (!file) return;

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {

        window.alert("Please select a JPG, PNG or WEBP image.");

        input.value = "";

        return;

      }

      if (file.size > 10 * 1024 * 1024) {

        window.alert("Please select an image smaller than 10 MB.");

        input.value = "";

        return;

      }

      this.clearSelectedImage();

      this.selectedImageUrl = URL.createObjectURL(file);

      this.renderCreateWorkspace();

    },

    clearSelectedImage() {

      if (this.selectedImageUrl) {

        URL.revokeObjectURL(this.selectedImageUrl);

        this.selectedImageUrl = null;

      }

    },

    updatePreviewRatio() {

      const ratioSelect = document.getElementById("videoRatio");
      const ratioDisplay = document.getElementById("previewRatio");

      if (!ratioSelect || !ratioDisplay) return;

      const labels = {
        "16:9": "16:9 Landscape",
        "9:16": "9:16 Portrait",
        "1:1": "1:1 Square"
      };

      ratioDisplay.textContent =
        labels[ratioSelect.value] || "16:9 Landscape";

    },

    /* =====================================
       PLACEHOLDER PAGES
    ===================================== */

    renderPlaceholder(title, description, icon) {

      const app = window.VYRON.elements.app;

      if (!app) return;

      app.innerHTML = `

        <section class="placeholder-page">

          <div class="placeholder-icon">
            ${this.escapeHTML(icon)}
          </div>

          <div class="eyebrow">
            VYRON AI WORKSPACE
          </div>

          <h1>${this.escapeHTML(title)}</h1>

          <p>${this.escapeHTML(description)}</p>

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

    /* =====================================
       APPLICATION INITIALIZATION
    ===================================== */

    init() {

      window.VYRON.init();

      const mobileMenu = window.VYRON.elements.mobileMenu;
      const overlay = window.VYRON.elements.mobileOverlay;
      const app = window.VYRON.elements.app;

      mobileMenu?.addEventListener("click", () => {
        window.VYRON.toggleMobileMenu();
      });

      overlay?.addEventListener("click", () => {
        window.VYRON.closeMobileMenu();
      });

      app?.addEventListener("click", event => {
        this.handleWorkspaceClick(event);
      });

      app?.addEventListener("input", event => {
        this.handleWorkspaceInput(event);
      });

      app?.addEventListener("change", event => {
        this.handleImageSelection(event);
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
