import { useEffect, useState } from "react";
import axios from "axios";
import ModalDisciplinas from "../modal_subjects";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import "./style.css";

export default function Subjects() {
  // para fazer manipulação do estado dos dados que são obtidos da API
  const [disciplinas, setDisciplinas] = useState([]);

  // manipulando o estado do Modal e setando o estado da disciplina selecionada
  const[modalOpen, setModalOpen] = useState(false);
  const[disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);

  // pegando token do localstorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const getAllSubjects = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/disciplinas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDisciplinas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // chamando a função ainda dentro do useEffect
    getAllSubjects();
  }, []);

  const deleteSubject = async (disciplina) =>{
    if(window.confirm(`Tem certeza que deseja excluir a disciplina ${disciplina.nome_completo}?`)){
        try {
            await axios.delete(`http://127.0.0.1:8000/api/disciplinas/id/${disciplina.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            setDisciplinas(disciplinas.filter((nova_disciplina)=> nova_disciplina.id !== disciplina.id));
        } catch (error) {
            console.error(error);
        }
    }
  }

  const create = async () =>{
    console.log("chamando a função de criar!")
  }

  const update = async (disciplinaAtualizada)=>{
    console.log(`Id selecionado no atualizar: ${disciplinaAtualizada.id}`)
  }

  return (
    <main>
      {disciplinas.map((disciplina) => (
        <div className="content_area">
          <div><h2>Nome da disciplina: {disciplina.nome_completo}</h2></div>
          <div><h2>Sigla: {disciplina.sigla}</h2></div>
          <div><h2>Semestre: {disciplina.semestre}</h2></div>
          <div><h2>Carga horária: {disciplina.cargahoraria}</h2></div>

          <div className="buttons">
            <button onClick={() => {setModalOpen(true), setDisciplinaSelecionada(disciplina)}}>
                <FaPencilAlt/>
            </button>

            <button onClick={() => deleteSubject(disciplina)}> {/* aqui eu passo a propria disciplina sem o ".id" para que a função possa acessar outros dados do objeto alem do id*/}
                <FaTrashAlt/>
            </button>

            <ModalDisciplinas
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                disciplinaSelecionada={disciplinaSelecionada}
                setDisciplinaSelecionada={setDisciplinaSelecionada}
                create={create}
                update={update}
            />
          </div>
        </div>
      ))}
    </main>
  );
}
