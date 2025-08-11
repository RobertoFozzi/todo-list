# TO-DO List JS

Una semplice applicazione To-Do List realizzata con **HTML**, **CSS** e **JavaScript** vanilla.

## Funzionalità principali

- **Aggiunta di nuove attività**  
  Inserisci il testo e premi "Aggiungi" per creare una nuova task.
- **Eliminazione delle attività dalla lista**  
  Ogni task ha un pulsante "Elimina" per rimuoverla.
- **Modifica delle attività**  
  Puoi modificare il testo di una task tramite il menu a tre pallini.
- **Segna attività come completata**  
  Puoi selezionare la checkbox per marcare una task come completata: verrà spostata nella sezione "Attività completate".
- **Riduci/espandi le sezioni**  
  Puoi nascondere o mostrare le liste di attività da completare e completate cliccando sulla freccia accanto al titolo.
- **Persistenza delle attività**  
  Le tue attività vengono salvate nel browser tramite **localStorage**: anche chiudendo o ricaricando la pagina restano disponibili.
- **Interfaccia minimale e pulita**  
  Stile moderno con ombre, colori soft e transizioni CSS.
- **Design responsive**  
  Si adatta anche ai dispositivi mobili.

## Come usare

1. **Clona il repository** oppure scarica i file.
2. Apri `index.html` nel browser.
3. Inserisci una nuova attività nel campo di testo e premi "Aggiungi".
4. Modifica o cancella un’attività cliccando sul menu a tre pallini e selezionando l’opzione desiderata.
5. Spunta la checkbox per marcare una task come completata o incompiuta.
6. Riduci o espandi le sezioni cliccando sulla freccia accanto al titolo.
7. Le attività resteranno salvate anche chiudendo la pagina, grazie alla persistenza via localStorage.

## Struttura del progetto

```
.
├── index.html
├── style.css
├── script.js
├── .gitignore
└── README.md
```

## Gestione dei file da ignorare

Il progetto include un file **.gitignore** per evitare che file non necessari o sensibili vengano aggiunti alla repository (es. file di configurazione, cache, ecc.).

## Modifiche principali rispetto alla versione iniziale

- **Salvataggio delle attività**: Le task vengono ora salvate e caricate tramite localStorage.
- **Riorganizzazione del codice JS**: La logica di gestione delle attività è più chiara e riusabile (funzione `addTaskToDOM`).
- **Miglioramenti grafici CSS**: Ombre, effetti hover e responsive design.
- **Gestione file ignorati**: Aggiunto `.gitignore` per una corretta gestione dei file della repo.
- **Funzionalità completate/incompiute**: Possibilità di segnare le attività come completate, con spostamento automatico fra le sezioni.
- **Menu azioni sulle task**: Modifica ed eliminazione tramite menu a tre pallini.
- **Riduzione/espansione delle sezioni**: Le liste delle attività sono riducibili tramite toggle.

## Idee future

- Animazioni più avanzate e miglioramenti grafici
- Ordinamento delle attività (manuale o automatico)
- Filtri per attività completate/incompiute
- Supporto a sottoliste o categorie
- Sincronizzazione tra dispositivi o salvataggio su cloud

## Autore

Roberto Fozzi

---

Se hai suggerimenti o vuoi contribuire, apri una issue o un pull request!