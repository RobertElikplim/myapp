<template>
 <!-- create canvas template tag and defined the ref-->
  <canvas ref="myChart"></canvas>
</template>

<script>
// import chart , create label, chart data.
import Chart from "chart.js";
export default {
  props: {
    label: {
      type: Array,
    },
    chartData: {
      type: Array,
    },
  },
  async mounted() {// mounted the chart to the Mychart instance,create chart and use the ref "Mychar"
    console.log(this.chartData);
    await new Chart(this.$refs.myChart, {
      type: "bar",// define chart as bar chart type
      data: {
        labels: this.label,
        datasets: [//Create chart label Total Attendance Per Event and pass the data populate from the Event 
          {
            label: "Total Attendance Per Event",
            backgroundColor: "rgb(54, 162, 235)",
            data: this.chartData,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  },
};
</script>
<!--https://medium.com/risan/vue-chart-component-with-chart-js-db85a2d21288-->
<!--https://dev.to/23subbhashit/fetching-and-visualizing-data-in-vue-using-axios-and-chart-js-k2h-->