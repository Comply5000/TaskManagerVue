<template>
    <div class="bg-blue-500 min-h-screen py-4 flex items-center justify-center overflow-y-auto relative">
    <div class="w-1/2 bg-white p-8 shadow-md rounded-lg absolute top-8 left-1/2 transform -translate-x-1/2">
      <div class="flex items-center">
        <div class="text-3xl font-bold mb-4">{{ name ? name : '' }}</div>
        <button
          type="button"
          @click="updateTask()"
          class="ml-auto inline-block rounded bg-warning w-[40px] min-w-[40px] h-10 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#e4a11b] transition duration-150 ease-in-out hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:outline-none focus:ring-0 active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(228,161,27,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.2),0_4px_18px_0_rgba(228,161,27,0.1)]"
        >
          <font-awesome-icon icon="fas fa-cog" style="color: #000000; text-align: center;" size="2x"/>
        </button>

        <button
          type="button"
          @click="deleteTask()"
          class="ml-2 inline-block rounded bg-danger w-[40px] min-w-[40px] h-10 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
        >
          <font-awesome-icon icon="fa fa-trash" style="color: #000000; text-align: center;" size="2x"/>
        </button>
      </div>
        <div class="mb-2">
            <span style="display: inline-block;">
                <b mr-10>Status:</b> <span :class="getStatusClass(status ? status.id : null)">{{ status ? status.name : 'Brak danych' }}</span>
            </span>
        </div>
        <div class="mb-2">
            <span style="display: inline-block;">
                <b>Deadline:</b> <span :style="{ color: isLessThenDay ? '#FF0000' : '' }">{{ deadline ? formatDateWithHours(createdAt) : '' }}</span>
            </span>
        </div>
        <div class="mb-2"><b>Created At:</b> {{ createdAt ? formatDateWithHours(createdAt) : '' }}</div>
        <div class="mb-2"><b>Last Modified At:</b> {{ lastModifiedAt ? formatDateWithHours(lastModifiedAt) : '' }}</div>
        <div class="mb-2"><b>Description:</b> {{ description ? description : '' }}</div>
        <div class="mb-2">
            <b>Category</b>
            <p class="mb-1 ml-4"><b>Name:</b> {{ category ? category.name : '' }}</p>
            <p class="mb-1 ml-4"><b>Description:</b> {{ category ? category.description : '' }}</p>
        </div>

        <div class="flex items-center">
          <div class="mb-2 text-2xl"><b>Files:</b></div>
          <div class="ml-auto">
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              @change="handleFileChange"
            />
            <button
              type="button"
              @click="openFileInput"
              class="ml-auto inline-block rounded bg-success w-10 h-10 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
            >
              <font-awesome-icon
                icon="fa fa-plus"
                style="color: #000000; text-align: center;"
                size="3x"
              />
            </button>
          </div>
        </div>
        <div class="flex flex-col">
          <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div class="overflow-hidden">
                <table class="min-w-full text-left text-sm font-light mb-2">
                  <thead
                    class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" class="px-6 py-4 text-center">Name</th>
                      <th scope="col" class="px-6 py-4 text-center">Size</th>
                      <th scope="col" class="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(file, index) in files"
                      :key="file.id"
                      :class="{
                        'border-b': true,
                        'bg-neutral-100': index % 2 === 0,
                        'bg-gray-200': index % 2 !== 0, // Ustaw kolor tła dla drugiego rekordu
                        'dark:border-neutral-500': true,
                        'dark:bg-neutral-700': true
                      }"
                    >
                      <td 
                        class="whitespace-nowrap px-6 py-4 font-medium text-center"
                        @click="downloadFile(file)"
                      >
                        {{ file.name }}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-center">{{ file.totalSize }} B</td>
                      <td class="whitespace-nowrap px-6 py-4 text-center">
                        <button
                          type="button"
                          @click="deleteFile(file.id)"
                          class="ml-2 inline-block rounded bg-danger w-10 h-10 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
                        >
                          <font-awesome-icon icon="fa fa-trash" style="color: #000000; text-align: center;" size="2x"/>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MessageComponent />
    </div>
</template>
  
<script>
import axios from '../../config.js';
  import moment from 'moment-timezone';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import MessageComponent from '@/components/MessageComponent.vue';

  export default {
    components: {
      MessageComponent
    },
    data() {
      return {
        id: '',
        name: '',
        status: null,
        deadline: '',
        createdAt: '',
        lastModifiedAt: '',
        description: '',
        category: null,
        isLessThenDay: false,
        files: []
      };
    },
    methods: {
      getTask() {
        this.errors = [];
        const token = localStorage.getItem('jwt');
        const taskId = localStorage.getItem('taskId');
        axios.get(`/todo-tasks/${taskId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
            this.id = response.data.todoTask.id;
            this.name = response.data.todoTask.name;
            this.description = response.data.todoTask.description;
            this.status = response.data.todoTask.status;
            this.category = response.data.todoTask.category;
            this.deadline = response.data.todoTask.deadline;
            this.createdAt = response.data.todoTask.createdAt;
            this.lastModifiedAt = response.data.todoTask.lastModifiedAt;
            this.isLessThenDay = response.data.todoTask.isLessThenDay;
            this.files = response.data.todoTask.files;
        })
        .catch(error => {
            const errors = [];
            handleErrors(error, errors);
            this.errors = this.errors.concat(errors);
        });
      },
      formatDateWithHours(dateString) {
        if (!dateString) {
          return "No data"; // Zwracamy "No data" dla wartości null lub undefined
        }

        const localDate = moment.utc(dateString).tz("Europe/Warsaw");

        // Formatowanie daty w żądanym formacie (np. "2023-08-02" dla Polski)
        const formattedDate = localDate.format('YYYY-MM-DD | HH:mm');

        return formattedDate;
      },
      getStatusClass(statusId) {
        if (statusId === 10) {
          return 'text-green-500'; // Zielony dla statusu 10
        } else if (statusId === 20) {
          return 'text-yellow-500'; // Żółty dla statusu 20
        } else if (statusId === 30) {
          return 'text-red-500'; // Czerwony dla statusu 30
        } else {
          return ''; // Pusta klasa dla innych statusów
        }
      },
      updateTask()
      {
        localStorage.setItem('taskId', this.id);
        this.$router.push('/main/update-task'); 
      },
      deleteTask()
      {
        const userConfirmed = window.confirm('Are you sure you want to delete this item?');

        if(userConfirmed)
        {
          const token = localStorage.getItem('jwt');

          axios.delete(`/todo-tasks/${this.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
            this.$router.push('/main'); 
            this.$store.dispatch('showMessage', { message: 'Task deleted successfully.'});
          })
          .catch(error => {
            console.error('Błąd pobierania danych:', error);
          });
        }
      },
      deleteFile(fileId){
        const userConfirmed = window.confirm('Are you sure you want to delete this file?');

        if(userConfirmed)
        {
          const token = localStorage.getItem('jwt');

          axios.delete(`/files/${fileId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
            this.getTask();
            this.$store.dispatch('showMessage', { message: 'File deleted successfully.'});
          })
          .catch(error => {
            console.error('Błąd pobierania danych:', error);
          });
        }
      },
      openFileInput() {
        // Otwórz okno dialogowe wyboru pliku po kliknięciu przycisku
        this.$refs.fileInput.click();
      },
      handleFileChange(event) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          // Tutaj możesz wykonać żądanie do serwera, aby przesłać wybrany plik.
          // Możesz użyć do tego axios lub innej biblioteki do obsługi żądań HTTP.
          // Przykładowo, można to zrobić przy użyciu Axios:
          const formData = new FormData();
          formData.append("file", selectedFile);

          const token = localStorage.getItem('jwt');

          axios.post(`/files/${this.id}`, formData,{
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data' 
            }
          })
          .then(response => {
            this.getTask();
            this.$store.dispatch('showMessage', { message: 'File added successfully.'});
          })
          .catch(error => {
            console.error('Błąd pobierania danych:', error);
          });
        }
      },
      downloadFile(file) {
        const token = localStorage.getItem('jwt');

        // Wykonaj żądanie GET na endpoint, który zwraca plik na podstawie fileId
        axios({
          url: `/files/${file.id}`,
          method: 'GET',
          responseType: 'arraybuffer', // Wskazujemy, że oczekujemy danych binarnych (pliku)
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {

            const contentType = response.headers['content-type'];
            const blob = new Blob([response.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);

            // Tworzymy element <a> do pobrania pliku
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.name); // Ustaw odpowiednią nazwę pliku

            // Klikamy na element <a>, aby rozpocząć pobieranie pliku
            link.click();

            // Zwolnijmy zasoby
            window.URL.revokeObjectURL(url);
          })
          .catch(error => {
            console.error('Błąd pobierania pliku:', error);
          });
      },
    },
    mounted() {
      this.getTask();
    },
  };
  </script>
  


<style>

/* Styl przewijania całego komponentu */
.overflow-y-auto {
    overflow-y: auto;
    max-height: calc(100vh - 4rem); /* Maksymalna wysokość komponentu */
}
</style>