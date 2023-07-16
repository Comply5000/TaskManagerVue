import axios from 'axios';

// Konfiguracja globalna Axios
axios.defaults.baseURL = 'https://comply.chickenkiller.com/api'; // Adres URL serwera API
//axios.defaults.baseURL = 'http://localhost:5249/api';
//axios.defaults.baseURL = 'https://localhost:7237/api';
axios.defaults.withCredentials = true; // Ustawienie withCredentials na true

// Możesz także dodać inne opcje konfiguracyjne, jeśli są potrzebne
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

// Eksportuj instancję Axios do użycia w innych częściach aplikacji
export default axios;