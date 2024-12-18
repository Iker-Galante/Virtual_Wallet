//La idea es hacer un arreglo de arreglos, donde cada subarreglo son las tarjetas de un usuario.
//Cada tarjeta tiene almacenado: nombre, apellido, numero de tarjeta, fecha de vencimiento, cvv, saldo, tipo de tarjeta.

import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useProfileStore } from './ProfileStore'; 

export const useCardStore = defineStore('card', () => {

    const cards = ref({})
    const showDelete = ref(false)
    const profileStore = useProfileStore() 

    function toggleDeleteButton(state) {
        showDelete.value = state;
    }

    function addCard(name, cardNumber, expirationDate, cvv, cardBalance, userId) {
        if (!cards.value[userId]) {
            cards.value[userId] = []
        }
     
        cards.value[userId].push({ name, cardNumber, expirationDate, cvv, cardBalance })
    }

    function getCards(userId) {
        if (!cards.value[userId]) {
            cards.value[userId] = []
        }
        return cards.value[userId]
    }

    function eliminateCard(userId, cardNumber) {
        if (cards.value[userId]) {
            cards.value[userId] = cards.value[userId].filter(card => card.cardNumber !== cardNumber);
        }
    }

    function addCardTransaction(userId, cardNumber, amount) {
        if (cards.value[userId]) {
            const card = cards.value[userId].find(card => card.cardNumber === cardNumber);
            if (card && card.cardBalance + amount < 0) {
                alert("Fondos insuficientes en la tarjeta. Esta transacción no puede completarse.");
                return false;
            }
            cards.value[userId] = cards.value[userId].map(card => 
                card.cardNumber === cardNumber ? 
                { ...card, cardBalance: parseFloat((card.cardBalance + amount).toFixed(2)) } : 
                card
            );
        }
        return true;
    }

    return { addCard, getCards, eliminateCard, toggleDeleteButton, showDelete, addCardTransaction }
})
