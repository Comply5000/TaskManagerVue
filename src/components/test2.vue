<template>
<!-- Container for demo purpose -->
<div class="container my-24 mx-auto md:px-6">
  <!-- Section: Design Block -->
  <section class="mb-32">
    <h1 class="mb-4 text-3xl font-bold">
      An intriguing title for an interesting article
    </h1>

    <p class="mb-6 flex items-center font-bold uppercase text-danger dark:text-danger-500">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
        class="mr-2 h-5 w-5">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>Hot news
    </p>

    <p class="mb-6">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio
      sapiente molestias consectetur. Fuga nulla officia error placeat
      veniam, officiis rerum laboriosam ullam molestiae magni velit laborum
      itaque minima doloribus eligendi! Lorem ipsum, dolor sit amet
      consectetur adipisicing elit. Optio sapiente molestias consectetur.
      Fuga nulla officia error placeat veniam, officiis rerum laboriosam
      ullam molestiae magni velit laborum itaque minima doloribus eligendi!
    </p>

    <p class="mb-6">
      <strong>Optio sapiente molestias consectetur?</strong>
    </p>

    <p class="mb-6">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
      architecto ex ab aut tempora officia libero praesentium, sint id
      magnam eius natus unde blanditiis. Autem adipisci totam sit
      consequuntur eligendi.
    </p>

    <p
      class="mb-6 rounded border-l-4 border-neutral-800 bg-neutral-100 p-2 dark:border-neutral-200 dark:bg-neutral-700">
      <strong>Note:</strong> Lorem ipsum dolor sit amet, consectetur
      adipisicing elit. Optio odit consequatur porro sequi ab distinctio
      modi. Rerum cum dolores sint, adipisci ad veritatis laborum eaque
      illum saepe mollitia ut voluptatum.
    </p>

    <p class="mb-6">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
      libero repellat molestiae aperiam laborum aliquid atque magni nostrum,
      inventore perspiciatis possimus quia incidunt maiores molestias eaque
      nam commodi! Magnam, labore.
    </p>

    <img src="https://mdbcdn.b-cdn.net/img/new/slides/194.jpg"
      class="mb-6 w-full rounded-lg shadow-lg dark:shadow-black/20" alt="" />

    <ul class="mb-6 list-inside list-disc">
      <li>Lorem</li>
      <li>Ipsum</li>
      <li>Dolor</li>
      <li>Sit</li>
      <li>Amet</li>
    </ul>

    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
      temporibus nulla voluptatibus accusantium sapiente doloremque.
      Doloribus ratione laboriosam culpa. Ab officiis quidem, debitis
      nostrum in accusantium dolore veritatis eius est?
    </p>
  </section>
  <!-- Section: Design Block -->
</div>
  
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  components: {
      Icon,
  },
  data() {
    return {
      isDragging: false,
      files: [],
    };
  },
  methods: {
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
};
</script>








<style>
.dropzone-container {
  /* . . .  */
  border: 2px dashed;
  border-color: #9e9e9e;
}

.main {
    display: flex;
    flex-grow: 1;
    align-items: center;
    height: 100vh;
    justify-content: center;
    text-align: center;
}

.dropzone-container {
    padding: 4rem;
    background: #f7fafc;
    border: 1px solid #e2e8f0;
}

.hidden-input {
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
}

.file-label {
    font-size: 20px;
    display: block;
    cursor: pointer;
}

.preview-container {
    display: flex;
    margin-top: 2rem;
}

.preview-card {
    display: flex;
    border: 1px solid #a2a2a2;
    padding: 5px;
    margin-left: 5px;
}

.preview-img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    border: 1px solid #a2a2a2;
    background-color: #a2a2a2;
}
</style>
