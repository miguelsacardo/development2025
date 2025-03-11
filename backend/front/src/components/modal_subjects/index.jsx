import React, { useEffect, useState } from "react";
import './style.css'

const ModalDisciplinas = ({
    isOpen,
    onClose,
    disciplinaSelecionada, 
    create,
    update,
}) => {
    if(!isOpen) return null;
    console.log("disc selecionado: ",disciplinaSelecionada);
    // não quis juntar todos esses useStates em um só pois separando-os permite melhor manipulação de cada um
    const[id, setId] = useState([disciplinaSelecionada?.id || ""])
    const[nomeCompleto, setNomeCompleto] = useState([disciplinaSelecionada?.nomeCompleto || ""])
    const[sigla, setSigla] = useState([disciplinaSelecionada?.sigla || ""])
    const[semestre, setSemestre] = useState([disciplinaSelecionada?.semestre || ""])
    const[cargaHoraria, setCargaHoraria] = useState([disciplinaSelecionada?.cargaHoraria || ""])

    useEffect(()=>{
        if(disciplinaSelecionada){
            setId(disciplinaSelecionada.id || "")
            setNomeCompleto(disciplinaSelecionada.nomeCompleto || "")
            setSigla(disciplinaSelecionada.sigla || "")
            setSemestre(disciplinaSelecionada.semestre || "")
            setCargaHoraria(disciplinaSelecionada.cargaHoraria || "")
        }else{
            setId("")
            setNomeCompleto("")
            setSigla("")
            setSemestre("")
            setCargaHoraria("")
        }
    }, [disciplinaSelecionada])

    const handleSubmit = (e) => {
        e.preventDefault()

        const novaDisciplina = { nomeCompleto, sigla, semestre, cargaHoraria };

        if(disciplinaSelecionada) update({...disciplinaSelecionada, ...novaDisciplina})
        else create(novaDisciplina)
    }

    return(
        <main className="modal_overlay">
          <div className="modal_container">
            <button className="close_button" onClick={onClose}>x</button>
            <h2>{disciplinaSelecionada ? "Editar": "Cadastrar"}</h2>
            <div className="body_modal">
              <div className="caixa1">
                <form onSubmit={handleSubmit}>
                  <input type="text" 
                    className="nome_modal"
                    value={nomeCompleto}
                    onChange={(e)=>setNomeCompleto(e.target.value)}
                    placeholder="Nome da disciplina"
                  />
                  <input type="text" 
                    className="sigla_modal"
                    value={sigla}
                    onChange={(e)=>setSigla(e.target.value)}
                    placeholder="Sigla"
                  />
                  <input type="text" 
                    className="semestre_modal"
                    value={semestre}
                    onChange={(e)=>setSemestre(e.target.value)}
                    placeholder="Semestre"
                  />
                  <input type="text" 
                    className="cargahoraria_modal"
                    value={cargaHoraria}
                    onChange={(e)=>setCargaHoraria(e.target.value)}
                    placeholder="Carga Horária"
                  />
                  <button type="submit">{disciplinaSelecionada ? "Atualizar" : "Salvar"}</button>
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
    
}

export default ModalDisciplinas