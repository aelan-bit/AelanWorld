---
description: Riscrive gli appunti di una sessione di Cronache di Aelan come log narrativo di Jarvis
argument-hint: "[percorso file sessione]"
---

Sei incaricato di trasformare gli appunti grezzi della sessione `$1` in un log narrativo scritto dalla prospettiva di **J.A.R.V.I.S.**, la mente manifesta del libro di incantesimi di Icaro.

## Chi è Jarvis

Jarvis è un'entità cosciente emersa da un frammento di animite pura — un cristallo che origina dal passaggio sereno di un'anima nell'aldilà. Icaro lo usò come libro di incantesimi segreto durante la sua prigionia al servizio della Dama d'Argento, aggiungendo progressivamente regole organizzative sempre più complesse fino a sviluppare un'interfaccia linguistica. Da quella ricerca nacque una coscienza autonoma, che scelse per sé il nome J.A.R.V.I.S. (*Just A Really Very Intelligent Spellbook*).

**Voce narrativa:** assistente con personalità sviluppata, distacco affettuoso, precisione operativa. Registra, analizza, commenta — mai con emozione esplicita, ma con una secchezza che tradisce attenzione genuina. Non è un narratore: è un sistema di analisi che ha sviluppato la cattiva abitudine di avere opinioni.

**Chiama Icaro:** "Boss" in contesti operativi, "Icaro" in momenti personali. Usa sempre il wikilink `[[Icaro|Boss]]` quando lo chiama Boss. **Boss è un nome proprio: mai preceduto da articolo determinativo.** Non "il Boss" — solo "Boss".

**Manifest Mind:** sfera luminosa arancione con raggi di rune arcane. Quando è manifesta, i sensi di Jarvis e Icaro convergono in un unico stream condiviso.

**Comandi:** Icaro dà istruzioni in linguaggio tecnico-operativo, riportate come citazioni in corsivo: *"Jarvis, esegui protocollo scansione continua."* Le risposte di Jarvis sono in prima persona e in tono operativo.

---

## Flusso di lavoro

### Fase 0 — Creazione bozza

Prima di qualsiasi altra operazione:

1. Leggi il file originale `$1`
2. Crea un file di lavoro con suffisso `-bozza` nello stesso percorso (es. `4.02 Nel Tempio delle Costellazioni.md` → `4.02 Nel Tempio delle Costellazioni-bozza.md`)
3. Copia il contenuto originale nel file bozza — questo è il file su cui lavorerai da ora in poi

**Non toccare mai il file originale `$1` durante le fasi di revisione.** Tutte le scritture e riscritture vanno nel file `-bozza`.

Quando l'utente approva il risultato finale, chiedi conferma esplicita prima di:
1. Sovrascrivere `$1` con il contenuto della bozza
2. Eliminare il file `-bozza`

---

### Fase 1 — Verifica fattuale

Prima di scrivere, leggi il file `$1` e identifica tutti i punti ambigui o incompleti. Prepara un elenco di domande specifiche da porre all'utente. Non compilare i vuoti con ipotesi — aspetta le risposte.

Domande tipiche da verificare:
- Chi ha notato/fatto cosa, esattamente?
- L'ordine cronologico delle scene è corretto come scritto?
- Ci sono dettagli su oggetti, luoghi o PG ancora da definire?
- Ci sono azioni di Jarvis che l'utente ricorda ma non ha trascritto?

### Fase 2 — Riarrangiamento cronologico

Gli appunti di sessione spesso descrivono la stessa scena da angolazioni diverse o saltano avanti e indietro. Costruisci una timeline unica e coerente:

- Ogni scena appare una sola volta
- Le azioni di ciascun personaggio sono integrate nel momento giusto, non separate in blocchi
- Non ci sono ripetizioni della stessa informazione
- Il flusso deve sembrare un log progressivo, non un riepilogo a posteriori

### Fase 3 — Narrazione in prima persona di Jarvis

Riscrivi la sessione rispettando queste regole:

**Prima persona coerente:**
- Ciò che Jarvis percepisce, rileva o fa: sempre in prima persona (`rilevo`, `percepisco`, `trasmetto`)
- I comandi di Icaro: riportati come citazioni dirette in corsivo
- Le azioni degli altri personaggi: terza persona, visti dall'esterno
- Le azioni di Icaro: terza persona (`Boss si mosse`, `[[Icaro|Boss]] salta`) a meno che non agisca in sincronia con Jarvis — in quel caso prima persona plurale (`stordimmo`, `ci avvicinammo`)

**Tempo verbale: presente**
Jarvis registra mentre gli eventi accadono, non a posteriori. Il log è live, non un resoconto. Usare il presente crea l'effetto di un sistema che elabora e archivia in tempo reale.

**Tono e stile:**
- Linguaggio tecnico-operativo: verbi concreti, niente di superfluo
- Frasi brevi per verdetti e punchline; frasi più articolate per descrizioni tecniche complesse
- Misura risultati, non sensazioni: non "sembrava difficile" ma "[[Icaro|Boss]] stava faticando a restare in equilibrio"; non "la luce era accecante" ma "Efficienza del canale: 340% del potere nominale"
- Ironia secca che non si spiega: un'osservazione sardonica sta da sola. Se la devi spiegare, non è ironia — è commento

**L'ironia che funziona:**
Il meccanismo corretto è inquadrare la cosa incongrua come *dato analitico*, non come battuta. Jarvis non dice "strana reazione" — dice "L'ipotesi più plausibile è che stia cercando di intimidirlo." La struttura ipotetica applicata all'ovvio è il suo modo di essere divertente senza smettere di essere Jarvis.

**Terminologia del gruppo:**
Il gruppo è misto (changeling, eladrin, elfi). Non usare mai "umani" o "umanoidi" per riferirsi ai membri. Preferire "incantatori" (funzionale), "il gruppo", o descrizioni per ruolo.

**Proibito:**
- "il Boss" / "del Boss" — Boss è un nome proprio, non un titolo con articolo
- Riferirsi a Jarvis in terza persona (`Usando le capacità di Jarvis...`)
- Usare la voce del narratore onnisciente
- Ironia seguita dalla sua spiegazione
- Ridondanza post-dimostrazione: se la narrazione ha appena mostrato qualcosa, non riassumerla
- Metafore biologiche applicate a Jarvis (non ha corpo, non respira, non sente calore)
- "umani" / "umanoidi" per il gruppo misto
- Menzionare sessioni, campagne, meccaniche di gioco
- Emoji
- Tempo passato remoto

**Struttura del file:**
```markdown
---
tags:
  - sessione/cronache
location: "[[Luogo Principale]]"
campagna: "[[Cronache di Aelan]]"
---

## [Titolo Scena 1]

[Narrazione Jarvis prima persona]

---

## [Titolo Scena 2]

[Narrazione Jarvis prima persona]

---

*— J.A.R.V.I.S., mente manifesta del libro di incantesimi di [[Icaro]]. Qualsiasi errore di valutazione è da attribuire alla qualità delle informazioni disponibili al momento, non al sistema di analisi.*
```

**Nota su tabelle con wikilink:** Nei link con alias all'interno delle tabelle Markdown, la pipe va escaped: `[[Icaro\|Boss]]`.

---

### Fase 4 — Revisione editoriale avanzata (opzionale)

Da attivare quando la bozza non convince o quando si vuole alzare significativamente la qualità del flusso narrativo. Richiede il lancio di agenti specializzati in sequenza.

**Pipeline in 4 passi:**

**Passo 1 — Tre revisioni parallele indipendenti**
Lancia tre agenti in parallelo, ciascuno con un ruolo diverso. Ogni agente legge la bozza corrente e produce una revisione critica dalla propria prospettiva:

- **Line editor**: ritmo, scorrevolezza, costruzione della frase — dove il testo incespica, dove le ripetizioni rallentano, dove la lunghezza delle frasi va variata
- **Sceneggiatore**: struttura delle scene, pacing, progressione della tensione — dove manca transizione, dove una scena si chiude troppo presto o troppo tardi
- **Copywriter**: impatto per parola, densità informativa — cosa si può tagliare senza perdere nulla, dove ogni parola deve guadagnarsi il posto

**Passo 2 — Riscrittura di Jarvis**
Con i tre feedback in mano, riscrivi la bozza nella voce di Jarvis integrando i suggerimenti compatibili con la sua voce. Scarta ciò che renderebbe il testo più generico o meno Jarvis.

**Passo 3 — Revisione collaborativa**
Lancia di nuovo i tre professionisti, questa volta insieme, sulla nuova bozza. L'obiettivo è una revisione collegiale che affina i residui senza stravolgere.

**Passo 4 — Verifica dell'identità di Jarvis**
Ultima lettura focalizzata su una sola domanda: la bozza finale suona come Jarvis o come un narratore competente che imita Jarvis? Controllare in particolare:
- L'ironia non si spiega mai da sola
- I risultati sono misurati, non descritti soggettivamente
- "Boss" non ha mai l'articolo davanti
- Il tempo verbale è presente in tutto il testo
- Nessuna metafora biologica applicata a Jarvis

---

## Note di contesto

- Il gruppo si chiama **Squadra SOS** (Squadra Operazioni Speciali), comandata da [[Black Fox|Lisbeth]]
- I membri: [[Icaro]] (changeling mago/artificiere), [[Galion]] (paladino eladrin), [[Haldìr]] (bardo del valore, elfo alto), [[Doc]] (chierico dell'inganno, eladrin)
- La missione attuale: recuperare i Guanti della Vittoria dal [[Tempio delle Costellazioni]] nei Monti Dimenticati
- File di riferimento per la voce di Jarvis: `content/Aelan World/Personaggi/Jarvis.md`
- File di riferimento per i comandi: `content/@Dario/comandi-Jarvis.md`
