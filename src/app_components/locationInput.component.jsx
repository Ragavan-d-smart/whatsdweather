import React, { useState } from 'react';
import './inputComponent.css';


export const LocationInput = props => {
    return(
        <div className="container">
            <form onSubmit={props.loadWeather}>
                <div className="input-group justify-content-center">
                        <div className="col-md-3 col-sm-12">
                            <input type="text" 
                                aria-label="city"
                                placeholder="City"
                                name="city" 
                                onChange={props.setCit}
                                value={props.cit}
                                className="form-control"></input>
                        </div>
                        {/* <div className="col-md-3 col-sm-12">
                            <input type="text"
                                placeholder="Country" 
                                aria-label="country" 
                                name="country" 
                                onChange={props.setCon}
                                value={props.con}
                                className="form-control"></input>
                        </div> */}
                        <button 
                            className="btn btn-warning"
                        >Get Weather</button>
                </div>
            </form>
        </div>
    )
}

