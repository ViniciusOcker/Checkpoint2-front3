import { useEffect, useState } from "react";
import Card from "../Components/Card";

const Home = () => {

  const [dentistas, setDentistas] = useState([]);

  useEffect(() => {
    fetch('http://dhodonto.ctdprojetos.com.br/dentista')
    .then(res=>{
      if(res.status === 200){
        return res.json()
      }
      else{
        throw Error("Erro interno do servidor!");
      }
    })
    .then(
      res=>{
        setDentistas(res);
      }
    )
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {
          dentistas.map(
            dentista=><Card key={dentista.matricula} dados={dentista}/>
          )
        }
      </div>
    </>
  );
};

export default Home;
