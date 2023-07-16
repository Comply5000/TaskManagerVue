<template>
    <div class="bg-blue-500 h-screen flex items-center justify-center">
        <button @click="logout">Wyloguj się</button>
    </div>
</template>

<script>
export default {
  methods: {
    logout() {
      // Czyszczenie tokenu dostępu lub innych danych w localStorage
      localStorage.clear();

      // Przekierowanie do widoku logowania
      this.$router.push('/');
    }
  }
};
</script>