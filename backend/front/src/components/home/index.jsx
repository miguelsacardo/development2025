import axios from "axios";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import "./style.css";
import ModalProfessores from "../modal";
import Head from "../head";
import Footer from "../footer";

export default function Home() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [professorSelecionado, setProfessorSelecionado] = useState(null);

  const [texto, setTexto] = useState('')
  const [id, setid] = useState('')

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
  }, []);

  const atualizar = async (professorAtualizado) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/id/${professorAtualizado.id}`,
        {
          ni: professorAtualizado.ni,
          nome: professorAtualizado.nome,
          email: professorAtualizado.email,
          cel: professorAtualizado.cel,
          ocup: professorAtualizado.ocup
        },{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setDados(dados.map((professor)=>professor.id === professorAtualizado.id ? professorAtualizado: professor))
      setModalOpen(false)
    } catch (error) {
      console.error(error)
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
      setDados([...dados, novoProfessor]);
      setModalOpen(false);
      console.log(response);
    } catch (error) {}
  };

  const search = async (texto)=>{
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/search/?search=${texto}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        setProfessorSelecionado(response.data[0])
      } catch (error) {
        console.error(error)
      }
  }
  const searchById = async (id)=>{
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/id/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        
        setProfessorSelecionado(response.data)
      } catch (error) {
        console.error(error)
      }
  }

  return (
    <>
      <div>
        <Head/>
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
                <button onClick={() => { setModalOpen(true), setProfessorSelecionado(professor)}}>
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
          onChange={(e) =>{setTexto(e.target.value); setid(e.target.value)}}
          />
        </div>
        <div>
          <CiSearch className="procurar" onClick={()=>{searchById(id), search(texto), setModalOpen(true)}}/>
        </div>

        <ModalProfessores
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          professorSelecionado={professorSelecionado}
          setProfessorSelecionado={setProfessorSelecionado}
          criar={criar}
          atualizar={atualizar}
        />
        <Footer/>
      </div>
      {/* buttons */}
    </>
  );
}
