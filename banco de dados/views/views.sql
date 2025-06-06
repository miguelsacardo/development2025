-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS empresa;
USE empresa;
-- Criar tabela clientes
CREATE TABLE clientes (
 id INT AUTO_INCREMENT PRIMARY KEY,
 nome VARCHAR(100),
 email VARCHAR(100),
 cidade VARCHAR(100),
 estado CHAR(2)
);

-- Inserir dados fictícios
INSERT INTO clientes (nome, email, cidade, estado) VALUES
('Ana Silva', 'ana.silva@email.com', 'Campinas', 'SP'),
('Bruno Souza', 'bruno.souza@email.com', 'Belo Horizonte', 'MG'),
('Carla Mendes', 'carla.mendes@email.com', 'São Paulo', 'SP'),
('Diego Rocha', 'diego.rocha@email.com', 'Rio de Janeiro', 'RJ'),
('Eduarda Lima', 'eduarda.lima@email.com', 'Sorocaba', 'SP'),
('Fernando Alves', 'fernando.alves@email.com', 'Curitiba', 'PR');

-- 1. Crie a VIEW clientes_sp com clientes do estado de SP
create view clientes_sp as
select * 
from clientes
where estado = 'SP';

-- 2. Consulte a VIEW clientes_sp usando SELECT *.
select * from clientes_sp;

-- 3. Crie a VIEW clientes_upper com nomes em letras maiúsculas (UPPER).
create view clientes_upper as
select UPPER(nome) as nome
from clientes;
select * from clientes_upper;

-- 4. Tente dar UPDATE na VIEW clientes_upper. O que acontece?
UPDATE clientes_upper SET nome = LOWER(nome);

-- 5. Crie a VIEW clientes_editaveis com id, nome e cidade. Altere a cidade de um cliente pela VIEW.
create view clientes_editaveis as
select id, nome, cidade
from clientes;
UPDATE clientes_editaveis SET cidade = "Hortolândia" WHERE nome = "ana silva";

-- 6. Liste as VIEWs criadas e veja o SQL da clientes_editaveis usando SHOW FULL TABLES e SHOW CREATE VIEW.
show full tables where table_type = "VIEW";
show create view clientes_editaveis;
