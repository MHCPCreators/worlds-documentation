// Function to set up the theme toggle functionality
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

// Function to set up the folder toggle functionality in the document list
function setupFolderToggle() {
  document.querySelectorAll('#doc-list .folder-toggle').forEach(toggle =>
    toggle.onclick = () => {
      const dropdown = toggle.nextElementSibling;
      const open = dropdown.classList.toggle('open');
      toggle.classList.toggle('open', open);
    }
  );
}

// Function to set up the search functionality for the document list
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

//Mobile Sidebar Toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.body.classList.add("sidebar-open");
  const backdrop = document.querySelector(".sidebar-backdrop");
  if (backdrop) backdrop.classList.add("show");
  const sidebar = document.querySelector(".page-body .sidebar");
  if (sidebar) sidebar.classList.add("open");
});
// Close Sidebar
document.getElementById("sidebar-close").addEventListener("click", () => {
  document.body.classList.remove("sidebar-open");
  const backdrop = document.querySelector(".sidebar-backdrop");
  if (backdrop) backdrop.classList.remove("show");
  const sidebar = document.querySelector(".page-body .sidebar");
  if (sidebar) sidebar.classList.remove("open");
});

// Initialize all the setup functions when the document is ready
document.addEventListener('DOMContentLoaded', setupDocListSearch);
document.addEventListener('DOMContentLoaded', setupFolderToggle);
document.addEventListener("DOMContentLoaded", setupThemeToggle);
