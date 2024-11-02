import { NotesHandler } from "./NotesHandler.js";
//Esta constante seguira el patron singleton para que nadie pueda estar creando conexiones de manera indefinida al servidor,
// De esta manera cada vez que un cliente se conecte a mi servidor lo tendra que hacer mediante la constante NoteHandlerSTO
export const NoteHandlerSTO = {
    notesHandler :null,//Este es el objeto de tipo Notes Handler que permitira acceder al metodo getAllNotes 
    //Aqui lo que hacemos es obtener la instancia de NotesHandler pasandole la url que le pasen al metodo como parametro
    getInstance(url){
        if(NoteHandlerSTO.notesHandler === null){//Compruebo que este a null ya que 
                                                // si esta instanciado no es necesario volverlo a instanciar
           NoteHandlerSTO.notesHandler = new NotesHandler(url);//Instancio el objeto notesHandler que esta dentro de la constante NoteHandlerSTO
        }
        //Devuelvo el objeto instanciado
        return NoteHandlerSTO.notesHandler;
    }


}   