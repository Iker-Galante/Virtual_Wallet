<script setup>
import { ref } from 'vue'
const name= ref('Jose dominguez');
const user=ref('@user_name');
</script>

<template>
<v-app>
  <v-navigation-drawer :width="300" color="#2C2C2C" elevation="15" permanent>
    <v-list-item-title class="text-h4 titulo">PLATAN`T</v-list-item-title>
    <v-divider  class="divisor"></v-divider>
    <v-list-item class="list_items" prepend-icon="mdi-credit-card-multiple-outline" title="Mis Tarjetas"></v-list-item>
    <v-list-item class="list_items" prepend-icon="mdi-send-variant-outline" title="Pagar"></v-list-item> <!--swap-vertical para transferencias-->
    <v-list-item class="list_items" prepend-icon="mdi-arrow-up" title="Cobrar"></v-list-item>
    <v-list-item class="list_items" prepend-icon="mdi-inbox-multiple-outline" title="Mi Actividad"></v-list-item>
    <v-list-item class="list_items" prepend-icon="mdi-trending-up" title="Mis Inversiones"></v-list-item>
    <v-list-item class="list_items" prepend-icon="mdi-account-group-outline" title="Mis contactos"></v-list-item>
</v-navigation-drawer>
</v-app>
<div class="nav_bar elevation-15">
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <v-text-field class="search_bar" prepend-inner-icon="mdi-magnify" max-width="500px" label="Buscar" color="grey"></v-text-field>
      </v-col>
    </v-row>
  </v-container>
    <div class="icon-container">
      <v-icon icon="mdi-bell-outline" color="white" size="x-large" class="icon"></v-icon>
      <div class="name-container">
        <span class="name">{{name}}</span>
        <span class="username">{{user}}</span>
      </div>
      <v-avatar image="@/assets/default_user.jpg" size="default" class="icon"></v-avatar>
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
  margin-bottom: 30px;
}
.titulo {
  font-weight: 500;
  margin : 10px 0px 10px 16px;
}
.nav_bar {
  height: 72px;
  width: calc(100vw - 315px); /* Adjust width to account for left offset */
  position: fixed;
  top: 0;
  left: 300px;
  background-color: #2C2C2C;
  display: flex; /* Use flexbox for alignment */
  justify-content: flex-end; /* Align items to the right */
  align-items: center; /* Center items vertically */
}

.icon-container {
  display: flex;
  align-items: center;
  padding-right: 60px; 
}

.icon {
  margin-left: 12px; /* Add some space between icons */
}
.name-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 16px;
}

.name {
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
}

.username {
  color: #A0A0A0;
  font-size: 12px;
}

.search_bar {
  margin-left: 40px;
  color: white;
  align-items: center;
  margin-top: 20px;
}
</style>
