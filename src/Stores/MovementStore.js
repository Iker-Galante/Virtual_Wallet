//id de Usuario, fecha, hora, monto, tipo de movimiento, descripcion

import { defineStore } from 'pinia';

export const useMovementStore = defineStore('movement', {
    state: () => ({
        movements: []
    }),
    actions: {
        addMovement(movement) {
            this.movements.push(movement)
        }
    },
    getters: {
        getMovements: (state) => state.movements
    }
});
