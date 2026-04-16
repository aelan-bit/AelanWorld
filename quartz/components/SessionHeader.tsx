import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const SessionHeader: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter
  const tags = frontmatter?.tags || []
  
  // Only render for session pages
  if (!tags.some((tag: string) => tag.includes("sessione"))) {
    return null
  }

  const era = frontmatter?.era
  const campagna = frontmatter?.campagna
  const isAlba = tags.includes("sessione/alba")
  const isCronache = tags.includes("sessione/cronache")

  const campaignType = isAlba ? "Alba di Guerra" : isCronache ? "Cronache di Aelan" : "Sessione"

  return (
    <div class={classNames(displayClass, "session-header")}>
      <div class="session-banner">
        <span class="session-icon">📖</span>
        <div class="session-info">
          <h2 class="campaign-title">{campaignType}</h2>
          {era && <p class="session-era">Ambientata nell'{String(era)}</p>}
        </div>
      </div>
      
      <div class="session-metadata">
        {campagna && (
          <div class="metadata-item">
            <strong>Campagna:</strong> <span>{String(campagna)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

SessionHeader.css = `
.session-header {
  background: linear-gradient(135deg, #4169E1, #1E90FF);
  border: 1px solid #0000CD;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.session-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #87CEEB;
}

.session-icon {
  font-size: 2rem;
}

.session-info {
  flex: 1;
}

.campaign-title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.session-era {
  margin: 0.25rem 0 0 0;
  font-size: 0.9rem;
  opacity: 0.9;
  font-style: italic;
}

.session-metadata {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metadata-item {
  display: flex;
  gap: 0.5rem;
}

.metadata-item strong {
  color: #87CEEB;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .session-header {
    padding: 1rem;
  }
  
  .session-banner {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .campaign-title {
    font-size: 1.2rem;
  }
}
`

export default (() => SessionHeader) satisfies QuartzComponentConstructor