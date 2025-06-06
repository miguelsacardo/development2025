CREATE DATABASE IF NOT EXISTS desempenho;
USE desempenho;
-- Criação da tabela
CREATE TABLE pedidos (
 id INT AUTO_INCREMENT PRIMARY KEY,
 cliente VARCHAR(100),
 produto VARCHAR(100),
 data_pedido DATE,
 valor DECIMAL(10,2)
);
-- Inserção de dados simulados
-- Gere 10.000 registros com este gerador automático
DELIMITER $$
CREATE PROCEDURE gerar_pedidos()
BEGIN
 DECLARE i INT DEFAULT 1;
 WHILE i <= 2000 DO
 INSERT INTO pedidos (cliente, produto, data_pedido, valor)
 VALUES (
 CONCAT('Cliente', FLOOR(1 + (RAND() * 500))),
 CONCAT('Produto', FLOOR(1 + (RAND() * 100))),
 DATE_ADD('2020-01-01', INTERVAL FLOOR(RAND()*1500) DAY),
 ROUND(RAND()*1000, 2)
 );
	SET i = i + 1;
    END WHILE;
END $$
DELIMITER ;

CALL gerar_pedidos();
DROP PROCEDURE gerar_pedidos;

-- 1. Execute uma consulta simples sem índice:
select * from pedidos where cliente = 'Cliente250';

-- 2. Use EXPLAIN para analisar como o MySQL executa a consulta acima.
EXPLAIN SELECT * FROM pedidos where cliente = 'Cliente250';
-- resposta: type: ALL, ROWS: 2000, possible_keys: NULL

-- 3. Crie um índice chamado idx_cliente na coluna cliente.
CREATE INDEX idx_cliente ON pedidos(cliente);

-- 4. Repita a consulta do exercício 1 e use novamente o EXPLAIN.
EXPLAIN SELECT * FROM pedidos WHERE cliente = 'Cliente250';
-- RESPOSTA: agora, o type: ref (está usando o índice), rows: 3 (menos rows analisadas) e possible_keys: idx_cliente (o index está sendo considerado)

-- 5. Execute esta consulta com filtro por valor (sem índice):
SELECT * FROM pedidos WHERE valor > 900;
EXPLAIN SELECT * FROM pedidos WHERE valor > 900;
-- RESPOSTA: type: ALL, rows: 2000, possible_keys: null

CREATE INDEX idx_valor ON pedidos(valor);
EXPLAIN SELECT * FROM pedidos WHERE valor > 900;
-- RESPOSTA: type: range (só as colunas no range são retornadas), rows: 195, possible_keys: idx_valor(index considerado)

-- 6. Remova o índice idx_cliente e confirme a remoção com SHOW INDEX FROM pedidos.
DROP INDEX idx_cliente ON pedidos;
SHOW INDEX FROM pedidos;