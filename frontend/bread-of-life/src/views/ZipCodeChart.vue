<template>
  <section class="container">
    <div class="columns">
      
      <div class="column">
        <h3>A CHART OF TOTAL INDIVIDUALS BY ZIP CODE</h3>
        <div>
          <div>
            <ChartBar v-if="!loading && !error" :label="labels" :chart-data="served"></ChartBar>

            <!-- Start of loading animation -->
            <div class="mt-40" v-if="loading">
              <p class=" text-6xl font-bold text-center text-gray-500 animate-pulse">Loading...</p>
            </div>
            <!-- End of loading animation -->
            <!-- Start of error alert -->
            <div class="mt-12 bg-red-50" v-if="error">
              <h3 class="px-4 py-1 text-4xl font-bold text-white bg-red-800">{{ error.title }}</h3>
              <p class="p-4 text-lg font-bold text-red-900">{{ error.message }}</p>
            </div>
            <!-- End of error alert -->
            <br />
            <br />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
const axios = require("axios");
import ChartBar from "@/components/ZipCodeChart";

export default {
  name: "VueChartJS",
  components: {
    ChartBar,
  },
  data() {
    return {
      labels: [],
      served: [],
      loading: false,
      error: null,
    };
  },
  created() {    
      let apiURL3 = 'http://localhost:3000/popchart';
      axios.get(apiURL3)
},
  methods: {
    async fetchData() {
      try {
        this.error = null;
        this.loading = true;
        const url = `http://localhost:3000/chartzip`;
        const response = await axios.get(url);
        //"re-organizing" - mapping json from the response
        this.labels = response.data.map((item) => item._id);
        this.served = response.data.map((item) => item.total);
      } catch (err) {
        if (err.response) {
          // client received an error response (5xx, 4xx)
          this.error = {
            title: "Server Response",
            message: err.message,
          };
        } else if (err.request) {
          // client never received a response, or request never left
          this.error = {
            title: "Unable to Reach Server",
            message: err.message,
          };
        } else {
          // There's probably an error in your code
          this.error = {
            title: "Application Error",
            message: err.message,
          };
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>