#!/usr/bin/env bash
set -euo pipefail

# --- CONFIG ---
PRIVATE_DIR="/mnt/c/Users/dario/Documents/Hobby/DnD/Aelan"
PUBLIC_CONTENT_DIR="$PWD/content"

# 0) Reset public content (keep the folder itself)
mkdir -p "$PUBLIC_CONTENT_DIR"
find "$PUBLIC_CONTENT_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf {} +

echo "[1/4] Selecting markdown with publish: true…"
# Accept true or "true" and list *filenames only*
mapfile -t PUBLISHED_MD < <(rg -lU --glob '*.md' '^\s*publish:\s*(true|\"true\")\s*$' "$PRIVATE_DIR" \
  -g '!**/node_modules/**' -g '!**/.quartz-cache/**' -g '!**/.obsidian/**' -g '!**/.git/**' 2>/dev/null)
echo "  -> ${#PUBLISHED_MD[@]} files marked publish:true"

echo "[2/4] Adding anything under PublicExport/ (if exists)…"
if [ -d "$PRIVATE_DIR/PublicExport" ]; then
  mapfile -t FOLDER_MD < <(find "$PRIVATE_DIR/PublicExport" -type f -name '*.md')
else
  FOLDER_MD=()
fi

# Union + de-dup
ALL_MD=("${PUBLISHED_MD[@]}" "${FOLDER_MD[@]}")
readarray -t ALL_MD < <(printf "%s\n" "${ALL_MD[@]}" | awk 'NF && !seen[$0]++')

echo "  -> total selected: ${#ALL_MD[@]}"
printf '     e.g. %s\n' "${ALL_MD[@]:0:5}"

echo "[3/4] Copying selected notes to Quartz content/ (preserving tree)…"
for f in "${ALL_MD[@]}"; do
  [ -f "$f" ] || continue
  rel="${f#"$PRIVATE_DIR/"}"
  dest="$PUBLIC_CONTENT_DIR/$rel"
  mkdir -p "$(dirname "$dest")"
  rsync -a "$f" "$dest"
done

# Copy common asset folders if present
for assets in "attachments" "assets" "img" "images"; do
  if [ -d "$PRIVATE_DIR/$assets" ]; then
    mkdir -p "$PUBLIC_CONTENT_DIR/$assets"
    rsync -a --delete "$PRIVATE_DIR/$assets/" "$PUBLIC_CONTENT_DIR/$assets/"
  fi
done

echo "[4/4] Ensure a homepage (content/index.md)…"
if [ "${#ALL_MD[@]}" -gt 0 ]; then
  HOME_SOURCE=""
  # Prefer commonly named files first
  for f in "${ALL_MD[@]}"; do
    base="$(basename "$f")"
    if [ "$base" = "Home.md" ] || [ "$base" = "Homepage.md" ] || [ "$base" = "index.md" ]; then
      HOME_SOURCE="$f"; break
    fi
  done
  # Otherwise, the first file with homepage:true (accept true or "true")
  if [ -z "$HOME_SOURCE" ]; then
    mapfile -t HOMES < <(rg -lU '^\s*homepage:\s*(true|\"true\")\s*$' "${ALL_MD[@]}" 2>/dev/null || true)
    if [ "${#HOMES[@]}" -gt 0 ]; then HOME_SOURCE="${HOMES[0]}"; fi
  fi

  if [ -n "$HOME_SOURCE" ]; then
    rel="${HOME_SOURCE#"$PRIVATE_DIR/"}"
    src="$PUBLIC_CONTENT_DIR/$rel"
    mkdir -p "$PUBLIC_CONTENT_DIR"
    cp "$src" "$PUBLIC_CONTENT_DIR/index.md"
    echo "  -> Using $(basename "$rel") as homepage"
  else
    cat > "$PUBLIC_CONTENT_DIR/index.md" <<'EOT'
---
title: "Aelan — Campaign Hub"
description: "Player-facing notes."
---
Welcome. Browse the published notes via the graph or search.
EOT
    echo "  -> Generated a minimal homepage"
  fi
else
  # No selected notes; create a placeholder index
  cat > "$PUBLIC_CONTENT_DIR/index.md" <<'EOT'
---
title: "Aelan — Campaign Hub"
description: "No notes selected yet."
---
No notes have been marked `publish: true` yet. Add it to a note’s frontmatter and re-run sync.
EOT
  echo "  -> No notes selected; created placeholder homepage"
fi

echo "Done. Selected notes copied to: $PUBLIC_CONTENT_DIR"
