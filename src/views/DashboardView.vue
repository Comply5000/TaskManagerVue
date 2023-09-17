<template>
  <div>
    <NavbarComponent />
    <router-view></router-view>
    <!-- Dodaj inne elementy zawartości strony tutaj -->
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue"; // Ścieżka do twojego komponentu NavbarComponent
import TaskTableComponent from "@/components/TaskTableComponent.vue"; // Ścieżka do twojego komponentu NavbarComponent

export default {
  components: {
    NavbarComponent,
    TaskTableComponent
  },
  // Dodaj inne opcje widoku, jeśli są potrzebne
};
</script>