import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.min.css';
import { Weather } from './app_components/weather.component';
import { LocationInput } from './app_components/locationInput.component';

const API_KEY= process.env.REACT_APP_WEATHER_KEY;


export default class App extends React.Component{

  constructor(){
    super();
    this.state={
      cit:''
    };
    this.weatherIcons={
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  setCit = (evt) => {
    const inputVal=evt.target.value;
    const result = /^[A-Za-z]+$/g.test(inputVal) || inputVal === '';
    if(result)    this.setState({cit: inputVal});
  }

  kelvinToFarenheitConverter = (kelvin) => {
    let celcius = this.kelvinToCelciusConverter(kelvin);
    return Math.floor((celcius*1.8)+32);
    // (30°C x 1.8) + 32
  }

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ weatherIcon: icons.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ weatherIcon: icons.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ weatherIcon: icons.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ weatherIcon: icons.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ weatherIcon: icons.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ weatherIcon: icons.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ weatherIcon: icons.Clouds });
        break;
      default:
        this.setState({ weatherIcon: icons.Clouds });
    }
  }

  kelvinToCelciusConverter = (kelvin) =>{
    return Math.floor(kelvin-273.15);
  }

  getWeather = async(e) => {
    e.preventDefault();
    const {cit} = this.state;
    if(!cit){
      this.setState({
        isError: true,
        errMsg: 'Please Enter the City Name..!'
      });
      return
    }
    this.setState({isCityError: false, cityErrMsg:''});
    const rpc=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cit}&appid=${API_KEY}`)
    const res = await rpc.json();
    if(res.cod === '401'){
      this.setState({
        cit:'',
        city: '',
        country: '',
        celcius: '',
        ceclius_min: '',
        ceclius_max: '',
        farenheit: '',
        farenheit_min: '',
        farenheit_max: '',
        description: '',
        isError: true,
        errMsg: 'Invalid Credentials...!'
      });
    }
    if(res.cod === '200') {
      this.setState({
        city: res.name,
        country: res.sys.country,
        celcius: this.kelvinToCelciusConverter(res.main.temp),
        ceclius_min: this.kelvinToCelciusConverter(res.main.temp_min),
        ceclius_max: this.kelvinToCelciusConverter(res.main.temp_max),
        farenheit: this.kelvinToFarenheitConverter(res.main.temp),
        farenheit_min: this.kelvinToFarenheitConverter(res.main.temp_min),
        farenheit_max: this.kelvinToFarenheitConverter(res.main.temp_max),
        description: res.weather[0].description,
        isError: false,
        errMsg: ''
      });
      this.get_WeatherIcon(this.weatherIcons, res.weather[0].id);
    } 
    if(res.cod === '404') {
      this.setState({
        cit:'',
        city: '',
        country: '',
        celcius: '',
        ceclius_min: '',
        ceclius_max: '',
        farenheit: '',
        farenheit_min: '',
        farenheit_max: '',
        description: '',
        isError: true,
        errMsg: 'Please ensure you have entered the correct city name...!'
      });
    }
  }

  render(){
    const {
      city,
      country,
      celcius,
      ceclius_min,
      ceclius_max,
      farenheit,
      farenheit_min,
      farenheit_max,
      description,
      weatherIcon,
      cit,
      errMsg,
      isError
    } = this.state;
    return(
      <div className="App">
        <h1 className="mainHeading">Whats the weather</h1>
        <LocationInput 
          loadWeather={this.getWeather}
          setCit={this.setCit}
          cit={cit}
        />
        {isError && <div className="row justify-content-center alert">
            <div className="alert alert-danger col-9">
               {errMsg}
            </div>
        </div>}
        {celcius && <Weather 
          city={city}
          country={country}
          celcius={celcius}
          ceclius_min={ceclius_min}
          ceclius_max={ceclius_max}
          farenheit={farenheit}
          farenheit_min={farenheit_min}
          farenheit_max={farenheit_max}
          description={description}
          weatherIcon={weatherIcon}
        >
        </Weather>}
      </div>
    );
  }
}
