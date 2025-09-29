export function MissaoCard({ missao, onIniciarMissao,concluida  }) {

  const inventario = JSON.parse(localStorage.getItem("inventario")) || [];
  const concluidaLocal = inventario.some((f) => f.id === missao.id);

  const isConcluida = concluida != undefined ? concluida : concluidaLocal;

  return (
    <article className='missao-card font-defaultPixel! text-2xl! text-center!'>
      <h3 id={missao.id}>{missao.titulo}</h3>
      <p>{missao.missao}</p>
      <button onClick={() => onIniciarMissao(missao)}  disabled={concluida}>{isConcluida ? "Concluida" : "Iniciar"}</button>
    </article>
  )
}
