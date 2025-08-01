# MHCP Documentation Site - Editor's Standard Operating Procedure (SOP)

*Last updated: August 1, 2025*

## Overview
This guide shows MHCP mentors how to add new documentation and edit the homepage.

## Getting Started

### What You Need

- Access to the GitHub repository: `MHCPCreators/worlds-documentation`
- Basic understanding of markdown files (.md)
- A web browser

### Key Files You'll Edit

- **Homepage:** `index.html` - Main landing page
- **Documentation Navigation:** `docs-script.js` - Controls which docs appear in sidebar
- **Documentation Files:** `docs/` folder - Individual markdown files

---

## 🔄 Important: Use Pull Requests

**All changes require review before going live:**

1. **Make changes** on a branch or fork (see [README](README.md))
2. **Create Pull Request** when ready
3. **Tag reviewer** for approval
4. **Changes go live** after merge

## Adding New Documentation

### Step 1: Upload Your Markdown File

1. **Navigate to the correct folder** in the `docs/` directory such as:
    - `docs/understanding-the-desktop-editor/` - Desktop editor tutorials
    - `docs/creating-a-world/` - World creation guides
    - `docs/generative-ai-tools/` - AI tools and features
    - `docs/getting-started-with-scripting/` - Scripting basics
    - `docs/scripting-concepts-persistence-apis/` - Advanced scripting
    - `docs/meshes-materials-import/` - 3D assets and materials
    - `docs/manuals-and-cheat-sheets/` - Quick references and guides
2. **Upload your .md file** using GitHub's web interface:
    - Click "Add file" → "Upload files"
    - Drag your markdown file into the folder
    - Commit the changes

### Step 2: Add to Navigation (Critical!)

**Edit `docs-script.js` to make your new doc appear in the sidebar:**

1. **Open `docs-script.js`**
2. **Find the `docs` object** (around line 2)
3. **Add your filename** to the appropriate category array:

```jsx
const docs = {
  "understanding-the-desktop-editor": [
    "existing-file.md",
    "your-new-file.md",  // ← Add your new file here
  ],
  // ... other categories
};

```


## ⚠️ CRITICAL FILE NAMING RULES

### **The filename in `docs-script.js` MUST exactly match your uploaded file:**

| ✅ **Correct** | ❌ **Wrong** | 🚫 **Result** |
|----------------|--------------|---------------|
| `"my-tutorial.md"` | `"My-tutorial.md"` | **404 Error** - Wrong capitalization |
| `"build-a-world.md"` | `"build a world.md"` | **404 Error** - Spaces instead of dashes |
| `"scripting-basics.md"` | `"scripting_basics.md"` | **404 Error** - Underscore vs dash |
| `"typescript-101.md"` | `"typescript-101.MD"` | **404 Error** - Wrong file extension case |

### **🔍 Before Adding to docs-script.js:**

1. **Check your uploaded filename exactly:**
   - Go to your uploaded file in GitHub
   - **Copy the exact filename** (including .md)
   - **Paste it** into docs-script.js (don't retype!)

2. **Verify these match perfectly:**
   ```
   📁 Uploaded file: build-your-first-world.md
   📄 In docs-script.js: "build-your-first-world.md"
                         ↑ Exactly the same ↑
   ```

### **💡 Pro Tips to Avoid Errors:**

**✅ Safe File Naming:**
- Use **lowercase letters only**: `my-tutorial.md`
- Replace **spaces with dashes**: `world building.md` → `world-building.md`
- Avoid **special characters**: No `!@#$%^&*()` symbols, apostrophes, or unicodes
- Keep **extensions lowercase**: `.md` not `.MD`

**✅ Double-Check Method:**
1. Upload your file first
2. Navigate to it in GitHub and copy the filename from the URL
3. Paste that exact filename into docs-script.js

**❌ Common Mistakes:**
- `"My Awesome Tutorial.md"` - **Has capitals and spaces**
- `"cool_tutorial.md"` - **Uses underscores instead of dashes**  
- `"tutorial.MD"` - **Wrong extension case**
- `"tütorial.md"` - **Special characters cause issues**



### Step 3: Update Homepage Links (Optional)

**If you want the new doc featured on the homepage:**

1. **Open `index.html`**
2. **Find the relevant card section** (around lines 106-206)
3. **Add a new list item following the format:**

```html
<li><a href="docs.html#docs/your-category/your-new-file.md">Your New Doc Title</a></li>
```

---

## Adding YouTube Videos to Homepage Carousel

### Step 1: Get Video Information

**You'll need:**

- YouTube video ID (from URL: `youtube.com/watch?v=VIDEO_ID`)
    - The 11-character code from the URL
- Video title
- Brief description (1-2 sentences) - see description guidelines below

### Step 2: Copy an Existing Video Block

**Edit `index.html` around lines 210-333:**


1. **Find the carousel section** - Look for `<div class="carousel-track">`
2. **Copy an entire video block** - From `<div class="carousel-item">` to `</div>`
3. **Paste it at the beginning** of the carousel (right after `<div class="carousel-track">`)


**Template to copy and modify:**
```html
<div class="carousel-item">
  <div class="video-track-height">
    <div class="video-wrapper">
      <a href="https://www.youtube.com/watch?v=sWYHMS770XA" target="_blank" class="thumbnail-link">
        <img src="https://img.youtube.com/vi/sWYHMS770XA/hqdefault.jpg" alt="Video thumbnail" />
        <div class="play-button"></div>
      </a>
    </div>
  </div>
  <h4 class="video-title">NEW FEATURES in Worlds (July 2025) | Feature Detective</h4>
  <p class="video-description">Stay ahead of the curve with this deep dive into the latest features and APIs (as of July 2025) for Worlds.</p>
</div>
```

### Step 3: Replace the Video Information

****In your copied block, change these 4 items:****


| Item | What to Change | Example |
|------|----------------|---------|
| **1. Video URL** | `watch?v=OLD_ID` → `watch?v=NEW_ID` | `watch?v=sWYHMS770XA` → `watch?v=ABC123DEF45` |
| **2. Thumbnail URL** | `/vi/OLD_ID/` → `/vi/NEW_ID/` | `/vi/sWYHMS770XA/` → `/vi/ABC123DEF45/` |
| **3. Video Title** | Replace entire `<h4>` content | `NEW FEATURES in Worlds...` → `Your New Video Title` |
| **4. Description** | Replace entire `<p>` content | `Stay ahead of the curve...` → `Your new description here.` |

### **YouTube Video Descriptions:**

**Target length:** 15-25 words (aim for 1-2 sentences max)

**✅ Description Formula:**
- **Start with action word:** "Learn," "Discover," "Master," "Eliminate"
- **Include benefit:** What the viewer will gain
- **Keep it scannable:** Easy to read while scrolling

**💡 Pro Tips:**
- **Front-load benefits:** Put the most important info first
- **Use active voice:** "Build amazing worlds" vs "Amazing worlds can be built"
- **Include keywords:** "Worlds," "GenAI," "TypeScript," "mobile," etc.
- **Test readability:** Can you understand it in 3 seconds?

### ⚠️ Quick Checklist

Before saving your changes:
- **Video ID appears in 2 places** - URL and thumbnail
- **Both IDs match exactly** - Same 11-character code
- **Title is accurate and updated**
- **Description is 15-25 words** - Concise and benefit-focused
- **Video is public** - Not unlisted or private
- **Copied complete block** - From `<div class="carousel-item">` to `</div>`


## Managing Featured Content

### Homepage Featured Cards

**Edit `index.html` around lines 80-140:**

**To add a new featured card:**

```html
<div class="card searchable">
  <h3>Your Feature Title</h3>
  <p>Brief description of the content.</p>
  <a href="docs.html#docs/category/filename.md">Read More</a>
</div>
```

**To update existing cards:**

- Change the `<h3>` title
- Update the `<p>` description
- Modify the `href` link destination

### Featured Documentation Lists

**Update the card lists in the "Get Started" section:**

```html
<div class="card searchable">
  <h3>Category Name</h3>
  <ul>
    <li><a href="docs.html#docs/category/file.md">Document Title</a></li>
    <!-- Add new items here -->
  </ul>
</div>
```

---

## Common File Locations

### 📁 Repository Structure

```
worlds-documentation/
├── index.html                 # Homepage
├── docs.html                  # Documentation viewer
├── docs-script.js             # Doc navigation logic
├── style.css                  # Homepage styles
├── docs-style.css             # Documentation styles
├── privacy.html               # Privacy policy
└── docs/                      # Documentation files
    ├── understanding-the-desktop-editor/
    ├── creating-a-world/
    ├── generative-ai-tools/
    ├── getting-started-with-scripting/
    ├── scripting-concepts-persistence-apis/
    ├── meshes-materials-import/
    └── manuals-and-cheat-sheets/

```

### 🔗 URL Patterns

- **Homepage:** `https://mhcpcreators.github.io/worlds-documentation/`
- **Documentation:** `https://mhcpcreators.github.io/worlds-documentation/docs.html#docs/category/filename.md`
- **Direct links:** Use the format above for all internal documentation links

---

## Testing Your Changes

### Before Publishing

1. **Preview changes** using GitHub's preview feature when editing
2. **Check links** - make sure file paths match exactly
3. **Verify categories** - ensure new docs are in the right folder

### After Publishing

1. **Wait 2-5 minutes** for GitHub Pages to rebuild
2. **Visit the live site** and test your changes
3. **Check both desktop and mobile** views
4. **Test navigation** - make sure new docs appear in sidebar

### Common Issues

- **Doc doesn't appear in sidebar** → Check `docs-script.js` array
- **Link returns 404** → Verify file path and filename spelling
- **Images don't load** → Ensure images are uploaded to correct folder

---

## Quick Reference

### File Naming

- ✅ **Good:** `my-awesome-tutorial.md`
- ❌ **Bad:** `My Awesome Tutorial!.md`
- **Use:** lowercase, hyphens for spaces, no special characters

### Link Format

```html
<!-- Internal documentation -->
<a href="docs.html#docs/category/filename.md">Title</a>

<!-- External links -->
<a href="<https://external-site.com>" target="_blank">Title</a>

<!-- YouTube videos -->
<a href="<https://www.youtube.com/watch?v=VIDEO_ID>" target="_blank">Video Title</a>

```

### Safe Editing Areas

- ✅ **Safe to edit:** Content within `<li>`, `<p>`, `<h3>`, descriptions
- ⚠️ **Be careful:** URLs, filenames, JavaScript arrays
- ❌ **Don't change:** CSS classes, HTML structure, JavaScript logic

---

## Emergency Contacts

**If something breaks:**

1. **Check recent commits** in GitHub to see what changed
2. **Revert changes** using GitHub's revert feature
3. **Contact technical team** with specific error details
4. **Include:** What you changed, what went wrong, error messages

---

*This SOP covers common editing tasks. For advanced changes or technical issues, consult with the development team.*