<script setup>
import { computed, ref } from 'vue';
import { useProfileStore } from '@/Stores/ProfileStore';
import { useMovementStore } from '@/Stores/MovementStore';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const profileStore = computed(() => useProfileStore());
const movementStore = computed(() => useMovementStore());

const profileId = computed(() => profileStore.value.getCurrentProfileIndex(profileStore.value.getCurrentProfile().email));

const movements = computed(() => {
  const userMovements = movementStore.value.getMovementsByUserId(profileId.value);
  return Array.isArray(userMovements) ? userMovements : [];
});

const analytics = computed(() => {
  const totalIncome = movements.value.reduce((sum, movement) => 
    movement.amount > 0 ? sum + movement.amount : sum, 0);
  const totalExpense = movements.value.reduce((sum, movement) => 
    movement.amount < 0 ? sum + Math.abs(movement.amount) : sum, 0);
  const mostFrequentType = getMostFrequentType(movements.value);
//   const averageTransaction = movements.value.length > 0 
//     ? (totalIncome + totalExpense) / movements.value.length 
//     : 0;

  return {
    totalIncome,
    totalExpense,
    mostFrequentType,
    // averageTransaction: Math.abs(averageTransaction),
  };
});

const chartData = computed(() => ({
  labels: ['Ingresos', 'Gastos'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651'],
      data: [analytics.value.totalIncome, analytics.value.totalExpense]
    }
  ]
}));

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#FFFFFF',
        padding: 20,
        font: {
          size: 14
        }
      }
    },
    layout: {
      padding: {
        bottom: 20
      }
    }
  }
});

function getMostFrequentType(movements) {
  const typeCounts = movements.reduce((counts, movement) => {
    counts[movement.movementType] = (counts[movement.movementType] || 0) + 1;
    return counts;
  }, {});
  
  return Object.entries(typeCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
}
</script>

<template>
  <div class="box">
    <div class="title">Análisis de Movimientos</div>
    <div v-if="movements.length > 0" class="content-container">
      <div class="text-container">
        <v-list class="analytics-list">
          <v-list-item>
            <v-list-item-title>Ingresos Totales</v-list-item-title>
            <v-list-item-subtitle>${{ analytics.totalIncome.toFixed(2) }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Gastos Totales</v-list-item-title>
            <v-list-item-subtitle>${{ analytics.totalExpense.toFixed(2) }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Tipo de Movimiento más Frecuente</v-list-item-title>
            <v-list-item-subtitle>{{ analytics.mostFrequentType }}</v-list-item-subtitle>
          </v-list-item>
          <!-- <v-list-item>
            <v-list-item-title>Promedio de Transacción</v-list-item-title>
            <v-list-item-subtitle>${{ analytics.averageTransaction.toFixed(2) }}</v-list-item-subtitle>
          </v-list-item> -->
        </v-list>
      </div>
      <div class="chart-container">
        <Pie :data="chartData" :options="chartOptions" />
      </div>
    </div>
    <div v-else class="no-movements-message">
      No hay movimientos para analizar
    </div>
  </div>
</template>

<style scoped>
.box {
  width: 60vw;
  background-color: #1d1d1d;
  border-radius: 15px;
  padding: 16px 16px 24px;
}

.title {
  font-family: "Inter-SemiBold", Helvetica;
  font-weight: 600;
  color: #FFFFFF;
  font-size: 20px;
  letter-spacing: -0.40px;
  line-height: 20px;
  margin-bottom: 16px;
  text-align: left;
  padding-top: 4px;
}

.content-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.text-container {
  width: 50%;
  padding-top: 0;
}

.analytics-list {
  background-color: transparent;
}

.no-movements-message {
  text-align: center;
  color: #FFFFFF;
  font-size: 18px;
  padding: 20px 0;
}

.chart-container {
  width: 45%;
  height: 250px;
  margin-top: -20px;
}

:deep(.v-list-item) {
  padding: 0;
}

:deep(.v-list-item__content) {
  padding: 8px 0;
}

:deep(.v-list-item-title) {
  font-family: "Inter-SemiBold", Helvetica;
  font-weight: 600;
  color: #FFFFFF;
  font-size: 16px;
}

:deep(.v-list-item-subtitle) {
  font-family: "Inter", Helvetica;
  color: #BBBBBB;
  font-size: 14px;
}
</style>
