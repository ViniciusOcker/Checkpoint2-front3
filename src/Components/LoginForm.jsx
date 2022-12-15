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
  const [errorLogin, setErrorLogin] = useState("");
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [disabledButton, setDisabledButton] = useState("");

  useEffect(() => {
    if (globalState.auth !== '') {
      navigate("/home");
    }
  })

  useEffect(()=>{
    setErrorLogin("");
    if(username.length < 5 ){
      setErrorUsername("O nome de usuário está muito curto");
    }
    else if(username.length > 18 ){
      setErrorUsername("O nome de usuário está muito longo");
    }
    else{
      setErrorUsername("");
    }
  },[username]);

  useEffect(()=>{
    setErrorLogin("");
    if(password.length < 5 ){
      setErrorPassword("A senha está muito curto");
    }
    else if(password.length > 18 ){
      setErrorPassword("A senha está muito longo");
    }
    else{
      setErrorPassword("");
    }
  },[password]);

  useEffect(()=>{
    if(errorLogin === "" && errorPassword === "" && errorLogin === "" ){
      setDisabledButton(false);
    }
    else{
      setDisabledButton(true);
    }
  },[errorLogin,errorUsername,errorPassword])

  const handleSubmit = (e) => {
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
      .then(res => {
        if (res.status === 200) {
          return res.json()
        }
        else {
          throw Error("O nome de usuário ou a senha estão incorretos!");
        }
      })
      .then(res => {
        changeGlobal({
          state: 'auth',
          auth: res.token
        })
        navigate("/home");
      })
      .catch(erro => setErrorLogin(erro.toString()))
  };

  return (
    <>
      <div
        className={(globalState.theme === 'dark') ? `text-center card container ${styles.card} ${styles.cardDark}` : `text-center card container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              value={username}
              onChange={(event) => { setUsername(event.target.value) }}
              required
            />
            {(errorUsername !== "")?<span>{errorUsername}</span>:null}
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => { setPassword(event.target.value) }}
              required
            />
            {(errorPassword !== "")?<span>{errorPassword}</span>:null}
            {(errorLogin !== "")?<span>{errorLogin}</span>:null}
            <button className="btn btn-primary" type="submit" disabled={( disabledButton )}>
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
