<template>
<!-- create canvas template tag and defined the ref-->
  <canvas ref="myChart"></canvas>
</template>

<script>
//// import chart , create label, chart data.
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
      type: "bar",// define the bar chart type
      data: {
        labels: this.label,
        datasets: [
          {//Create chart label Total individuals by zipcode  and pass the data populate from the servicebyzipcode
            label: "Total Individuals By Zip Code",
            backgroundColor: "rgba(144,238,144 , 0.9 )",
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