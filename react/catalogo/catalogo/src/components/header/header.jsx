import estilos from "./header.module.css";

export function Header() {
  return (
    <header className={estilos.container}>
      <div className={estilos.header_content}>
        <img src="images/movie_icon.png" alt="" />
        <h1>
          MegaFilmes HD &copy;
        </h1>
      </div>
    </header>
  );
}
