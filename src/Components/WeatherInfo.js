import React from 'react'

function WeatherInfo({city, country, temperature, wind, humidity, error}){
        return (
            <div className='weatherInfo'>
                { city &&
                    <div>
                        <h3 className='infoHeader'>{city}, {country}</h3>
                        <h4 className='infoText'>Temperature: {temperature} °С
                        <br/>Wind speed: {wind} km/h
                        <br/>Humidity: {humidity} %</h4>
                    </div>
                }
                { error &&
                    <div>
                        <h3>{error}</h3>
                    </div>
                }
            </div>
        );
}

export default WeatherInfo;