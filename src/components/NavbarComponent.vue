<template>
    <nav
      class="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4"
      data-te-navbar-ref>
      <div class="flex w-full flex-wrap items-center justify-between px-3">
        <!-- Hamburger button for mobile view -->
        <button
          class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <!-- Hamburger icon -->
          <span class="[&>svg]:w-7">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-7 w-7">
              <path
                fill-rule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </button>
    
        <!-- Collapsible navigation container -->
        <div
          class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
          id="navbarSupportedContent1"
          data-te-collapse-item>
          <!-- Logo -->
          <a
            class="mb-4 ml-2 mr-5 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
            href="#">
            <img
              src="/taskicon.svg"
              style="height: 30px"
              alt="TE Logo"
              loading="lazy" />
          </a>
          <!-- Left navigation links -->
          <ul
            class="list-style-none mr-auto flex flex-col pl-0 lg:flex-row"
            data-te-navbar-nav-ref>
            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
              <!-- Dashboard link -->
              <router-link to="/dashboard" class="text-xl text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400">
                Tasks</router-link>
            </li>
            <!-- Team link -->
            <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                <router-link to="/dashboard/categories" class="text-xl text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400">
                    Categories</router-link>
            </li>
          </ul>
        </div>
    
        <!-- Right elements -->
        <div class="relative flex items-center">
          
          <!-- Container with two dropdown menus -->
          <!-- Second dropdown container -->
          <div class="relative" data-te-dropdown-ref>
            <!-- Second dropdown trigger -->
            <a
              class="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
              href="#"
              id="dropdownMenuButton2"
              role="button"
              data-te-dropdown-toggle-ref
              aria-expanded="false">
              <!-- User avatar -->
              <!-- <img
                src="https://tecdn.b-cdn.net/img/new/avatars/2.jpg"
                class="rounded-full"
                style="height: 30px; width: 30px"
                alt=""
                loading="lazy" />     --> <!-- Dodaj klasę "flex items-center" do wyrównania ikony -->
                  <!-- User avatar -->
              <div class="flex items-center avatar-container mr-2"> <!-- Dodaj klasę "avatar-container" -->
                <!-- User avatar -->
                <font-awesome-icon :icon="['fas', 'user']" style="color: #000000; margin-top: 7px;" size="2x" />
              </div>
            </a>
            <!-- Second dropdown menu -->
            <ul
              class="absolute left-auto right-0 z-[1000] float-left m-0 mt-1 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
              aria-labelledby="dropdownMenuButton2"
              data-te-dropdown-menu-ref>
              <!-- Second dropdown menu items -->
              <router-link to="/dashboard/my-account">
              <li>
                <a
                  class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                  href="#"
                  data-te-dropdown-item-ref
                  >My account</a
                  
                >
              </li>
              </router-link>
              <li>
                <a
                  class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                  href="#"
                  data-te-dropdown-item-ref
                  @click="logout"
                  >Sign out</a
                >
              </li>      
            </ul>
          </div>
        </div>
      </div>
    </nav>
    </template>
    
    <script>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import axios from '../../config.js';
      import {
        Collapse,
        Dropdown,
        initTE,
      } from "tw-elements";
    
    export default {
      mounted() {
        // Inicjalizacja "tw-elements" i przekazanie komponentów
        initTE({ Collapse, Dropdown });
      },
      methods: {
        logout() {
          const token = localStorage.getItem('jwt');
          axios.post(`/account/sign-out`, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            .then(response => {
              localStorage.clear();
              this.$router.push('/');
            })
            .catch(error => {
              localStorage.clear();
              this.$router.push('/');
            });
        }
      }
    };
    </script>
    
    <style>
    .avatar-container {
      margin-top: -0.75rem; /* Dostosuj wartość marginesu, aby podnieść ikonę do góry */
      margin-bottom: -0.25rem; /* Dostosuj wartość marginesu, aby podnieść ikonę do góry */
    }
    </style>
    