-- 1) Criar DB
DROP DATABASE rede_social;

CREATE DATABASE rede_social;

USE rede_social;


-- 2) tbUsuario
CREATE TABLE tbUsuario (
    idUsuario INT NOT NULL AUTO_INCREMENT,
    nomeUsuario VARCHAR(20) NOT NULL,
    userUsuario VARCHAR(20) NOT NULL UNIQUE,
    emailUsuario VARCHAR(100) NOT NULL UNIQUE,
    senhaUsuario VARCHAR(10) NOT NULL,
    bioUsuario VARCHAR(100) NULL,
    fkSeguidor INT NULL,
    pfpUsuario TEXT NULL,
    bannerUsuario TEXT NULL,
    PRIMARY KEY (idUsuario),
    CONSTRAINT FK_Usuario_Seguidor FOREIGN KEY (fkSeguidor) REFERENCES tbUsuario (idUsuario)
);

-- 3) tbPost
CREATE TABLE tbPost (
    idPost INT NOT NULL AUTO_INCREMENT,
    curtidasPost INT NOT NULL DEFAULT 0,
    descPost VARCHAR(300) NULL,
    dataPosts datetime default current_timestamp ,
    imagensPost TEXT NULL,
    fkUsuario INT NOT NULL,
    PRIMARY KEY (idPost, fkUsuario),
    CONSTRAINT FK_Post_Usuario FOREIGN KEY (fkUsuario) REFERENCES tbUsuario (idUsuario)
);

-- 4) tbComentario
CREATE TABLE tbComentario (
    idComentario INT NOT NULL AUTO_INCREMENT,
    fkPost INT NOT NULL,
    fkSubComentario INT NULL,
    descComentario VARCHAR(300) NULL,
    dataComentario datetime default current_timestamp,
    fkUsuario INT NOT NULL,
    PRIMARY KEY (idComentario),
    CONSTRAINT FK_Comentario_Post FOREIGN KEY (fkPost) REFERENCES tbPost (idPost),
    CONSTRAINT FK_Comentario_Usuario FOREIGN KEY (fkUsuario) REFERENCES tbUsuario (idUsuario),
    CONSTRAINT FK_Comentario_Sub FOREIGN KEY (fkSubComentario) REFERENCES tbComentario (idComentario)
);

-- 5) tbCurtidas
CREATE TABLE tbCurtidas (
    fkUsuario INT NOT NULL,
    fkPost INT NOT NULL,
    dataCurtida DATETIME DEFAULT CURRENT_TIMESTAMP,
    constraint pkCurtidas primary key(fkUsuario,fkPost),
    CONSTRAINT FK_Curtida_Usuario FOREIGN KEY (fkUsuario) REFERENCES tbUsuario (idUsuario),
    CONSTRAINT FK_Curtida_Post FOREIGN KEY (fkPost) REFERENCES tbPost (idPost)
);

select * from tbUsuario;

show tables;

use rede_social;


SELECT
    s.idUsuario as idSeguidor,
    s.userUsuario as userSeguidor,
    s.pfpUsuario as pfpSeguidor
FROM tbUsuario as u
    JOIN tbUsuario as s ON u.fkSeguidor = s.idUsuario;

show tables;

select * from tbPost;


show databases;


          SELECT
            COUNT(c.fkPost) AS total_cur,
            COUNT(co.fkPost) AS total_com,
            COUNT(p.idPost) AS total_post
        FROM tbUsuario u
        LEFT JOIN tbPost p ON u.idUsuario = p.fkUsuario
        LEFT JOIN tbCurtidas c ON p.idPost = c.fkPost
        LEFT JOIN tbComentario co ON p.idPost = co.fkPost
        WHERE u.idUsuario = 1;
        
SELECT 
    DAY(dataPosts) AS dia,
    COUNT(idPost) AS total_post
FROM tbPost
WHERE fkUsuario = 1
  AND dataPosts >= CURDATE() - INTERVAL 7 DAY
GROUP BY DAY(dataPosts)
ORDER BY dia DESC;




(SELECT 
    DATE(dataPosts) AS dia,
    'posts' AS tipo,
    COUNT(idPost) AS total
FROM tbPost
WHERE fkUsuario = 1
  AND dataPosts >= NOW() - INTERVAL 7 DAY
GROUP BY dia)

UNION ALL

(SELECT 
    DATE(c.dataCurtida) AS dia,
    'curtidas' AS tipo,
    COUNT(c.fkPost) AS total
FROM tbCurtidas c
JOIN tbPost p ON c.fkPost = p.idPost
WHERE p.fkUsuario = 1
  AND c.dataCurtida >= NOW() - INTERVAL 7 DAY
GROUP BY dia)

UNION ALL

(SELECT 
    DATE(dataComentario) AS dia,
    'comentarios' AS tipo,
    COUNT(idComentario) AS total
FROM tbComentario
WHERE fkUsuario = 1
  AND dataComentario >= NOW() - INTERVAL 7 DAY
GROUP BY dia)

ORDER BY dia DESC, tipo;





SELECT 
    DAY(c.dataCurtida) AS dia,
    COUNT(c.fkPost) AS total_cur
FROM tbCurtidas c
JOIN tbPost p ON c.fkPost = p.idPost
WHERE p.fkUsuario = 1
  AND c.dataCurtida >= CURDATE() - INTERVAL 7 DAY
GROUP BY DAY(c.dataCurtida)
ORDER BY dia DESC;

SELECT 
    DAY(dataComentario) AS dia,
    COUNT(idComentario) AS total_com
FROM tbComentario
WHERE fkUsuario = 1
  AND dataComentario >= CURDATE() - INTERVAL 7 DAY
GROUP BY DAY(dataComentario)
ORDER BY dia DESC;


select dataCurtida from tbCurtidas;