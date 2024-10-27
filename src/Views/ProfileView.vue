<script setup>

import { useProfileStore } from '@/Stores/ProfileStore';
import { ref, computed } from 'vue';
import NavComponent from '@/components/NavigationComponent.vue';
  
const profileStore = useProfileStore();
const profile = profileStore.getCurrentProfile();
const name= ref(profile.name);
const lastName= ref(profile.lastName);
const mail= ref(profile.email);
const age= ref(profile.age);

const username = computed(() => {
        
    return profile ? `@${profile.name}_${profile.lastName}` : '';
});
  

</script>

<template>
    <nav-component>
      <template #Main_page>
        <!-- Contenedor para centrar y añadir margen a la tarjeta -->
        <div class="d-flex justify-center align-center my-12">
          <v-card class="ma-4" color="#1D1D1D" min-width="800" elevation="8">
            <v-card-title>
                <v-row no-gutters align="center">
                    <v-col cols="2">
                        <v-spacer></v-spacer>
                    </v-col>
                    <v-col cols="8">
                        <h3 class="text-h4 font-weight-bold text-center">Perfil</h3>
                    </v-col>
                    <v-col cols="2" class="text-right">
                         <v-btn icon text @click="handleButtonClick">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
              
            
               
            </v-card-title>
            <v-card-text class="py-0">
              <div class="d-flex">
                <v-text-field
                  label="Nombre de usuario"
                  v-model="username"
                  disabled
                  type="text"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  color="blue"
                  class="pa-1"
                ></v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field
                  label="Nombre"
                  v-model="name"
                  disabled
                  type="text"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  color="blue"
                  class="pa-1"
                ></v-text-field>
                <v-text-field
                  label="Apellido"
                  v-model="lastName"
                  disabled
                  type="text"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  color="blue"
                  class="pa-1"
                ></v-text-field>
              </div>
              <div class="d-flex">
                <v-text-field
                  label="Mail"
                  v-model="mail"
                  disabled
                  type="email"
                  prepend-inner-icon="mdi-account"
                  variant="outlined"
                  color="blue"
                  class="pa-1"
                ></v-text-field>
                <v-text-field
                  label="Edad"
                  v-model="age"
                  max-width="150px"
                  disabled
                  type="number"
                  variant="outlined"
                  color="blue"
                  class="pa-1"
                ></v-text-field>
              </div>
            </v-card-text>
          </v-card>
        </div>
        <div class="d-flex justify-center align-center my-12">
            <v-btn color="#870102">
                Eliminar cuenta
            </v-btn>
        </div>
      </template>
    </nav-component>
  </template>
  
  
<style scoped>

    .profile_page {

      display: flex;
      flex-direction: column;
      align-items: center;
      color: #ffffff;
      padding: 2rem;
    }
  
    .profile_container  {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
      background: #2f2e36;
      border-radius: 10px;

    }
  
    .profile_details {
    
    margin-bottom: 1.5rem;
        display: flex;
        margin-right: 1rem;
    }
  
    .profile_details label    {
    
    font-weight: bold;
      margin-right: 1rem;
    }
  
    .password-container   {

      display: flex;
      align-items: center; 
    }
  
    .password-toggle    {

        cursor: pointer;
        margin-left: 10px;
        font-size: 0.9rem;
        margin-left: auto;
    }
    
    .password-toggle:hover  {
    
        color: #8E66FF;
    }
  </style>