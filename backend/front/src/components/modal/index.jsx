import React, { useEffect, useState } from "react";
import axios from "axios";
import './style.css'

const ModalProfessores = ({
  isOpen,
  onClose,
  professorSelecionado,
  criar,
  atualizar,
}) => {
  if (!isOpen) return null;
  console.log("Prof selecionado: ", professorSelecionado);

  const [id, setId] = useState([professorSelecionado?.id || ""]);
  // Aqui estamos criando um estado chamado 'id', que começa com um array contendo o valor de `professorSelecionado?.id`.
  // - Se `professorSelecionado` for definido e tiver um `id`, o estado será um array com esse `id`.
  // - Se `professorSelecionado` não for definido ou não tiver um `id`, o estado será um array com uma string vazia (['']).
  // Isso permite que o estado 'id' seja configurado de acordo com a seleção do professor.

  const [ni, setNi] = useState(professorSelecionado?.ni || "");
  const [nome, setNome] = useState(professorSelecionado?.nome || "");
  const [email, setEmail] = useState(professorSelecionado?.email || "");
  const [cel, setCel] = useState(professorSelecionado?.cel || "");
  const [ocup, setOcup] = useState(professorSelecionado?.ocup || "");

  // assim que eu abrir o modal, o useEffect entra
  useEffect(() => {
    if (professorSelecionado) {
      setId(professorSelecionado.id || "");
      setNi(professorSelecionado.ni || "");
      setNome(professorSelecionado.nome || "");
      setEmail(professorSelecionado.email || "");
      setCel(professorSelecionado.cel || "");
      setOcup(professorSelecionado.ocup || "");
    } else {
      setId("");
      setNi("");
      setNome("");
      setCel("");
      setEmail("");
      setOcup("");
    }
  }, [professorSelecionado]); //toda vez que tem um novo professor, o useEffect roda novamente

  const handleSubmit = (e) => {
    e.preventDefault(); // não recarregar a página
    const novoProfessor = { ni, nome, email, cel, ocup };
    if (professorSelecionado) { //se o professor selecionado não for nulo,
      atualizar({ ...professorSelecionado, ...novoProfessor }); // ... -> manenha os dados que existe e então altere ou adicione
    } else {
      criar(novoProfessor)
    }
  };

  return(
    <main className="modal_overlay">
      <div className="modal_container">
        <button className="close_button" onClick={onClose}>x</button>
        <h2>{professorSelecionado ? "Editar": "Cadastrar"}</h2>
        <div className="body_modal">
          <div className="caixa1">
            <form onSubmit={handleSubmit}>
              <input type="text" 
                className="ni_modal"
                value={ni}
                onChange={(e)=>setNi(e.target.value)}
                placeholder="NI"
              />
              <input type="text" 
                className="nome_modal"
                value={nome}
                onChange={(e)=>setNome(e.target.value)}
                placeholder="NOME"
              />
              <input type="text" 
                className="email_modal"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="EMAIL"
              />
              <input type="text" 
                className="cel_modal"
                value={cel}
                onChange={(e)=>setCel(e.target.value)}
                placeholder="CELULAR"
              />
              <input type="text" 
                className="ocup_modal"
                value={ocup}
                onChange={(e)=>setOcup(e.target.value)}
                placeholder="OCUP"
              />
              <button type="submit">{professorSelecionado ? "Atualizar" : "Salvar"}</button>
            </form>
          </div>
          <div className="caixa2">
            <div className="foto">
                
            </div>
          </div>
        </div>
      </div>
    </main>
  )
};

export default ModalProfessores