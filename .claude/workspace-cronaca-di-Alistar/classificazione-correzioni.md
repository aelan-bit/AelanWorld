# Classificazione delle correzioni dell'autore

Confronto fra `capitolo-bozza.md` (prodotto degli agenti) e `human-finetune.md` (versione
dell'autore) su cinque capitoli: **4.07, 4.08, 4.09, 4.11, 4.12**.

**Avvertenza sulla 4.12.** La sua bozza non è un prodotto puro degli agenti: il rilancio di
`voce-di-alistar` portava già alcune scelte editoriali del coordinatore. Vedi
`4.12/NOTA-contaminazione.md`. La uso come conferma di tendenze già visibili altrove, non come
prova indipendente.

**Dato di partenza.** L'autore taglia, sistematicamente:

| Capitolo | Bozza | Finetune | Riduzione |
| --- | --- | --- | --- |
| 4.07 | 167 righe | 138 | −17% |
| 4.08 | 141 | 115 | −18% |
| 4.09 | 125 | 85 | **−32%** |
| 4.11 | 125 | 96 | −23% |
| 4.12 | 165 | 128 | −22% |

Il taglio non è uniforme: l'autore **toglie apparato e aggiunge materia**. Il capitolo si
accorcia mentre i fatti dentro aumentano.

---

# A. L'apparato del narratore

**Frequenza: tutti e cinque i capitoli. È la correzione più costosa e la più ripetuta.**

L'agente fa dichiarare ad Alistar come ha lavorato: quante volte ha chiesto, a quanti, in quali
anni, che cosa non ha potuto verificare, perché si rifiuta di inventare. L'autore taglia quasi
tutto.

Esempi tagliati:

- *"Fu la prima cosa che mi raccontarono di quel giorno, e la sola su cui tutti e cinque convennero senza che dovessi insistere"* → *"Fu la cosa che tutti e cinque mi descrissero di quel momento"* (4.09)
- *"Come sia avvenuto non me l'ha saputo dire nessuno: uno mi disse di essersi ritrovato in piedi senza ricordare di aver toccato terra, un altro cambiò discorso… Non lo inventerò per far quadrare una pagina"* → via del tutto (4.09)
- *"Lo chiesi a uno per volta, in anni diversi, e uno per volta mi risposero di no"* → via (4.09)
- *"Me lo hanno riferito in tre, separatamente, e tutti e tre abbassarono la voce… lo segnai a margine alla seconda deposizione, per accertarmi che la prima volta non l'avessi abbassata io"* → via (4.09)
- *"Questo nesso, avverto, l'ho ricostruito io; nessuno dei miei testimoni me l'ha dichiarato"* → via (4.08)
- *"Che chi legge questo diario non ne sappia nulla è responsabilità mia: quel passaggio dalla mia trascrizione della piazza è caduto, e andrà rimesso dov'era. Lo scrivo perché resti scritto che manca"* → via (4.08)
- *"Non sono uomo da mettere un nome sopra un buco perché il buco smetta di guardarmi"* → via (4.09)
- *"Qui mi fermo un momento, perché il punto vale più della riga che occupa"* → via (4.09)

**Che cosa sopravvive.** Non tutte. Restano le dichiarazioni che portano un **fatto** anziché un
metodo:

- *"Di quel colloquio non ho niente… nessuna delle due me ne ha mai detto una parola"* (4.12) — perché la scena non esiste, e la dichiarazione è l'unico modo di registrarlo
- *"Potrei riempire la riga. Tre nomi elfici si trovano. Ma un nome inventato per morto è un furto"* (4.07) — perché i tre morti senza nome sono un fatto del mondo
- *"Chi materialmente vi mise piede, e da quale porta, i miei testimoni non me l'hanno saputo dire"* (4.08)

**La regola che si ricava:** una dichiarazione di fonte è lecita quando **il buco è un fatto della
storia**. È da tagliare quando descrive la fatica del cronista.

---

# B. Il corpoverso isolato

**Frequenza: tutti e cinque.**

L'agente spezza in capoversi di una riga per ottenere ritmo. L'autore li rifonde in periodi
pieni. Non è una preferenza tipografica: il capoverso isolato **promuove a evento** una cosa che
nella scena è un passaggio.

- 4.07: tre capoversi separati (*"Si mossero i soldati imperiali"* / *"Ma prima di loro… aveva un filo d'acciaio sotto la gola"* / *"Gli era arrivato alle spalle"*) → due periodi
- 4.09: *"Alla strettoia un fantasma gli fu addosso."* + *"La decisione fu presa, e durò quanto un passo."* → un solo periodo dentro il racconto della ritirata
- 4.08: *"Convocò gli artigli."* isolato → inglobato con la ragione (*"Incerta sulla situazione, la Volpe convocò gli artigli"*)
- 4.09: *"Lo chiamò [[Cloppete]], e Cloppete venne."* → via

Restano isolati i capoversi che **sono** l'evento: *"Decisero di cercare la Collana"* (4.08),
*"Cambiò forma"* (4.11), *"Lo posò sul petto dell'hobgoblin"* (4.12).

---

# C. L'omissione promossa a stile

**Frequenza: 4.08, 4.09, 4.11. È il riflesso più caratteristico dell'agente.**

L'agente trasforma il non-sapere in figura retorica. L'autore racconta la cosa.

- *"Di come se ne occuparono non dirò: dovevano passare, e passarono"* → *"Dovevano respingerli, e lo fecero con efficienza in pochi colpi assestati, con molti anni di pratica alle spalle"* (4.09)
- *"Spiccava, e fu tutto ciò che fece. Non ci andarono. Non torna in queste carte"* → *"un albero rinsecchito che spiccava come un lugubre monito su ciò che attende chi poggia piede in quella palude"* (4.09)
- *"Quanti, nessuno ha saputo dirmelo, e chi c'era aveva altro da guardare"* → via (4.09)
- *"E veniamo alla cosa che non vi dirò"* → via (4.09)

**La regola:** quando una cosa non si sa, si scrive quello che si sa al suo posto. Il vuoto non è
un effetto.

---

# D. Jarvis: da aforista a strumento

**Frequenza: tutti e cinque. È la riscrittura più profonda e la più costante.**

L'agente scrive Jarvis come un malinconico che registra e si rifiuta di giudicare, con chiuse
epigrammatiche. L'autore lo rende **operativo**: misura, nomina, a volte è comico, a volte
approva, e non fa mai filosofia.

| Bozza dell'agente | Finetune dell'autore | Capitolo |
| --- | --- | --- |
| *"Della guardia non ho registrato lo spostamento. Ho registrato l'arrivo. / Resta una spiegazione sola. Era più veloce."* | *"Ulteriore presenza rilevata in ritardo. […] Registro l'evento come velocità inaudita"* | 4.07 |
| *"Conto le ventisette ore a ritroso da adesso. Nessuno me l'ha chiesto."* | *"Conto all'arrovescia per le ventisette ore avviato."* | 4.07 |
| *"Margine: non lo calcolo. / Hanno votato lo stesso."* | *"Margine di successo, effimero. / La maggioranza ha scelto sentimentalmente."* | 4.07 |
| *"Corpi che l'Impero riconosce come propri: non me lo dicono."* | *"Corpi che l'Impero riconosce come propri 5: Callen e Dusk non considerati rilevanti."* | 4.07 |
| *"Classifico l'evento come ossimoro. Correzione: non lo classifico, lo trascrivo."* | *"Osservazione: irraggiamento parzialmente inefficace. / Aggiorno la voce."* | 4.09 |
| tre blocchi con commento | un blocco, solo conteggio, **con il numero esatto dei nemici** che il blocco precedente dichiarava incalcolabile | 4.11 |
| *"Classifico la controproposta come richiesta di buona fede. Correzione: …"* | *"Ottimo utilizzo delle variabili per rendere l'avversario più maneggevole."* | 4.12 |
| — | **aggiunto**: *"Protocollo carrozzone avviato."* | 4.09 |

Tre cose che l'autore fa e l'agente non fa mai:

1. **Dà i numeri.** Dove l'agente scrive *"conteggio impossibile"*, l'autore conta.
2. **Usa Jarvis per il comico.** *"Protocollo carrozzone"* è l'unica battuta della 4.09.
3. **Gli fa approvare qualcuno.** Mai un giudizio morale, ma una valutazione tecnica sì.

E una che l'agente fa sempre e l'autore toglie: **`Classifico X. Correzione: Y`**. Tagliata in
4.09 e in 4.12. Era in `formule-spese` con un budget di una per capitolo; di fatto il budget è
zero salvo caso eccezionale.

---

# E. Fatti che solo l'autore ha

**Frequenza: tutti e cinque.** Non è un difetto degli agenti — è il limite della catena. Ma dice
dove le domande non hanno pescato.

- 4.07: il principe **riconosce gli abiti ufficiali di Doc**, medico da campo imperiale, altro emissario a Foltard oltre a Koi; *"non apparve offeso, forse sorpreso da quel nano che osava mettere in discussione l'Impero elfico"*; i corpi riconosciuti dall'Impero sono **cinque**, Callen e Dusk non rilevanti; Brambo rassicura pubblicamente la città che piani di difesa sono in moto
- 4.08: Icaro **arrossisce** quando Galion regala la miniatura con il suo volto, e si rifiuta di parlarne; *"a volte"* diventa **"spesso"**
- 4.09: il rientro nel corpo avviene **seguendo le istruzioni di Haldìr**
- 4.11: tutta la scena dello scioglimento del Mirror Image
- 4.12: **la resurrezione dell'hobgoblin**, scena intera, dimenticata in prima battuta

**Osservazione sul tipo.** Sono quasi tutti **moventi e reazioni**, non eventi: perché il principe
non si offende, che cosa riconosce, che cosa prova Icaro. Le domande della catena pescano bene gli
eventi e male le interiorità.

---

# F. Pathos al posto di procedura

**Frequenza: 4.07, 4.08, 4.09.**

Dove l'agente chiude con una constatazione, l'autore apre un'immagine.

- *"Erano di nuovo pesanti, ed era precisamente ciò che volevano."* → *"Erano di nuovo pesanti. Come le notizie che li avevano raggiunti da poco. Come il compito che si erano imposti. Come il limite di tempo che avevano a disposizione. Come i dubbi sulla loro alleata che caricavano i loro pensieri."* (4.09 — anafora su un aggettivo fisico che diventa morale)
- *"Nessuno dei cinque riconobbe nessuno."* → *"Nessuno dei cinque riconobbe i loro volti, volti di persone che un tempo qualcuno aveva forse amato, e che oggi nessuno ricorda."* (4.09)
- *"il silenzio si ruppe per chi lo sapeva"* → *"il silenzio si ruppe nei singhiozzi di coloro che sapevano"* (4.07)
- *"ferito nella mente"* → *"ferito nella mente, se ne usciva"* (4.09)

---

# G. Dettaglio sensoriale dove l'agente generalizza

**Frequenza: 4.08, 4.09.**

- *"La vista giungeva poco, del resto, perché i vapori fetidi stavano sull'acqua e non si alzavano."* → *"Vapori irritanti tagliavano corta la vista, emergevano dalle acque, costantemente, ma restavano bassi come se fossero troppo pesanti per essere trascinati via dall'aria stantia del luogo."* (4.09)
- *"i tetti si succedevano"* → *"i tetti si succedevano come sabbia che scorre in una clessidra"* (4.08)
- *"la palude si apriva"* → *"un'ampia ferita nel tessuto del Bosco di Liut"* (4.08)
- *"porte, mestoli, pentole, quello che si lascia in cucina quando si esce credendo di rientrare"* → *"porte, pentole, gioghi, bauli, tracce di una vita semplice che si supponeva sarebbe continuata"* (4.08)

Nota: l'autore **allunga** qui mentre accorcia altrove. Il budget di parole va speso sul mondo,
non sul metodo.

---

# H. Riordino causale

**Frequenza: 4.07, 4.09, 4.12.**

L'agente ordina per effetto retorico; l'autore ordina perché la causa preceda la conseguenza.

- 4.07: *"Ascoltata la notizia, fu Brambo a convincerlo: non lì, non su un palco"* spostato **prima** di *"Disse a tutti di riposare"*. Nella bozza il principe congedava la piazza e solo dopo si scopriva perché
- 4.07: la citazione dell'invito al giuramento spostata dalla sezione *I pari* alla fine di *Il riposo*, dove viene pronunciata
- 4.09: la sezione *Lo scontro indesiderato* dissolta: la decisione di ritirarsi entra in *La strettoia*, prima dell'attacco del fantasma
- 4.12: le due persuasioni separate (errore di sequenza a monte, non di resa)

---

# I. Lessico: il regolamento fuori, il mondo dentro

**Frequenza: 4.08, 4.11, 4.12.**

- *"Lanciò lo scrying Doc"* → *"Per una seconda volta quel giorno Doc lanciò il suo sguardo lontano"* (4.08)
- *"smoking bottle"* → *"Ampolla del Fumo Perenne"* (4.11)
- *"tana"* → *"covo"* (4.12)
- *"pareti di pura energia"* → *"pareti su pareti di pura potenza arcana"* (4.12)

Nessun termine di manuale, nessun anglicismo, nessun nome d'incantesimo.

---

# J. Il lettore sì, il cronista no

**Frequenza: 4.08, 4.12. Correzione in direzione opposta a tutte le altre: qui l'autore AGGIUNGE.**

Mentre taglia le dichiarazioni di metodo, l'autore **aggiunge apostrofi al lettore**:

- *"la colpa è di chi tiene le carte"* → *"la colpa è di questo bardo che a stento tiene a galla la testa in un mare di carte"* (4.08)
- *"Le ombre non hanno interesse a descrivere nel dettaglio a noi i loro metodi, **cari lettori**."* (4.08, aggiunto)
- *"come lo facesse non lo spiego, perché non lo so"* → *"come lo facesse non so spiegarvelo, **ma posso assicurarvi** che il potere necessario è assai raro e prodigioso, **cari lettori**"* (4.08)
- *"Non in senso figurato, **caro lettore**."* (4.12, aggiunto)

**La distinzione è precisa.** Alistar può rivolgersi al lettore, scusarsi, vantarsi, ammettere di
annaspare fra le carte. Non può **verbalizzare la propria procedura di verifica**. Il primo è
voce, il secondo è apparato.

---

# K. Il giudizio deve poggiare su un fatto

**Frequenza: 4.07, 4.08, 4.12.**

Le chiuse epigrammatiche non sono vietate: ne sopravvivono molte (*"Un generale che tace vale un
interrogatorio"*, *"Una pace di cui la città godeva da anni senza aver mai chiesto a chi la
dovessero"*). Cadono quelle costruite su una **simmetria formale** invece che su un dato.

Tagliate:
- *"Cinque persone dietro una collana, in una città che non sapeva né delle une né dell'altra."* (4.08)
- *"Di quel mattino, nelle mie carte, non c'è un'ora segnata: c'è una direzione."* (4.08)
- *"Era tutto ciò che avevano, mentre andavano: un'assenza che non si spiegava, un sospetto che veniva dagli appunti di Cassandra e non da loro…"* (4.08)
- *"[[Jarvis|Il libro che non abbellisce]] fu il solo, di tutti i presenti, a stare dentro quella nube e a uscirne con qualcosa di scritto."* (4.09)

Modificata invece di tagliata, e la modifica dice tutto:
- *"L'Impero fu misurato in piazza con un metro che non sapeva di essere sotto esame, e la misura non tornò."* → *"con un metro solamente di recente apparso nella storia di Aelan, e la misura non tornò"* (4.07). Il giudizio resta; l'arguzia sul metro inconsapevole va via, sostituita da un **dato storico**.

---

# Priorità

Ordinate per costo di correzione per l'autore, cioè per quanto spesso deve intervenire e quanto
testo deve rifare.

| | Categoria | Capitoli | Costo |
| --- | --- | --- | --- |
| 1 | **A** — apparato del narratore | 5/5 | altissimo: è il taglio più voluminoso in ogni capitolo |
| 2 | **D** — Jarvis aforista | 5/5 | alto: va riscritto ogni volta, blocco per blocco |
| 3 | **B** — capoverso isolato | 5/5 | medio-alto: diffuso, ma la correzione è meccanica |
| 4 | **C** — omissione promossa a stile | 3/5 | alto quando capita: richiede di inventare il contenuto mancante |
| 5 | **K** — giudizio senza fatto | 3/5 | medio |
| 6 | **F**+**G** — pathos e sensi | 3/5 | medio: l'autore aggiunge, non corregge |
| 7 | **H** — riordino causale | 3/5 | medio |
| 8 | **I** — lessico da manuale | 3/5 | basso: sostituzioni puntuali |
| 9 | **J** — apostrofi al lettore | 2/5 | basso, ma è l'unica categoria in cui l'agente fa *meno* del dovuto |
| 10 | **E** — fatti che solo l'autore ha | 5/5 | non imputabile agli agenti, ma indica che le domande pescano male le interiorità |

---

# Le tre cose che cambierei, se mi si chiedesse

Non le applico: le registro.

1. **`voce-di-alistar` ha una licenza troppo larga sull'apparato.** Il prompt dice "una o due
   dichiarazioni di fonte per capitolo"; di fatto l'agente ne produce da cinque a dieci, perché la
   dichiarazione di fonte è anche il modo più comodo di non decidere. Il criterio operativo
   dovrebbe essere: *una dichiarazione è lecita solo se il buco che nomina è un fatto della
   storia*.

2. **Jarvis ha bisogno di una specifica propria, separata dalla voce di Alistar.** Oggi è descritto
   dentro il prompt di `voce-di-alistar` come un registro sobrio, e l'agente lo interpreta come una
   voce letteraria. Dai cinque finetune si ricava un profilo diverso e coerente: misura, nomina,
   conta anche quando è difficile, non si rifiuta mai di calcolare, non fa aforismi, può essere
   comico e può approvare un'azione tecnica.

3. **Le domande di `inventario-e-domande` pescano eventi e non moventi.** Le cose che l'autore ha
   dovuto aggiungere in tutti e cinque i capitoli sono reazioni e ragioni, non azioni. Le domande
   aperte funzionano bene sulle scene; manca una classe di domande sul perché un personaggio non
   abbia reagito come ci si aspettava.
