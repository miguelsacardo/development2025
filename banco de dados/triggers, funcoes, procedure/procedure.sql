-- Crie uma stored procedure chamada ObterDesempenhoAluno, que, dado o id de um aluno, retorna:
-- O nome do aluno.
-- A média das suas notas nas disciplinas em que está matriculado.
-- A quantidade de faltas do aluno (considerando que presente = FALSE na tabela Presenca indica falta).
-- Dica: Use as tabelas Nota para calcular a média das notas e Presenca para contar as faltas.
DELIMITER $$
CREATE PROCEDURE ObterDesempenhoAluno(IN alunoId INT)
BEGIN
	SELECT aluno.nome as Aluno, ROUND(AVG(nota.nota),2) as Nota, (select count(*) from presenca where matricula_id = matricula.id and presente = false) as Falta
	FROM matricula 
	JOIN aluno ON matricula.aluno_id = aluno.id
	JOIN nota ON matricula.id = nota.matricula_id
    JOIN presenca ON matricula.id = presenca.matricula_id
    where aluno.id = alunoid
    GROUP BY aluno.nome,
    Presenca;
END $$
DELIMITER ; 

drop procedure  ObterDesempenhoAluno;
CALL ObterDesempenhoAluno(1);