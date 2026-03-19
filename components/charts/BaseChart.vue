<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import { Chart, type ChartConfiguration } from 'chart.js';

const props = defineProps<{
  config: ChartConfiguration;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;

onMounted(() => {
  if (!canvasRef.value) return;

  chartInstance = new Chart(canvasRef.value, props.config);
});

onBeforeUnmount(() => {
  chartInstance?.destroy();
});
</script>
