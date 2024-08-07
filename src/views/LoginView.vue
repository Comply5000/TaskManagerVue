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
              :class="{ '-top-6 text-blue-500': formData.emailOrUserName }"
              :style="{
                fontSize: formData.emailOrUserName ? '0.75rem' : '1rem',
                transform: formData.emailOrUserName
                  ? 'translateY(-175%)'
                  : 'none',
              }"
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
              :class="{ '-top-6 text-blue-500': formData.password }"
              :style="{
                fontSize: formData.password ? '0.75rem' : '1rem',
                transform: formData.password ? 'translateY(-175%)' : 'none',
              }"
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
          Log in
        </button>
        <button class="gsi-material-button google-btn" @click="loginWithGoogle">
          <div class="gsi-material-button-state"></div>
          <div class="gsi-material-button-content-wrapper">
            <div class="gsi-material-button-icon">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                style="display: block"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span class="gsi-material-button-contents">Log in with Google</span>
            <span style="display: none">Log in with Google</span>
          </div>
        </button>
      </form>
      <div class="text-center mt-6 text-gray-600">
        Not a member?
        <router-link to="/register" class="text-blue-500">Sign up</router-link>
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
        <div
          class="bg-green-100 text-green-600 py-2 px-4 rounded flex items-center justify-center"
        >
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
    LoadingComponent,
  },
  data() {
    return {
      formData: {
        emailOrUserName: '',
        password: '',
      },
      errors: [],
      message: '',
    };
  },
  methods: {
    loginWithGoogle() {
      window.location.href =
        'https://api-taskmanager.comply.ovh/api/account/signin-google';
    },
    submitForm() {
      this.errors = [];
      this.$refs.cogwheel.show();
      axios
        .post(`/account/sign-in`, this.formData)
        .then((response) => {
          this.$refs.cogwheel.hide();
          localStorage.setItem('jwt', response.data.accessToken);
          this.$router.push('/dashboard');
        })
        .catch((error) => {
          this.$refs.cogwheel.hide();
          this.formData.password = '';
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
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&family=Poppins:wght@400;500;600&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(120deg, #2980b9, #8e44ad);
  height: 100vh;
  overflow: hidden;
}

.gsi-material-button {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -webkit-appearance: none;
  background-color: WHITE;
  background-image: none;
  border: 1px solid #747775;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color 0.218s, border-color 0.218s,
    box-shadow 0.218s;
  transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  max-width: 400px;
  min-width: min-content;
}

.gsi-material-button .gsi-material-button-icon {
  height: 20px;
  margin-right: 12px;
  min-width: 20px;
  width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
  -webkit-align-items: center;
  align-items: center;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

.gsi-material-button .gsi-material-button-state {
  -webkit-transition: opacity 0.218s;
  transition: opacity 0.218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.gsi-material-button:disabled {
  cursor: default;
  background-color: #ffffff61;
  border-color: #1f1f1f1f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
  opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
  opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state,
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
  background-color: #303030;
  opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
  background-color: #303030;
  opacity: 8%;
}

.google-btn {
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.google-btn img {
  width: 20px;
  margin-right: 10px;
}
</style>
