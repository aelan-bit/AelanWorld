import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Element, Text } from "hast"

export interface DropCapOptions {
  // CSS class for the drop cap span
  className: string
}

const defaultOptions: DropCapOptions = {
  className: "drop-cap",
}

export const DropCap: QuartzTransformerPlugin<Partial<DropCapOptions>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "DropCap",
    htmlPlugins() {
      return [
        () => {
          return (tree, file) => {
            let foundFirstParagraph = false

            visit(tree, "element", (node: Element, index, parent) => {
              // Only process the first paragraph
              if (foundFirstParagraph) return
              if (node.tagName !== "p") return

              // Find the first text node in this paragraph
              const firstChild = node.children[0]
              if (!firstChild) return

              // Handle direct text content
              if (firstChild.type === "text" && firstChild.value.length > 0) {
                const text = firstChild as Text
                const firstLetter = text.value.charAt(0)
                const restOfText = text.value.slice(1)

                // Create the drop cap span
                const dropCapSpan: Element = {
                  type: "element",
                  tagName: "span",
                  properties: { className: [opts.className] },
                  children: [{ type: "text", value: firstLetter }],
                }

                // Replace the first child with the drop cap span and remaining text
                node.children.splice(0, 1, dropCapSpan, { type: "text", value: restOfText } as Text)
                foundFirstParagraph = true
                return
              }

              // Handle text inside an inline element (like <strong>, <em>, etc.)
              if (firstChild.type === "element") {
                const inlineElement = firstChild as Element
                const inlineFirstChild = inlineElement.children[0]

                if (inlineFirstChild && inlineFirstChild.type === "text" && inlineFirstChild.value.length > 0) {
                  const text = inlineFirstChild as Text
                  const firstLetter = text.value.charAt(0)
                  const restOfText = text.value.slice(1)

                  // Create the drop cap span
                  const dropCapSpan: Element = {
                    type: "element",
                    tagName: "span",
                    properties: { className: [opts.className] },
                    children: [{ type: "text", value: firstLetter }],
                  }

                  // Update the inline element's text
                  inlineElement.children[0] = { type: "text", value: restOfText } as Text

                  // Insert the drop cap before the inline element
                  node.children.unshift(dropCapSpan)
                  foundFirstParagraph = true
                  return
                }
              }
            })
          }
        },
      ]
    },
  }
}
