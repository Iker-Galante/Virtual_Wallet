
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
// import { useMovementStore } from './MovementStore';
// import { useProfileStore } from './ProfileStore';

export const useBalanceStore = defineStore('balance', () => {

     const initialBalance = ref(0.00);

    //     //TODO: optimizar esto
    // const currentUserMail = computed(() => useProfileStore().getCurrentProfile());
    // console.log(currentUserMail.value);
    // const currentUserId = computed(() => useProfileStore().getCurrentProfileUserId(currentUserMail));
    // console.log(currentUserId.value);

    // // addRandomMovements(currentUserId);
    // const movements = computed(() => useMovementStore().getMovementsByUserId(currentUserId));
    // if (movements.value != undefined) {
    //     console.log(movements.value);
    // }
    // else console.log("No movements");
    
    // const totalBalance = computed(() => {
    //     if (movements.value != undefined) {
    //         return initialBalance.value + movements.value.reduce((acc, curr) => acc + curr.amount, 0);
    //     } else {
    //         return initialBalance.value;
    //     }
    // });
    


    // function addFunds(amount) {
    //     initialBalance.value += amount;
    // }
    // function getBalance() {
    //     return totalBalance.value;
    // }


    // return { addFunds,getBalance };
    return {initialBalance};
});