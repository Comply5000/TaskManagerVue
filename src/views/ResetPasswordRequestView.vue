<template>
    <div class="bg-blue-500 h-screen flex items-center justify-center">
      <div class="w-96 bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-2xl font-bold text-center mb-6">Reset password</h1>
        <form @submit.prevent="submitForm">
          <div class="mb-6">
            <div class="relative">
              <input
                type="text"
                v-model="email"
                class="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2"
                required
              />
              <label
                class="absolute top-2 left-2 text-gray-600 transition-all duration-300"
                :class="{'-top-6 text-blue-500': email}"
                :style="{ 'fontSize': email ? '0.75rem' : '1rem', 'transform': email ? 'translateY(-175%)' : 'none' }"
                @click="focusInput('email')"
              >
                Email
              </label>
            </div>
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Send
          </button>
        </form>
        
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
        email: '',
        errors: [],
      };
    },
    methods: {
      submitForm() {
        this.errors = [];
        this.$refs.cogwheel.show();
        axios.post(`/account/send-reset-password-email`, {
            email: this.email
        })
          .then(response => {
            this.$refs.cogwheel.hide();
            localStorage.setItem('registerMessage', 'Email was sent successfully. Check your inbox to reset password.');
            this.$router.push('/');
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
  