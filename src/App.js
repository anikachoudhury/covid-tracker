import React, { useState, useEffect } from 'react';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoBox from './InfoBox';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });
  }, [])

  useEffect(() => {
    const getCountryData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(response => response.json())
      .then(data => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2,
          }
        ));

        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
    };

    getCountryData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url = countryCode === "Worldwide" 
      ? "https://disease.sh/v3/covid-19/all" 
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then((response) => response.json())
    .then(data => {
      setCountry(countryCode);
      setCountryInfo(data);
    })
  };

  return (
    <div className="appAndLanding">
      <LandingPage />
      <div className="app">
        <div className="app__left">
          <div className="app__header">
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="app__dropdown">
              <Select variant="outlined" onChange={onCountryChange} value={country}>
                <MenuItem value="Worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
            <InfoBox bgcolor="info" title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
            <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
            <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
          </div>

        </div>
        
        
        <Card className="app__right">
          <CardContent>
            <h3 id="livecases">Live cases by country</h3>
            <Table countries={tableData} />
            <h3 id="newcases">Worldwide new cases</h3>
            <LineGraph />
          </CardContent>
        </Card>
        
        
      </div>
    </div>
  );
}

export default App;
