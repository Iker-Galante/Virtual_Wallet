<script setup>
import UserComponent from '@/components/Users/UserComponent.vue';
import NavigationComponent from '@/components/Utilities/NavigationComponent.vue';
import { useContactsStore } from '@/Stores/ContactsStore';
import { useProfileStore } from '@/Stores/ProfileStore';
import { computed, onMounted, ref } from 'vue';
import AddContactComponent from '@/components/Users/AddContactComponent.vue';

const contactsStore = useContactsStore();
const profileStore = useProfileStore();
const currentUserId = profileStore.getCurrentProfileId();
const isOpen = ref(false);
const contactsId = computed(() => contactsStore.getContacts(currentUserId));

</script>

<template>

  <NavigationComponent>

    <template #page-title>Contactos</template>
    <template #Main_page>
    
        <div class="contacts-wrapper">
            <v-container fluid>
                <v-row v-if="contactsId && contactsId.length">
                    <v-col
                    
                        v-for="contacts in contactsId"
                        :key="contacts"
                        cols="12"
                        sm="6"
                        md="4"
                    >

    <!-- Feo, pero necesario para validar que exista el usuario y de paso ya se gettea su info-->

            <template v-if="contacts">
                
                <UserComponent
                
                :name="contacts.name"
                  :lastName="contacts.cvu"
                  :username="contacts.phone"
                />

              </template>
            </v-col>
          </v-row>
          
          <v-row v-else class="no-contacts-wrapper">

            <v-col cols="12" class="text-center">

              <p class="no-contacts-message">Todavía no tenés ningun contacto</p>
            </v-col>

          </v-row>
          <v-btn @click="isOpen=!isOpen" class="place"> Add a new contact</v-btn>
          <AddContactComponent v-model:isOpen="isOpen" v-model:userId="currentUserId"/>
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

    .place  {
      position: absolute;
      position: fixed;  /* Keeps the button in a fixed position */
      bottom: 20px;     /* Distance from the bottom of the screen */
      right: 20px;      /* Distance from the right side of the screen */
      padding: 10px 20px;
      background-color: rgb(51, 51, 51) ;
      color : white;
    }
    
</style>
