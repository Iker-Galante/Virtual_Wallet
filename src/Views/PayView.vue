<script setup>
import { ref, provide } from 'vue'
import { useProfileStore } from '@/Stores/ProfileStore'
import NavigationComponent from '@/components/NavigationComponent.vue';
import PaymentComponent from '@/components/PaymentComponent.vue';

const profileStore = useProfileStore();
const currentuserId = ref(profileStore.getCurrentProfileIndex(profileStore.getCurrentProfile().email));
provide('currentuserId', currentuserId);

</script>

<template>
    <NavigationComponent>
        <template #page-title> Pagar </template>
        <template #Main_page>
            <PaymentComponent/>
        </template>
    </NavigationComponent>
</template>

<style scoped>
</style>