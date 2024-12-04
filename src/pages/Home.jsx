// importando components do bootstrap
import React from "react";
import CardProduto from "../components/CardProduto";
import Container from "react-bootstrap/Container";

// Importação de componentes
import NavBarra from "../components/NavBarra";

// Importando o hook useState para monitorar a mudança das variáveis
import { useState, useEffect } from "react";

// Url da api
const url = "http://localhost:5000/animais"

const Home = () => {
    //Lista com animais
    const [animais, setAnimais] = useState([])
    //UseEffect pra puxar os dados da api
    useEffect(()=>{
      async function fetchData(){
        try{
            const req = await fetch(url)
            const prods = await req.json()
            console.log(prods)
            setAnimais(prods)
        }
        catch(erro){
          console.log(erro.message)
        }
      }
      fetchData()
    }, [animais])
  
  return (
    <div>
      <NavBarra />
      <h1>Lista de animais</h1>
      <Container>
        <div className="lista-animais d-flex col-12 gap-2 mt-3 justify-content-start flex-wrap">
          {/* Card com informações fixas */}
         

          {/* Card com informações variáveis */}
          {animais.map((prod) => (
            <CardProduto
              key={prod.id}
              id={prod.id}
              tipo={prod.tipo}
              raca={prod.raca}
              vacinacao={prod.vacinacao}
              categoria={prod.categoria}
              imagemUrl={prod.imagemUrl}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
