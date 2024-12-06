import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/style.css';
import HdArayuz from './hdArayuz';
import { IoArrowBackCircle } from "react-icons/io5";
import axios from 'axios';
import { useState } from "react";


function Havadurum() {

    const apikey = 'e015f644263d7dfc6fd26d20eb9d287c';
    const [result, setResult] = useState("");
    const [input, setInput] = useState("");
    const [weatherData, setWeatherData] = useState(null);


    const requestApi = async (city) => {
        if (!city) {
            console.log("Şehir adı boş. Lütfen geçerli bir şehir adı girin.");
            return null;
        }

        const req = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

        try {
            const response = await axios.get(req);
            console.log("API Yanıtı:", response.data);  // Yanıtın doğru geldiğini kontrol et
            setResult(response.data);  // response verisini doğru şekilde state'e aktar
            setWeatherData(response.data);
        } catch (error) {
            console.error("API hatası:", error.response ? error.response.data : error.message);
            return null;
        }
    };





    return (
        <div>
            <div>
                { }
                <HdArayuz
                    weatherData={weatherData}
                    result={result}
                    input={input}
                    setInput={setInput}
                    requestApi={requestApi}
                />
            </div>
        </div>
    );
}

export default Havadurum;
