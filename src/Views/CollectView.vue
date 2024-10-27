<script setup>
import { ref, provide } from 'vue'
import { useProfileStore } from '@/Stores/ProfileStore'
import NavigationComponent from '@/components/Utilities/NavigationComponent.vue';
import AmountComponent from '@/components/ManageMoney/AmountComponent.vue';

const profileStore = useProfileStore();
const currentuserId = ref(profileStore.getCurrentProfileIndex(profileStore.getCurrentProfile().email));
provide('currentuserId', currentuserId);

</script>

<template>
    <NavigationComponent>
        <template #page-title> Cobrar </template>
        <template #Main_page>
            <AmountComponent/>
        </template>
    </NavigationComponent>
</template>

<style scoped>
</style>