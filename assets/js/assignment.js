// Assignment Page JavaScript

class AssignmentPage {
  constructor() {
    this.config = null;
    this.assignmentId = null;
    this.assignment = null;
    this.init();
  }

  async init() {
    try {
      this.assignmentId = this.getAssignmentIdFromUrl();
      if (!this.assignmentId) {
        throw new Error("No assignment ID provided");
      }

      await this.loadConfig();
      this.assignment = this.findAssignment(this.assignmentId);

      if (!this.assignment) {
        throw new Error("Assignment not found");
      }

      await this.loadAndRenderAssignment();
    } catch (error) {
      console.error("Failed to load assignment:", error);
      this.showError(`Failed to load assignment: ${error.message}`);
    }
  }

  getAssignmentIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
  }

  async loadConfig() {
    const response = await fetch("../../config.json");
    if (!response.ok) {
      throw new Error("Failed to load configuration");
    }
    this.config = await response.json();
  }

  findAssignment(id) {
    return this.config.assignments.find((assignment) => assignment.id === id);
  }

  async loadAndRenderAssignment() {
    // Update page title
    document.getElementById("assignment-title").textContent = this.assignment.title;
    document.title = `${this.assignment.title} - ${this.config.course.school}`;

    // Render download links
    this.renderDownloadLinks();

    // Render social sharing buttons
    this.renderSocialSharing();

    // Load and render README content
    await this.loadReadmeContent();
  }

  renderDownloadLinks() {
    const { attachments = [] } = this.assignment;

    if (attachments.length === 0) {
      return;
    }

    const downloadsSection = document.getElementById("downloads-section");
    const downloadLinks = document.getElementById("download-links");

    const links = attachments
      .map((attachment) => {
        const icon = this.getFileIcon(attachment.type);
        return `
                <a href="../../${this.assignment.path}/${attachment.file}" 
                   download 
                   class="btn btn-download">
                   ${icon} Download ${attachment.name}
                </a>
            `;
      })
      .join(" ");

    downloadLinks.innerHTML = links;
    downloadsSection.style.display = "block";
  }

  getFileIcon(type) {
    const icons = {
      python: "🐍",
      javascript: "📜",
      html: "🌐",
      css: "🎨",
      default: "📄",
    };
    return icons[type] || icons.default;
  }

  sanitizeText(text) {
    const element = document.createElement('div');
    element.textContent = text;
    return element.innerHTML;
  }

  renderSocialSharing() {
    const socialSection = document.getElementById("social-share-section");
    if (!socialSection) return;

    const pageUrl = encodeURIComponent(window.location.href);
    const sanitizedTitle = this.sanitizeText(this.assignment.title);
    const sanitizedSchool = this.sanitizeText(this.config.course.school);
    const shareText = encodeURIComponent(`Check out this assignment: ${sanitizedTitle} - ${sanitizedSchool}`);
    const shareTitle = encodeURIComponent(sanitizedTitle);

    const socialButtons = `
      <a href="https://x.com/intent/tweet?text=${shareText}&url=${pageUrl}" 
         target="_blank" 
         rel="noopener noreferrer"
         class="social-share-btn twitter">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
        </svg>
        Share on X
      </a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${pageUrl}" 
         target="_blank" 
         rel="noopener noreferrer"
         class="social-share-btn facebook">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
        </svg>
        Share on Facebook
      </a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}" 
         target="_blank" 
         rel="noopener noreferrer"
         class="social-share-btn linkedin">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
        Share on LinkedIn
      </a>
      <a href="mailto:?subject=${shareTitle}&body=${shareText}%0A%0A${pageUrl}" 
         class="social-share-btn email">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6" fill="none" stroke="white" stroke-width="2"/>
        </svg>
        Share via Email
      </a>
    `;

    socialSection.innerHTML = `
      <h3>📤 Share This Assignment</h3>
      <div class="social-share-buttons">
        ${socialButtons}
      </div>
    `;
  }

  async loadReadmeContent() {
    try {
      const readmePath = `../../${this.assignment.path}/README.md`;
      const response = await fetch(readmePath);

      if (!response.ok) {
        throw new Error(`Failed to load README from ${readmePath}`);
      }

      const markdownContent = await response.text();
      const htmlContent = marked.parse(markdownContent);

      document.getElementById("assignment-content").innerHTML = htmlContent;
    } catch (error) {
      console.error("Failed to load README:", error);
      this.showError("Failed to load assignment content");
    }
  }

  showError(message) {
    const contentDiv = document.getElementById("assignment-content");
    contentDiv.innerHTML = `<div class="error">${message}</div>`;
  }
}

// Initialize the assignment page when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new AssignmentPage();
});
