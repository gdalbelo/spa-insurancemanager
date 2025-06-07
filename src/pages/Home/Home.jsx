import { useState, useEffect } from "react";

import { Card } from "../../components/Card/Card";
import { Navbar } from "../../components/Navbar/Navbar";
import { getAllPosts, getTopPost } from "../../services/postsServices";
import { HomeBody, HomeHeader } from "./HomeStyled";
import { getAllInsurances } from "../../services/insuranceServices";
import { getAllInsurers } from "../../services/insurerServices";
import Cookies from "js-cookie";

export default function Home() {
  const [insurer, setInsurers] = useState([]);
  const [insurance, setInsurances] = useState([]);

  async function findInsurancesAndInsurers() {
    const insurerResponse = await getAllInsurers();
    setInsurers(insurerResponse.data.results);
    //console.log(insurer);
    const insuranceResponse = await getAllInsurances();
    //console.log('insurances: \n', insuranceResponse.data.results + '\n' + insurerResponse.data.results);
    console.log(insuranceResponse.data.results);
    setInsurances(insuranceResponse.data.results);
    //console.log(insurance);
  }

  function insurerName(id) {
    console.log(insurer);
  }

  useEffect(() => {
    findInsurancesAndInsurers();
  }, []);
  console.log(insurer);
  console.log(insurance);
  return (
    <>
      <HomeHeader>
        <h1>Seguradoras</h1>&nbsp;
        <h1 style={{marginLeft: '500px'}}>Seguros</h1>
      </HomeHeader>
      <HomeBody>
        <ul>
          {insurer.length >= 0 ? insurer.map(({id, name, address, contactInfo}) => <li key={id}>{name} - {address} - {contactInfo}</li>) : <li>Sem dados</li>}
        </ul>
        <ul style={{marginLeft: '85px'}}>
          {insurance.length >= 0 ? 
            insurance.map((item) => 
              <li key={item.id}>
                <b></b>Número de apolice: {item.policyNumber}<br/>
                Cobertura: {item.coverage}<br/>
                valor segurado: {item.insuredAmount}<br/>
                Seguradora: {insurerName(item.insurer)}<br/>
                Prêmio: {item.premium}
              </li>) : 
            <li>Sem dados</li>}
        </ul>
      </HomeBody>
    </>
  );
}
