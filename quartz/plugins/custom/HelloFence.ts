// Importa il "tipo" del plugin Transformer definito da Quartz.
// Questo ci dà l'interfaccia corretta (nomi dei metodi, ecc.).
import { QuartzTransformerPlugin } from "../types"

// "visit" è un utility per camminare l'albero sintattico Markdown (mdast) di Remark.
// Ci permette di trovare e manipolare nodi (es. blocchi di codice, paragrafi, titoli).
import { visit } from "unist-util-visit"

// Tipi TypeScript per i nodi dell'AST Markdown (mdast).
// Root = radice del documento; Code = blocco di codice fenced ```; Paragraph/Text = nodi testuali.
import type { Root, Code, Paragraph, Text } from "mdast"

/**
 * HelloFence: trasforma i blocchi di codice con linguaggio "hello"
 *    ```hello
 *    Qualsiasi testo
 *    ```
 * in un semplice paragrafo "Hello fence says: Qualsiasi testo".
 *
 * È un *Transformer* Quartz perché agisce prima del rendering finale,
 * modificando il contenuto Markdown a livello di AST.
 */
export default function HelloFence(): QuartzTransformerPlugin<{}> {
  // Ritorniamo un oggetto che implementa l'interfaccia di un Transformer.
  return {
    // Nome (solo per debug/log, utile per capire la fase della pipeline)
    name: "HelloFence",

    // markdownPlugins(): qui inseriamo *plugin Remark* che operano sull’AST Markdown.
    // Quartz prenderà questi plugin e li monterà nella pipeline di trasformazione.
    markdownPlugins() {
      // Ritorniamo un array di plugin Remark.
      // Un plugin Remark è una funzione che ritorna una funzione (trasformatore) che riceve l'albero "tree".
      return [
        () => (tree: Root) => {
          // "visit" attraversa l'albero "tree" e chiama la callback per ogni nodo di tipo "code".
          visit(tree, "code", (node: Code, index, parent) => {
            // Guardie: se il nodo non ha un genitore o un indice, non possiamo rimpiazzarlo in sicurezza.
            if (parent == null || index == null) return

            // Filtra: ci interessano SOLO i blocchi ```hello ...```.
            // Se il fenced code ha una lingua diversa (es. ```js), ignoriamo.
            if (node.lang !== "hello") return

            // "value" è il contenuto testuale dentro il blocco ```hello ...```.
            // Trim per rimuovere spazi/righe vuote in eccesso.
            const content = (node.value ?? "").trim()

            // Costruiamo un nuovo nodo "paragraph" mdast, con dentro un singolo "text".
            // Questo sostituirà il blocco di codice.
            const para: Paragraph = {
              type: "paragraph",
              children: [
                { type: "text", value: `Hello fence says: ${content}` } as Text,
              ],
            }

            // Rimpiazza il nodo corrente (```hello```) con il paragrafo.
            // splice(index, 1, nuovoNodo): togli 1 elemento alla posizione "index" e inserisci "para".
            parent.children.splice(index, 1, para)
          })
        },
      ]
    },
  }
}
