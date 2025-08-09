// File: script.js

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Recupera la lista dal localStorage, se esiste
let tasks = []; // Array vuoto che rappresenta le tue attività

const savedTasks = localStorage.getItem("todoList"); // Recupera le attività salvate dal localStorage
if (savedTasks) { // Se ci sono attività salvate
    let parsed = JSON.parse(savedTasks);
    tasks = parsed.map(t => typeof t === "string" ? { testo: t } : t ); // Assicura che ogni attività sia un oggetto

    // Ricrea la lista visiva
    tasks.forEach(function(task) { // Per ogni attività salvata, questa viene aggiunta alla lista visuale
        addTaskToDOM(task);
    });
}

function addTaskToDOM(task) {
    const li = document.createElement("li"); // Crea un nuovo elemento <li>
    li.textContent = task.testo; // Imposta il testo dell'elemento <li>

    // Pulsante di cancellazione
    const deleteButton = document.createElement("button"); // Crea un pulsante di cancellazione
    deleteButton.textContent = "Elimina"; // Imposta il testo del pulsante di cancellazione

    deleteButton.addEventListener("click", function() {
        li.remove(); // Rimuove l'elemento <li> dalla lista
        const index = tasks.indexOf(task); // Trova l'indice della task nell'array
        if (index > -1) {
            tasks.splice(index, 1); // Rimuove la task dall'array
            localStorage.setItem("todoList", JSON.stringify(tasks)); // Aggiorna il localStorage
        }
    });

    // Pulsante di modifica
    const editButton = document.createElement("button"); // Crea un pulsante di modifica
    editButton.textContent = "Modifica"; // Imposta il testo del pulsante di modifica

    editButton.addEventListener("click", function() {
        const editInput = document.createElement("input"); // Crea un campo di input per la modifica
        editInput.type = "text";
        editInput.value = task.testo; // Imposta il valore dell'input con il testo della task

        const saveButton = document.createElement("button");
        saveButton.textContent = "Salva"; // Crea un pulsante per salvare le modifiche

        saveButton.addEventListener("click", function() {
            const newText = editInput.value.trim(); // Prende il nuovo testo e toglie spazi ai lati
            if (newText !== '') {
                task.testo = newText; // Aggiorna il testo della task
                localStorage.setItem("todoList", JSON.stringify(tasks)); // Aggiorna il localStorage

                // Aggiorna localStorage
                li.textContent = newText;
                li.appendChild(editButton);
                li.appendChild(deleteButton);
            }
        });

        li.textContent = ''; // Pulisce il testo dell'elemento <li>
        li.appendChild(editInput); // Aggiunge il campo di input all'elemento
        li.appendChild(saveButton); // Aggiunge il pulsante di salvataggio all'elemento
    });
    li.appendChild(editButton);
    li.appendChild(deleteButton); // Aggiunge il pulsante di cancellazione all'elemento <li>
    list.appendChild(li); // Aggiunge l'elemento <li> alla lista
}

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita il ricaricamento della pagina

    const taskText = input.value.trim(); // Prende il testo e toglie spazi ai lati
    if (taskText === '') return; // Se il testo è vuoto, non fare nulla (non aggiunge task vuote)

    const newTask = { testo: taskText };
    tasks.push(newTask); // Aggiunge la nuova attività all'array
    localStorage.setItem("todoList", JSON.stringify(tasks)); // Salva l'array nel localStorage
    addTaskToDOM(newTask); // Aggiunge la nuova attività all'interfaccia utente

    // Pulisce il campo di input
    input.value = ''; // Pulisce il campo di input dopo l'aggiunta
    
})