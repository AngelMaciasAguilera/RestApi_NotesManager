// server.js
import express from 'express';       // Importa el framework Express para crear y gestionar el servidor web.
import cors from 'cors';             // Importa CORS para permitir peticiones entre diferentes dominios.
import mongoose from 'mongoose';      // Importa Mongoose para conectar y trabajar con MongoDB.

const app = express();               // Crea una instancia de la aplicación de Express.
const port = 3000;                   // Define el puerto en el que el servidor escuchará peticiones.

app.use(cors());                     // Habilita CORS en la aplicación para permitir peticiones desde otros orígenes.
app.use(express.json());             // Middleware para procesar peticiones con cuerpos en formato JSON.
app.use(express.urlencoded({ extended: true })); // Middleware para procesar datos de formularios en URL-encoded.


// URL de conexión a la base de datos MongoDB
const uri = "mongodb+srv://dbroot:1234@notesmanagerjs.kqg66.mongodb.net/notesmanagerjs?retryWrites=true&w=majority";

// Conexión a MongoDB con Mongoose
mongoose.connect(uri)
    .then(() => {
        console.log("Conexión a MongoDB exitosa con Mongoose"); // Mensaje en caso de conexión exitosa
    })
    .catch((error) => {
        console.error("Error de conexión a MongoDB:", error); // Muestra error si la conexión falla
    });

// Define el esquema y modelo de la colección 'notes'
const noteSchema = new mongoose.Schema({
    tipoNota: String,               // Campo tipoNota de tipo String para almacenar el tipo de la nota.
    contenido: String,              // Campo contenido de tipo String para almacenar el contenido de la nota.
    fecha_creacion: String          // Campo fecha_creacion de tipo String para almacenar la fecha de creación.
});

const Note = mongoose.model('Note', noteSchema); // Crea el modelo 'Note' basado en noteSchema.


// Ruta GET para obtener todas las notas
app.get('/', (req, res) => {
    Note.find()                     // Busca todos los documentos en la colección 'notes'.
        .then((datosNotas) => {
            res.json(datosNotas);   // Devuelve los datos en formato JSON.
        })
        .catch((error) => {
            res.status(500).send("Error al obtener las notas: " + error.message); // Error en caso de fallo al obtener las notas
        });
});


// Ruta POST para agregar una nueva nota
app.post('/', (req, res) => {
    const fechaActual = new Date();  // Obtiene la fecha actual.
    const fechaFormateada = fechaActual.toLocaleDateString('es-ES'); // Formatea la fecha en 'DD/MM/YYYY'

    const { tipoNota, contenido } = req.body; // Extrae tipoNota y contenido del cuerpo de la petición.

    const nuevaNota = new Note({
        tipoNota: tipoNota,          // Asigna el tipo de nota recibido en la petición.
        contenido: contenido,        // Asigna el contenido de la nota recibido en la petición.
        fecha_creacion: fechaFormateada // Asigna la fecha de creación formateada.
    });

    nuevaNota.save()                // Inserta la nueva nota en la base de datos.
        .then(() => {
            res.redirect("http://127.0.0.1:5500/restapi_client/index.html"); // Redirige a la página especificada tras la insercion.
        })
        .catch((error) => {
            res.status(500).send("Error al agregar la nota: " + error.message); // Error en caso de fallo al guardar la nota
        });
});


// Inicia el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`); // Muestra un mensaje cuando el servidor empieza a escuchar en el puerto.
});
