//Creamos la clase Note que sera la clase modelo de cada nota.
export class Note{

    constructor(tipoNota,contenido,fecha_creacion){
        this._tipoNota = tipoNota;
        this._contenido = contenido;
        this._fecha_creacion = fecha_creacion;
    }

    get tipoNota(){
        return this._tipoNota;
    }

    get contenido(){
        return this._contenido;
    }

    get fecha_creacion(){
        return this._fecha_creacion;
    }


    toString(){
        return `tipo nota: ${this._tipoNota} contenido: ${this._contenido} fecha_creacion: ${this._fecha_creacion}`;
    }

}