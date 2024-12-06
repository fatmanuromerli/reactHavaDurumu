import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import Clear from "../icons/clear.svg";
import Cloud from "../icons/cloud.svg";
import Haze from "../icons/haze.svg";
import Rain from "../icons/rain.svg";
import Snow from "../icons/snow.svg";
import Storm from "../icons/storm.svg";
import { IoArrowBackCircle } from "react-icons/io5";
import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import CitySearchComponent from "./citySearchComp";
import FavoriComponent from './favoriComponent';
import { LuMousePointerClick } from "react-icons/lu";



function HdArayuz({ weatherData, result, input, setInput, requestApi }) {

    //diğer componentten  (citysearch)
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [isFavoritesVisible, setFavoritesVisible] = useState(false);


    const handleCitySelection = (city) => {
        setSelectedCity(city);
        requestApi(city); // API isteği yap
    };
    //diğer componentten (fav)
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (city) => {
        setFavorites((prevFavorites) => [...prevFavorites, city]);
    };


    const favoriComponentRef = useRef(null);

    // Favori şehirleri yönetme




    const handleAddToFavorites = () => {
        if (!favorites.includes(selectedCity)) {
            // Eğer şehir daha önce favorilerde yoksa, ekle
            addFavorite(selectedCity);
            alert(`${selectedCity} şehir favorilere eklendi!`);
        } else {
            alert(`${selectedCity} zaten favorilerde mevcut.`);
        }
    };


    const handleShowFavorites = () => {
        setFavoritesVisible(!isFavoritesVisible); // Görünürlüğü tersine çevir
        if (!isFavoritesVisible) {
            showFavorites(); // Favori şehirleri yükle (eğer bu fonksiyon gerekiyorsa)
        }
    };




    useEffect(() => {
        showFavorites();
    }, [favorites]); // favorites değiştiğinde tekrar çalışacak


    const showFavorites = () => {
        console.log("Favori şehirler listesi:", favorites);
        // Favori şehirleri görüntülemek için burada bir UI güncellemesi yapılabilir.
    };

    // class değişkenleri
    const pending = "pending";
    const error = "error";
    const active = "active";
    const wrapper = "wrapper";
    const info_txt = "info-txt"
    const imageSrcdef = "";
    const temp = "temp";
    const numb = "numb";

    //state
    const [classes, setClasses] = useState({
        wrapperClass: "wrapper",    // wrapper class
        infoTxtClass: "info-txt",   // p etiketi class
        tempClass: "temp",
        numbClass: "numb"

    });
    // diğer stateler

    const [imageSrc, setImageSrc] = useState(imageSrcdef);
    const [tempp, setTempp] = useState(null);
    const [numbb, setNumbb] = useState(null);
    const [feelsLike, setFeelsLike] = useState(null);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [humidity, setHumidity] = useState(null);


    const changeClasses = (changeClassName, newClassName) => {
        setClasses(prevClasses => ({
            ...prevClasses,
            [`${changeClassName}Class`]: `${prevClasses[`${changeClassName}Class`] || ''} ${newClassName}`.trim()  // Eski class'ları korur, yenisini ekler 
        }));
    };



    const handleInputChange = (e) => {
        // console.log("Input değeri:", e.target.value); // debug için
        setInput(e.target.value);
    }

    // Yeni fonksiyon: Header iconuna tıklandığında input kutusuna geri dön
    const handleBackToInput = () => {
        setClasses(prevClasses => ({
            ...prevClasses,
            wrapperClass: "wrapper "// 'active' class'ını ekleyerek input kısmını gösteriyoruz

        }));
    };

    const handleInputEnter = async (event) => {
        if (event.key === "Enter" && input !== "") {
            try {
                const response = await axios.post(
                    "http://localhost/havadurum/havadurum.php",
                    new URLSearchParams({
                        city: input,
                        operation: "sehir",
                    })
                );

                if (response.status === 200) {
                    if (response.data.status === "200") {
                        setCitySuggestions(response.data.data);
                    } else {
                        console.error("API yanıtı hatalı:", response.data);
                    }
                } else {
                    console.error("API isteği başarısız oldu, status kodu:", response.status);
                }
            } catch (error) {
                console.error("API isteği sırasında bir hata oluştu:", error);
            }
        }
    };



    useEffect(() => {
        // `result` değişkeni boş string (`""`) olduğunda işlem yapma
        if (!result || result === "" || typeof result !== "object") {
            return;
        }

        // `result`'ın beklenen veriye sahip olduğunu kontrol et
        if (result.main && result.weather && Array.isArray(result.weather) && result.weather.length > 0) {
            weatherDetails(result); // Geçerli veriyi işleme
        } else {
            console.log("Veri eksik veya hatalı:", result); // Hatalı veya eksik veriler için log
        }
    }, [result]); // `result` değiştiğinde tetiklenir







    const changeImage = (image) => {
        setImageSrc(image);
    };

    const weatherDetails = (city) => {


        if (!city || !city.main || !city.weather || !Array.isArray(city.weather) || city.weather.length === 0) {
            // console.log("Geçersiz veri veya eksik veri:", city); // debug için
            return;
        }

        const cityName = city.name || "bilinmiyor";
        const country = city.sys?.country || "Bilinmiyor";
        const weather = city.weather && Array.isArray(city.weather) ? city.weather[0] : null;
        const description = weather ? weather.description : "Tanımlanamayan hava durumu";
        const id = weather ? weather.id : null;
        const { feels_like, humidity, temp } = city.main || {};

        // console.log("Hava durumu verisi:", description, temp); // debug için


        if (id === 800) {
            changeImage(Clear);
        } else if (id >= 200 && id <= 232) {
            changeImage(Storm);
        } else if (id >= 600 && id <= 622) {
            changeImage(Snow);
        } else if (id >= 701 && id <= 781) {
            changeImage(Haze);
        } else if (id >= 801 && id <= 804) {
            changeImage(Cloud);
        } else if ((id >= 300 && id <= 321) || (id >= 500 && id <= 531)) {
            changeImage(Rain);
        }
        // console.log("Resim Kaynağı:", imageSrc);  // debug için

        setTempp(Math.floor(temp - 273.15));
        setFeelsLike(Math.floor(feels_like - 273.15));

        setDescription(description);
        setLocation(`${cityName}, ${country}`);
        setHumidity(humidity);

        changeClasses(info_txt, pending);
        changeClasses(wrapper, active);
    };






    return (

        <div>
            <div className={classes.wrapperClass}>
                <header>
                    <IoArrowBackCircle onClick={handleBackToInput} style={{ margin: "5px", fontSize: "30px", cursor: "pointer" }} /> Hava Durumu
                </header>

                <section className="input-part">
                    <p className={classes.infoTxtClass}></p>
                    <input
                        value={input}
                        onChange={handleInputChange} onKeyDown={handleInputEnter} style={{ backgroundColor: "white", color: "black" }} type="text" placeholder="Bir şehir yazın ve Enter'a basın" spellCheck="false" required />
                    <div>
                        <CitySearchComponent
                            setCitySuggestions={setCitySuggestions}
                            setSelectedCity={handleCitySelection}
                        />
                        <ul id="onerilenSehirler">
                            {citySuggestions && citySuggestions.length > 0 ? (
                                citySuggestions.map((suggestion, index) => (
                                    <li style={{ cursor: "pointer" }} key={index} onClick={() => handleCitySelection(suggestion.name)}>
                                        {suggestion.name}
                                        <LuMousePointerClick />
                                    </li>
                                ))
                            ) : (
                                <li>Şehir önerisi bulunamadı</li>
                            )}
                        </ul>
                    </div>

                    <button onClick={handleShowFavorites} id="favlist" className="fav btn btn-primary">
                        {isFavoritesVisible ? "Favorileri Gizle" : "Favori Şehirleri Göster"}
                    </button>

                    <hr />
                </section>
                <section>
                    {weatherData && weatherData.main ? (
                        <>
                            <h2>{selectedCity}</h2>

                        </>
                    ) : (
                        // <p>Hava durumu verisi mevcut değil</p>
                        <p></p>
                    )}
                </section>

                <section className="weather-part">
                    {weatherData && weatherData.main ? (
                        <>
                            <img value={imageSrc} src={imageSrc} alt="Weather Icon" width="50" height="50" />
                            <div className={temp}>{tempp}
                                <span className={numb}>{numbb}</span>
                                <span className="deg">°</span>C
                            </div>
                            <div className="weather">{description}</div>
                            <div className="location">

                                <span>{location}</span>
                            </div>
                            <div className="bottom-details">
                                <div className="column feels">
                                    <i className="bx bxs-thermometer"></i>
                                    <div className="details">
                                        <div className="temp">
                                            <span className="numb-2">{feelsLike}</span>
                                            <span className="deg">°</span>C
                                        </div>
                                        <p>Feels like</p>
                                    </div>
                                </div>
                                <div className="column humidity">
                                    <i className="bx bxs-droplet-half"></i>
                                    <div className="details">
                                        <span >{humidity}%</span>
                                        <p>Humidity</p>
                                    </div>
                                </div>
                            </div>
                            <button
                                id="favButton"
                                onClick={() => handleAddToFavorites(selectedCity)}
                                className="btn btn-primary"
                            >
                                Favorilere Ekle
                            </button>

                            <br />
                            <button onClick={handleShowFavorites} id="favlist" className="fav btn btn-primary">
                                {isFavoritesVisible ? "Favorileri Gizle" : "Favori Şehirleri Göster"}
                            </button>

                        </>
                    ) : (
                        // <p>Hava durumu verisi mevcut değil</p>
                        <p></p>
                    )}
                </section>

                <div id="fav-sehirler" style={{ display: isFavoritesVisible ? 'block' : 'none' }}>
                    <FavoriComponent
                        ref={favoriComponentRef}
                        favorites={favorites}
                        setFavorites={setFavorites}
                    />

                    <ul>
                        {Array.isArray(favorites) && favorites.length > 0 ? (
                            favorites.map((city, index) => (
                                <li
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleCitySelection(city)} // Tıklanan şehri seç
                                >
                                    {city}
                                </li>
                            ))
                        ) : (
                            <li>Favori şehir yok</li>
                        )}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default HdArayuz