-- Banco:
DROP DATABASE bibliotecaonline;
CREATE DATABASE bibliotecaonline;
USE bibliotecaonline;

-- Tabela: Autores (IDs de 100+)
CREATE TABLE Autores (
 id INT PRIMARY KEY,
 nome VARCHAR(100)
);

INSERT INTO Autores (id, nome) VALUES
(101, 'Machado de Assis'),
(102, 'Monteiro Lobato'),
(103, 'Clarice Lispector'),
(104, 'Paulo Coelho');

-- Tabela: Editoras (IDs de 200+)
CREATE TABLE Editoras (
 id INT PRIMARY KEY,
 nome VARCHAR(100)
);

INSERT INTO Editoras (id, nome) VALUES
(201, 'Companhia das Letras'),
(202, 'Editora Globo'),
(203, 'Rocco'),
(204, 'Saraiva');

-- Tabela: Livros (IDs de 300+)
CREATE TABLE Livros (
 id INT PRIMARY KEY,
 titulo VARCHAR(100),
 id_autor INT,
 id_editora INT,
 ano_publicacao INT,
 FOREIGN KEY (id_autor) REFERENCES Autores(id),
 FOREIGN KEY (id_editora) REFERENCES Editoras(id)
);

INSERT INTO Livros (id, titulo, id_autor, id_editora, ano_publicacao) VALUES
(301, 'Dom Casmurro', 101, 201, 1899),
(302, 'O Alienista', 101, 201, 1882),
(303, 'Reinações de Narizinho', 102, 204, 1931),
(304, 'A Hora da Estrela', 103, 203, 1977),
(305, 'O Alquimista', 104, 202, 1988);

-- Tabela: Leitores (IDs de 400+)
CREATE TABLE Leitores (
 id INT PRIMARY KEY,
 nome VARCHAR(100)
);

INSERT INTO Leitores (id, nome) VALUES
(401, 'Ana Clara'),
(402, 'Bruno Martins'),
(403, 'Carlos Souza');

-- Tabela: Emprestimos (IDs de 500+)
CREATE TABLE Emprestimos (
 id INT PRIMARY KEY,
 id_livro INT,
 id_leitor INT,
 data_emprestimo DATE,
 data_devolucao DATE,
 FOREIGN KEY (id_livro) REFERENCES Livros(id),
 FOREIGN KEY (id_leitor) REFERENCES Leitores(id)
);

INSERT INTO Emprestimos (id, id_livro, id_leitor, data_emprestimo, data_devolucao) VALUES
(501, 301, 401, '2025-05-01', '2025-05-10'),
(502, 304, 401, '2025-05-05', NULL),
(503, 303, 402, '2025-05-02', '2025-05-09');

-- Mostre o título e o ano de publicação dos livros cuja editora é “Companhia 
-- das Letras”.
SELECT titulo, ano_publicacao FROM livros WHERE id_editora IN (SELECT id FROM editoras WHERE nome = "Companhia das Letras");

-- Liste os nomes dos autores que possuem livros da editora “Rocco”.
-- (subconsulta no Where)
SELECT autores.nome FROM livros 
INNER JOIN autores 
ON livros.id_autor = autores.id 
WHERE id_editora IN (SELECT id FROM editoras WHERE nome = "Rocco");

-- Mostre os títulos dos livros que foram emprestados por algum leitor com o 
-- nome “Ana Clara”. (subconsulta da subconsulta no Where)
SELECT titulo FROM livros 
where id 
IN (select id_livro from emprestimos where id_leitor = (select id from leitores where nome = "Ana Clara"));

-- Mostre os livros que ainda estão emprestados (sem data de devolução).A 
-- subconsulta deve retornar os IDs dos livros em aberto.
SELECT titulo FROM livros WHERE id in (select id_livro FROM emprestimos WHERE data_devolucao IS NULL);

--  Mostre os nomes dos autores que escreveram livros que ainda estão 
-- emprestados (sem data de devolução). (subconsulta da subconsulta no Where)
SELECT nome FROM autores WHERE id IN (SELECT id_autor FROM livros WHERE id IN (SELECT id_livro FROM emprestimos WHERE data_devolucao IS NULL));

-- Liste os nomes dos leitores que ainda têm livros emprestados.(subconsulta no Where)
SELECT nome FROM leitores WHERE id IN (SELECT id_leitor FROM emprestimos WHERE data_devolucao IS NULL);

-- Liste os livros com o nome da editora ao lado, usando subconsulta no SELECT.
SELECT titulo, (select nome from editoras WHERE id = livros.id_editora) from livros;

-- Liste os nomes e títulos de livros emprestados atualmente, usando uma subconsulta no FROM.
SELECT nome, titulo from (select nome, titulo from emprestimos join leitores on emprestimos.id_leitor = leitores.id join livros on emprestimos.id_livro = livros.id where data_devolucao IS NULL) as emprestimo_atual;

--  Mostre os nomes das editoras que publicaram livros emprestados, usando uma subconsulta no FROM.
SELECT nome from (select nome from editoras join livros on editoras.id = livros.id_editora join emprestimos on emprestimos.id_livro = livros.id) as editoras;