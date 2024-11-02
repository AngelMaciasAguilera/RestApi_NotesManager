//Creamos la clase NotesHandler la cual se encargara de administrar lo que nos devuelva el servidor 
export class NotesHandler {
    //Le pasamos la url donde esta nuestro servidor alojado, en mi caso http://localhost:3000
    constructor(url) {
        this._url = url;
    }

    /*Este metodo lo utilizaremos para obtener todas las notas que nos devuelva el servidor, ademas le damos la libertad al usuario
    de que nos pase la referencia a dos funciones, para que sea el el que administre como quiera la respuesta del servidor*/ 
    getAllNotes(onSuccesCallback, onErrorCallback) {
        fetch(this._url).then(
            (responseNotas) => {
                //Convertimos la respuesta del servidor(objeto response) a formato json 
                responseNotas.json().then(
                    (datosNotas) => {
                        onSuccesCallback(datosNotas);
                    },
                    (datosNotas) => {
                        onErrorCallback(datosNotas);
                    }
                );
            },
            (responseErrorNotas) =>{
                //En caso de que la url no sea la correcta devolvemos la respuesta que nos de el servidor
                return responseErrorNotas
            }
        );
        
    }

}