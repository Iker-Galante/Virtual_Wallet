//La idea es hacer un arreglo de arreglos, donde cada subarreglo son las tarjetas de un usuario.
//Cada tarjeta tiene almacenado: nombre, apellido, numero de tarjeta, fecha de vencimiento, cvv, saldo, tipo de tarjeta.

import { ref } from 'vue';
import { defineStore } from 'pinia';
//import {  } from '@/api/';

export const useCardStore = defineStore('card', () => {

    const cards = ref({})

    const showDelete = ref(false)

    //TODO: como no esta la API, hay que inventar datos. 
    const fetchCards = async () => {
    }

    function toggleDeleteButton(state) {
        showDelete.value = state;
    }

    function addCard(name, cardNumber, expirationDate, cvv, cardBalance, userId) {
        if (!cards.value[userId]) {
            cards.value[userId] = []
        }
        cards.value[userId].push({ name: name, cardNumber: cardNumber, expirationDate: expirationDate, cvv: cvv, cardBalance: cardBalance })
    }

    function getCards(userId) {
        return cards.value[userId] || []
    }

    function eliminateCard(userId, cardNumber) {
        if (cards.value[userId]) {
            cards.value[userId] = cards.value[userId].filter(card => card.cardNumber !== cardNumber);
        }
    }

    function addCardTransaction(userId, cardNumber, amount) {
        if (cards.value[userId]) {
            cards.value[userId] = cards.value[userId].map(card => card.cardNumber === cardNumber ? { ...card, cardBalance: card.cardBalance + amount } : card);
        }
    }

    return { addCard, getCards, eliminateCard, toggleDeleteButton, showDelete, addCardTransaction }
})
