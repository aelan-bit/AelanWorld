import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const SidebarImage: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter
  const sidebarImage = frontmatter?.sidebar_image

  // Only render if sidebar_image field is present
  if (!sidebarImage) {
    return null
  }

  return (
    <div class={classNames(displayClass, "sidebar-image-container")}>
      <img
        src={String(sidebarImage)}
        alt="Page illustration"
        class="sidebar-image"
      />
    </div>
  )
}

SidebarImage.css = `
.sidebar-image-container {
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.sidebar-image {
  width: 100%;
  height: auto;
  display: block;
  border: 2px solid var(--lightgray);
  border-radius: 8px;
}

@media (max-width: 768px) {
  .sidebar-image-container {
    margin-bottom: 0.75rem;
  }
}
`

export default (() => SidebarImage) satisfies QuartzComponentConstructor
