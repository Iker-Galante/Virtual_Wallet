//Arreglo de usuarios. Cada user tiene almacenado:
//Nombre, apellido, mail, contrasena, idUsuario

import { ref, computed } from 'vue';
import { defineStore } from 'pinia'
import dummyProfiles from '@/API/profiles';

export const useProfileStore = defineStore('profile', () => {

    const profiles = ref([{ name: 'default', lastName: 'guest', age: '100', email: 'admin@gmail.com', password: 'admin' }])
    const totalProfiles = computed(() => profiles.value.length)
    const currentProfile = ref(null);
    const token = ref('12345678')

    function fetchProfiles() {
        const fetchedProfiles = dummyProfiles
        fetchedProfiles.forEach(profile => {
            addProfile(profile.name, profile.surname, profile.age, profile.email)
        })
    }

    function getToken(){
        return token.value
    }

    function setToken(newToken){
        token.value = newToken
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

    function deleteProfile(index) {
        profiles.value.splice(index, 1)
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

    function getCurrentProfileId()   { // Te da el indice del usuario actual
        return getCurrentProfile ?  getCurrentProfileIndex(getCurrentProfile()?getCurrentProfile().email : null) : null;
    }

    function resetPassword(index, newPassword) {
        profiles.value[index].password = newPassword
    }

    function editProfile(index, name, lastName, age, email) {
        profiles.value[index].name = name
        profiles.value[index].lastName = lastName
        profiles.value[index].age = age
        profiles.value[index].email = email
    }

    return { getCurrentProfileId, addProfile, getCurrentProfileUserId, fetchProfiles,getCurrentProfileIndex,setCurrentProfile,getCurrentProfile,resetPassword, getToken, setToken, editProfile, deleteProfile}
})