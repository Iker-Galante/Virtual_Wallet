
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useProfileStore } from '@/Stores/ProfileStore';

export const useBalanceStore = defineStore('balance', () => {

    const balances = ref({});

    function addFundsById(userId, amount) {

        if (!balances.value[userId])    {

            balances.value[userId] = 0;
        }
            
        balances.value[userId] += amount;
    }

    function getBalanceById(userId) {
        
        return balances.value[userId] || 0;
    }

    const profiles = useProfileStore();
    const currentId = computed(() => profiles.getCurrentProfileId());

    function addFunds(amount)   {   //  Current user
    
        addFundsById(currentId.value, amount);
    }

    function getBalance()   {       //  Current user

        return getBalanceById(currentId.value);
    }

    return { addFundsById, getBalanceById, addFunds,getBalance };
});