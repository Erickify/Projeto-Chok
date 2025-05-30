var database = require("../database/config");

function autenticar(email, senha) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
		email,
		senha
	);
	var instrucaoSql = `
        SELECT  * FROM tbUsuario WHERE emailUsuario = "${email}" AND senhaUsuario = "${senha}";
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, user) {
	console.log(
		"ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
		nome,
		email,
		senha,
		user
	);

	var instrucaoSql = `
        INSERT INTO tbUsuario (nomeUsuario, emailUsuario, senhaUsuario, userUsuario, pfpUsuario, bannerUsuario) VALUES ("${nome}", "${email}", "${senha}", "${user}", "imagem_perfil_default.svg", "imagem_banner_default.svg");
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function listarAmigos() {
	console.log("ok");
	var instrucaoSql = `
    SELECT 

        s.idUsuario as idSeguidor,
        s.userUsuario as userSeguidor,
        s.pfpUsuario as pfpSeguidor

    FROM tbUsuario as u
    JOIN tbUsuario as s ON u.fkSeguidor = s.idUsuario
    ;
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function listarPostsUsuario(idUsuario) {
	console.log("ok");
	var instrucaoSql = `
    SELECT 
        p.idPost as idPost,
        p.descPost as descPost,
        p.curtidasPost as curtidasPost,
        p.imagensPost as imgPost,
        u.pfpUsuario as pfpUsuario,
        u.idUsuario as idUsuario,
        u.nomeUsuario as nomeUsuario,
        u.userUsuario as userUsuario,
        u.emailUsuario as emailUser
    FROM tbPost as p
    JOIN tbUsuario as u ON p.fkUsuario = u.idUsuario
    WHERE u.idUsuario = ${idUsuario}
    ORDER BY p.idPost DESC;
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function convidado(idConvidado) {
	console.log("ok");
	var instrucaoSql = `
    SELECT *
    FROM tbUsuario
    WHERE idUsuario = ${idConvidado};
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function editarUsuario(idUsuario, nomeUsuario, bioUsuario) {
	console.log("ok");
	var instrucaoSql = `
    UPDATE tbUsuario
    SET nomeUsuario = "${nomeUsuario}",
    bioUsuario =  "${bioUsuario}"
    WHERE idUsuario = ${idUsuario};
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function enviarPfp(idUsuario, imagem) {
	var instrucaoSql = `
    UPDATE tbUsuario
    SET pfpUsuario = "${imagem}"
    WHERE idUsuario = ${idUsuario};
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);

	return database.executar(instrucaoSql);
}

function enviarBanner(idUsuario, imagem) {
	var instrucaoSql = `
    UPDATE tbUsuario
    SET bannerUsuario = "${imagem}"
    WHERE idUsuario = ${idUsuario};
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);

	return database.executar(instrucaoSql);
}

function atualizarUser(idUsuario) {
	var instrucaoSql = `
    SELECT * FROM tbUsuario WHERE idUsuario = ${idUsuario}`;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);

	return database.executar(instrucaoSql);
}

function dashPostMaisCurtido(idUsuario) {
	console.log("ok");
	var instrucaoSql = `
   SELECT 
    p.idPost,
    p.descPost,
    p.imagensPost,
    COUNT(c.fkUsuario) AS totalCurtidas,
    u.idUsuario AS idQuemCurtiu,
    u.nomeUsuario AS nomeQuemCurtiu,
    u.userUsuario AS userQuemCurtiu,
    u.pfpUsuario,
    c.dataCurtida
FROM tbPost AS p
JOIN tbCurtidas AS c ON p.idPost = c.fkPost
JOIN tbUsuario AS u ON c.fkUsuario = u.idUsuario
WHERE p.idPost = (
    SELECT 
        p2.idPost
    FROM tbPost AS p2
    JOIN tbCurtidas AS c2 ON p2.idPost = c2.fkPost
    WHERE p2.fkUsuario = ${idUsuario}
    GROUP BY p2.idPost
    ORDER BY COUNT(c2.fkPost) DESC
    LIMIT 1
)
GROUP BY p.idPost, p.descPost, p.imagensPost, u.idUsuario, u.nomeUsuario, u.userUsuario, u.pfpUsuario, c.dataCurtida;;

    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	autenticar,
	cadastrar,
	listarAmigos,
	listarPostsUsuario,
	convidado,
	editarUsuario,
	enviarPfp,
	enviarBanner,
	atualizarUser,
	dashPostMaisCurtido,
};
