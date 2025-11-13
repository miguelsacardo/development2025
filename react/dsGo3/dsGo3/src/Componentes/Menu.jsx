import missao from '../assets/missao_tratado.png';
import mapa from '../assets/mapa_tratado.png';
import bau from '../assets/bau_tratado.png';
import camera from '../assets/camera_tratado.png';
import { Link } from 'react-router-dom'
export function Menu() {
    return (
        <div className='menu'>
            <ul>
                <li>
                    <Link to = 'missao'>
                        <figure>
                            <img src={missao} alt="Aba de missões. Ícone que lembra um broche." />
                            <figcaption>Missões</figcaption>
                        </figure>
                    </Link>
                </li>
                
                <li>
                    <Link to = 'inventario'>
                        <figure>
                        <img src={bau} alt="Inventário. Ícone de baú." />
                        <figcaption>Inventário</figcaption>
                    </figure>
                    </Link>
                    
                </li>
                <li>
                    <figure>
                        <img src={mapa} alt="GeoLocalização. Ícone de mapa." />
                        <figcaption>GeoLocalização</figcaption>
                    </figure>
                </li>
                 <li>  
                    <Link to = 'foto'>
                        <figure>
                            <img src={camera} alt="camera. Ícone de máquina fotográfica." />
                            <figcaption>Camera</figcaption>
                        </figure>
                    </Link>
                </li>
            </ul>
        </div>
    )
}