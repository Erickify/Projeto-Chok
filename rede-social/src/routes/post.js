var express = require("express");
var router = express.Router();

var postController = require("../controllers/postController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/postar", function (req, res) {
    postController.postar(req, res);
})

router.get("/listarPosts", function (req, res) {
    postController.listarPosts(req, res);
})

module.exports = router;