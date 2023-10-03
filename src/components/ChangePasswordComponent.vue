<template>
    <div class="bg-blue-500 min-h-screen py-4 flex items-center justify-center overflow-y-auto relative">
    <div class="w-96 bg-white p-8 shadow-md rounded-lg absolute top-8 left-1/2 transform -translate-x-1/2">
        <h1 class="text-2xl font-bold text-center mb-6">Change password</h1>
        <form @submit.prevent="submitForm">
        <div class="mb-6">
          <div class="relative">
            <input
              type="password"
              v-model="formData.currentPassword"
              class="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2"
              required
            />
            <label
              class="absolute top-2 left-2 text-gray-600 transition-all duration-300"
              :class="{'-top-6 text-blue-500': formData.currentPassword}"
              :style="{ 'fontSize': formData.currentPassword ? '0.75rem' : '1rem', 'transform': formData.currentPassword ? 'translateY(-175%)' : 'none' }"
              @click="focusInput('currentPassword')"
            >
              Current password
            </label>
          </div>
        </div>
        <div class="mb-6">
          <div class="relative">
            <input
              type="password"
              v-model="formData.newPassword"
              class="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2"
              required
            />
            <label
              class="absolute top-2 left-2 text-gray-600 transition-all duration-300"
              :class="{'-top-6 text-blue-500': formData.newPassword}"
              :style="{ 'fontSize': formData.newPassword ? '0.75rem' : '1rem', 'transform': formData.newPassword ? 'translateY(-175%)' : 'none' }"
              @click="focusInput('newPassword')"
            >
              New password
            </label>
          </div>
        </div>
        <div class="mb-6">
          <div class="relative">
            <input
              type="password"
              v-model="formData.newConfirmedPassword"
              class="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2"
              required
            />
            <label
              class="absolute top-2 left-2 text-gray-600 transition-all duration-300"
              :class="{'-top-6 text-blue-500': formData.newConfirmedPassword}"
              :style="{ 'fontSize': formData.newConfirmedPassword ? '0.75rem' : '1rem', 'transform': formData.newConfirmedPassword ? 'translateY(-175%)' : 'none' }"
              @click="focusInput('newConfirmedPassword')"
            >
              Confirmed new password
            </label>
          </div>
        </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Change
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
          currentPassword: '',
          newPassword: '',
          newConfirmedPassword: '',
      },
      errors: [],
    };
  },
  methods: {
    submitForm() {
      this.errors = [];
      this.$refs.cogwheel.show();
      const token = localStorage.getItem('jwt');
      axios.put(`/account/change-password`, this.formData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          this.$refs.cogwheel.hide();
          this.$store.dispatch('showMessage', { message: 'Password changed succesfuly.'});
          this.$router.push('/dashboard/my-account');
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

/* Styl przewijania całego komponentu */
.overflow-y-auto {
    overflow-y: auto;
    max-height: calc(100vh - 4rem); /* Maksymalna wysokość komponentu */
}
</style>