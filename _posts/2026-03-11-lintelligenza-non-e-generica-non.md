---
title: L'intelligenza non è generica. Non lo è mai stata.
description: Un preprint di Goldfeder, Wyder, LeCun e Shwartz-Ziv propone di abbandonare
  il concetto di AGI e di costruire qualcosa di più onesto — e di più potente.
date: '2026-03-11 12:56:35 +0000'
source: substack
---

C'è un momento, nella storia di ogni grande idea scientifica, in cui la parola che la descrive comincia a fare più danni che bene. La flogisto era una teoria plausibile finché non lo era più. L'etere riempiva un vuoto concettuale finché Michelson e Morley non lo svuotarono di senso. Oggi, sostengono Judah Goldfeder, Philippe Wyder, Yann LeCun e Ravid Shwartz-Ziv in un preprint pubblicato il 27 febbraio 2026, sta accadendo qualcosa di simile con le tre lettere più inflazionate del momento: **AGI**.

Il preprint — dal titolo _AI Must Embrace Specialization via Superhuman Adaptable Intelligence_ — non è un manifesto contro l'intelligenza artificiale avanzata. È qualcosa di più preciso: un argomento per cui la cornice in cui stiamo pensando il futuro dell'AI è sbagliata fin dalle fondamenta, e per cui sostituirla con una più onesta non è solo un esercizio filosofico, ma una condizione necessaria per fare progressi reali.

#### Il problema non è l'ambizione. È la parola utilizzata.

"Generale" è una parola che sembra dire tutto e non dice niente. Quando Demis Hassabis afferma che il cervello umano è general nel senso di una macchina di Turing, e quando OpenAI usa general per descrivere sistemi che superano gli umani nelle mansioni economicamente rilevanti, stanno usando la stessa parola per indicare cose radicalmente diverse. Il risultato, documentano gli autori passando in rassegna le definizioni più diffuse in letteratura e nell'industria, è un dibattito in cui nessuno sta discutendo della stessa cosa — e tutti sono convinti di farlo.

La mossa più interessante del paper è questa: invece di proporre l'ennesima definizione di AGI, gli autori attaccano il problema a monte. Chiedono: l'intelligenza umana è davvero generale? La risposta è no — e la dimostrazione è più sobria di quanto ci si aspetti.

Magnus Carlsen è il più forte giocatore di scacchi che la specie umana abbia mai conosciuto. Eppure qualsiasi computer moderno di medio livello lo batte senza sforzo. Non perché Carlsen sia mediocre: è straordinario, al vertice assoluto di ciò che un essere umano può fare. È che gli umani, nel loro complesso, sono semplicemente scarsi a scacchi. Li troviamo difficili perché giocare a scacchi non ci ha mai aiutati a sopravvivere nella savana. La percezione delle nostre capacità — e dei nostri limiti — è distorta dal fatto che non riusciamo a vedere i nostri angoli ciechi. Sentiamo di essere generali perché non percepiamo quanto siamo specializzati.

Questo è il paradosso di Moravec applicato al piano concettuale: le cose che per noi sono facili — camminare, riconoscere un volto, capire un'ironia — sono enormemente difficili per i computer, e molto dispendiose da un punto di vista computazionale. Le cose che per noi sono difficili — giocare a scacchi, prevedere strutture proteiche, ottimizzare funzioni ad alta dimensionalità — sono spesso banali per le macchine. Non siamo generali: siamo specializzati per la sopravvivenza in un ambiente fisico e sociale specifico. L'illusione di generalità dipende dall'impossibilità di vedere ciò che non sappiamo fare.

#### Perché la specializzazione vince — e perché era ovvio che fosse così.

C'è un teorema, in machine learning, che i ricercatori conoscono da decenni e che viene regolarmente ignorato nelle conferenze stampa: il No Free Lunch. Vale la pena fermarvisi un momento, perché è il perno matematico dell'intero argomento.

Il teorema del _No Free Lunch_ dice, nella sua forma più diretta, che nessun algoritmo di apprendimento funziona meglio di tutti gli altri su ogni possibile problema. Se un sistema guadagna efficienza su un tipo di compito, la paga inevitabilmente da qualche altra parte. La risorsa — computazione, memoria, tempo — è finita. Distribuirla su un numero infinito di compiti diversi significa dedicarne una quota che tende a zero a ciascuno di essi. Pensatela così: immaginate di dover preparare cento esami contemporaneamente con lo stesso numero totale di ore di studio. La media potrebbe essere dignitosa, ma la profondità su ciascuna materia sarà necessariamente limitata. Un sistema che deve "sapere tutto" finisce per non eccellere in niente — non per pigrizia, ma per vincolo matematico.

AlphaFold è l'esempio che gli autori citano con ragione. Non è diventato il sistema più preciso al mondo per la predizione delle strutture proteiche perché era molto generale: è diventato il migliore perché era specificamente, ossessivamente ottimizzato per quel problema. Architettura, dati, funzione di costo — tutto concentrato su un obiettivo. Niente distrae. Niente deruba risorse computazionali per coprire anche la piegatura del bucato.

La battuta degli autori — the AI that folds our proteins should not be the AI that folds our laundry — non è soltanto spiritosa. È la versione compressa di un argomento che regge: un sistema costretto a fare entrambe le cose non eccelle in nessuna delle due, a meno che non recuperi la specializzazione internamente, attraverso routing o moduli dedicati. E a quel punto ha già ammesso che la generalità era una finzione architettonica.

C'è anche un fenomeno più sottile che entra in gioco quando si forza un sistema unico a gestire compiti molto diversi: il negative transfer. Quando due compiti richiedono rappresentazioni interne incompatibili o gradients che si contraddicono durante l'addestramento, impararne uno può attivamente peggiorare le prestazioni sull'altro. La generalità non è solo costosa: in certi casi è controproducente.

#### SAI: un nome diverso per un'idea più onesta.

La proposta degli autori si chiama _Superhuman Adaptable Intelligence_ — **SAI**. La definizione è questa: un sistema capace di adattarsi per superare gli umani in qualsiasi compito che gli umani sappiano fare, e capace di adattarsi anche a compiti al di fuori del dominio umano che abbiano utilità. Non è una definizione di ciò che un sistema sa fare: è una definizione di quanto velocemente impara a farlo. La metrica non è un catalogo di competenze; è la velocità di acquisizione di nuove abilità.

Questo spostamento — dalla performance all'adattamento — ha conseguenze pratiche immediate. Una valutazione basata sulla velocità di adattamento è misurabile, aggiornabile, e non richiede di stilare una lista sempre più lunga di benchmark da superare. È anche più onesta nei confronti di ciò che l'AI può realisticamente diventare: non un essere omnisciente, ma un sistema che apprende in modo straordinariamente efficiente ciò che serve.

Due architetture vengono indicate come percorsi plausibili verso SAI. La prima è il self-supervised learning — e vale la pena spiegare perché è rilevante qui.

Il self-supervised learning (SSL) è un approccio all'addestramento che non dipende da dataset etichettati su larga scala — cioè da enormi collezioni di dati in cui ogni esempio è stato annotato manualmente da esseri umani ("questo è un gatto", "questa è una radiografia con tumore"). Nell'SSL, il sistema impara a trovare struttura nei dati da solo, usando il dato stesso come segnale di supervisione: per esempio, imparando a predire la parte nascosta di un'immagine, o la parola mancante in una frase. Il risultato sorprendente — e ancora non completamente spiegato — è che sistemi addestrati in questo modo sviluppano rappresentazioni del mondo straordinariamente ricche e trasferibili. I modelli GPT, BERT e le loro evoluzioni sono tutti prodotti del self-supervised learning. Questa capacità di estrarre struttura generalizzabile da dati non etichettati è esattamente ciò che serve per un sistema che deve adattarsi rapidamente a nuovi compiti senza ricominciare da zero ogni volta.

La seconda architettura indicata sono i world models — rappresentazioni interne della dinamica del mondo che permettono a un sistema di simulare le conseguenze delle proprie azioni prima di compierle.

Un world model è, in sostanza, una mappa interna di come il mondo funziona — non una mappa statica, ma un modello dinamico che permette di fare previsioni: "se faccio questa azione in questo contesto, cosa succede dopo?" Gli esseri umani e gli animali ne fanno uso continuo: quando pianificate un percorso in una città che non conoscete bene, state simulando mentalmente le conseguenze di svoltare a destra o a sinistra, senza dover fare fisicamente entrambe le mosse. Un sistema AI dotato di un world model può fare la stessa cosa: pianificare, trasferire conoscenze acquisite in un contesto a un contesto nuovo, e adattarsi a situazioni mai viste senza dover essere riaddestraro da zero. È la differenza tra un sistema che ha memorizzato milioni di esempi specifici e uno che ha capito la struttura sottostante — e può quindi applicarla in modo flessibile.

Il punto non è che queste siano le uniche strade possibili verso SAI: gli autori sono espliciti nel rifiutare l'idea di un'architettura unica che risolva tutto. È che il concetto di SAI orienta naturalmente la ricerca verso sistemi che favoriscono l'adattamento rapido, piuttosto che verso modelli sempre più massicci addestrati a fare più cose contemporaneamente.

#### Cosa rimane in sospeso.

Il paper ha i suoi angoli non risolti, e gli autori lo ammettono. La definizione di SAI include i compiti "con utilità" al di fuori del dominio umano — ma cosa significa utilità? Chi la stabilisce? Gli autori dichiarano esplicitamente che questa domanda è ortogonale al loro argomento principale e la lasciano ad altri lavori. È una scelta difendibile, ma è anche il punto in cui un lettore attento potrebbe sollevare un'obiezione: spostare il problema dalla generality all'utility non lo dissolve, lo sposta.

Rimane anche la questione di quanto sia praticabile, nei fatti, smettere di parlare di AGI. Il termine è ormai incorporato in documenti legali, accordi commerciali, aspettative pubbliche. Ridefinire il bersaglio richiede non solo chiarezza concettuale, ma la capacità di riorientare una conversazione pubblica che si è sviluppata attorno a quella parola da decenni.

Eppure c'è qualcosa di intellettualmente salutare nell'operazione che questo preprint compie. Non è una critica al progresso dell'AI: è una critica alla qualità del pensiero con cui lo stiamo guidando. Se davvero vogliamo costruire sistemi che apprendano velocemente, che riempiano i vuoti dove gli umani sono sistematicamente limitati, che lavorino in modo complementare con noi piuttosto che in imitazione di noi — forse il primo passo è smettere di usare "noi" come unità di misura.

#### Bibliografia.

-   Goldfeder, J., Wyder, P., LeCun, Y., & Shwartz-Ziv, R. (2026). AI Must Embrace Specialization via Superhuman Adaptable Intelligence. arXiv:2602.23643v1 \[cs.AI\], 27 February 2026. (Preprint, non ancora peer-reviewed.) https://arxiv.org/abs/2602.23643
    
-   Chollet, F. (2019). On the Measure of Intelligence. arXiv:1911.01547 https://arxiv.org/abs/1911.01547
    
-   Jumper, J. et al. (2021). Highly accurate protein structure prediction with AlphaFold. Nature, 596, 583–589 https://www.nature.com/articles/s41586-021-03819-2
    
-   Wolpert, D. & Macready, W. (1997). No free lunch theorems for optimization. IEEE Transactions on Evolutionary Computation, 1(1), 67–82 https://ieeexplore.ieee.org/document/585893
    

© 2026 Angelo Varlotta — [CC BY-NC-ND 4.0](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.it) Condivisione libera con attribuzione. Uso commerciale e modifiche non autorizzati.

---

*Originally posted on [Draw an Owl 🦉](https://drawanowl.substack.com/p/lintelligenza-non-e-generica-non). Subscribe & Sustain on [Substack](https://drawanowl.substack.com/subscribe)!*
