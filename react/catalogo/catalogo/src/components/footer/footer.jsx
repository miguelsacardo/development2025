import estilos from "./footer.module.css";

export function Footer() {
  return (
    <footer className={estilos.container}>
      <h1>MegaFilmesHd &copy; </h1>
      <div className={estilos.line} />

      <div className={estilos.icons}>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "48px" }}
        >
          share
        </span>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "48px" }}
        >
          tag
        </span>
        <span class="material-symbols-outlined" style={{ fontSize: "48px" }}>
          favorite
        </span>
      </div>
      <div className={estilos.line} />

      <div className={estilos.links}>
        <nav>
          <a>Politicas de Privacidade</a>
          <a>Sobre Nos</a>
          <a>Contate-nos</a>
        </nav>
      </div>
      <div className={estilos.all_rights}>
        <span>Todos os Direitos Reservados MegaFilmesHd &copy;</span>
      </div>
    </footer>
  );
}
