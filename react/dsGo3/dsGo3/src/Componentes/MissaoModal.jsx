import { useState } from "react";
import sucesso from "../assets/win.png";
import erro from "../assets/raios.png";

export function MissaoModal({ missao, onClose, onConcluir }) {
  const [resposta, setResposta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [status, setStatus] = useState(null);

  const verificarResposta = () => {
    if (!resposta.trim()) {
      alert("Por favor, digite uma resposta antes de enviar!");
      return;
    }

    if (
      resposta.trim().toLowerCase() ===
      missao.respostaCorreta.trim().toLowerCase()
    ) {
      setResultado("Resposta correta! Parabéns!");
      setStatus("sucesso");

      // ✅ chama a função de concluir após 1s (tempo para mostrar feedback)
      setTimeout(() => {
        onConcluir(missao.id);
      }, 3000);
    } else {
      setResultado("Resposta incorreta. Tente novamente!");
      setStatus("erro");
      
      // time out para fechar quando errar
      setTimeout(() => {
        onClose(true)
      }, 3000);
    }
  };

  if(resultado){
    return(
      <dialog open className="modal">
        <div className="resultado font-defaultPixel! flex flex-col items-center">
          <p className="text-2xl!">{resultado}</p>
          {status === "sucesso" && (
            <img
              src={sucesso}
              alt="Missão concluída com sucesso"
              className="rounded-xl w-50!"
            />
          )}
          {status === "erro" && (
            <img
              src={erro}
              alt="Erro na resposta da missão"
              className="rounded-xl w-50!"
            />
          )}
        </div>
      </dialog>
    )
  }

  return (
    <dialog open className="modal">
      <h2 className="titulo font-defaultPixel! text-4xl!" id="titulo-missao">
        {missao.titulo}
      </h2>
      <p id="descricao-missao" className="font-defaultPixel text-2xl!">{missao.descricao}</p>

      <label htmlFor="resposta" className="sr-only">
        Digite sua resposta
      </label>
      <input
        className="caixaTexto placeholder:font-defaultPixel placeholder:text-2xl border-b-2 outline-none font-defaultPixel text-3xl!"
        id="resposta"
        type="text"
        placeholder="Digite sua resposta..."
        value={resposta}
        onChange={(e) => setResposta(e.target.value)}
        required
      />

      <div className="modal-botoes font-defaultPixel text-2xl">
        <button onClick={verificarResposta}>Enviar</button>
        <button onClick={onClose}>Fechar</button>
      </div>
    </dialog>
  );
}
