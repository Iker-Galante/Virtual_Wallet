//Arreglo de usuarios. Cada user tiene almacenado:
//Nombre, apellido, mail, contrasena, idUsuario

import { ref, computed } from 'vue';
import { defineStore } from 'pinia'
//import {  } from '@/api/';

export const useProfileStore = defineStore('profile', () => {

    const profiles = ref([])
    const totalProfiles = computed(() => profiles.value.length)

    //TODO: seguir esta parte. 
    const fetchProfiles = async () => {
    }

    function getNextUnusedUserId() {
        return totalProfiles.value
    }

    function addProfile(name, lastName, email, password) {
        const userId = getNextUnusedUserId()
        profiles.value[userId] = { name, lastName, email, password }
        totalProfiles.value++
    }

    function getCurrentProfileUserId(email) {
        return profiles.value.findIndex(profile => profile.email === email)
    }


    return { addProfile, getCurrentProfileUserId }
})