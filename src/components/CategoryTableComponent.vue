<template>
<div class="bg-blue-500 min-h-screen py-8 overflow-y-auto"> 
    <div class="container mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-4">
        <form @submit.prevent="addCategory">
          <div class="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <div class="relative flex-1">
              <input
                v-model="categoryData.name"
                type="text"
                id="name"
                class="mt-8 pl-2 py-1 text-base border-b border-gray-300 focus:border-blue-600 focus:outline-none"
                required
              />
              <label
                for="name"
                class="absolute left-2 top-2 text-gray-600 transition-all duration-300"
                :class="{ 'text-xs': categoryData.name }"
              >
                Name:
              </label>
            </div>
            <div class="relative flex-1">
              <input
                v-model="categoryData.description"
                type="text"
                id="description"
                class="mt-8 pl-2 py-1 text-base border-b border-gray-300 focus:border-blue-600 focus:outline-none"
              />
              <label
                for="description"
                class="absolute left-2 top-2 text-gray-600 transition-all duration-300"
                :class="{ 'text-xs': categoryData.description }"
              >
                Description:
              </label>
            </div>
            <button 
                @click="createCategory()"
                class="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
              Add Category
            </button>
          </div>
        </form>
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
    </div>
    

    <div class="container mx-auto mt-4">
        <div class="overflow-x-auto">
          <div class="min-w-max">
            <div class="w-max mx-auto bg-white rounded-lg shadow-lg">
              <div class="overflow-hidden">
                <table class="mb-12 w-full text-center text-sm font-light divide-gray-200">
                  <thead class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" class="px-6 py-4 text-center">Name</th>
                      <th scope="col" class="px-6 py-4 text-center">Description</th>
                      <th scope="col" class="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="category in categories" :key="category.id" class="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700">
                      <td class="whitespace-nowrap px-6 py-4 font-medium text-center">{{ category.name }}</td>
                      <td class="whitespace-nowrap px-6 py-4 text-center">{{ category.description }}</td>
                      <td class="whitespace-nowrap px-6 py-4 text-center">
                        <div class="relative">
                          <button @click="showOptions = (showOptions === category.id ? null : category.id)" class="text-gray-400 hover:text-gray-600 focus:outline-none">
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
                          <ul v-show="showOptions === category.id" class="absolute top-8 right-0 bg-white border border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 rounded-lg shadow-lg z-10">
                            <li @click.stop="updateTask(category)" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">Update</li>
                            <li @click.stop="deleteCategory(category.id)" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">Delete</li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
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

  import {
    Input,
    initTE,
    } from "tw-elements";

    initTE({ Input });

  
  export default {
    data() {
      return {
        errors: [],
        categoryData: {
            name: '',
            description: ''
        },
        categories: [],
        showOptions: null,
      };
    },
    methods: {
      createCategory() {
        this.errors = [];
        const token = localStorage.getItem('jwt');
        axios.post(`/todo-task-categories`, this.categoryData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          this.fetchCategories();
          this.categoryData.name = '';
          this.categoryData.description = '';
        })
        .catch(error => {
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
      fetchCategories(){
        const token = localStorage.getItem('jwt');

        axios.get(`/todo-task-categories`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          this.categories = response.data.todoTaskCategories;
        })
        .catch(error => {
          console.error('Błąd pobierania danych:', error);
        });
      },
      updateTask(task) {
        // Implementacja aktualizacji zadania
        console.log('Update task:', task);
      },
      deleteCategory(categoryId) {
        const token = localStorage.getItem('jwt');

        axios.delete(`/todo-task-categories/${categoryId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
            this.fetchCategories();
        })
        .catch(error => {
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
        console.log('Delete task:', taskId);
      },
    },
    mounted() {
      this.fetchCategories();
    },
  };
</script>

<style>
    .avatar-container {
      margin-top: -0.75rem; /* Dostosuj wartość marginesu, aby podnieść ikonę do góry */
      margin-bottom: -0.25rem; /* Dostosuj wartość marginesu, aby podnieść ikonę do góry */
    }
</style>