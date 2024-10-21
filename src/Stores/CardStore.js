// Nombre, apellido, Numero de tarjeta, fecha de vencimiento, cvv, 
//saldo, tipo de tarjeta.

import { ref } from 'vue';
import { defineStore } from 'pinia';
//import {  } from '@/api/';

export const useCardStore = defineStore('card', () => {

    const card = ref({
        name: '',
        lastName: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
        balance: '',
        cardType: '',
        userId: ''
    })



    //return {  }
})