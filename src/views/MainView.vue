<template>
  <div>
    <NavbarComponent />
    <router-view></router-view>
    <!-- Dodaj inne elementy zawartości strony tutaj -->
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue"; // Ścieżka do twojego komponentu NavbarComponent
import test from "@/components/test.vue"; // Ścieżka do twojego komponentu NavbarComponent

export default {
  components: {
    NavbarComponent,
    test
  },
  // Dodaj inne opcje widoku, jeśli są potrzebne
};
</script>