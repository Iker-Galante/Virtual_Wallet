<script setup>
import { ref, computed } from 'vue';
import { useProfileStore } from '@/Stores/ProfileStore';
import NavigationBarComponent from '@/components/NavigationBarComponent.vue';

const profileStore = useProfileStore();

const profile = computed(() => profileStore.getCurrentProfile());
const changedname = ref(profile.value.name);

const name = computed(() => {
  return changedname.value;
});
const user = ref('@' + profile.value.name + '_' + profile.value.lastName);

</script>

<template>
  <v-app>
    <NavigationBarComponent/> 
  
    <v-main class="main_page">
      <div class="nav_bar">
        <div class="center-container">
          <p class="text-h3 text-white"><slot name="page-title">Inicio</slot></p>
        </div>
        <div class="icon-container">
          <v-icon icon="mdi-bell-outline" color="white" size="x-large" class="icon"></v-icon>
          <div class="name-container overflow-hidden">
            <span class="name">{{ name }}</span>
            <span class="username">{{ user }}</span>
          </div>
          <v-avatar id="perfil" image="@/assets/default_user.jpg" size="default" class="icon"></v-avatar>
          <v-menu transition="scale-transition" activator="#perfil" class="menu_expandible">
            <v-list class="elevation-20">
              <v-list-item-title>{{ name }}</v-list-item-title>
              <v-list-item-title>{{ user }}</v-list-item-title>
              <v-list-item @click="navigate('/Profile')">Perfil</v-list-item>
              <v-list-item @click="navigate('/Settings')">Configuración</v-list-item>
              <v-list-item @click="navigate('/Login')">Cerrar Sesión</v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div> 
      <div class="content-wrapper">
        <slot name="Main_page"></slot>
      </div>
    </v-main>
  </v-app>
</template>

<style>

.navLeftBar {
    background-color: #1D1D1D !important;
    width: 200px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    /* z-index: 100; */
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  }
  
  .list_items {
    padding: 10px 16px;
    margin: 4px 0;
    font-size: 16px;
    font-weight: 600; 
    color: white;
  }
  
  .divisor {
    margin: 10px 0;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .titulo {
    font-weight: 600; 
    margin: 10px 16px;
    color: white;
  }
  
  .nav_bar {
    height: 72px;
    width: calc(100% - 200px); /* Adjust for the width of NavigationBarComponent */
    position: fixed;
    top: 0;
    left: 200px; /* Adjust for the width of NavigationBarComponent */
    background-color: #1D1D1D;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    z-index: 100;
  }
  
  .icon-container {
    display: flex;
    align-items: center;
    padding-right: 20px;
    justify-content: flex-end;
  }
  
  .icon {
    margin-left: 12px;
  }
  
  .icon:hover {
    cursor: pointer;
  }
  
  .name-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: auto;
    margin-right: 8px;
    max-width: 140px;
  }
  
  .name {
    color: white; 
    font-size: 14px;
    font-weight: 500; 
    margin-left: 12px;
  }
  
  .username {
    color: rgba(160, 160, 160, 1); 
    font-size: 12px;
    margin-left: 12px;
  }
  
  .center-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
  
  .main_page {
    padding-top: 92px; /* Increased from 72px to 92px to add more space */
    padding-left: 200px; /* Width of the NavigationBarComponent */
    background-color: #2D2B3E;
    min-height: 100vh;
  }

  .menu_expandible {
    width: 200px;
  }

  .tiny_style {
    font-weight: 450;
    font-size: 16px; 
  }

  .content-wrapper {
    padding: 20px;
  }
</style>
