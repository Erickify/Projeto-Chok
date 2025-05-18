var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    

    if (!email || !senha) {
        return res.status(400).json({ erro: "Preencha todos os campos!" });
    }

    usuarioModel.autenticar(email, senha)
        .then(function (resultado) {
            if (resultado.length == 1) {
                res.json({
                    idUsuario: resultado[0].idUsuario,
                    nome: resultado[0].nomeUsuario,
                    user: resultado[0].userUsuario,
                    email: resultado[0].emailUsuario,
                    senha: resultado[0].senhaUsuario,
                    pfp: resultado[0].pfpUsuario
                });
            } else {
                res.status(403).json({ erro: "Email e/ou senha inválidos!" });
            }
        })
        .catch(function (erro) {
            console.error("Erro ao autenticar:", erro);
            res.status(500).json({ erro: "Erro interno no servidor." });
        });
}


function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var user = req.body.userServer;

    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, user)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarAmigos(req, res){

     usuarioModel.listarAmigos()
            .then(
                function (resultado) {
    
                    res.json(resultado)
    
                }).catch(function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao puxar os seguidores! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                });


}

function listarPostsUsuario(req, res){
    var idUsuario = req.params.id;

    usuarioModel.listarPostsUsuario(idUsuario)
        .then(
            function (resultado){
                res.json(resultado)
            }).catch(function (erro) {
                console.log(erro);
                console.log('houve um erro as listar posts usuarios! Erro: ',
                    erro.sqlMessage
                )
            })

}

function editarUsuario(req, res){}

module.exports = {
    autenticar,
    cadastrar,
    listarAmigos,
    listarPostsUsuario,
    editarUsuario
}