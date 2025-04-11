-- Criação do banco
DROP DATABASE IF EXISTS biblioteca;
CREATE DATABASE IF NOT EXISTS biblioteca;
USE biblioteca;

-- Tabela de níveis de associação
CREATE TABLE nivel_associacao (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(50) NOT NULL
);

-- Tabela de usuários
CREATE TABLE usuario (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 identificacao VARCHAR(20) UNIQUE NOT NULL,
 email VARCHAR(100) NOT NULL,
 data_cadastro DATE NOT NULL,
 nivel_id INT,
 FOREIGN KEY (nivel_id) REFERENCES nivel_associacao(id)
);

-- Tabela de autores
CREATE TABLE autor (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 data_nascimento DATE,
 biografia TEXT
);

-- Tabela de categorias
CREATE TABLE categoria (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(50) NOT NULL
);
-- Tabela de livros
CREATE TABLE livro (
 id INT AUTO_INCREMENT PRIMARY KEY,
 titulo VARCHAR(200) NOT NULL,
 isbn VARCHAR(20) UNIQUE NOT NULL,
 descricao TEXT
);

-- Relacionamento N:N entre livros e autores
CREATE TABLE livro_autor (
 livro_id INT,
 autor_id INT,
 PRIMARY KEY (livro_id, autor_id),
 FOREIGN KEY (livro_id) REFERENCES livro(id),
 FOREIGN KEY (autor_id) REFERENCES autor(id));
 
 CREATE TABLE livro_categoria (
 livro_id INT,
 categoria_id INT,
 PRIMARY KEY (livro_id, categoria_id),
 FOREIGN KEY (livro_id) REFERENCES livro(id),
 FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);
-- Tabela de empréstimos
CREATE TABLE emprestimo (
 id INT AUTO_INCREMENT PRIMARY KEY,
 usuario_id INT,
 livro_id INT,
 data_emprestimo DATE NOT NULL,
 data_limite DATE NOT NULL,
 data_devolucao DATE,
 FOREIGN KEY (usuario_id) REFERENCES usuario(id),
 FOREIGN KEY (livro_id) REFERENCES livro(id)
);

-- Inserindo dados em nivel_associacao
INSERT INTO nivel_associacao (nome) VALUES
('Regular'),
('Premium'),
('Estudante'),
('Professor'),
('Visitante'),
('Parceiro');
-- Inserindo dados em usuario
INSERT INTO usuario (nome, identificacao, email, data_cadastro, nivel_id) VALUES
('Ana Souza', 'USR001', 'ana@email.com', '2023-01-10', 1),
('Carlos Lima', 'USR002', 'carlos@email.com', '2023-02-15', 2),
('Juliana Rocha', 'USR003', 'juliana@email.com', '2023-03-05', 3),
('Lucas Martins', 'USR004', 'lucas@email.com', '2023-04-20', 4),
('Fernanda Alves', 'USR005', 'fernanda@email.com', '2023-05-30', 5),
('Rafael Pinto', 'USR006', 'rafael@email.com', '2023-06-18', 6);
-- Inserindo dados em autor
INSERT INTO autor (nome, data_nascimento, biografia) VALUES
('José Saramago', '1922-11-16', 'Autor português vencedor do Nobel.'),
('Clarice Lispector', '1920-12-10', 'Autora modernista brasileira.'),
('George Orwell', '1903-06-25', 'Famoso por 1984 e A Revolução dos Bichos.'),
('Machado de Assis', '1839-06-21', 'Autor realista brasileiro.'),
('Agatha Christie', '1890-09-15', 'Rainha do crime.'),
('J. K. Rowling', '1965-07-31', 'Autora da saga Harry Potter.');
-- Inserindo dados em categoria
INSERT INTO categoria (nome) VALUES
('Ficção'),
('Não-ficção'),
('Romance'),
('Mistério'),
('Ficção Científica'),
('Biografia');
-- Inserindo dados em livro
INSERT INTO livro (titulo, isbn, descricao) VALUES
('Ensaio sobre a Cegueira', '978-85-01-00000-1', 'Romance sobre uma epidemia de cegueira.'),
('1984', '978-85-01-00000-2', 'Distopia sobre um regime totalitário.'),
('Dom Casmurro', '978-85-01-00000-3', 'Romance de Bentinho e Capitu.'),
('Harry Potter e a Pedra Filosofal', '978-85-01-00000-4', 'Aventura mágica do jovem bruxo.'),
('O Caso dos Dez Negrinhos', '978-85-01-00000-5', 'Mistério com assassinatos em série.'),
('Perto do Coração Selvagem', '978-85-01-00000-6', 'Romance introspectivo de estreia de 
Clarice.');

-- Relacionando livros com autores
INSERT INTO livro_autor (livro_id, autor_id) VALUES
(1, 1),
(2, 3),
(3, 4),
(4, 6),
(5, 5),
(6, 2);
-- Relacionando livros com categorias
INSERT INTO livro_categoria (livro_id, categoria_id) VALUES
(1, 1), (1, 3),
(2, 1), (2, 5),
(3, 1), (3, 3),
(4, 1), (4, 5),
(5, 1), (5, 4),
(6, 1), (6, 3);
-- Inserindo dados em emprestimo
INSERT INTO emprestimo (usuario_id, livro_id, data_emprestimo, data_limite, 
data_devolucao) VALUES
(1, 1, '2025-03-01', '2025-03-15', NULL),
(2, 2, '2025-02-20', '2025-03-05', '2025-03-02'),
(3, 3, '2025-02-25', '2025-03-10', NULL),
(4, 4, '2025-03-05', '2025-03-20', NULL),
(5, 5, '2025-03-10', '2025-03-25', NULL),
(6, 6, '2025-03-12', '2025-03-27', NULL);

-- 1. liste os livros
SELECT * FROM livro;

-- 2. Cadastre um novo livro chamado "Python“, do autor "Eric Matthes", publicado em 24/04/2023, do gênero “técnico”. 
SELECT * FROM autor;
SELECT * FROM livro;
INSERT INTO livro (titulo, isbn, descricao) VALUES ('Python', '‎978-8575224083', 'Este livro é orientado ao iniciante em programação.');
SELECT * FROM autor WHERE nome = "Eric Matthes";
INSERT INTO autor (nome, data_nascimento, biografia) VALUES ('Eric Matthes', '1972-01-01', 'Eric Matthes ensinou matemática e ciências no Ensino Médio por 25 anos');
SELECT * FROM livro_autor;
INSERT INTO livro_autor (livro_id, autor_id) VALUES (7, 7);
ALTER TABLE livro ADD data_publicacao DATE;
UPDATE livro SET data_publicacao = "2023-04-24" WHERE id = 7;
SELECT * FROM categoria;
INSERT INTO categoria (nome) VALUES ('técnico');
SELECT * FROM livro_categoria;
CREATE TABLE livro_categoria (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    livro_id INT NOT NULL,
    categoria_id INT NOT NULL,
    FOREIGN KEY (livro_id) REFERENCES livro(id),
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);
INSERT INTO livro_categoria (livro_id, categoria_id) VALUES (7, 7);

-- 1. Atualize o email do usuário id = 1 para teste@email.com. 
-- 2. Corrija o título do livro "Python" para " Curso Intensivo de Python: uma Introdução 
-- Prática e Baseada em Projetos à Programação ". 
-- 3. Marque todos os livros publicados antes de 2000 como status = inativo. Se não 
-- houver nenhum, adicione 1 livro publicado antes de 2000. (Seu banco está pronto para 
-- aceitar o campo status?) 

SELECT * FROM usuario WHERE id = 1;
UPDATE usuario SET email = "teste@email.com" WHERE id = 1;
SELECT * FROM livro;
UPDATE livro SET titulo = " Curso Intensivo de Python: uma Introdução Prática e Baseada em Projetos à Programação" WHERE id = 7;
SELECT * FROM status;
CREATE TABLE status(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    estado VARCHAR(10) NOT NULL
);
ALTER TABLE livro DROP COLUMN status_id;
ALTER TABLE livro ADD CONSTRAINT status_id FOREIGN KEY (status_id) REFERENCES status(id);

