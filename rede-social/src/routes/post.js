var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD

var postController = require("../controllers/postController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/postar", upload.single('foto'), (req, res) => {
    postController.postar(req, res);
})

router.get("/listarPosts", function (req, res) {
    postController.listarPosts(req, res);
})

module.exports = router;