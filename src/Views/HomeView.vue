<script setup>
import BalanceComponent from '@/components/ManageMoney/BalanceComponent.vue';
import MovementsComponent from '@/components/ManageMoney/MovementComponent.vue';
import Navigation from '@/components/Utilities/NavigationComponent.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const routeName = router.options.routes.filter(route => route.name === 'mainPage')[0].spanishName;

</script>

<template>
  <Navigation>
    <template #page-title>{{routeName}}</template>
    <template #Main_page>
        <div class="balance-wrapper">
          <BalanceComponent/>
        </div>
        <div class="movement-wrapper">
          <MovementsComponent/>
        </div>
    </template>
  </Navigation>
</template>

<style scoped>

.balance-wrapper, .movement-wrapper {
  width: 100%;
}

.balance-wrapper {
  display: flex;
  justify-content: center;
}

.movement-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
