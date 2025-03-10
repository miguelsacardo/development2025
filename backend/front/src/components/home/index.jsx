import axios from "axios"; // serve para utilizar os endpoints
import { useEffect, useState } from "react";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import "./style.css";
import ModalProfessores from "../modal";
import Head from "../head";
import Footer from "../footer";

export default function Home() {
  const [dados, setDados] = useState([]); // posso colocar vários valores na lista
  const [modalOpen, setModalOpen] = useState(false); // o fato de ser constante -> o useState armazena e altera o valor de um estado

  // o local storage é uma "cache" do navegador
  const token = localStorage.getItem("token");
  const [professorSelecionado, setProfessorSelecionado] = useState(null);

  const [texto, setTexto] = useState("");
  

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/professores",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDados(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados: ", error);
      }
    };

    fetchData();
  }, []); //essa lista no final é para colocar quais estados você está manipulando no useEffect

  const atualizar = async (professorAtualizado) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/id/${professorAtualizado.id}`,
        {
          ni: professorAtualizado.ni,
          nome: professorAtualizado.nome,
          email: professorAtualizado.email,
          cel: professorAtualizado.cel,
          ocup: professorAtualizado.ocup,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // a variável professor vem com todos os dados e eles são organizados na tela
      // professor.id -> cada linha vai ser um professor, então cada ID de cada professor será comparado com o ID do professor atualizado
      // quando o professor.id for igual ao professorAtualizado.id, ele atualiza o professor (professorAtualizado), senão ele continua sendo o mesmo (professor)
      setDados(
        dados.map((professor) =>
          professor.id === professorAtualizado.id
            ? professorAtualizado
            : professor
        )
      );
      setModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const apagar = async (id) => {
    if (window.confirm("Tem certeza? ")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDados(dados.filter((professor) => professor.id !== id));
        // esse filtro monta uma nova lista de dados de todos os professores, mas sem incluir o professor que tem o ID que foi apagado
      } catch (error) {
        console.error(error);
      }
    }
  };

  const criar = async (novoProfessor) => {
    console.log("novoProfessor: ", novoProfessor);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/professores",
        {
          ni: novoProfessor.ni,
          nome: novoProfessor.nome,
          email: novoProfessor.email,
          cel: novoProfessor.cel,
          ocup: novoProfessor.ocup,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // o spread ("...") mantém o resto dos registros do banco normalmente e adiciona um novo professor
      setDados([...dados, novoProfessor]);
      setModalOpen(false);
      console.log(response);
    } catch (error) {}
  };

  const search = async (texto) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/search/?search=${texto}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfessorSelecionado(response.data[0]);
    } catch (error) {
      console.error(error);
    }
  };
  const searchById = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfessorSelecionado(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <Head />
        <ul>
          {dados.map((professor) => (
            <div className="content">
              <div className="lista">
                <li key={professor.id}>
                  {professor.nome} | {professor.email} | {professor.cel} |{" "}
                  {professor.ocup}
                </li>
              </div>

              <div className="btn-lista">
                <button
                  onClick={() => {
                    setModalOpen(true), setProfessorSelecionado(professor);
                  }}
                >
                  <FaPencilAlt />
                </button>
                <button onClick={() => apagar(professor.id)}>
                  <FaRegTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>

      <div className="buttons-crud-methods">
        <button
          onClick={() => {
            setModalOpen(true), setProfessorSelecionado(null);
          }}
        >
          <CgAdd className="btn-icons" />
        </button>

        <div>
          <input
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value);
            }}
          />
        </div>
        <div>
          <CiSearch
            className="procurar"
            onClick={() => {
              const num = Number(texto);
              if (typeof num === "number")
                searchById(num);
              else
                search(texto);

              setModalOpen(true);
            }}
          />
        </div>

        <ModalProfessores
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          professorSelecionado={professorSelecionado}
          setProfessorSelecionado={setProfessorSelecionado}
          criar={criar}
          atualizar={atualizar}
        />
        <Footer />
      </div>
      {/* buttons */}
    </>
  );
}
