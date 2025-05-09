DROP DATABASE IF EXISTS biblioteca_joins;
CREATE DATABASE biblioteca_joins;
USE biblioteca_joins;

-- Tabela de autores (ID a partir de 200)
CREATE TABLE autores (
id_autor INT PRIMARY KEY,
 nome_autor VARCHAR(50)
);

-- Tabela de editoras (ID a partir de 300)
CREATE TABLE editoras (
 id_editora INT PRIMARY KEY,
 nome_editora VARCHAR(50)
);

-- Tabela de livros (ID a partir de 100)
CREATE TABLE livros (
 id_livro INT PRIMARY KEY,
 titulo VARCHAR(100),
 id_autor INT,
 id_editora INT,
 FOREIGN KEY (id_autor) REFERENCES autores(id_autor),
 FOREIGN KEY (id_editora) REFERENCES editoras(id_editora)
);

-- Tabela de leitores (ID a partir de 500)
CREATE TABLE leitores (
 id_leitor INT PRIMARY KEY,
 nome_leitor VARCHAR(50)
);
-- Tabela de empréstimos (ID a partir de 400)
CREATE TABLE emprestimos (
 id_emprestimo INT PRIMARY KEY,
 id_livro INT,
 data DATE
 -- sem FOREIGN KEY para simular dados inválidos
);
-- Associação entre empréstimos e leitores
CREATE TABLE emprestimos_leitores (
 id_emprestimo INT,
 id_leitor INT
 -- sem FOREIGN KEY para simular leitor inexistente
);

-- Autores
INSERT INTO autores VALUES
(200, 'Machado de Assis'),
(201, 'George Orwell'),
(202, 'Jorge Amado'),
(203, 'Autor Fantasma'); -- não tem livro

-- Editoras
INSERT INTO editoras VALUES
(300, 'Editora Brasil'),
(301, 'Companhia das Letras'),
(302, 'Saraiva'),
(303, 'Editora Fantasma'); -- não tem livro
-- Livros
INSERT INTO livros VALUES
(100, 'Dom Casmurro', 200, 300),
(101, '1984', 201, 301),
(102, 'A Revolução dos Bichos', 201, 301),
(103, 'Capitães da Areia', 202, 302);
-- Leitores
INSERT INTO leitores VALUES
(500, 'Alice'),
(501, 'Bruno'),
(502, 'Carla');
-- Empréstimos
INSERT INTO emprestimos VALUES
(400, 100, '2024-05-01'),
(401, 101, '2024-05-02'),
(402, 104, '2024-05-03'), -- livro inexistente
(403, 105, '2024-05-04'); -- livro inexistente
-- Empréstimos-Leitores
INSERT INTO emprestimos_leitores VALUES
(400, 500),
(401, 501),
(403, 503); -- leitor inexistente

-- 1. INNER JOIN: Liste todos os empréstimos com nome do leitor e título do livro
SELECT emprestimos.id_emprestimo, livros.titulo AS livro, leitores.nome_leitor AS leitor
FROM emprestimos_leitores
INNER JOIN emprestimos ON emprestimos_leitores.id_emprestimo = emprestimos.id_emprestimo
INNER JOIN livros ON emprestimos.id_livro = livros.id_livro
INNER JOIN leitores ON emprestimos_leitores.id_leitor = leitores.id_leitor;

-- 2. LEFT JOIN: Mostre todos os livros com o nome do autor, mesmo os que não foram emprestados.
SELECT livros.titulo AS livro, autores.nome_autor AS autor
FROM livros
LEFT JOIN autores ON livros.id_autor = autores.id_autor;

-- 3. RIGHT JOIN: Liste todos os autores, mesmo que não tenham livros publicados
SELECT livros.titulo AS livro, autores.nome_autor AS autor
FROM livros
RIGHT JOIN autores ON livros.id_autor = autores.id_autor;

-- 4. FULL OUTER JOIN (simulado): Liste todos os livros e editoras, mesmo que o livro não 
-- tenha editora ou a editora não tenha livro.
SELECT livros.titulo AS livro, editoras.nome_editora AS editora
FROM livros 
LEFT JOIN editoras ON livros.id_editora = editoras.id_editora
UNION
SELECT livros.titulo AS livro, editoras.nome_editora AS editora
FROM livros 
RIGHT JOIN editoras ON livros.id_editora = editoras.id_editora;

-- 5. CROSS JOIN: Mostre todas as combinações possíveis entre leitores e livros
SELECT livros.titulo AS livro, leitores.nome_leitor
FROM livros 
CROSS JOIN leitores;

-- 6. UNION: Mostre todos os nomes de autores e nomes de editoras numa única coluna
SELECT autores.nome_autor AS autor FROM autores
UNION
SELECT editoras.nome_editora AS editora FROM editoras;

-- 7. LEFT JOIN com erro: Liste os empréstimos com título dos livros (para testar se aparece 
-- NULL nos inválidos).
SELECT emprestimos.id_emprestimo AS emprestimo, livros.titulo AS livro
FROM emprestimos
LEFT JOIN livros ON emprestimos.id_livro = livros.id_livro;

-- 8. INNER JOIN com erro: Tente juntar empréstimos com leitores — o leitor 503 não existe, 
-- e será descartado
SELECT emprestimos.id_emprestimo AS emprestimo, leitores.nome_leitor AS leitor
FROM emprestimos_leitores
INNER JOIN emprestimos ON emprestimos_leitores.id_emprestimo = emprestimos.id_emprestimo
INNER JOIN  leitores ON emprestimos_leitores.id_leitor = leitores.id_leitor;

-- 9. Exiba todos os livros com o nome da editora, mesmo que a editora não tenha publicado 
-- nenhum livro.
SELECT livros.titulo AS livro, editoras.nome_editora
FROM editoras
LEFT JOIN livros ON livros.id_editora = editoras.id_editora;

-- 10.Liste todos os leitores e os livros que eles pegaram emprestado, se houver
SELECT leitores.nome_leitor, livros.titulo
FROM emprestimos_leitores
INNER JOIN emprestimos ON emprestimos_leitores.id_emprestimo = emprestimos.id_emprestimo
RIGHT JOIN livros ON emprestimos.id_livro = livros.id_livro
RIGHT JOIN leitores ON emprestimos_leitores.id_leitor = leitores.id_leitor;

-- 11.Mostre os nomes de todos os autores e os títulos de seus livros. Inclua também autores 
-- que ainda não têm livros cadastrados
SELECT autores.nome_autor AS autor, livros.titulo AS livro
FROM livros
RIGHT JOIN autores ON livros.id_autor = autores.id_autor;


select * from livros;
select * from  emprestimos_leitores;
select * from  emprestimos;
select * from leitores;
select * from autores;
select * from editoras;