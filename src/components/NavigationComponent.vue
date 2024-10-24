<script setup>
import { ref, computed} from 'vue'
import { useRouter } from 'vue-router';
import { useProfileStore } from '@/stores/ProfileStore';
import { useMovementStore } from '@/stores/MovementStore';

const profileStore = useProfileStore();
const movementStore = useMovementStore();
const n= ref(0);
const profile= profileStore.getCurrentProfile();
const changedname= ref( profile.name);

const name= computed(() =>{
  return changedname.value;
});
const user=ref('@'+ profile.name + '_' + profile.lastName);

const router = useRouter();
function navigate(destination) {
  router.push(destination);
}
</script>

<template>
    <v-navigation-drawer :width="250" color="#352f3d" elevation="15" permanent>
      <v-list-item-title class="text-h4 titulo">PLATAN`T</v-list-item-title>
      <v-divider  class="divisor"></v-divider>
      <v-list-item class="list_items" prepend-icon="mdi-home-outline" title="Inicio" @click="navigate('/MainPage')"></v-list-item>
      <v-list-item class="list_items" prepend-icon="mdi-credit-card-multiple-outline" title="Mis Tarjetas" @click="navigate('/Cards')"></v-list-item>
      <v-list-item class="list_items" prepend-icon="mdi-send-variant-outline" title="Pagar" @click="navigate('/Pay')"></v-list-item>
      <v-list-item class="list_items" prepend-icon="mdi-arrow-up" title="Cobrar" @click="navigate('/Collect')"></v-list-item>
      <v-list-item class="list_items" prepend-icon="mdi-inbox-multiple-outline" title="Mi Actividad" @click="navigate('/Movements')"></v-list-item>
      <v-list-item class="list_items" prepend-icon="mdi-trending-up" title="Mis Inversiones" @click="navigate('/Investments')"></v-list-item>
      <v-list-item class="list_items" prepend-icon="mdi-account-group-outline" title="Mis contactos" @click="navigate('/Contacts')"></v-list-item>
    </v-navigation-drawer>
  
    <!-- Navbar with search bar and user info -->
    <div class="nav_bar elevation-15">
      <div class="center-container">
      <p class="text-h3 text-white"><slot>Inicio</slot></p>
    </div>
      <div class="icon-container">
        <v-icon icon="mdi-bell-outline" color="white" size="x-large" class="icon"></v-icon>
        <div class="name-container overflow-hidden" >
          <span class="name">{{ name }}</span>
          <span class="username">{{ user }}</span>
        </div>
        <v-avatar id="perfil" image="@/assets/default_user.jpg" size="default" class="icon"></v-avatar>
        <v-menu transition="scale-transition" activator="#perfil">
          <v-list>
            <v-list-item-title>{{ name }}</v-list-item-title>
            <v-list-item-title>{{ user }}</v-list-item-title>
            <v-list-item @click="navigate('/Profile')">Perfil</v-list-item>
            <v-list-item @click="navigate('/Settings')">Configuración</v-list-item>
            <v-list-item @click="navigate('/Login')">Cerrar Sesión</v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </template>
  
  <style scoped>
  .list_items {
    color: white;
    padding: auto;
    margin: 4px 4px 16px 4px;
    font-size: 20px;
    font-weight: 500;
  }
  
  .divisor {
    background-color: white;
    margin-top: 10px;
    margin-bottom: 38px;
  }
  
  .titulo {
    font-weight: 500;
    margin: 10px 0px 10px 16px;
  }
  
  /* Navbar */
  .nav_bar {
    height: 72px;
    width: calc(100vw - 265px); /* Adjust width to account for left offset */
    position: fixed;
    top: 0;
    left: 250px;
    background-color: #352f3d;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .icon-container {
    display: flex;
    align-items: center;
    padding-right: 60px;
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
    color: #A0A0A0;
    font-size: 12px;
    margin-left: 12px;
  }
  
  .center-container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }
  
  /* Main content */
  .main_page {
    margin-top: 72px; /* Account for navbar height */
    width:100vw;
    min-height: calc(100vh - 72px); /* Full viewport height minus navbar */
    background-color: #8f9044;
  }
  </style>
  