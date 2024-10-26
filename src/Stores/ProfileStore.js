//Arreglo de usuarios. Cada user tiene almacenado:
//Nombre, apellido, mail, contrasena, idUsuario

import { ref, computed } from 'vue';
import { defineStore } from 'pinia'
import dummyProfiles from '@/API/profiles';

export const useProfileStore = defineStore('profile', () => {

    const profiles = ref([{ name: 'default', lastName: 'guest', age: '100', email: 'admin@gmail.com', password: 'admin' }])
    const totalProfiles = computed(() => profiles.value.length)
    const currentProfile = ref(profiles.value[0]);

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
        profiles.value[userId] = { 
            name: name,
            lastName: lastName,
            age: age,
            email: email,
            password: password }
    }

    function getCurrentProfileUserId(email) {
        return profiles.value.find(profile => profile.email === email)
    }

    function getCurrentProfileIndex(email) {
        return profiles.value.findIndex(profile => profile.email === email)
        }
    
    function setCurrentProfile(profile){
        currentProfile.value = profile
    }

    function getCurrentProfile() {
        return currentProfile.value
    }

    function resetPassword(index, newPassword) {
        profiles.value[index].password = newPassword
    }

    return { addProfile, getCurrentProfileUserId, fetchProfiles,getCurrentProfileIndex,setCurrentProfile,getCurrentProfile,resetPassword }
})