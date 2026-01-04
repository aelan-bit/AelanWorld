import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArtifactProfile: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter
  const tags = frontmatter?.tags || []
  
  // Only render for artifact pages
  if (!tags.includes("artefatti")) {
    return null
  }

  const era = frontmatter?.era
  const fazioni = frontmatter?.fazioni
  const proprietario = frontmatter?.proprietario
  const potere = frontmatter?.potere
  const origine = frontmatter?.origine

  return (
    <div class={classNames(displayClass, "artifact-profile")}>
      <div class="artifact-header">
        <span class="artifact-icon">⚔️</span>
        <span class="artifact-type">Artefatto Magico</span>
      </div>
      
      <div class="artifact-details">
        {proprietario && (
          <div class="detail-item">
            <strong>Proprietario:</strong> <span>{proprietario}</span>
          </div>
        )}
        
        {origine && (
          <div class="detail-item">
            <strong>Origine:</strong> <span>{origine}</span>
          </div>
        )}
        
        {era && (
          <div class="detail-item">
            <strong>Era:</strong> <span>{era}</span>
          </div>
        )}
        
        {potere && (
          <div class="detail-item">
            <strong>Potere:</strong> <span>{potere}</span>
          </div>
        )}
        
        {fazioni && Array.isArray(fazioni) && fazioni.length > 0 && (
          <div class="detail-item">
            <strong>Fazioni Collegate:</strong>
            <div class="factions-list">
              {fazioni.map((faction: string, index: number) => (
                <span key={index} class="faction-badge">{faction}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

ArtifactProfile.css = `
.artifact-profile {
  background: linear-gradient(135deg, #FFD700, #FFA500);
  border: 1px solid #FF8C00;
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem 0;
  color: #2c1810;
  box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.artifact-profile::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shimmer 3s infinite;
  pointer-events: none;
}

@keyframes shimmer {
  0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
  100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
}

.artifact-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #FF8C00;
}

.artifact-icon {
  font-size: 1.5rem;
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.3));
}

.artifact-type {
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.artifact-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  z-index: 1;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.detail-item strong {
  color: #8B4513;
  font-size: 0.9rem;
  font-weight: bold;
}

.factions-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.faction-badge {
  background: rgba(139, 69, 19, 0.2);
  color: #654321;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  border: 1px solid rgba(139, 69, 19, 0.4);
  font-weight: bold;
}

@media (max-width: 768px) {
  .artifact-profile {
    padding: 1rem;
  }
  
  .artifact-header {
    font-size: 0.9rem;
  }
}
`

export default (() => ArtifactProfile) satisfies QuartzComponentConstructor