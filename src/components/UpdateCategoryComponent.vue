<template>
<div class="bg-blue-500 min-h-screen py-8 overflow-y-auto"> 
    <div class="container mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-4">
        <form @submit.prevent="update">
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
                @click="updateCategory()"
                class="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
              Update
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
</div>   
</template>

<script>
  import axios from '../../config.js';
  import { handleErrors } from '../../errorHandler.js';

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
      };
    },
    methods: {
      updateCategory() {
        this.errors = [];
        const token = localStorage.getItem('jwt');
        const categoryId = localStorage.getItem('categoryId');
        axios.put(`/todo-task-categories/${categoryId}`, this.categoryData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
            localStorage.removeItem('categoryId');
            this.$router.push('/main/categories'); 
            this.$store.dispatch('showMessage', { message: 'Category updated successfully.', duration: 3000 });
        })
        .catch(error => {
            const errors = [];
            handleErrors(error, errors);
            this.errors = this.errors.concat(errors);
        });
      },
      getCategory(){
        this.errors = [];
        const token = localStorage.getItem('jwt');
        const categoryId = localStorage.getItem('categoryId');
        axios.get(`/todo-task-categories/${categoryId}/update`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
            this.categoryData.name = response.data.todoTaskCategory.name;
            this.categoryData.description = response.data.todoTaskCategory.description;
        })
        .catch(error => {
            const errors = [];
            handleErrors(error, errors);
            this.errors = this.errors.concat(errors);
        });
      }
    },
    mounted() {
      this.getCategory();
    },
  };
</script>

<style>
    .overflow-y-auto {
        overflow-y: auto;
        max-height: calc(100vh - 4rem); /* Maksymalna wysokość komponentu */
    }
</style>