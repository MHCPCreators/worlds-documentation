/* const docList = document.getElementById("doc-list");
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

  /* const hashPath = decodeURIComponent(location.hash.slice(1));
  if (hashPath && flatDocs.some(doc => doc.path === hashPath)) {
    loadDocByPath(hashPath);
  } else {
    loadDocByPath(flatDocs[0].path);
  } 
} */

/*function loadDocByPath(path) {
  const index = flatDocs.findIndex(doc => doc.path === path);
  if (index === -1) {
    content.innerHTML = `<p>Document not found: ${path}</p>`;
    return;
  }

  currentIndex = index;

   try {
    // Use GitHub Pages pre-rendered HTML
    const htmlPath = path.replace('.md', '.html');
    const htmlUrl = `${GITHUB_PAGES_BASE}/${htmlPath}`;
    
        updateButtons();
        updateActiveLink();
        autoExpandFolders();

        const contentContainer = document.querySelector("main.content");
        if (contentContainer) {
          contentContainer.scrollTop = 0;
        }
      }
      
  } 
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
}); */

// === Logo Click Always Reloads if URL and Hash Are the Same ===
/* document.addEventListener("DOMContentLoaded", () => {
  const logoLink = document.querySelector(".logo a");
  if (!logoLink) return;

  logoLink.addEventListener("click", (e) => {
    const targetHref = logoLink.getAttribute("href");
    const fullTargetURL = new URL(targetHref, window.location.origin).href;

    // Compare the full target URL to current location
    /* if (window.location.href === fullTargetURL) {
      e.preventDefault();
      location.reload();
    } 
    // Otherwise let browser handle normal navigation
  });/*
}); 

/* window.addEventListener("hashchange", () => {
  const newPath = decodeURIComponent(location.hash.slice(1));
  if (flatDocs.some(doc => doc.path === newPath)) {
    loadDocByPath(newPath);
  }
}); */
  // document.querySelectorAll("nav.nav-links a").forEach(link => {
  //   link.addEventListener("click", (e) => {
  //     const currentUrl = window.location.href;
  //     const linkHref = link.href;

  //     // If clicked link's href is exactly the current page URL, reload page
  //     if (linkHref === currentUrl && navLinksToReload.some(nr => linkHref.includes(nr))) {
  //       e.preventDefault();
  //       window.location.reload();
  //     }
  //   });
  // }); */

  console.log("test12");

function setupThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  if (!toggleBtn) return;
  const setTheme = theme => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    toggleBtn.textContent = theme === "dark" ? "🌙" : "☀️";
  };
  setTheme(localStorage.getItem("theme") || "dark");
  toggleBtn.onclick = () => setTheme(document.body.getAttribute("data-theme") === "dark" ? "light" : "dark");
}

function setupFolderToggle() {
  document.querySelectorAll('#doc-list .folder-toggle').forEach(toggle =>
    toggle.onclick = () => {
      const dropdown = toggle.nextElementSibling;
      const open = dropdown.classList.toggle('open');
      toggle.classList.toggle('open', open);
    }
  );
}

function setupDocListSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;
  searchInput.oninput = () => {
    const query = searchInput.value.trim().toLowerCase();
    document.querySelectorAll('#doc-list > li').forEach(folderLi => {
      const folderToggle = folderLi.querySelector('.folder-toggle');
      const folderName = folderToggle?.querySelector('.folder-name')?.textContent.toLowerCase() || "";
      let matchFound = false;
      folderLi.querySelectorAll('a').forEach(link => {
        const isMatch = link.textContent.toLowerCase().includes(query) || folderName.includes(query) || !query;
        link.closest('li').style.display = isMatch ? 'block' : 'none';
        if (isMatch) matchFound = true;
      });
      folderLi.style.display = matchFound || folderName.includes(query) || !query ? 'block' : 'none';
      const dropdown = folderLi.querySelector('.dropdown');
      if (dropdown) {
        dropdown.classList.toggle('open', matchFound && query);
        folderToggle?.classList.toggle('open', matchFound && query);
      }
    });
  };
}

document.addEventListener('DOMContentLoaded', setupDocListSearch);
document.addEventListener('DOMContentLoaded', setupFolderToggle);
document.addEventListener("DOMContentLoaded", setupThemeToggle);
