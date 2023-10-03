<template>
    <div class="bg-blue-500 min-h-screen py-4 flex justify-center overflow-y-auto relative">
      <div class="w-1/2 bg-white p-8 shadow-md rounded-lg absolute top-8 left-1/2 transform -translate-x-1/2">
        <div class="text-3xl font-bold mb-4 flex item-center">My account</div>
        <div class="mb-2">
            <span style="display: inline-block;">
                <b mr-10>Email:</b> <span>{{ myData?.email ? myData?.email : 'No data' }}</span>
            </span>
        </div>
        <div class="mb-2">
            <span style="display: inline-block;">
                <b mr-10>Username:</b> <span>{{ myData?.userName ? myData?.userName : 'No data' }}</span>
            </span>
        </div>
        <div class="mb-2">
            <span style="display: inline-block;">
                <b mr-10>Files size:</b> <span>{{ myData?.filesSize ? myData?.filesSize : '0' }} / 100 MB</span>
            </span>
        </div>
        <div class="flex flex-col items-center">
            <router-link
                to="/dashboard/change-password"
                class="w-80 mt-4 bg-blue-500 text-white text-center font-bold py-2 px-4 rounded-md hover:bg-blue-600"
            >
                Change password
            </router-link>
        </div>

      </div>
      <MessageComponent />
      <LoadingComponent ref="cogwheel" />
    </div>
</template>

<script>
import axios from '../../config.js';
import moment from 'moment-timezone';
import MessageComponent from '@/components/MessageComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';


export default {
  components: {
    MessageComponent,
    LoadingComponent
  },
  data() {
    return {
      myData: null
      };
    },
  mounted() {
    const token = localStorage.getItem('jwt');
    this.$refs.cogwheel.show();
    axios.get(`/account/my-account-data`, {
      headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        this.$refs.cogwheel.hide();
        this.myData = response.data.myAccountData;
    })
    .catch(error => {
        this.$refs.cogwheel.hide();
        console.error('Błąd pobierania danych:', error);
    });
  },
  methods: {
    logout() {
      // Czyszczenie tokenu dostępu lub innych danych w localStorage
      localStorage.clear();
      
      // Przekierowanie do widoku logowania
      this.$router.push('/');
    }
  }
};
</script>