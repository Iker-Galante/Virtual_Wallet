// ni idea, userId, stockID?, amount?
//Por ahora queda sin implementar, hasta que decidamos

import { ref } from 'vue';
import { defineStore } from 'pinia';
//import {  } from '@/api/';

export const useInversionStore = defineStore('inversion', () => {

    const inversion = ref({
        userId: '',
        stockId: '',
        amount: ''
    })



    //return {  }
})