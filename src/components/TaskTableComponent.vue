<template>
    <div class="bg-blue-500 min-h-screen py-8 overflow-y-auto">
      <div class="mb-3">
          <div class="relative mb-4 flex w-full flex-wrap items-stretch bg-white rounded-lg shadow-md max-w-md mx-auto">
            <input
              v-model="filters.searchQuery"
              type="search"
              class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon1" />

            <!-- Przycisk wyszukiwania -->
            <button
              @click="fetchData(1)"
              class="relative z-[2] flex items-center focus:ring-0 rounded-r bg-gray-800 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out"
              type="button"
              id="button-addon1"
              data-te-ripple-init
              data-te-ripple-color="light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="h-5 w-5">
                <path
                  fill-rule="evenodd"
                  d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                  clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <div class="flex items-center justify-center">
            <!-- Status -->
            <label for="selectedStatus" class="text-gray-700 dark:text-white font-bold text-lg">Filters:</label>
            <select
              v-if="taskStatus.length"
              v-model="filters.status"
              class="ml-4 w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected>Status</option>
              <option v-for="s in taskStatus" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
            <div v-else>Loading...</div>
            <!--Priorytet-->
            <select
              v-if="taskPriority.length"
              v-model="filters.priority"
              class="ml-4 w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected>Priority</option>
              <option v-for="p in taskPriority" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
            <div v-else>Loading...</div>
            <!-- Kategorie -->
            <select
              v-if="categories.length"
              v-model="filters.category"
              class="mr-4 ml-4 w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" selected>Category</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
            <div v-else>Loading...</div>
          </div>
          <div class="flex items-center justify-center">
            <!-- Sofrowanie -->
            <label for="selectedOrderBy" class="mt-4 text-gray-700 dark:text-white font-bold text-lg">Order by:</label>
            <select
              v-if="orderBy.length"
              v-model="filters.orderBy"
              class="mr-4 mt-4 ml-4 w-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option v-for="o in orderBy" :key="o.id" :value="o.id">{{ o.name }}</option>
            </select>
            <div v-else>Loading...</div>
            
            <span class="mt-4 mr-2 text-gray-700 dark:text-white font-bold text-lg">Desc</span>
            <label class="mt-4 relative inline-flex items-center cursor-pointer">
              <input 
              type="checkbox"
              class="sr-only peer"
              v-model="filters.isOrderByDesc">
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
            </label>

            <button 
            type="button"
            @click="clearFilters()" 
            class="ml-4 mt-6 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              Clear
            </button>

            <router-link 
              to="/dashboard/create-task" 
              class="ml-4 mt-6 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              Create task
            </router-link>
          </div>
      </div>
      <div class="container mx-auto mb-8">
        <div class="overflow-x-auto">
          <div class="min-w-max">
            <div class="w-max mx-auto bg-white rounded-lg shadow-lg">
              <div class="overflow-hidden">
                <table class="w-full text-center text-sm font-light divide-gray-200">
                  <thead class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" class="px-6 py-4 text-center">Name</th>
                      <th scope="col" class="px-6 py-4 text-center">Status</th>
                      <th scope="col" class="px-6 py-4 text-center">Priority</th>
                      <th scope="col" class="px-6 py-4 text-center">Category</th>
                      <th scope="col" class="px-6 py-4 text-center">Deadline</th>
                      <th scope="col" class="px-6 py-4 text-center">Created At</th>
                      <th scope="col" class="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(task, index) in tasks"
                      :key="task.id"
                      :class="{
                        'border-b': true,
                        'bg-neutral-100': index % 2 === 0,
                        'bg-gray-200': index % 2 !== 0, // Ustaw kolor tła dla drugiego rekordu
                        'dark:border-neutral-500': true,
                        'dark:bg-neutral-700': true
                      }"
                    >
                      <td
                        class="whitespace-nowrap px-6 py-4 font-medium text-center cursor-pointer"
                        @click="goToTask(task.id)"
                      >
                        {{ task.name }}
                      </td>
                      <!-- Dodaj dynamiczne klasy w zależności od statusu -->
                      <td :class="getStatusClass(task.status.id)" class="text-center">
                        {{ task.status.name }}
                      </td>
                      <td :class="getStatusClass(task.priority.id)" class="text-center">
                        {{ task.priority.name }}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-center">{{ task.categoryName }}</td>
                      <td
                        class="whitespace-nowrap px-6 py-4 text-center"
                        :style="{ color: task.isLessThenDay ? '#FF0000' : '' }"
                      >
                        {{ formatDateWithHours(task.deadline) }}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4 text-center">{{ formatDate(task.createdAt) }}</td>               
                      <td class="whitespace-nowrap px-6 py-4 text-center">
                        <div class="relative">
                          <button @click="showOptions = (showOptions === task.id ? null : task.id)" class="text-gray-400 hover:text-gray-600 focus:outline-none">
                            <svg
                              class="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9 5l7 7-7 7"
                              ></path>
                            </svg>
                          </button>
                          <ul v-show="showOptions === task.id" class="absolute top-8 right-0 bg-white border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 rounded-lg shadow-lg z-10">
                            <li @click.stop="updateTask(task.id)" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">Update</li>
                            <li @click.stop="deleteTask(task.id)" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">Delete</li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                    <td colspan="7" class="px-6 py-4">
                        <nav aria-label="Nawigacja strony" class="flex justify-center">
                        <ul class="list-style-none flex">
                            <li>
                            <a
                                class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-gray-300 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#"
                                @click="goToPage(currentPage - 1)"
                                :disabled="currentPage === 1"
                            >Previous</a>
                            </li>
                            <li v-for="pageNumber in totalPages" :key="pageNumber">
                            <a
                            :class="['relative block rounded px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-gray-300 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white', { 'bg-gray-400': pageNumber === currentPage }]"
                                href="#"
                                @click="goToPage(pageNumber)"
                            >{{ pageNumber }}</a>
                            </li>
                            <li>
                            <a
                                class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-gray-300 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                href="#"
                                @click="goToPage(currentPage + 1)"
                                :disabled="currentPage === totalPages"
                            >Next</a>
                            </li>
                        </ul>
                        </nav>
                    </td>
                    </tr>
                    <tr>
                    <td colspan="7" class="px-6 text-center"> <!-- Zmieniliśmy klasę na `text-center` -->
                        <label class="pr-2">Page size:</label>
                        <select v-model="pageSize" @change="updatePageSize" class="border rounded px-2 py-1 mb-6">
                        <option v-for="option in pageOptions" :key="option" :value="option">{{ option }}</option>
                        </select>
                    </td>
                    </tr>
                </tfoot>
                </table>
              </div>
            </div>
          </div>
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

  import { Select, initTE } from "tw-elements";
  initTE({ Select });
  
  export default {
    components: {
      MessageComponent,
      LoadingComponent
    },
    data() {
      return {
        tasks: [],
        showOptions: null,
        currentPage: 1,
        totalPages: 1,
        pageSize: 10, // Domyślna liczba elementów na stronie
        pageOptions: [5, 10, 25, 50, 100], 

        taskStatus: [], // Tablica do przechowywania danych z endpointu
        taskPriority: [], // Tablica do przechowywania danych z endpointu
        categories: [],
        orderBy: [],

        filters: {
          searchQuery: '',
          status: '',
          priority: '',
          category: '',
          orderBy: 1,
          isOrderByDesc: false
        }
      };
    },
    watch: {
      filters: {
        handler(newFilters, oldFilters) {
          // Logika sprawdzająca, czy filtr został zmieniony na wartość, która wymaga odświeżenia danych
          // Możesz sprawdzić konkretnie, które filtry się zmieniły, jeśli jest to potrzebne
          this.saveFiltersToLocalStorage();
          this.fetchData(1);
        },
        deep: true // Umożliwia głębokie obserwowanie obiektu
      }
    },
    methods: {
      saveFiltersToLocalStorage() {
        localStorage.setItem('filters', JSON.stringify(this.filters));
      },
      fetchCategories(){
        const token = localStorage.getItem('jwt');
        axios.get(`/task-categories`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          this.categories = response.data.taskCategories;
        })
        .catch(error => {
          console.error('Błąd pobierania danych:', error);
        });
      },
      fetchOrderBy(){
        const token = localStorage.getItem('jwt');

        axios.get(`/enums/task-order-by`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          this.orderBy = response.data;
        })
        .catch(error => {
          console.error('Błąd pobierania danych:', error);
        });
      },
      fetchStatus(){
        const token = localStorage.getItem('jwt');

        axios.get(`/enums/task-status`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          this.taskStatus = response.data;
        })
        .catch(error => {
          console.error('Błąd pobierania danych:', error);
        });
      },
      fetchPriority(){
        const token = localStorage.getItem('jwt');

        axios.get(`/enums/task-priority`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          this.taskPriority = response.data;
        })
        .catch(error => {
          console.error('Błąd pobierania danych:', error);
        });
      },
      fetchData(pageNumber) {
        this.$refs.cogwheel.show();
        const token = localStorage.getItem('jwt');
  
        axios.get(`/tasks`, {
          params: {
            pageNumber: pageNumber,
            pageSize: this.pageSize,
            search: (this.filters.searchQuery || '').trim(),
            categoryId: this.filters.category,
            status: this.filters.status,
            priority: this.filters.priority,
            orderBy: this.filters.orderBy,
            isOrderByDesc: this.filters.isOrderByDesc
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          this.$refs.cogwheel.hide();
          this.tasks = response.data.tasks.items;
          this.totalPages = response.data.tasks.totalPages;
          this.currentPage = response.data.tasks.pageIndex;
        })
        .catch(error => {
          this.$refs.cogwheel.hide();
          console.error('Błąd pobierania danych:', error);
        });
      },
      formatDate(dateString) {
        if (!dateString) {
          return "No data"; // Zwracamy "No data" dla wartości null lub undefined
        }

        const localDate = moment.utc(dateString).tz("Europe/Warsaw");

        // Formatowanie daty w żądanym formacie (np. "2023-08-02" dla Polski)
        const formattedDate = localDate.format('YYYY-MM-DD');

        return formattedDate;
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
      updateTask(taskId) {
        localStorage.setItem('taskId', taskId);
        this.$router.push('/dashboard/update-task'); 
      },
      deleteTask(taskId) {
        const userConfirmed = window.confirm('Are you sure you want to delete this task?');

        if(userConfirmed)
        {
          const token = localStorage.getItem('jwt');

          axios.delete(`/tasks/${taskId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
            this.fetchData(1);
            this.$store.dispatch('showMessage', { message: 'Task deleted successfully.'});
          })
          .catch(error => {
            console.error('Błąd pobierania danych:', error);
          });
        }
      },
      goToTask(taskId){
        localStorage.setItem('taskId', taskId);
        this.$router.push('/dashboard/task'); 
      },
      goToPage(pageNumber) {
        // Implementacja przejścia do wybranej strony
        if (pageNumber >= 1 && pageNumber <= this.totalPages) {
          this.currentPage = pageNumber;
          this.fetchData(pageNumber); // Pobierz dane dla wybranej strony
          console.log('Idź do strony:', pageNumber);
        }
      },
      updatePageSize() {
        this.currentPage = 1; // Resetujemy numer strony do pierwszej po zmianie liczby elementów na stronie
        this.fetchData(this.currentPage); // Pobieramy dane dla nowej strony
        console.log('Liczba elementów na stronie:', this.pageSize);
        },
      // Metoda zwracająca klasę w zależności od statusu
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
      clearFilters(){
        this.filters = {
          query: null,
          status: '',
          priority: '',
          category: '',
          orderBy: 1,
          isOrderByDesc: false
        };
      },
    },
    mounted() {
      const savedFilters = localStorage.getItem('filters');
      if (savedFilters) {
        this.filters = JSON.parse(savedFilters);
      }
      this.fetchData(this.currentPage);
      this.fetchStatus();
      this.fetchPriority();
      this.fetchCategories();
      this.fetchOrderBy();
    },
  };
</script>

<style>
/* Pozostałe style ... */

/* Styl przewijania całego komponentu */
.overflow-y-auto {
    overflow-y: auto;
    max-height: calc(100vh - 4rem); /* Maksymalna wysokość komponentu */
}
</style>