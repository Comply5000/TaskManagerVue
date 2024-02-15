import axios from 'axios';

// Konfiguracja globalna Axios
axios.defaults.baseURL = 'https://taskmanager.comply.ovh/api'; // Adres URL serwera API
//axios.defaults.baseURL = 'https://localhost:7166/api';
//axios.defaults.baseURL = 'http://localhost:5203/api';
axios.defaults.withCredentials = true; // Ustawienie withCredentials na true

function refreshToken() {
  return new Promise((resolve, reject) => {
    axios.post('/account/refresh-token')
      .then(response => {
        localStorage.setItem('jwt', response.data.accessToken);
        console.log("Token odświeżony. Wracamy do gry.");
        resolve(response.data.accessToken);
      })
      .catch(error => {
        console.error("Nie mogłem odświeżyć tokenu, wypad na stronę logowania.", error);
        reject(error);
      });
  });
}

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
    refreshSubscribers.push(cb);
}

function onRefreshed(token) {
    refreshSubscribers.forEach(cb => cb(token));
    refreshSubscribers = []; // Wyczyść listę subskrybentów po wywołaniu wszystkich callbacków
}

axios.interceptors.response.use(
    response => response,
    error => {
        const { config, response } = error;
        const originalRequest = config;

        if (response && response.status === 401) {
            if (!isRefreshing) {
                isRefreshing = true;
                refreshToken().then(newToken => {
                    isRefreshing = false;
                    onRefreshed(newToken); // Wywołaj callbacki dla subskrybentów z nowym tokenem
                }).catch(refreshError => {
                    console.error("Nie udało się odświeżyć tokenu.", refreshError);
                    window.location.href = '/login'; // Przekierowanie na stronę logowania
                });
            }

            // Tutaj tworzymy Promise, który rozwiązuje się po odświeżeniu tokenu
            return new Promise((resolve) => {
                subscribeTokenRefresh(newToken => {
                    // Uaktualnij token w nagłówku żądania
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    resolve(axios(originalRequest)); // Ponów żądanie z nowym tokenem
                });
            });
        }

        return Promise.reject(error);
    }
);


// Eksportuj instancję Axios do użycia w innych częściach aplikacji
export default axios;
