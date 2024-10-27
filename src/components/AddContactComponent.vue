<script setup>
import { ref, defineModel} from 'vue';
import { useContactsStore } from '@/Stores/ContactsStore';

const contactsStore = useContactsStore();
const isOpen = defineModel('isOpen');
const userId = defineModel('userId');
const name = ref('');
const cvu = ref('');
const phone = ref('');

const addContact = () => {
    contactsStore.addContact(userId.value, name.value, cvu.value, phone.value);
    name.value = '';
    cvu.value = '';
    phone.value = '';
    isOpen.value = false;
}
</script>

<template>
    <v-dialog v-model="isOpen" max-width="500px">
        <v-card>
        <v-card-title>
            <span class="headline">Agregar contacto</span>
        </v-card-title>
        <v-card-text>
            <v-text-field
            v-model="name"
            label="Nombre y Apellido"
            :rules="[v => !!v || 'El campo es requerido']"
            ></v-text-field>
            <v-text-field
            v-model="cvu"
            label="CVU"
            :rules="[v => !!v || 'El campo es requerido']"
            type="number"
            ></v-text-field>
            <v-text-field
            v-model="phone"
            label="Telefono"
            :rules="[v => !!v || 'El campo es requerido']"
            type="number"
            ></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            color="blue darken-1"
            text
            @click="isOpen = false"
            >
            Cancelar
            </v-btn>
            <v-btn
            color="blue darken-1"
            text
            @click="addContact"
            :disabled="!name || !cvu || !phone"
            >
            Agregar
            </v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>

</template>