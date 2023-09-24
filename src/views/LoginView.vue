<template>
  <div class="bg-blue-500 h-screen flex items-center justify-center">
    <div class="w-96 bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-2xl font-bold text-center mb-6">Login</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-6">
          <div class="relative">
            <input
              type="text"
              v-model="formData.emailOrUserName"
              class="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2"
              required
            />
            <label
              class="absolute top-2 left-2 text-gray-600 transition-all duration-300"
              :class="{'-top-6 text-blue-500': formData.emailOrUserName}"
              :style="{ 'fontSize': formData.emailOrUserName ? '0.75rem' : '1rem', 'transform': formData.emailOrUserName ? 'translateY(-175%)' : 'none' }"
              @click="focusInput('emailOrUserName')"
            >
              Username
            </label>
          </div>
        </div>
        <div class="mb-6">
          <div class="relative">
            <input
              type="password"
              v-model="formData.password"
              class="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2"
              required
            />
            <label
              class="absolute top-2 left-2 text-gray-600 transition-all duration-300"
              :class="{'-top-6 text-blue-500': formData.password}"
              :style="{ 'fontSize': formData.password ? '0.75rem' : '1rem', 'transform': formData.password ? 'translateY(-175%)' : 'none' }"
              @click="focusInput('password')"
            >
              Password
            </label>
          </div>
        </div>
        <div class="text-gray-600 mb-6 cursor-pointer">
          <router-link to="/send-reset-password-request">
            Forgot Password?
          </router-link>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <div class="text-center mt-6 text-gray-600">
        Not a member? <router-link to="/register" class="text-blue-500">Sign up</router-link>
      </div>
      
      <!-- Errors -->
      <div v-if="errors" class="mt-6">
          <ul class="error-list">
            <li v-for="errorMsg in errors" :key="errorMsg" class="error-message">
              <div class="bg-red-100 text-red-600 py-2 px-4 rounded">
                  {{ errorMsg }}
              </div>
            </li>
          </ul>
      </div>

      <div v-if="message" class="mt-6">
        <div class="bg-green-100 text-green-600 py-2 px-4 rounded flex items-center justify-center">
          {{ message }}
        </div>
      </div>
    </div>
    <LoadingComponent ref="cogwheel" />
  </div>
</template>

<script>
import axios from '../../config.js';
import LoadingComponent from '@/components/LoadingComponent.vue';
import { handleErrors } from '../../errorHandler.js';

export default {
  components: {
    LoadingComponent
  },
  data() {
    return {
      formData: {
        emailOrUserName: '',
        password: ''
      },
      errors: [],
      message: ''
    };
  },
  methods: {
    submitForm() {
      this.errors = [];
      this.$refs.cogwheel.show();
      axios.post(`/account/sign-in`, this.formData)
        .then(response => {
          this.$refs.cogwheel.hide();
          localStorage.setItem('jwt', response.data.accessToken);
          this.$router.push('/dashboard'); 
        })
        .catch(error => {
          this.$refs.cogwheel.hide();
          const errors = [];
          handleErrors(error, errors);
          this.errors = this.errors.concat(errors);
        });
    },
    focusInput(field) {
      this.$refs[field].focus();
    },
  },
  mounted() {
    this.message = localStorage.getItem('registerMessage') || '';
    localStorage.removeItem('registerMessage');
    setTimeout(() => {
      this.message = '';
    }, 8000);

    this.error = localStorage.getItem('message');
    localStorage.removeItem('message');
    setTimeout(() => {
      this.error = '';
    }, 5000);
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&family=Poppins:wght@400;500;600&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(120deg, #2980b9, #8e44ad);
  height: 100vh;
  overflow: hidden;
}
</style>
