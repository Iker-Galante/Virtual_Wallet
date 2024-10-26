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
            max-width="60"
            max-height="60"
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
      </v-card-text>
    </v-card>
  </template>
  
  
  
  <script setup>

  import { computed, defineProps, ref } from 'vue';
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
  
  const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
  const masterCardRegex = /^5[1-5][0-9]{14}$/;
  const amexRegex = /^3[47][0-9]{13}$/;

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