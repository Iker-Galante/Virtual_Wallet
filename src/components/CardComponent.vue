<template>
    <v-card
      class="credit-card"
      :color="cardColor"
      :style="{ backgroundColor: cardColor }"
      rounded="xl"
      elevation="5"
      max-width="300"
    >
      <v-card-text>
        <v-row no-gutters align="center">
          <v-col cols="8">
            <p class="text-h6 font-weight-bold white--text" style="color: white;">
              {{ cardholderName }}
            </p>
          </v-col>
          <v-col cols="4" class="text-right">
            <v-img
            :src= "TipoTarjeta" 
            max-width="50"
            max-height="50"
            class="ml-4"
          ></v-img>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <p class="text-h7 font-weight-bold white--text" style="color: white;">
              {{ formattedCardNumber }}
            </p>
          </v-col>
        </v-row>
        <v-row no-gutters justify="end">
          <v-col class="text-right">
            <v-icon
              icon="mdi-trash-can-outline"
              color="white"
              size="large"
              v-if="cardStore.showDelete"
              @click="isOpen = true"
              class="mt-10 mr-2"
            ></v-icon>
          </v-col>
        </v-row>
        <v-dialog v-model="isOpen" width="auto" persistent>
          <v-card color="#1D1D1D">
            <v-card-text>¿Estás seguro de que deseas eliminar esta tarjeta?</v-card-text>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click="deleteCard()">Sí</v-btn>
                  <v-btn @click="isOpen = false">No</v-btn>
              </v-card-actions>
            </v-card>
        </v-dialog>
      </v-card-text>
    </v-card>
  </template>
  
  
  
  <script setup>

  import { computed, defineProps, ref } from 'vue';
  import { useProfileStore } from '@/Stores/ProfileStore'
  import { useCardStore } from '@/Stores/CardStore'
  import mastercard from '@/assets/mastercard-logo.png';
  import visa from '@/assets/Visa.png';
  import amex from '@/assets/American-Express-Logo.png'
  
  const props = defineProps({
    cardNumber: {
      type: String,
      required: true,
    },
    cardholderName: {
      type: String,
      required: true,
    },
    cardColor: {
      type: String,
      default: '#CFB53B',
    },
  });

  const isOpen = ref(false);

  const profileStore = useProfileStore()
  const cardStore = useCardStore()
  const currentProfile = computed(() => profileStore.getCurrentProfile())
  const profileId = computed(() => profileStore.getCurrentProfileIndex(currentProfile.value.email))
  
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const masterCardRegex = /^5[1-5][0-9]{14}$/;
  const amexRegex = /^3[47][0-9]{13}$/;

  

  const deleteCard = () => {
    cardStore.eliminateCard(profileId.value, props.cardNumber)
    isOpen.value = false
}

  const formattedCardNumber = computed(() => {
    
    const lastFourDigits = props.cardNumber.slice(-4);
    if (amexRegex.test(props.cardNumber)) {
      return `•••• •••••• •${lastFourDigits}`;
    }
    return `•••• •••• •••• ${lastFourDigits}`;
  });

  const variants = ref([
    { image: mastercard },
    { image: visa },
    { image: amex }
  ]);

  const TipoTarjeta = computed(() => {
    
    if (visaRegex.test(props.cardNumber)) {
        return variants.value[1].image;
    } else if (masterCardRegex.test(props.cardNumber)) {
        return variants.value[0].image;
    } else if (amexRegex.test(props.cardNumber)) {
        return variants.value[2].image;
    }
    else {
        return '';
    }
});

  </script>
  
  <style scoped>
  .credit-card {
    aspect-ratio: 2;
    position: relative;
    overflow: hidden;
  }
  
  .credit-card::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.2) 0%,
      rgba(255, 255, 255, 0) 70%
    );
    transform: rotate(30deg);
  }
  </style>