var database = require("../database/config")

// function autenticar(email, senha) {
//     console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
//     var instrucaoSql = `
//         SELECT  * FROM tbUsuario WHERE emailUsuario = '${email}' AND senhaUsuario = '${senha}';
//     `;
//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function postar(descPost, idUsuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", descPost, idUsuario);

    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tbPost (descPost, fkUsuario) VALUES ('${descPost}', ${idUsuario});    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPosts() {
    console.log("ok")
    var instrucaoSql = `
    SELECT 
        p.idPost as idPost,
        p.descPost as descPost,
        p.curtidasPost as curtidasPost,
        p.imagensPost as imgPost,
        u.idUsuario as idUsuario,
        u.nomeUsuario as nomeUsuario,
        u.userUsuario as userUsuario,
        u.emailUsuario as emailUser
    FROM tbPost as p
    JOIN tbUsuario as u ON p.fkUsuario = u.idUsuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);

}

module.exports = {
    postar,
    listarPosts
};