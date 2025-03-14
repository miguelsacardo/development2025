CREATE DATABASE biblioteca;
USE biblioteca;

CREATE TABLE Usuario(
	id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    numero_identificacao INT NOT NULL,
    email VARCHAR(100),
    data_registro DATE,
    id_nivel INT NOT NULL,
    FOREIGN KEY (id_nivel) REFERENCES Nivel(id_nivel) -- chave estrangeira que ligará o nível do usuario
);

CREATE TABLE Nivel(
	id_nivel INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo_nivel VARCHAR(50)
);

CREATE TABLE Livro(
	id_livro INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    isbn VARCHAR(255),
    descricao TEXT
);

CREATE TABLE livro_autor(
	id_livroautor INT AUTO_INCREMENT PRIMARY KEY,
    id_autor INT NOT NULL,
    id_livro INT NOT NULL,
    FOREIGN KEY (id_autor) REFERENCES autor(id_autor),
    FOREIGN KEY (id_livro) REFERENCES livro(autorautorid_livro)
);

CREATE TABLE Emprestimo(
	id_emprestimo INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    data_inicio DATE,
    data_retorno DATE,
    id_livro INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_livro) REFERENCES Livro(id_livro),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Categoria_livro(
	id_categorialivro INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_categoria INT NOT NULL,
    id_livro INT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria),
    FOREIGN KEY (id_livro) REFERENCES Livro(id_livro)
);

CREATE TABLE Categoria(
	id_categoria INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo_categoria VARCHAR(50)
);

CREATE TABLE Autor(
	id_autor INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    data_nascimento DATE, -- accept values in yyyy-mm-dd format
    biografia MEDIUMTEXT
);

-- alter table
-- ALTER TABLE livro RENAME COLUMN decricao TO descricao;

-- INSERT VALUES IN TABLES
-- TABELA LIVRO
INSERT INTO livro(titulo, isbn, descricao) VALUES ("Harry Potter e a Pedra Filosofal", "9780439554930", "O livro conta a história de Harry Potter, um órfão criado pelos tios que descobre, em seu décimo primeiro aniversário, que é um bruxo."),
("O Último Desejo", "9782811205065", "O Último Desejo é o primeiro dos dois livros que colecionam contos do escritor de fantasia Andrzej Sapkowski e que antecedem os romances da série Wiedźmin."),
("One Piece Vol.1", "9788925285641", "Luffy é um garoto que deseja tornar-se um pirata por causa do Shanks."),
("Naruto Vol.1", "9783551762511", "Naruto é o garoto mais problemático da Academia Ninja e está sempre aprontando todas!"),
("Death Note - Black Edition Vol.1", "9781421539645", "Sem nada de interessante para fazer no Mundo dos Shinigamis, o Deus da Morte Ryuk deixa cair intencionalmente na Terra o seu Death Note"),
("It - A Coisa", "9788560280940", "Nesse clássico que inspirou os filmes da Warner, um grupo de amigos conhecido como Clube dos Otários aprende o real sentido da amizade, do amor, da confiança... e do medo.");

-- TABELA AUTOR
INSERT INTO autor(nome, data_nascimento, biografia) VALUES
("JK Rowling", "1965-07-31", "Joanne 'Jo' Rowling OBE FRSL, mais conhecida como J. K. Rowling, é uma escritora, roteirista e produtora cinematográfica britânica, notória por escrever a série de livros Harry Potter."),
("Andrzej Sapkowski", "1948-06-21", "Andrzej Sapkowski é um escritor polonês do gênero fantasia, conhecido por criar the witcher."),
("Eiichiro Oda", "1975-01-01", "Eiichiro Oda é um mangaká, sendo mais conhecido como criador da série One Piece."),
("Masashi Kishimoto", "1974-11-08", "Masashi Kishimoto é um mangaká japonês. Entre seus maiores trabalhos está o mangá Naruto."),
("Takeshi Obata", "1969-02-11", "Takeshi Obata é um mangaká japonês que normalmente trabalha como ilustrador em colaboração com um escritor."),
("Tsugumi Ohba", "1962-01-01", "Tsugumi Ohba é um roteirista de mangá. Até agora, suas únicas obras conhecidas são Death Note, Bakuman e Platinum End, o que faz muitos acreditarem que 'Tsugumi Ohba' seja apenas um pseudônimo de um escritor mais famoso."),
("Stephen King", "1947-09-21", "Stephen Edwin King é um escritor norte-americano de terror, ficção sobrenatural, suspense, ficção científica e fantasia.");

-- tabela livro_autor
INSERT INTO livro_autor(id_autor, id_livro) VALUES 
(8, 1), (9, 2), (10, 3), (11, 4), (12, 5), (13, 5), (14, 6);

-- Tabela categoria
INSERT INTO categoria(tipo_categoria) VALUES ("Infantil"), ("Aventura"), ("Mangá"), ("Adolescente"), ("Terror");

-- TABELA categoria_livro
INSERT INTO categoria_livro(id_categoria, id_livro) VALUES (1, 1), (2, 1), (2, 2), (4, 2), (3, 3), (2, 3), (3, 4), (2, 4), (4, 5), (5, 5), (5, 6), (4, 6);

-- tabela nivel
INSERT INTO nivel(tipo_nivel) VALUES ("NORMAL"), ("PREMIUM"), ("ADMIN");

-- tabela usuario
INSERT INTO usuario(nome, numero_identificacao, email, data_registro, id_nivel) VALUES
("USER_1", 1, "user1@email", "2025-03-14", 1),
("USER_2", 24, "user2@email", "2025-03-14", 2),
("USER_3", 4, "user3@email", "2025-03-14", 3);

-- tabela emprestimo
INSERT INTO emprestimo(data_inicio, data_retorno, id_livro, id_usuario) VALUES
("2025-01-15", "2025-02-25", 1, 3),
("2025-02-24", "2025-03-02", 4, 2),
("2025-02-01", "2025-02-10", 2, 1),
("2025-02-01", "2025-02-10", 2, 3);

-- CONSULTAS
SELECT * FROM emprestimo;
SELECT * FROM Usuario;
SELECT * FROM Livro;
SELECT * FROM Categoria;
SELECT * FROM categoria_livro;
SELECT * FROM Autor;
SELECT * FROM livro_autor;
SELECT * FROM nivel;

-- TESTANTO INNER JOINS
SELECT LIVRO.TITULO, CATEGORIA.TIPO_CATEGORIA
FROM CATEGORIA_LIVRO INNER JOIN LIVRO ON CATEGORIA_LIVRO.ID_LIVRO = LIVRO.ID_LIVRO
INNER JOIN CATEGORIA ON CATEGORIA_LIVRO.ID_CATEGORIA = CATEGORIA.ID_CATEGORIA;

SELECT LIVRO.TITULO, USUARIO.NOME FROM EMPRESTIMO INNER JOIN LIVRO ON EMPRESTIMO.ID_LIVRO = LIVRO.ID_LIVRO
INNER JOIN USUARIO ON EMPRESTIMO.ID_USUARIO = USUARIO.ID_USUARIO;


