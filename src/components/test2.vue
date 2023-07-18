<template>
    <div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="message">Message:</label>
          <textarea
            id="message"
            v-model="formData.message"
            class="form-control"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        formData: {
          name: "",
          email: "",
          message: "",
        },
      };
    },
    methods: {
      handleSubmit() {
        // Tutaj możesz przetwarzać dane formularza np. wysyłać je na serwer lub wykonac inne akcje
        console.log("Form submitted:", this.formData);
      },
    },
  };
  </script>
  
  <style>
  /* Dodaj odpowiednie style dla formularza */
  .form-group {
    margin-bottom: 1rem;
  }
  .form-control {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .btn {
    background-color: #007bff;
    color: #fff;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn-primary {
    background-color: #007bff;
  }
  </style>
  