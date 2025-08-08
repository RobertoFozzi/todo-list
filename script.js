// File: script.js

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

// Recupera la lista dal localStorage, se esiste
let tasks = []; // Array vuoto che rappresenta le tue attività

const savedTasks = localStorage.getItem("todoList"); // Recupera le attività salvate dal localStorage
if (savedTasks) { // Se ci sono attività salvate
    tasks = JSON.parse(savedTasks); // Recupera le attività salvate, trasformando la stringa in un array JavaScript

    // Ricrea la lista visiva
    tasks.forEach(function(taskText) { // Per ogni attività salvata, questa viene aggiunta alla lista visuale
        addTaskToDOM(taskText);
    });
}

function addTaskToDOM(taskText) {
    const li = document.createElement("li"); // Crea un nuovo elemento <li>
    li.textContent = taskText; // Imposta il testo dell'elemento <li>

    const deleteButton = document.createElement("button"); // Crea un pulsante di cancellazione
    deleteButton.textContent = "Elimina"; // Imposta il testo del pulsante di cancellazione

    deleteButton.addEventListener("click", function() {
        li.remove(); // Rimuove l'elemento <li> dalla lista
        const index = tasks.indexOf(taskText); // Trova l'indice della task nell'array
        if (index > -1) {
            tasks.splice(index, 1); // Rimuove la task dall'array
            localStorage.setItem("todoList", JSON.stringify(tasks)); // Aggiorna il localStorage
        }
    });

    li.appendChild(deleteButton); // Aggiunge il pulsante di cancellazione all'elemento <li>
    list.appendChild(li); // Aggiunge l'elemento <li> alla lista
}

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita il ricaricamento della pagina

    const taskText = input.value.trim(); // Prende il testo e toglie spazi ai lati
    if (taskText === '') return; // Se il testo è vuoto, non fare nulla (non aggiunge task vuote)

    tasks.push(taskText); // Aggiunge la nuova attività all'array
    localStorage.setItem("todoList", JSON.stringify(tasks)); // Salva l'array nel localStorage
    addTaskToDOM(taskText); // Aggiunge la nuova attività all'interfaccia utente

    // Pulisce il campo di input
    input.value = ''; // Pulisce il campo di input dopo l'aggiunta
    
})