-- 2. Exercício de Function:
-- Pergunta:
-- Crie uma função chamada CalcularMediaDisciplina que, dado o id de uma disciplina, retorna a média das notas dos alunos matriculados nela.
-- Dica: A função deve calcular a média das notas presentes na tabela Nota para cada aluno da disciplina especificada.

DELIMITER $$
CREATE FUNCTION CalcularMediaDisciplina(id_disc INT) RETURNS decimal(3,2) deterministic
BEGIN
	declare media DECIMAL(3,2);
    
    set media =(
		SELECT avg(nota) 
		from nota
		join matricula on nota.matricula_id = matricula.id
		join disciplina on matricula.disciplina_id = disciplina.id where disciplina.id = id_disc);
    return media;
END $$
DELIMITER ;

drop function  CalcularMediaDisciplina;
select nome, CalcularMediaDisciplina(id) as média from disciplina;
