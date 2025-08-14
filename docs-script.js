const GITHUB_PAGES_BASE = "https://mhcpcreators.github.io/worlds-documentation";
const docs = {
  "understanding-the-desktop-editor": [
    "asset-spawning-&-world-streaming.md",
    "boost-performance-top-7-spawning-&-streaming-tricks.md",
    "collaboratively-build-with-shared-asset-templates.md",
    "improve-frame-rates-and-custom-asset-bloat.md",
    "trace,-fix,-&-optimize-world-performance-issues.md",
    "Worlds-desktop-editor-101.md",
    "Worlds-desktop-tools-basics.md",
  ],
  "creating-a-world": [
    "building-your-first-world.md",
    "create-a-clean-game-HUD-for-Worlds.md",
    "create-a-versatile-holster-system-in-Worlds.md",
    "designing-worlds-for-mobile-AMA-session.md",
    "inventory-systems-unlock-the-power-of-player-inventories.md",
    "mentor-world-tour-mechanics,--art,--&--gameplay-loop-design.md",
    "mobile-worlds-crash-course.md",
    "what-makes-a-hit-mobile-game-4-winning-examples.md",
    "worlds-tools-overview.md",
  ],
  "generative-ai-tools": [
    "build-a-player-guided-lobby-with-mesh-gen.md",
    "code-faster-with-copilot-in-the-Worlds-desktop-editor-&-VSCode.md",
    "genAI-sound-design-in-Worlds-audio-tools-tour.md",
    "genAI-world-concepts-greyboxing-and-refinements.md",
    "hands-on-with-GenAI-toolkit-for-Worlds-full-feature-tour.md",
    "prompt-Meta-AI-in-the-Worlds-desktop-editor.md",
    "scripting-with-AI-support-GenAI-TypeScript.md",
    "topology-tune-up-for-GenAI-props-and-sets.md",
  ],
  "getting-started-with-scripting": [
    "15-Worlds-TypeScript-API-2.0-tips-and-tricks.md",
    "codeblocks-to-TypeScript.md",
    "json-ppvs-and-versioning.md",
    "PlayerControls-API-&-focused-interaction-in-Worlds.md",
    "text-entry-tutorial.md",
    "TypeScript-basics-beginner-friendly-session-for-Worlds.md",
    "TypeScript-best-practices-101.md",
  ],
  "scripting-concepts-persistence-apis": [
    "custom-ui/custom-UI-basics-to-boost-interaction.md",
    "custom-ui/cui-api-introduction.md",
    "custom-ui/pro-tips-&-tricks-for-a-high-performance-custom-UI.md",
    "typescript-conventions-best-practices.md",
    "interactive-laser-pen-for-mobile-worlds-build-along.md",
  ],
  "meshes-materials-import": [
    "3D-modeling-in-Worlds-101.md",
    "15-blender-tips-for-Horizon-assets.md",
    "blender-basics-&-UV-unwrapping.md",
    "custom-skydomes-guide-cinematic-horizons.md",
    "how-to-use-LODs-to-boost-your-worlds-performance.md",
    "import-images-and-add-texture-animation.md",
    "improve-custom-model-imports.md",
    "masked-texture-3D-asset-challenge-AMA-session.md",
    "optimize-IWP-assets-for-peak-performance.md",
    "roads-&-fences-in-Horizon-paths-101.md",
    "Space Glitters Blender Basics Hotkey Sheet.pdf",
    "Worlds-asset-build-along-color-palette-&-vertex-tuning.md",
  ],
  "manuals-and-cheat-sheets": [
    "contribute-to-creator-documentation.md",
    "get-started.md",
    "how-to-make-your-world-go-viral.md",
    "MHCP_Publishing_Checklist.pdf",
    "MHCP_WorldPlanningGuide.pdf",
    "plan-your-world-game-design-&-monetization-sheet.md",
    "publishing-checklist-for-Horizon-Worlds.md",
    "world-building-&-pre-production-guide.md",
    "worlds-creator-manual-essentials-made-easy.md",
    "worlds-workarounds.md",
  ],
};

const docList = document.getElementById("doc-list");
const content = document.getElementById("doc-content");
const tocList = document.getElementById("doc-toc");
const searchInput = document.getElementById("search-input");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let flatDocs = [];
let currentIndex = 0;

function buildSidebar() {
  docList.innerHTML = "";
  flatDocs = [];

  function createFolder(folderName, filesOrSubfolders, parentPath = "docs", level = 0) {
    const container = document.createElement("li");
    const toggle = document.createElement("div");
    toggle.classList.add("folder-toggle");

    toggle.setAttribute("role", "button");
    toggle.setAttribute("tabindex", "0");

    const subList = document.createElement("ul");
    subList.className = "dropdown";

    const folderDisplayName = folderName.replace(/-/g, ' ');

    const isExpandable = (Array.isArray(filesOrSubfolders) && filesOrSubfolders.length > 0)
                      || (typeof filesOrSubfolders === 'object' && filesOrSubfolders !== null && Object.keys(filesOrSubfolders).length > 0);

    toggle.innerHTML = `
      <span class="folder-name">${folderDisplayName}</span>
      ${isExpandable ? `
        <svg class="chevron-icon" width="12" height="12" viewBox="0 0 320 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>` : ''}
    `;

    if (Array.isArray(filesOrSubfolders)) {
      filesOrSubfolders.forEach(file => {
        const docPath = `${parentPath}/${folderName}/${file}`;
        const title = file.replace(/\.md$/, '').replace(/[-_]/g, ' ');
        const doc = { path: docPath, title };
        flatDocs.push(doc);

        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `#${encodeURIComponent(docPath)}`;
        a.textContent = title;
        a.style.paddingLeft = `${(level + 1) * 1.2}rem`;
        a.addEventListener("click", (e) => {
          e.preventDefault();
          loadDocByPath(docPath);
        });

        li.appendChild(a);
        subList.appendChild(li);
      });
    } else {
      for (const [subFolder, files] of Object.entries(filesOrSubfolders)) {
        const subTree = createFolder(subFolder, files, `${parentPath}/${folderName}`, level + 1);
        subList.appendChild(subTree);
      }
    }

    if (isExpandable) {
      toggle.addEventListener("click", () => {
        const isOpen = subList.classList.toggle("open");
        toggle.classList.toggle("open", isOpen); // Adds class to parent so SVG rotates
      });
    }

    container.appendChild(toggle);
    container.appendChild(subList);
    return container;
  }

  for (const [folder, value] of Object.entries(docs)) {
    docList.appendChild(createFolder(folder, value));
  }

  const hashPath = decodeURIComponent(location.hash.slice(1));
  if (hashPath && flatDocs.some(doc => doc.path === hashPath)) {
    loadDocByPath(hashPath);
  } else {
    loadDocByPath(flatDocs[0].path);
  } 
}

function loadDocByPath(path) {
  const index = flatDocs.findIndex(doc => doc.path === path);
  if (index === -1) {
    content.innerHTML = `<p>Document not found: ${path}</p>`;
    return;
  }

  currentIndex = index;

  // Track document view in Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', 'page_view', {
      page_title: path.split('/').pop().replace(/\.md$|\.pdf$/i, '').replace(/[-_]/g, ' '),
      page_location: window.location.href,
      custom_page_path: path
    });
  }

  // Handle PDFs
  if (path.endsWith(".pdf")) {
    const pdfUrl = `${GITHUB_PAGES_BASE}/${path}`; // Use Pages URL instead of RAW
    const filename = path.split("/").pop().replace(/[-_]/g, " ").replace(/\.pdf$/i, "");
    content.innerHTML = `
      <h2>${filename}</h2>
      <p><a href="${pdfUrl}" target="_blank" rel="noopener noreferrer">Open PDF in new tab</a></p>
    `;
    return;
  }

  try {
    // Use GitHub Pages pre-rendered HTML
    const htmlPath = path.replace('.md', '.html');
    const htmlUrl = `${GITHUB_PAGES_BASE}/${htmlPath}`;
    
    fetch(htmlUrl)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.text();
      })
      .then(githubRenderedHTML => {
      // Create a temporary element to parse the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = githubRenderedHTML;

      // Try multiple selectors to find the content
      const markdownContent = 
          tempDiv.querySelector('article.markdown-body') ||  // Try GitHub's article first
          tempDiv.querySelector('.markdown-body') ||        // Then just markdown-body class
          tempDiv.querySelector('article') ||              // Then any article
          tempDiv.querySelector('main');                   // Finally try main content

      if (!markdownContent) {
          throw new Error('Could not find markdown content in the page');
      }

      // Set the content with proper markdown-body class
      const docContent = document.getElementById('doc-content');
      docContent.className = 'markdown-body'; // Always use markdown-body class
      
      // Try to preserve more of GitHub's structure by cloning the entire content
      docContent.innerHTML = '';
      const clonedContent = markdownContent.cloneNode(true);
      
      // Remove the large "worlds-documentation" header that appears at the top of GitHub Pages
      const repoHeader = clonedContent.querySelector('h1');
      if (repoHeader && repoHeader.textContent.trim().toLowerCase().includes('worlds-documentation')) {
        repoHeader.remove();
      }
      
      docContent.appendChild(clonedContent);

      // Fix relative image paths (only for truly relative paths)
      const basePath = path.split("/").slice(0, -1).join("/");
      docContent.querySelectorAll("img").forEach(img => {
          const src = img.getAttribute("src");
          
          // Check if it's a relative GitHub Pages path that starts with /worlds-documentation
          if (src && src.startsWith("/worlds-documentation/")) {
              // Convert GitHub relative paths to absolute URLs
              const newSrc = `https://mhcpcreators.github.io${src}`;
              img.src = newSrc;
          } else if (src && !src.startsWith("http") && !src.startsWith("data:") && !src.includes("github")) {
              // Only fix truly relative paths that don't start with http, https, or data
              const newSrc = `${GITHUB_PAGES_BASE}/${basePath}/${src}`;
              img.src = newSrc;
          }
      });

        generateTOC();
        updateButtons();
        updateActiveLink();
        autoExpandFolders();

        history.replaceState(null, "", `#${encodeURIComponent(path)}`);
        
        const contentContainer = document.querySelector("main.content");
        if (contentContainer) {
          contentContainer.scrollTop = 0;
        }
      })
      .catch(error => {
        console.error('Failed to load pre-rendered HTML:', error);
        content.innerHTML = `<p>Error loading document: ${error.message}</p>`;
      });
  } catch (error) {
    console.error('Error in loadDocByPath:', error);
    content.innerHTML = `<p>Error loading document: ${error.message}</p>`;
  }
}

function loadDoc(index) {
  if (index >= 0 && index < flatDocs.length) {
    loadDocByPath(flatDocs[index].path);
  }
}

function generateTOC() {
  tocList.innerHTML = "";
  const headers = content.querySelectorAll("h2, h3");

  const rightSidebar = document.querySelector(".right-sidebar");
  if (headers.length === 0) {
    rightSidebar.style.display = "none";
    return;
  } else {
    rightSidebar.style.display = "block"; // Show if headers exist
  }

  headers.forEach(header => {
    if (!header.id) header.id = header.textContent.trim().toLowerCase().replace(/\s+/g, '-');
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${header.id}`;
    a.textContent = header.textContent;

    a.addEventListener("click", (e) => {
      e.preventDefault();

      // Get the target heading element
      const targetId = a.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      const scrollContainer = document.querySelector("main.content");

      if (targetEl && scrollContainer) {
        const scrollOffset = 80; // Adjust for header height if needed
        const targetScrollTop = targetEl.offsetTop - scrollContainer.offsetTop - scrollOffset;

        scrollContainer.scrollTo({
          top: targetScrollTop,
          behavior: "smooth"
        });

        // Update the URL hash without jumping
        history.replaceState(null, "", `#${targetId}`);

        // Highlight active link
        document.querySelectorAll('#doc-toc a').forEach(el => el.classList.remove("active"));
        a.classList.add("active");

        // ✅ Scroll TOC item into view within sidebar
        a.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    });

    li.appendChild(a);
    tocList.appendChild(li);
  });
}

function updateButtons() {
  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled = currentIndex === flatDocs.length - 1;
}

function updateActiveLink() {
  document.querySelectorAll("#doc-list a").forEach((a, i) => {
    a.classList.toggle("active", i === currentIndex);
  });
}

function autoExpandFolders() {
  const currentPath = flatDocs[currentIndex].path;
  const folders = currentPath.split("/").slice(1, -1); // skip "docs" and file
  let current = docList;
  folders.forEach(folder => {
    const toggle = [...current.querySelectorAll(".folder-toggle")].find(t => {
      const folderNameSpan = t.querySelector(".folder-name");
      return folderNameSpan && folderNameSpan.textContent.trim().toLowerCase() === folder.replace(/-/g, ' ');
    });
    if (toggle) {
      const dropdown = toggle.nextElementSibling;
      dropdown.classList.add("open");
      const icon = toggle.querySelector(".chevron-icon");
      toggle.classList.add("open");

      current = dropdown;
    }
  });
  if (current && current.closest("li")) {
    const activeFolder = current.closest("li").querySelector(".folder-toggle");
    if (activeFolder) {
      activeFolder.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) loadDoc(currentIndex - 1);
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < flatDocs.length - 1) loadDoc(currentIndex + 1);
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();

  document.querySelectorAll("#doc-list > li").forEach(folderLi => {
    const folderDropdown = folderLi.querySelector(".dropdown");
    const folderToggle = folderLi.querySelector(".folder-toggle");
    const folderNameEl = folderToggle?.querySelector(".folder-name");
    const folderName = folderNameEl?.textContent.toLowerCase() || "";
    let folderHasMatch = false;

    // Match against folder name itself
    const folderNameMatches = folderName.includes(query);

    const fileLinks = folderLi.querySelectorAll("a");
    fileLinks.forEach(link => {
      const title = link.textContent.toLowerCase();
      const match = title.includes(query);

      const li = link.closest("li");
      if (li) li.style.display = match || folderNameMatches || !query ? "block" : "none";

      if (match) folderHasMatch = true;
    });

    const shouldShowFolder = folderHasMatch || folderNameMatches || !query;
    folderLi.style.display = shouldShowFolder ? "block" : "none";

    if (folderDropdown) {
      folderDropdown.classList.toggle("open", shouldShowFolder && query);
      folderToggle?.classList.toggle("open", shouldShowFolder && query);
    }
  });
});

buildSidebar();

// Apply default dark theme if no preference is saved
if (!localStorage.getItem("theme")) {
  document.body.setAttribute("data-theme", "dark");
}

// Function to update the toggle icon text
function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = theme === "dark" ? "🌙" : "☀️";
  }
}

// Event listener for the theme toggle button
const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    const current = document.body.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.body.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateThemeIcon(next);
  });
}

// On page load, use saved theme or default to dark
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
});

const sidebar = document.querySelector(".sidebar");
const backdrop = document.getElementById("sidebar-backdrop");
const body = document.body;

document.getElementById("menu-toggle").addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("open");
  backdrop.classList.toggle("show", isOpen);
  body.classList.toggle("sidebar-open", isOpen);
});

backdrop.addEventListener("click", () => {
  sidebar.classList.remove("open");
  backdrop.classList.remove("show");
  body.classList.remove("sidebar-open");
});

document.getElementById("sidebar-close").addEventListener("click", () => {
  sidebar.classList.remove("open");
  backdrop.classList.remove("show");
  body.classList.remove("sidebar-open");
});

// === Logo Click Always Reloads if URL and Hash Are the Same ===
document.addEventListener("DOMContentLoaded", () => {
  const logoLink = document.querySelector(".logo a");
  if (!logoLink) return;

  logoLink.addEventListener("click", (e) => {
    const targetHref = logoLink.getAttribute("href");
    const fullTargetURL = new URL(targetHref, window.location.origin).href;

    // Compare the full target URL to current location
    if (window.location.href === fullTargetURL) {
      e.preventDefault();
      location.reload();
    }
    // Otherwise let browser handle normal navigation
  });
});

window.addEventListener("hashchange", () => {
  const newPath = decodeURIComponent(location.hash.slice(1));
  if (flatDocs.some(doc => doc.path === newPath)) {
    loadDocByPath(newPath);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navLinksToReload = [
    "docs.html#docs%2Fmanuals-and-cheat-sheets%2Fget-started.md",
    "docs.html#docs%2Fmanuals-and-cheat-sheets%2Fcontribute-to-creator-documentation.md"
  ];

  document.querySelectorAll("nav.nav-links a").forEach(link => {
    link.addEventListener("click", (e) => {
      const currentUrl = window.location.href;
      const linkHref = link.href;

      // If clicked link's href is exactly the current page URL, reload page
      if (linkHref === currentUrl && navLinksToReload.some(nr => linkHref.includes(nr))) {
        e.preventDefault();
        window.location.reload();
      }
    });
  });
});