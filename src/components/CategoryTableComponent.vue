<template>
<div class="bg-blue-500 min-h-screen py-8 overflow-y-auto"> 
    <div class="container mx-auto">
      <div class="bg-white rounded-lg shadow-lg pt-4 pr-4 pl-4">
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
                :class="{ 'text-primary': categoryData.name, 'peer-focus:text-primary': !categoryData.name }"
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
                :class="{ 'text-primary': categoryData.description, 'peer-focus:text-primary': !categoryData.description }"
              >
                Description:
              </label>
            </div>

            <div class="relative flex-1">
              <input
                v-model="categoryData.pageUrl"
                type="text"
                id="pageUrl"
                class="mt-8 pl-2 py-1 text-base border-b border-gray-300 focus:border-blue-600 focus:outline-none"
              />
              <label
                for="pageUrl"
                class="absolute left-2 top-2 text-gray-600 transition-all duration-300"
                :class="{ 'text-primary': categoryData.pageUrl, 'peer-focus:text-primary': !categoryData.pageUrl }"
              >
                Page URL:
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
                <table class="mb-20 w-full text-center text-sm font-light divide-gray-200">
                  <thead class="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                    <tr>
                      <th scope="col" class="px-6 py-4 text-center">Name</th>
                      <th scope="col" class="px-6 py-4 text-center">Description</th>
                      <th scope="col" class="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(category, index) in categories"
                      :key="category.id"
                      :class="{
                        'border-b': true,
                        'bg-neutral-100': index % 2 === 0,
                        'bg-gray-200': index % 2 !== 0, // Ustaw kolor tła dla drugiego rekordu
                        'dark:border-neutral-500': true,
                        'dark:bg-neutral-700': true
                      }"
                    >
                      <td class="whitespace-nowrap px-6 py-4 font-medium text-center cursor-pointer">
                        <a :href="category.pageUrl" title="Go to page" target="_blank">{{ category.name }}</a>
                      </td>
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
                            <li @click.stop="updateTask(category.id)" class="py-2 px-4 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer">Update</li>
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
      <MessageComponent />
      <LoadingComponent ref="cogwheel" />
</div>
</template>

<script>
  import axios from '../../config.js';
  import { handleErrors } from '../../errorHandler.js';
  import { mapActions } from 'vuex';
  import MessageComponent from '@/components/MessageComponent.vue';
  import LoadingComponent from '@/components/LoadingComponent.vue';

  import {
    Input,
    initTE,
    } from "tw-elements";

    initTE({ Input });

  
  export default {
    components: {
      MessageComponent,
      LoadingComponent,
    },
    data() {
      return {
        errors: [],
        categoryData: {
            name: '',
            description: '',
            pageUrl: ''
        },
        categories: [],
        showOptions: null,
      };
    },
    methods: {
      createCategory() {
        this.errors = [];
        this.$refs.cogwheel.show();
        const token = localStorage.getItem('jwt');
        axios.post(`/task-categories`, this.categoryData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          this.$refs.cogwheel.hide();
          this.fetchCategories();
          this.categoryData.name = '';
          this.categoryData.description = '';
          this.categoryData.pageUrl = '';
          this.$store.dispatch('showMessage', { message: 'Category created successfully.'});
        })
        .catch(error => {
            this.$refs.cogwheel.hide();
            const errors = [];
            handleErrors(error, errors);
            this.errors = this.errors.concat(errors);
        });
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
      updateTask(categoryId) {
        localStorage.setItem('categoryId', categoryId);
        this.$router.push('/dashboard/update-category'); 
      },
      deleteCategory(categoryId) {
        const userConfirmed = window.confirm('Are you sure you want to delete this category? It will delete all assigned tasks and files!');

        if(userConfirmed)
        {
          const token = localStorage.getItem('jwt');

          axios.delete(`/task-categories/${categoryId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
              this.fetchCategories();
              this.$store.dispatch('showMessage', { message: 'Category deleted successfully.'});
          })
          .catch(error => {
              const errors = [];
              handleErrors(error, errors);
              this.errors = this.errors.concat(errors);
          });
        }
      },
    },
    mounted() {
      this.fetchCategories();
    },
  };
</script>

<style>
    .overflow-y-auto {
        overflow-y: auto;
        max-height: calc(100vh - 4rem); /* Maksymalna wysokość komponentu */
    }
</style>