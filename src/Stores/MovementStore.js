//id de Usuario, fecha, hora, monto, tipo de movimiento, descripcion

import { ref } from 'vue';
import { defineStore } from 'pinia';
//import {  } from '@/api/';

export const useMovementStore = defineStore('movement', () => {

    const movements = ref([])

    const fetchMovements = async () => {
    }

    function addMovement(userId, date, time, amount, movementType, description) {
        if (!movements.value[userId]) {
            movements.value[userId] = []
        }
        movements.value[userId].push({ date, time, amount, movementType, description })
    }

    function getMovementsByUserId(userId) {
        return movements.value[userId]
    }

    //simulate the API.
    function addRandomMovements(userId) {
        for (let i = 0; i < 2; i++) {
            const isPositive = Math.random() < 0.5; 
            const randomAmount = Math.floor(Math.random() * 1000) + 1; 
            const amount = isPositive ? randomAmount : -randomAmount;

            const randomMovement = {
                date: new Date().toISOString().split('T')[0],
                time: new Date().toISOString().split('T')[1].split('.')[0],
                amount: amount,
                movementType: ['deposit', 'withdrawal', 'transfer', 'payment'][Math.floor(Math.random() * 4)],
                description: ['Salary', 'Rent', 'Groceries', 'Dinner', 'Refund', 'Bill Payment'][Math.floor(Math.random() * 6)]
            }
            addMovement(userId, randomMovement.date, randomMovement.time, randomMovement.amount, randomMovement.movementType, randomMovement.description)
        }
    }

    return { addMovement, getMovementsByUserId, addRandomMovements }
})
