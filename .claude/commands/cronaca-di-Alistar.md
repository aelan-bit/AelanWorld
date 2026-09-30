---
description: Trasforma gli appunti di una sessione di Cronache di Aelan in un capitolo delle carte di Sir Alistar Belmont, coordinando la catena di agenti che ricostruisce i fatti e poi li mette in voce
argument-hint: "[percorso file sessione, fra virgolette se contiene spazi]"
---

Coordini la catena che trasforma gli appunti grezzi della sessione `$1` in un capitolo delle **carte di [[Sir Alistar Belmont]]**.

**Tu non scrivi il capitolo.** Lanci gli agenti nell'ordine, porti le domande all'autore e ne riporti le risposte: i subagenti non dispongono di `AskUserQuestion` e non possono interpellarlo. Le istruzioni di scrittura stanno nei prompt degli agenti, non qui.

---

## La cornice, in breve

Alistar è un bardo e un nobile di [[Northbell]] che **non era presente** agli eventi della quarta stagione: sparì nella 3.25 e riemerse molto dopo, quando ogni cosa era conclusa. Interrogò i protagonisti uno per uno, e da quelle testimonianze e dal registro di [[Jarvis]] compose le carte.

Da qui le due libertà che il solo registro di Jarvis non aveva: il passato remoto, e la possibilità di raccontare scene che nessuno della squadra vide.

I tre vincoli che nessuna ragione di ritmo scavalca:

1. **Nessun fatto degli appunti si perde** per fare spazio a una cadenza. Quando il ritmo entra in conflitto con un fatto, il ritmo perde, sempre.
2. **Il testo fra virgolette non si tocca.** Nemmeno per correggerlo: in un capitolo *"la bambina di Lumor"* è diventata *"Lumenor"*, che è probabilmente la grafia giusta, e proprio per questo è il caso peggiore. Se una grafia sembra sbagliata, si conserva e si chiede.
3. **Il senno di poi è allusivo.** La campagna è in corso: Alistar può far pesare il futuro, mai nominarlo.

L'**intervista è la licenza permanente**: l'accesso a ciò che i personaggi pensarono non è un abuso, è il materiale. Quel che va tenuto visibile è il patto, con una o due dichiarazioni di fonte per capitolo, non ogni singola frase.

---

## La catena

Il principio è che **i fatti si fissano prima della voce**. Finché le due cose si facevano insieme, i fatti si perdevano mentre si cercava la cadenza.

Tutti i file di lavoro vanno in una cartella dedicata alla sessione, accanto agli appunti.

**0. L'elenco dei presenti.** Prima di ogni altra cosa, chiedi all'autore **chi c'era in quella sessione**: personaggi giocanti, comprimari, nemici, comparse. Gli appunti nominano chi agisce, non chi è presente, e un personaggio che non esiste ancora in nessun documento non lo troverà mai nessuna ricerca.

L'elenco serve due volte: disambigua gli appunti, dove un «lui» può essere chiunque, e dà al passo successivo i nomi su cui costruire le domande che fanno ricordare. Una guardia incappucciata comparsa alle spalle di un personaggio, con la spada alla gola e nessun incantesimo rilevabile, è arrivata a capitolo già scritto perché nessuno aveva chiesto chi ci fosse sul palco.

**1. Contesto.** `ricercatore-di-contesto` sugli appunti e sull'elenco dei presenti. Produce il dossier: dove si aggancia il capitolo precedente, chi sono le persone e i luoghi nominati, quali nomi non hanno scheda.

**2. Inventario e domande.** `inventario-e-domande` con appunti e dossier. Produce `inventario.md`, che è la lista di controllo di tutto il resto della catena, e `domande.md`.

**3. Prima fermata: le domande.** L'agente marca ogni domanda come **chiusa** o **aperta**, e i due tipi si portano in modo diverso.

Le **chiuse** vanno con `AskUserQuestion`, in gruppi di quattro al massimo, usando le opzioni che l'agente ha già preparato. Le **aperte** vanno in prosa, una o due per messaggio: servono a far raccontare una scena che gli appunti hanno schiacciato in un verbo, e un elenco di opzioni le ucciderebbe, perché offrirebbe una risposta plausibile al posto di quella vera. Chiedere *«quali guardie si mossero?»* con tre opzioni ha prodotto silenzio; la risposta, arrivata dopo che il capitolo era già scritto, era una guardia incappucciata che nessun documento nomina, comparsa alle spalle del chierico senza che nessuno la vedesse muoversi.

**Nessuna domanda si perde per strada.** Se non entra in un gruppo, va nel gruppo successivo. Prima di passare al punto 4, elenca all'autore quelle rimaste senza risposta e di' quale via prudente verrà presa: proseguire in silenzio su una domanda caduta è il modo più facile di mandare in stampa una lacuna.

Raccogli gli esiti in `risposte.md`. Sono fonte autorevole quanto gli appunti.

**4. Sequenza fattuale.** `cronista` con appunti, dossier, inventario e risposte. Produce la cronologia completa in prosa piana, senza voce narrativa, con i buchi marcati fra parentesi quadre.

**5. Prima verifica.** `verificatore` in **passaggio 1** sulla sequenza: completezza contro l'inventario, fatti aggiunti, battute, cronologia. Se i rilievi sono sostanziali, rimanda al `cronista` invece di rattoppare: è il punto in cui correggere costa meno.

**6. La voce.** `voce-di-alistar` con la sequenza verificata, il dossier e l'inventario — **non con gli appunti grezzi**: lavora su ciò che è già accertato, così non reintroduce errori risolti a monte. Produce il capitolo.

**7. Seconda verifica.** `verificatore` in **passaggio 2**, confrontando capitolo e sequenza. L'insieme dei fatti dev'essere identico: percezioni, gesti e commento del narratore sono aggiunte lecite, eventi e numeri no. Qui si intercettano anche le citazioni alterate, i riempimenti riusati e le frasi prive di senso compiuto.

**Se il verificatore trova frasi che non significano nulla, la bozza torna a `voce-di-alistar` con i suoi rilievi.** Non rattopparle tu: le toppe altrui in un testo di voce si vedono, e chi ha scritto la frase è l'unico che sappia che cosa voleva dire. Rilancia l'agente con il rapporto e i passaggi da rifare.

**8. Seconda fermata: l'autore.** Sottoponigli il capitolo. È lui l'autorità sulla voce, e le sue correzioni valgono più di qualunque controllo automatico. Le revisioni le applichi tu nella conversazione: non serve ripassare dagli agenti per ogni virgola.

**9. Archiviazione.** All'approvazione, chiedi conferma e archivia la coppia: gli appunti prendono il suffisso `-private`, il capitolo perde il `-bozza`. Poi aggiorna i due file della voce — le espressioni riuscite vanno in `.claude/workspace-cronaca-di-Alistar/formule-spese.md` se valgono solo per quella scena, in `.claude/workspace-cronaca-di-Alistar/formulario-di-alistar.md` come stampo con segnaposto se reggono riempite diversamente.

Quando un capitolo riesce particolarmente bene, invoca `analista-di-stile` per descriverne la poetica e archivia il risultato in `.claude/analisi-stile/`. È così che la voce cresce: per accumulo di testi riusciti, non per estrapolazione.

---

## I documenti della catena

| File | Che cosa contiene | Chi lo usa |
| --- | --- | --- |
| `.claude/agents/voce-di-alistar.md` | la voce, nel prompt | l'agente che scrive |
| `.claude/workspace-cronaca-di-Alistar/formulario-di-alistar.md` | gli stampi sintattici con i segnaposto | chi scrive, chi verifica |
| `.claude/workspace-cronaca-di-Alistar/formule-spese.md` | i riempimenti già usati, da non ripetere | chi scrive, chi verifica |
| `.claude/analisi-stile/` | le analisi dei capitoli approvati | chi aggiorna la voce |
| `content/Cronache di Aelan/Sessioni/` | le coppie appunti `-private` + capitolo | tutti |

**Chiedi sempre all'autore se il GM ha scritto inserti nuovi** in voce di Alistar prima della sessione. Ognuno vale più di qualsiasi inferenza, e va aggiunto al campione dentro `voce-di-alistar`.
