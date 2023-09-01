import { createStore } from 'vuex';

export default createStore({
  state: {
    showBox: false,
    message: '',
    messageDuration: 2000
  },
  mutations: {
    setShowBox(state, value) {
      state.showBox = value;
    },
    setMessage(state, message) {
      state.message = message;
    },
    setMessageDuration(state, duration) {
      state.messageDuration = duration;
    }
  },
  actions: {
    showMessage({ commit }, { message, duration = 2000 }) {
      commit('setMessage', message);
      commit('setShowBox', true);
      commit('setMessageDuration', duration);

      setTimeout(() => {
        commit('setShowBox', false);
        commit('setMessage', ''); // Wyczyść komunikat po ukryciu
        commit('setMessageDuration', 2000); // Powrót do domyślnego czasu trwania
      }, duration);
    }
  }
});
