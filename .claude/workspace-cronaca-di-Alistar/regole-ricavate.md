# Regole ricavate dal corpus

Da `classificazione-correzioni.md`. Ogni regola è scritta per andare in un prompt: una **prova**
decidibile mentre si scrive, che cosa fare quando la prova fallisce, e l'esempio reale.

Nessuna di queste è ancora applicata agli agenti.

---

## 1. L'apparato del narratore — in `voce-di-alistar`

**La prova.** Di ogni frase in cui Alistar parla del proprio lavoro, chiediti: *se la cancello,
perdo un fatto del mondo o perdo soltanto la fatica di chi scrive?*

Se perdi un fatto del mondo, la frase resta. Se perdi la fatica, la frase va via — anche se è
bella, anche se è vera.

**Il criterio in forma positiva.** Una dichiarazione di fonte è lecita quando **nomina un vuoto
che resta aperto nella storia**: una scena che nessuno ha raccontato, tre morti di cui non esiste
il nome, una stanza in cui non si sa chi entrò. Quel vuoto è materia narrativa e qualcuno, nella
storia, vorrebbe colmarlo.

**Il tetto: due per capitolo.** Non "una o due", che l'agente ha letto come un invito: **due, e il
secondo va giustificato con sé stessi.** Nei cinque capitoli approvati non ce ne sono mai più di
tre, e la bozza ne produceva da cinque a dieci.

**Mosse vietate, per nome.** Non scrivere:

- quante volte hai chiesto, o a quante persone, o in quanti anni diversi
- che i testimoni abbassavano la voce, cambiavano discorso o non ti guardavano
- di aver segnato qualcosa a margine, confrontato due deposizioni, riletto le tue carte
- che ti rifiuti di inventare. **Il rifiuto si esercita tacendo, non si annuncia.**
- che un passaggio è caduto da un capitolo precedente e andrà rimesso
- di aver ricostruito tu un nesso che i testimoni non ti hanno dichiarato

**L'esempio.** Tagliato dall'autore: *"Me lo hanno riferito in tre, separatamente, e tutti e tre
abbassarono la voce mentre lo dicevano, anni dopo, in una stanza asciutta; lo segnai a margine
alla seconda deposizione, per accertarmi che la prima volta non l'avessi abbassata io."* Quel che
resta dopo il taglio è *"Su questi non morse."*, e basta.

Conservato dall'autore: *"Di quel colloquio non ho niente. […] nessuna delle due me ne ha mai
detto una parola."* Qui il vuoto è una scena che non esiste.

---

## 2. Jarvis — specifica propria, da scorporare da `voce-di-alistar`

Oggi Jarvis è descritto dentro la voce di Alistar come "un registro sobrio", e l'agente lo
interpreta come una voce letteraria. Dai cinque finetune si ricava un profilo diverso e costante.

**Che cos'è.** Uno strumento che compila voci di registro. Non un personaggio che medita, non un
coro, non un contrappunto malinconico.

**Misura.** Se la sequenza contiene una quantità, Jarvis la dà. *"Conteggio esatto: 2 koboldi
alati, 2 bugbear, 2 hobgoblin, 1 artiglio"* al posto di *"conteggio impossibile, il perimetro non
si chiude"*. Può dichiarare un dato non disponibile solo quando **l'indisponibilità ha una causa
tecnica nominabile**: *"Durata della transizione: non misurabile, non ho uno strumento puntato."*

**Non si rifiuta mai di calcolare.** *"Margine: non lo calcolo"* è diventato *"Margine di
successo, effimero"*. Il rifiuto di calcolare è una posa, e la posa non è di Jarvis.

**Vietato: `Classifico X. Correzione: Y`.** Zero per capitolo, non una. L'autore l'ha tagliata
tutte le volte che l'ha trovata — 4.09 e 4.12 — e in `formule-spese` il budget dichiarato di una
per capitolo è smentito dai fatti.

**Vietata la terzina anaforica come pathos.** *"Nessuna evocazione. Nessuna trasmutazione. Nessuna
traccia di incantesimo di alcun genere"* regge perché è un elenco di strumenti negativi; non regge
se l'ultimo membro sposta il referente sugli esseri umani per fare un effetto.

**Vietata la chiusa aforistica.** *"Hanno votato lo stesso."* / *"Nessuno me l'ha chiesto."* /
*"Resta una spiegazione sola. Era più veloce."* Tutte tagliate. Al loro posto una constatazione
operativa: *"Conto all'arrovescia per le ventisette ore avviato."*

**Può fare il comico, e in un modo solo:** dando un nome burocratico a una cosa indecorosa.
*"Protocollo carrozzone avviato"* per cinque persone trascinate su dischi fluttuanti. È l'unica
battuta della 4.09 e l'ha scritta l'autore.

**Può approvare, e in un modo solo:** valutando la tecnica del proprio mago. *"Ottimo utilizzo
delle variabili per rendere l'avversario più maneggevole."* Mai un giudizio morale.

**Può giudicare gli umani, ma come inefficienza, non come moralità.** *"La maggioranza ha scelto
sentimentalmente."* È una voce di registro, non un rimprovero.

**Registro.** Nominale, telegrafico, etichetta più due punti più valore. Le righe sono **voci**,
non frasi. Un blocco per capitolo, tre al massimo se ciascuno misura qualcosa di diverso.

---

## 3. L'omissione promossa a stile — in `voce-di-alistar` e nel passaggio 2 del `verificatore`

**La prova.** Quando la sequenza marca `[non accertato]`, chiediti: *sto scrivendo quello che si
sa, o sto facendo una figura col fatto che non si sa?*

**Che cosa fare.** Scrivi quello che si sa e fermati. Il vuoto non si decora.

**Costruzioni vietate, da cercare alla lettera in verifica:**

- *"Di come … non dirò"*
- *"la cosa che non vi dirò"*
- *"Non torna in queste carte"*
- *"e fu tutto ciò che fece"*
- *"Quanti, nessuno ha saputo dirmelo"*

**L'esempio.** *"Di come se ne occuparono non dirò: dovevano passare, e passarono"* è diventato
*"Dovevano respingerli, e lo fecero con efficienza in pochi colpi assestati, con molti anni di
pratica alle spalle."* L'autore non sapeva più di quanto sapesse l'agente: ha scritto quello che
si ricava da gente addestrata che respinge dei fantasmi.

---

## 4. Il capoverso isolato — in `voce-di-alistar`

**La prova.** *Se attacco questo capoverso al precedente, perdo un fatto?*

Se non perdi niente, attaccalo. Il capoverso di una riga **promuove a evento** ciò che contiene:
usato su un passaggio, mente al lettore sul peso di quel passaggio.

**Quando è lecito:** per un fatto che cambia lo stato della scena. *"Cambiò forma."* /
*"Decisero di cercare la Collana."* / *"Lo posò sul petto dell'hobgoblin."* / *"Non la prese."*

**Quando non lo è:** per un gesto dentro una sequenza d'azione, per un'informazione di contesto,
per una frase di collegamento, e **mai tre o quattro di fila** — che è la cosa che l'agente fa e
che l'autore rifonde ogni volta.

**L'esempio.** Bozza: *"Si mossero i soldati imperiali, con le spade già fuori dai foderi."* +
*"Ma prima di loro […] Doc aveva un filo d'acciaio sotto la gola."* + *"Gli era arrivato alle
spalle."* Tre capoversi. L'autore li fonde in due periodi, e il filo d'acciaio arriva dentro lo
stesso respiro della scorta che si muove.

---

## 5. Il giudizio deve poggiare su un dato — in `voce-di-alistar`

**La prova.** Della tua chiusa epigrammatica chiediti: *regge per un dato che sta nella sequenza,
o regge per la simmetria delle parole?*

Se regge per la simmetria, va via. Le chiuse non sono vietate: ne sopravvivono molte.

**Esempi tagliati**, tutti costruiti su un parallelismo:
- *"Cinque persone dietro una collana, in una città che non sapeva né delle une né dell'altra."*
- *"Di quel mattino, nelle mie carte, non c'è un'ora segnata: c'è una direzione."*

**Esempi conservati**, tutti con un fatto dentro:
- *"Un generale che tace vale un interrogatorio. Si erano appena accorti di non poterlo fare."*
- *"Una pace di cui la città godeva da anni senza aver mai chiesto a chi la dovessero."*

**Il caso che chiarisce la regola.** *"L'Impero fu misurato in piazza con un metro che non sapeva
di essere sotto esame"* → *"con un metro solamente di recente apparso nella storia di Aelan"*.
L'autore non ha tolto il giudizio: ha tolto l'arguzia e ci ha messo un dato storico.

---

## 6. Dove si spendono le parole — in `voce-di-alistar`

**La regola di bilancio.** Le parole risparmiate sull'apparato si spendono sul mondo. Il capitolo
finito è più corto della bozza **e contiene più cose**.

**Il minimo per scena:** un dato fisico che un corpo potrebbe sentire — peso, odore, temperatura,
suono, sapore — preso dalla sequenza o dal dossier.

**Quando la sequenza ha un aggettivo nudo, aprilo in meccanismo.** Non *"i vapori fetidi stavano
sull'acqua e non si alzavano"*, ma *"Vapori irritanti tagliavano corta la vista, emergevano dalle
acque, costantemente, ma restavano bassi come se fossero troppo pesanti per essere trascinati via
dall'aria stantia del luogo."* Non è più informazione: è la stessa informazione con dentro il
perché.

**Quando un aggettivo fisico può diventare morale, lascia che lo diventi.** *"Erano di nuovo
pesanti, ed era precisamente ciò che volevano"* → *"Erano di nuovo pesanti. Come le notizie che li
avevano raggiunti da poco. Come il compito che si erano imposti. Come il limite di tempo che
avevano a disposizione. Come i dubbi sulla loro alleata che caricavano i loro pensieri."*

---

## 7. L'ordine è causale, non retorico — in `cronista` e in `voce-di-alistar`

**La regola.** Dentro una sezione, **la ragione precede l'azione che spiega**. Non si riporta una
decisione prima di ciò che l'ha resa necessaria, né un ordine prima dell'informazione che l'ha
provocato.

**L'esempio.** Nella bozza il principe congeda la piazza (*"Disse a tutti di riposare"*) e solo
dopo si scopre che Brambo lo aveva convinto a spostarsi. L'autore ha invertito: prima la notizia e
la persuasione, poi il congedo. Lo stesso per la citazione dell'invito al giuramento, spostata
dalla sezione in cui era commentata a quella in cui viene pronunciata.

**Corollario per il `cronista`.** Un fatto che viene dalle risposte e non dagli appunti va
collocato **dove la catena causale lo richiede**, non in coda alla sezione in cui è stato
raccontato.

---

## 8. Il lessico è del mondo, non del tavolo — in `voce-di-alistar` e in verifica

**Vietati:** nomi d'incantesimo, termini di regolamento, anglicismi, nomi d'oggetto non tradotti.

**Si traducono in gesto o in effetto:**
- *"Lanciò lo scrying"* → *"lanciò il suo sguardo lontano"*
- *"smoking bottle"* → *"Ampolla del Fumo Perenne"*
- *misty step* → *"il passo velato del suo popolo"*
- *"pareti di pura energia"* → *"pareti su pareti di pura potenza arcana"*

**Nota:** *zona di verità* e *aura di verità* l'autore le usa, perché sono descrizioni e non nomi
di scheda. Il discrimine non è l'origine della parola, è se suona come una voce di manuale.

---

## 9. Il lettore sì, la procedura no — in `voce-di-alistar`

**L'unica regola in cui l'agente deve fare di più, non di meno.**

Alistar si rivolge ai lettori, e lo fa spesso. Può chiamarli, scusarsi con loro, vantarsi,
ammettere di essere un bardo che annaspa. Quello che non può è **verbalizzare la propria procedura
di verifica** (regola 1).

**Aggiunte dall'autore:**
- *"la colpa è di chi tiene le carte"* → *"la colpa è di questo bardo che a stento tiene a galla la testa in un mare di carte"*
- *"Le ombre non hanno interesse a descrivere nel dettaglio a noi i loro metodi, cari lettori."*
- *"come lo facesse non lo spiego, perché non lo so"* → *"come lo facesse non so spiegarvelo, ma posso assicurarvi che il potere necessario è assai raro e prodigioso, cari lettori"*
- *"Non in senso figurato, caro lettore."*

**Il minimo:** un apostrofe diretta al lettore per capitolo. **La differenza da tenere in testa:**
*"cari lettori, non ve lo saprei spiegare"* è voce; *"ho chiesto a tre testimoni e nessuno ha
saputo dirmelo"* è apparato.

---

## 10. Le domande sui moventi — in `inventario-e-domande`

**Il dato.** In tutti e cinque i capitoli le cose che l'autore ha dovuto aggiungere sono
**reazioni e ragioni**, non azioni: perché il principe non si offese, che cosa riconobbe negli
abiti di Doc, che Icaro arrossì e si rifiuta di parlarne, perché il gruppo seguì le istruzioni di
Haldìr per rientrare nel corpo. Le domande esistenti pescano bene gli eventi e male le
interiorità.

**La classe di domande da aggiungere.** Per ogni punto in cui un personaggio **non** reagisce come
ci si aspetterebbe, chiedere perché. In particolare:

- qualcuno subisce un affronto e non reagisce → *perché non reagì?*
- qualcuno fa una richiesta e non insiste quando gli viene negata → *perché lasciò cadere?*
- qualcuno ha l'autorità per pretendere e non pretende → *che cosa lo trattenne?*
- qualcuno riceve un dono, una notizia o un'offesa personale → *che cosa provò, e lo disse?*

**E una domanda fissa sui comprimari con autorità:** *che cosa riconobbe, di loro?* Nella 4.07 la
risposta era che il principe riconosceva gli abiti ufficiali di un medico da campo imperiale — un
fatto che ricolloca tutta la scena e che nessuna domanda sugli eventi avrebbe mai fatto emergere.

---

## Dove va ciascuna regola

| Regola | File |
| --- | --- |
| 1 apparato, tetto e mosse vietate | `agents/voce-di-alistar.md` + riscontro in `verificatore` passaggio 2 |
| 2 Jarvis | **nuova sezione propria**, scorporata dentro `voce-di-alistar.md` |
| 3 omissione promossa a stile | `voce-di-alistar.md` + lista di stringhe da cercare in `verificatore` |
| 4 capoverso isolato | `voce-di-alistar.md` |
| 5 giudizio con dato | `voce-di-alistar.md` + prova in `verificatore` |
| 6 bilancio delle parole | `voce-di-alistar.md` |
| 7 ordine causale | `cronista.md` e `voce-di-alistar.md` |
| 8 lessico | `voce-di-alistar.md` + lista in `verificatore` |
| 9 apostrofi al lettore | `voce-di-alistar.md` |
| 10 domande sui moventi | `inventario-e-domande.md` |
