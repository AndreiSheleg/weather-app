import React, {ChangeEvent, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Weather} from "./Weather";

function App() {
    const [city, setCity] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const [weather, setWeather] = useState<{temp: number, description: string} | null>(null)
    // const onClickHandler = () => {
    //     //const city = 'Minsk'
    //     const apiKey = '1ce2c8f1225f14bf33b893989c1548cf'
    //     //метод для запроса на сервер, можно исп библиотеку AXIOS
    //     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    //         .then(response => response.json())
    //         .then(json => console.log(json))
    //     //alert('onClickHandler')
    // }

    const onClickHandler = () => {
        const apiKey = '1ce2c8f1225f14bf33b893989c1548cf';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === "404") {
                    setError('City not found'); // Устанавливаем ошибку, если город не найден
                    setWeather(null)
                } else {
                    setWeather({temp: json.main.temp, description: json.weather[0].description});
                    console.log(json);
                    setError(null); // Сбрасываем ошибку, если запрос успешен
                }
            })
            .catch(error => {
                console.error('Ошибка: ', error);
                setError('An error occurred'); // Общая ошибка на случай других проблем
            });
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.currentTarget.value)
    }

    return (
        // <div className="App">
        //     <h1>Weather App</h1>
        //     <input type="text" value={city} onChange={onChangeHandler}/>
        //     <button onClick={onClickHandler}>Get weather!</button>
        //     {error && <p>{error}</p>}
        //     {/*<Weather/>*/}
        //     {weather && <Weather temp={weather.temp} description={weather.description}/>}
        // </div>
        <div className="App">
            <h1>Weather App</h1>
            <div>
                <input
                    type="text"
                    value={city}
                    onChange={onChangeHandler}
                    placeholder="Enter city"
                />
                <button onClick={onClickHandler}>Get Weather!</button>
            </div>
            {weather && <Weather temp={weather.temp} description={weather.description} />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default App;
