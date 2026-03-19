import {
  Chart,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

export default defineNuxtPlugin(() => {
  Chart.register(
    // controllers
    BarController,
    LineController,
    DoughnutController,

    // elements
    BarElement,
    LineElement,
    PointElement,
    ArcElement,

    // scales
    CategoryScale,
    LinearScale,

    // plugins
    Tooltip,
    Legend
  );
});
