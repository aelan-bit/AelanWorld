import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// Helper function to strip wikilink brackets from values
function stripWikilinks(value: unknown): string {
  if (value === null || value === undefined) return ""
  const str = String(value)
  // Remove [[ and ]] brackets, also handle [[Link|Alias]] format
  return str.replace(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/g, "$1")
}

// Fields to exclude from display (internal/shown elsewhere)
const excludedFields = ["title", "aliases", "cssclasses", "publish", "draft", "sidebar_image"]

const FrontmatterDisplay: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter

  if (!frontmatter) {
    return null
  }

  // Get the primary tag (first tag) for the header
  const tags = frontmatter.tags as string[] | undefined
  const primaryTag = tags && tags.length > 0 ? tags[0] : null

  // Filter out excluded fields and tags (tags shown separately as header)
  const displayableEntries = Object.entries(frontmatter).filter(
    ([key]) => !excludedFields.includes(key) && key !== "tags"
  )

  // Don't show the box if there's nothing to display
  if (!primaryTag && displayableEntries.length === 0) {
    return null
  }

  return (
    <div class={classNames(displayClass, "frontmatter-display")}>
      {primaryTag && (
        <div class="frontmatter-type-header">
          {primaryTag.toUpperCase()}
        </div>
      )}
      {displayableEntries.map(([key, value]) => {
        // Handle arrays
        if (Array.isArray(value)) {
          const cleanedValues = value.map(v => stripWikilinks(v))
          return (
            <div class="frontmatter-item" key={key}>
              <span class="frontmatter-key">{key}:</span>
              <span class="frontmatter-value">{cleanedValues.join(", ")}</span>
            </div>
          )
        }

        // Handle single values
        const cleanedValue = stripWikilinks(value)
        if (!cleanedValue) return null

        return (
          <div class="frontmatter-item" key={key}>
            <span class="frontmatter-key">{key}:</span>
            <span class="frontmatter-value">{cleanedValue}</span>
          </div>
        )
      })}
    </div>
  )
}

FrontmatterDisplay.css = `
.frontmatter-display {
  background: var(--lightgray);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0 1rem 0;
  font-size: 0.9rem;
}

.frontmatter-type-header {
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  color: var(--secondary);
  margin-bottom: 0.5rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid var(--gray);
}

.frontmatter-item {
  display: flex;
  gap: 0.5rem;
  margin: 0.25rem 0;
  flex-wrap: wrap;
}

.frontmatter-key {
  color: var(--gray);
  font-weight: 600;
  text-transform: capitalize;
}

.frontmatter-value {
  color: var(--darkgray);
}

@media (max-width: 768px) {
  .frontmatter-display {
    padding: 0.5rem 0.75rem;
    font-size: 0.85rem;
  }
}
`

export default (() => FrontmatterDisplay) satisfies QuartzComponentConstructor
