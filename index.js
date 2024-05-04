//express
const express = require('express');
const app = express();
const PORT = 3000;//puede cambiar por otro que no estan utilizando


//array
let LibrosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises'},
    {id: 2 , nombre: 'Exodo', autor: 'Moises'},
    {id: 3 , nombre: 'Levitico', autor: 'Moises'},
];
//manejo de JSON
app.use(express.json());
//endpoint 1 obtener todos los libros
app.get('/libros', (req, resp) => {
    resp.json(LibrosBiblicos);
})
//endpoint 2 obtener libro por ID
app.get('/libros/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = LibrosBiblicos.find((libro) => libro.id === idCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);

    }else{
        res.status(404).json({mensaje : 'Libro no encontrado'});

    }
});
//endpoint 3 agregar un libro
app.post('/agregar-libros', (req, res) => {
    const nuevoLibro = req.body;
    console.log(nuevoLibro);
    LibrosBiblicos.push(nuevoLibro);
    res.status(201).json('Se Guardo el Libro Exitosamente');
});
//enpoint 4 Actualizar el Libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = LibrosBiblicos.findIndex((libro) => libro.id === idCapturado);
    if (indexLibroLocalizado !== -1){
    LibrosBiblicos[indexLibroLocalizado] = req.body;
    res.json(LibrosBiblicos[indexLibroLocalizado]);
    } else {
        res.status(404).json({mensaje :'Libro no Encontrado'});
    }

});

app.listen(PORT, () => {
    console.log("Servidor Corriendo en el puerto http://localhost:" + PORT);
});
