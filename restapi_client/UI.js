// Creo la constante ui que tendra los metodos para manejar el apartado grafico de las notas y mostrarlas 
export const UI = {
    //Muestra las notas  que obtenga del servidor en el elemento que se le pase
    draw(notes, elementDiv) {
        notes.forEach(element => {
            let divNote = document.createElement("div");
            if (element.tipoNota === "critica") {
                divNote.classList.add("critic-note")
            } else {
                divNote.classList.add("note")
            }
            let contenidoNotaP = document.createElement("p")
            contenidoNotaP.textContent = element.contenido
            let fechaCreacionP = document.createElement("p")
            fechaCreacionP.textContent = element.fecha_creacion

            divNote.appendChild(contenidoNotaP)
            divNote.appendChild(fechaCreacionP)

            elementDiv.appendChild(divNote)

        });
    },
    //Muestra una nota de error en el elemento que se le pase
    drawError(elementDiv) {
        let divError = document.createElement("div");
        divError.classList.add("note-error");
        let pError = document.createElement("p");
        pError.textContent = "No hemos podido obtener correctamente los datos solicitados";
        divError.appendChild(pError)
        elementDiv.appendChild(divError)
    },


    //Muestra las notas filtradas sobreescribiendo las que ya habia y agregando ademas un boton para que el usuario vuelva a ver todas 
    //las notas si lo desea, se le pasa el array con las notas filtradas y el elemnto donde queramos ponerlo
    drawFilteredNotesByDate(notes_filtered, elementDiv) {
        // Limpiar el contenido de elementDiv
        elementDiv.innerHTML = '';
    
        // Reemplazar el contenido con las notas filtradas
        notes_filtered.forEach(element => {
            // Crear la estructura HTML para cada nota
            let divNote = `<div class="${element.tipoNota === "critica" ? "critic-note" : "note"}">`;
            divNote += `<p>${element.contenido}</p>`;
            divNote += `<p>${element.fecha_creacion}</p>`;
            divNote += `</div>`;
    
            // Añadir la nota al elemento contenedor
            elementDiv.innerHTML += divNote;
        });
    
        // Añadir un botón para recargar la página
        const reloadButton = document.createElement("button");
        reloadButton.textContent = "Ver todas las notas";
        reloadButton.className = "reload-button"; // Añade una clase para estilos
    
        // Evento para recargar la página
        reloadButton.addEventListener("click", () => {
            window.location.reload();
        });
    
        // Agregar el botón al final del contenedor
        elementDiv.appendChild(reloadButton);
    }
    

}