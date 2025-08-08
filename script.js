console.log("JS collegato correttamente");

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Evita il ricaricamento della pagina

    const taskText = input.value.trim(); // Prende il testo e toglie spazi ai lati
    if (taskText === '') return; // Se il testo è vuoto, non fare nulla (non aggiunge task vuote)

    // Crea un nuovo elemento <li>
    const li = document.createElement("li"); // Crea un nuovo elemento <li>
    li.textContent = taskText; // Imposta il testo dell'elemento <li>

    // Crea un pulsante di cancellazione
    const deleteButton = document.createElement("button"); // Crea un pulsante di cancellazione
    deleteButton.textContent = "Elimina"; // Imposta il testo del pulsante

    // Aggiungi l'evento click al pulsante di cancellazione
    deleteButton.addEventListener("click", function() { // Aggiunge un evento click al pulsante
        li.remove(); // Rimuove l'elemento <li> dalla lista quando il pulsante viene cliccato

    });

    //Inserisce il pulsante di cancellazione nell'elemento <li>
    li.appendChild(deleteButton); // Aggiunge il pulsante di cancellazione all'elemento <li>

    // Aggiunge l'elemento <li> alla lista
    list.appendChild(li);

    // Pulisce il campo di inputù
    input.value = ''; // Pulisce il campo di input dopo l'aggiunta
    
})