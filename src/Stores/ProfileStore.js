//Nombre, apellido, mail, contrasena, tarjetas, idUsuario

import { ref } from 'vue';
import { defineStore } from 'pinia';
//import {  } from '@/api/';

export const useProfileStore = defineStore('profile', () => {

    const profile = ref({
        name: '',
        lastName: '',
        email: '',
        password: '',
        cards: [],
        userId: ''
    })



    //return {  }
})