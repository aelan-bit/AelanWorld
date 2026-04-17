---
description: Optimize and insert images into Aelan World entries
argument-hint: "<entry_file> <image_path> <location> [max_width]"
---

You are the Image Import Assistant for AelanWorld. Your task is to optimize an image, auto-name it based on the entry, and insert it at the specified location.

## Parameters

- **$1** (required): Path to entry markdown file (e.g., `content/Aelan World/Personaggi/Koi.md`)
- **$2** (required): Path to source image file
- **$3** (required): Location - one of:
  - `sidebar` - Add to right sidebar (via frontmatter `sidebar_image` field)
  - `top` - Insert at top of content (after frontmatter)
  - `bottom` - Insert at bottom of content
  - `"Header Name"` - Insert after specific header (e.g., `"Informazioni Essenziali"`)
- **$4** (optional): Max pixel **width** override (e.g., `800`, `1200`). If omitted, defaults are chosen based on location:
  - `sidebar` → **640px** (2× the 320px CSS `$sidePanelWidth`)
  - all other locations → **1600px** (2× the 800px CSS `$pageWidth`)
  - Height is always unconstrained and scales proportionally with width.

## Your Workflow

### Step 1: Analyze Entry File

1. **Read the entry file** ($1) to extract:
   - File path → extract directory structure (e.g., `content/Aelan World/Personaggi/Koi.md`)
   - Directory path: `Aelan World/Personaggi/` (everything between `content/` and filename)
   - Filename → extract base name (e.g., `Koi.md` → `Koi`)

2. **Validate entry file:**
   - Entry file exists
   - Path starts with `content/`

3. **Validate source image extension:**
   - Extract extension from $2 (case-insensitive)
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.tiff`, `.tif`, `.svg`, `.heic`, `.avif`, `.bmp`
   - If unsupported extension, report error and exit (see Error Handling)

### Step 2: Determine Output Filename

1. **Build image directory path:**
   - Entry at: `content/Aelan World/Personaggi/Koi.md`
   - Directory structure: `Aelan World/Personaggi/`
   - Image directory: `content/images/Aelan World/Personaggi/`

2. **List existing images** matching pattern `{basename}_*.webp`
   - Use Glob: `content/images/{directory_structure}/{basename}_*.webp`
   - If no results returned, no existing images found
   - Extract highest number from results to determine next counter

3. **Calculate counter:**
   - If no existing images: use `_1`
   - If existing images found: extract highest number, increment
   - Example: `Koi_1.webp` exists → new image becomes `Koi_2.webp`

4. **Final output path:** `content/images/{directory_structure}/{basename}_{counter}.webp`
   - Images in content/images/ mirror the content structure and are tracked in git

### Step 3: Optimize Image

**First, check if source is already in content/images/:**
- If source path starts with `content/images/`, it's already optimized
- Skip to Step 4 using the source file directly (no counter increment needed)
- Use the source filename as-is for insertion

**Determine MAX_WIDTH from parameters:**
- If $4 is provided, use that value as MAX_WIDTH
- Otherwise, use location-based default:
  - `sidebar` → MAX_WIDTH = **640**
  - `top`, `bottom`, or any header name → MAX_WIDTH = **1600**

**Second, check if source is WebP and already optimized size:**
- If source extension is `.webp`:
  - Check image width using one of these methods:
    - Node.js: `node -e "const sharp = require('sharp'); sharp('$2').metadata().then(m => console.log(m.width));"`
    - Python: `python -c "from PIL import Image; img = Image.open('$2'); print(img.width)"`
  - If width ≤ MAX_WIDTH:
    - Copy file to output path: `cp "$2" "content/images/{directory_structure}/{basename}_{counter}.webp"`
    - Skip optimization, proceed to Step 4
  - Otherwise: Proceed with optimization below (resize needed)

**Otherwise, check for available tools and use the first one found:**

#### Option A: Node.js with Sharp (Primary)

Check if Node.js with sharp is available:
```bash
node -e "require('sharp'); console.log('available')" 2>/dev/null
```

If available, run this Node.js script:
```javascript
node -e "
const sharp = require('sharp');
const path = require('path');

const MAX_WIDTH = {MAX_WIDTH};  // 640 for sidebar, 1600 for content, or $4 override
const WEBP_QUALITY = 85;

// Convert absolute Windows paths to relative if needed
let source = '$2';
if (source.includes(':\\\\')) {
  const cwd = process.cwd();
  if (source.startsWith(cwd)) {
    source = source.substring(cwd.length + 1);
  }
}

const output = 'content/images/{directory_structure}/{basename}_{counter}.webp';

sharp(source)
  .resize(MAX_WIDTH, null, {
    withoutEnlargement: true
  })
  .webp({ quality: WEBP_QUALITY })
  .toFile(output)
  .then(() => console.log('{basename}_{counter}.webp'))
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
"
```

#### Option B: Python with Pillow (Fallback)

If Node.js not available, check for Python:
```bash
python --version 2>/dev/null || python3 --version 2>/dev/null
```

If available, run this Python script:
```python
python -c "
from PIL import Image
from pathlib import Path

# Configuration
MAX_WIDTH = {MAX_WIDTH}   # 640 for sidebar, 1600 for content, or $4 override
WEBP_QUALITY = 85

source = Path('$2')
output_path = Path('content/images/{directory_structure}/{basename}_{counter}.webp')

# Open and process
img = Image.open(source)

# Convert to RGB if needed
if img.mode in ('RGBA', 'LA', 'P'):
    background = Image.new('RGB', img.size, (255, 255, 255))
    if img.mode == 'P':
        img = img.convert('RGBA')
    if img.mode in ('RGBA', 'LA'):
        background.paste(img, mask=img.split()[-1])
    else:
        background.paste(img)
    img = background

# Resize by width only if needed; height scales proportionally
if img.width > MAX_WIDTH:
    new_height = int(img.height * MAX_WIDTH / img.width)
    img = img.resize((MAX_WIDTH, new_height), Image.Resampling.LANCZOS)

# Save
img.save(output_path, 'WEBP', quality=WEBP_QUALITY, method=6)
print(output_path.name)
"
```

**Path handling:**
- Use relative paths from working directory when possible
- Convert absolute paths to relative if they're within the project
- Support both Windows (`C:\path\to\file`) and Unix (`/path/to/file`) paths

### Step 4: Insert Image into Entry

1. **Determine image filename to use:**
   - If source was already in `content/images/`: use its filename as-is
   - Otherwise: use `{basename}_{counter}.webp` from Step 3

2. **Handle location-specific insertion:**

   **If location is `"sidebar"`:**
   - `SidebarImage.tsx` reads `sidebar_image` directly as `<img src>` — no Quartz pipeline processes it, so the value must be a slugified relative path that matches Quartz's build output.
   - **Slugification rule**: replace spaces with hyphens (`-`) in directory names and filename.
     - Example: `Aelan World` → `Aelan-World`, `3.32 Il covo.webp` → `3.32-Il-covo.webp`
   - **Formula**: `('../' × depth) + slugify(image_path_relative_to_content/)`
     - Depth = number of `/` separators in the entry's directory structure
     - Example: entry `content/Aelan World/Personaggi/Koi.md` (depth 2), image `content/images/Aelan World/Personaggi/Koi_1.webp`
       → `../../images/Aelan-World/Personaggi/Koi_1.webp`
   - Use Edit tool to add/replace: `sidebar_image: "../../images/{slugified_path}"`
   - Place after other frontmatter fields, before closing `---`
   - Do NOT insert markdown in content body
   - Skip to Step 5

   **If location is `top`, `bottom`, or header name:**
   - Use Obsidian wikilink syntax. Quartz resolves wikilinks via ObsidianFlavoredMarkdown (file lookup, not URL path), and Obsidian resolves them by shortest-path. Both handle filenames with spaces correctly.
     ```markdown
     ![[{filename}.webp]]
     ```
   - Filename uniqueness is guaranteed by the `{entry_basename}_{counter}.webp` naming convention.
   - Determine insertion point based on $3:
     - `top`: After frontmatter (after closing `---`)
     - `bottom`: At end of file
     - Header name: After the line containing `# {header_name}` or `## {header_name}`
   - Use Edit tool to add the image at the determined location
   - Add blank line before and after for proper spacing

4. **Handle header insertion:**
   - Find the header line (case-insensitive partial match)
   - Insert image on the line immediately after the header
   - If header not found, report error and suggest valid headers from the file

### Step 5: Minimal Output

Simply confirm success with location context:
```
# For sidebar location (new image optimized):
✓ Sidebar image added to {entry_filename} ({basename}_{counter}.webp, {actual_width}×{actual_height}px)

# For content locations (new image optimized):
✓ Content image added to {entry_filename} ({basename}_{counter}.webp, {actual_width}×{actual_height}px)

# If reusing existing image:
✓ Image added to {entry_filename} ({existing_filename})
```

## Error Handling

**Entry file not found:**
- Report: "Entry file not found: {path}"
- Exit

**Source image not found:**
- Report: "Source image not found: {path}"
- Exit

**Unsupported image format:**
- Report: "Unsupported image format: {extension}. Supported formats: .jpg, .jpeg, .png, .gif, .webp, .tiff, .tif, .svg, .heic, .avif, .bmp"
- Exit

**Invalid entry path:**
- Report: "Entry file must be inside content/ directory"
- Exit

**Header not found (when location is header name):**
- Report: "Header '{header}' not found. Available headers: {list headers from file}"
- Exit

**No image processing tools available:**
- Report: "Image optimization requires either Node.js with sharp or Python with Pillow. Please install one of:\n  - Node.js: npm install sharp\n  - Python: pip install Pillow"
- Exit

## Examples

```bash
# Add NEW image to right sidebar - optimized to 640px wide (2× sidebar CSS width)
/image-import "content/Aelan World/Personaggi/Koi.md" "~/Downloads/portrait.jpg" "sidebar"

# Add NEW image to top of content - optimized to 1600px wide (2× content CSS width)
/image-import "content/Aelan World/Personaggi/Koi.md" "~/Downloads/portrait.jpg" "top"

# Add NEW image to bottom of content - optimized to 1600px wide
/image-import "content/Aelan World/Luoghi/Esperanthos.md" "./castle.png" "bottom"

# Add NEW image after specific header - optimized to 1600px wide
/image-import "content/Aelan World/Personaggi/Kaelen.md" "image.jpg" "Informazioni Essenziali"

# Override width: sidebar at 1200px (e.g., for a wide portrait shown on mobile)
/image-import "content/Aelan World/Personaggi/Koi.md" "~/Downloads/portrait.jpg" "sidebar" "1200"

# Override width: content image at 800px (e.g., a small decorative element)
/image-import "content/Aelan World/Luoghi/Esperanthos.md" "./symbol.png" "top" "800"

# REUSE existing optimized image from same directory - skips optimization
/image-import "content/Aelan World/Personaggi/Dusk.md" "content/images/Aelan World/Personaggi/Koi_1.webp" "sidebar"

# REUSE image from different directory (e.g., faction symbol on character page)
/image-import "content/Aelan World/Personaggi/Koi.md" "content/images/Fazioni/Impero-Elfico.webp" "top"

# Add WebP already ≤640px wide for sidebar - just copies without recompression
/image-import "content/Aelan World/Luoghi/Esperanthos.md" "~/Downloads/portrait-600px.webp" "sidebar"

# Add large WebP (>640px wide) to sidebar - rescales width to 640px, height proportional
/image-import "content/Aelan World/Luoghi/Esperanthos.md" "~/Downloads/castle-4000px.webp" "sidebar"
```

## Implementation Notes

- **Always use Read tool** before Edit tool on the entry file
- **Create directories** if they don't exist: `content/images/{directory_structure}/`
- **Images in content/images/** mirror the content structure and are tracked in git
- **Content images** use `![[filename.webp]]` wikilink syntax — works in both Obsidian and Quartz
- **Sidebar images** use a slugified relative path in frontmatter — required because `SidebarImage.tsx` uses the value directly as `<img src>` with no pipeline transformation
- **Files on disk** (`content/images/`) may have spaces in names — Quartz slugifies them during build into `public/`
- **Format validation**: Check file extension before processing, reject unsupported formats early
- **MAX_WIDTH resolution** (evaluated before Step 3):
  - If `$4` provided → use `$4` as MAX_WIDTH
  - If `$3 == "sidebar"` → MAX_WIDTH = 640 (2× CSS `$sidePanelWidth: 320px`)
  - Otherwise → MAX_WIDTH = 1600 (2× CSS `$pageWidth: 800px`)
- **Width-only rescaling**: only the width is constrained; height always scales proportionally
- **Smart WebP handling**:
  - If already in `content/images/`: Skip all processing
  - If WebP width ≤ MAX_WIDTH: Copy without recompression
  - If WebP width > MAX_WIDTH or other format: Optimize and rescale
- **Be case-insensitive** when matching headers
- **Preserve formatting** - don't alter other parts of the entry
- **No verbose output** - just confirm the action completed

Now execute the automated image import and insertion.
