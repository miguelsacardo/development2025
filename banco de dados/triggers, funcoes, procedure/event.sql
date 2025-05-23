-- 2. Exercício de Event:
-- Pergunta:
-- Crie um evento chamado EnviarRelatorioNotas que:
-- Seja executado todos os dias, às 8h da manhã.
-- Gere um relatório com as notas do dia anterior (usando a tabela Nota).
-- Após gerar o relatório, registre no log, na tabela LogAlteracoes, a descrição "Relatório de notas do dia X foi gerado e enviado às 08:00".
-- Dica: O evento deve verificar as notas do dia anterior usando CURDATE() - INTERVAL 1 DAY.
SET GLOBAL event_scheduler = ON;

DELIMITER $$
CREATE EVENT IF NOT EXISTS EnviarRelatorioNotas
ON SCHEDULE EVERY '1' DAY STARTS '08:00:00' ON COMPLETION PRESERVE ENABLE
DO
BEGIN
	SELECT * FROM nota WHERE curdate() - 1;
    INSERT INTO LogAlteracoes(descricao) VALUES
    
    