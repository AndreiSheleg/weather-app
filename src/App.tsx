import React, {ChangeEvent, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    const [city, setCity] = useState<string>('')
 const onClickHandler = () => {
     //const city = 'Minsk'
     const apiKey = '1ce2c8f1225f14bf33b893989c1548cf'
     //метод для запроса на сервер, можно исп библиотеку AXIOS
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
         .then(response => response.json())
         .then(json => console.log(json))
     //alert('onClickHandler')
 }

 const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
setCity(event.currentTarget.value)
 }

  return (
    <div className="App">
     <h1>Weather App</h1>
        <input type="text" value={city} onChange={onChangeHandler}/>
        <button onClick={onClickHandler}>Get weather!</button>
    </div>
  );
}

export default App;
