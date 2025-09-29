import { useState } from "react";
import { missoes } from '../Dados/dadosMissao';
import { MissaoCard } from '../Componentes/MissaoCard';
import { MissaoModal } from '../Componentes/MissaoModal';

export function Missao() {
  const [missaoSelecionada, setMissaoSelecionada] = useState(null);
  const [refresh, setRefresh] = useState(0)
  const [missoesConcluidas, setMissoesConcluidas] = useState([]); // ✅ novo estado

  const concluirMissao = (id) => {
    const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
    const m = missoes.find((ms) => ms.id === id);

    const figurinha = {
      id: m.id,
      nome: m.titulo || `figurinha${m.id}`,
      imagem: m.figura || `/src/assets/mandouBem.png`,
    }

    if(!inventario.some((f) => f.id === id)){
      inventario.push(figurinha);
      localStorage.setItem("inventario", JSON.stringify(inventario))
    }

  
    setMissoesConcluidas((prev) => [...prev, id]); // adiciona id no array
    setMissaoSelecionada(null); // fecha modal
    setRefresh((r) => r + 1)
  };

  return (
    <section className='conteiner'>
      <h2 className="font-pixel!">Missões</h2>
      <div className="missoes-grid">
        {missoes.map((m) => (
          <MissaoCard
            key={`${m.id} - ${refresh}`} 
            missao={m}  
            onIniciarMissao={setMissaoSelecionada} 
          />
        ))}
      </div>

      {missaoSelecionada && (
        <MissaoModal 
          missao={missaoSelecionada} 
          onClose={() => setMissaoSelecionada(null)} 
          onConcluir={() => concluirMissao(missaoSelecionada.id)} 
        />
      )}
    </section>
  );
}
