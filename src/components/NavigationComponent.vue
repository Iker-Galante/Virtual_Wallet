<script setup>
import { ref, computed } from 'vue';
import { useProfileStore } from '@/Stores/ProfileStore';
import NavigationBarComponent from '@/components/NavigationBarComponent.vue';
import { useRouter } from 'vue-router';
const profileStore = useProfileStore();

const profile = computed(() => profileStore.getCurrentProfile());
const changedname = ref(profile.value.name);

const name = computed(() => {
  return changedname.value;
});
const user = ref('@' + profile.value.name + '_' + profile.value.lastName);
const router = useRouter();

function navigate(destination) {
  router.push(destination);
}

function handleLogOut() {
  profileStore.setCurrentProfile(null);
  router.push({ name: 'login' })
}
</script>

<template>
  <v-app>
    <NavigationBarComponent/> 
      <div class="nav_bar">
        <div class="center-container">
          <p class="text-h3 text-white"><slot name="page-title"></slot></p>
        </div>
        <div class="icon-container">
          <!-- <v-icon icon="mdi-bell-outline" color="white" size="x-large" class="icon"></v-icon> -->
          <div class="name-container overflow-hidden">
            <span class="name">{{ name }}</span>
            <span class="username">{{ user }}</span>
          </div>
          <v-avatar id="perfil" image="@/assets/default_user.jpg" size="default" class="icon"></v-avatar>
          <v-menu transition="scale-transition" activator="#perfil" class="menu_expandible">
            <v-list class="elevation-20">
              <!--
              <v-list-item @click="navigate('/Profile')">Perfil</v-list-item> -->
              <v-list-item @click="navigate('/Settings')">Configuración</v-list-item>
              <v-list-item @click="handleLogOut()">Cerrar Sesión</v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div> 
      <v-main class="main_page">
        <slot name="Main_page"></slot>
      </v-main>
  </v-app>
</template>

<style scoped>
.main_page {
  padding-left: 255px;
  background-color: #2D2B3E;
  min-height: 100vh;
  margin-top: 72px;
}

.nav_bar {
  height: 72px;
  width: calc(100% - 200px);
  position: fixed;
  top: 0;
  left: 200px; 
  background-color: #1D1D1D;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  z-index: 100;
}

.content-wrapper {
  padding-top: 50px;
  padding-left: 20px;
  padding-right: 20px;
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

.menu_expandible {
  width: 200px;
}

/* ... (rest of your styles) ... */
</style>
