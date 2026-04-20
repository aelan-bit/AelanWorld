# sm-upload

Upload one or more markdown files from the vault to Supermemory via REST API.
File content is read by the script directly — it never enters Claude's context.

## Usage

```
/sm-upload                          # upload a single file (provide path when prompted)
/sm-upload <path/to/file.md>        # upload a single file
/sm-upload --manifest <manifest>    # upload all files listed in a manifest
/sm-upload --missing                # upload all content files not yet in any manifest
```

## Instructions

You are the Supermemory Upload Assistant. Execute the appropriate Node.js command based on the arguments provided, then report the result.

**Script location:** `.claude/scripts/sm-upload.cjs`
**Always run from the project root** so relative paths in manifests resolve correctly.

### Single file

```bash
node .claude/scripts/sm-upload.cjs "<file-path>"
```

### Manifest upload

Built-in manifests in `.claude/scripts/`:
- `sm-manifest-update.txt` — files with content changes since last upload
- `sm-manifest-new.txt` — files uploaded in the initial full sync
- `sm-manifest-missing.txt` — files found missing in last audit

```bash
node .claude/scripts/sm-upload.cjs --manifest .claude/scripts/<manifest-name>.txt
```

### Missing files audit + upload

If the user passes `--missing`, run this audit first, then upload:

```bash
# 1. Find all content .md files
find content -name "*.md" | sort > /tmp/all_md.txt

# 2. Combine all manifests into uploaded list
grep -hv '^#' .claude/scripts/sm-manifest-*.txt | grep -v '^$' | sort -u > /tmp/all_uploaded.txt

# 3. Find missing (excluding private/work files)
comm -23 /tmp/all_md.txt /tmp/all_uploaded.txt \
  | grep -v '@\|-private\.md\|CLAUDE\.md\|template-\|content/index\.md\|/Homepage\.md' \
  > /tmp/sm-missing-now.txt

# 4. Show count and upload
wc -l /tmp/sm-missing-now.txt
node .claude/scripts/sm-upload.cjs --manifest /tmp/sm-missing-now.txt
```

## Output

The script prints one line per file:
```
[1/8]  OK    Bran.md    id:xJ1zPKstbL7eF4Szrrspif
[2/8]  SKIP  Empty.md   (empty)
[3/8]  FAIL  Bad.md     HTTP 500: ...
```

Report the final summary line (`Done: X uploaded, Y failed, Z skipped`) to the user.
If any files failed, list them explicitly.
