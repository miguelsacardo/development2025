import { useEffect, useState } from "react";
import axios from "axios";
import ModalDisciplinas from "../modal_subjects";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import "./style.css";

export default function Subjects() {
  // para fazer manipulação do estado dos dados que são obtidos da API
  const [disciplinas, setDisciplinas] = useState([]);

  // manipulando o estado do Modal e setando o estado da disciplina selecionada
  const [modalOpen, setModalOpen] = useState(false);
  const [disciplinaSelecionada, setDisciplinaSelecionada] = useState(null);

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

  const deleteSubject = async (disciplina) => {
    if (
      window.confirm(
        `Tem certeza que deseja excluir a disciplina ${disciplina.nome_completo}?`
      )
    ) {
      try {
        await axios.delete(
          `http://127.0.0.1:8000/api/disciplinas/id/${disciplina.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDisciplinas(
          disciplinas.filter(
            (nova_disciplina) => nova_disciplina.id !== disciplina.id
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  // creates a new subject
  const create = async (novaDisciplina) => {
    
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/disciplinas",
        {
          nome_completo: novaDisciplina.nome_completo,
          sigla: novaDisciplina.sigla,
          semestre: novaDisciplina.semestre,
          cargahoraria: novaDisciplina.cargahoraria,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // mantém o resto das disciplinas e cadastra uma nova
      // ele nao tira as disciplinas do banco, mas se nao ter spread, elas somem do front end
      // entao essa linha mantém os cadastros anteriores e adiciona mais uma na lista
      setDisciplinas([...disciplinas, response.data]);
      setModalOpen(false);
      console.log(novaDisciplina.nome_completo)
    } catch (error) {
      console.error(error);
    }
  };

  // atualiza um registro existente. O modal de disciplinas recebe um valor e identifica que é uma atualização
  const update = async (disciplinaAtualizada) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/disciplinas/id/${disciplinaAtualizada.id}`,
        {
          nome_completo: disciplinaAtualizada.nome_completo,
          sigla: disciplinaAtualizada.sigla,
          semestre: disciplinaAtualizada.semestre,
          cargahoraria: disciplinaAtualizada.cargahoraria,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // quando ele encontrar o registro da disciplina que for igual ao novo registro da disciplina atualizada,
      // ele atualiza a disciplina
      setDisciplinas(
        disciplinas.map((disciplina) =>
          disciplina.id === disciplinaAtualizada.id
            ? disciplinaAtualizada
            : disciplina
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <main>
      {disciplinas.map((disciplina) => (
        <div className="content_area" key={disciplina.id}>
          <div>
            <h2>Nome da disciplina: {disciplina.nome_completo}</h2>
          </div>
          <div>
            <h2>Sigla: {disciplina.sigla}</h2>
          </div>
          <div>
            <h2>Semestre: {disciplina.semestre}</h2>
          </div>
          <div>
            <h2>Carga horária: {disciplina.cargahoraria}</h2>
          </div>

          <div className="buttons">
            <button
              onClick={() => {
                setModalOpen(true), setDisciplinaSelecionada(disciplina);
              }}
            >
              <FaPencilAlt />
            </button>

            <button onClick={() => deleteSubject(disciplina)}>
              {" "}
              {/* aqui eu passo a propria disciplina sem o ".id" para que a função possa acessar outros dados do objeto alem do id*/}
              <FaTrashAlt />
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

      <div className="create-btn">
        <button
          onClick={() => {
            // aqui, o disciplicaSelecionada deve ser null porque ele ativará o modal de "create"
            setModalOpen(true), setDisciplinaSelecionada(null);
          }}
        >
          <CgAdd className="btn-icons" />
        </button>
      </div>
    </main>
  );
}
