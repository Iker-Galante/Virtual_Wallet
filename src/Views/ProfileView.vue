<template>
    <nav-component>Perfil
        <template #Main_page>
      
            <div class="profile_page">
      

                <div class="profile_container">
        
            
                    <div class="profile_details">
          
                        <label for="username">Usuario:  </label>
                        <span>{{ username }}</span>

                    </div>

                    <div class="profile_details">

                        <label for="email">Email: </label>
                        <span>{{ profile.email }}</span>

                    </div>

                    <div class="profile_details password-container">

                        <label for="password">Contraseña:  </label>

                        <span>{{ getPassword() }}</span>

                        <b class="password-toggle" @click="togglePasswordVisibility">

                        <span v-if="passwordVisible">Ocultar</span>
                        <span v-else>Mostrar</span>

                        </b>

                    </div>
                </div>
            </div>
        </template>
    </nav-component>
</template>
<script setup>

import { useProfileStore } from '@/Stores/ProfileStore';
import { ref, computed } from 'vue';
import NavComponent from '@/components/NavigationComponent.vue';
  
const profileStore = useProfileStore();
const profile = profileStore.getCurrentProfile();
const passwordVisible = ref(false);


  
const username = computed(() => {
        
    return profile ? `@${profile.name}_${profile.lastName}` : '';
});
  
function togglePasswordVisibility() {

    passwordVisible.value = !passwordVisible.value;
}

function getPassword() {
    
    return passwordVisible.value? profile.password : '*'.repeat(profile.password.length);
}

</script>
  
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