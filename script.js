// File: script.js

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");

// Barra del calendario
const datePicker = document.getElementById("date-picker");
const prevDayBtn = document.getElementById('prev-day');
const nextDayBtn = document.getElementById('next-day');


// Data di default (oggi)
let selectedDate = new Date().toISOString().slice(0, 10);
if (datePicker) {
    datePicker.value = selectedDate; // Imposta il valore del date picker alla data di oggi
}

// Cambia la data selezionata dal date picker
if (datePicker) {
    datePicker.addEventListener("change", function () {
        selectedDate = datePicker.value; // Aggiorna la data selezionata
        renderTasks();
    });
}

// Gestisci click sulle frecce
function shiftDay(delta) {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + delta);
    // Formatta di nuovo la data per l'input
    selectedDate = current.toISOString().slice(0, 10);
    datePicker.value = selectedDate;
    renderTasks();
}

if (prevDayBtn) {
    prevDayBtn.addEventListener('click', () => shiftDay(-1));
}
if (nextDayBtn) {
    nextDayBtn.addEventListener('click', () => shiftDay(1));
}

// Recupera la lista dal localStorage, se esiste
let tasks = []; // Array vuoto che rappresenta le tue attività

const savedTasks = localStorage.getItem("todoList"); // Recupera le attività salvate dal localStorage
if (savedTasks) { // Se ci sono attività salvate
    let parsed = JSON.parse(savedTasks);
    tasks = parsed.map(t => ({
        testo: t.testo,
        completata: t.completata || false,
        data: t.data || selectedDate
    }));

    // Ricrea la lista visiva
    renderTasks();
}

function addTaskToDOM(task) {
    const li = document.createElement("li"); // Crea un nuovo elemento <li>

    // Checkbox
    const checkbox = document.createElement("input"); // Crea una checkbox
    checkbox.type = "checkbox"; // Imposta il tipo di input a checkbox
    checkbox.checked = task.completata; // Imposta lo stato della checkbox in base all
    checkbox.className = "task-checkbox"; // Aggiunge una classe per lo stile
    li.appendChild(checkbox); // Aggiunge la checkbox all'elemento <li>

    // Testo task
    const span = document.createElement("span");
    span.textContent = task.testo;
    span.className = "task-text"; // Aggiunge una classe per lo stile
    if (task.completata) {
        span.style.textDecoration = "line-through"; // Se la task è completata, applica lo stile
        span.style.color = "#aaa"; // Cambia il colore del testo
    } else {
        span.style.textDecoration = "none";
        span.style.color = "#222";
    }
    li.appendChild(span);

    // Pulsante di menù
    const menuButton = document.createElement("span"); // Crea un pulsante di menù
    menuButton.className = "menu-button"; // Aggiunge una classe per lo stile
    menuButton.innerHTML = "&#x2022;&#x2022;&#x2022;"; // Aggiunge tre punti di menù
    li.appendChild(menuButton); // Aggiunge il pulsante di menù all'elemento <li>

    menuButton.addEventListener("click", function (event) {
        event.stopPropagation(); //Ferma la propagazione dell'evento e impedisce il click sul <li>

        // Se il menù è gia aperto, lo chiude
        const existingMenu = li.querySelector(".menu-options");
        if (existingMenu) {
            existingMenu.remove(); // Rimuove il menù esistente
            return; // Esce dalla funzione
        }

        // Crea il menù delle opzioni
        const menu = document.createElement("div"); // Crea un nuovo elemento <div> per il menù
        menu.className = "menu-options"; // Aggiunge una classe per lo stile

        // Modifica
        const editOption = document.createElement("div");
        editOption.textContent = "Modifica";
        editOption.className = "menu-item";
        editOption.addEventListener("click", function (e) {
            e.stopPropagation();
            menu.remove(); // Rimuove il menù dopo il click

            // UI per modifica
            li.innerHTML = "";
            li.appendChild(checkbox); // Riaggiunge la checkbox
            const editInput = document.createElement("input"); // Crea un campo di input per la modifica
            editInput.type = "text";
            editInput.value = task.testo;
            editInput.className = "edit-input"; // Aggiunge una classe per lo stile
            li.appendChild(editInput);

            const saveButton = document.createElement("button");
            saveButton.textContent = "Salva";
            saveButton.className = "save-button"; // Aggiunge una classe per lo stile
            li.appendChild(saveButton); // Aggiunge il pulsante di salvataggio
            // Mantiene il menù a tre pallini
            li.appendChild(menuButton);

            saveButton.addEventListener("click", function () {
                const newText = editInput.value.trim();
                if (newText !== '') {
                    task.testo = newText;
                    localStorage.setItem("todoList", JSON.stringify(tasks));
                    renderTasks(); // Rende di nuovo la lista
                }
            });
        });

        // Elimina
        const deleteOption = document.createElement("div");
        deleteOption.textContent = "Elimina";
        deleteOption.className = "menu-item";
        deleteOption.addEventListener("click", function (e) {
            e.stopPropagation();
            menu.remove();
            const index = tasks.indexOf(task);
            if (index > -1) {
                tasks.splice(index, 1);
                localStorage.setItem("todoList", JSON.stringify(tasks));
                renderTasks(); // Rende di nuovo la lista
            }
        });

        menu.appendChild(editOption);
        menu.appendChild(deleteOption);
        li.appendChild(menu);

        // Chiude il menù se si clicca fuori
        setTimeout(() => {
            document.addEventListener("click", function closeMenu(e) {
                if (!menu.contains(e.target) && e.target !== menuButton) {
                    menu.remove(); // Rimuove il menù se si clicca fuori
                    document.removeEventListener("click", closeMenu); // Rimuove l'event listener
                }
            });
        }, 0);
    });

    checkbox.addEventListener("change", function () {
        task.completata = checkbox.checked;
        localStorage.setItem("todoList", JSON.stringify(tasks)); // Aggiorna il localStorage
        renderTasks(); // Rende di nuovo la lista
    });

    if (task.completata) {
        completedList.appendChild(li); // Aggiunge l'elemento <li> alla lista completata
    } else {
        todoList.appendChild(li); // Aggiunge l'elemento <li> alla lista
    }
}

function renderTasks() {
    todoList.innerHTML = ""; // Pulisce la lista delle attività da completare
    completedList.innerHTML = ""; // Pulisce la lista delle attività completate

    const filteredTasks = tasks.filter(task => task.data === selectedDate);

    filteredTasks.forEach(task => addTaskToDOM(task)); // Rende di nuovo la lista
}

const toggleTodoBtn = document.getElementById("toggle-todo");
const toggleCompletedBtn = document.getElementById("toggle-completed");
const todoSection = document.getElementById("todo-section");
const completedSection = document.getElementById("completed-section");

toggleTodoBtn.addEventListener("click", function () {
    todoSection.classList.toggle("collapsed"); // Mostra o nasconde la sezione delle attività da completare
    todoList.style.display = todoSection.classList.contains("collapsed") ? "none" : "block"; // Nasconde o mostra la lista delle attività da completare
});

toggleCompletedBtn.addEventListener("click", function () {
    completedSection.classList.toggle("collapsed"); // Mostra o nasconde la sezione delle attività completate
    completedList.style.display = completedSection.classList.contains("collapsed") ? "none" : "block"; // Nasconde o mostra la lista delle attività completate
});

form.addEventListener("submit", function (event) {
    event.preventDefault(); // Evita il ricaricamento della pagina

    const taskText = input.value.trim(); // Prende il testo e toglie spazi ai lati
    if (taskText === '') return; // Se il testo è vuoto, non fare nulla (non aggiunge task vuote)

    const newTask = { testo: taskText, completata: false, data: selectedDate };
    tasks.push(newTask); // Aggiunge la nuova attività all'array
    localStorage.setItem("todoList", JSON.stringify(tasks)); // Salva l'array nel localStorage
    renderTasks();

    // Pulisce il campo di input
    input.value = ''; // Pulisce il campo di input dopo l'aggiunta

});