var postModel = require("../models/postModel");

function postar(req, res) {

    const { descPost, idUsuario } = req.body;

    // Caminho da imagem salva (pelo multer)
    const imagem = req.file ? req.file.filename : null;

    if (!descPost || !idUsuario) {
        return res.status(400).json({ erro: "Descrição e ID do usuário são obrigatórios." });
    }

    postModel.postar(descPost, imagem, idUsuario)
        .then(resultado => {
            res.status(201).json({ mensagem: "Post criado com sucesso!", resultado });
        })
        .catch(erro => {
            console.error("Erro ao postar:", erro);
            res.status(500).json({ erro: "Erro ao criar o post." });

        });

}

function listarPosts(req, res) {

    postModel.listarPosts()
        .then(
            function (resultado) {

                res.json(resultado)

            }).catch(function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao puxar os posts! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            });

}


module.exports = {
    postar,
    listarPosts
}








// idPost: resultado[0].idPost,
// descPost: resultado[0].descPost,
// curtidasPost: resultado[0].curtidasPost,
// imgPost: resultado[0].imgPost,
// idUsuario: resultado[0].idUsuario,
// nomeUsuario: resultado[0].nomeUsuario,
// userUsuario: resultado[0].userUsuario,
// emailUser: resultado[0].emailUser,