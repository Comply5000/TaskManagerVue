<template>
    <div class="bg-blue-500 min-h-screen py-4 flex items-center justify-center overflow-y-auto">
      <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-neutral-700 transform scale-125 -translate-y-8">
        <form @submit.prevent="submitForm">
          <!-- Name input -->
          <div class="relative mb-6">
            <input
              type="text"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="nameInput"
              v-model="formData.name"
            />
            <label
              for="nameInput"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': formData.name, 'peer-focus:text-primary': !formData.name }"
            >
              Name
            </label>
          </div>
  
          <!-- Deadline input (data i godzina) -->
          <div class="relative mb-6">
            <input
              type="datetime-local"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="deadlineInput"
              v-model="formData.deadline"
            />
            <label
              for="deadlineInput"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': formData.deadline, 'peer-focus:text-primary': !formData.deadline }"
            >
              Deadline
            </label>
          </div>
  
          <!-- Status select (lista rozwijana) -->
          <div class="relative mb-6">
            <select
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="statusSelect"
              v-if="taskStatus.length"
              v-model="formData.status"
            >
              <option v-for="s in taskStatus" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
            <label
              for="statusSelect"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': formData.status, 'peer-focus:text-primary': !formData.status }"
            >
              Status
            </label>
          </div>
  
          <!-- Category select (lista rozwijana) -->
          <div class="relative mb-6">
            <select
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="categorySelect"
              v-if="categories.length"
              v-model="formData.categoryId"
            >
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
            <label
              for="categorySelect"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': formData.category, 'peer-focus:text-primary': !formData.category }"
            >
              Category
            </label>
          </div>
  
          <!-- Description textarea -->
          <div class="relative mb-6">
            <textarea
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="descriptionTextarea"
              rows="3"
              placeholder="Description"
              v-model="formData.description"
            ></textarea>
            <label
              for="descriptionTextarea"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': formData.description, 'peer-focus:text-primary': !formData.description }"
            >
              Description
            </label>
          </div>

          <div v-if="errors" class="mt-6">
            <ul class="error-list">
              <li v-for="errorMsg in errors" :key="errorMsg" class="error-message">
                <div class="bg-red-100 text-red-600 py-2 px-4 rounded">
                  {{ errorMsg }}
                </div>
              </li>
            </ul>
          </div>

          <!-- Submit button -->
          <button
            type="submit"
            class="mt-4 dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Send
          </button>
        </form>
      </div>
    </div>
</template>
  
<script>
import moment from 'moment';
import axios from '../../config.js';

import { Ripple, Input, initTE } from "tw-elements";
  
initTE({ Ripple, Input });
  
export default {
  data() {
    return {
      formData:{
        name: "",
        deadline: "",
        status: "",
        categoryId: null,
        description: "",
        files: []
      },
      errors: [],
      taskStatus: [],
      categories: []
    };
  },
  methods: {
    submitForm() {
      this.errors = [];

      const formData = new FormData();

      const momentDate = moment(this.formData.deadline, 'YYYY-MM-DDTHH:mm');
      const formattedDate = momentDate.isValid() ? momentDate.toISOString() : '';

      formData.append('name', this.formData.name);
      formData.append('deadline', formattedDate);
      formData.append('status', this.formData.status);
      formData.append('categoryId', this.formData.categoryId);
      formData.append('description', this.formData.description);

      const token = localStorage.getItem('jwt');

        axios.post(`/todo-tasks`, formData ,{
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data' 
            }
        })
        .then(response => {
          this.$router.push('/main'); 
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
    fetchStatus(){
        const token = localStorage.getItem('jwt');

        axios.get(`/enums/todo-task-status`, {
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
  },
  mounted() {
      this.fetchStatus();
      this.fetchCategories();
    },
};
</script>
  
<style>
  /* Tailwind CSS classes are already used in the template */
.overflow-y-auto {
  overflow-y: auto;
  max-height: calc(100vh - 4rem); /* Maksymalna wysokość komponentu */
}
</style>
  