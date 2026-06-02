---
title: "Due mappe della stessa città"
description: "Come WARP cerca di unificare l'attività neuronale e l'identità genetica nell'intero cervello di un vertebrato."
pubDatetime: 2026-03-06T13:33:11.000Z
tags: []
draft: false
featured: false
---
_Come WARP cerca di unificare l'attività neuronale e l'identità genetica nell'intero cervello di un vertebrato._

C'è un problema che perseguita le neuroscienze da quando esiste la disciplina stessa. Non un problema tecnico, almeno non solo. È qualcosa di più sottile, quasi filosofico nella sua ostinazione: un neurone si attiva, e noi lo osserviamo. Ne registriamo il ritmo, ne mappiamo i vicini, ne seguiamo le connessioni attraverso un groviglio di tessuto. Ma raramente sappiamo che cosa sia, quel neurone — non davvero. Non sappiamo quali geni porta, quale identità molecolare gli conferisce il suo carattere peculiare, perché risponde alla luce e non al suono, perché appartiene a questo circuito e non a quello. L'attività è visibile. La molecola è invisibile. Per la maggior parte della storia delle neuroscienze, questi due mondi sono stati studiati separatamente, come due mappe della stessa città disegnate da persone che non si sono mai incontrate.

Il lavoro uscito su bioRxiv nel febbraio 2026, firmato da Marquez-Legorreta, Fleishman, Hesselink, Eddison e colleghi del Janelia Research Campus e del Donders Institute, è un tentativo di disegnare quelle mappe insieme. A scala di un cervello intero. Alla risoluzione di una singola cellula. In un animale vivo e in comportamento. La piattaforma che hanno costruito per farlo si chiama WARP, Whole-brain neuronal Activity and RNA Profiling. Ciò che produce è qualcosa di genuinamente nuovo: un dataset in cui ogni neurone ha un volto, una voce e un nome.

## L'animale nella macchina

L'animale in questione è il pesce zebra larvale, una creatura grande quanto un chicco di riso, trasparente, in vita da sei giorni. Il suo cervello contiene circa centomila neuroni. Quei neuroni sono densamente impaccati, separati da distanze misurate in micrometri, e la maggior parte può essere osservata simultaneamente con il microscopio giusto. Questo è il dono del pesce zebra alle neuroscienze: l'accessibilità. Puoi vedere quasi tutto in una volta.

L'esperimento WARP comincia con il pesce immerso in una minuscola camera di agarosio, paralizzato quanto basta per evitare gli artefatti da movimento, la coda collegata a elettrodi di aspirazione che catturano i segnali motori del nuoto fittizio, il sussurro elettrico di un movimento che non si realizza mai del tutto. Stimoli visivi vengono proiettati su un diffusore sottostante: moto in avanti, moto all'indietro, predatori in avvicinamento, lampi di luce e di buio. Il cervello del pesce risponde. I neuroni tremolano. Un microscopio a foglio di luce cattura quei tremori in tutto il cervello, due volumi al secondo, sotto forma di fluorescenza del calcio, una misura indiretta dell'attività elettrica così consolidata da essere diventata la valuta corrente delle neuroscienze di sistema.

Fin qui, territorio familiare. L'imaging del calcio a cervello intero nel pesce zebra era già stato fatto. Quello che WARP fa dopo è ciò che lo rende insolito.

## La mappa che segue

Dopo che l'imaging funzionale è completato, il pesce viene fissato, conservato chimicamente e inglobato in un idrogel che lo espande fisicamente fino a due volte le sue dimensioni originali. Questo passaggio di microscopia a espansione non è solo un trucco tecnico. È ciò che permette ai trascritti di RNA, le impronte molecolari dell'espressione genica, di essere visualizzati con una risoluzione sufficiente ad essere assegnati a singole cellule. Il cervello viene poi sottoposto a quattordici cicli di ibridazione fluorescente in situ, una tecnica chiamata EASI-FISH, in cui sonde colorate si legano a sequenze specifiche di mRNA, illuminando le cellule che le portano. Quarantuno geni vengono misurati in questo modo. Ogni ciclo viene acquisito, registrato rispetto al precedente, e il segnale accumulato.

Il problema che il team ha dovuto risolvere è quello che in informatica chiamano registrazione, e qui si presentava con una difficoltà quasi assurda. L'imaging funzionale, la scansione anatomica di riferimento e i quattordici cicli di EASI-FISH erano stati acquisiti in condizioni diverse, a risoluzioni diverse, con microscopi diversi, su tessuto che era stato fissato, dissezionato, espanso e distorto in modi molteplici. Allineare questi dataset così che la traccia di calcio di ogni neurone potesse essere collegata al suo profilo di espressione genica ha richiesto la costruzione di nuovi strumenti computazionali. Il team li ha costruiti, e li ha rilasciati come software open-source: BigStream per la registrazione volumetrica delle immagini, una versione distribuita di Cellpose per la segmentazione cellulare, Fishspot per il rilevamento dei trascritti di RNA, SpotDMix per l'assegnazione dei trascritti a nuclei densamente impaccati, e SegmentNMF per estrarre i segnali di calcio individuali da una fluorescenza sovrapposta. Ogni strumento ha risolto un problema che i metodi esistenti non potevano affrontare.

Il risultato è stato un dataset di densità straordinaria. Attraverso tre animali, più di 238.000 neuroni contenevano sia una traccia di attività funzionale sia profili di espressione genica per un massimo di 41 geni. Un numero tra le 200 e le 300 volte superiore a quello che i metodi precedenti avevano ottenuto in un singolo animale.

## Cosa rivela la mappa

Con questo dataset, il team ha potuto fare il tipo di domande che le neuroscienze pongono da tempo, ma a cui raramente si riesce a rispondere su larga scala. Quali neuroni rispondono a uno stimolo di minaccia visiva? Quali guidano il nuoto? Quali lo sopprimono? E, soprattutto: cosa sono, quei neuroni, sul piano molecolare? Quali geni portano?

Le risposte sono state specifiche in modi che il lavoro precedente raramente riusciva a raggiungere. Una popolazione di neuroni nel tetto ottico mesencefalico, la regione visiva del cervello medio, coesprimendo i geni _pou4f2_ e _cckb_ rispondeva selettivamente ai lampi scuri e agli stimoli di avvicinamento, le firme visive di un predatore in arrivo. Un gruppo di neuroni inibitori nel tronco encefalico caudale, identificati dalla loro espressione di _glyt2_ e _gfra1a_, si attivava in modo continuo durante il nuoto e sembrava fornire un feedback negativo una volta completato il movimento. Neuroni nel pallium dorsolaterale che coesprimono _eomesa_ e _pvalb7_, una regione proposta come omologo dell'ippocampo dei mammiferi, mostravano attività strutturata legata al compito, suggerendo che questo circuito ippocampale sia già funzionalmente attivo nella prima settimana di vita.

Nell'insieme del dataset, il team ha identificato oltre 2.000 sottopopolazioni neuronali distinte, ciascuna definita da una combinazione specifica di risposta funzionale, profilo di espressione genica e localizzazione anatomica. Non un catalogo nel senso riduttivo del termine, un elenco di parti senza storia. È piuttosto un'infrastruttura per porre domande meccanicistiche che prima non era possibile formulare. Se sai quali geni caratterizzano una popolazione di neuroni comportamentalmente rilevante, puoi costruire una linea transgenica che li bersaglia specificamente, perturbarli con la luce, e determinarne il ruolo causale. WARP trasforma una correlazione in una leva.

## Il principio dietro la mappa

Forse la scoperta concettualmente più interessante non è nessuna singola popolazione identificata, ma un principio generale che emerge dall'insieme del dataset. Il team ha chiesto se i neuroni che condividono l'espressione genica tendano anche a condividere i pattern di attività, se l'identità molecolare, in un senso statisticamente significativo, predica l'accoppiamento funzionale.

Per rispondere, hanno sviluppato una misura chiamata Local Correlation Difference, o LCD. Per ogni coppia di neuroni che esprime lo stesso gene, l'LCD confronta quanto sia correlata la loro attività con quanto uno di essi sia correlato con i neuroni vicini che non esprimono quel gene. È un modo di chiedersi: questo gene condiviso sta facendo qualcosa per il circuito, oppure la correlazione è semplicemente una conseguenza della vicinanza spaziale?

La risposta, per la maggior parte dei 39 geni analizzati, è stata che l'espressione genica condivisa predice davvero l'attività condivisa, al di là di quanto i soli effetti di vicinanza potrebbero spiegare. Questo valeva durante l'attività spontanea ed era ulteriormente amplificato durante la stimolazione visiva. Il principio non è assoluto, alcuni geni mostravano effetti deboli o nulli, e la relazione variava considerevolmente tra le regioni cerebrali, ma è abbastanza pervasivo da poter essere definito a scala cerebrale. È, nel linguaggio della discussione del paper, la prova che l'identità molecolare di una cellula vincola il suo ruolo funzionale. Il cervello non è organizzato dalla posizione soltanto. È organizzato, a un livello che attraversa quasi ogni regione, da ciò di cui sono fatte le sue cellule.

## Un orizzonte onesto

Sarebbe facile sopravvalutare uno studio come questo, vedere in esso la soluzione a un problema piuttosto che un modo particolarmente potente di avvicinarsi ad esso. Gli autori si guardano dall'eccedere. WARP misura al momento 41 geni; il genoma dei vertebrati ne contiene circa 20.000. La precisione della registrazione, per quanto notevole, circa l'80% di corrispondenza cellulare, non è perfetta. Gli animali hanno sei giorni, e i comportamenti studiati, ovvero nuoto, elaborazione visiva, passività indotta dalla futilità, sono relativamente semplici. Il divario tra un pesce zebra che risponde a un punto luminoso in avvicinamento e un essere umano che naviga un mondo sociale non viene colmato da questo paper.

Quello che WARP colma è un divario diverso, nei fatti è quello tra le due mappe che i neuroscienziati hanno disegnato separatamente per decenni. Non lo chiude del tutto. Ma rende il compito di chiuderlo immaginabile in un modo che prima non lo era. La piattaforma è open-access. I dati sono depositati in un repository pubblico. Il software è su GitHub. Altri ricercatori possono usarlo, estenderlo, applicarlo ad altre specie e ad altre domande. La mappa non è finita. Per la prima volta, però, è condivisa.

La domanda che rimane, e che forse dovrebbe rimanere, è questa: se l'identità molecolare plasma il ruolo funzionale in tutto il cervello, se ciò che un neurone è vincola ciò che fa, cosa significa per la nostra comprensione di come i circuiti neurali evolvono, si sviluppano e si rompono nella malattia? WARP non risponde a questa domanda. Ma è, silenziosamente, il tipo di risorsa da cui tali risposte potrebbero un giorno essere costruite.

**Per approfondire**

-   Marquez-Legorreta E, Fleishman GM, Hesselink LW, Eddison M, et al. (2026). Whole-Brain Co-Mapping of Gene Expression and Neuronal Activity at Cellular Resolution in Behaving Zebrafish. bioRxiv. https://doi.org/10.64898/2026.02.07.704095
    
-   Dataset open-access WARP: https://figshare.com/s/d1d19b105c4f74865c32
    
-   WARP GitHub (codice, BigStream, SpotDMix, SegmentNMF): https://github.com/zebrafish-WARP/WARP
    
-   Wang Y et al. (2021). EASI-FISH for thick tissue defines lateral hypothalamus spatio-molecular organization. Cell 184, 6361-6377.
    
-   Stringer C et al. (2021). Cellpose: a generalist algorithm for cellular segmentation. Nature Methods 18, 100-106.

---

*Originally posted on [Draw an Owl 🦉](https://drawanowl.substack.com/p/due-mappe-della-stessa-citta). Subscribe & Sustain on [Substack](https://drawanowl.substack.com/subscribe)!*
