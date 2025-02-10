import axios from "axios";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import "./style.css";
import ModalProfessores from "../modal";


export default function Home() {
  const [dados, setDados] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [create, setCreate] = useState({
    ni: "",
    nome: "",
    email: "",
    cel: "",
    ocup: ""
  })
  const[professorSelecionado, setProfessorSelecionado] = useState([])


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

  const editar = async (id) => {console.log(id)};


  const handleInput = (event) => {
    setCreate({ ...create, [event.target.name]: event.target.value })
  }

  const criar = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/professores",
        create, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log(response)
    } catch (error) {

    }

  }


  const apagar = async (id) => {
    if (window.confirm("Tem certeza? ")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/id/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        )
        setDados(dados.filter(professor => professor.id !== id))
      } catch (error) {
        console.error(error)
      }
    }
  }

  const ModalProfessores = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <button className="close-button" onClick={onClose}>×</button>
          <h2>Cadastro de Professor</h2>
          <input type="text" placeholder="NI" value={create.ni} onChange={handleInput} name="ni" />
          <input type="text" placeholder="Nome" value={create.nome} onChange={handleInput} name="nome" />
          <input type="email" placeholder="Email" value={create.email} onChange={handleInput} name="email" />
          <input type="tel" placeholder="Celular" value={create.cel} onChange={handleInput} name="cel" />
          <input type="text" placeholder="Ocupação" value={create.ocup} onChange={handleInput} name="ocup" />
          <button type="submit" onClick={criar}>Salvar</button>
        </div>
      </div>
    );
  };



  return (
    <>
      <div>
        <ul>
          {dados.map((professor) => (
            <div className="content">
              <div className="lista">
                <li key={professor.id}>
                  {professor.nome} | {professor.email} | {professor.cel} | {professor.ocup}
                </li>
              </div>

              <div className="btn-lista">
                <button onClick={() => editar(professor.id)}>
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
        <button onClick={() => setModalOpen(true)}>
          <CgAdd className="btn-icons" />
        </button>

        <ModalProfessores isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
      {/* buttons */}
    </>
  );
}
