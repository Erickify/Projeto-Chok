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
    pfpUsuario LONGBLOB NULL,
    bannerUsuario LONGBLOB NULL,
    PRIMARY KEY (idUsuario),
    CONSTRAINT FK_Usuario_Seguidor FOREIGN KEY (fkSeguidor) REFERENCES tbUsuario (idUsuario)
);

-- 3) tbPost
CREATE TABLE tbPost (
    idPost INT NOT NULL AUTO_INCREMENT,
    curtidasPost INT NOT NULL DEFAULT 0,
    descPost VARCHAR(300) NULL,
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
    fkUsuario INT NOT NULL,
    PRIMARY KEY (idComentario),
    CONSTRAINT FK_Comentario_Post FOREIGN KEY (fkPost) REFERENCES tbPost (idPost),
    CONSTRAINT FK_Comentario_Usuario FOREIGN KEY (fkUsuario) REFERENCES tbUsuario (idUsuario),
    CONSTRAINT FK_Comentario_Sub FOREIGN KEY (fkSubComentario) REFERENCES tbComentario (idComentario)
);

-- 5) tbCurtidas
CREATE TABLE tbCurtidas (
    fkCurtidas INT NOT NULL AUTO_INCREMENT,
    tbUsuario_idUsuario INT NOT NULL,
    fkPost INT NOT NULL,
    PRIMARY KEY (fkCurtidas),
    CONSTRAINT FK_Curtida_Usuario FOREIGN KEY (tbUsuario_idUsuario) REFERENCES tbUsuario (idUsuario),
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

INSERT INTO
    tbPost (
        descPost,
        imagensPost,
        fkUsuario
    )
VALUES (
        'asdasd',
        '7356762df3c8fb4da7c90e5ea4900749915bacee373aa0a66d5dd4d480b4b9c8ca0e5ef27b2708c4f564e1c202d983dbfcf526b6787bb0c7440918f1c3fa1915.jpg',
        2
    );