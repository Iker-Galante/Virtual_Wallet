<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useProfileStore } from '@/Stores/ProfileStore';
import NavigationBarComponent from '@/components/Utilities/NavigationBarComponent.vue';
import { useRouter } from 'vue-router';
const profileStore = useProfileStore();

const profile = computed(() => profileStore.getCurrentProfile());
const changedname = ref(profile.value.name);
const changedlastName = ref(profile.value.lastName);

const name = computed(() => {
  return changedname.value;
});

watchEffect(() => {
  if(profile.value){
  changedname.value = profile.value.name;
  changedlastName.value = profile.value.lastName;
  }
});

const user = ref(profile.value.username)
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
          <!-- <p class="text-h3 text-white"><slot name="page-title"></slot></p> -->
        </div>
        <div class="icon-container">
          <!-- <v-icon icon="mdi-bell-outline" color="white" size="x-large" class="icon"></v-icon> -->
          <div class="name-container overflow-hidden">
            <span class="name">{{ name }}</span>
            <span class="username">{{ user }}</span>
          </div>
          <v-avatar id="perfil" image="@/assets/default_user.jpg" size="default" class="icon"></v-avatar>
          <v-menu transition="scale-transition" activator="#perfil" class="menu_expandible">
            <v-list class="elevation-20 menu-list" bg-color="#1D1D1D">
              <v-list-item @click="navigate('/profile')" class="menu-item" density="compact">
                <v-list-item-title>Perfil</v-list-item-title>
              </v-list-item>
              <v-list-item @click="handleLogOut()" class="menu-item" density="compact">
                <v-list-item-title>Cerrar Sesión</v-list-item-title>
              </v-list-item>
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

.menu-list {
  background-color: #1D1D1D;
}

.menu-item {
  color: white;
  font-size: 14px;
}

.v-list-item-title {
  font-size: 14px;
}

.menu-item:hover {
  background-color: #2D2B3E;
}

:deep(.v-list) {
  background-color: #1D1D1D;
  color: white;
}

:deep(.v-menu .v-overlay__content) {
  background-color: #1D1D1D;
}
</style>
