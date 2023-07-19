<template>
    <div class="bg-blue-500 min-h-screen py-8 overflow-y-auto">
      <div class="container mx-auto">
        <div class="overflow-x-auto">
          <div class="min-w-max">
            <div class="w-max mx-auto bg-white rounded-lg shadow-lg">
              <div class="overflow-hidden">
                <table class="w-full text-left text-sm font-light">
                  <thead class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" class="px-6 py-4">Name</th>
                      <th scope="col" class="px-6 py-4">Status</th>
                      <th scope="col" class="px-6 py-4">Category</th>
                      <th scope="col" class="px-6 py-4">Created At</th>
                      <th scope="col" class="px-6 py-4">Deadline</th>
                      <th scope="col" class="px-6 py-4">Last Modified At</th>
                      <th scope="col" class="px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="task in tasks" :key="task.id" class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                      <td class="whitespace-nowrap px-6 py-4 font-medium">{{ task.name }}</td>
                      <!-- Dodaj dynamiczne klasy w zależności od statusu -->
                      <td :class="getStatusClass(task.status.id)">
                        {{ task.status.name }}
                      </td>
                      <td class="whitespace-nowrap px-6 py-4">{{ task.categoryName }}</td>
                      <td class="whitespace-nowrap px-6 py-4">{{ formatDate(task.createdAt) }}</td>
                      <td class="whitespace-nowrap px-6 py-4">{{ formatDate(task.deadline) }}</td>
                      <td class="whitespace-nowrap px-6 py-4">{{ formatDate(task.lastModifiedAt) }}</td>
                      <td class="whitespace-nowrap px-6 py-4">
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
                            <li @click.stop="updateTask(task)" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">Update</li>
                            <li @click.stop="deleteTask(task)" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">Delete</li>
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
                            <li v-for="pageNumber in totalPages" :key="pageNumber" :aria-current="pageNumber === currentPage ? 'page' : null">
                            <a
                                class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-black transition-all duration-300 hover:bg-gray-300 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
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
    </div>
  </template>
  
<script>
  import axios from '../../config.js';
  
  export default {
    data() {
      return {
        tasks: [],
        showOptions: null,
        currentPage: 1,
        totalPages: 1,
        pageSize: 10, // Domyślna liczba elementów na stronie
        pageOptions: [10, 25, 50, 100], 
      };
    },
    methods: {
      fetchData(pageNumber) {
        const token = localStorage.getItem('jwt');
  
        axios.get(`/todo-tasks`, {
          params: {
            pageNumber: pageNumber,
            pageSize: this.pageSize,
          },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          this.tasks = response.data.todoTasks.items;
          this.totalPages = response.data.todoTasks.totalPages;
        })
        .catch(error => {
          console.error('Błąd pobierania danych:', error);
        });
      },
      formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
      },
      updateTask(task) {
        // Implementacja aktualizacji zadania
        console.log('Update task:', task);
      },
      deleteTask(task) {
        // Implementacja usuwania zadania
        console.log('Delete task:', task);
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
    },
    mounted() {
      this.fetchData(this.currentPage);
    }
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