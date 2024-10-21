// UserIds, nombre, apellido, mail?

import { ref } from 'vue';
import { defineStore } from 'pinia';
//import {  } from '@/api/';

export const useContactsStore = defineStore('contacts', () => {

    const contacts = ref({
        name: '',
        lastName: '',
        email: '',
        userIds: []
    })



    //return {  }
})