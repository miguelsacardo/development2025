import estilos from "./nav.module.css";

export function Nav() {
  return (
    <nav className={estilos.container}>
      <ul>
        <li>Home</li>
        <li>Filmes</li>
        <li>Perfil</li>
      </ul>
    </nav>
  );
}
