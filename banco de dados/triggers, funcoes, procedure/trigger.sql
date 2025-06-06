-- 4. Exercício de Trigger:
-- Pergunta:
-- Crie um trigger chamado RegistrarAlteracaoNota que:
-- Seja acionado após a atualização de uma nota na tabela Nota.
-- Registre, na tabela LogAlteracoes, a seguinte descrição: "Nota do aluno X na disciplina Y foi alterada para Z em [data]".
-- Este log deve ser gerado sempre que a nota de um aluno for modificada.
-- Dica: Você deve usar as tabelas Aluno, Disciplina e Nota para coletar as informações necessárias para o log.

DELIMITER $$
CREATE TRIGGER RegistrarAlteracaoNota
AFTER UPDATE ON nota
FOR EACH ROW
	BEGIN
		INSERT INTO LogAlteracoes (descricao) 
        SELECT concat("Nota do aluno: ", aluno.nome, " na disciplina: ", disciplina.nome, " foi alterada para: ", NEW.nota, " no dia ", CURDATE()) 
        from matricula 
        join nota n on n.matricula_id = matricula.id
        join disciplina on disciplina.id = matricula.disciplina_id
        join aluno on aluno.id = matricula.aluno_id
        WHERE n.id = NEW.id;
	END $$
    
DELIMITER ;

UPDATE nota SET nota = 5 where matricula_id = 1;
select * from LogAlteracoes;
drop trigger RegistrarAlteracaonota;


    
	