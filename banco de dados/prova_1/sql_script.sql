-- comandos para criar e usar o banco de dados
create database prova;
use prova;

-- criação de tabelas
CREATE TABLE Colaboradores(
	id_colaborador INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

CREATE TABLE Instrutores(
	id_instrutor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    telefone VARCHAR(20) NOT NULL
);

CREATE TABLE Turmas(
	id_turma INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    codigo VARCHAR(100) NOT NULL UNIQUE,
    data_inicio_treinamento DATE NOT NULL,
    data_fim_treinamento DATE NOT NULL,
    coordenador INT NOT NULL,
    FOREIGN KEY (coordenador) REFERENCES Instrutores(id_instrutor)
);

CREATE TABLE Atividades(
	id_atividade INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    data_inicio_atividade DATE NOT NULL,
	data_final_atividade DATE NOT NULL
);

-- CRIANDO TABELAS DE RELAÇÃO
CREATE TABLE TurmasColaboradores(
	id_turmacolaborador INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	id_colaborador INT NOT NULL,
    id_turma INT NOT NULL,
    FOREIGN KEY (id_colaborador) REFERENCES Colaboradores(id_colaborador),
    FOREIGN KEY (id_turma) REFERENCES Turmas(id_turma)
);

CREATE TABLE TurmaInstrutor(
	id_turmainstrutor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_turma INT NOT NULL,
    id_instrutor INT NOT NULL,
    FOREIGN KEY (id_turma) REFERENCES Turmas(id_turma),
    FOREIGN KEY (id_instrutor) REFERENCES Instrutores(id_instrutor)
);

CREATE TABLE AtividadesTurma(
	id_atividadesturma INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_turma INT NOT NULL,
    id_atividade INT NOT NULL,
    FOREIGN KEY (id_turma) REFERENCES Turmas(id_turma),
    FOREIGN KEY (id_atividade) REFERENCES Atividades(id_atividade)
);


-- INSERINDO REGISTROS NA TABELA DE COLABORADORES
INSERT INTO Colaboradores (nome, email, telefone) 
VALUES
("Miguel", "miguel@gmail.com", "191234567"),
("Teste 2", "teste@gmail.com", "23456789"),
("Teste 3", "teste3@gmail.com", "34793453"),
("Teste 4", "teste4@gmail.com", "53453453"),
("Teste 5", "teste5@gmail.com", "374853845"),
("Teste 6", "teste6@gmail.com", "3458745");

-- INSERINDO REGISTROS NA TABELA DE INSTRUTORES
INSERT INTO Instrutores (nome, email, telefone)
VALUES
("Instrutor1", "instrutor1@gmail.com", "48574357"),
("Instrutor2", "instrutor2@gmail.com", "23409535"),
("Instrutor3", "instrutor3@gmail.com", "43025475"),
("Instrutor4", "instrutor4@gmail.com", "593475348"),
("Instrutor5", "instrutor5@gmail.com", "439535354"),
("Instrutor6", "instrutor6@gmail.com", "450375834");

-- INSERINDO REGISTROS NA TABELA DE TURMAS
INSERT INTO Turmas (nome, codigo, data_inicio_treinamento, data_fim_treinamento, coordenador)
VALUES
("Turma 1", "c1", "2025-03-28", "2025-08-24", 1),
("Turma 2", "c2", "2025-01-28", "2025-08-24", 5),
("Turma 3", "c3", "2025-04-01", "2025-09-24", 6),
("Turma 4", "c4", "2025-03-28", "2025-08-24", 2),
("Turma 5", "c5", "2025-08-28", "2025-09-24", 3),
("Turma 6", "c6", "2025-10-28", "2025-11-24", 4);

-- INSERINDO REGISTROS NA TABELA DE ATIVIDADES
INSERT INTO Atividades (nome, descricao, data_inicio_atividade, data_final_atividade)
VALUES
("PROVA DE JAVA", "FAZER A PROVA DE JAVA", "2025-03-01", "2025-03-01"),
("BANCO DE DADOS", "FAZER TUDO DO BANCO DE DADOS", "2025-02-03", "2025-03-28"),
("ATIVIDADE 3", "FAZER ATIVIDADE 3", "2025-01-01", "2025-08-24"),
("ATIVIDADE 4", "FAZER ATIVIDADE 4", "2025-02-01", "2025-09-24"),
("ATIVIDADE 5", "FAZER ATIVIDADE 5", "2025-03-01", "2025-10-24"),
("ATIVIDADE 6", "FAZER ATIVIDADE 6", "2025-04-01", "2025-11-24");

-- CONSULTA TABELA COLABORADORES E TURMAS
SELECT * FROM Colaboradores;
SELECT * FROM Turmas;

-- INSERIR DADOS NA TABELA TurmasColaboradores e consulta da tabela
INSERT INTO TurmasColaboradores (id_colaborador, id_turma)
VALUES
(6, 2), (3, 5), (5, 3), (4, 1), (1, 4), (2, 6);

SELECT * FROM TurmasColaboradores;

-- CONSULTA TABELA INSTRUTOR
SELECT * FROM Instrutores;

-- INSERIR DADOS NA TABELA TurmaInstrutor e consulta na tabela
INSERT INTO TurmaInstrutor (id_turma, id_instrutor)
VALUES
(1, 5), (2, 4), (3, 1), (4, 2), (5, 3), (6, 6), (2, 5), (2, 1);

SELECT * FROM TurmaInstrutor;

-- CONSULTA NA TABELA ATIVIDADES
SELECT * FROM Atividades;

-- INSERIR DADOS NA TABELA AtividadesTurma e consulta na tabela
INSERT INTO AtividadesTurma (id_turma, id_atividade) 
VALUES
(2, 4), (6, 2), (3, 1), (1, 6), (4, 3), (5, 5);

SELECT * FROM AtividadesTurma;
