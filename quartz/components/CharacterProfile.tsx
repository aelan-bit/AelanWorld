import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const CharacterProfile: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter
  const tags = frontmatter?.tags || []
  
  // Only render for character pages
  if (!tags.includes("personaggio")) {
    return null
  }

  const schieramento = frontmatter?.schieramento
  const era = frontmatter?.era
  const fazioni = frontmatter?.fazioni
  const specie = frontmatter?.specie
  const campagna = frontmatter?.campagna

  return (
    <div class={classNames(displayClass, "character-profile")}>
      <div class="character-header">
        <span class="character-icon">👤</span>
        <span class="character-type">Personaggio</span>
      </div>
      
      <div class="character-details">
        {schieramento && (
          <div class="detail-item">
            <strong>Schieramento:</strong> <span class={`alignment-${String(schieramento)}`}>{String(schieramento)}</span>
          </div>
        )}
        
        {specie && (
          <div class="detail-item">
            <strong>Specie:</strong> <span>{String(specie)}</span>
          </div>
        )}
        
        {era && (
          <div class="detail-item">
            <strong>Era:</strong> <span>{String(era)}</span>
          </div>
        )}
        
        {campagna && (
          <div class="detail-item">
            <strong>Campagna:</strong> <span>{String(campagna)}</span>
          </div>
        )}
        
        {fazioni && Array.isArray(fazioni) && fazioni.length > 0 && (
          <div class="detail-item">
            <strong>Fazioni:</strong>
            <div class="factions-list">
              {fazioni.map((faction: string, index: number) => (
                <span key={index} class="faction-badge">{String(faction)}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

CharacterProfile.css = `
.character-profile {
  background: linear-gradient(135deg, #8B4513, #A0522D);
  border: 1px solid #D2691E;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.character-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #D2691E;
}

.character-icon {
  font-size: 1.5rem;
}

.character-type {
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.character-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item strong {
  color: #FFD700;
  font-size: 0.9rem;
}

.alignment-alleati {
  color: #90EE90;
  font-weight: bold;
}

.alignment-nemici {
  color: #FF6B6B;
  font-weight: bold;
}

.alignment-neutrali {
  color: #FFD700;
  font-weight: bold;
}

.factions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.faction-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .character-profile {
    padding: 1rem;
  }
  
  .character-header {
    font-size: 0.9rem;
  }
}
`

export default (() => CharacterProfile) satisfies QuartzComponentConstructor