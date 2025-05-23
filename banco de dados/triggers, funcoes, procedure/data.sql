-- Remove o banco anterior
DROP DATABASE IF EXISTS EscolaDB;

-- Cria o banco
CREATE DATABASE EscolaDB;

-- Usa o banco
USE EscolaDB;

-- Tabelas principais
CREATE TABLE Aluno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    data_nascimento DATE,
    email VARCHAR(100)
);

CREATE TABLE Professor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    especialidade VARCHAR(100)
);

CREATE TABLE Disciplina (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    professor_id INT,
    FOREIGN KEY (professor_id) REFERENCES Professor(id)
);

CREATE TABLE Matricula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT,
    disciplina_id INT,
    data_matricula DATE,
    FOREIGN KEY (aluno_id) REFERENCES Aluno(id),
    FOREIGN KEY (disciplina_id) REFERENCES Disciplina(id)
);

CREATE TABLE Presenca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula_id INT,
    data_aula DATE,
    presente BOOLEAN,
    FOREIGN KEY (matricula_id) REFERENCES Matricula(id)
);

CREATE TABLE Nota (
    id INT AUTO_INCREMENT PRIMARY KEY,
    matricula_id INT,
    nota DECIMAL(5,2),
    data_lancamento DATE,
    FOREIGN KEY (matricula_id) REFERENCES Matricula(id)
);

-- Tabela de logs
CREATE TABLE LogAlteracoes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT,
    data_log DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Professores
INSERT INTO Professor (nome, especialidade) VALUES 
('Ana Souza', 'Matemática'),
('Carlos Lima', 'História'),
('Fernanda Dias', 'Física'),
('João Barreto', 'Biologia'),
('Mariana Rocha', 'Geografia');

-- Disciplinas
INSERT INTO Disciplina (nome, professor_id) VALUES 
('Matemática 1', 1),
('História Geral', 2),
('Física Experimental', 3),
('Biologia Celular', 4),
('Geografia Física', 5),
('Estatística', 1);

-- Alunos
INSERT INTO Aluno (nome, data_nascimento, email) VALUES 
('João Silva', '2006-05-22', 'joao@email.com'),
('Maria Oliveira', '2005-11-10', 'maria@email.com'),
('Pedro Santos', '2006-03-15', 'pedro@email.com'),
('Laura Pereira', '2005-07-18', 'laura@email.com'),
('Felipe Costa', '2007-01-05', 'felipe@email.com'),
('Amanda Freitas', '2006-09-27', 'amanda@email.com'),
('Bruno Martins', '2005-12-02', 'bruno@email.com'),
('Camila Fernandes', '2006-08-30', 'camila@email.com'),
('Diego Teixeira', '2006-04-10', 'diego@email.com'),
('Juliana Ribeiro', '2005-06-17', 'juliana@email.com'),
('Lucas Barros', '2006-02-22', 'lucas@email.com'),
('Vanessa Lopes', '2007-03-29', 'vanessa@email.com'),
('Ricardo Almeida', '2005-10-12', 'ricardo@email.com'),
('Natália Cardoso', '2006-11-01', 'natalia@email.com'),
('Thiago Nunes', '2005-08-08', 'thiago@email.com');

-- Matrículas (cada aluno em 1 ou 2 disciplinas aleatórias)
INSERT INTO Matricula (aluno_id, disciplina_id, data_matricula) VALUES 
(1, 1, CURDATE()),
(2, 1, CURDATE()),
(3, 2, CURDATE()),
(4, 2, CURDATE()),
(5, 3, CURDATE()),
(6, 3, CURDATE()),
(7, 4, CURDATE()),
(8, 4, CURDATE()),
(9, 5, CURDATE()),
(10, 5, CURDATE()),
(11, 6, CURDATE()),
(12, 6, CURDATE()),
(13, 1, CURDATE()),
(14, 3, CURDATE()),
(15, 2, CURDATE()),
(1, 3, CURDATE()),
(2, 4, CURDATE()),
(3, 5, CURDATE()),
(4, 6, CURDATE()),
(5, 2, CURDATE());

-- Notas (valores variados e plausíveis)
INSERT INTO Nota (matricula_id, nota, data_lancamento) VALUES 
(1, 6.5, CURDATE()),
(1, 7.0, CURDATE()),
(2, 4.0, CURDATE()),
(3, 8.5, CURDATE()),
(3, 9.0, CURDATE()),
(4, 7.5, CURDATE()),
(5, 5.5, CURDATE()),
(6, 6.0, CURDATE()),
(7, 9.5, CURDATE()),
(8, 3.0, CURDATE()),
(9, 6.0, CURDATE()),
(10, 8.0, CURDATE()),
(11, 7.0, CURDATE()),
(12, 5.0, CURDATE()),
(13, 8.0, CURDATE()),
(14, 6.0, CURDATE()),
(15, 4.5, CURDATE()),
(16, 7.5, CURDATE()),
(17, 9.0, CURDATE()),
(18, 6.5, CURDATE()),
(19, 7.0, CURDATE()),
(20, 5.0, CURDATE());

-- Presença (variedade de presença/falta)
INSERT INTO Presenca (matricula_id, data_aula, presente) VALUES
(1, CURDATE(), TRUE),
(1, CURDATE() - INTERVAL 1 DAY, FALSE),
(2, CURDATE(), TRUE),
(3, CURDATE(), TRUE),
(4, CURDATE(), FALSE),
(5, CURDATE(), TRUE),
(6, CURDATE(), TRUE),
(7, CURDATE(), FALSE),
(8, CURDATE(), TRUE),
(9, CURDATE(), TRUE),
(10, CURDATE(), FALSE),
(11, CURDATE(), TRUE),
(12, CURDATE(), FALSE),
(13, CURDATE(), TRUE),
(14, CURDATE(), TRUE),
(15, CURDATE(), FALSE),
(16, CURDATE(), TRUE),
(17, CURDATE(), TRUE),
(18, CURDATE(), TRUE),
(19, CURDATE(), FALSE),
(20, CURDATE(), TRUE);


