<script setup>
import { ref } from 'vue'
const name = ref('Jose dominguez');
const user = ref('@user_name');
</script>

<template>
  <v-app>
    <v-navigation-drawer :width="300" color="#2C2C2C" elevation="15" permanent>
      <v-list-item-title class="text-h4 titulo">PLATAN'T</v-list-item-title>
      <v-divider class="divisor"></v-divider>
      <v-list>
        <v-list-item v-for="(item, i) in [
          { icon: 'mdi-credit-card-multiple-outline', title: 'Mis Tarjetas' },
          { icon: 'mdi-send-variant-outline', title: 'Pagar' },
          { icon: 'mdi-arrow-up', title: 'Cobrar' },
          { icon: 'mdi-inbox-multiple-outline', title: 'Mi Actividad' },
          { icon: 'mdi-trending-up', title: 'Mis Inversiones' },
          { icon: 'mdi-account-group-outline', title: 'Mis contactos' }
        ]" :key="i" :prepend-icon="item.icon" :title="item.title" class="list_items"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar elevation="15" height="72" color="#2C2C2C">
      <v-container fluid class="py-0 fill-height">
        <v-row no-gutters align="center" justify="space-between" class="fill-height">
          <v-col cols="12" md="6">
            <v-text-field
              class="search_bar"
              prepend-inner-icon="mdi-magnify"
              label="Buscar"
              color="grey"
              hide-details
              bg-color="transparent"
              density="compact"
            ></v-text-field>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <div class="d-flex align-center">
              <v-icon icon="mdi-bell-outline" color="white" size="large" class="icon"></v-icon>
              <div class="name-container">
                <span class="name">{{ name }}</span>
                <span class="username">{{ user }}</span>
              </div>
              <v-avatar image="@/assets/default_user.jpg" size="40" class="icon"></v-avatar>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main class="main_page">
      <v-container fluid>
        <h1>Inicio de sesion</h1>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.v-navigation-drawer {
  background-color: #2C2C2C;
}

.list_items {
  color: white;
  padding: 8px 16px;
  margin: 4px 0;
  font-size: 16px;
  font-weight: 500;
}

.divisor {
  background-color: white;
  margin-top: 10px;
  margin-bottom: 30px;
}

.titulo {
  font-weight: 500;
  margin: 16px 16px 10px;
  color: white;
}


.icon {
  margin-left: 12px;
}

.name-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin: 0 16px;
}

.name {
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.username {
  color: #A0A0A0;
  font-size: 12px;
}

.search_bar {
  max-width: 500px;
}

.main_page {
  background-color: #3C313B;
  padding-top: 72px;
  min-height: calc(100vh - 72px);
}

</style>