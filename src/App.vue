<script setup>
</script>

<template>
<v-app>
  <v-navigation-drawer :width="300" color="#2C2C2C" elevation="15" permanent>
    <v-list-item-title class="text-h4 titulo">PLATAN`T</v-list-item-title>
    <v-divider  class="divisor"></v-divider>
    <v-list-item class="list_items" prepend-icon="mdi-credit-card-multiple-outline" title="Mis Tarjetas"></v-list-item>
    <v-list-item class="list_items" prepend-icon="mdi-send-variant-outline" title="Pagar"></v-list-item>
    <v-list-item class="list_items" prepend-icon="mdi-arrow-up" title="Cobrar"></v-list-item>
    <v-list-item class="list_items" prepend-icon="mdi-inbox-multiple-outline" title="Mi Actividad"></v-list-item>
    <v-list-item class="list_items" prepend-icon="mdi-trending-up" title="Mis Inversiones"></v-list-item>
    <v-list-item class="list_items" prepend-icon="mdi-account-group-outline" title="Mis contactos"></v-list-item>
</v-navigation-drawer>
</v-app>
<div class="nav_bar elevation-15">
  <!-- MAÑANA SEGUIR CON LA BARRA DE NAVEGACION-->
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
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #2C2C2C;
}
</style>
