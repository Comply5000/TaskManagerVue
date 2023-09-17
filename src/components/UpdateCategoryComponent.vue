<template>
<div class="bg-blue-500 min-h-screen py-8 overflow-y-auto"> 
    <div class="container mx-auto">
      <div class="bg-white rounded-lg shadow-lg pt-4 pr-4 pl-4">
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
              @click="updateCategory()"
              class="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
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
    <LoadingComponent ref="cogwheel" />
</div>   
</template>

<script>
  import axios from '../../config.js';
  import { handleErrors } from '../../errorHandler.js';
  import LoadingComponent from '@/components/LoadingComponent.vue';

  import {
    Input,
    initTE,
    } from "tw-elements";

    initTE({ Input });

  
  export default {
    components: {
      LoadingComponent, // Dodaj komponent zębatki do sekcji "components"
    },
    data() {
      return {
        errors: [],
        categoryData: {
            name: '',
            description: '',
            pageUrl: ''
        },
      };
    },
    methods: {
      updateCategory() {
        this.errors = [];   
        this.$refs.cogwheel.show(); 
        const token = localStorage.getItem('jwt');
        const categoryId = localStorage.getItem('categoryId');
        axios.put(`/task-categories/${categoryId}`, this.categoryData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {      
            this.$refs.cogwheel.hide();
            localStorage.removeItem('categoryId');
            this.$router.push('/main/categories'); 
            this.$store.dispatch('showMessage', { message: 'Category updated successfully.'});
        })
        .catch(error => {
            const errors = [];
            this.$refs.cogwheel.hide();
            handleErrors(error, errors);
            this.errors = this.errors.concat(errors);
        });
      },
      getCategory(){
        this.errors = [];
        const token = localStorage.getItem('jwt');
        const categoryId = localStorage.getItem('categoryId');
        axios.get(`/task-categories/${categoryId}/update`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
            this.categoryData.name = response.data.taskCategory.name;
            this.categoryData.description = response.data.taskCategory.description;
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