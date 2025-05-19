var express = require("express");
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listarAmigos", function (req, res) {
    usuarioController.listarAmigos(req, res);
});

router.get("/:id", function(req, res) {
    usuarioController.listarPostsUsuario(req, res);
});

router.post("/editar", upload.single('foto'), (req, res) => {
    usuarioController.editarUsuario(req, res);
});

router.get("/convidado/:id", function(req,res) {
    usuarioController.convidado(req,res);
});



module.exports = router;