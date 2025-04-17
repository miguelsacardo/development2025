import estilos from "./style.module.css";

export function Profiles() {
  return (
    <div>
      <div className={estilos.container}>
        <div className={estilos.card}>
          <div>
            <img
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQVpHoNY7fNuiiCf-fqZ0_6tz42XzNiqdK-R-XI-r_K-mAO3TnbuCKANshFwAZSGRpZMfVji1l7i3qFwYhjIznGzQ"
              alt=""
              className={estilos.img}
            />
          </div>

          <h1>Pessoa 1</h1>
        </div>

        <div className={estilos.card}>
          <div>
            <img
              src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg"
              alt=""
              className={estilos.img}
            />
          </div>

          <h1>Pessoa 2</h1>
        </div>

        <div className={estilos.card}>
          <div>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyvSUk60paI8DRmjfEowFhmvrywmt3S8kv8A&s"
              alt=""
              className={estilos.img}
            />
          </div>

          <h1>Pessoa 3</h1>
        </div>

        <div className={estilos.card}>
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt=""
              className={estilos.img}
            />
          </div>

          <h1>Pessoa 4</h1>
        </div>
      </div>
      </div>
  );
}
