import "./App.css"; 

export default function App(){
  return(
    <div className="container">
      <h1>Login</h1>

      <input className="caixa"
      value={'###'}
      placeholder="User"
      />

      <input className="caixa"
      value={"aaa"}
      placeholder="Password"
      type="password"
      />

      <button className="btn" type="submit">

      </button>
    </div>
  )
}