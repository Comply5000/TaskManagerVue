<template>
    <div class="bg-blue-500 min-h-screen py-4 overflow-y-auto mb-10">
    <div class="flex justify-center">
      <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-neutral-700 -translate-y-8 transform scale-110 mt-20 mb-12">
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
              v-if="taskStatus.length"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="statusSelect"
              v-model="formData.status"
            >
              <option v-for="s in taskStatus" :key="s.id" :value="s.id">{{ s.name }}</option>
            </select>
            <select
              v-else
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="statusSelect"
              v-model="formData.status"
            >
              <option value="" disabled>Select Status</option>
            </select>
            <label
              for="statusSelect"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': formData.status, 'peer-focus:text-primary': !formData.status }"
            >
              Status
            </label>
          </div>

          <!-- Priority select (lista rozwijana) -->
          <div class="relative mb-6">
            <select
              v-if="taskPriority.length"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="prioritySelect"
              v-model="formData.priority"
            >
              <option v-for="p in taskPriority" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
            <select
              v-else
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="prioritySelect"
              v-model="formData.priority"
            >
              <option value="" disabled>Select Priority</option>
            </select>
            <label
              for="prioritySelect"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': formData.priority, 'peer-focus:text-primary': !formData.priority }"
            >
              Priority
            </label>
          </div>
  
          <!-- Category select (lista rozwijana) -->
          <div class="relative mb-6">
            <select
              v-if="categories.length"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="categorySelect"
              v-model="formData.categoryId"
            >
              <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
            <select
              v-else
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="categorySelect"
              v-model="formData.categoryId"
            >
              <option value="" disabled>Select Category</option>
            </select>
            <label
              for="categorySelect"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': formData.categoryId, 'peer-focus:text-primary': !formData.categoryId }"
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

          <!-- Errors -->
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
            Update
          </button>
        </form>
      </div>
    </div>
      <LoadingComponent ref="cogwheel" />
    </div>
</template>
  
<script>
import moment from 'moment';
import axios from '../../config.js';
import { handleErrors } from '../../errorHandler.js';
import LoadingComponent from '@/components/LoadingComponent.vue';

import { Ripple, Input, initTE } from "tw-elements";
  
initTE({ Ripple, Input });
  
export default {
  components: {
    LoadingComponent, // Dodaj komponent zębatki do sekcji "components"
  },
  data() {
    return {
      formData:{
        name: "",
        deadline: "",
        status: null,
        priority: null,
        categoryId: null,
        description: "",
      },
      isDragging: false,
      files: [],
      errors: [],
      taskStatus: [],
      categories: [],
      taskPriority: []
    };
  },
  methods: {
    submitForm() {
      this.errors = [];
      this.$refs.cogwheel.show();
      const taskId = localStorage.getItem('taskId');

      const momentDate = moment(this.formData.deadline, 'YYYY-MM-DDTHH:mm');
      const formattedDate = momentDate.isValid() ? momentDate.toISOString() : '';

      this.formData.deadline = formattedDate;
      
      const token = localStorage.getItem('jwt');

        axios.put(`/tasks/${taskId}`, this.formData ,{
          headers: {
              'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
          this.$refs.cogwheel.hide();
          this.$router.push('/dashboard/task'); 
          this.$store.dispatch('showMessage', { message: 'Task updated successfully.'});
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
          this.formData.priority = response.data[0].id;
        })
        .catch(error => {
          console.error('Błąd pobierania danych:', error);
        });
    },
    getTask(){
        this.errors = [];
        const token = localStorage.getItem('jwt');
        const taskId = localStorage.getItem('taskId');
        axios.get(`/tasks/${taskId}/update`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
            this.formData.name = response.data.task.name;
            this.formData.description = response.data.task.description;
            this.formData.status = response.data.task.status;
            this.formData.priority = response.data.task.priority;
            this.formData.categoryId = response.data.task.categoryId;

            const momentDatetimeoffset = moment(response.data.task.deadline);
            const momentWarsawTime = momentDatetimeoffset.tz("Europe/Warsaw");
            this.formData.deadline = momentWarsawTime.format("YYYY-MM-DDTHH:mm");
        })
        .catch(error => {
            const errors = [];
            handleErrors(error, errors);
            this.errors = this.errors.concat(errors);
        });
      }
  },
  mounted() {
      this.fetchStatus();
      this.fetchCategories();
      this.fetchPriority();
      this.getTask();
    },
};
</script>
  
<style>
  /* Tailwind CSS classes are already used in the template */
.overflow-y-auto {
  overflow-y: auto;
  max-height: calc(100vh - 4rem); /* Maksymalna wysokość komponentu */
}

.main {
    display: flex;
    flex-grow: 1;
    align-items: center;
    height: 100vh;
    justify-content: center;
    text-align: center;
}

.my-dropzone-container {
    padding: 0.5rem;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
}

.my-hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.my-file-label {
    font-size: 16px;
    display: block;
    cursor: pointer;
    text-align: center;
}

.my-preview-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
}

.my-preview-card {
    display: flex;
    width: calc(33.33% - 10px);
    align-items: center;
    justify-content: center;
    position: relative; 
    border: 1px solid #a2a2a2;
    padding: 5px;
    margin-left: 5px;
    margin-bottom: 5px;
    text-align: center;
}

.my-remove-button {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #fff;
    border: none;
    cursor: pointer;
    padding-right: 3px;
}

.my-file-info {
    display: flex;
    flex-direction: column;
  }

</style>
  