<script setup>
import { ref, provide, computed } from 'vue'
import { useProfileStore } from '@/Stores/ProfileStore'
import { useRoute } from 'vue-router';

import NavigationComponent from '@/components/Utilities/NavigationComponent.vue';
import PaymentsComponents from '@/components/ManageMoney/PaymentsComponents.vue';
const profileStore = useProfileStore();
const currentuserId = ref(profileStore.getCurrentProfileIndex(profileStore.getCurrentProfile().email));
provide('currentuserId', currentuserId);

const route = useRoute();
const userId = computed(() => route.query.from ?? undefined);
const paymentId = computed(() => route.query.payment ?? undefined);

</script>

<template>
    <NavigationComponent>
        <template #page-title> Pagar </template>
        <template #Main_page>
            <PaymentsComponents :userIdArg="userId" :paymentIdArg="paymentId"/>
        </template>
    </NavigationComponent>
</template>

<style scoped>
</style>