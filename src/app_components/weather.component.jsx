import React from 'react';

import './weatherComponent.css';


export const Weather = (props) => {
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
      weatherIcon
    } = props;
    return(
        <div className="container">
            <div className="cards">
                {props.children}
                <h1>{city},{country}</h1>
                <h5 className="py-4">
                    <i className={`wi ${weatherIcon} display-1`}></i>
                </h5>
                <div className="container">
                <div className="row justify-content-center">
                    <div className="col justify-content-end">
                    <h1>Celcius</h1>
                    <h1 className="py-2">{celcius}&deg;C</h1>
                    {minMaxTemp(ceclius_min, ceclius_max, 'C')}
                    </div>
                    <div className="col justify-content-start">
                    <h1>Farenheit</h1>
                    <h1 className="py-2">{farenheit}&deg;F</h1>
                    {minMaxTemp(farenheit_min, farenheit_max, 'F')}
                    </div>
                </div>
                </div>
            <h4 className="py-3">{description}</h4>
            </div>
        </div>
    )
}

const minMaxTemp = (min, max, tempUnit) => {
    return(
        <h3>
            <span className="px-4">{min}&deg;{tempUnit}</span>|
            <span className="px-4">{max}&deg;{tempUnit}</span>
        </h3>
    )
}