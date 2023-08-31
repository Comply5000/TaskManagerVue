<template>
    <div class="bg-blue-500 min-h-screen py-4 flex items-center justify-center overflow-y-auto">
      <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-neutral-700 -translate-y-8 transform scale-110">
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

          <!-- Upload file -->
          <div
            class="my-dropzone-container"
            @dragover="dragover"
            @dragleave="dragleave"
            @drop="drop"
            :style="isDragging && 'border-color: green;'"
          >
            <input
              type="file"
              multiple
              name="file"
              id="fileInput"
              class="my-hidden-input"
              @change="onChange"
              ref="file"
              accept=".pdf,.jpg,.jpeg,.png"
            />

            <label for="fileInput" class="my-file-label">
              <div v-if="isDragging">Release to drop files here.</div>
              <div v-else>Drop files here or <u>click here</u> to upload.</div>
            </label>
            <div class="my-preview-container" v-if="files.length">
              <div v-for="file in files" :key="file.name" class="my-preview-card">
                <button
                  class="my-remove-button"
                  type="button"
                  @click="remove(files.indexOf(file))"
                  title="Remove file"
                >
                  <b>×</b>
                </button>
                <div class="my-file-info">
                  <font-awesome-icon icon="file" style="color: #000000; text-align: center;" size="2x"/>
                  <p>
                    {{ file.name.length > 12 ? file.name.substring(0, 7) + '...' + file.name.split('.').pop() : file.name }}
                  </p>
                </div>
              </div>
            </div>
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
            Create
          </button>
        </form>
      </div>
    </div>
</template>
  
<script>
import moment from 'moment';
import axios from '../../config.js';
import { handleErrors } from '../../errorHandler.js';

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
      },
      isDragging: false,
      files: [],
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
      this.files.forEach((file) => {
        formData.append("files", file);
      });

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
            const errors = [];
            handleErrors(error, errors);
            this.errors = this.errors.concat(errors);
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
    onChange() {
      const self = this;
      let incomingFiles = Array.from(this.$refs.file.files);
      const fileExist = self.files.some((r) =>
        incomingFiles.some(
          (file) => file.name === r.name && file.size === r.size
        )
      );
      if (fileExist) {
        self.showMessage = true;
        alert("New upload contains files that already exist");
      } else {
        self.files.push(...incomingFiles);
      }
    },
    dragover(e) {
      e.preventDefault();
      this.isDragging = true;
    },
    dragleave() {
      this.isDragging = false;
    },
    drop(e) {
      e.preventDefault();
      this.$refs.file.files = e.dataTransfer.files;
      this.onChange();
      this.isDragging = false;
    },
    remove(i) {
      this.files.splice(i, 1);
    },
    generateURL(file) {
      let fileSrc = URL.createObjectURL(file);
      setTimeout(() => {
          URL.revokeObjectURL(fileSrc);
      }, 1000);
      return fileSrc;
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
  