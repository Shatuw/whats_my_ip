import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Map from "./Map.js";
import { DateTime } from 'luxon';
import moment from "moment-timezone";


// deployement : 
//https://github.com/gitname/react-gh-pages
//https://github.com/BasharAlwarad?tab=repositories 
//https://www.youtube.com/watch?v=7wzuievFjrk&t=14s


function App() {

// store the IP from api.ipify.org
const [ipAddress, setIpAddress] = useState('');
// store the country from geo.ipify.org
const [country, setCountry] = useState({});
//implent a loading-message
const [isLoading, setIsLoading] = useState(false);
// store the url for the flag-image from restcountries.com api
const [flagUrl, setFlagUrl] = useState('')
//the time-thing luxon.js - destructure time-object and name it "now"
const { c :now } = DateTime.now();
const woanders = DateTime.now().setZone("America/Chicago");
console.log(woanders);

const timeZones = moment.tz.names();
console.log(timeZones);
// timeZones.forEach((item) => { item.slice(item.indexOf("/")) }

const getTheAddress  = async () => {
  
  const apiAddress="https://api.ipify.org/?format=json"
  //https://www.youtube.com/watch?v=XG-BtJv3UnU
  
  try{
    setIsLoading(true);  
    const {data} = await axios.get(apiAddress);
      //setIpAddress(data.hits);
      console.log(`log fetched IP`)
      setIpAddress(data.ip)
      getTheCountry(data.ip);
    }
    catch(err){
      alert(err.message);
    }

};// end of getTheAddress

const getTheCountry = async (ipAddress) => {
 
  const apiAddress = `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_TOTAL_SECURE_APIKEY}&ipAddress=${ipAddress}`;
  try {
    
    const { data } = await axios.get(apiAddress);
    setCountry({...data.location, isp: data.isp });
    console.log(data.isp)
    getTheFlag(data.location.country);
    setIsLoading(false);
  } catch (error) {
    alert(error);
  }

}

const getTheFlag = async (cca2code) => {
  
  const apiAddress = `https://restcountries.com/v3.1/alpha/${cca2code}`
  
  try {
    const { data } = await axios.get(apiAddress);
    setFlagUrl(data[0].flags.svg);
    console.log(`log fetched flag : ${data[0]}`)
  } catch (error) {
    alert(error);
  }
}
//--------useEffect on load---------------
useEffect(() => {
  return () => {
    getTheAddress();
  }
},[]); //--------end of useEffect--------


  return (
    <div className="App">
      <div>
      {isLoading ? <h4>Loading...</h4> : null}
        <p>{ipAddress}</p>
        <img className="flagstyle" src={flagUrl} alt="countryflag" />
        <p>CCA2 Country-Code: {country.country}</p>
        <p>Region: {country.region}</p>
        <p>Timezone: {country.timezone}</p>
        <p>Your Time: {now.hour}:{now.minute}:{now.second}:{now.millisecond} on {now.day}.{now.month}.{now.year}</p>
        <p>Time in {woanders._zone.zoneName}: {woanders.c.hour}:{woanders.c.minute}:{woanders.c.second}</p>
        <p>Internetprovider: {country.isp}</p>
        <div className='mapblock'>
        <Map lng={51.505} lat={-0.09} />
        </div>
      </div>
    </div>
  );
}

export default App;
