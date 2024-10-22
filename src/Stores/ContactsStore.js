//La idea es hacer un arreglo de arreglos de userIds, siendo el indice el userId.

import { ref } from 'vue';
import { defineStore } from 'pinia';
//import {  } from '@/api/';

export const useContactsStore = defineStore('contacts', () => {

    const contacts = ref({})

    //TODO: como no esta la API, hay que inventar datos. 
    const fetchContacts = async () => {
    }

    //asumo que los contactos se agregan a los dos lados.
    function addContact(userId, contactId) {
        if (!contacts.value[userId]) {
            contacts.value[userId] = []
        }
        contacts.value[userId].push(contactId)
        contacts.value[contactId].push(userId)
    }

    function getContacts(userId) {
        return contacts.value[userId] || []
    }

    function eliminateContact(userId, contactId) {
        contacts.value[userId] = contacts.value[userId].filter(id => id !== contactId)
        contacts.value[contactId] = contacts.value[contactId].filter(id => id !== userId)
    }

    return { addContact, getContacts, eliminateContact }
})