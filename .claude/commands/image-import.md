---
description: Optimize and insert images into Aelan World entries
argument-hint: "<entry_file> <image_path> <location>"
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

**Second, check if source is WebP and already optimized size:**
- If source extension is `.webp`:
  - Check image dimensions using one of these methods:
    - Node.js: `node -e "const sharp = require('sharp'); sharp('$2').metadata().then(m => console.log(m.width, m.height));"`
    - Python: `python -c "from PIL import Image; img = Image.open('$2'); print(img.width, img.height)"`
  - If both width ≤ 1200 AND height ≤ 1200:
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

const MAX_SIZE = 1200;
const WEBP_QUALITY = 85;

// Convert absolute Windows paths to relative if needed
let source = '$2';
if (source.includes(':\\\\')) {
  // Extract path relative to working directory
  const cwd = process.cwd();
  if (source.startsWith(cwd)) {
    source = source.substring(cwd.length + 1);
  }
}

const output = 'content/images/{directory_structure}/{basename}_{counter}.webp';

sharp(source)
  .resize(MAX_SIZE, MAX_SIZE, {
    fit: 'inside',
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
MAX_WIDTH = 1200
MAX_HEIGHT = 1200
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

# Resize if needed
if img.width > MAX_WIDTH or img.height > MAX_HEIGHT:
    img.thumbnail((MAX_WIDTH, MAX_HEIGHT), Image.Resampling.LANCZOS)

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

1. **Determine image path to use:**
   - If source was already in `content/images/`: Use source path directly
   - Otherwise: Use newly optimized/copied image path from Step 3

2. **Calculate relative path from entry to image:**

   **Example 1 - Same directory depth:**
   - Entry: `content/Aelan World/Personaggi/Koi.md`
   - Image: `content/images/Aelan World/Personaggi/Koi_1.webp`
   - Entry depth (count `/` in `Aelan World/Personaggi/`): 2
   - Relative path: `../../images/Aelan-World/Personaggi/Koi_1.webp`

   **Example 2 - Cross-directory (faction image in character entry):**
   - Entry: `content/Aelan World/Personaggi/Koi.md`
   - Image: `content/images/Fazioni/Impero-Elfico.webp`
   - Entry depth (count `/` in `Aelan World/Personaggi/`): 2
   - Relative path: `../../images/Fazioni/Impero-Elfico.webp`

   **Formula:**
   1. Extract entry directory structure: everything between `content/` and filename
      - Example: `content/Aelan World/Personaggi/Koi.md` → `Aelan World/Personaggi/`
   2. Count directory depth: count `/` or `\` separators in directory structure
      - Example: `Aelan World/Personaggi/` has 2 separators → depth = 2
   3. Extract image path relative to `content/`:
      - Example: `content/images/Fazioni/Impero.webp` → `images/Fazioni/Impero.webp`
   4. Build relative path: `('../' × depth) + slugify(image_relative_path)`
      - Example: `../../` + `images/Fazioni/Impero-Elfico.webp`

   **CRITICAL - Slugification:**
   - Replace spaces with hyphens (`-`) in both directory names and filenames
   - Example: `Aelan World` → `Aelan-World`, `3.32 Il covo delle streghe.webp` → `3.32-Il-covo-delle-streghe.webp`
   - This matches Quartz's URL transformation during build

3. **Handle location-specific insertion:**

   **If location is `"sidebar"`:**
   - Read the entry file frontmatter
   - Add or update the `sidebar_image` field in frontmatter
   - Use Edit tool to add/replace: `sidebar_image: "../../images/{slugified_path}"`
   - Place it after other frontmatter fields, before closing `---`
   - Do NOT insert markdown in content body
   - Skip to Step 5

   **If location is `top`, `bottom`, or header name:**
   - Determine insertion point based on $3:
     - `top`: After frontmatter (after closing `---`)
     - `bottom`: At end of file
     - Header name: After the line containing `# {header_name}` or `## {header_name}`
   - Create image markdown:
     ```markdown
     ![](../../images/{slugified_directory_structure}/{slugified_filename})
     ```
   - Use Edit tool to add the image markdown at the determined location
   - Add blank line before and after for proper spacing

4. **Handle header insertion:**
   - Find the header line (case-insensitive partial match)
   - Insert image on the line immediately after the header
   - If header not found, report error and suggest valid headers from the file

### Step 5: Minimal Output

Simply confirm success with location context:
```
# For sidebar location (new image optimized):
✓ Sidebar image added to {entry_filename} ({basename}_{counter}.webp)

# For content locations (new image optimized):
✓ Content image added to {entry_filename} ({basename}_{counter}.webp)

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
# Add NEW image to right sidebar (via frontmatter) - will optimize and convert to WebP
/image-import "content/Aelan World/Personaggi/Koi.md" "~/Downloads/portrait.jpg" "sidebar"

# Add NEW image to top of content - will optimize
/image-import "content/Aelan World/Personaggi/Koi.md" "~/Downloads/portrait.jpg" "top"

# Add NEW image to bottom of content
/image-import "content/Aelan World/Luoghi/Esperanthos.md" "./castle.png" "bottom"

# Add NEW image after specific header
/image-import "content/Aelan World/Personaggi/Kaelen.md" "image.jpg" "Informazioni Essenziali"

# REUSE existing optimized image from same directory - skips optimization
/image-import "content/Aelan World/Personaggi/Dusk.md" "content/images/Aelan World/Personaggi/Koi_1.webp" "sidebar"

# REUSE image from different directory (e.g., faction symbol on character page)
/image-import "content/Aelan World/Personaggi/Koi.md" "content/images/Fazioni/Impero-Elfico.webp" "top"

# Add optimized WebP (≤1200px) - just copies without recompression
/image-import "content/Aelan World/Luoghi/Esperanthos.md" "~/Downloads/castle-1000px.webp" "sidebar"

# Add large WebP (>1200px) - resizes to 1200px max
/image-import "content/Aelan World/Luoghi/Esperanthos.md" "~/Downloads/castle-4000px.webp" "sidebar"
```

## Implementation Notes

- **Always use Read tool** before Edit tool on the entry file
- **Create directories** if they don't exist: `content/images/{directory_structure}/`
- **Images in content/images/** mirror the content structure and are tracked in git
- **Use relative paths** so images work in both Obsidian and published site
- **Cross-directory support**: Calculate relative paths correctly from any entry to any image location
- **Format validation**: Check file extension before processing, reject unsupported formats early
- **Smart WebP handling**:
  - If already in `content/images/`: Skip all processing
  - If WebP ≤1200px: Copy without recompression
  - If WebP >1200px or other format: Optimize and resize
- **Be case-insensitive** when matching headers
- **Preserve formatting** - don't alter other parts of the entry
- **No verbose output** - just confirm the action completed

Now execute the automated image import and insertion.
