//id de Usuario, fecha, hora, monto, tipo de movimiento, descripcion
// Nro de tarjeta

import { ref } from 'vue';
import { defineStore } from 'pinia';
//import {  } from '@/api/';

export const useMovementStore = defineStore('movement', () => {

    const movement = ref({
        userId: '',
        date: '',
        time: '',
        amount: '',
        movementType: '',
        description: '',
        cardNumber: ''
    })



    //return {  }
})