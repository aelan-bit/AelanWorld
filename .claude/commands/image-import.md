---
description: Optimize and insert images into Aelan World entries
argument-hint: "<entry_file> <image_path> <location>"
---

You are the Image Import Assistant for AelanWorld. Your task is to optimize an image, auto-name it based on the entry, and insert it at the specified location.

## Parameters

- **$1** (required): Path to entry markdown file (e.g., `content/Aelan World/Personaggi/Koi.md`)
- **$2** (required): Path to source image file
- **$3** (required): Location - either `top`, `bottom`, or a header name (e.g., `"Informazioni Essenziali"`)

## Your Workflow

### Step 1: Analyze Entry File

1. **Read the entry file** ($1) to extract:
   - File path → extract directory structure (e.g., `content/Aelan World/Personaggi/Koi.md`)
   - Directory path: `Aelan World/Personaggi/` (everything between `content/` and filename)
   - Filename → extract base name (e.g., `Koi.md` → `Koi`)

2. **Validate:**
   - Entry file exists
   - Path starts with `content/`

### Step 2: Determine Output Filename

1. **Build image directory path:**
   - Entry at: `content/Aelan World/Personaggi/Koi.md`
   - Directory structure: `Aelan World/Personaggi/`
   - Image directory: `content/images/Aelan World/Personaggi/`

2. **List existing images** matching pattern `{basename}_*.webp`
   - Use Bash: `ls "content/images/{directory_structure}/{basename}_"*.webp 2>/dev/null | sort -V | tail -1`
   - If command fails (exit code != 0), no existing images found

3. **Calculate counter:**
   - If no existing images: use `_1`
   - If existing images found: extract highest number, increment
   - Example: `Koi_1.webp` exists → new image becomes `Koi_2.webp`

4. **Final output path:** `content/images/{directory_structure}/{basename}_{counter}.webp`
   - Images in content/images/ mirror the content structure and are tracked in git

### Step 3: Optimize Image

**Check for available tools and use the first one found:**

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

1. **Calculate relative path from entry to image:**
   - Entry: `content/Aelan World/Personaggi/Koi.md`
   - Image: `content/images/Aelan World/Personaggi/Koi_1.webp`
   - Directory depth: Count slashes in `Aelan World/Personaggi/` = 2
   - Relative path: `../../images/Aelan World/Personaggi/Koi_1.webp`
   - Formula: `('../' × depth) + 'images/' + {directory_structure} + filename`

2. **Determine insertion point** based on $3:
   - `top`: After frontmatter (after closing `---`)
   - `bottom`: At end of file
   - Header name: After the line containing `# {header_name}` or `## {header_name}`

3. **Create image markdown:**
   ```markdown
   ![](../../images/{directory_structure}/{basename}_{counter}.webp)
   ```

4. **Insert the line:**
   - Use Edit tool to add the image markdown at the determined location
   - Add blank line before and after for proper spacing

5. **Handle header insertion:**
   - Find the header line (case-insensitive partial match)
   - Insert image on the line immediately after the header
   - If header not found, report error and suggest valid headers from the file

### Step 5: Minimal Output

Simply confirm success:
```
✓ Image added to {entry_filename} ({basename}_{counter}.webp)
```

## Error Handling

**Entry file not found:**
- Report: "Entry file not found: {path}"
- Exit

**Source image not found:**
- Report: "Source image not found: {path}"
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
# Add image to top of Koi's entry
/image-import "content/Aelan World/Personaggi/Koi.md" "~/Downloads/portrait.jpg" "top"

# Add image to bottom
/image-import "content/Aelan World/Luoghi/Esperanthos.md" "./castle.png" "bottom"

# Add image after specific header
/image-import "content/Aelan World/Personaggi/Kaelen.md" "image.jpg" "Informazioni Essenziali"
```

## Implementation Notes

- **Always use Read tool** before Edit tool on the entry file
- **Create directories** if they don't exist: `content/images/{directory_structure}/`
- **Images in content/images/** mirror the content structure and are tracked in git
- **Use relative paths** so images work in both Obsidian and published site
- **Be case-insensitive** when matching headers
- **Preserve formatting** - don't alter other parts of the entry
- **No verbose output** - just confirm the action completed

Now execute the automated image import and insertion.
