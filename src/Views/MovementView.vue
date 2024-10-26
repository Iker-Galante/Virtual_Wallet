<script setup>
import MovementsComponent from '@/components/MovementComponent.vue';
</script>

<template>
    <NavigationComponent>
        <template #page-title> Movimientos </template>
        <template #Main_page>
            <div class="movement-wrapper">
                <MovementsComponent/>
            </div>
        </template>
    </NavigationComponent>
</template>

<style scoped>
.movement-wrapper {
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* height: 100%; */
  margin-top: 40px;
}
</style>
