//id de Usuario, fecha, hora, monto, tipo de movimiento, descripcion

import { ref } from 'vue';
import { defineStore } from 'pinia';
//import {  } from '@/api/';

export const useMovementStore = defineStore('movement', () => {

    const movements = ref({})

    function addMovement(userId, date, time, amount, movementType, description, isCardTransaction) {
        if (!movements.value[userId]) {
            movements.value[userId] = []
        }
        movements.value[userId].push({ date, time, amount, movementType, description, isCardTransaction })
    }

    function getMovementsByUserId(userId) {
        return movements.value[userId]
    }

    return { addMovement, getMovementsByUserId }
})
