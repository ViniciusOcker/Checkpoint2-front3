import { useEffect, useState } from "react";
import ScheduleFormModal from "./ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { useMatch } from "react-router-dom";
import { useGlobal } from '../hooks/globalContext';

const DetailCard = () => {
  const { globalState } = useGlobal();
  const [dentist, setDentist] = useState({
    nome: null,
    sobrenome: null,
    usuario: {
      username: null,
    }
  });
  const uuidDentist = useMatch("/dentist/:uuidDentist").params.uuidDentist;

  useEffect(() => {

    fetch(`${globalState.api}/dentista?matricula=${uuidDentist}`,
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: "GET"
    })
    .then(res=>{
        if(res.status === 200){
          return res.json()
        }
        else{
          throw Error("Erro interno do servidor!");
        }
      })
    .then(res=>{
      setDentist(res);
    })
  }, []);
  return (
    <>
      <h1>Detail about Dentist {dentist.nome} </h1>
      <section className={(globalState.theme === 'dark') ? `card col-sm-12 col-lg-6 container ${styles.cardDark}` : 'card col-sm-12 col-lg-6 container'}>
        {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
        <div
          className={`card-body row`}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className={(globalState.theme === 'dark') ? `list-group-item bg-dark text-white` : 'list-group-item'}>Nome: {dentist.nome}</li>
              <li className={(globalState.theme === 'dark') ? `list-group-item bg-dark text-white` : 'list-group-item'}>
                Sobrenome: {dentist.sobrenome}
              </li>
              <li className={(globalState.theme === 'dark') ? `list-group-item bg-dark text-white` : 'list-group-item'}>
                Usuário: {dentist.usuario.username}
              </li>
            </ul>
            <div className="text-center">
              {/* //Na linha seguinte deverá ser feito um teste se a aplicação
              // está em dark mode e deverá utilizado o css correto */}
              <button
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                className={`btn btn-${globalState.theme} ${styles.button
                  }`}
              >
                Marcar consulta
              </button>
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
