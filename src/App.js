// import logo from './logo.svg';
// import './App.css';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");

  useEffect(() => {
    axios
      .all([
        axios.get("https://disease.sh/v3/covid-19/all?__cf_chl_captcha_tk__=be8b3522b448e0ac88eeecdb0ecbc54798647b51-1624976204-0-AX9LoMudij-7wpZN0qw8N7JEkuXnK8VpJsqEmjP62Sx2lJqGxU_jLj2j3TjVPh3xmK7fENgz6d2Ez5-E4uAIhMEjbvOZuToEQtK8vJJZ1teLnlbSnBlw9wGZrvPvSpLRHHOJp8V-aup_PAV0oMyzhALdi-M43obS3wOC3Bi7t-SDzdnF6vVBoc7Pkdqec6lTrRVUAKTiOc66bBAAtTxZElD271brQ2PHx6CWzUzmoRz_U4uf8B7estgZXjn1njzSpPD9KDY6Y9ep0sCZzcKLTdqPC8QOYimYJHZt-zytxwDaO2NSZcjfxe2HrUGq9ZkGulLlUPA15Yvw3HLX7qXR6ZQ-OFB6Ik2S_VSXaev-5bBDZOVqu2-2BOG_-eYnqHkPFikwHdXF8qVzE4BmdBVptEbvnTTKxZHym-UKxTvvZmsEswYYqJScWlDH5i6bF1PI15z50fJcxd7qU7gnVf_vFqt2RvuwPecpTJocNxAi8y8r_F9BihM-2_QzdhMFuYwqkuGeOQSOv319tVUbz56cqeMN7lbq-8VoGE13MwPVmh8pno5DyDR95_eOIZEKq_NYCm1nIqNfBOiWllFHRpYkjn3qUMJ1i1Bw6T7ihm-KeylGIt6Y041ttClMKjHVHBiDFw"),
        axios.get("https://disease.sh/v3/covid-19/countries")
      ])
        .then(responseArr =>{
           setLatest(responseArr[0].data);
           setResults(responseArr[1].data);
        })
        .catch(err => {
          console.log(err);
        });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const filterCountries = results.filter(item =>{
    return searchCountries !== "" ? item.country.includes(searchCountries) : item;
  })

  const countries = filterCountries.map((data, i) => {
    return(
      <Card
         key={i}
         bg="light"
         text="dark"
         className="text-center"
         style={{ margin: "10px" }}
         >
        <Card.Img variant="top" src={data.countryInfo.flag} />   
        <Card.Body>
          <Card.Title>{data.country}</Card.Title>
          <Card.Text>Cases {data.cases}</Card.Text>
          <Card.Text>Deaths {data.deaths}</Card.Text>
          <Card.Text>Recovered {data.recovered}</Card.Text>
          <Card.Text>Today's cases {data.todayCases}</Card.Text>
          <Card.Text>Today's deaths {data.todayDeaths}</Card.Text>
          <Card.Text>Active {data.active}</Card.Text>
          <Card.Text>Critical {data.critical}</Card.Text>
        </Card.Body>
         </Card>
    );
  });

 var queries = [{
   columns: 2,
   query: 'min-width: 500px'
 }, {
  columns: 3,
  query: 'min-width: 1000px'
 }];

return (
    <div>
      <CardDeck>
  <Card bg="secondary" text="white" className="text-center">
   
    <Card.Body>
      <Card.Title>Cases</Card.Title>
      <Card.Text>
       {latest.cases}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
  <Card bg="danger" text="white" className="text-center">
    
    <Card.Body>
      <Card.Title>Deaths</Card.Title>
      <Card.Text>
      {latest.deaths}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
  <Card bg="success" text="white" className="text-center">
    
    <Card.Body>
      <Card.Title>Recovered</Card.Title>
      <Card.Text>
      {latest.recovered}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdated}</small>
    </Card.Footer>
  </Card>
</CardDeck>
<Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Control type="text" placeholder="Enter Country" onChange={e => setSearchCountries(e.target.value)}/>
  </Form.Group>
  
</Form>

<Columns queries={queries}>{countries}</Columns>

    </div>
  );
}

export default App;
