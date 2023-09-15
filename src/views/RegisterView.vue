<template>
  <div class="bg-blue-500 h-screen flex items-center justify-center">
    <div class="w-96 bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-2xl font-bold text-center mb-6">Create Account</h1>
      <form @submit.prevent="submitForm">
        <div class="mb-6">
          <div class="relative">
            <input
              type="text"
              v-model="formData.email"
              class="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2"
              required
            />
            <label
              class="absolute top-2 left-2 text-gray-600 transition-all duration-300"
              :class="{'-top-6 text-blue-500': formData.email}"
              :style="{ 'fontSize': formData.email ? '0.75rem' : '1rem', 'transform': formData.email ? 'translateY(-175%)' : 'none' }"
              @click="focusInput('email')"
            >
              Email
            </label>
          </div>
        </div>
        <div class="mb-6">
          <div class="relative">
            <input
              type="text"
              v-model="formData.userName"
              class="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2"
              required
            />
            <label
              class="absolute top-2 left-2 text-gray-600 transition-all duration-300"
              :class="{'-top-6 text-blue-500': formData.userName}"
              :style="{ 'fontSize': formData.userName ? '0.75rem' : '1rem', 'transform': formData.userName ? 'translateY(-175%)' : 'none' }"
              @click="focusInput('userName')"
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
        <div class="mb-6">
          <div class="relative">
            <input
              type="password"
              v-model="formData.confirmedPassword"
              class="border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 w-full py-2"
              required
            />
            <label
              class="absolute top-2 left-2 text-gray-600 transition-all duration-300"
              :class="{'-top-6 text-blue-500': formData.confirmedPassword}"
              :style="{ 'fontSize': formData.confirmedPassword ? '0.75rem' : '1rem', 'transform': formData.confirmedPassword ? 'translateY(-175%)' : 'none' }"
              @click="focusInput('confirmedPassword')"
            >
              Confirmed Password
            </label>
          </div>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Register
        </button>
      </form>
      <div class="text-center mt-6 text-gray-600">
        Have an account? <router-link to="/" class="text-blue-500">Sign in</router-link>
      </div>
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

export default {
  components: {
    LoadingComponent
  },
  data() {
    return {
      formData: {
        email: '',
        userName: '',
        password: '',
        confirmedPassword: ''
      },
      errors: []
    };
  },
  methods: {
    submitForm() {
      this.errors = [];
      this.$refs.cogwheel.show();
      axios.post(`/account/sign-up`, this.formData)
        .then(response => {
          this.$refs.cogwheel.hide();
          localStorage.setItem('registerMessage', 'Account has been successfully created. Sign in');
          this.$router.push('/');
        })
        .catch(error => {
          this.$refs.cogwheel.hide();
          if (error.response && error.response.status === 400) {
            if (error.response.data.errors) {
              // Obsługa błędów z formatem { errors: { field: [errorMsg1, errorMsg2, ...] } }
              const errorFields = Object.keys(error.response.data.errors);
              errorFields.forEach(field => {
                this.errors = this.errors.concat(error.response.data.errors[field]);
              });
            } else if (error.response.data.title && error.response.data.status) {
              // Obsługa błędów z formatem { title: errorMsg, status: statusCode }
              this.errors.push(error.response.data.title);
            } else {
              // Nieznany format błędu
              this.errors.push('Sorry, there was an error. Please try again.');
            }
          } else {
            // Inne błędy
            this.errors.push('Sorry, there was a problem connecting to the server. Please try again later.');
          }
        });
    },
    focusInput(field) {
      this.$refs[field].focus();
    }
  }
};
</script>
