<script setup>
import UserComponent from '@/components/UserComponent.vue';
import NavigationComponent from '@/components/NavigationComponent.vue';
import { useContactsStore } from '@/Stores/ContactsStore';
import { useProfileStore } from '@/Stores/ProfileStore';
import { computed, onMounted } from 'vue';

const contactsStore = useContactsStore();
const profileStore = useProfileStore();
const currentUserId = 0; 

onMounted(async () => {

  await contactsStore.fetchContacts();
  await profileStore.fetchProfiles();

});

const contactIds = computed(() => contactsStore.getContacts(currentUserId));


</script>

<template>

  <NavigationComponent>

    <template #page-title>Contactos</template>
    <template #Main_page>
    
        <div class="contacts-wrapper">
            <v-container fluid>
                <v-row v-if="contacts && contacts.length">
                    <v-col
                    
                        v-for="id in contactsId"
                        :key="id"
                        cols="12"
                        sm="6"
                        md="4"
                    >

    <!-- Feo, pero necesario para validar que exista el usuario y de paso ya se gettea su info-->

            <template v-if="(profile = profileStore.getProfileById(id))">
                
                <UserComponent
                
                :name="profile.name"
                  :lastName="profile.lastName"
                  :username="`@${profile.name}_${profile.lastName}`"
                />

              </template>
            </v-col>
          </v-row>
          
          <v-row v-else class="no-contacts-wrapper">

            <v-col cols="12" class="text-center">

              <p class="no-contacts-message">Todavía no tenés ningun contacto</p>

            </v-col>

          </v-row>
        </v-container>
      </div>
    </template>
  </NavigationComponent>
</template>

<style scoped>

    .contacts-wrapper {
            
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .no-contacts-wrapper    {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px;
    }

    .no-contacts-message    {

        font-size: 1.5rem;
        color: #8E66FF;
        font-weight: bold;
    }
    
</style>
