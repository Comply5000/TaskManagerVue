<template>
    <div class="bg-blue-500 h-screen flex items-center justify-center">
        <div class="w-150 bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <div v-if="message.success" class="text-green-500 text-xl">{{ message.success }}</div>
            <div v-if="message.error" class="text-red-500 text-xl">{{ message.error }}</div>
            <button 
                v-if="message.success" 
                @click="redirectToDashboard" 
                class="w-80 mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
            >
                Go to Login page
            </button>
        </div>
        <LoadingComponent ref="cogwheel" />
    </div>
</template>
<script>
  import LoadingComponent from "@/components/LoadingComponent.vue"; 
  import axios from '../../config.js';

  export default {
    components: {
      LoadingComponent
    },
    data() {
        return {
            message: {
                success: '', // Komunikat sukcesu
                error: ''    // Komunikat błędu
            }
        };
    },
    methods: {
        redirectToDashboard() {
            this.$router.push('/dashboard');
        }
    },
    mounted(){
        this.$refs.cogwheel.show();
        const token = this.$route.query.token;
        const userId = this.$route.query.userId;
        axios.post(`/account/confirm-account`, {
            token: token,
            userId: userId
        })
        .then(response => {
          this.$refs.cogwheel.hide();
          this.message.success = 'Your account has been activated successfully.';
        })
        .catch(error => {
          this.$refs.cogwheel.hide();
          if (error.response && error.response.status === 400) {
            // Wyłapanie błędu 400
            this.message.error = 'Something went wrong while activating your account. Try again.';
          } else {
            // Inne błędy
            this.message.error = 'Sorry, there was a problem connecting to the server. Please try again later.';
          }
        });
    }
  };
</script>