"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const usuario_1 = __importDefault(require("./usuario"));
const express_1 = __importDefault(require("express"));
const serie_1 = __importDefault(require("./serie"));
const app = express_1.default();
exports.app = app;
//Para abrir ficheros para los logs
const fs = require('fs');
//PARA LOS PARAMETROS DEL POST
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
//Creamos un usuario
let usuario_server = new usuario_1.default('server', 'infraestructura virtual');
//LOGGER MIDDLEWARE
let logger = (req, res, next) => {
    let hora = new Date();
    let hora_bonita = hora.getFullYear() +
        "-" +
        (hora.getMonth() + 1) +
        "-" +
        hora.getDate() +
        " " +
        hora.getHours() +
        ":" +
        hora.getMinutes() +
        ":" +
        hora.getSeconds();
    let method = req.method;
    let url = req.url;
    let status = res.statusCode;
    let log = `[${hora_bonita}] ${method}:${url} ${status}`;
    console.log(log);
    //ruta para los logs
    //let dir_logs = './log'
    //si no existe la ruta creala
    //if (!fs.existsSync(dir_logs)){
    //    fs.mkdirSync(dir_logs);
    //}
    fs.appendFile("./logs.txt", log + "\n", err => {
        if (err) {
            console.log(err);
        }
    });
    next();
};
//Le decimos a express que use la funcion middleware para crear logs
app.use(logger);
//Añade un capitulo a la serie 
app.post("/capitulo/:nombreserie/:numcapitulo", (req, res) => {
    let nombreserie = req.params.nombreserie;
    let numcap = req.params.numcapitulo;
    let link = req.body.link;
    //Vemos si esta vacio y si es un numero
    if (nombreserie && link && !isNaN(Number(numcap))) {
        try {
            let serie = usuario_server.getSerie(nombreserie);
            serie.anadirCapitulo(Number(numcap), link);
            res.setHeader('Location', "/capitulo/" + encodeURIComponent(nombreserie)
                + "/" + encodeURIComponent(numcap));
            res.status(201).send({ "OK": numcap, link });
        }
        catch (error) {
            res.setHeader('Location', "/capitulo/" + encodeURIComponent(nombreserie)
                + "/" + encodeURIComponent(numcap));
            //Ya existe el capitulo
            res.status(201).send({ "OK": numcap, link });
        }
    }
    else {
        res.status(400).send("Parametros Invalidos");
    }
});
//Borra el capitulo numero de la serie
app.delete("/capitulo/:nombreserie/:numcapitulo", (req, res) => {
    let nombreserie = req.params.nombreserie;
    let numcap = req.params.numcapitulo;
    //Vemos si esta vacio y si es un numero
    if (nombreserie && !isNaN(Number(numcap))) {
        try {
            let serie = usuario_server.getSerie(nombreserie);
            serie.borrarCapitulo(Number(numcap));
            res.send({ "DELETED": numcap });
        }
        catch (error) {
            //El capitulo ya estaba borrado
            res.send({ "DELETED": numcap });
        }
    }
    else {
        res.status(400).send("Parametros Invalidos");
    }
});
//Devuelve el link del capitulo de la serie
app.get("/capitulo/:nombreserie/:numcapitulo", (req, res) => {
    let nombreserie = req.params.nombreserie;
    let numcap = req.params.numcapitulo;
    //Vemos si esta vacio y si es un numero
    if (nombreserie && !isNaN(Number(numcap))) {
        try {
            let serie = usuario_server.getSerie(nombreserie);
            let link = serie.getLinkCapitulo(Number(numcap));
            res.send({ "numero": numcap, link });
        }
        catch (error) {
            //Not found
            res.status(404).send(error.message);
        }
    }
    else {
        res.status(400).send("Parametros Invalidos");
    }
});
//Construye una serie con los datos y la añade
//La descripcion y el link se obtienen de los parametros post
app.post("/serie/:nombreserie", (req, res) => {
    let nombreserie = req.params.nombreserie;
    let descripcion = req.body.descripcion;
    let link = req.body.link;
    //Vemos si estan vacios
    if (nombreserie && descripcion && link) {
        let nueva_serie = new serie_1.default(nombreserie, descripcion, link);
        try {
            usuario_server.anadirSerie(nueva_serie);
            res.setHeader('Location', "/serie/" + encodeURIComponent(nombreserie));
            res.status(201).send({ "OK": nombreserie });
        }
        catch (error) {
            res.setHeader('Location', "/serie/" + encodeURIComponent(nombreserie));
            // Ya existe la serie
            res.status(201).send({ "OK": nombreserie });
        }
    }
    else {
        res.status(400).send("Parametros Invalidos");
    }
});
//Borra la serie
app.delete("/serie/:nombreserie", (req, res) => {
    let nombreserie = req.params.nombreserie;
    //Vemos si esta vacio
    if (nombreserie) {
        let serie_borrar = new serie_1.default(nombreserie, "", "");
        try {
            usuario_server.borrarSerie(serie_borrar);
            res.send({ "DELETED": nombreserie });
        }
        catch (error) {
            //Ya estaba borrado
            res.send({ "DELETED": nombreserie });
        }
    }
    else {
        res.status(400).send("Parametros Invalidos");
    }
});
//Devuelve una serie con toda la informacion asociada
app.get("/serie/:nombreserie", (req, res) => {
    let nombreserie = req.params.nombreserie;
    //Vemos si esta vacio
    if (nombreserie) {
        try {
            let serie = usuario_server.getSerie(nombreserie);
            //Al tener un map tenemos que hacer esto para poder mostrarlo ya que stringify no es capaz por si solo
            let serie_json = JSON.parse(JSON.stringify(serie));
            serie_json['_capitulos'] = JSON.stringify(Object.fromEntries(serie.map_capitulos));
            res.send(JSON.stringify(serie_json));
        }
        catch (error) {
            //Not found
            res.status(404).send(error.message);
        }
    }
    else {
        res.status(400).send("Parametros Invalidos");
    }
});
app.get("/holamundo", (req, res) => {
    res.send("Hola Mundo!");
});
app.get("/status", (req, res) => {
    res.send("{ status: \"OK\" }");
});
module.exports = app;
