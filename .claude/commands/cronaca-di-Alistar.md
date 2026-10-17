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

**6. La voce.** `voce-di-alistar` con la sequenza verificata, il dossier e l'inventario — **non con gli appunti grezzi**: lavora su ciò che è già accertato, così non reintroduce errori risolti a monte. Produce il capitolo, con dei segnaposto `<!-- JARVIS … -->` dove un blocco del registro ci sta.

**6bis. Il registro.** `voce-di-jarvis` sul capitolo e sulla sequenza. Sostituisce i segnaposto con i blocchi e non tocca nient'altro.

Serve un agente separato perché la voce di Jarvis ha regole proprie — misura sempre, non si rifiuta mai di calcolare, non fa aforismi — e chi scrive Alistar gli presta sistematicamente la propria: su cinque capitoli l'autore ha riscritto o tagliato ogni singolo blocco prodotto dentro `voce-di-alistar`. **I subagenti non possono invocarsi fra loro**, quindi questo passaggio lo lanci tu, come tutti gli altri.

**7. Seconda verifica.** `verificatore` in **passaggio 2**, confrontando capitolo e sequenza. L'insieme dei fatti dev'essere identico: percezioni, gesti e commento del narratore sono aggiunte lecite, eventi e numeri no. Qui si intercettano anche le citazioni alterate, i riempimenti riusati e le frasi prive di senso compiuto.

**Se il verificatore trova frasi che non significano nulla, la bozza torna a `voce-di-alistar` con i suoi rilievi.** Non rattopparle tu: le toppe altrui in un testo di voce si vedono, e chi ha scritto la frase è l'unico che sappia che cosa voleva dire. Rilancia l'agente con il rapporto e i passaggi da rifare.

**7bis. La tua revisione.** Scrivi `capitolo-revisione.md` accanto alla bozza, **senza toccare `capitolo-bozza.md`**.

Serve perché il verificatore controlla fatti e regole, e questo lo fa meglio di te; quello che non può fare è la passata di **registro e leggibilità**, che richiede giudizio. L'autore si aspetta di ricevere una revisione, non una bozza di agente: su sei capitoli ha sempre lavorato sulla tua.

**La bozza dell'agente non si tocca mai.** Né per applicare i rilievi del verificatore, né per correggere un refuso. È il prodotto puro della catena, e serve a misurare quanto gli agenti si avvicinano da soli al risultato voluto: se ci metti le mani, quel capitolo diventa inutilizzabile per capire come migliorarli. Nella 4.12 è successo, e la cartella porta un `NOTA-contaminazione.md` che lo dichiara. Vale anche per i **rilanci**: quando rimandi la bozza a `voce-di-alistar`, portagli **soltanto** i rilievi del verificatore e le correzioni di fatto dell'autore, mai le tue preferenze editoriali.

**Che cosa guardare, in ordine.**

**Le tre prove di lingua** che stanno in `agents/voce-di-alistar.md`: la prova della rilettura, il verbo invece del sostantivo astratto, il tetto di due *che* per periodo. Applicale tu stesso al testo finito, perché l'agente le applica male sulle proprie frasi.

**Il registro, e sono due.** Il capitolo ha due lingue che si alternano, e vanno lette separatamente perché l'errore più frequente è applicare a una la misura dell'altra.

**Dove compare il narratore, la prova è Manzoni.** Un uomo che ha delle carte, cita le proprie fonti, si rivolge al lettore con un vocativo, giudica di sbieco invece di sentenziare, e dichiara una lacuna anziché colmarla. Qui il periodo può essere ampio e il tono ironico. Il difetto da cercare è l'opposto: un narratore che diventa **revisore di sé stesso** — che racconta la propria procedura invece di consegnare un fatto.

**Dove corre la scena, la prova è Calvino.** Materia fantastica raccontata con periodi corti e chiari, da chi non si stupisce di niente. Nessuna nominalizzazione, nessuna relativa accumulata, nessun aggettivo di atmosfera. Il difetto da cercare è l'ampiezza manzoniana finita in mezzo all'azione: una subordinata incassata mentre qualcuno sta cadendo da un drago.

**I due scambi sbagliati, in concreto.** L'apparato del cronista portato dentro la scena — ed è il difetto che la 4.14 ha prodotto diciassette volte. E la secchezza della scena portata nella cornice, che rende Alistar un notaio: se un suo intervento potrebbe averlo scritto un cancelliere, hai sbagliato lì.

**E sotto entrambi, un difetto solo: la sintassi degli appunti passata in prosa senza essere alzata.** L'autore li scrive in fretta, in prima persona, al tavolo, e l'agente li copia credendo di conservare un fatto. Cerca gli italiani che l'autore userebbe parlando e Alistar no: *era messa male*, *alla bene e meglio*, *orroroso*, *a discapito della situazione*, *molto preoccupato*, *zompettare*. **Ma non toccare una sillaba di ciò che sta fra virgolette**, grafie comprese: lì il parlato è il fatto, e il registro basso è di chi parla.

**Il conto dell'apparato.** Contale. Il tetto è due, e l'agente ne produce da quattro a diciassette perché il tetto e l'obbligo di marcare i buchi si contraddicono. La conversione risolve quasi tutto: **sposta il soggetto dal cronista ai personaggi.** *«Non si sa chi fece la nuvola»* è apparato; *«nessuno dei quattro vide chi l'avesse chiamata»* è un fatto della scena.

**Le chiuse di sezione.** Lo stampo prevede che ogni sezione chiuda su una riga che riformula senza aggiungere. Cinque di fila diventano un tamburo: togli quelle che ripetono il capoverso sopra o che reggono solo per simmetria.

**I tuoi due riflessi, che conosci e che ti tornano comunque.** Trasformi l'omissione in figura retorica, dove l'autore racconta la cosa. E scrivi procedura dove lui scrive pathos. Cercali per nome.

**E un errore che hai già commesso riparando:** non aggiungere una dichiarazione di fonte per sistemare un problema di registro. È il modo in cui l'apparato cresce di nascosto.

**8. Seconda fermata: l'autore.** Sottoponigli il capitolo. È lui l'autorità sulla voce, e le sue correzioni valgono più di qualunque controllo automatico. Le revisioni le applichi tu nella conversazione: non serve ripassare dagli agenti per ogni virgola.

Quando l'autore consegna `human-finetune.md`, **fai il diff contro la tua revisione** e portagli: che cosa ha cambiato e perché secondo te, l'elenco dei refusi, e le frasi incomplete o ambigue da far confermare prima di correggerle.

**9. Archiviazione.** All'approvazione, chiedi conferma e archivia la coppia: gli appunti prendono il suffisso `-private`, il capitolo perde il `-bozza`. Poi aggiorna i due file della voce — le espressioni riuscite vanno in `.claude/workspace-cronaca-di-Alistar/formule-spese.md` se valgono solo per quella scena, in `.claude/workspace-cronaca-di-Alistar/formulario-di-alistar.md` come stampo con segnaposto se reggono riempite diversamente.

Quando un capitolo riesce particolarmente bene, invoca `analista-di-stile` per descriverne la poetica e archivia il risultato in `.claude/analisi-stile/`. È così che la voce cresce: per accumulo di testi riusciti, non per estrapolazione.

---

## I documenti della catena

| File | Che cosa contiene | Chi lo usa |
| --- | --- | --- |
| `.claude/agents/voce-di-alistar.md` | la voce, nel prompt | l'agente che scrive |
| `.claude/agents/voce-di-jarvis.md` | la voce del registro, nel prompt | l'agente che scrive i blocchi, chi verifica |
| `.claude/workspace-cronaca-di-Alistar/classificazione-correzioni.md` | le correzioni dell'autore sui primi cinque capitoli, per categoria | chi aggiorna gli agenti |
| `.claude/workspace-cronaca-di-Alistar/regole-ricavate.md` | le regole operative che ne derivano | chi aggiorna gli agenti |
| `.claude/workspace-cronaca-di-Alistar/formulario-di-alistar.md` | gli stampi sintattici con i segnaposto | chi scrive, chi verifica |
| `.claude/workspace-cronaca-di-Alistar/formule-spese.md` | i riempimenti già usati, da non ripetere | chi scrive, chi verifica |
| `.claude/analisi-stile/` | le analisi dei capitoli approvati | chi aggiorna la voce |
| `content/Cronache di Aelan/Sessioni/` | le coppie appunti `-private` + capitolo | tutti |

**Chiedi sempre all'autore se il GM ha scritto inserti nuovi** in voce di Alistar prima della sessione. Ognuno vale più di qualsiasi inferenza, e va aggiunto al campione dentro `voce-di-alistar`.
