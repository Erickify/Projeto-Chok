var express = require("express");
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



module.exports = router;