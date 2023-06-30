// import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Map from "./Map.js";
import { DateTime } from 'luxon';
//Styling with MUI:
import { Box, Card, CardContent, CardMedia, Container } from '@mui/material';
import { RotateRight } from '@mui/icons-material';
import WorldTime from './components/WorldTime.js';

// deployement : 
//https://github.com/gitname/react-gh-pages
//https://github.com/BasharAlwarad?tab=repositories 
//https://www.youtube.com/watch?v=7wzuievFjrk&t=14s


function App() {

  // store the IP from api.ipify.org
  // store the country from geo.ipify.org
  // implent a loading-message
  // store the url for the flag-image from restcountries.com api
  const [ipAddress, setIpAddress] = useState('');
  const [country, setCountry] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [flagUrl, setFlagUrl] = useState('')
  const [countryName, setCountryName] = useState('')

  //the time-thing luxon.js - destructure time-object and name it "now"
  const { c: now } = DateTime.now();

  const getTheAddress = async () => {

    const apiAddress = "https://api64.ipify.org?format=json"
    //https://www.youtube.com/watch?v=XG-BtJv3UnU

    try {
      setIsLoading(true);
      const { data } = await axios.get(apiAddress);
      //setIpAddress(data.hits);
      console.log(`log fetched IP`)
      setIpAddress(data.ip)
      getTheCountry(data.ip);
    }
    catch (err) {
      alert(err.message);
    }

  };// end of getTheAddress

  const getTheCountry = async (ipAddress) => {

    const apiAddress = `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_TOTAL_SECURE_APIKEY}&ipAddress=${ipAddress}`;
    try {

      const { data } = await axios.get(apiAddress);
      setCountry({ ...data.location, isp: data.isp });
      // console.log(data)
      // console.log(data.isp)
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
      setCountryName(data[0].name.common)
      console.log('log fetched flag :', data[0])
    } catch (error) {
      alert(error);
    }
  }
  //--------useEffect on load---------------
  useEffect(() => {
    getTheAddress();
  }, []); //--------end of useEffect--------


  return (
    <>
      <Container sx={{ position: 'relative', zIndex: 0 }} maxWidth={false} disableGutters>
        <Map lng={51.505} lat={-0.09} />
      </Container>
      <Box sx={{ top: '5vh', left: '5vw', position: 'fixed', zIndex: 0 }}>
        <Card sx={{width: "400px"}} raised>
        {isLoading ? 
        <RotateRight sx={{fontSize:240}}/>
        : 
          <CardMedia
            component="img"
            height="240"
            image={flagUrl}
            alt='Country Flag'
          />
        }
          <CardContent>
            <p>Country: {countryName}</p>
            <p>IP-Address: {ipAddress}</p>
            <p>CCA2 Country-Code: {country.country}</p>
            <p>Region: {country.region}</p>
            <p>Timezone: {country.timezone}</p>
            <p>Time: {now.hour}:{now.minute}:{now.second}:{now.millisecond}, Date: {now.day}.{now.month}.{now.year}</p>
            <p>Internetprovider: {country.isp}</p>
          </CardContent>
        </Card>
      </Box>
      <WorldTime />
    </>
  );
}

export default App;
