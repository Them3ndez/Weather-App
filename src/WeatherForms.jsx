import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    width: '100%',
    maxWidth: '400px',
  },
  input: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  toggle: {
    marginBottom: theme.spacing(2),
  },
}));

const WeatherForm = () => {
  const classes = useStyles();
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('metric'); // Default to Celsius
  const API_KEY = '77cb6b72d40592aa16e6b039745480b5';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&q=${city}&units=${unit}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const renderTemperature = () => {
    if (!weatherData) return null;

    const temp = weatherData.main.temp;
    const unitLabel = unit === 'metric' ? '°C' : '°F';
    const temperature = unit === 'metric' ? temp : (temp * 9) / 5 + 32;

    return <p>Temperature: {temperature.toFixed(1)} {unitLabel}</p>;
  };

  const renderWeatherData = () => {
    if (!weatherData) return null;

    const { uvi, sys, wind, clouds, main } = weatherData;

    return (
      <div>
        <p>UV Index: {uvi}</p>
        <p>Sunset Time: {new Date(sys.sunset * 1000).toLocaleTimeString()}</p>
        <p>Wind Speed: {wind.speed} m/s</p>
        <p>Precipitation: {clouds.all}%</p>
        <p>Humidity: {main.humidity}%</p>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <h1>Weather App</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="Enter City"
          variant="outlined"
          className={classes.input}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Get Weather
        </Button>
      </form>

      {renderTemperature()}
      {renderWeatherData()}

      <Switch
        className={classes.toggle}
        checked={unit === 'metric'}
        onChange={handleToggleUnit}
        color="primary"
      />

      <p>{unit === 'metric' ? '°C' : '°F'}</p>
    </div>
  );
};

export default WeatherForm;
