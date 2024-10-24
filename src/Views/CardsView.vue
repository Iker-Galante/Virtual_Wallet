<script setup>
import { ref, onMounted, computed } from 'vue'
import Card from '@/components/CardComponent.vue'
import NavigationComponent from '@/components/NavigationComponent.vue'
import { useCardStore } from '@/stores/CardStore'
import { useProfileStore } from '@/Stores/ProfileStore'

const cardStore = useCardStore()
const profileStore = useProfileStore()

const currentProfile = computed(() => profileStore.getCurrentProfile())
const profileId = computed(() => profileStore.getCurrentProfileIndex(currentProfile.value.email))
const cards = computed(() => cardStore.getCards(profileId.value))

onMounted(() => {
  // Only add a card if there are no cards for this profile
  if (cards.value.length === 0) {
    addCard(currentProfile.value.lastName)
  }
})



const addCard = (lastName) => {
  cardStore.addCard(
    currentProfile.value.name,
    lastName,
    123456781479,
    '12/06',
    123,
    0,
    'AMEX',
    profileId.value
  )
}

const deleteCard = () => {
  console.log('Card deleted')
}
console.log(cards.value)
</script>

<template>
  <v-app>
    <NavigationComponent>Mis Tarjetas</NavigationComponent>
    <v-main class="main_page">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="(tarjeta, index) in cards"
            :key="index"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
          >
            <Card>
              <template #card>
                <span class="pl-2 text-h5">{{ tarjeta.name + ' ' + tarjeta.lastName }}</span>
                <span class="pr-2 text-h5">{{ tarjeta.cardType }}</span>
              </template>
              <template #card_number>
                <span class="pl-2 text-h5">{{ tarjeta.cardNumber }}</span>
                <span class="pl-2 text-h7">Exp date: {{ tarjeta.expirationDate }}</span>
                <v-icon icon="mdi-trash-can-outline" @click="deleteCard()"></v-icon>
              </template>
            </Card>
          </v-col>
        </v-row>
      </v-container>
      <v-btn @click="addCard('Galante')" class="agregar">Agregar Tarjeta</v-btn>
    </v-main>
  </v-app>
</template>

<style scoped>
.agregar{
   position: absolute;
    bottom: 50vh;
    right: 50vh;
    background-color: #acacac;
    color: white;
    font-size: 20px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
}
</style>