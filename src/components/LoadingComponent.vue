<template>
  <div v-if="showCogwheel" class="cogwheel" ref="cogwheel">
    <font-awesome-icon icon="fas fa-cog" style="color: #000000; text-align: center;" size="2x"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCogwheel: false,
    };
  },
  mounted() {
    this.hide(); // Pokaż komponent po umieszczeniu w drzewie DOM
  },
  methods: {
    show() {
      this.showCogwheel = true;
    },
    hide() {
      this.showCogwheel = false;
    },
  },
};
</script>


<style>
.cogwheel {
  width: 10px;
  height: 10px;
  border: 10px solid 500;
  border-radius: 50%;
  animation: rotate 2s infinite linear;
  transform-origin: center center; /* Ustaw punkt obrotu na środku ikony */
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 30px;
  right: 30px;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
