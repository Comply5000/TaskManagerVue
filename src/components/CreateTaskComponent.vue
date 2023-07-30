<template>
    <div class="bg-blue-500 min-h-screen py-4 flex items-center justify-center">
      <div class="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-neutral-700 transform scale-125 -translate-y-8">
        <form>
          <!-- Name input -->
          <div class="relative mb-6">
            <input
              type="text"
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="nameInput"
              v-model="nameInputValue"
            />
            <label
              for="nameInput"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': nameInputValue, 'peer-focus:text-primary': !nameInputValue }"
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
              v-model="deadlineInputValue"
            />
            <label
              for="deadlineInput"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': deadlineInputValue, 'peer-focus:text-primary': !deadlineInputValue }"
            >
              Deadline
            </label>
          </div>
  
          <!-- Status select (lista rozwijana) -->
          <div class="relative mb-6">
            <select
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="statusSelect"
              v-model="selectedStatus"
            >
              <option value="" disabled>Status</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
            <label
              for="statusSelect"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': selectedStatus, 'peer-focus:text-primary': !selectedStatus }"
            >
              Status
            </label>
          </div>
  
          <!-- Category select (lista rozwijana) -->
          <div class="relative mb-6">
            <select
              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder-opacity-100 data-[te-input-state-active]:placeholder-opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder-text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder-opacity-0"
              id="categorySelect"
              v-model="selectedCategory"
            >
              <option value="" disabled>Category</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
            <label
              for="categorySelect"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': selectedCategory, 'peer-focus:text-primary': !selectedCategory }"
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
              v-model="descriptionTextareaValue"
            ></textarea>
            <label
              for="descriptionTextarea"
              class="absolute left-3 top-[-1.25rem] mb-0 max-w-[90%] truncate pt-[0.37rem] leading-[1.4] text-sm text-neutral-500 transition-all duration-200 ease-out"
              :class="{ 'text-primary': descriptionTextareaValue, 'peer-focus:text-primary': !descriptionTextareaValue }"
            >
              Description
            </label>
          </div>
  
          <!-- Submit button -->
          <button
            type="submit"
            class="dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]] inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
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
  // Initialization for ES Users
  import { Ripple, Input, initTE } from "tw-elements";
  
  initTE({ Ripple, Input });
  
  export default {
    data() {
      return {
        nameInputValue: "",
        deadlineInputValue: "",
        selectedStatus: "",
        selectedCategory: "",
        descriptionTextareaValue: "",
      };
    },
  };
  </script>
  
  <style>
  /* Tailwind CSS classes are already used in the template */
  </style>
  