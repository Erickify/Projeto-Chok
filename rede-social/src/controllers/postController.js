var postModel = require("../models/postModel");

function postar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var descPost = req.body.descPostServer;
    var idUsuario = req.body.idUsuarioServer;
    

    // Faça as validações dos valores
    if (descPost == undefined) {
        res.status(400).send("Sua descrição do Post está undefined!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        postModel.postar(descPost, idUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o post! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    postar
}