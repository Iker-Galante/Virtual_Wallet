<script setup>
import { ref, provide } from 'vue'
import { useProfileStore } from '@/Stores/ProfileStore'
import NavigationComponent from '@/components/Utilities/NavigationComponent.vue';
import PaymentComponent from '@/components/ManageMoney/PaymentComponent.vue';
import PaymentsComponents from '@/components/ManageMoney/PaymentsComponents.vue';
const profileStore = useProfileStore();
const currentuserId = ref(profileStore.getCurrentProfileIndex(profileStore.getCurrentProfile().email));
provide('currentuserId', currentuserId);

</script>

<template>
    <NavigationComponent>
        <template #page-title> Pagar </template>
        <template #Main_page>
            <PaymentsComponents/>
            <!--<PaymentComponent/> -->
        </template>
    </NavigationComponent>
</template>

<style scoped>
</style>