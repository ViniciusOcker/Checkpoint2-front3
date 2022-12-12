import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../hooks/globalContext";
import styles from "./Form.module.css";



const LoginForm = () => {
  const navigate = useNavigate();

  const { globalState, changeGlobal } = useGlobal()
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(()=>{
    if(globalState.auth !== ''){
      navigate("/home");
    }
  })

  const handleSubmit = (e) => {
    setError("");
    e.preventDefault();

    const login = {
      username: username,
      password: password,
    }

    fetch("https://dhodonto.ctdprojetos.com.br/auth",
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(login)
    })
    .then(res=>{
        if(res.status === 200){
          return res.json()
        }
        else{
          throw Error("O nome de usuário ou a senha estão incorretos!");
        }
      })
    .then(res=>{
      changeGlobal({
        state: 'auth',
        auth: res.token
      })
      navigate("/home");
    })
    .catch(erro=>setError(erro.toString()))
  };

  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={`text-center card container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              value={username}
              onChange={(event)=>{setUsername(event.target.value)}}
              required
            />
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(event)=>{setPassword(event.target.value)}}
              required
            />
            <span>{error}</span>
            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
