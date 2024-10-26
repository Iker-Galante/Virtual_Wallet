//La idea es hacer un arreglo de arreglos, donde cada subarreglo son las tarjetas de un usuario.
//Cada tarjeta tiene almacenado: nombre, apellido, numero de tarjeta, fecha de vencimiento, cvv, saldo, tipo de tarjeta.

import { ref } from 'vue';
import { defineStore } from 'pinia';
//import {  } from '@/api/';

export const useCardStore = defineStore('card', () => {

    const cards = ref({})

    //TODO: como no esta la API, hay que inventar datos. 
    const fetchCards = async () => {
    }

    function addCard(name, cardNumber, expirationDate, cvv, cardBalance, userId) {
        if (!cards.value[userId]) {
            cards.value[userId] = []
        }
        cards.value[userId].push({ name, cardNumber, expirationDate, cvv, cardBalance })
    }

    function getCards(userId) {
        return cards.value[userId] || []
    }

    function eliminateCard(userId, cardNumber) {
        if (cards.value[userId]) {
            cards.value[userId] = cards.value[userId].filter(card => card.cardNumber !== cardNumber);
        }
    }

    return { addCard, getCards, eliminateCard }
})
