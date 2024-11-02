import { NoteHandlerSTO } from "./STCNotesHandler.js";
import { NotesTool } from "./NotesTool.js";
import { UI } from "./UI.js";


//Creo el array que va a contener las notas que me devuelva mi servidor 
let notes_array = [];

//Asigno a la variable element el elemento con id notas_contenedor de mi index.html
let element = document.getElementById("notas_contenedor");

// Funcion para convertir 'DD/MM/YYYY' a un objeto Date
function parseDate(dateString) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Los meses son 0-indexed en JavaScript
}

// Funcion para manejar la respuesta del servidor en caso de que todo salga correctamente
function processNotes(datosNotas) {
    notes_array = NotesTool.transformNotesJsonToArray(datosNotas);
    UI.draw(notes_array, element);
}
//Funcion para manejar la respuesta del servidor en caso de que algo vaya mal
function processErrorNotes(datosNotas) {
    UI.drawError(element);
}

//Obtengo los datos de mi servidor que esta en la ip: http://localhost:3000 haciendo uso de mi constante singleton NoteHandlerSTO
//Una vez cogida la instancia hago uso del metodo getAllNotes del objeto tipo NotesHandler que me devuelve mi getInstance
// Ademas le paso la referencia de las dos funciones que he creado anteriormente para manejar la respuesta que me de
NoteHandlerSTO.getInstance("http://localhost:3000").getAllNotes(processNotes, processErrorNotes);


/*Obtengo la instancia de mi elemento button del index.html con id button_filtrar y le añado  un eventlistener que funciona de 
manera que cuando el usuario clicke en filtrar se filtre el array que ya tenemos(notes_array) por la fecha de creacion de cada nota*/
document.getElementById("button_filtrar").addEventListener("click", (e) => {
    //Guardamos el valor que haya seleccionado en el input date dentro de la variable date_value
    let date_value = document.getElementById("date_filter").value; // Formato YYYY-MM-DD
    //Si no ha seleccionado ninguna fecha no hacemos nada
    if (date_value.length !== 0) {
        let date_filter = new Date(date_value); // Crea un objeto Date de la fecha seleccionada
        // Filtramos las notas
        let notes_filtered_bydate = notes_array.filter((note) => {
            // Convertimos la fecha de creación de la nota a un objeto Date
            let note_date = parseDate(note.fecha_creacion); /*Tenemos en cuenta  que note.fecha_creacion 
                                                            es un string en formato 'DD/MM/YYYY'*/
            // Comparamos solo las partes de la fecha (día, mes, año)
            return (
                note_date.getFullYear() === date_filter.getFullYear() &&
                note_date.getMonth() === date_filter.getMonth() &&
                note_date.getDate() === date_filter.getDate()
            );
        });
        //llamamos al metodo drawFilteredNotesByDate de mi clase UI para que pinte en el html lo que hyamos obtenido
        UI.drawFilteredNotesByDate(notes_filtered_bydate, element);
    }
});
