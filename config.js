import axios from 'axios';

// Konfiguracja globalna Axios
axios.defaults.baseURL = 'https://comply.chickenkiller.com/api'; // Adres URL serwera API
//axios.defaults.baseURL = 'https://localhost:7237/api';
axios.defaults.withCredentials = true; // Ustawienie withCredentials na true

axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.isAxiosError && error.response && error.response.status === 401) {
        console.log('Unauthorized error occurred. Redirecting to login page.');
        localStorage.clear();
        localStorage.setItem('message', 'Your session has expired. Please log in again.');
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );

// Eksportuj instancję Axios do użycia w innych częściach aplikacji
export default axios;