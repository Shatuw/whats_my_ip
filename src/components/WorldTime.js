import React, {useState} from 'react'
import { DateTime } from 'luxon';
import moment from "moment-timezone";
import { Box, Card, CardContent, FormControl, InputLabel, MenuItem, Select} from '@mui/material';

export default function WorldTime() {
    const woanders = DateTime.now().setZone("America/Chicago");
    console.log(woanders);

    const timeZones = moment.tz.names();
  console.log(timeZones);
  // timeZones.forEach((item) => { item.slice(item.indexOf("/")) }
const [continent, setContinent] = useState('');

  const handleContinent = (e) => {
    setContinent(e.target.value);
  }
  return (
    <>
    <Box sx={{ top: '5vh', right: '5vw', position: 'fixed', zIndex: 0 }}>
        <Card sx={{width: "400px"}} raised>
            <CardContent>
                <FormControl fullWidth>
                    <InputLabel id='continentLabel'>Continent</InputLabel>
                    <Select 
                    labelId="conitnentLabel" 
                    id="continentSelection"
                    value={continent}
                    label='Continent'
                    onChange={handleContinent}
                    >
                        <MenuItem value="Europe">Europe</MenuItem>
                        <MenuItem value="Asia">Asia</MenuItem>
                        <MenuItem value="Africa">Africa</MenuItem>
                        <MenuItem value="North-America">North-America</MenuItem>
                        <MenuItem value="South-America">South-America</MenuItem>
                        <MenuItem value="Australia">Australia</MenuItem>
                    </Select>
                </FormControl>
            <p>Time in {woanders._zone.zoneName}: {woanders.c.hour}:{woanders.c.minute}:{woanders.c.second}</p>
            </CardContent>
        </Card>
    </Box>
    </>
  )
}
