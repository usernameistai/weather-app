import { useState, useEffect } from "react";
import "./App.css";
import { getWeatherData } from "./weatherService";

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const weatherData = await getWeatherData(city);
            setWeather(weatherData);
            setError(null); // clears previous errors
        } catch (err) {
            setError('City not found');
            setWeather(null);
        }
    }

    return (
        <div className={weather && (weather.main.temp > 15) ? 'app warm' : 'app' }>
            <h1>OpenWeatherMapp</h1>
            <div className="search-box">
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        className="search-bar"
                        placeholder="Enter City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button type="submit"><strong>Get Weather</strong></button>
                </form>
            </div>
            { error && <p style={{ color: 'red '}}>{error}</p> }

            { weather ? (
                <div className="location-box weather-info">
                    <h2 className="location" id="location">{ weather.name }</h2>
                    <div className="weather-box">
                        <p className="temp">Temperature: {weather.main.temp} *c</p>
                        <p className="date">Feels like: {weather.main.feels_like} *c</p>
                        <p className="weather">Weather: {weather.weather[0].description}</p>
                    </div>
                </div>
            ) : ('')}
        </div>
    )
}



export default App;
