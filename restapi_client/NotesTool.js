import { Note } from "./Note.js";
//Esta clase tendra utilidades y herramientas que vaya necesitando nuestro programa y de esa manera evitar la repeticion de codigo
export class NotesTool{
    //Este metodo transforma el json que nos devuelve el metodo getAllNotes a un array limpio con las notas de la base de datos
    static transformNotesJsonToArray(datosNotas){
        let notes = [];//Creo el array auxiliar notes
        datosNotas.forEach(element => {//lo recorro mediante un foreach
            notes.push(new Note(element.tipoNota, element.contenido,element.fecha_creacion));//lo inserto en mi array notes
        });
        return notes;//Devuelvo el array auxiliar
    }
}