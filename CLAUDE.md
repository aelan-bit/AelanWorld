# CLAUDE.md

D&D campaign documentation site built with **Quartz v4** that publishes a digital garden for "Aelan World" campaigns. Deployed to GitHub Pages at `aelan-bit.github.io/AelanWorld`.

## Development Commands

```bash
# Development server with hot reload
npx quartz build --serve

# Build for production
npx quartz build

# Format code
npm run format

# Type checking
npm run check

# Debug build issues
npm run docs
```

## Content Management Rules

### File Operations
- ALWAYS `Read` existing files before editing
- Use `Write` tool for frontmatter fixes (safer than Edit)
- Use `Glob` before creating new files to check existence
- Check directory structure with `LS` when uncertain about paths

### Frontmatter Requirements
- Must start at line 1 (no leading whitespace/empty lines)
- Required field: `tags: [content-type]`
- Tags must match directory: `personaggi` → `Aelan World/Personaggi/`
- Use arrays for multiple values: `fazioni: ["[[Faction1]]", "[[Faction2]]"]`
- Wikilinks in quotes: `era: "[[Era Name]]"`

### Wikilink Creation
- **Character entries**: Use `/character-research [character name]` agent for comprehensive entries
- **Agent handles**: Proper wikilink creation, alias checking, frontmatter, thematic organization
- **Manual links**: `Glob` to find target → `Read` to check aliases → create `[[FileName|Display]]`
- **Report unresolved links** at session end

### Session File Naming
- **Alba di Guerra**: `N-Title.md` (e.g., `1-Ombre ad Esperanthos.md`)
- **Cronache di Aelan**: `#.##-Title.md` (e.g., `2.06-L'enigma delle lingue.md`)

## Content Creation Workflows

### Entry Creation Process
- ALWAYS `Read` existing lore files before writing new entries
- For character entries: Read related faction files, `Crollo del Paradiso.md`, character files first
- For timeline-sensitive content: Verify chronology in existing docs before proceeding
- Use 1-3 paragraphs max for secondary characters

### Multi-Persona Editorial Approach
**Functional persona (Laura)**: Structure essential facts, clear information hierarchy
**Narrative persona (Aurelio)**: Add evocative language, atmospheric details, emotional weight

**Example Template:**
```markdown
# Informazioni Essenziali
**Ruolo:** [functional description]
**Funzione:** [practical purpose/abilities]  
**Situazione Attuale:** [current status/location]
**Alleati:** [faction/character links] | **Nemici:** [opposition links]

---

# [Evocative Title - Aurelio's dramatic hook]

*"Compelling quote"* ([[Speaker]] context)

[Aurelio's immersive narrative expanding on Laura's facts...]

## [Thematic Section Title]
[Story details with atmospheric language: "tessere la sua tela", "spezzare i cieli"]
```

**Result**: Entries that balance utility with immersive storytelling

### Citation Standards
- Format: *"Direct quote"* ([[Speaker Name]] context/situation)  
- NEVER assume entry subject spoke the quote
- Always specify the actual speaker of each quoted line

### Link Validation
```bash
# Check for malformed links
grep -r "\[\[\[\[" content --include="*.md"

# Fix immediately when found
# Exclude @claude/ documentation files from results
```

## Verification Commands

### Content Completeness
```bash
# Find existing entries for topic
Glob: content/**/*topic-name*.md

# Verify chronological consistency  
Read: content/Aelan World/Lore/[relevant-lore].md

# Check frontmatter compliance
Read: [file-path]  # Always before editing

# List campaign sessions
Glob: content/[Campaign]/Sessioni/*.md
```

### Quality Control
- Verify tag matches directory location
- Check wikilink targets exist via `Glob`
- Confirm chronology against established lore
- Validate YAML syntax in frontmatter

## Directory Structure

```
content/
├── @Dario/                     # User workspace  
├── @claude/                    # AI collaboration space
├── Aelan World/                # Core world lore
│   ├── Artefatti/             # tags: artefatti
│   ├── Ere/                   # tags: era
│   ├── Fazioni/               # tags: fazioni
│   ├── Libri/                 # tags: libri
│   ├── Lore/                  # tags: lore
│   ├── Luoghi/                # tags: luoghi
│   └── Personaggi/            # tags: personaggi
├── Alba di Guerra/Sessioni/    # tags: sessioni/alba
└── Cronache di Aelan/Sessioni/ # tags: sessioni/cronache
```

## Publishing Rules

- Files in this repo are automatically published
- Exclude with: `-private.md` suffix or `@folder/` structure
- No `publish: true` frontmatter needed
- Use `.gitignore` patterns for private content

## Troubleshooting Technical Issues

When features don't work (images, builds, plugins), follow this systematic approach:

### 1. Read Configuration First
- **Always start**: `Read: quartz.config.ts` to understand current setup
- Check plugin configurations and their parameters
- Note baseUrl, ignorePatterns, and plugin order

### 2. Check Official Documentation
- Search Quartz docs: https://quartz.jzhao.xyz/
- Read plugin-specific pages (e.g., CrawlLinks, Assets)
- Use WebFetch on official docs before trying solutions

### 3. Inspect Build Output
- Check `public/` folder structure matches expectations
- Verify files are in expected locations with correct names
- Look for path transformations (e.g., spaces → hyphens)

### 4. One Targeted Fix
- Identify root cause from config/docs/output
- Make single, specific change based on understanding
- Avoid multiple trial-and-error attempts without verification

### Example: Image Display Issues
```bash
# Wrong: Try multiple markdown syntaxes randomly
# Right:
1. Read quartz.config.ts → find CrawlLinks markdownLinkResolution setting
2. Check CrawlLinks docs → understand "shortest" vs "relative" vs "absolute"
3. Check public/ → verify image paths match markdown references
4. Fix config or markdown to match expected resolution mode
```

## Error Recovery

### Frontmatter Errors
1. `Read` file to examine current state
2. Check required `tags` field present
3. Verify tag matches directory location
4. Use `Write` tool for complete frontmatter replacement

### Broken Wikilinks
1. `Glob: content/**/*target*.md` to find target
2. If no results: Create dangling link, report to user
3. If multiple: Choose non-private file in correct directory
4. Check target's `aliases` field via `Read`

### Timeline Inconsistencies
1. Accept user corrections without argument
2. Apply correct sequence immediately
3. Verify impact on related files
4. Update cross-references as needed

## Content Conventions

- Write in-world perspective (never mention "campaigns" or "sessions")
- Use evocative Italian: "una lama nascosta nel cuore", "tessere la sua tela"
- Lead character entries with most compelling trait, not chronology
- Group content thematically, not chronologically
- Hook readers immediately with significance to overall story