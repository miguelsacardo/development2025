import estilos from "./nav.module.css";
import { Link } from "react-router-dom";
export function Nav() {
  return (
    <nav className={estilos.container}>
      <ul>
        <Link to="/">
          <li>
            <span class="material-symbols-outlined">Home</span>
            Home
          </li>
        </Link>

        <Link to="serie">
          <li>
            <span class="material-symbols-outlined">subscriptions</span>
            Séries
          </li>
        </Link>

        <Link to="perfil">
          <li>
            <span class="material-symbols-outlined">person</span>
            Perfil
          </li>
        </Link>
      </ul>
    </nav>
  );
}
