-- criação do banco
drop database eventos;
CREATE DATABASE eventos;
USE eventos;

-- criação de tabelas
CREATE TABLE funcionario(
	id_funcionario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    setor VARCHAR(50) NOT NULL,
    cargo VARCHAR(50) NOT NULL
);

CREATE TABLE instrutor(
	id_instrutor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL, 
	email VARCHAR(100) NOT NULL
);

CREATE TABLE sala(
	id_sala INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
	capacidade INT NOT NULL,
	recursos TEXT NOT NULL
);

CREATE TABLE cracha(
	id_cracha INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	qr_code VARCHAR(255) NOT NULL,
    data_emissao DATETIME NOT NULL,
    id_funcionario INT NOT NULL,
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id_funcionario)
);

CREATE TABLE evento(
	id_evento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
	data DATE NOT NULL,
    horario TIME,
    id_sala INT NOT NULL,
    FOREIGN KEY (id_sala) REFERENCES sala(id_sala)
);

CREATE TABLE funcionario_evento(
	id_funcionario_evento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_funcionario INT NOT NULL,
    id_evento INT NOT NULL,
    FOREIGN KEY (id_funcionario) REFERENCES funcionario(id_funcionario),
    FOREIGN KEY (id_evento) REFERENCES evento(id_evento)
);

CREATE TABLE instrutor_evento(
	id_instrutor_evento INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_instrutor INT NOT NULL,
    id_evento INT NOT NULL,
    FOREIGN KEY (id_instrutor) REFERENCES instrutor(id_instrutor),
    FOREIGN KEY (id_evento) REFERENCES evento(id_evento)
);

-- inserindo dados
-- funcionario
INSERT INTO funcionario(nome, setor, cargo) VALUES ("Usuário1", "setor1", "cargo1");
INSERT INTO funcionario(nome, setor, cargo) VALUES ("Usuário2", "setor2", "cargo2");
INSERT INTO funcionario(nome, setor, cargo) VALUES ("Usuário3", "setor3", "cargo3");
INSERT INTO funcionario(nome, setor, cargo) VALUES ("Usuário4", "setor4", "cargo4");
INSERT INTO funcionario(nome, setor, cargo) VALUES ("Usuário5", "setor5", "cargo5");
INSERT INTO funcionario(nome, setor, cargo) VALUES ("Usuário6", "setor6", "cargo6");
INSERT INTO funcionario(nome, setor, cargo) VALUES ("Usuário7", "setor7", "cargo7");
INSERT INTO funcionario(nome, setor, cargo) VALUES ("Usuário8", "setor8", "cargo8");
INSERT INTO funcionario(nome, setor, cargo) VALUES ("Usuário9", "setor9", "cargo9");
INSERT INTO funcionario(nome, setor, cargo) VALUES ("Usuário10", "setor10", "cargo10");

-- cracha
INSERT INTO cracha(qr_code, data_emissao,id_funcionario) 
VALUES 
("Usuário1", "2008-11-11 13:23:44", 1),
("Usuário2", "2008-11-11 13:23:44", 2),
("Usuário3", "2008-11-11 13:23:44", 3),
("Usuário4", "2008-11-11 13:23:44", 4),
("Usuário5", "2008-11-11 13:23:44", 5),
("Usuário6", "2008-11-11 13:23:44", 6),
("Usuário7", "2008-11-11 13:23:44", 7),
("Usuário8", "2008-11-11 13:23:44", 8),
("Usuário9", "2008-11-11 13:23:44", 9),
("Usuário10", "2008-11-11 13:23:44", 10);

-- sala
INSERT INTO sala(nome, capacidade, recursos)
VALUES
("Sala1", 25, "tudo de bom"),
("Sala2", 78, "tudo de ruim");

-- instrutor
INSERT INTO instrutor(nome, email) 
VALUES
("instrutor1", "instrutor1email"),
("instrutor2", "instrutor2email"),
("instrutor3", "instrutor3email");

-- evento
INSERT INTO evento(titulo, descricao, data, horario, id_sala) 
VALUES
("evento1", "evento para sala 1 e usuario 1, 2, 3, 4 e 5", "2005-09-23","13:23:44", 1),
("evento2", "evento para sala 2 e usuario 6, 7, 8, 9, 10", "2005-09-23","13:23:44", 2);


-- funcionario_evento
INSERT INTO funcionario_evento(id_funcionario, id_evento)
VALUES
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1),
(6, 2), (7, 2), (8, 2), (9, 2), (10, 2);

-- instrutor_evento
INSERT INTO instrutor_evento(id_instrutor, id_evento)
VALUES
(1, 2), (3, 1);

-- consultas 
-- listar funcionarios participantes de um evento especifico
SELECT funcionario.nome, funcionario.setor, funcionario.cargo, evento.titulo AS evento, evento.descricao AS descricao_evento
FROM funcionario_evento
INNER JOIN funcionario ON funcionario_evento.id_funcionario = funcionario.id_funcionario
INNER JOIN evento ON funcionario_evento.id_evento = evento.id_evento
WHERE evento.titulo = "evento2";

-- mostrar eventos ministrados por um instrutor específico
SELECT instrutor.nome, instrutor.email, evento.titulo AS evento
FROM instrutor_evento
INNER JOIN instrutor ON instrutor_evento.id_instrutor = instrutor.id_instrutor
INNER JOIN evento ON instrutor_evento.id_evento = evento.id_evento
WHERE instrutor.nome = "instrutor3";

-- apresentar os eventos realizados e em quais salas foram realizados
SELECT evento.titulo, evento.data, evento.horario, sala.nome AS sala
FROM evento
INNER JOIN sala ON evento.id_sala = sala.id_sala;


