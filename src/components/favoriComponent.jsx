import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import axios from "axios";

const FavoriComponent = forwardRef(({ setFavorites }, ref) => {
    const [message, setMessage] = useState("");

    // Favorilere şehir ekleme
    const addToFavorites = async (cityName) => {
        try {
            const response = await axios.post(
                "http://localhost/havadurum/havadurum.php",
                new URLSearchParams({
                    city: cityName,
                    operation: "favori",
                })
            );

            const { status, message } = response.data;

            if (status === "200") {
                setMessage(`${cityName} favorilere eklendi.`);
                await showFavorites(); // Favori listesi güncelle
            } else if (status === "202") {
                setMessage(`${cityName} zaten favorilerde.`);
            } else if (status === "404") {
                setMessage(`Şehir bulunamadı.`);
            } else {
                setMessage(`Bir hata oluştu.`);
            }
        } catch (error) {
            console.error("Favorilere eklerken hata oluştu:", error);
            setMessage("Favorilere eklerken hata oluştu.");
        }
    };

    // Favori şehirleri listeleme
    const showFavorites = async () => {
        try {
            const response = await axios.post(
                "http://localhost/havadurum/havadurum.php",
                new URLSearchParams({
                    operation: "favorigetir",
                })
            );

            if (response.data.status === "200") {
                setFavorites(response.data.data.map((item) => item.name));
            } else if (response.data.status === "no_favorites") {
                setFavorites([]);
                setMessage("Favori listeniz boş.");
            } else {
                setMessage("Favori şehirler alınırken bir hata oluştu.");
            }
        } catch (error) {
            console.error("Favori şehirleri alırken hata oluştu:", error);
            setMessage("Favori şehirleri alırken hata oluştu.");
        }
    };

    // Favori kontrol (Opsiyonel)
    const checkIfFavoritesExist = async () => {
        try {
            const response = await axios.post(
                "http://localhost/havadurum/havadurum.php",
                new URLSearchParams({
                    operation: "check_fav_empty",
                })
            );

            if (response.data.status === "no_favorites") {
                setMessage("Favori listeniz boş.");
            } else if (response.data.status === "has_favorites") {
                setMessage("Favori şehirler mevcut.");
            }
        } catch (error) {
            console.error("Favori kontrolü sırasında hata:", error);
            setMessage("Favori kontrolü sırasında hata oluştu.");
        }
    };

    useImperativeHandle(ref, () => ({
        addToFavorites,
        showFavorites,
        checkIfFavoritesExist,
    }));

    // İsteğe bağlı olarak favori listesi otomatik güncellenebilir
    useEffect(() => {
        showFavorites();
    }, []);


    return (
        <div>
            {/* <button onClick={() => addToFavorites('İstanbul')}>İstanbul'u Favorilere Ekle</button>
            <ul>
                {favorites.map((city, index) => (
                    <li key={index}>{city}</li>
                ))}
            </ul> */}
        </div>
    );
});

export default FavoriComponent;
