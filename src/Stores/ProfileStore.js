//Arreglo de usuarios. Cada user tiene almacenado:
//Nombre, apellido, mail, contrasena, idUsuario

import { ref, computed } from 'vue';
import { defineStore } from 'pinia'
import dummyProfiles from '@/API/profiles';

export const useProfileStore = defineStore('profile', () => {

    const profiles = ref([])
    const totalProfiles = computed(() => profiles.value.length)
 
    function fetchProfiles() {
        const fetchedProfiles = dummyProfiles
        fetchedProfiles.forEach(profile => {
            addProfile(profile.name, profile.surname, profile.age, profile.email)
        })
    }

    function getNextUnusedUserId() {
        return totalProfiles.value
    }

    function addProfile(name, lastName, age, email, password) {
        const userId = getNextUnusedUserId()
        profiles.value[userId] = { name, lastName, age, email, password }
        totalProfiles.value++
    }

    function getCurrentProfileUserId(email) {
        return profiles.value.findIndex(profile => profile.email === email)
    }


    return { addProfile, getCurrentProfileUserId, fetchProfiles }
})