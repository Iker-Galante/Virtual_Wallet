//La idea es hacer un arreglo de arreglos de userIds, siendo el indice el userId.

import { ref } from 'vue';
import { defineStore } from 'pinia';
import dummyProfiles from '@/API/profiles';

export const useContactsStore = defineStore('contacts', () => {

    const contacts = ref([])

    function fetchContacts() {

        for(let i=1; i < dummyProfiles.length; i++) { //OMG C sintax hi!!

            addContact(0, i);
        }

        console.log(contacts);
    }

    //asumo que los contactos se agregan a los dos lados.
    function addContact(userId, name, cvu, phone) {
        
        if (!contacts.value[userId]) {
            contacts.value[userId] = []
        }
        contacts.value[userId].push({name: name, cvu: cvu, phone: phone});
    }

    function getContacts(userId) {
        return contacts.value[userId] || []
    }

    function eliminateContact(userId, contactId) {
        contacts.value[userId] = contacts.value[userId].filter(id => id !== contactId)
        contacts.value[contactId] = contacts.value[contactId].filter(id => id !== userId)
    }

    return { fetchContacts, addContact, getContacts, eliminateContact }
})