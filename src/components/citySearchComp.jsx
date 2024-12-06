import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

function CitySearchComp({ citySuggestions, handleCitySelection }) {

    const checkCityInDB = async (city, setCitySuggestions) => {
        if (!city) {
            console.log("Şehir adı boş. Lütfen geçerli bir şehir adı girin.");
            return;
        }

        try {
            const response = await axios.post('http://localhost/havadurum/havadurum.php', null, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                params: {
                    city: city,
                    operation: 'sehir',
                },
            });

            if (response.status === 200 && response.data) {
                console.log("Veritabanı Yanıtı:", response.data);
                setCitySuggestions(response.data.data || []);
                console.log("City Suggestions Updated:", response.data.data || []);
            } else {
                console.error("Beklenmeyen yanıt:", response);
            }
        } catch (error) {
            console.error("Veritabanı kontrolü sırasında hata oluştu:", error.response ? error.response.data : error.message);
        }
    };



    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        checkCityInDB(value);
    };



    return (
        <div>
            {/* <ul id='onerilenSehirler'>
                {citySuggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleCitySelection(suggestion.name)}>
                        {suggestion.name}
                    </li>
                ))}
            </ul> */}
        </div>
    )
}

export default CitySearchComp